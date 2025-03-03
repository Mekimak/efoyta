import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { Database } from "../types/supabase";

type Application = Database["public"]["Tables"]["applications"]["Row"];

export const useApplications = () => {
  const { user, profile } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (user) {
      fetchApplications();
    } else {
      setApplications([]);
      setIsLoading(false);
    }
  }, [user]);

  const fetchApplications = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      let query;

      if (profile?.user_type === "landlord") {
        // Landlords see applications for their properties
        const { data: properties } = await supabase
          .from("properties")
          .select("id")
          .eq("owner_id", user.id);

        if (!properties || properties.length === 0) {
          setApplications([]);
          setIsLoading(false);
          return;
        }

        const propertyIds = properties.map((p) => p.id);
        query = supabase
          .from("applications")
          .select("*")
          .in("property_id", propertyIds);
      } else {
        // Renters see their own applications
        query = supabase
          .from("applications")
          .select("*")
          .eq("user_id", user.id);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setApplications(data || []);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitApplication = async (
    propertyId: string,
    documents: string[] = [],
  ) => {
    if (!user) return { error: new Error("User not authenticated") };

    try {
      // Check if already applied
      const { data: existingData, error: checkError } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", user.id)
        .eq("property_id", propertyId);

      if (checkError) throw checkError;

      if (existingData && existingData.length > 0) {
        return { error: new Error("Already applied for this property") };
      }

      // Submit application
      const { data, error: submitError } = await supabase
        .from("applications")
        .insert({
          user_id: user.id,
          property_id: propertyId,
          status: "pending",
          documents,
        })
        .select()
        .single();

      if (submitError) throw submitError;

      // Increment property inquiries
      await supabase.rpc("increment_property_inquiries", {
        property_id: propertyId,
      });

      // Refresh applications
      fetchApplications();

      return { data, error: null };
    } catch (err) {
      console.error("Error submitting application:", err);
      return { data: null, error: err as Error };
    }
  };

  const updateApplicationStatus = async (
    applicationId: string,
    status: "approved" | "rejected",
  ) => {
    if (!user || profile?.user_type !== "landlord") {
      return { error: new Error("Unauthorized") };
    }

    try {
      // Get the application to verify ownership
      const { data: application, error: fetchError } = await supabase
        .from("applications")
        .select("*, properties!inner(owner_id)")
        .eq("id", applicationId)
        .single();

      if (fetchError) throw fetchError;

      // @ts-ignore - properties is a join
      if (application.properties.owner_id !== user.id) {
        return { error: new Error("Unauthorized") };
      }

      // Update status
      const { data, error: updateError } = await supabase
        .from("applications")
        .update({ status })
        .eq("id", applicationId)
        .select()
        .single();

      if (updateError) throw updateError;

      // If approved, update property status
      if (status === "approved") {
        await supabase
          .from("properties")
          .update({ status: "pending" })
          .eq("id", application.property_id);
      }

      // Refresh applications
      fetchApplications();

      return { data, error: null };
    } catch (err) {
      console.error("Error updating application status:", err);
      return { data: null, error: err as Error };
    }
  };

  return {
    applications,
    isLoading,
    error,
    submitApplication,
    updateApplicationStatus,
    refresh: fetchApplications,
  };
};
