import React from "react";
import { motion } from "framer-motion";
import LoginForm from "../components/auth/LoginForm";
import { MouseFollowEffect } from "../components/3d/MouseFollowEffect";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-black dark:to-emerald-950/20 p-4">
      {/* Mouse follow effect for dark mode */}
      <div className="dark:block hidden">
        <MouseFollowEffect />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LoginForm />
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
