import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import {
  Heart,
  Share,
  MapPin,
  Calendar,
  Home,
  Ruler,
  Bath,
  BedDouble,
  Car,
  CheckCircle,
  MessageSquare,
  Phone,
  Mail,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useSavedProperties } from "@/hooks/useSavedProperties";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";

type Property = Database["public"]["Tables"]["properties"]["Row"];

const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { saveProperty, unsaveProperty, isPropertySaved } =
    useSavedProperties();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ownerProfile, setOwnerProfile] = useState<any>(null);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleFavoriteToggle = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      if (isFavorited) {
        await unsaveProperty(id!);
      } else {
        await saveProperty(id!);
      }
      setIsFavorited(!isFavorited);
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;

      setIsLoading(true);
      setError(null);

      try {
        // Fetch property details
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        if (!data) throw new Error("Property not found");

        setProperty(data);

        // Increment view count
        await supabase
          .from("properties")
          .update({ views: (data.views || 0) + 1 })
          .eq("id", id);

        // Fetch owner profile
        const { data: ownerData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.owner_id)
          .single();

        setOwnerProfile(ownerData);

        // Check if property is saved by current user
        if (user) {
          const saved = await isPropertySaved(id);
          setIsFavorited(saved);
        }
      } catch (err) {
        console.error("Error fetching property:", err);
        setError("Failed to load property details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id, user]);

  const handleContactAgent = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!property) return;

    try {
      // Create a new message
      await supabase.from("messages").insert({
        sender_id: user.id,
        receiver_id: property.owner_id,
        property_id: property.id,
        content: `I'm interested in your property: ${property.title}`,
        read: false,
      });

      // Navigate to messages page
      navigate("/messages");
    } catch (err) {
      console.error("Error contacting agent:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50 dark:bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-emerald-50 dark:bg-black">
        <h2 className="text-2xl font-playfair text-emerald-900 dark:text-emerald-50 mb-4">
          {error || "Property not found"}
        </h2>
        <Button onClick={() => navigate("/properties")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Properties
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header isDarkMode={isDarkMode} onDarkModeToggle={handleDarkModeToggle} />

      <main className="pt-20">
        {/* Property Images */}
        <section className="relative">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center mb-6">
              <Link
                to="/properties"
                className="flex items-center text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Properties
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-3 relative overflow-hidden rounded-xl">
                <img
                  src={
                    property.images && property.images.length > 0
                      ? property.images[activeImageIndex]
                      : "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=80"
                  }
                  alt={property.title}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    className={`rounded-full backdrop-blur-sm transition-all duration-300 ${isFavorited ? "bg-rose-500 text-white" : "bg-white/80 hover:bg-white dark:bg-black/50 dark:hover:bg-black/70"}`}
                    onClick={handleFavoriteToggle}
                  >
                    <Heart
                      className={`h-4 w-4 ${isFavorited ? "fill-white text-white" : "text-gray-700 dark:text-gray-300"}`}
                    />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-black/50 dark:hover:bg-black/70 transition-all duration-300"
                  >
                    <Share className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                {property.images &&
                  property.images.slice(0, 4).map((image, index) => (
                    <div
                      key={index}
                      className={`relative overflow-hidden rounded-xl cursor-pointer ${index === activeImageIndex ? "ring-2 ring-emerald-500" : ""}`}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <img
                        src={image}
                        alt={`${property.title} - Image ${index + 1}`}
                        className="w-full h-[120px] object-cover"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* Property Details */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <div>
                      <h1 className="text-3xl font-playfair text-emerald-900 dark:text-emerald-50 mb-2">
                        {property.title}
                      </h1>
                      <p className="flex items-center text-emerald-600 dark:text-emerald-400">
                        <MapPin className="h-4 w-4 mr-2" />
                        {property.location}
                      </p>
                    </div>
                    <div>
                      <div className="text-3xl font-playfair text-emerald-700 dark:text-emerald-300">
                        ${property.price.toLocaleString()}
                      </div>
                      <Badge className="mt-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100">
                        {property.status.charAt(0).toUpperCase() +
                          property.status.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-emerald-100 dark:border-emerald-800/30">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 mb-2">
                        <BedDouble className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="text-emerald-900 dark:text-emerald-50 font-medium">
                        {property.bedrooms} Bedrooms
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 mb-2">
                        <Bath className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="text-emerald-900 dark:text-emerald-50 font-medium">
                        {property.bathrooms} Bathrooms
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 mb-2">
                        <Ruler className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="text-emerald-900 dark:text-emerald-50 font-medium">
                        {property.square_feet.toLocaleString()} Sq Ft
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 mb-2">
                        <Home className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="text-emerald-900 dark:text-emerald-50 font-medium">
                        {property.property_type.charAt(0).toUpperCase() +
                          property.property_type.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="location">Location</TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="space-y-4">
                    <p className="text-emerald-700 dark:text-emerald-300">
                      {property.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="space-y-2">
                        <p className="text-emerald-900 dark:text-emerald-50 font-medium">
                          Property Type
                        </p>
                        <p className="text-emerald-600 dark:text-emerald-400">
                          {property.property_type.charAt(0).toUpperCase() +
                            property.property_type.slice(1)}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-emerald-900 dark:text-emerald-50 font-medium">
                          Year Built
                        </p>
                        <p className="text-emerald-600 dark:text-emerald-400">
                          {property.year_built || "Not specified"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-emerald-900 dark:text-emerald-50 font-medium">
                          City
                        </p>
                        <p className="text-emerald-600 dark:text-emerald-400">
                          {property.city}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-emerald-900 dark:text-emerald-50 font-medium">
                          Status
                        </p>
                        <p className="text-emerald-600 dark:text-emerald-400">
                          {property.status.charAt(0).toUpperCase() +
                            property.status.slice(1)}
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="features">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {property.features &&
                        property.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20"
                          >
                            <CheckCircle className="h-5 w-5 text-emerald-500" />
                            <span className="text-emerald-700 dark:text-emerald-300">
                              {feature}
                            </span>
                          </div>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="location">
                    <div className="rounded-xl overflow-hidden h-[400px] bg-emerald-50 dark:bg-emerald-900/20">
                      <iframe
                        title="Property Location"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(property.address + ", " + property.city + ", " + property.state)}`}
                        allowFullScreen
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="overflow-hidden border-none shadow-lg dark:shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={
                          ownerProfile?.avatar_url ||
                          `https://api.dicebear.com/7.x/avataaars/svg?seed=${ownerProfile?.first_name || "Agent"}`
                        }
                        alt={ownerProfile?.first_name || "Agent"}
                        className="w-16 h-16 rounded-full"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-50">
                          {ownerProfile
                            ? `${ownerProfile.first_name || ""} ${ownerProfile.last_name || ""}`
                            : "Property Agent"}
                        </h3>
                        <p className="text-emerald-600 dark:text-emerald-400">
                          Luxury Property Specialist
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Button
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                        onClick={handleContactAgent}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message Agent
                      </Button>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1 border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </Button>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Viewing
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border-none shadow-lg dark:shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-50 mb-4">
                      Property Stats
                    </h3>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-emerald-700 dark:text-emerald-300">
                          Views
                        </span>
                        <span className="font-medium text-emerald-900 dark:text-emerald-50">
                          {property.views || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-emerald-700 dark:text-emerald-300">
                          Inquiries
                        </span>
                        <span className="font-medium text-emerald-900 dark:text-emerald-50">
                          {property.inquiries || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-emerald-700 dark:text-emerald-300">
                          Listed On
                        </span>
                        <span className="font-medium text-emerald-900 dark:text-emerald-50">
                          {new Date(property.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetailPage;
