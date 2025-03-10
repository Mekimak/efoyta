import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface MouseFollowEffectProps {
  className?: string;
}

export const MouseFollowEffect: React.FC<MouseFollowEffectProps> = ({
  className,
}) => {
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
      className={`fixed pointer-events-none z-40 rounded-full bg-gradient-to-r from-emerald-500/10 via-emerald-400/20 to-emerald-600/10 blur-xl ${className || ""}`}
      animate={{
        x: mousePosition.x - 200,
        y: mousePosition.y - 200,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: "spring",
        damping: 40,
        stiffness: 150,
        opacity: { duration: 0.2 },
      }}
      style={{ width: "400px", height: "400px" }}
    />
  );
};

export default MouseFollowEffect;
