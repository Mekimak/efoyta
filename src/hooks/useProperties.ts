import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";

type Property = Database["public"]["Tables"]["properties"]["Row"];

export function useProperties(filters?: {
  location?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  status?: "available" | "pending" | "rented" | "sold";
  ownerId?: string;
}) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let query = supabase.from("properties").select("*");

        // Apply filters
        if (filters) {
          if (filters.location) {
            query = query.ilike("location", `%${filters.location}%`);
          }
          if (filters.propertyType) {
            query = query.eq("property_type", filters.propertyType);
          }
          if (filters.minPrice !== undefined) {
            query = query.gte("price", filters.minPrice);
          }
          if (filters.maxPrice !== undefined) {
            query = query.lte("price", filters.maxPrice);
          }
          if (filters.bedrooms !== undefined) {
            query = query.gte("bedrooms", filters.bedrooms);
          }
          if (filters.bathrooms !== undefined) {
            query = query.gte("bathrooms", filters.bathrooms);
          }
          if (filters.status) {
            query = query.eq("status", filters.status);
          }
          if (filters.ownerId) {
            query = query.eq("owner_id", filters.ownerId);
          }
        }

        // Default to available properties
        if (!filters?.status && !filters?.ownerId) {
          query = query.eq("status", "available");
        }

        const { data, error } = await query;

        if (error) throw error;
        setProperties(data || []);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred"),
        );
        console.error("Error fetching properties:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [filters]);

  const getPropertyById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error("Error fetching property:", err);
      throw err;
    }
  };

  const createProperty = async (
    property: Database["public"]["Tables"]["properties"]["Insert"],
  ) => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .insert(property)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error("Error creating property:", err);
      throw err;
    }
  };

  const updateProperty = async (
    id: string,
    updates: Database["public"]["Tables"]["properties"]["Update"],
  ) => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error("Error updating property:", err);
      throw err;
    }
  };

  const deleteProperty = async (id: string) => {
    try {
      const { error } = await supabase.from("properties").delete().eq("id", id);

      if (error) throw error;
      return true;
    } catch (err) {
      console.error("Error deleting property:", err);
      throw err;
    }
  };

  return {
    properties,
    isLoading,
    error,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
  };
}
