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
  Menu,
  X,
  User,
  DollarSign,
  MessageSquare,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header
      style={{ background: headerBackground }}
      className={`fixed top-0 left-0 right-0 z-50 h-20 backdrop-blur-sm transition-all duration-300 ${isScrolled ? "shadow-lg dark:shadow-emerald-900/10" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link
            to="/"
            className="text-2xl font-playfair text-emerald-800 dark:text-emerald-50 relative group"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center text-white font-playfair text-xl relative overflow-hidden">
                <span className="relative z-10">E</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 opacity-0 transition-opacity duration-300"
                  animate={{ opacity: [0, 0.8, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />
              </div>
              <span className="font-playfair text-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 bg-clip-text text-transparent">
                Efoy
              </span>
            </div>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 transform scale-x-0 origin-left"
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 luxury-button"
                >
                  <Search className="h-4 w-4" />
                  Property Search
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-56 dark:bg-black/80 dark:backdrop-blur-md dark:border-emerald-900/50"
              >
                <DropdownMenuItem className="dark:hover:bg-emerald-900/30 dark:focus:bg-emerald-900/30">
                  <Home className="mr-2 h-4 w-4" /> All Properties
                </DropdownMenuItem>
                <DropdownMenuItem className="dark:hover:bg-emerald-900/30 dark:focus:bg-emerald-900/30">
                  <Building2 className="mr-2 h-4 w-4" /> For Sale
                </DropdownMenuItem>
                <DropdownMenuItem className="dark:hover:bg-emerald-900/30 dark:focus:bg-emerald-900/30">
                  <MapPin className="mr-2 h-4 w-4" /> For Rent
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 luxury-button"
                >
                  <Building2 className="h-4 w-4" />
                  Listings
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-56 dark:bg-black/80 dark:backdrop-blur-md dark:border-emerald-900/50"
              >
                <DropdownMenuItem className="dark:hover:bg-emerald-900/30 dark:focus:bg-emerald-900/30">
                  Featured Properties
                </DropdownMenuItem>
                <DropdownMenuItem className="dark:hover:bg-emerald-900/30 dark:focus:bg-emerald-900/30">
                  New Developments
                </DropdownMenuItem>
                <DropdownMenuItem className="dark:hover:bg-emerald-900/30 dark:focus:bg-emerald-900/30">
                  Luxury Estates
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              className="flex items-center gap-2 luxury-button"
            >
              <DollarSign className="h-4 w-4" />
              Pricing
            </Button>

            <Button
              variant="ghost"
              className="flex items-center gap-2 luxury-button"
            >
              <MessageSquare className="h-4 w-4" />
              Contact
            </Button>

            <Button
              variant="ghost"
              className="flex items-center gap-2 luxury-button"
            >
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
            className="rounded-full dark:hover:bg-emerald-900/30 luxury-button"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-emerald-500" />
            ) : (
              <Moon className="h-5 w-5 text-emerald-700" />
            )}
          </Button>

          <div className="hidden md:block">
            <Link to="/login">
              <Button
                variant="outline"
                className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30 luxury-button"
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
          </div>

          <div className="hidden md:block">
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white transition-all duration-300 shadow-md hover:shadow-lg dark:shadow-emerald-900/20 dark:hover:shadow-emerald-900/40 luxury-button">
                Sign Up
              </Button>
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-full dark:hover:bg-emerald-900/30"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-emerald-700 dark:text-emerald-400" />
            ) : (
              <Menu className="h-6 w-6 text-emerald-700 dark:text-emerald-400" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-emerald-100 dark:border-emerald-900/30"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 space-y-4">
              <Link
                to="/"
                className="block py-2 text-emerald-800 dark:text-emerald-100 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <Search className="inline-block h-4 w-4 mr-2" /> Property Search
              </Link>
              <Link
                to="/"
                className="block py-2 text-emerald-800 dark:text-emerald-100 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <Building2 className="inline-block h-4 w-4 mr-2" /> Listings
              </Link>
              <Link
                to="/"
                className="block py-2 text-emerald-800 dark:text-emerald-100 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <DollarSign className="inline-block h-4 w-4 mr-2" /> Pricing
              </Link>
              <Link
                to="/"
                className="block py-2 text-emerald-800 dark:text-emerald-100 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <MessageSquare className="inline-block h-4 w-4 mr-2" /> Contact
              </Link>
              <Link
                to="/"
                className="block py-2 text-emerald-800 dark:text-emerald-100 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <Info className="inline-block h-4 w-4 mr-2" /> About Us
              </Link>

              <div className="pt-4 flex flex-col space-y-3 border-t border-emerald-100 dark:border-emerald-900/30">
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="w-full border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
