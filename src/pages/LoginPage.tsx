import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RenterLoginForm from "@/components/auth/RenterLoginForm";
import LandlordLoginForm from "@/components/auth/LandlordLoginForm";
import { Building, Home } from "lucide-react";

const LoginPage = () => {
  const [userType, setUserType] = useState("renter");

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
            Welcome Back
          </h2>
          <p className="text-emerald-600 dark:text-emerald-300 mb-8 text-center">
            Sign in to access your luxury real estate account
          </p>

          <Tabs
            defaultValue="renter"
            className="w-full mb-6"
            onValueChange={setUserType}
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger
                value="renter"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white dark:data-[state=active]:bg-emerald-700"
                onClick={() => setUserType("renter")}
              >
                <Home className="h-4 w-4 mr-2" />
                Renter
              </TabsTrigger>
              <TabsTrigger
                value="landlord"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white dark:data-[state=active]:bg-emerald-700"
                onClick={() => setUserType("landlord")}
              >
                <Building className="h-4 w-4 mr-2" />
                Landlord
              </TabsTrigger>
            </TabsList>

            <TabsContent value="renter">
              <RenterLoginForm isOpen={false} />
            </TabsContent>

            <TabsContent value="landlord">
              <LandlordLoginForm isOpen={false} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
