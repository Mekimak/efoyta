import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { motion, useAnimation } from "framer-motion";
import { ThreeScene } from "./3d/ThreeScene";
import { MouseFollowEffect } from "./3d/MouseFollowEffect";

interface HeroSectionProps {
  onSearchSubmit?: (searchParams: any) => void;
}

const HeroSection = ({ onSearchSubmit = () => {} }: HeroSectionProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = clientX - window.innerWidth / 2;
      const moveY = clientY - window.innerHeight / 2;
      const offsetFactor = 15;

      setMousePosition({
        x: moveX / offsetFactor,
        y: moveY / offsetFactor,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    controls.start({
      x: mousePosition.x,
      y: mousePosition.y,
      transition: { type: "spring", damping: 25, stiffness: 100 },
    });
  }, [mousePosition, controls]);

  useEffect(() => {
    // Animate the gold accent elements with CSS animations instead of GSAP
    const goldAccents = document.querySelectorAll(".gold-accent");
    goldAccents.forEach((accent) => {
      accent.classList.add("animate-pulse");
    });
  }, []);

  return (
    <div className="relative w-full h-[800px] bg-gradient-to-br from-white to-emerald-50 dark:from-black dark:to-emerald-950/20 overflow-hidden dark:shadow-[0_0_100px_20px_rgba(16,185,129,0.1)_inset] dark:border-b dark:border-emerald-900/20">
      {/* 3D Scene Background */}
      <ThreeScene className="opacity-30 dark:opacity-40" />

      {/* Mouse follow effect */}
      <MouseFollowEffect />

      {/* 3D Geometric Shapes with color animations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1],
            backgroundColor: ["#10b98130", "#34d39930", "#10b98130"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-200 dark:bg-emerald-600/30 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
            backgroundColor: ["#047857", "#10b98130", "#047857"],
          }}
          transition={{ duration: 7, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -left-20 top-40 w-96 h-96 bg-emerald-300 dark:bg-emerald-500/30 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.1, 0.25, 0.1],
            scale: [1, 1.15, 1],
            backgroundColor: ["#065f4630", "#10b98120", "#065f4630"],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute right-1/4 bottom-20 w-96 h-96 bg-emerald-100 dark:bg-emerald-700/30 rounded-full blur-3xl"
        />

        {/* Emerald accents */}
        <div className="gold-accent absolute top-1/4 right-1/3 w-4 h-4 rounded-full bg-emerald-400/30 blur-sm"></div>
        <div className="gold-accent absolute bottom-1/3 left-1/4 w-6 h-6 rounded-full bg-emerald-500/20 blur-sm"></div>
        <div className="gold-accent absolute top-1/2 left-1/3 w-3 h-3 rounded-full bg-emerald-300/30 blur-sm"></div>
      </div>

      {/* Content */}
      <motion.div
        className="relative h-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center"
        animate={controls}
        style={{ x: 0, y: 0 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair text-emerald-950 dark:text-white mb-6 drop-shadow-sm dark:glow-text">
            Find your{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 bg-clip-text text-transparent">
              perfect
            </span>{" "}
            Home
          </h1>
          <p className="text-xl md:text-2xl text-emerald-800/80 dark:text-emerald-100/80 mb-12 max-w-3xl mx-auto font-montserrat">
            Discover the best deals in the most prestigious locations
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-4xl mx-auto"
        >
          <div className="perspective-container">
            <div className="transform-3d">
              <SearchBar onSearch={onSearchSubmit} />
            </div>
          </div>
        </motion.div>

        {/* 3D Cards */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-wrap justify-center gap-4 md:gap-8 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-64 h-32 bg-white/80 dark:bg-black/40 backdrop-blur-lg rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(16,185,129,0.3)] p-6 transform hover:-translate-y-2 transition-transform duration-300 dark:glow-effect"
            whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
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
            className="w-64 h-32 bg-white/80 dark:bg-black/40 backdrop-blur-lg rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(16,185,129,0.3)] p-6 transform hover:-translate-y-2 transition-transform duration-300 dark:glow-effect"
            whileHover={{ scale: 1.05, rotateY: -5, rotateX: 5 }}
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
            className="w-64 h-32 bg-white/80 dark:bg-black/40 backdrop-blur-lg rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(16,185,129,0.3)] p-6 transform hover:-translate-y-2 transition-transform duration-300 dark:glow-effect"
            whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
          >
            <h3 className="text-emerald-800 dark:text-emerald-100 font-semibold mb-2">
              Expert Guidance
            </h3>
            <p className="text-emerald-600 dark:text-emerald-300/80 text-sm">
              Professional real estate advisors
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
