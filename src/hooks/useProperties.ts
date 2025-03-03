import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Database } from "../types/supabase";

type Property = Database["public"]["Tables"]["properties"]["Row"];

interface SearchParams {
  location?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  status?: "available" | "pending" | "rented" | "sold";
}

export const useProperties = (initialParams?: SearchParams) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams>(
    initialParams || {},
  );

  useEffect(() => {
    fetchProperties(searchParams);
  }, [searchParams]);

  const fetchProperties = async (params: SearchParams = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      let query = supabase.from("properties").select("*");

      // Apply filters
      if (params.status) {
        query = query.eq("status", params.status);
      } else {
        // Default to available properties
        query = query.eq("status", "available");
      }

      if (params.location) {
        query = query.ilike("location", `%${params.location}%`);
      }

      if (params.propertyType) {
        query = query.eq("property_type", params.propertyType);
      }

      if (params.minPrice) {
        query = query.gte("price", params.minPrice);
      }

      if (params.maxPrice) {
        query = query.lte("price", params.maxPrice);
      }

      if (params.bedrooms) {
        query = query.gte("bedrooms", params.bedrooms);
      }

      if (params.bathrooms) {
        query = query.gte("bathrooms", params.bathrooms);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setProperties(data || []);
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPropertyById = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) throw fetchError;

      return { data, error: null };
    } catch (err) {
      console.error("Error fetching property:", err);
      return { data: null, error: err as Error };
    } finally {
      setIsLoading(false);
    }
  };

  const incrementViews = async (id: string) => {
    try {
      const { data: property } = await getPropertyById(id);
      if (!property) return;

      const { error } = await supabase
        .from("properties")
        .update({ views: (property.views || 0) + 1 })
        .eq("id", id);

      if (error) throw error;
    } catch (err) {
      console.error("Error incrementing views:", err);
    }
  };

  const updateSearchParams = (params: SearchParams) => {
    setSearchParams((prev) => ({ ...prev, ...params }));
  };

  return {
    properties,
    isLoading,
    error,
    searchParams,
    updateSearchParams,
    getPropertyById,
    incrementViews,
    refresh: fetchProperties,
  };
};
