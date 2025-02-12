import React, { useState } from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";
import PropertySection from "./PropertySection";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleContactClick = () => {
    setIsContactDialogOpen(true);
  };

  const handleQuickView = (property: any) => {
    setSelectedProperty(property);
  };

  const handleFavorite = (property: any) => {
    console.log("Favorite:", property);
  };

  const handleSearch = (searchParams: any) => {
    console.log("Search params:", searchParams);
  };

  // Sample property data
  const featuredProperties = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
      title: "Luxury Villa with Ocean View",
      price: "$2,500,000",
      location: "Beverly Hills, CA",
      beds: 5,
      baths: 4,
      sqft: 4500,
      type: "villa",
      rating: 4.9,
      views: 1250,
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      title: "Modern Mansion Estate",
      price: "$5,900,000",
      location: "Bel Air, CA",
      beds: 7,
      baths: 8,
      sqft: 8200,
      type: "mansion",
      rating: 4.8,
      views: 980,
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      title: "Contemporary Beachfront Villa",
      price: "$4,200,000",
      location: "Malibu, CA",
      beds: 4,
      baths: 5,
      sqft: 3800,
      type: "villa",
      rating: 4.7,
      views: 1500,
    },
  ];

  const topRatedProperties = featuredProperties
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const mostViewedProperties = featuredProperties
    .slice()
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  const villaProperties = featuredProperties.filter((p) => p.type === "villa");
  const mansionProperties = featuredProperties.filter(
    (p) => p.type === "mansion",
  );

  return (
    <div className="min-h-screen bg-white dark:bg-emerald-950 transition-colors duration-300">
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
      </main>

      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-playfair text-emerald-900 dark:text-emerald-50">
              Contact Agent
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsContactDialogOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              Our luxury real estate experts are ready to assist you. Please
              call us directly or leave your contact information below.
            </p>
            <div className="flex justify-center">
              <Button
                className="bg-emerald-600 text-white hover:bg-emerald-700 transition-colors w-full"
                onClick={() => (window.location.href = "tel:+1234567890")}
              >
                Call Now: (123) 456-7890
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
