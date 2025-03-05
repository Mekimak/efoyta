import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OneClickListing from "@/components/listing/OneClickListing";
import BlockchainVerification from "@/components/listing/BlockchainVerification";
import AIPricingTool from "@/components/listing/AIPricingTool";
import HostDashboard from "@/components/listing/HostDashboard";
import AISearchBar from "@/components/listing/AISearchBar";
import { motion } from "framer-motion";

const EthiopianRealEstatePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("listing");

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleSearch = (searchParams: any) => {
    console.log("Search params:", searchParams);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header 
        isDarkMode={isDarkMode} 
        onDarkModeToggle={handleDarkModeToggle} 
      />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-playfair text-emerald-900 dark:text-emerald-50 mb-4">
              Efoy Ethiopian Real Estate Platform
            </h1>
            <p className="text-xl text-emerald-600 dark:text-emerald-300 max-w-3xl mx-auto">
              The first AI-powered real estate platform designed specifically for the Ethiopian market
            </p>
          </motion.div>

          <div className="mb-12">
            <AISearchBar onSearch={handleSearch} />
          </div>

          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-12">
              <TabsTrigger 
                value="listing" 
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                One-Click Listing
              </TabsTrigger>
              <TabsTrigger 
                value="verification" 
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Blockchain Verification
              </TabsTrigger>
              <TabsTrigger 
                value="pricing" 
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                AI Pricing Tool
              </TabsTrigger>
              <TabsTrigger 
                value="dashboard" 
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Host Dashboard
              </TabsTrigger>
            </TabsList>

            <TabsContent value="listing">
              <OneClickListing />
            </TabsContent>

            <TabsContent value="verification">
              <BlockchainVerification />
            </TabsContent>

            <TabsContent value="pricing">
              <AIPricingTool />
            </TabsContent>

            <TabsContent value="dashboard">
              <HostDashboard />
            </TabsContent>
          </Tabs>

          <div className="mt-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-playfair text-emerald-900 dark:text-emerald-50 mb-4">
                  Culturally Tailored UX
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span className="text-emerald-700 dark:text-emerald-300">
                      <strong>Amharic-First Design:</strong> Toggle between