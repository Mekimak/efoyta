import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ThreeScene } from "../3d/ThreeScene";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  useEffect(() => {
    // Add a class to the body for the auth pages
    document.body.classList.add("auth-page");

    return () => {
      // Remove the class when component unmounts
      document.body.classList.remove("auth-page");
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-black dark:to-emerald-950/20 p-4 overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20 dark:opacity-30">
        <ThreeScene />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-emerald-200 dark:bg-emerald-700 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300 dark:bg-emerald-600 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl opacity-30"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Gold accents */}
        <motion.div
          className="absolute top-1/4 right-1/3 w-24 h-24 bg-emerald-400/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-lg"
      >
        <Link
          to="/"
          className="absolute -top-16 left-0 flex items-center gap-2 text-emerald-800 dark:text-emerald-100 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-playfair text-emerald-900 dark:text-emerald-50 mb-2 dark:glow-text">
            {title}
          </h1>
          {subtitle && (
            <p className="text-emerald-600 dark:text-emerald-300">{subtitle}</p>
          )}
        </div>

        <div className="bg-white/80 dark:bg-black/40 dark:shadow-[0_0_50px_-12px_rgba(16,185,129,0.4)] backdrop-blur-xl rounded-2xl shadow-2xl p-8 gradient-border dark:glow-effect">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
