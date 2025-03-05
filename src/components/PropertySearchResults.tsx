import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import PropertyCard from "./PropertyCard";
import {
  Search,
  MapPin,
  Grid,
  Map,
  SlidersHorizontal,
  X,
  Zap,
  Shield,
  Droplets,
  Home,
  DollarSign,
  Calendar,
  Star,
  Clock,
  Filter,
  CheckCircle,
} from "lucide-react";

interface PropertySearchResultsProps {
  initialSearchParams?: any;
  onFilterChange?: (filters: any) => void;
  onViewTypeChange?: (viewType: "grid" | "map") => void;
  onSortChange?: (sortOption: string) => void;
}

const PropertySearchResults: React.FC<PropertySearchResultsProps> = ({
  initialSearchParams = {},
  onFilterChange = () => {},
  onViewTypeChange = () => {},
  onSortChange = () => {},
}) => {
  const [viewType, setViewType] = useState<"grid" | "map">("grid");
  const [sortOption, setSortOption] = useState("newest");
  const [priceRange, setPriceRange] = useState([5000, 15000]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([
    // Sample property data
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=80",
      title: "Modern 2BHK with Balcony",
      price: "12,000 ETB/month",
      location: "Bole, Addis Ababa",
      beds: 2,
      baths: 1,
      sqft: 850,
      type: "apartment",
      rating: 4.5,
      views: 120,
      verified: true,
      amenities: ["generator", "water-tank", "guard"],
      nearAirport: true,
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80",
      title: "Luxury Villa with Garden",
      price: "35,000 ETB/month",
      location: "CMC, Addis Ababa",
      beds: 4,
      baths: 3,
      sqft: 2200,
      type: "villa",
      rating: 4.8,
      views: 85,
      verified: true,
      amenities: ["generator", "water-tank", "guard", "parking"],
      nearAirport: false,
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
      title: "Cozy Studio near Merkato",
      price: "8,000 ETB/month",
      location: "Piassa, Addis Ababa",
      beds: 1,
      baths: 1,
      sqft: 450,
      type: "studio",
      rating: 4.2,
      views: 65,
      verified: false,
      amenities: ["water-tank"],
      nearAirport: false,
    },
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop&q=80",
      title: "3BHK Apartment with City View",
      price: "18,000 ETB/month",
      location: "Kazanchis, Addis Ababa",
      beds: 3,
      baths: 2,
      sqft: 1200,
      type: "apartment",
      rating: 4.6,
      views: 110,
      verified: true,
      amenities: ["generator", "water-tank", "guard", "parking"],
      nearAirport: false,
    },
    {
      id: "5",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=80",
      title: "G+1 House with Injera Kitchen",
      price: "25,000 ETB/month",
      location: "Ayat, Addis Ababa",
      beds: 3,
      baths: 2,
      sqft: 1800,
      type: "house",
      rating: 4.4,
      views: 95,
      verified: true,
      amenities: [
        "generator",
        "water-tank",
        "guard",
        "injera-kitchen",
        "parking",
      ],
      nearAirport: false,
    },
    {
      id: "6",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      title: "1BHK near Bole Airport",
      price: "10,000 ETB/month",
      location: "Bole, Addis Ababa",
      beds: 1,
      baths: 1,
      sqft: 650,
      type: "apartment",
      rating: 4.3,
      views: 78,
      verified: false,
      amenities: ["water-tank", "guard"],
      nearAirport: true,
    },
  ]);

  // Ethiopian-specific filters
  const ethiopianFilters = [
    {
      id: "near-airport",
      label: "Near Bole Airport",
      icon: <MapPin className="h-4 w-4" />,
    },
    {
      id: "generator",
      label: "Backup Generator (ማቲክ)",
      icon: <Zap className="h-4 w-4" />,
    },
    {
      id: "water-tank",
      label: "Water Tank",
      icon: <Droplets className="h-4 w-4" />,
    },
    {
      id: "guard",
      label: "24/7 Guard (ጠባቂ)",
      icon: <Shield className="h-4 w-4" />,
    },
    {
      id: "kebele-verified",
      label: "Kebele Verified",
      icon: <CheckCircle className="h-4 w-4" />,
    },
    {
      id: "injera-kitchen",
      label: "Injera Kitchen",
      icon: <Home className="h-4 w-4" />,
    },
  ];

  // Sort options
  const sortOptions = [
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "most-reviewed", label: "Most Reviewed" },
    { value: "highest-rated", label: "Highest Rated" },
    { value: "newest", label: "Newest First" },
  ];

  const handleViewTypeChange = (type: "grid" | "map") => {
    setViewType(type);
    onViewTypeChange(type);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    onSortChange(value);

    // Sort the results based on the selected option
    const sortedResults = [...searchResults];
    switch (value) {
      case "price-low":
        sortedResults.sort(
          (a, b) =>
            parseInt(a.price.replace(/[^0-9]/g, "")) -
            parseInt(b.price.replace(/[^0-9]/g, "")),
        );
        break;
      case "price-high":
        sortedResults.sort(
          (a, b) =>
            parseInt(b.price.replace(/[^0-9]/g, "")) -
            parseInt(a.price.replace(/[^0-9]/g, "")),
        );
        break;
      case "most-reviewed":
        sortedResults.sort((a, b) => b.views - a.views);
        break;
      case "highest-rated":
        sortedResults.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // In a real app, this would sort by date
        // For demo, we'll just use the current order
        break;
    }

    setSearchResults(sortedResults);
  };

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId],
    );
  };

  const applyFilters = () => {
    // In a real app, this would make an API call with the filters
    // For demo, we'll just filter the sample data

    // Filter by price range
    let filteredResults = searchResults.filter((property) => {
      const price = parseInt(property.price.replace(/[^0-9]/g, ""));
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Apply selected filters
    if (selectedFilters.length > 0) {
      filteredResults = filteredResults.filter((property) => {
        // Check for near airport filter
        if (selectedFilters.includes("near-airport") && !property.nearAirport) {
          return false;
        }

        // Check for kebele verified filter
        if (selectedFilters.includes("kebele-verified") && !property.verified) {
          return false;
        }

        // Check for amenity filters
        for (const filter of selectedFilters) {
          if (
            filter !== "near-airport" &&
            filter !== "kebele-verified" &&
            !property.amenities.includes(filter)
          ) {
            return false;
          }
        }

        return true;
      });
    }

    setSearchResults(filteredResults);
    setShowFilters(false);

    // Notify parent component
    onFilterChange({
      priceRange,
      filters: selectedFilters,
    });
  };

  const resetFilters = () => {
    setPriceRange([5000, 15000]);
    setSelectedFilters([]);
    // Reset to original results (in a real app, this would re-fetch)
  };

  const handleQuickView = (property: any) => {
    console.log("Quick view:", property);
  };

  const handleFavorite = (property: any) => {
    console.log("Favorite:", property);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-playfair text-emerald-900 dark:text-emerald-50 mb-2">
            Search Results
          </h1>
          <p className="text-emerald-600 dark:text-emerald-400">
            Found {searchResults.length} properties matching your criteria
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* View Type Toggle */}
          <div className="bg-white dark:bg-black/40 rounded-lg border border-emerald-100 dark:border-emerald-800/50 p-1 flex">
            <Button
              variant={viewType === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => handleViewTypeChange("grid")}
              className={viewType === "grid" ? "bg-emerald-600" : ""}
            >
              <Grid className="h-4 w-4 mr-2" />
              Grid
            </Button>
            <Button
              variant={viewType === "map" ? "default" : "ghost"}
              size="sm"
              onClick={() => handleViewTypeChange("map")}
              className={viewType === "map" ? "bg-emerald-600" : ""}
            >
              <Map className="h-4 w-4 mr-2" />
              Map
            </Button>
          </div>

          {/* Sort Dropdown */}
          <Select value={sortOption} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px] bg-white dark:bg-black/40 border-emerald-100 dark:border-emerald-800/50">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Filter Button */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="border-emerald-100 dark:border-emerald-800/50"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-black/40 rounded-lg border border-emerald-100 dark:border-emerald-800/50 p-6 mb-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-emerald-900 dark:text-emerald-50">
              Filter Properties
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(false)}
              className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price Range */}
            <div className="space-y-4">
              <Label className="text-emerald-800 dark:text-emerald-200">
                Price Range (ETB/month)
              </Label>
              <div className="pt-6 px-2">
                <Slider
                  value={priceRange}
                  min={1000}
                  max={50000}
                  step={1000}
                  onValueChange={setPriceRange}
                />
              </div>
              <div className="flex justify-between text-sm text-emerald-600 dark:text-emerald-400">
                <span>{priceRange[0].toLocaleString()} ETB</span>
                <span>{priceRange[1].toLocaleString()} ETB</span>
              </div>
            </div>

            {/* Ethiopian-specific Filters */}
            <div className="space-y-4">
              <Label className="text-emerald-800 dark:text-emerald-200">
                Amenities & Features
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ethiopianFilters.map((filter) => (
                  <div
                    key={filter.id}
                    className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors ${selectedFilters.includes(filter.id) ? "bg-emerald-50 dark:bg-emerald-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-900/10"}`}
                    onClick={() => toggleFilter(filter.id)}
                  >
                    <Checkbox
                      checked={selectedFilters.includes(filter.id)}
                      className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-600 dark:text-emerald-400">
                        {filter.icon}
                      </span>
                      <span className="text-emerald-800 dark:text-emerald-200">
                        {filter.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={resetFilters}
              className="border-emerald-100 dark:border-emerald-800/50"
            >
              Reset
            </Button>
            <Button
              onClick={applyFilters}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Apply Filters
            </Button>
          </div>
        </motion.div>
      )}

      {/* Search Results */}
      {viewType === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((property) => (
            <div key={property.id}>
              <PropertyCard
                id={property.id}
                image={property.image}
                title={property.title}
                price={property.price}
                location={property.location}
                beds={property.beds}
                baths={property.baths}
                sqft={property.sqft}
                type={property.type}
                rating={property.rating}
                views={property.views}
                onQuickView={() => handleQuickView(property)}
                onFavorite={() => handleFavorite(property)}
              />
              {/* Ethiopian-specific badges */}
              <div className="flex flex-wrap gap-2 mt-2">
                {property.verified && (
                  <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-100 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> Kebele Verified
                  </Badge>
                )}
                {property.nearAirport && (
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Near Bole Airport
                  </Badge>
                )}
                {property.amenities.includes("generator") && (
                  <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-100 flex items-center gap-1">
                    <Zap className="h-3 w-3" /> ማቲክ አለ
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-black/40 rounded-lg border border-emerald-100 dark:border-emerald-800/50 h-[600px] relative">
          {/* Map View - In a real app, this would be an actual map */}
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
            <div className="text-center">
              <Map className="h-16 w-16 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
              <p className="text-emerald-800 dark:text-emerald-200 text-lg font-medium">
                Map View
              </p>
              <p className="text-emerald-600 dark:text-emerald-400 max-w-md mx-auto mt-2">
                In a real application, this would display an interactive map
                with property pins color-coded by price range.
              </p>
            </div>
          </div>

          {/* Property markers would be positioned absolutely on the map */}
          {searchResults.map((property, index) => (
            <div
              key={property.id}
              className="absolute"
              style={{
                left: `${20 + (index % 5) * 15}%`,
                top: `${20 + Math.floor(index / 5) * 20}%`,
              }}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium cursor-pointer transform hover:scale-110 transition-transform ${parseInt(property.price.replace(/[^0-9]/g, "")) < 10000 ? "bg-green-500" : parseInt(property.price.replace(/[^0-9]/g, "")) < 20000 ? "bg-amber-500" : "bg-red-500"}`}
                title={`${property.title} - ${property.price}`}
              >
                {property.beds}B
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {searchResults.length === 0 && (
        <div className="bg-white dark:bg-black/40 rounded-lg border border-emerald-100 dark:border-emerald-800/50 p-12 text-center">
          <Search className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-emerald-900 dark:text-emerald-50 mb-2">
            No properties found
          </h3>
          <p className="text-emerald-600 dark:text-emerald-400 max-w-md mx-auto">
            Try adjusting your search filters or exploring different areas.
          </p>
          <Button
            variant="outline"
            onClick={resetFilters}
            className="mt-4 border-emerald-100 dark:border-emerald-800/50"
          >
            Reset Filters
          </Button>
        </div>
      )}

      {/* Pagination */}
      {searchResults.length > 0 && (
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled
              className="border-emerald-100 dark:border-emerald-800/50"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-emerald-100 dark:border-emerald-800/50 bg-emerald-50 dark:bg-emerald-900/20"
            >
              1
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-emerald-100 dark:border-emerald-800/50"
            >
              2
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-emerald-100 dark:border-emerald-800/50"
            >
              3
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-emerald-100 dark:border-emerald-800/50"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertySearchResults;
