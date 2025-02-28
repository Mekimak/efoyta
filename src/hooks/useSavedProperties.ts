import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/types/supabase";

type Property = Database["public"]["Tables"]["properties"]["Row"];
type SavedProperty = Database["public"]["Tables"]["saved_properties"]["Row"];

export function useSavedProperties() {
  const { user } = useAuth();
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setSavedProperties([]);
      setIsLoading(false);
      return;
    }

    const fetchSavedProperties = async () => {
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
          // Then get the actual property details
          const propertyIds = savedData.map((item) => item.property_id);
          const { data: propertiesData, error: propertiesError } =
            await supabase.from("properties").select("*").in("id", propertyIds);

          if (propertiesError) throw propertiesError;
          setSavedProperties(propertiesData || []);
        } else {
          setSavedProperties([]);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred"),
        );
        console.error("Error fetching saved properties:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedProperties();

    // Set up real-time subscription
    const subscription = supabase
      .channel("saved_properties_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "saved_properties",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchSavedProperties();
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const saveProperty = async (propertyId: string) => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    try {
      // Check if already saved
      const { data: existingData } = await supabase
        .from("saved_properties")
        .select("*")
        .eq("user_id", user.id)
        .eq("property_id", propertyId);

      if (existingData && existingData.length > 0) {
        return; // Already saved
      }

      const { error } = await supabase.from("saved_properties").insert({
        user_id: user.id,
        property_id: propertyId,
      });

      if (error) throw error;
    } catch (err) {
      console.error("Error saving property:", err);
      throw err;
    }
  };

  const unsaveProperty = async (propertyId: string) => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    try {
      const { error } = await supabase
        .from("saved_properties")
        .delete()
        .eq("user_id", user.id)
        .eq("property_id", propertyId);

      if (error) throw error;
    } catch (err) {
      console.error("Error removing saved property:", err);
      throw err;
    }
  };

  const isPropertySaved = async (propertyId: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from("saved_properties")
        .select("*")
        .eq("user_id", user.id)
        .eq("property_id", propertyId);

      if (error) throw error;
      return data && data.length > 0;
    } catch (err) {
      console.error("Error checking if property is saved:", err);
      return false;
    }
  };

  return {
    savedProperties,
    isLoading,
    error,
    saveProperty,
    unsaveProperty,
    isPropertySaved,
  };
}
