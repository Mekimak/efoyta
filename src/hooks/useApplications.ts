import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/types/supabase";

type Application = Database["public"]["Tables"]["applications"]["Row"];

export function useApplications() {
  const { user, profile } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user || !profile) {
      setApplications([]);
      setIsLoading(false);
      return;
    }

    const fetchApplications = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let query = supabase.from("applications").select("*");

        // If user is a renter, get their applications
        // If user is a landlord, get applications for their properties
        if (profile.user_type === "renter") {
          query = query.eq("user_id", user.id);
        } else if (profile.user_type === "landlord") {
          // First get the landlord's properties
          const { data: properties } = await supabase
            .from("properties")
            .select("id")
            .eq("owner_id", user.id);

          if (properties && properties.length > 0) {
            const propertyIds = properties.map((p) => p.id);
            query = query.in("property_id", propertyIds);
          } else {
            setApplications([]);
            setIsLoading(false);
            return;
          }
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setApplications(data || []);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred"),
        );
        console.error("Error fetching applications:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();

    // Set up real-time subscription
    const subscription = supabase
      .channel("applications_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "applications" },
        () => {
          fetchApplications();
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user, profile]);

  const submitApplication = async (propertyId: string, documents: string[]) => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    try {
      // Check if already applied
      const { data: existingData } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", user.id)
        .eq("property_id", propertyId);

      if (existingData && existingData.length > 0) {
        throw new Error("You have already applied for this property");
      }

      const { data, error } = await supabase
        .from("applications")
        .insert({
          user_id: user.id,
          property_id: propertyId,
          status: "pending",
          documents,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error("Error submitting application:", err);
      throw err;
    }
  };

  const updateApplicationStatus = async (
    applicationId: string,
    status: "approved" | "rejected",
  ) => {
    if (!user || profile?.user_type !== "landlord") {
      throw new Error("Unauthorized");
    }

    try {
      const { data, error } = await supabase
        .from("applications")
        .update({ status })
        .eq("id", applicationId)
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

      return data;
    } catch (err) {
      console.error("Error updating application status:", err);
      throw err;
    }
  };

  return {
    applications,
    isLoading,
    error,
    submitApplication,
    updateApplicationStatus,
  };
}
