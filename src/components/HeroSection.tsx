import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleSearch = (searchParams: any) => {
    console.log("Search params:", searchParams);
    // Navigate to properties page with search params
    navigate(
      `/properties?location=${encodeURIComponent(searchParams.location || "")}&priceRange=${encodeURIComponent(searchParams.priceRange || "")}&propertyType=${encodeURIComponent(searchParams.propertyType || "")}`,
    );
    onSearchSubmit(searchParams);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[900px] overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1 : 1.1,
              transition: { duration: 1.5, ease: "easeInOut" },
            }}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-emerald-600/10 to-emerald-900/20 z-20"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 z-30"></div>
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37] to-[#D4AF37]/0 z-40"></div>

      {/* Content */}
      <div className="relative z-40 h-full flex flex-col items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-playfair text-white mb-6 drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {slides[currentSlide].title}
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {slides[currentSlide].subtitle}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-4xl mx-auto"
        >
          <SearchBar
            onSearch={handleSearch}
            className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-xl overflow-hidden"
          />
        </motion.div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-40 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-40 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-12 left-0 right-0 z-40 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === index ? "bg-[#D4AF37] w-10" : "bg-white/50 w-3 hover:bg-white/80"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
