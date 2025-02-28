import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey);

// Routes

// Properties
app.get("/api/properties", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("status", "available");

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/properties/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/properties", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("properties")
      .insert(req.body)
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/properties/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("properties")
      .update(req.body)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/properties/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from("properties").delete().eq("id", id);

    if (error) throw error;
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Saved Properties
app.get("/api/saved-properties/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { data, error } = await supabase
      .from("saved_properties")
      .select("property_id")
      .eq("user_id", userId);

    if (error) throw error;

    if (data.length > 0) {
      const propertyIds = data.map((item) => item.property_id);
      const { data: properties, error: propertiesError } = await supabase
        .from("properties")
        .select("*")
        .in("id", propertyIds);

      if (propertiesError) throw propertiesError;
      res.json(properties);
    } else {
      res.json([]);
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/saved-properties", async (req, res) => {
  try {
    const { user_id, property_id } = req.body;

    // Check if already saved
    const { data: existingData } = await supabase
      .from("saved_properties")
      .select("*")
      .eq("user_id", user_id)
      .eq("property_id", property_id);

    if (existingData && existingData.length > 0) {
      return res.status(400).json({ error: "Property already saved" });
    }

    const { data, error } = await supabase
      .from("saved_properties")
      .insert({ user_id, property_id })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/saved-properties", async (req, res) => {
  try {
    const { user_id, property_id } = req.body;
    const { error } = await supabase
      .from("saved_properties")
      .delete()
      .eq("user_id", user_id)
      .eq("property_id", property_id);

    if (error) throw error;
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Messages
app.get("/api/messages/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/messages", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("messages")
      .insert(req.body)
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/messages/:id/read", async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("messages")
      .update({ read: true })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Applications
app.get("/api/applications/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/applications/property/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .eq("property_id", propertyId);

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/applications", async (req, res) => {
  try {
    const { user_id, property_id } = req.body;

    // Check if already applied
    const { data: existingData } = await supabase
      .from("applications")
      .select("*")
      .eq("user_id", user_id)
      .eq("property_id", property_id);

    if (existingData && existingData.length > 0) {
      return res
        .status(400)
        .json({ error: "Already applied for this property" });
    }

    const { data, error } = await supabase
      .from("applications")
      .insert(req.body)
      .select()
      .single();

    if (error) throw error;

    // Increment property inquiries
    await supabase.rpc("increment_property_inquiries", { property_id });

    res.status(201).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/applications/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (status !== "approved" && status !== "rejected") {
      return res
        .status(400)
        .json({ error: "Status must be 'approved' or 'rejected'" });
    }

    const { data, error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    // If approved, update property status to pending
    if (status === "approved") {
      await supabase
        .from("properties")
        .update({ status: "pending" })
        .eq("id", data.property_id);
    }

    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// User Profiles
app.get("/api/profiles/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/profiles/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { data, error } = await supabase
      .from("profiles")
      .update(req.body)
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Search Properties
app.get("/api/search", async (req, res) => {
  try {
    const { location, propertyType, minPrice, maxPrice, bedrooms, bathrooms } =
      req.query;

    let query = supabase
      .from("properties")
      .select("*")
      .eq("status", "available");

    if (location) {
      query = query.ilike("location", `%${location}%`);
    }

    if (propertyType) {
      query = query.eq("property_type", propertyType as string);
    }

    if (minPrice) {
      query = query.gte("price", minPrice as string);
    }

    if (maxPrice) {
      query = query.lte("price", maxPrice as string);
    }

    if (bedrooms) {
      query = query.gte("bedrooms", bedrooms as string);
    }

    if (bathrooms) {
      query = query.gte("bathrooms", bathrooms as string);
    }

    const { data, error } = await query;

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
