import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import PropertyGrid from "./PropertyGrid";

interface PropertySectionProps {
  title: string;
  subtitle?: string;
  properties: Array<any>;
  onViewAll?: () => void;
  onQuickView?: (property: any) => void;
  onFavorite?: (property: any) => void;
}

const PropertySection = ({
  title,
  subtitle,
  properties,
  onViewAll = () => {},
  onQuickView = () => {},
  onFavorite = () => {},
}: PropertySectionProps) => {
  return (
    <section className="py-16 px-4 dark:relative dark:z-10 dark:hover:glow-effect">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-playfair text-emerald-900 dark:text-emerald-50 mb-2"
            >
              {title}
            </motion.h2>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-emerald-600 dark:text-emerald-300"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
          <Button
            variant="ghost"
            onClick={onViewAll}
            className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
          >
            View All
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <PropertyGrid
          properties={properties}
          onQuickView={onQuickView}
          onFavorite={onFavorite}
        />
      </div>
    </section>
  );
};

export default PropertySection;
