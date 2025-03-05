import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: "renter" | "host" | "admin";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredUserType,
}) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

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
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredUserType) {
    // Check if user has the required user type
    const userType = user.user_metadata?.user_type;

    if (userType !== requiredUserType) {
      // Redirect based on user type
      if (userType === "renter") {
        return <Navigate to="/user-dashboard" replace />;
      } else if (userType === "host") {
        return <Navigate to="/landlord-dashboard" replace />;
      } else {
        return <Navigate to="/login" replace />;
      }
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
