import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

const AuthRedirect = () => {
  const { user, profile, isLoading } = useAuth();
  const [redirecting, setRedirecting] = useState(true);

  useEffect(() => {
    const checkUserAndRedirect = async () => {
      if (isLoading) return;

      if (!user) {
        // If no user, redirect to login
        window.location.href = "/login";
        return;
      }

      // If we have a user but no profile yet, fetch it directly
      if (user && !profile) {
        try {
          const { data } = await supabase
            .from("profiles")
            .select("user_type")
            .eq("id", user.id)
            .single();

          if (data?.user_type === "landlord") {
            window.location.href = "/landlord";
          } else if (data?.user_type === "admin") {
            window.location.href = "/admin";
          } else {
            // Default to user dashboard for renters
            window.location.href = "/user-dashboard";
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          // Default to user dashboard if we can't determine user type
          window.location.href = "/user-dashboard";
        }
        return;
      }

      // If we have both user and profile, redirect based on user type
      if (user && profile) {
        if (profile.user_type === "landlord") {
          window.location.href = "/landlord";
        } else if (profile.user_type === "admin") {
          window.location.href = "/admin";
        } else {
          // Default to user dashboard for renters
          window.location.href = "/user-dashboard";
        }
      }
    };

    checkUserAndRedirect();
  }, [user, profile, isLoading]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-black dark:to-emerald-950/20">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-playfair text-emerald-900 dark:text-emerald-50 mb-2">
          Authenticating...
        </h2>
        <p className="text-emerald-600 dark:text-emerald-400">
          Please wait while we redirect you to your dashboard.
        </p>
      </div>
    </div>
  );
};

export default AuthRedirect;
