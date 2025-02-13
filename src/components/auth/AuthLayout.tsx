import React from "react";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-black dark:to-emerald-950/20 p-4">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200 dark:bg-emerald-700 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300 dark:bg-emerald-600 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl opacity-30" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-playfair text-emerald-900 dark:text-emerald-50 mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-emerald-600 dark:text-emerald-300">{subtitle}</p>
          )}
        </div>

        <div className="bg-white/80 dark:bg-black/40 dark:shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)] backdrop-blur-xl rounded-2xl shadow-2xl p-8">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
