import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle contact form submission
    console.log("Contact form submitted");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <footer className="bg-emerald-950 text-white pt-20 pb-10 dark:shadow-[0_-10px_30px_rgba(16,185,129,0.2)]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center text-white font-playfair text-2xl">
                E
              </div>
              <span className="font-playfair text-3xl bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent">
                Efoy
              </span>
            </div>
            <p className="text-emerald-300/80">
              Discover the epitome of luxury real estate with our curated
              collection of premium properties in the world's most prestigious
              locations.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center transition-colors duration-300 dark:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                <Facebook className="h-5 w-5 text-emerald-300" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center transition-colors duration-300 dark:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                <Twitter className="h-5 w-5 text-emerald-300" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center transition-colors duration-300 dark:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                <Instagram className="h-5 w-5 text-emerald-300" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center transition-colors duration-300 dark:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                <Linkedin className="h-5 w-5 text-emerald-300" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xl font-playfair text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-emerald-300 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2" /> Home
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="text-emerald-300 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2" /> Properties
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-emerald-300 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2" /> About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-emerald-300 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2" /> Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-emerald-300 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2" /> Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xl font-playfair text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-emerald-400 mr-3 mt-0.5" />
                <span className="text-emerald-300">
                  123 Luxury Lane, Beverly Hills, CA 90210
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-emerald-400 mr-3" />
                <span className="text-emerald-300">+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-emerald-400 mr-3" />
                <span className="text-emerald-300">info@efoy.com</span>
              </li>
            </ul>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xl font-playfair text-white">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Your Email"
                className="bg-emerald-900/50 border-emerald-800 focus:border-emerald-600 text-white placeholder:text-emerald-500"
              />
              <Textarea
                placeholder="Your Message"
                className="bg-emerald-900/50 border-emerald-800 focus:border-emerald-600 text-white placeholder:text-emerald-500 min-h-[100px]"
              />
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Send Message
              </Button>
            </form>
          </motion.div>
        </motion.div>

        <Separator className="my-10 bg-emerald-800" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-emerald-400 text-sm">
            © {new Date().getFullYear()} Efoy Luxury Real Estate. All rights
            reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              to="/privacy"
              className="text-emerald-400 hover:text-white text-sm transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-emerald-400 hover:text-white text-sm transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <Link
              to="/cookies"
              className="text-emerald-400 hover:text-white text-sm transition-colors duration-300"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
