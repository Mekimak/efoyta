import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import {
  Building,
  Home,
  Eye,
  MessageSquare,
  Calendar,
  BarChart,
  Trash,
  Edit,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  Camera,
  Upload,
  DollarSign,
  Clock,
  Users
} from "lucide-react";

interface Property {
  id: string;
  title: string;
  image: string;
  price: string;
  location: string;
  type: string;
  beds: number;
  baths: number;
  sqft: number;
  status: "available" | "rented" | "maintenance" | "draft";
  views: number;
  inquiries: number;
  lastUpdated: string;
  description?: string;
  amenities?: string[];
}

interface HostPropertyManagementProps {
  properties?: Property[];
  onStatusChange?: (propertyId: string, status: string) => void;
  onDeleteProperty?: (propertyId: string) => void;
  onEditProperty?: (propertyId: string, data: any) => void;
}

const HostPropertyManagement: React.FC<HostPropertyManagementProps> = ({
  properties: initialProperties = [],
  onStatusChange = () => {},
  onDeleteProperty = () => {},
  onEditProperty = () => {}
}) => {
  const [properties, setProperties] = useState<Property[]>(initialProperties.length > 0 ? initialProperties : [
    {
      id: "1",
      title: "2BHK in Bole",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop&q=80",
      price: "12,000 ETB/month",
      location: "Bole, Addis Ababa",
      type: "apartment",
      beds: 2,
      baths: 1,
      sqft: 850,
      status: "available",
      views: 78,
      inquiries: 5,
      lastUpdated: "2023-12-10",
      description: "Modern 2BHK apartment with balcony and city view. Includes backup generator and 24/7 security.",
      amenities: ["generator", "water-tank", "guard"]
    },
    {
      id: "2",
      title: "Villa in Ayat",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=80",
      price: "35,000 ETB/month",
      location: "Ayat, Addis Ababa",
      type: "villa",
      beds: 4,
      baths: 3,
      sqft: 2200,
      status: "rented",
      views: 45,
      inquiries: 3,
      lastUpdated: "2023-11-15",
      description: "Spacious villa with garden and parking. Features injera kitchen and backup generator.",
      amenities: ["generator", "water-tank", "guard", "parking", "injera-kitchen"]
    },
    {
      id: "3",
      title: "Studio in Kazanchis",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      price: "8,000 ETB/month",
      location: "Kazanchis, Addis Ababa",
      type: "studio",
      beds: 1,
      baths: 1,
      sqft: 450,
      status: "maintenance",
      views: 33,
      inquiries: 4,
      lastUpdated: "2023-12-05",
      description: "Cozy studio apartment near Meskel Square. Water tank available.",
      amenities: ["water-tank"]
    },
    {
      id: "4",
      title: "3BHK near Friendship Mall",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80",
      price: "18,000 ETB/month",
      location: "Bole, Addis Ababa",
      type: "apartment",
      beds: 3,
      baths: 2,
      sqft: 1200,
      status: "draft",
      views: 0,
      inquiries: 0,
      lastUpdated: "2023-12-12",
      description: "Spacious 3BHK apartment near Friendship Mall. Features backup generator and 24/7 security.",
      amenities: ["generator", "water-tank", "guard", "parking"]
    }
  ]);
  const [activeTab, setActiveTab] = useState<"all" | "available" | "rented" | "maintenance" | "draft">("all");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [propertyToEdit, setPropertyToEdit] = useState<Property | null>(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    price: "",
    description: "",
    status: ""
  });

  // Filter properties based on active tab
  const filteredProperties = activeTab === "all" 
    ? properties 
    : properties.filter(property => property.status === activeTab);

  const handleStatusChange = (propertyId: string, status: "available" | "rented" | "maintenance" | "draft") => {
    // Update local state
    const updatedProperties = properties.map(property => 
      property.id === propertyId ? { ...property, status } : property
    );
    setProperties(updatedProperties);
    
    // Notify parent component
    onStatusChange(propertyId, status);
    
    // In a real app, this would make an API call to update the database
    // Example Supabase call:
    // await supabase
    //   .from('listings')
    //   .update({ is_available: status === 'available' })
    //   .eq('id', propertyId);
  };

  const confirmDeleteProperty = (propertyId: string) => {
    setPropertyToDelete(propertyId);
    setShowDeleteDialog(true);
  };

  const handleDeleteProperty = () => {
    if (!propertyToDelete) return;
    
    // Update local state
    const updatedProperties = properties.filter(property => property.id !== propertyToDelete);
    setProperties(updatedProperties);
    
    // Notify parent component
    onDeleteProperty(propertyToDelete);
    
    // Close dialog
    setShowDeleteDialog(false);
    setPropertyToDelete(null);
    
    // In a real app, this would make an API call to delete from the database
    // Example Supabase call:
    // await supabase
    //   .from('listings')
    //   .delete()
    //   .eq('id', propertyToDelete);
  };

  const openEditDialog = (property: Property) => {
    setPropertyToEdit(property);
    setEditFormData({
      title: property.title,
      price: property.price.replace(" ETB/month", ""),
      description: property.description || "",
      status: property.status
    });
    setShowEditDialog(true);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditProperty = () => {
    if (!propertyToEdit) return;
    
    // Update local state
    const updatedProperties = properties.map(property => 
      property.id === propertyToEdit.id 
        ? { 
            ...property, 
            title: editFormData.title,
            price: `${editFormData.price} ETB/month`,
            description: editFormData.description,
            status: editFormData.status as "available" | "rented" | "maintenance" | "draft",
            lastUpdated: new Date().toISOString().split('T')[0]
          } 
        : property
    );
    setProperties(updatedProperties);
    
    // Notify parent component
    onEditProperty(propertyToEdit.id, editFormData);
    
    // Close dialog
    setShowEditDialog(false);
    setPropertyToEdit(null);
    
    // In a real app, this would make an API call to update the database
    // Example Supabase call:
    // await supabase
    //   .from('listings')
    //   .update({
    //     title: editFormData.title,
    //     price_etb: parseInt(editFormData.price),
    //     description: editFormData.description,
    //     status: editFormData.status
    //   })
    //   .eq('id', propertyToEdit.id);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-100 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Available</Badge>;
      case "rented":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100 flex items-center gap-1"><Users className="h-3 w-3" /> Rented</Badge>;
      case "maintenance":
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-100 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Maintenance</Badge>;
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-100 flex items-center gap-1"><Clock className="h-3 w-3" /> Draft</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-playfair text-emerald-900 dark:text-emerald-50">
          My Properties
        </h2>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <Building className="mr-2 h-4 w-4" /> Add New Property
        </Button>
      </div>
      
      {/* Property Tabs */}
      <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="all" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
            All ({properties.length})
          </TabsTrigger>
          <TabsTrigger value="available" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
            Available ({properties.filter(p => p.status === "available").length})
          </TabsTrigger>
          <TabsTrigger value="rented" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
            Rented ({properties.filter(p => p.status === "rented").length})
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
            Maintenance ({properties.filter(p => p.status === "maintenance").length})
          </TabsTrigger>
          <TabsTrigger value="draft" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
            Drafts ({properties.filter(p => p.status === "draft").length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          {filteredProperties.length === 0 ? (
            <div className="bg-white dark:bg-black/40 shadow-md dark:shadow-[0_0_20px_rgba(16,185,129,0.05)] rounded-lg p-12 text-center">
              <Building className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-emerald-900 dark:text-emerald-50 mb-2">
                No properties found
              </h3>
              <p className="text-emerald-600 dark:text-emerald-400 max-w-md mx-auto">
                {activeTab === "all" 
                  ? "You haven't added any properties yet. Click 'Add New Property' to get started."
                  : `You don't have any ${activeTab} properties.`}
              </p>
              <Button 
                className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Building className="mr-2 h-4 w-4" /> Add New Property
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredProperties.map((property) => (
                <motion.div 
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-white dark:bg-black/40 shadow-md dark:shadow-[0_0_20px_rgba(16,185,129,0.05)]">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        {/* Property Image */}
                        <div className="relative w-full md:w-64 h-48">
                          <img 
                            src={property.image} 
                            alt={property.title} 
                            className="w-full h-full object-cover"
                          />
                          {property.status === "draft" && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <Badge className="bg-gray-100 text-gray-800">
                                Draft
                              </Badge>
                            </div>
                          )}
                          {property.status === "maintenance" && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <Badge className="bg-amber-100 text-amber-800">
                                Under Maintenance
                              </Badge>
                            </div>
                          )}
                        </div>
                        
                        {/* Property Details */}
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-medium text-emerald-900 dark:text-emerald-50 mb-1">
                                {property.title}
                              </h3>
                              <p className="text-emerald-600 dark:text-emerald-400 text-sm mb-2">
                                {property.location}
                              </p>
                            </div>
                            {getStatusBadge(property.status)}
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-emerald-600 dark:text-emerald-400">Price</p>
                              <p className="font-medium text-emerald-900 dark:text-emerald-50">{property.price}</p>
                            </div>
                            <div>
                              <p className="text-xs text-emerald-600 dark:text-emerald-400">Type</p>
                              <p className="font-medium text-emerald-900 dark:text-emerald-50 capitalize">{property.type}</p>
                            </div>
                            <div>
                              <p className="text-xs text-emerald-600 dark:text-emerald-400">Size</p>
                              <p className="font-medium text-emerald-900 dark:text-emerald-50">{property.beds} bed, {property.baths} bath</p>
                            </div>
                            <div>
                              <p className="text-xs text-emerald-600 dark:text-emerald-400">Last Updated</p>
                              <p className="font-medium text-emerald-900 dark:text-emerald-50">{formatDate(property.lastUpdated)}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            <div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md text-xs text-emerald-700 dark:text-emerald-300">
                              <Eye className="h-3 w-3" /> {property.views} views
                            </div>
                            <div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md text-xs text-emerald-700 dark:text-emerald-300">
                              <MessageSquare className="h-3 w-3" /> {property.inquiries} inquiries
                            </div>
                            {property.status === "rented" && (
                              <div className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md text-xs text-blue-700 dark:text-blue-300">
                                <Calendar className="h-3 w-3" /> Rented until Jan 15, 2024
                              </div>
                            )}
                          </div>
                          
                          {/* Property Actions */}
                          <div className="flex flex-wrap gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
                              onClick={() => openEditDialog(property)}
                            >
                              <Edit className="h-4 w-4 mr-1" /> Edit
                            </Button>
                            
                            {property.status !== "available" && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
                                onClick={() => handleStatusChange(property.id, "available")}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" /> Mark Available
                              </Button>
                            )}
                            
                            {property.status !== "rented" && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
                                onClick={() => handleStatusChange(property.id, "rented")}
                              >
                                <Users className="h-4 w-4 mr-1" /> Mark Rented
                              </Button>
                            )}
                            
                            {property.status !== "maintenance" && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
                                onClick={() => handleStatusChange(property.id, "maintenance")}
                              >
                                <AlertTriangle className="h-4 w-4 mr-1" /> Maintenance
                              </Button>
                            )}
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800/50 dark:hover:bg-red-900/20"
                              onClick={() => confirmDeleteProperty(property.id)}
                            >
                              <Trash className="h-4 w-4 mr-1" /> Delete
                            </Button>
                            
                            {property.status === "available" && (
                              <Button 
                                size="sm"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white ml-auto"
                              >
                                <Sparkles className="h-4 w-4 mr-1" /> Boost Listing
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Performance Insights */}
      {properties.length > 0 && (
        <Card className="bg-white dark:bg-black/40 shadow-md dark:shadow-[0_0_20px_rgba(16,185,129,0.05)] mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-playfair text-emerald-900 dark:text-emerald-50 flex items-center">
              <BarChart className="mr-2 h-5 w-5 text-emerald-600" />
              Performance Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800/50">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white dark:bg-black/60 rounded-full">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-emerald-900 dark:text-emerald-50 mb-1">
                      Price Insight
                    </h4>
                    <p className="text-emerald-700 dark:text-emerald-300 text-sm">
                      Your 2BHK in Bole is priced 8% higher than similar properties in the area. Consider adjusting to 11,000 ETB for faster rental.
                    </p>
                    <Button 
                      variant="link" 
                      className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 p-0 h-auto mt-1"
                    >
                      Update pricing <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800/50">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white dark:bg-black/60 rounded-full">
                    <Camera className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-emerald-900 dark:text-emerald-50 mb-1">
                      Photo Recommendation
                    </h4>
                    <p className="text-emerald-700 dark:text-emerald-300 text-sm">
                      Properties with 5+ photos get 40% more views. Your Studio in Kazanchis only has 3 photos. Add more to increase visibility.
                    </p>
                    <Button 
                      variant="link" 
                      className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 p-0 h-auto mt-1"
                    >
                      Add photos <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[425px] dark:bg-black/90 dark:border-emerald-900/50 dark:backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-playfair text-emerald-900 dark:text-emerald-50">
              Confirm Deletion
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-emerald-700 dark:text-emerald-300">
              Are you sure you want to delete this property? This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={() => setShowDeleteDialog(false)}
              className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteProperty}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete Property
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Edit Property Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[600px] dark:bg-black/90 dark:border-emerald-900/50 dark:backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-playfair text-emerald-900 dark:text-emerald-50">
              Edit Property
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-emerald-800 dark:text-emerald-200">
                Property Title
              </Label>
              <Input
                id="title"
                name="title"
                value={editFormData.title}
                onChange={handleEditFormChange}
                className="bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price" className="text-emerald-800 dark:text-emerald-200">
                Price (ETB/month)
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                  <DollarSign className="h-4 w-4" />
                </div>
                <Input
                  id="price"
                  name="price"
                  type="text"
                  value={editFormData.price}
                  onChange={handleEditFormChange}
                  className="pl-10 bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-emerald-800 dark:text-emerald-200">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={editFormData.description}
                onChange={handleEditFormChange}
                className="min-h-[100px] bg-white/50 dark:bg-emerald-950/30 border-