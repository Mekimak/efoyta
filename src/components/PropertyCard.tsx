import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Eye } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useSavedProperties } from "../hooks/useSavedProperties";

interface PropertyCardProps {
  image: string;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  type?: string;
  rating?: number;
  views?: number;
  id?: string;
  onQuickView?: () => void;
  onFavorite?: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  image,
  title,
  price,
  location,
  beds,
  baths,
  sqft,
  type = "villa",
  rating = 4.5,
  views = 0,
  id,
  onQuickView,
  onFavorite,
}) => {
  const { saveProperty, unsaveProperty, isSaved } = useSavedProperties();
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (id) {
      setIsFavorited(isSaved(id));
    }
  }, [id, isSaved]);

  const handleFavoriteClick = async () => {
    if (!id) return;

    try {
      if (isFavorited) {
        await unsaveProperty(id);
      } else {
        await saveProperty(id);
      }

      setIsFavorited(!isFavorited);

      if (onFavorite) {
        onFavorite();
      }
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group bg-white dark:bg-black/40 rounded-xl overflow-hidden shadow-md hover:shadow-xl dark:shadow-[0_0_30px_rgba(16,185,129,0.1)] dark:hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-300 dark:glow-effect dark:hover:glow-effect"
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-3 right-3 z-10">
          <Button
            variant="secondary"
            size="icon"
            className={`rounded-full backdrop-blur-sm transition-all duration-300 ${isFavorited ? "bg-rose-500 text-white" : "bg-white/80 hover:bg-white"}`}
            onClick={handleFavoriteClick}
          >
            <Heart
              className={`h-4 w-4 ${isFavorited ? "fill-white text-white" : "text-gray-700"}`}
            />
          </Button>
        </div>

        <div className="absolute bottom-3 left-3 z-10">
          <Badge
            className="bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-300"
            variant="secondary"
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-100 transition-opacity duration-300 z-10">
          <Button
            variant="secondary"
            className="w-full bg-white/90 hover:bg-white text-emerald-800 backdrop-blur-sm"
            onClick={onQuickView}
          >
            <Eye className="mr-2 h-4 w-4" /> Quick View
          </Button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium text-emerald-900 dark:text-emerald-50 mb-1 line-clamp-1">
          {title}
        </h3>
        <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-2">
          {price}
        </p>
        <p className="text-emerald-500 dark:text-emerald-500 text-sm mb-3">
          {location}
        </p>

        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>{beds} Beds</span>
          <span>{baths} Baths</span>
          <span>
            {typeof sqft === "number" ? sqft.toLocaleString() : sqft} Sq Ft
          </span>
        </div>

        <div className="mt-4 pt-4 border-t border-emerald-100 dark:border-emerald-800/30 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={i < Math.floor(rating) ? "currentColor" : "none"}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-xs text-emerald-700 dark:text-emerald-300">
              {rating}
            </span>
          </div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400">
            {views} views
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export { PropertyCard };
export default PropertyCard;
