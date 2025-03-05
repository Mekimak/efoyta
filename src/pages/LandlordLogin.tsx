import React from "react";
import { motion } from "framer-motion";
import LandlordLoginForm from "../components/auth/LandlordLoginForm";

const LandlordLogin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-black dark:to-emerald-950/20 p-4">
      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-black dark:shadow-[0_0_50px_-12px_rgba(16,185,129,0.4)] rounded-2xl shadow-2xl overflow-hidden border border-white/20 p-8"
        >
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center text-white font-playfair text-xl">
                E
              </div>
              <span className="font-playfair text-2xl bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                Efoy
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-playfair text-emerald-900 dark:text-emerald-50 mb-2 text-center">
            Landlord Login
          </h2>
          <p className="text-emerald-600 dark:text-emerald-300 mb-8 text-center">
            Property owners only - Sign in to manage your luxury properties
          </p>

          <LandlordLoginForm isOpen={false} />
        </motion.div>
      </div>
    </div>
  );
};

export default LandlordLogin;
