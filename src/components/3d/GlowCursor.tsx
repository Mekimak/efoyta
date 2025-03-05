import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface GlowCursorProps {
  className?: string;
}

export const GlowCursor: React.FC<GlowCursorProps> = ({ className }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <motion.div
      className={`fixed pointer-events-none z-40 rounded-full bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/20 to-[#D4AF37]/10 blur-xl ${className || ""}`}
      animate={{
        x: mousePosition.x - 100,
        y: mousePosition.y - 100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: "spring",
        damping: 40,
        stiffness: 150,
        opacity: { duration: 0.2 },
      }}
      style={{ width: "200px", height: "200px" }}
    />
  );
};

export default GlowCursor;
