import React, { useState, useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Search, MapPin, Home, DollarSign, X, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AISearchBarProps {
  onSearch: (searchParams: any) => void;
  className?: string;
}

const AISearchBar: React.FC<AISearchBarProps> = ({
  onSearch,
  className = "",
}) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [useEthiopianCalendar, setUseEthiopianCalendar] = useState(true);
  const searchRef = useRef<HTMLDivElement>(null);

  // Sample AI suggestions based on query
  const getSuggestions = (input: string) => {
    if (!input.trim()) return [];

    const suggestions = [
      { text: "2BHK in Bole", icon: <Home className="h-4 w-4" /> },
      {
        text: "2BHK under 10,000 ETB",
        icon: <DollarSign className="h-4 w-4" />,
      },
      { text: "2BHK with generator", icon: <Home className="h-4 w-4" /> },
      { text: "Properties near AAU", icon: <MapPin className="h-4 w-4" /> },
      {
        text: "Gated compound in Kazanchis",
        icon: <Home className="h-4 w-4" />,
      },
    ];

    return suggestions.filter((s) =>
      s.text.toLowerCase().includes(input.toLowerCase()),
    );
  };

  const suggestions = getSuggestions(query);

  // Sample neighborhood tags
  const neighborhoods = [
    "Bole",
    "Kazanchis",
    "Piassa",
    "Sar Bet",
    "Gerji",
    "CMC",
    "Ayat",
  ];

  // Sample amenities
  const amenities = [
    "Backup Generator",
    "Water Tank",
    "Guard",
    "Injera Kitchen",
    "Balcony",
    "Parking",
  ];

  // Sample unique filters
  const uniqueFilters = ["Kebele Approved", "Move-in Ready"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const handleSearch = () => {
    onSearch({
      query,
      filters: selectedFilters,
      calendar: useEthiopianCalendar ? "ethiopian" : "gregorian",
    });
  };

  const toggleCalendar = () => {
    setUseEthiopianCalendar(!useEthiopianCalendar);
  };

  // Convert to Ethiopian date for display
  const getEthiopianDate = () => {
    // This is a simplified conversion - in a real app you'd use a proper library
    return "Meskerem 12, 2016";
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="flex flex-col md:flex-row gap-4 p-6 bg-white/80 dark:bg-black/40 backdrop-blur-xl rounded-xl shadow-lg dark:shadow-[0_0_30px_rgba(16,185,129,0.2)]">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-5 w-5" />
          <Input
            placeholder={
              useEthiopianCalendar
                ? "ሰርች ቤቶች, አካባቢዎች, ወይም ዋጋ..."
                : "Search homes, areas, or prices..."
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            className="pl-10 bg-white/50 dark:bg-black/50 border-emerald-100/50 dark:border-emerald-800/50 text-lg"
          />
        </div>

        <Button
          onClick={toggleCalendar}
          variant="outline"
          className="md:w-auto border-emerald-100/50 dark:border-emerald-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
        >
          <Calendar className="mr-2 h-4 w-4 text-emerald-500" />
          {useEthiopianCalendar
            ? getEthiopianDate()
            : new Date().toLocaleDateString()}
        </Button>

        <Button
          onClick={handleSearch}
          className="bg-emerald-600 hover:bg-emerald-700 text-white md:w-auto w-full"
        >
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>

      {/* Selected filters */}
      {selectedFilters.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedFilters.map((filter) => (
            <Badge
              key={filter}
              className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-100 px-3 py-1"
            >
              {filter}
              <button
                onClick={() => toggleFilter(filter)}
                className="ml-2 text-emerald-600 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-100"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* AI Suggestions */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 mt-2 w-full bg-white dark:bg-black/90 rounded-lg shadow-lg border border-emerald-100 dark:border-emerald-800/50 overflow-hidden"
          >
            <div className="p-2">
              <h3 className="text-xs font-medium text-emerald-500 dark:text-emerald-400 px-2 py-1">
                AI Suggestions
              </h3>
              <div className="space-y-1">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-center px-3 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded cursor-pointer"
                    onClick={() => handleSelectSuggestion(suggestion.text)}
                  >
                    <span className="mr-2 text-emerald-600 dark:text-emerald-400">
                      {suggestion.icon}
                    </span>
                    <span className="text-emerald-800 dark:text-emerald-200">
                      {suggestion.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-emerald-100 dark:border-emerald-800/50 p-3">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div>
                  <h4 className="text-xs font-medium text-emerald-500 dark:text-emerald-400 mb-1">
                    Neighborhoods
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {neighborhoods.slice(0, 3).map((hood) => (
                      <Badge
                        key={hood}
                        variant="outline"
                        className="cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-xs"
                        onClick={() => toggleFilter(hood)}
                      >
                        {hood}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-medium text-emerald-500 dark:text-emerald-400 mb-1">
                    Amenities
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {amenities.slice(0, 3).map((amenity) => (
                      <Badge
                        key={amenity}
                        variant="outline"
                        className="cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-xs"
                        onClick={() => toggleFilter(amenity)}
                      >
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-medium text-emerald-500 dark:text-emerald-400 mb-1">
                    Unique Filters
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {uniqueFilters.map((filter) => (
                      <Badge
                        key={filter}
                        variant="outline"
                        className="cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-xs"
                        onClick={() => toggleFilter(filter)}
                      >
                        {filter}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AISearchBar;
