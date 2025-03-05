import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AuthRedirect = () => {
  const navigate = useNavigate();
  const { user, profile, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Not logged in, redirect to login
        navigate("/login");
      } else if (profile) {
        // Redirect based on user type
        if (profile.user_type === "host" || profile.user_type === "landlord") {
          navigate("/landlord");
        } else if (profile.user_type === "renter") {
          navigate("/user-dashboard");
        } else if (profile.user_type === "admin") {
          navigate("/admin");
        } else {
          // Default fallback
          navigate("/dashboard");
        }
      } else {
        // Profile not loaded yet, wait
        // This is handled by the isLoading check
      }
    }
  }, [user, profile, isLoading, navigate]);

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
