import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import RenterHeader from "@/components/dashboard/RenterHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Home, Building2, MapPin } from "lucide-react";
import PropertyGrid from "@/components/PropertyGrid";
import { Input } from "@/components/ui/input";

const Overview = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <RenterHeader
        onMenuToggle={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="flex">
        <DashboardLayout>
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-playfair text-emerald-900 dark:text-emerald-50">
                Welcome Back, John
              </h1>
              <p className="text-emerald-600 dark:text-emerald-400 mt-1">
                Find your perfect home or check your saved properties
              </p>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-xl">
              <h2 className="text-xl font-playfair text-emerald-900 dark:text-emerald-50 mb-4">
                Find Your Dream Home
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
                  <Input
                    placeholder="Location"
                    className="pl-10 bg-white dark:bg-black border-emerald-100 dark:border-emerald-800"
                  />
                </div>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
                  <Input
                    placeholder="Property Type"
                    className="pl-10 bg-white dark:bg-black border-emerald-100 dark:border-emerald-800"
                  />
                </div>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
                  <Input
                    placeholder="Price Range"
                    className="pl-10 bg-white dark:bg-black border-emerald-100 dark:border-emerald-800"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Search className="mr-2 h-4 w-4" /> Search Properties
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-xl font-playfair text-emerald-900 dark:text-emerald-50">
                    Recommended Properties
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PropertyGrid />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-playfair text-emerald-900 dark:text-emerald-50">
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <div>
                        <p className="text-sm text-emerald-900 dark:text-emerald-50">
                          You viewed Modern Apartment with City View
                        </p>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400">
                          2 hours ago
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <div>
                        <p className="text-sm text-emerald-900 dark:text-emerald-50">
                          You saved Luxury Villa with Ocean View
                        </p>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400">
                          Yesterday
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <div>
                        <p className="text-sm text-emerald-900 dark:text-emerald-50">
                          You received a message from Sarah Johnson
                        </p>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400">
                          2 days ago
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </DashboardLayout>
      </div>
    </div>
  );
};

export default Overview;
