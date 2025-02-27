import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface MouseFollowEffectProps {
  className?: string;
}

export const MouseFollowEffect: React.FC<MouseFollowEffectProps> = ({
  className,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      className={`fixed pointer-events-none z-50 rounded-full bg-gradient-to-r from-emerald-400/20 to-emerald-500/20 blur-3xl ${className || ""}`}
      animate={{
        x: mousePosition.x - 200,
        y: mousePosition.y - 200,
      }}
      transition={{ type: "spring", damping: 30, stiffness: 200 }}
      style={{ width: "400px", height: "400px" }}
    />
  );
};
