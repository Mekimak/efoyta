import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropertyManagementDashboard from "../components/landlord/PropertyManagementDashboard";
import { useAuth } from "../contexts/AuthContext";
import LandlordHeader from "@/components/dashboard/LandlordHeader";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PropertyForm from "@/components/landlord/PropertyForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";

const LandlordDashboardPage = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, profile } = useAuth();
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect if not a landlord
    if (profile && profile.user_type !== "landlord") {
      if (profile.user_type === "renter") {
        navigate("/dashboard");
      } else if (profile.user_type === "admin") {
        navigate("/admin");
      }
    }

    // Fetch landlord's properties
    if (user) {
      fetchProperties();
    }
  }, [user, profile]);

  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("owner_id", user?.id);

      if (error) throw error;
      setProperties(data || []);
    } catch (err) {
      console.error("Error fetching properties:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAddPropertySuccess = () => {
    setIsAddPropertyOpen(false);
    fetchProperties();
  };

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-black">
      <LandlordHeader
        onMenuToggle={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-playfair text-emerald-900 dark:text-emerald-50">
              Welcome back, {profile?.first_name || "Landlord"}
            </h1>
            <p className="text-emerald-600 dark:text-emerald-400 mt-1">
              Manage your properties and tenant applications
            </p>
          </div>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={() => setIsAddPropertyOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Property
          </Button>
        </div>

        <PropertyManagementDashboard
          properties={properties}
          isLoading={isLoading}
          onRefresh={fetchProperties}
        />
      </div>

      <Separator className="my-8" />

      <div className="max-w-7xl mx-auto px-4 pb-8 text-center text-emerald-600 dark:text-emerald-400 text-sm">
        © {new Date().getFullYear()} Efoy Luxury Real Estate. All rights
        reserved.
      </div>

      {/* Add Property Dialog */}
      <Dialog open={isAddPropertyOpen} onOpenChange={setIsAddPropertyOpen}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          <PropertyForm
            onSuccess={handleAddPropertySuccess}
            onCancel={() => setIsAddPropertyOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LandlordDashboardPage;
