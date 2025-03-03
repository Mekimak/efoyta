import React, { useState } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Search, MapPin, Home, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch?: (params: {
    location: string;
    priceRange: string;
    propertyType: string;
  }) => void;
}

const SearchBar = ({ onSearch = () => {} }: SearchBarProps) => {
  const [location, setLocation] = useState("Beverly Hills, CA");
  const [priceRange, setPriceRange] = useState("1000000-5000000");
  const [propertyType, setPropertyType] = useState("mansion");
  const [isHovered, setIsHovered] = useState(false);

  const handleSearch = () => {
    onSearch({
      location,
      priceRange,
      propertyType,
    });
  };

  return (
    <Card
      className="w-full max-w-[800px] h-20 bg-white/80 dark:bg-black/40 backdrop-blur-md border-emerald-200/20 dark:border-emerald-800/30 shadow-lg dark:shadow-emerald-900/20 p-4 rounded-xl overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-emerald-400/5 to-emerald-500/5 opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="flex items-center gap-4 h-full relative z-10">
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-5 w-5" />
          <Input
            className="h-full pl-10 bg-transparent border-none focus-visible:ring-0 text-emerald-900 dark:text-emerald-100 placeholder:text-emerald-500 dark:placeholder:text-emerald-600"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="w-48 relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-5 w-5 z-10" />
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="h-full pl-10 bg-transparent border-none focus:ring-0 text-emerald-900 dark:text-emerald-100">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent className="dark:bg-black/90 dark:border-emerald-900/50">
              <SelectItem value="0-1000000">Under $5k</SelectItem>
              <SelectItem value="1000000-5000000">$15k- $50k</SelectItem>
              <SelectItem value="5000000-10000000">$50 - $100k</SelectItem>
              <SelectItem value="10000000+">$100k+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-48 relative">
          <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-5 w-5 z-10" />
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="h-full pl-10 bg-transparent border-none focus:ring-0 text-emerald-900 dark:text-emerald-100">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent className="dark:bg-black/90 dark:border-emerald-900/50">
              <SelectItem value="mansion">Mansion</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="penthouse">Penthouse</SelectItem>
              <SelectItem value="estate">Estate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleSearch}
          className="h-full px-6 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white transition-all duration-300 shadow-md hover:shadow-lg dark:shadow-emerald-900/20 dark:hover:shadow-emerald-900/40"
        >
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
    </Card>
  );
};

export default SearchBar;
