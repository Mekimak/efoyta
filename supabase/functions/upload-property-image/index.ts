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

    // Get user profile to check if they are a landlord
    const { data: profile } = await supabaseClient
      .from("profiles")
      .select("user_type")
      .eq("id", user.id)
      .single();

    if (!profile || profile.user_type !== "landlord") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    // Get form data from the request
    const formData = await req.formData();
    const propertyId = formData.get("propertyId")?.toString();
    const file = formData.get("file") as File;

    if (!propertyId || !file) {
      return new Response(
        JSON.stringify({ error: "Property ID and file are required" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // Verify property ownership
    const { data: property } = await supabaseClient
      .from("properties")
      .select("owner_id")
      .eq("id", propertyId)
      .single();

    if (!property || property.owner_id !== user.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    // Upload the file to storage
    const fileName = `${propertyId}/${crypto.randomUUID()}-${file.name}`;
    const { data: uploadData, error: uploadError } =
      await supabaseClient.storage
        .from("property-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

    if (uploadError) {
      return new Response(JSON.stringify({ error: uploadError.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Get the public URL for the uploaded file
    const { data: publicUrlData } = supabaseClient.storage
      .from("property-images")
      .getPublicUrl(fileName);

    // Update the property's images array
    const { data: property_data } = await supabaseClient
      .from("properties")
      .select("images")
      .eq("id", propertyId)
      .single();

    const updatedImages = [
      ...(property_data?.images || []),
      publicUrlData.publicUrl,
    ];

    const { data, error } = await supabaseClient
      .from("properties")
      .update({ images: updatedImages })
      .eq("id", propertyId)
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    return new Response(
      JSON.stringify({
        data: {
          property: data,
          imageUrl: publicUrlData.publicUrl,
        },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
