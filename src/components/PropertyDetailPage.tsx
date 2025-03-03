import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import {
  Heart,
  Share,
  MapPin,
  Calendar,
  Home,
  Bath,
  Maximize2,
  Clock,
  DollarSign,
  Send,
  Phone,
  Mail,
  Check,
  X,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useSavedProperties } from "../hooks/useSavedProperties";
import { supabase } from "../lib/supabase";
import { Database } from "../types/supabase";

type Property = Database["public"]["Tables"]["properties"]["Row"];
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { saveProperty, unsaveProperty, isSaved } = useSavedProperties();
  const [property, setProperty] = useState<Property | null>(null);
  const [owner, setOwner] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      fetchProperty(id);
    }
  }, [id]);

  const fetchProperty = async (propertyId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Get property details
      const { data: propertyData, error: propertyError } = await supabase
        .from("properties")
        .select("*")
        .eq("id", propertyId)
        .single();

      if (propertyError) throw propertyError;

      setProperty(propertyData);

      // Get owner details
      if (propertyData.owner_id) {
        const { data: ownerData, error: ownerError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", propertyData.owner_id)
          .single();

        if (ownerError) throw ownerError;

        setOwner(ownerData);
      }

      // Check if property is saved
      if (user) {
        const { data: savedData } = await supabase
          .from("saved_properties")
          .select("*")
          .eq("user_id", user.id)
          .eq("property_id", propertyId);

        setIsFavorited(savedData && savedData.length > 0);
      }

      // Increment view count
      await supabase
        .from("properties")
        .update({ views: (propertyData.views || 0) + 1 })
        .eq("id", propertyId);
    } catch (err) {
      console.error("Error fetching property:", err);
      setError("Failed to load property details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavoriteToggle = async () => {
    if (!user) {
      // Redirect to login
      window.location.href = "/login";
      return;
    }

    if (!property) return;

    try {
      if (isFavorited) {
        await unsaveProperty(property.id);
      } else {
        await saveProperty(property.id);
      }

      setIsFavorited(!isFavorited);
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  const handleSendMessage = async () => {
    if (!user) {
      // Redirect to login
      window.location.href = "/login";
      return;
    }

    if (!property || !message.trim()) return;

    setIsSending(true);

    try {
      const { error: messageError } = await supabase.from("messages").insert({
        sender_id: user.id,
        receiver_id: property.owner_id,
        property_id: property.id,
        content: message,
        read: false,
      });

      if (messageError) throw messageError;

      // Increment inquiries count
      await supabase
        .from("properties")
        .update({ inquiries: (property.inquiries || 0) + 1 })
        .eq("id", property.id);

      setMessage("");
      alert("Message sent successfully!");
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleApply = async () => {
    if (!user) {
      // Redirect to login
      window.location.href = "/login";
      return;
    }

    if (!property) return;

    try {
      // Check if already applied
      const { data: existingData } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", user.id)
        .eq("property_id", property.id);

      if (existingData && existingData.length > 0) {
        alert("You have already applied for this property.");
        return;
      }

      // Submit application
      const { error: applicationError } = await supabase
        .from("applications")
        .insert({
          user_id: user.id,
          property_id: property.id,
          status: "pending",
          documents: [],
        });

      if (applicationError) throw applicationError;

      // Increment inquiries count
      await supabase
        .from("properties")
        .update({ inquiries: (property.inquiries || 0) + 1 })
        .eq("id", property.id);

      alert("Application submitted successfully!");
    } catch (err) {
      console.error("Error applying for property:", err);
      alert("Failed to submit application. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 flex items-center justify-center">
          <div className="animate-pulse">
            <div className="h-8 w-64 bg-emerald-200 dark:bg-emerald-800 rounded mb-4"></div>
            <div className="h-4 w-48 bg-emerald-100 dark:bg-emerald-900 rounded mb-8"></div>
            <div className="h-96 w-full bg-emerald-100 dark:bg-emerald-900 rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="h-40 bg-emerald-50 dark:bg-emerald-900/50 rounded-lg"></div>
              <div className="h-40 bg-emerald-50 dark:bg-emerald-900/50 rounded-lg"></div>
              <div className="h-40 bg-emerald-50 dark:bg-emerald-900/50 rounded-lg"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-white dark:bg-black">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-playfair text-emerald-900 dark:text-emerald-50 mb-4">
            Property Not Found
          </h1>
          <p className="text-emerald-600 dark:text-emerald-400 mb-8">
            {error ||
              "The property you're looking for doesn't exist or has been removed."}
          </p>
          <Link to="/properties">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Browse Properties
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />

      <main className="pt-20">
        {/* Property Images */}
        <section className="relative h-[500px] overflow-hidden">
          {property.images && property.images.length > 0 ? (
            <>
              {property.images.map((image, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeImageIndex === index ? 1 : 0,
                    transition: { duration: 0.5 },
                  }}
                >
                  <img
                    src={image}
                    alt={`${property.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}

              {/* Image navigation */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${activeImageIndex === index ? "bg-white w-8" : "bg-white/50"}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <Home className="h-20 w-20 text-emerald-500 opacity-50" />
            </div>
          )}

          {/* Property status badge */}
          <div className="absolute top-4 left-4">
            <Badge
              className={`${property.status === "available" ? "bg-emerald-600" : property.status === "pending" ? "bg-amber-500" : "bg-blue-600"} text-white px-3 py-1 text-sm`}
            >
              {property.status.charAt(0).toUpperCase() +
                property.status.slice(1)}
            </Badge>
          </div>

          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button
              variant="secondary"
              size="icon"
              className={`rounded-full backdrop-blur-sm transition-all duration-300 ${isFavorited ? "bg-rose-500 text-white" : "bg-white/80 hover:bg-white"}`}
              onClick={handleFavoriteToggle}
            >
              <Heart
                className={`h-4 w-4 ${isFavorited ? "fill-white text-white" : "text-gray-700"}`}
              />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
              }}
            >
              <Share className="h-4 w-4 text-gray-700" />
            </Button>
          </div>
        </section>

        {/* Property Details */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-3xl font-playfair text-emerald-900 dark:text-emerald-50">
                    {property.title}
                  </h1>
                  <div className="text-2xl font-playfair text-emerald-600 dark:text-emerald-400">
                    ${property.price.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center text-emerald-600 dark:text-emerald-400 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{property.location}</span>
                </div>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-emerald-700 dark:text-emerald-300">
                    <Home className="h-4 w-4 mr-1" />
                    <span>{property.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center text-emerald-700 dark:text-emerald-300">
                    <Bath className="h-4 w-4 mr-1" />
                    <span>{property.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center text-emerald-700 dark:text-emerald-300">
                    <Maximize2 className="h-4 w-4 mr-1" />
                    <span>{property.square_feet.toLocaleString()} Sq Ft</span>
                  </div>
                  <div className="flex items-center text-emerald-700 dark:text-emerald-300">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Built {property.year_built || "N/A"}</span>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="description" className="w-full mb-8">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>

                <TabsContent
                  value="description"
                  className="text-emerald-700 dark:text-emerald-300"
                >
                  <p className="mb-4">{property.description}</p>
                  <p>
                    This {property.property_type} is located in {property.city},{" "}
                    {property.state} and is currently {property.status}. It
                    features {property.bedrooms} bedrooms and{" "}
                    {property.bathrooms} bathrooms with a total of{" "}
                    {property.square_feet.toLocaleString()} square feet of
                    living space.
                  </p>
                </TabsContent>

                <TabsContent value="features">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.features && property.features.length > 0 ? (
                      property.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center text-emerald-700 dark:text-emerald-300"
                        >
                          <Check className="h-4 w-4 mr-2 text-emerald-500" />
                          <span>{feature}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-emerald-600 dark:text-emerald-400 col-span-2">
                        No specific features listed for this property.
                      </p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="location">
                  <div className="h-[300px] bg-emerald-100 dark:bg-emerald-900/30 rounded-lg overflow-hidden">
                    <iframe
                      title="Property Location"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBZjYKtZVAVJJF_BwkZ8G-xyBOJKPVFMtw&q=${encodeURIComponent(
                        `${property.address}, ${property.city}, ${property.state} ${property.zip_code}`,
                      )}`}
                      allowFullScreen
                    ></iframe>
                  </div>
                  <p className="mt-4 text-emerald-700 dark:text-emerald-300">
                    {property.address}, {property.city}, {property.state}{" "}
                    {property.zip_code}
                  </p>
                </TabsContent>
              </Tabs>

              <div className="mb-8">
                <h2 className="text-xl font-playfair text-emerald-900 dark:text-emerald-50 mb-4">
                  Property Stats
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Eye className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-semibold text-emerald-700 dark:text-emerald-300">
                        {property.views || 0}
                      </div>
                      <div className="text-sm text-emerald-600 dark:text-emerald-400">
                        Views
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Mail className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-semibold text-emerald-700 dark:text-emerald-300">
                        {property.inquiries || 0}
                      </div>
                      <div className="text-sm text-emerald-600 dark:text-emerald-400">
                        Inquiries
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-semibold text-emerald-700 dark:text-emerald-300">
                        {new Date(property.created_at).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-emerald-600 dark:text-emerald-400">
                        Listed Date
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <DollarSign className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-semibold text-emerald-700 dark:text-emerald-300">
                        ${Math.round(property.price / property.square_feet)}
                      </div>
                      <div className="text-sm text-emerald-600 dark:text-emerald-400">
                        Per Sq Ft
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-white dark:bg-black/40 border border-emerald-100 dark:border-emerald-800/30 rounded-xl p-6 shadow-lg dark:shadow-[0_0_30px_rgba(16,185,129,0.1)] sticky top-24">
                <h2 className="text-xl font-playfair text-emerald-900 dark:text-emerald-50 mb-4">
                  Contact {owner?.first_name || "Landlord"}
                </h2>

                {owner && (
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xl font-semibold mr-3">
                      {owner.first_name?.[0] || "L"}
                    </div>
                    <div>
                      <div className="font-medium text-emerald-900 dark:text-emerald-50">
                        {owner.first_name} {owner.last_name}
                      </div>
                      <div className="text-sm text-emerald-600 dark:text-emerald-400">
                        Property Owner
                      </div>
                    </div>
                  </div>
                )}

                <Separator className="my-4 bg-emerald-100 dark:bg-emerald-800/50" />

                <div className="space-y-4 mb-6">
                  <Textarea
                    placeholder="Write a message to the landlord..."
                    className="min-h-[120px] bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800 focus-visible:ring-emerald-500"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />

                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={handleSendMessage}
                    disabled={isSending || !message.trim()}
                  >
                    {isSending ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> Send Message
                      </>
                    )}
                  </Button>
                </div>

                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
                    onClick={() => (window.location.href = `tel:+1234567890`)}
                  >
                    <Phone className="mr-2 h-4 w-4" /> Call Agent
                  </Button>

                  {property.status === "available" && (
                    <Button
                      className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white"
                      onClick={handleApply}
                    >
                      Apply for this Property
                    </Button>
                  )}
                </div>
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
