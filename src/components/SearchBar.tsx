import React from "react";
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
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch?: (params: {
    location: string;
    priceRange: string;
    propertyType: string;
  }) => void;
}

const SearchBar = ({ onSearch = () => {} }: SearchBarProps) => {
  const [location, setLocation] = React.useState("Beverly Hills, CA");
  const [priceRange, setPriceRange] = React.useState("1000000-5000000");
  const [propertyType, setPropertyType] = React.useState("mansion");

  const handleSearch = () => {
    onSearch({
      location,
      priceRange,
      propertyType,
    });
  };

  return (
    <Card className="w-[800px] h-20 bg-white/80 backdrop-blur-md border-emerald-200/20 shadow-lg p-4 rounded-xl">
      <div className="flex items-center gap-4 h-full">
        <div className="flex-1">
          <Input
            className="h-full bg-transparent border-none focus-visible:ring-0 text-emerald-900 placeholder:text-emerald-500"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="w-48">
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="h-full bg-transparent border-none focus:ring-0 text-emerald-900">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-1000000">Under $1M</SelectItem>
              <SelectItem value="1000000-5000000">$1M - $5M</SelectItem>
              <SelectItem value="5000000-10000000">$5M - $10M</SelectItem>
              <SelectItem value="10000000+">$10M+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-48">
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="h-full bg-transparent border-none focus:ring-0 text-emerald-900">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mansion">Mansion</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="penthouse">Penthouse</SelectItem>
              <SelectItem value="estate">Estate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleSearch}
          className="h-full px-6 bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
    </Card>
  );
};

export default SearchBar;
