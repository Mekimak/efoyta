import React, { useState, useEffect } from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";
import PropertySection from "./PropertySection";
import Footer from "./Footer";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { X, Phone, Mail, MessageSquare } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { MouseFollowEffect } from "./3d/MouseFollowEffect";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "./ui/badge";

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    // Check if user prefers dark mode
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (prefersDark) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleContactClick = () => {
    setIsContactDialogOpen(true);
  };

  const handleQuickView = (property: any) => {
    setSelectedProperty(property);
    setQuickViewOpen(true);
  };

  const handleFavorite = (property: any) => {
    console.log("Favorite:", property);
  };

  const handleSearch = (searchParams: any) => {
    console.log("Search params:", searchParams);
  };

  const handleContactFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
    // Reset form
    setContactForm({ name: "", email: "", message: "" });
    // Close dialog
    setIsContactDialogOpen(false);
  };

  // Sample property data with enhanced images
  const featuredProperties = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=80",
      title: "Luxury Villa with Ocean View",
      price: "$2,500,000",
      location: "Beverly Hills, CA",
      beds: 5,
      baths: 4,
      sqft: 4500,
      type: "villa",
      rating: 4.9,
      views: 1250,
      description:
        "Experience the epitome of luxury living in this stunning oceanfront villa. Featuring panoramic views, a private infinity pool, and meticulously designed interiors.",
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80",
      title: "Modern Mansion Estate",
      price: "$5,900,000",
      location: "Bel Air, CA",
      beds: 7,
      baths: 8,
      sqft: 8200,
      type: "mansion",
      rating: 4.8,
      views: 980,
      description:
        "A masterpiece of modern architecture, this mansion offers unparalleled luxury with smart home technology, a home theater, wine cellar, and expansive outdoor entertainment areas.",
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
      title: "Contemporary Beachfront Villa",
      price: "$4,200,000",
      location: "Malibu, CA",
      beds: 4,
      baths: 5,
      sqft: 3800,
      type: "villa",
      rating: 4.7,
      views: 1500,
      description:
        "This contemporary beachfront villa offers direct access to a private beach, floor-to-ceiling windows with breathtaking ocean views, and a designer kitchen with top-of-the-line appliances.",
    },
  ];

  // Add more properties for a fuller experience
  const additionalProperties = [
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop&q=80",
      title: "Elegant Penthouse Suite",
      price: "$3,800,000",
      location: "Downtown LA, CA",
      beds: 3,
      baths: 3.5,
      sqft: 3200,
      type: "penthouse",
      rating: 4.9,
      views: 1100,
      description:
        "Perched atop a luxury high-rise, this penthouse offers 360-degree city views, a private rooftop terrace, and exclusive access to premium building amenities.",
    },
    {
      id: "5",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=80",
      title: "Mediterranean Estate",
      price: "$7,200,000",
      location: "Pacific Palisades, CA",
      beds: 6,
      baths: 7,
      sqft: 7500,
      type: "estate",
      rating: 4.8,
      views: 950,
      description:
        "This Mediterranean-inspired estate features lush gardens, a tennis court, guest house, and a resort-style pool with cascading waterfalls.",
    },
    {
      id: "6",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      title: "Modernist Glass Mansion",
      price: "$8,500,000",
      location: "Hollywood Hills, CA",
      beds: 5,
      baths: 6,
      sqft: 6800,
      type: "mansion",
      rating: 4.7,
      views: 1300,
      description:
        "A triumph of modernist design, this glass mansion features cantilevered spaces, an indoor-outdoor living concept, and breathtaking views of the entire Los Angeles basin.",
    },
  ];

  const allProperties = [...featuredProperties, ...additionalProperties];

  const topRatedProperties = allProperties
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const mostViewedProperties = allProperties
    .slice()
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  const villaProperties = allProperties.filter((p) => p.type === "villa");
  const mansionProperties = allProperties.filter((p) => p.type === "mansion");
  const penthouseProperties = allProperties.filter(
    (p) => p.type === "penthouse",
  );

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Mouse follow effect for dark mode */}
      {isDarkMode && <MouseFollowEffect />}

      <Header
        isDarkMode={isDarkMode}
        onDarkModeToggle={handleDarkModeToggle}
        onContactClick={handleContactClick}
      />

      <main>
        <HeroSection onSearchSubmit={handleSearch} />
        <StatsSection />

        <PropertySection
          title="Featured Properties"
          subtitle="Handpicked luxury estates for your consideration"
          properties={featuredProperties}
          onQuickView={handleQuickView}
          onFavorite={handleFavorite}
        />

        <PropertySection
          title="Top Rated"
          subtitle="Highest rated properties by our clients"
          properties={topRatedProperties}
          onQuickView={handleQuickView}
          onFavorite={handleFavorite}
        />

        <PropertySection
          title="Most Viewed"
          subtitle="Popular properties that are trending now"
          properties={mostViewedProperties}
          onQuickView={handleQuickView}
          onFavorite={handleFavorite}
        />

        <PropertySection
          title="Luxury Villas"
          subtitle="Exclusive villa properties in prime locations"
          properties={villaProperties}
          onQuickView={handleQuickView}
          onFavorite={handleFavorite}
        />

        <PropertySection
          title="Mansions & Estates"
          subtitle="Spectacular mansion properties for the discerning buyer"
          properties={mansionProperties}
          onQuickView={handleQuickView}
          onFavorite={handleFavorite}
        />

        {penthouseProperties.length > 0 && (
          <PropertySection
            title="Luxury Penthouses"
            subtitle="Exclusive penthouses with stunning city views"
            properties={penthouseProperties}
            onQuickView={handleQuickView}
            onFavorite={handleFavorite}
          />
        )}
      </main>

      <Footer />

      {/* Contact Dialog */}
      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="sm:max-w-[500px] dark:bg-black/90 dark:border-emerald-900/50 dark:backdrop-blur-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-playfair text-emerald-900 dark:text-emerald-50 dark:glow-text">
              Contact Our Luxury Specialists
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsContactDialogOpen(false)}
              className="rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <form onSubmit={handleContactFormSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                  <Mail className="h-4 w-4" />
                </div>
                <Input
                  id="name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactFormChange}
                  placeholder="Enter your name"
                  className="pl-10 bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800 focus-visible:ring-emerald-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Your Email</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                  <Mail className="h-4 w-4" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={contactForm.email}
                  onChange={handleContactFormChange}
                  placeholder="Enter your email"
                  className="pl-10 bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800 focus-visible:ring-emerald-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Your Message</Label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-emerald-500">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <Textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactFormChange}
                  placeholder="How can we help you?"
                  className="pl-10 min-h-[120px] bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800 focus-visible:ring-emerald-500"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="button"
                className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white transition-all duration-300 shadow-md hover:shadow-lg dark:shadow-emerald-900/20 dark:hover:shadow-emerald-900/40"
                onClick={() => (window.location.href = "tel:+1234567890")}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call: (123) 456-7890
              </Button>

              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Quick View Dialog */}
      <AnimatePresence>
        {quickViewOpen && selectedProperty && (
          <Dialog open={quickViewOpen} onOpenChange={setQuickViewOpen}>
            <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden dark:bg-black/90 dark:border-emerald-900/50 dark:backdrop-blur-xl">
              <div className="relative">
                <img
                  src={selectedProperty.image}
                  alt={selectedProperty.title}
                  className="w-full h-[300px] object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuickViewOpen(false)}
                  className="absolute top-4 right-4 rounded-full bg-white/80 hover:bg-white dark:bg-black/50 dark:hover:bg-black/70 backdrop-blur-sm"
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h2 className="text-2xl font-playfair text-white mb-1">
                    {selectedProperty.title}
                  </h2>
                  <p className="text-emerald-100">
                    {selectedProperty.location}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-2xl font-playfair text-emerald-900 dark:text-emerald-50">
                    {selectedProperty.price}
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100">
                      {selectedProperty.beds} Beds
                    </Badge>
                    <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100">
                      {selectedProperty.baths} Baths
                    </Badge>
                    <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100">
                      {selectedProperty.sqft.toLocaleString()} Sq Ft
                    </Badge>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {selectedProperty.description ||
                    "Experience the epitome of luxury living in this stunning property featuring premium finishes, smart home technology, and breathtaking views."}
                </p>

                <div className="flex justify-end gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setQuickViewOpen(false)}
                    className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
                  >
                    Close
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white transition-all duration-300 shadow-md hover:shadow-lg dark:shadow-emerald-900/20 dark:hover:shadow-emerald-900/40"
                    onClick={() => {
                      setQuickViewOpen(false);
                      setIsContactDialogOpen(true);
                    }}
                  >
                    Contact Agent
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
