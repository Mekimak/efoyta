import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedUserTypes?: string[];
}

const ProtectedRoute = ({
  children,
  allowedUserTypes,
}: ProtectedRouteProps) => {
  const { user, profile, isLoading } = useAuth();

  if (isLoading) {
    // Show loading state while checking authentication
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  // Check if user has the required role
  if (
    allowedUserTypes &&
    profile &&
    !allowedUserTypes.includes(profile.user_type || "")
  ) {
    // Redirect based on user type
    if (profile.user_type === "landlord") {
      return <Navigate to="/landlord" />;
    } else if (profile.user_type === "renter") {
      return <Navigate to="/user-dashboard" />;
    } else if (profile.user_type === "admin") {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/login" />;
    }
  }

  // Allow access if authenticated and has the required role
  return <>{children}</>;
};

export default ProtectedRoute;
