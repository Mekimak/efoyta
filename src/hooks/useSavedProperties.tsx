import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { Database } from "../types/supabase";

type Property = Database["public"]["Tables"]["properties"]["Row"];

export const useSavedProperties = () => {
  const { user } = useAuth();
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (user) {
      fetchSavedProperties();
    } else {
      setSavedProperties([]);
      setIsLoading(false);
    }
  }, [user]);

  const fetchSavedProperties = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      // First get the saved property IDs
      const { data: savedData, error: savedError } = await supabase
        .from("saved_properties")
        .select("property_id")
        .eq("user_id", user.id);

      if (savedError) throw savedError;

      if (savedData && savedData.length > 0) {
        // Get the property details for each saved property
        const propertyIds = savedData.map((item) => item.property_id);
        const { data: properties, error: propertiesError } = await supabase
          .from("properties")
          .select("*")
          .in("id", propertyIds);

        if (propertiesError) throw propertiesError;

        setSavedProperties(properties || []);
      } else {
        setSavedProperties([]);
      }
    } catch (err) {
      console.error("Error fetching saved properties:", err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProperty = async (propertyId: string) => {
    if (!user) return { error: new Error("User not authenticated") };

    try {
      // Check if already saved
      const { data: existingData, error: checkError } = await supabase
        .from("saved_properties")
        .select("*")
        .eq("user_id", user.id)
        .eq("property_id", propertyId);

      if (checkError) throw checkError;

      if (existingData && existingData.length > 0) {
        return { error: new Error("Property already saved") };
      }

      // Save the property
      const { error } = await supabase.from("saved_properties").insert({
        user_id: user.id,
        property_id: propertyId,
      });

      if (error) throw error;

      // Refresh the list
      fetchSavedProperties();

      return { error: null };
    } catch (err) {
      console.error("Error saving property:", err);
      return { error: err as Error };
    }
  };

  const unsaveProperty = async (propertyId: string) => {
    if (!user) return { error: new Error("User not authenticated") };

    try {
      const { error } = await supabase
        .from("saved_properties")
        .delete()
        .eq("user_id", user.id)
        .eq("property_id", propertyId);

      if (error) throw error;

      // Update the local state
      setSavedProperties((prev) =>
        prev.filter((property) => property.id !== propertyId),
      );

      return { error: null };
    } catch (err) {
      console.error("Error unsaving property:", err);
      return { error: err as Error };
    }
  };

  const isSaved = (propertyId: string) => {
    return savedProperties.some((property) => property.id === propertyId);
  };

  return {
    savedProperties,
    isLoading,
    error,
    saveProperty,
    unsaveProperty,
    isSaved,
    refresh: fetchSavedProperties,
  };
};

export default useSavedProperties;
