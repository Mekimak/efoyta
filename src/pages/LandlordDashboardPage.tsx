import React, { useState } from "react";
import PropertyManagementDashboard from "@/components/landlord/PropertyManagementDashboard";

const LandlordDashboardPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* No header for landlord dashboard */}
      <PropertyManagementDashboard />
    </div>
  );
};

export default LandlordDashboardPage;
