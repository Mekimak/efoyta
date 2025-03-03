import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, MapPin, Home, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  onSearch: (searchParams: {
    location: string;
    priceRange: string;
    propertyType: string;
  }) => void;
  className?: string;
}

const SearchBar = ({ onSearch, className = "" }: SearchBarProps) => {
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    // Perform search
    onSearch({
      location,
      priceRange,
      propertyType,
    });

    // Navigate to properties page with search params
    navigate(
      `/properties?location=${encodeURIComponent(location)}&priceRange=${encodeURIComponent(priceRange)}&propertyType=${encodeURIComponent(propertyType)}`,
    );

    // Log the search parameters for debugging
    console.log("Search parameters:", {
      location,
      priceRange,
      propertyType,
    });
  };

  return (
    <div
      className={`flex flex-col md:flex-row gap-4 p-6 bg-white/80 dark:bg-black/40 backdrop-blur-xl rounded-xl shadow-lg dark:shadow-[0_0_30px_rgba(16,185,129,0.2)] ${className}`}
    >
      <div className="relative flex-1">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-5 w-5" />
        <Input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="pl-10 bg-white/50 dark:bg-black/50 border-emerald-100/50 dark:border-emerald-800/50"
        />
      </div>

      <div className="relative flex-1">
        <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-5 w-5" />
        <Input
          placeholder="Property Type"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="pl-10 bg-white/50 dark:bg-black/50 border-emerald-100/50 dark:border-emerald-800/50"
        />
      </div>

      <div className="relative flex-1">
        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-5 w-5" />
        <Input
          placeholder="Price Range"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="pl-10 bg-white/50 dark:bg-black/50 border-emerald-100/50 dark:border-emerald-800/50"
        />
      </div>

      <Button
        onClick={handleSearch}
        className="bg-emerald-600 hover:bg-emerald-700 text-white md:w-auto w-full"
      >
        <Search className="mr-2 h-4 w-4" /> Search
      </Button>
    </div>
  );
};

export default SearchBar;
