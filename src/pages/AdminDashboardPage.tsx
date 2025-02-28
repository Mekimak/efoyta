import React, { useState } from "react";
import AdminLayout from "@/components/dashboard/admin/AdminLayout";
import AdminDashboardContent from "@/components/admin/AdminDashboardContent";

const AdminDashboardPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* No header for admin dashboard */}
      <AdminLayout>
        <AdminDashboardContent />
      </AdminLayout>
    </div>
  );
};

export default AdminDashboardPage;
