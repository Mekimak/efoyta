import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import PropertyManagementDashboard from "@/components/landlord/PropertyManagementDashboard";

const LandlordDashboardPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-black">
      <Header isDarkMode={isDarkMode} onDarkModeToggle={handleDarkModeToggle} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-playfair text-emerald-900 dark:text-emerald-50 mb-2">
              Landlord Dashboard
            </h1>
            <p className="text-emerald-600 dark:text-emerald-400">
              Manage your properties, applications, and rental income
            </p>
          </div>

          <PropertyManagementDashboard />
        </motion.div>
      </div>
    </div>
  );
};

export default LandlordDashboardPage;
