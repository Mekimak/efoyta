import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Building2,
  MessageSquare,
  Eye,
  DollarSign,
  Calendar,
  Edit,
  Trash2,
  Search,
  Filter,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Property {
  id: string;
  title: string;
  address: string;
  price: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  status: "available" | "rented" | "pending";
  dateAdded: Date;
  views: number;
  inquiries: number;
  image: string;
}

interface Application {
  id: string;
  propertyId: string;
  applicantName: string;
  applicantEmail: string;
  applicationDate: Date;
  status: "pending" | "approved" | "rejected";
  documents: string[];
}

const PropertyManagementDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Sample data - would come from API in real app
  const properties: Property[] = [
    {
      id: "prop1",
      title: "Modern Apartment with City View",
      address: "123 Downtown St, New York, NY",
      price: "$1,200/month",
      type: "apartment",
      bedrooms: 2,
      bathrooms: 1,
      status: "available",
      dateAdded: new Date(2023, 1, 15),
      views: 245,
      inquiries: 12,
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: "prop2",
      title: "Spacious Family Home",
      address: "456 Suburban Ave, Chicago, IL",
      price: "$2,500/month",
      type: "house",
      bedrooms: 4,
      bathrooms: 3,
      status: "pending",
      dateAdded: new Date(2023, 2, 5),
      views: 187,
      inquiries: 8,
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: "prop3",
      title: "Cozy Studio in Historic District",
      address: "789 Old Town Rd, Boston, MA",
      price: "$950/month",
      type: "studio",
      bedrooms: 1,
      bathrooms: 1,
      status: "rented",
      dateAdded: new Date(2023, 0, 20),
      views: 320,
      inquiries: 15,
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=60",
    },
  ];

  const applications: Application[] = [
    {
      id: "app1",
      propertyId: "prop1",
      applicantName: "John Doe",
      applicantEmail: "john.doe@example.com",
      applicationDate: new Date(2023, 2, 10),
      status: "pending",
      documents: ["ID.pdf", "ProofOfIncome.pdf", "RentalHistory.pdf"],
    },
    {
      id: "app2",
      propertyId: "prop2",
      applicantName: "Jane Smith",
      applicantEmail: "jane.smith@example.com",
      applicationDate: new Date(2023, 2, 8),
      status: "approved",
      documents: ["ID.pdf", "ProofOfIncome.pdf"],
    },
    {
      id: "app3",
      propertyId: "prop1",
      applicantName: "Michael Johnson",
      applicantEmail: "michael.j@example.com",
      applicationDate: new Date(2023, 2, 12),
      status: "rejected",
      documents: ["ID.pdf", "ProofOfIncome.pdf", "CreditReport.pdf"],
    },
  ];

  const filteredProperties = properties
    .filter(
      (property) =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.address.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter(
      (property) => statusFilter === "all" || property.status === statusFilter,
    );

  const markAsRented = (propertyId: string) => {
    // In a real app, you would update this in your database
    console.log(`Marking property ${propertyId} as rented`);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "rented":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
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
                  Total Listings
                </p>
                <h3 className="text-2xl font-semibold mt-2 text-emerald-900 dark:text-emerald-50">
                  {properties.length}
                </h3>
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
                  Total Inquiries
                </p>
                <h3 className="text-2xl font-semibold mt-2 text-emerald-900 dark:text-emerald-50">
                  {properties.reduce((sum, prop) => sum + prop.inquiries, 0)}
                </h3>
              </div>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-800 rounded-full">
                <MessageSquare className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Total Views
                </p>
                <h3 className="text-2xl font-semibold mt-2 text-emerald-900 dark:text-emerald-50">
                  {properties.reduce((sum, prop) => sum + prop.views, 0)}
                </h3>
              </div>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-800 rounded-full">
                <Eye className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Rental Income
                </p>
                <h3 className="text-2xl font-semibold mt-2 text-emerald-900 dark:text-emerald-50">
                  $3,450/mo
                </h3>
              </div>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-800 rounded-full">
                <DollarSign className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="properties" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="properties">My Properties</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="properties">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle className="text-xl font-playfair text-emerald-900 dark:text-emerald-50">
                  Property Listings
                </CardTitle>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
                    <Input
                      placeholder="Search properties"
                      className="pl-10 w-full md:w-[250px] bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/30"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-[150px] bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/30">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Properties</SelectItem>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="rented">Rented</SelectItem>
                      </SelectContent>
                    </Select>

                    <Link to="/list-property">
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                        Add Property
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-6">
                {filteredProperties.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-emerald-600 dark:text-emerald-400">
                      No properties found matching your criteria.
                    </p>
                  </div>
                ) : (
                  filteredProperties.map((property) => (
                    <div
                      key={property.id}
                      className="flex flex-col md:flex-row gap-4 p-4 border border-emerald-100 dark:border-emerald-800/30 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                    >
                      <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-50">
                            {property.title}
                          </h3>
                          <Badge className={getStatusColor(property.status)}>
                            {property.status.charAt(0).toUpperCase() +
                              property.status.slice(1)}
                          </Badge>
                        </div>

                        <p className="text-emerald-700 dark:text-emerald-300 mb-2">
                          {property.address}
                        </p>

                        <div className="flex flex-wrap gap-4 mb-4">
                          <div className="text-sm text-emerald-600 dark:text-emerald-400">
                            <span className="font-medium">
                              {property.price}
                            </span>
                          </div>
                          <div className="text-sm text-emerald-600 dark:text-emerald-400">
                            <span className="font-medium">
                              {property.bedrooms}
                            </span>{" "}
                            bed
                          </div>
                          <div className="text-sm text-emerald-600 dark:text-emerald-400">
                            <span className="font-medium">
                              {property.bathrooms}
                            </span>{" "}
                            bath
                          </div>
                          <div className="text-sm text-emerald-600 dark:text-emerald-400">
                            <span className="font-medium">{property.type}</span>
                          </div>
                          <div className="text-sm text-emerald-600 dark:text-emerald-400">
                            Listed:{" "}
                            <span className="font-medium">
                              {formatDate(property.dateAdded)}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center text-emerald-600 dark:text-emerald-400">
                            <Eye className="h-4 w-4 mr-1" />
                            {property.views} views
                          </div>
                          <div className="flex items-center text-emerald-600 dark:text-emerald-400">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            {property.inquiries} inquiries
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-row md:flex-col gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900"
                        >
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>

                        {property.status === "available" && (
                          <Button
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            onClick={() => markAsRented(property.id)}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" /> Mark as
                            Rented
                          </Button>
                        )}

                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-playfair text-emerald-900 dark:text-emerald-50">
                Rental Applications
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-6">
                {applications.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-emerald-600 dark:text-emerald-400">
                      No applications received yet.
                    </p>
                  </div>
                ) : (
                  applications.map((application) => {
                    const property = properties.find(
                      (p) => p.id === application.propertyId,
                    );

                    return (
                      <div
                        key={application.id}
                        className="p-4 border border-emerald-100 dark:border-emerald-800/30 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-50">
                              {application.applicantName}
                            </h3>
                            <p className="text-emerald-600 dark:text-emerald-400">
                              {application.applicantEmail}
                            </p>
                          </div>

                          <Badge className={getStatusColor(application.status)}>
                            {application.status.charAt(0).toUpperCase() +
                              application.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-emerald-700 dark:text-emerald-300">
                            <span className="font-medium">Property:</span>{" "}
                            {property?.title}
                          </p>
                          <p className="text-sm text-emerald-700 dark:text-emerald-300">
                            <span className="font-medium">Applied on:</span>{" "}
                            {formatDate(application.applicationDate)}
                          </p>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300 mb-2">
                            Documents:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {application.documents.map((doc, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-emerald-50 dark:bg-emerald-900/20"
                              >
                                {doc}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2 justify-end">
                          {application.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-playfair text-emerald-900 dark:text-emerald-50">
                Viewing Schedule
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex items-center justify-center h-[400px]">
                <div className="text-center">
                  <Calendar className="h-16 w-16 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-50 mb-2">
                    Calendar View Coming Soon
                  </h3>
                  <p className="text-emerald-600 dark:text-emerald-400 max-w-md">
                    We're working on a calendar feature to help you manage
                    property viewings and appointments.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertyManagementDashboard;
