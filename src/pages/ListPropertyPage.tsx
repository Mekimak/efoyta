import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PropertyListingForm from "@/components/PropertyListingForm";
import { motion } from "framer-motion";

const ListPropertyPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    // Here you would typically send the data to your backend
    console.log("Property data submitted:", data);

    // Show success message and redirect to dashboard
    alert("Property listed successfully!");
    navigate("/dashboard");
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-black py-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white/90 dark:bg-black/40 backdrop-blur-sm shadow-xl dark:shadow-[0_0_50px_-12px_rgba(16,185,129,0.2)]">
            <CardHeader className="border-b border-emerald-100 dark:border-emerald-800/30">
              <CardTitle className="text-2xl font-playfair text-emerald-800 dark:text-emerald-50">
                List Your Property
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <PropertyListingForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ListPropertyPage;
