import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProfileSettings from "@/components/profile/ProfileSettings";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-playfair text-emerald-900 dark:text-emerald-50 mb-2">
            Account Settings
          </h1>
          <p className="text-emerald-600 dark:text-emerald-400">
            Manage your profile, security settings, and preferences
          </p>
        </div>

        <ProfileSettings />
      </div>
    </DashboardLayout>
  );
};

export default Settings;
