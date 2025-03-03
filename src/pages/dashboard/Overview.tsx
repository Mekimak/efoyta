import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import RenterHeader from "../../components/dashboard/RenterHeader";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Search, Home, Building2, MapPin } from "lucide-react";
import PropertyGrid from "../../components/PropertyGrid";
import { Input } from "../../components/ui/input";
import { useAuth } from "../../contexts/AuthContext";
import { useProperties } from "../../hooks/useProperties";

const Overview = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, profile } = useAuth();
  const [searchParams, setSearchParams] = useState({
    location: "",
    propertyType: "",
    priceRange: "",
  });
  const { properties, isLoading } = useProperties();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = () => {
    // Navigate to properties page with search params
    const queryParams = new URLSearchParams();
    if (searchParams.location)
      queryParams.append("location", searchParams.location);
    if (searchParams.propertyType)
      queryParams.append("propertyType", searchParams.propertyType);
    if (searchParams.priceRange)
      queryParams.append("priceRange", searchParams.priceRange);

    navigate(`/properties?${queryParams.toString()}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-playfair text-emerald-900 dark:text-emerald-50">
              Welcome Back,{" "}
              {profile?.first_name || user?.email?.split("@")[0] || "User"}
            </h1>
            <p className="text-emerald-600 dark:text-emerald-400 mt-1">
              Browse properties and manage your saved homes
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Saved Homes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-emerald-600">5</div>
                <Home className="h-8 w-8 text-emerald-500" />
              </div>
              <Button
                variant="link"
                className="p-0 h-auto text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                onClick={() => navigate("/dashboard/saved")}
              >
                View saved properties
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-emerald-600">2</div>
                <Building2 className="h-8 w-8 text-emerald-500" />
              </div>
              <Button
                variant="link"
                className="p-0 h-auto text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                View your applications
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-emerald-600">3</div>
                <MapPin className="h-8 w-8 text-emerald-500" />
              </div>
              <Button
                variant="link"
                className="p-0 h-auto text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                onClick={() => navigate("/messages")}
              >
                View messages
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-playfair text-emerald-900 dark:text-emerald-50">
              Find Your Dream Home
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <Input
                    name="location"
                    value={searchParams.location}
                    onChange={handleInputChange}
                    placeholder="Location"
                    className="pl-10 bg-white dark:bg-black border-emerald-100 dark:border-emerald-800"
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                    <Home className="h-5 w-5" />
                  </div>
                  <Input
                    name="propertyType"
                    value={searchParams.propertyType}
                    onChange={handleInputChange}
                    placeholder="Property Type"
                    className="pl-10 bg-white dark:bg-black border-emerald-100 dark:border-emerald-800"
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <Input
                    name="priceRange"
                    value={searchParams.priceRange}
                    onChange={handleInputChange}
                    placeholder="Price Range"
                    className="pl-10 bg-white dark:bg-black border-emerald-100 dark:border-emerald-800"
                  />
                </div>
              </div>

              <div>
                <Button
                  onClick={handleSearch}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white w-full"
                >
                  <Search className="mr-2 h-4 w-4" /> Search Properties
                </Button>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-emerald-900 dark:text-emerald-50 mb-4">
                Recommended Properties
              </h3>
              <PropertyGrid />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Overview;
