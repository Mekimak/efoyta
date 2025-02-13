import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import OverviewStats from "@/components/dashboard/OverviewStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PropertyGrid from "@/components/PropertyGrid";

const Overview = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-playfair text-emerald-900 dark:text-emerald-50">
              Dashboard Overview
            </h1>
            <p className="text-emerald-600 dark:text-emerald-400 mt-1">
              Welcome back! Here's what's happening with your property listings.
            </p>
          </div>

          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Plus className="mr-2 h-4 w-4" /> List New Property
          </Button>
        </div>

        <OverviewStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl font-playfair text-emerald-900 dark:text-emerald-50">
                Recent Properties
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
                {/* Activity items */}
                <div className="flex items-center gap-4 p-4 bg-emerald-50 dark:bg-emerald-900 rounded-lg">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <div>
                    <p className="text-sm text-emerald-900 dark:text-emerald-50">
                      New property view
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">
                      2 minutes ago
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-emerald-50 dark:bg-emerald-900 rounded-lg">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <div>
                    <p className="text-sm text-emerald-900 dark:text-emerald-50">
                      Property inquiry received
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">
                      1 hour ago
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-emerald-50 dark:bg-emerald-900 rounded-lg">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <div>
                    <p className="text-sm text-emerald-900 dark:text-emerald-50">
                      Property saved by user
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">
                      3 hours ago
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Overview;
