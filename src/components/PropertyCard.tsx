import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Heart, Maximize2 } from "lucide-react";
import { motion } from "framer-motion";

interface PropertyCardProps {
  image?: string;
  title?: string;
  price?: string;
  location?: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  type?: string;
  rating?: number;
  views?: number;
  onQuickView?: () => void;
  onFavorite?: () => void;
}

const PropertyCard = ({
  image = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=60",
  title = "Luxury Villa with Ocean View",
  price = "$2,500,000",
  location = "Beverly Hills, CA",
  beds = 5,
  baths = 4,
  sqft = 4500,
  type = "villa",
  rating = 4.8,
  views = 1000,
  onQuickView = () => {},
  onFavorite = () => {},
}: PropertyCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
    onFavorite();
  };

  return (
    <motion.div
      className="w-full h-full bg-white dark:bg-black"
      whileHover={{
        y: -10,
        transition: { duration: 0.3 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden border-none shadow-lg h-full dark:shadow-[0_0_20px_rgba(16,185,129,0.2)]">
        <div className="relative overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-[280px] object-cover transition-transform duration-700"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300"
            animate={{ opacity: isHovered ? 1 : 0 }}
          />
          <div className="absolute top-4 right-4 space-x-2">
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
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300"
              onClick={onQuickView}
            >
              <Maximize2 className="h-4 w-4 text-gray-700" />
            </Button>
          </div>
          <Badge className="absolute bottom-4 left-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white">
            {price}
          </Badge>
          {rating && (
            <Badge className="absolute bottom-4 right-4 bg-gradient-to-r from-emerald-600/90 to-emerald-500/70 text-white">
              ★ {rating.toFixed(1)}
            </Badge>
          )}
        </div>
        <CardContent className="p-6 relative">
          <motion.div
            className="absolute -top-10 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-emerald-400/10 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
          <h3 className="text-xl font-playfair mb-2 text-emerald-800 dark:text-emerald-50">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 font-montserrat mb-4 flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-emerald-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {location}
          </p>
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-0 border-t border-gray-100 dark:border-gray-800">
          <div className="flex justify-between w-full text-sm text-gray-500 dark:text-gray-400 font-montserrat">
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {beds} Beds
            </span>
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {baths} Baths
            </span>
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                />
              </svg>
              {sqft.toLocaleString()} Sq Ft
            </span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PropertyCard;
