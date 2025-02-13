import React from "react";
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
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="w-[380px] bg-white dark:bg-black/40 dark:shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)] dark:backdrop-blur-sm"
    >
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-[280px] object-cover"
          />
          <div className="absolute top-4 right-4 space-x-2">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={onFavorite}
            >
              <Heart className="h-4 w-4 text-gray-700" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={onQuickView}
            >
              <Maximize2 className="h-4 w-4 text-gray-700" />
            </Button>
          </div>
          <Badge className="absolute bottom-4 left-4 bg-emerald-600 text-white">
            {price}
          </Badge>
          {rating && (
            <Badge className="absolute bottom-4 right-4 bg-emerald-100 text-emerald-800">
              ★ {rating.toFixed(1)}
            </Badge>
          )}
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-playfair mb-2 text-emerald-800 dark:text-emerald-50">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 font-montserrat mb-4">
            {location}
          </p>
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-0 border-t border-gray-100 dark:border-gray-800">
          <div className="flex justify-between w-full text-sm text-gray-500 dark:text-gray-400 font-montserrat">
            <span>{beds} Beds</span>
            <span>{baths} Baths</span>
            <span>{sqft.toLocaleString()} Sq Ft</span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PropertyCard;
