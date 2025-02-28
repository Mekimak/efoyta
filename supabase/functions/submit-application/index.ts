// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      },
    );

    // Get the user from the JWT token
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    // Get application data from the request
    const { propertyId, documents } = await req.json();

    if (!propertyId) {
      return new Response(
        JSON.stringify({ error: "Property ID is required" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // Check if user has already applied for this property
    const { data: existingApplication } = await supabaseClient
      .from("applications")
      .select("*")
      .eq("user_id", user.id)
      .eq("property_id", propertyId);

    if (existingApplication && existingApplication.length > 0) {
      return new Response(
        JSON.stringify({
          error: "You have already applied for this property",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // Create the application
    const { data, error } = await supabaseClient
      .from("applications")
      .insert({
        user_id: user.id,
        property_id: propertyId,
        status: "pending",
        documents: documents || [],
      })
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Increment the inquiries count for the property
    await supabaseClient.rpc("increment_property_inquiries", {
      property_id: propertyId,
    });

    // Send a notification message to the property owner
    const { data: property } = await supabaseClient
      .from("properties")
      .select("owner_id, title")
      .eq("id", propertyId)
      .single();

    if (property) {
      await supabaseClient.from("messages").insert({
        sender_id: user.id,
        receiver_id: property.owner_id,
        property_id: propertyId,
        content: `I've submitted an application for ${property.title}. Please review it at your earliest convenience.`,
        read: false,
      });
    }

    return new Response(JSON.stringify({ data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
