import React from "react";
import { motion } from "framer-motion";

interface StatsProps {
  stats?: Array<{
    value: string;
    label: string;
  }>;
}

const StatsSection: React.FC<StatsProps> = ({
  stats = [
    { value: "$2B+", label: "in Sales" },
    { value: "500+", label: "Luxury Properties" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "15+", label: "Years Experience" },
  ],
}: StatsProps) => {
  return (
    <section className="w-full h-[300px] bg-emerald-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 to-emerald-800/90 backdrop-blur-sm" />

      <div className="relative max-w-7xl mx-auto h-full flex items-center justify-center px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {stats &&
            stats.map((stat, index) => (
              <div key={index} className="text-center relative">
                {/* Card background with glass effect */}
                <div className="absolute inset-0 bg-emerald-800/30 backdrop-blur-sm rounded-lg" />

                <div className="relative p-6">
                  <h3 className="text-4xl md:text-5xl font-playfair text-emerald-300 mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-emerald-100 font-montserrat text-lg opacity-90">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
