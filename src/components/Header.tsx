import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Moon, Sun, Phone } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeaderProps {
  onDarkModeToggle?: () => void;
  onContactClick?: () => void;
  isDarkMode?: boolean;
}

const Header = ({
  onDarkModeToggle = () => {},
  onContactClick = () => {},
  isDarkMode = false,
}: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const headerBackground = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"],
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      style={{ background: headerBackground }}
      className={`fixed top-0 left-0 right-0 z-50 h-20 backdrop-blur-sm transition-all duration-300 ${isScrolled ? "shadow-lg" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-12">
          <a
            href="/"
            className="text-2xl font-playfair text-emerald-800 dark:text-emerald-50"
          >
            LuxuryEstates
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#properties"
              className="text-emerald-700 dark:text-emerald-100 hover:text-emerald-500 transition-colors"
            >
              Properties
            </a>
            <a
              href="#about"
              className="text-emerald-700 dark:text-emerald-100 hover:text-emerald-500 transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-emerald-700 dark:text-emerald-100 hover:text-emerald-500 transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onDarkModeToggle}
            className="rounded-full"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-emerald-500" />
            ) : (
              <Moon className="h-5 w-5 text-emerald-700" />
            )}
          </Button>

          <Button
            onClick={onContactClick}
            className="bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
          >
            <Phone className="mr-2 h-4 w-4" />
            Contact Agent
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
