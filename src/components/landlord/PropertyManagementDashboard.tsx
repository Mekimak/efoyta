import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  Building2,
  Edit,
  Trash2,
  DollarSign,
  Users,
  MessageSquare,
  Eye,
  MoreVertical,
  Loader2,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent } from "../ui/dialog";
import PropertyForm from "./PropertyForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { supabase } from "@/lib/supabase";

interface PropertyManagementDashboardProps {
  properties?: any[];
  isLoading?: boolean;
  onRefresh?: () => void;
}

const PropertyManagementDashboard = ({
  properties = [],
  isLoading = false,
  onRefresh = () => {},
}: PropertyManagementDashboardProps) => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [editingProperty, setEditingProperty] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEditProperty = (property: any) => {
    setEditingProperty(property);
    setIsEditDialogOpen(true);
  };

  const handleDeleteProperty = (property: any) => {
    setPropertyToDelete(property);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteProperty = async () => {
    if (!propertyToDelete) return;

    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("properties")
        .delete()
        .eq("id", propertyToDelete.id);

      if (error) throw error;

      // Refresh the properties list
      onRefresh();
    } catch (err) {
      console.error("Error deleting property:", err);
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setPropertyToDelete(null);
    }
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    setEditingProperty(null);
    onRefresh();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-emerald-600 hover:bg-emerald-700";
      case "pending":
        return "bg-amber-500 hover:bg-amber-600";
      case "rented":
        return "bg-blue-600 hover:bg-blue-700";
      case "sold":
        return "bg-purple-600 hover:bg-purple-700";
      default:
        return "bg-gray-600 hover:bg-gray-700";
    }
  };

  // Calculate dashboard stats
  const totalProperties = properties.length;
  const totalApplications = 0; // This would come from an API call in a real app
  const totalMessages = 0; // This would come from an API call in a real app
  const totalRevenue = properties
    .filter((p) => p.status === "rented" || p.status === "sold")
    .reduce((sum, p) => sum + (p.price || 0), 0);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-emerald-600">
                {totalProperties}
              </div>
              <Building2 className="h-8 w-8 text-emerald-500" />
            </div>
            <Button
              variant="link"
              className="p-0 h-auto text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
              onClick={() => navigate("/properties")}
            >
              View all properties
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-emerald-600">
                {totalApplications}
              </div>
              <Users className="h-8 w-8 text-emerald-500" />
            </div>
            <Button
              variant="link"
              className="p-0 h-auto text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              View applications
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-emerald-600">
                {totalMessages}
              </div>
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
            <CardTitle className="text-lg font-medium">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-emerald-600">
                ${totalRevenue.toLocaleString()}
              </div>
              <DollarSign className="h-8 w-8 text-emerald-500" />
            </div>
            <Button
              variant="link"
              className="p-0 h-auto text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              View financial reports
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-playfair text-emerald-900 dark:text-emerald-50 mb-4">
          Your Properties
        </h2>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Card key={property.id}>
                <CardContent className="p-0">
                  <div className="relative h-48 w-full">
                    {property.images && property.images.length > 0 ? (
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="h-full w-full object-cover rounded-t-lg"
                      />
                    ) : (
                      <div className="h-full w-full bg-emerald-100 dark:bg-emerald-900/30 rounded-t-lg flex items-center justify-center">
                        <Building2 className="h-12 w-12 text-emerald-500 opacity-50" />
                      </div>
                    )}
                    <Badge
                      className={`absolute top-2 right-2 text-white ${getStatusColor(property.status)}`}
                    >
                      {property.status.charAt(0).toUpperCase() +
                        property.status.slice(1)}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 left-2 bg-white/80 hover:bg-white dark:bg-black/50 dark:hover:bg-black/70 rounded-full"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem
                          onClick={() => navigate(`/properties/${property.id}`)}
                        >
                          <Eye className="h-4 w-4 mr-2" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleEditProperty(property)}
                        >
                          <Edit className="h-4 w-4 mr-2" /> Edit Property
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteProperty(property)}
                          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Delete Property
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-1 text-emerald-900 dark:text-emerald-50">
                      {property.title}
                    </h3>
                    <p className="text-emerald-600 dark:text-emerald-400 mb-2">
                      ${property.price.toLocaleString()}
                    </p>
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>{property.bedrooms} Beds</span>
                      <span>{property.bathrooms} Baths</span>
                      <span>{property.square_feet.toLocaleString()} sqft</span>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div className="text-sm text-emerald-600 dark:text-emerald-400">
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" /> {property.views || 0}{" "}
                          views
                        </span>
                      </div>
                      <div className="text-sm text-emerald-600 dark:text-emerald-400">
                        <span>{property.location}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30 rounded-lg p-8 text-center">
            <Building2 className="h-12 w-12 text-emerald-500 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-emerald-900 dark:text-emerald-50 mb-2">
              No Properties Listed Yet
            </h3>
            <p className="text-emerald-600 dark:text-emerald-400 mb-4">
              Start adding your properties to showcase them to potential
              renters.
            </p>
          </div>
        )}
      </div>

      {/* Edit Property Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          <PropertyForm
            initialData={editingProperty}
            onSuccess={handleEditSuccess}
            onCancel={() => setIsEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this property?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              property and remove all associated data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteProperty}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PropertyManagementDashboard;
