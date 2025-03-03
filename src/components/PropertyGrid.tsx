import React from "react";
import PropertyCard from "./PropertyCard";
import { motion } from "framer-motion";

interface Property {
  id: string;
  image: string;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  rating: number;
  views: number;
}

interface PropertyGridProps {
  properties?: Property[];
  onQuickView?: (property: Property) => void;
  onFavorite?: (property: Property) => void;
}

const PropertyGrid = ({
  properties = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=60",
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
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60",
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
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=60",
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
  ],
  onQuickView = () => {},
  onFavorite = () => {},
}: PropertyGridProps) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto bg-white/50 dark:bg-black/40 p-8 rounded-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
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
            onQuickView={() => onQuickView(property)}
            onFavorite={() => onFavorite(property)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default PropertyGrid;
