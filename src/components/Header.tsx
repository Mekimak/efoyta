import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Moon,
  Sun,
  Phone,
  ChevronDown,
  Search,
  Home,
  Building2,
  Info,
  MapPin,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

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
    isDarkMode
      ? ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.9)"]
      : ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"],
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
          <Link
            to="/"
            className="text-2xl font-playfair text-emerald-800 dark:text-emerald-50"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center text-white font-playfair text-xl">
                E
              </div>
              <span className="font-playfair text-2xl bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                Efoy
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Property Search
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem>
                  <Home className="mr-2 h-4 w-4" /> All Properties
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Building2 className="mr-2 h-4 w-4" /> For Sale
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MapPin className="mr-2 h-4 w-4" /> For Rent
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Listings
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem>Featured Properties</DropdownMenuItem>
                <DropdownMenuItem>New Developments</DropdownMenuItem>
                <DropdownMenuItem>Luxury Estates</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              About Us
            </Button>
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

          <Link to="/login">
            <Button
              variant="outline"
              className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900"
            >
              Sign In
            </Button>
          </Link>

          <Link to="/signup">
            <Button className="bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
