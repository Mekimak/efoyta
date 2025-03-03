import React, { useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  onSearchSubmit?: (searchParams: any) => void;
}

const HeroSection = ({ onSearchSubmit = () => {} }: HeroSectionProps) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&auto=format&fit=crop&q=80",
      title: "Discover Luxury Living",
      subtitle: "Exclusive properties in prestigious locations",
    },
    {
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&auto=format&fit=crop&q=80",
      title: "Find Your Dream Home",
      subtitle: "Curated selection of premium real estate",
    },
    {
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&auto=format&fit=crop&q=80",
      title: "Elevate Your Lifestyle",
      subtitle: "Experience the epitome of sophisticated living",
    },
  ];

  const handleSearch = (searchParams: any) => {
    console.log("Search params:", searchParams);
    // Navigate to properties page with search params
    navigate(
      `/properties?location=${encodeURIComponent(searchParams.location || "")}&priceRange=${encodeURIComponent(searchParams.priceRange || "")}&propertyType=${encodeURIComponent(searchParams.propertyType || "")}`,
    );
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video/Image Background */}
      <div className="absolute inset-0 z-0">
        {slides &&
          slides.map((slide, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{
                opacity: currentSlide === index ? 1 : 0,
                transition: { duration: 1 },
              }}
            >
              <div className="absolute inset-0 bg-black/40 z-10" />
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-playfair text-white mb-4 dark:glow-text">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            {slides[currentSlide].subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-3xl mx-auto"
        >
          <SearchBar
            onSearch={handleSearch}
            className="bg-white/20 backdrop-blur-md border border-white/30 shadow-lg"
          />
        </motion.div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-white w-8" : "bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
