import React from "react";
import AdminLayout from "@/components/dashboard/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Users, Building2, DollarSign } from "lucide-react";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-playfair text-emerald-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-emerald-600">Monitor and manage your platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-600">
                    Total Users
                  </p>
                  <h3 className="text-2xl font-semibold mt-2">2,345</h3>
                  <p className="text-sm text-green-600 mt-2">
                    ↑ 12% from last month
                  </p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-full">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-600">
                    Properties
                  </p>
                  <h3 className="text-2xl font-semibold mt-2">156</h3>
                  <p className="text-sm text-green-600 mt-2">
                    ↑ 8% from last month
                  </p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-full">
                  <Building2 className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-600">
                    Revenue
                  </p>
                  <h3 className="text-2xl font-semibold mt-2">$45.2M</h3>
                  <p className="text-sm text-green-600 mt-2">
                    ↑ 15% from last month
                  </p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-600">
                    Conversion Rate
                  </p>
                  <h3 className="text-2xl font-semibold mt-2">3.2%</h3>
                  <p className="text-sm text-red-600 mt-2">
                    ↓ 2% from last month
                  </p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-full">
                  <BarChart className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-playfair text-emerald-800">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Activity items */}
                <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-lg">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <div>
                    <p className="text-sm text-emerald-900">
                      New user registration
                    </p>
                    <p className="text-xs text-emerald-600">2 minutes ago</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-lg">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <div>
                    <p className="text-sm text-emerald-900">
                      Property listing approved
                    </p>
                    <p className="text-xs text-emerald-600">1 hour ago</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-lg">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <div>
                    <p className="text-sm text-emerald-900">
                      Transaction completed
                    </p>
                    <p className="text-xs text-emerald-600">3 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-playfair text-emerald-800">
                Analytics Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-emerald-600">
                Chart Placeholder
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
