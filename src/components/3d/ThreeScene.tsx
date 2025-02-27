import React from "react";
import { motion } from "framer-motion";

interface ThreeSceneProps {
  className?: string;
}

export const ThreeScene: React.FC<ThreeSceneProps> = ({ className }) => {
  return (
    <div className={`${className || ""} w-full h-full absolute inset-0 -z-10`}>
      {/* Decorative elements instead of 3D */}
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
      <motion.div
        className="absolute top-1/4 right-1/3 w-24 h-24 bg-emerald-300/10 rounded-full blur-xl"
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
        className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-emerald-400/10 rounded-full blur-xl"
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
  );
};
