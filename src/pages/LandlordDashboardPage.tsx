import React, { useState } from "react";
import PropertyManagementDashboard from "@/components/landlord/PropertyManagementDashboard";
import LandlordHeader from "@/components/dashboard/LandlordHeader";

const LandlordDashboardPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <LandlordHeader
        onMenuToggle={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="pt-16">
        <PropertyManagementDashboard />
      </div>
    </div>
  );
};

export default LandlordDashboardPage;
