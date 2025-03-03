import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedUserTypes?: ("renter" | "landlord" | "admin")[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedUserTypes,
}) => {
  const { user, profile, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Show loading state while checking authentication
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50 dark:bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If allowedUserTypes is specified, check if the user has the required type
  if (
    allowedUserTypes &&
    profile?.user_type &&
    !allowedUserTypes.includes(profile.user_type)
  ) {
    // Redirect based on user type
    if (profile.user_type === "renter") {
      return <Navigate to="/dashboard" replace />;
    } else if (profile.user_type === "landlord") {
      return <Navigate to="/landlord" replace />;
    } else if (profile.user_type === "admin") {
      return <Navigate to="/admin" replace />;
    }

    // Fallback to login
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
