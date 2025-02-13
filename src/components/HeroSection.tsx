import React from "react";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onSearchSubmit?: (searchParams: any) => void;
}

const HeroSection = ({ onSearchSubmit = () => {} }: HeroSectionProps) => {
  return (
    <div className="relative w-full h-[800px] bg-gradient-to-br from-white to-emerald-50 dark:from-black dark:to-emerald-950/20 overflow-hidden dark:shadow-[0_0_100px_20px_rgba(16,185,129,0.1)_inset] dark:border-b dark:border-emerald-900/20">
      {/* 3D Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-200 dark:bg-emerald-600/30 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -left-20 top-40 w-96 h-96 bg-emerald-300 dark:bg-emerald-500/30 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute right-1/4 bottom-20 w-96 h-96 bg-emerald-100 dark:bg-emerald-700/30 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair text-emerald-950 dark:text-white mb-6 drop-shadow-sm">
            Find your perfect Home
          </h1>
          <p className="text-xl md:text-2xl text-emerald-800/80 dark:text-emerald-100/80 mb-12 max-w-3xl mx-auto font-montserrat">
            Discover the best deals in Addis Ababa
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-4xl mx-auto"
        >
          <SearchBar onSearch={onSearchSubmit} />
        </motion.div>

        {/* 3D Cards */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-8 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-64 h-32 bg-white/80 dark:bg-black/40 backdrop-blur-lg rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(16,185,129,0.1)] p-6 transform hover:-translate-y-2 transition-transform duration-300"
          >
            <h3 className="text-emerald-800 dark:text-emerald-100 font-semibold mb-2">
              Premium Locations
            </h3>
            <p className="text-emerald-600 dark:text-emerald-300/80 text-sm">
              Exclusive properties in prime areas
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-64 h-32 bg-white/80 dark:bg-black/40 backdrop-blur-lg rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(16,185,129,0.1)] p-6 transform hover:-translate-y-2 transition-transform duration-300"
          >
            <h3 className="text-emerald-800 dark:text-emerald-100 font-semibold mb-2">
              Luxury Amenities
            </h3>
            <p className="text-emerald-600 dark:text-emerald-300/80 text-sm">
              World-class features and services
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="w-64 h-32 bg-white/80 dark:bg-black/40 backdrop-blur-lg rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(16,185,129,0.1)] p-6 transform hover:-translate-y-2 transition-transform duration-300"
          >
            <h3 className="text-emerald-800 dark:text-emerald-100 font-semibold mb-2">
              Expert Guidance
            </h3>
            <p className="text-emerald-600 dark:text-emerald-300/80 text-sm">
              Professional real estate advisors
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
