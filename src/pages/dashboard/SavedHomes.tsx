import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PropertyGrid from "@/components/PropertyGrid";

const SavedHomes = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-playfair text-emerald-900 dark:text-emerald-50">
            Saved Homes
          </h1>
          <p className="text-emerald-600 dark:text-emerald-400 mt-1">
            View and manage your favorite properties
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <PropertyGrid />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SavedHomes;
