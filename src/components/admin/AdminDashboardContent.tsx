import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  BarChart,
  Users,
  Building2,
  DollarSign,
  Search,
  Ban,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const AdminDashboardContent = () => {
  // Sample data - would come from API in real app
  const users = [
    {
      id: "user1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "renter",
      status: "active",
      joinDate: new Date(2023, 0, 15),
    },
    {
      id: "user2",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      role: "landlord",
      status: "active",
      joinDate: new Date(2023, 1, 20),
    },
    {
      id: "user3",
      name: "Michael Chen",
      email: "michael.c@example.com",
      role: "renter",
      status: "suspended",
      joinDate: new Date(2023, 2, 5),
    },
  ];

  const properties = [
    {
      id: "prop1",
      title: "Modern Apartment with City View",
      owner: "Sarah Johnson",
      status: "active",
      dateAdded: new Date(2023, 1, 15),
      views: 245,
    },
    {
      id: "prop2",
      title: "Spacious Family Home",
      owner: "David Wilson",
      status: "pending_review",
      dateAdded: new Date(2023, 2, 5),
      views: 187,
    },
    {
      id: "prop3",
      title: "Cozy Studio in Historic District",
      owner: "Sarah Johnson",
      status: "active",
      dateAdded: new Date(2023, 0, 20),
      views: 320,
    },
  ];

  const reports = [
    {
      id: "report1",
      type: "inappropriate_content",
      reporter: "John Doe",
      reported: "Modern Apartment with City View",
      status: "pending",
      dateReported: new Date(2023, 2, 10),
    },
    {
      id: "report2",
      type: "scam",
      reporter: "Emily Rodriguez",
      reported: "Michael Chen",
      status: "resolved",
      dateReported: new Date(2023, 2, 8),
    },
    {
      id: "report3",
      type: "harassment",
      reporter: "David Wilson",
      reported: "Sarah Johnson",
      status: "pending",
      dateReported: new Date(2023, 2, 12),
    },
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "pending":
      case "pending_review":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "suspended":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "resolved":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Total Users
                </p>
                <h3 className="text-2xl font-semibold mt-2 text-emerald-900 dark:text-emerald-50">
                  2,345
                </h3>
                <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                  ↑ 12% from last month
                </p>
              </div>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-800 rounded-full">
                <Users className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Properties
                </p>
                <h3 className="text-2xl font-semibold mt-2 text-emerald-900 dark:text-emerald-50">
                  1,567
                </h3>
                <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                  ↑ 8% from last month
                </p>
              </div>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-800 rounded-full">
                <Building2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Revenue
                </p>
                <h3 className="text-2xl font-semibold mt-2 text-emerald-900 dark:text-emerald-50">
                  $45.2K
                </h3>
                <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                  ↑ 15% from last month
                </p>
              </div>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-800 rounded-full">
                <DollarSign className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Conversion Rate
                </p>
                <h3 className="text-2xl font-semibold mt-2 text-emerald-900 dark:text-emerald-50">
                  3.2%
                </h3>
                <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                  ↓ 2% from last month
                </p>
              </div>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-800 rounded-full">
                <BarChart className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="properties">Property Moderation</TabsTrigger>
          <TabsTrigger value="reports">Reports & Issues</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle className="text-xl font-playfair text-emerald-900 dark:text-emerald-50">
                  User Management
                </CardTitle>

                <div className="relative w-full md:w-[300px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
                  <Input
                    placeholder="Search users by name or email"
                    className="pl-10 bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/30"
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-emerald-100 dark:border-emerald-800/30">
                      <th className="text-left py-3 px-4 text-emerald-600 dark:text-emerald-400 font-medium">
                        Name
                      </th>
                      <th className="text-left py-3 px-4 text-emerald-600 dark:text-emerald-400 font-medium">
                        Email
                      </th>
                      <th className="text-left py-3 px-4 text-emerald-600 dark:text-emerald-400 font-medium">
                        Role
                      </th>
                      <th className="text-left py-3 px-4 text-emerald-600 dark:text-emerald-400 font-medium">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-emerald-600 dark:text-emerald-400 font-medium">
                        Join Date
                      </th>
                      <th className="text-right py-3 px-4 text-emerald-600 dark:text-emerald-400 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-emerald-100 dark:border-emerald-800/30 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                      >
                        <td className="py-3 px-4 text-emerald-900 dark:text-emerald-50">
                          {user.name}
                        </td>
                        <td className="py-3 px-4 text-emerald-700 dark:text-emerald-300">
                          {user.email}
                        </td>
                        <td className="py-3 px-4 text-emerald-700 dark:text-emerald-300 capitalize">
                          {user.role}
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(user.status)}>
                            {user.status.charAt(0).toUpperCase() +
                              user.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-emerald-700 dark:text-emerald-300">
                          {formatDate(user.joinDate)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900"
                            >
                              Edit
                            </Button>
                            {user.status === "active" ? (
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                              >
                                <Ban className="h-4 w-4 mr-1" /> Suspend
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/20 dark:hover:text-green-300"
                              >
                                <CheckCircle2 className="h-4 w-4 mr-1" />{" "}
                                Activate
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle className="text-xl font-playfair text-emerald-900 dark:text-emerald-50">
                  Property Moderation
                </CardTitle>

                <div className="relative w-full md:w-[300px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
                  <Input
                    placeholder="Search properties"
                    className="pl-10 bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/30"
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-emerald-100 dark:border-emerald-800/30">
                      <th className="text-left py-3 px-4 text-emerald-600 dark:text-emerald-400 font-medium">
                        Property
                      </th>
                      <th className="text-left py-3 px-4 text-emerald-600 dark:text-emerald-400 font-medium">
                        Owner
                      </th>
                      <th className="text-left py-3 px-4 text-emerald-600 dark:text-emerald-400 font-medium">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-emerald-600 dark:text-emerald-400 font-medium">
                        Date Added
                      </th>
                      <th className="text-left py-3 px-4 text-emerald-600 dark:text-emerald-400 font-medium">
                        Views
                      </th>
                      <th className="text-right py-3 px-4 text-emerald-600 dark:text-emerald-400 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map((property) => (
                      <tr
                        key={property.id}
                        className="border-b border-emerald-100 dark:border-emerald-800/30 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                      >
                        <td className="py-3 px-4 text-emerald-900 dark:text-emerald-50">
                          {property.title}
                        </td>
                        <td className="py-3 px-4 text-emerald-700 dark:text-emerald-300">
                          {property.owner}
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(property.status)}>
                            {property.status === "pending_review"
                              ? "Pending Review"
                              : property.status.charAt(0).toUpperCase() +
                                property.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-emerald-700 dark:text-emerald-300">
                          {formatDate(property.dateAdded)}
                        </td>
                        <td className="py-3 px-4 text-emerald-700 dark:text-emerald-300">
                          {property.views}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900"
                            >
                              View
                            </Button>
                            {property.status === "pending_review" && (
                              <Button
                                size="sm"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                              >
                                <CheckCircle2 className="h-4 w-4 mr-1" />{" "}
                                Approve
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                            >
                              Remove
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle className="text-xl font-playfair text-emerald-900 dark:text-emerald-50">
                  Reports & Issues
                </CardTitle>

                <div className="relative w-full md:w-[300px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
                  <Input
                    placeholder="Search reports"
                    className="pl-10 bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/30"
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-emerald-100 dark:border-emerald-800/30">
                      <th className="text-left py-3 px-4 text-emerald-600 dark:text-emerald-400 font-medium">
                        Type
                      </th>
                      <th className="text-left py-3 px-4 text-emerald-600 dark:text-emerald-400 font-medium">
                        Reporter
                      </th>
                      <th className="text-left py-3 px-4 text-emerald-600 dark:text-emerald-400 font-medium">
                        Reported
                      </th>
                      <th className="text-left py-3 px-4 text-emerald-600 dark:text-emerald-400 font-medium">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-emerald-600 dark:text-emerald-400 font-medium">
                        Date
                      </th>
                      <th className="text-right py-3 px-4 text-emerald-600 dark:text-emerald-400 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr
                        key={report.id}
                        className="border-b border-emerald-100 dark:border-emerald-800/30 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                            <span className="text-emerald-900 dark:text-emerald-50 capitalize">
                              {report.type.replace(/_/g, " ")}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-emerald-700 dark:text-emerald-300">
                          {report.reporter}
                        </td>
                        <td className="py-3 px-4 text-emerald-700 dark:text-emerald-300">
                          {report.reported}
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(report.status)}>
                            {report.status.charAt(0).toUpperCase() +
                              report.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-emerald-700 dark:text-emerald-300">
                          {formatDate(report.dateReported)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900"
                            >
                              View Details
                            </Button>
                            {report.status === "pending" && (
                              <Button
                                size="sm"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                              >
                                Resolve
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    New user registration
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">
                    2 minutes ago
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <div>
                  <p className="text-sm text-emerald-900 dark:text-emerald-50">
                    Property listing approved
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">
                    1 hour ago
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <div>
                  <p className="text-sm text-emerald-900 dark:text-emerald-50">
                    User report resolved
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">
                    3 hours ago
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-playfair text-emerald-900 dark:text-emerald-50">
              Analytics Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <BarChart className="h-16 w-16 opacity-50" />
              <p className="ml-4 text-lg">
                Analytics visualization coming soon
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardContent;
