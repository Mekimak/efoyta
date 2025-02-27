import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PropertyGrid from "@/components/PropertyGrid";

const Properties = () => {
  const navigate = useNavigate();
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-playfair text-emerald-900 dark:text-emerald-50">
              My Listings
            </h1>
            <p className="text-emerald-600 dark:text-emerald-400 mt-1">
              Manage your property listings and rentals
            </p>
          </div>

          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={() => navigate("/list-property")}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Property
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <PropertyGrid />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Properties;
