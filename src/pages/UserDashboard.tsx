import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { useSavedProperties } from "../hooks/useSavedProperties";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Home, Heart, MessageSquare, Building2, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PropertyGrid from "../components/PropertyGrid";
import { Input } from "../components/ui/input";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { savedProperties } = useSavedProperties();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-playfair text-emerald-900 dark:text-emerald-50 mb-2">
              Welcome back, {profile?.last_name || ""}
            </h1>
            <p className="text-emerald-600 dark:text-emerald-400">
              Manage your saved properties and applications
            </p>
          </div>

          <div className="w-full md:w-auto md:min-w-[300px]">
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
              <Input
                placeholder="Search for properties..."
                className="pl-10 bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                className="text-xs border-emerald-200 dark:border-emerald-800"
              >
                Price: Any
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs border-emerald-200 dark:border-emerald-800"
              >
                Beds: Any
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs border-emerald-200 dark:border-emerald-800"
              >
                Property Type
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs border-emerald-200 dark:border-emerald-800"
              >
                More Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Saved Properties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-emerald-600">
                  {savedProperties.length}
                </div>
                <Heart className="h-8 w-8 text-emerald-500" />
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
                <MessageSquare className="h-8 w-8 text-emerald-500" />
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

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Browse Properties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-emerald-600">100+</div>
                <Home className="h-8 w-8 text-emerald-500" />
              </div>
              <Button
                variant="link"
                className="p-0 h-auto text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                onClick={() => navigate("/properties")}
              >
                Browse all properties
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-playfair text-emerald-900 dark:text-emerald-50 mb-4">
            Recommended Properties
          </h2>
          <PropertyGrid />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-playfair text-emerald-900 dark:text-emerald-50 mb-4">
            Recently Viewed
          </h2>
          <PropertyGrid />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
