import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-emerald-950/20 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-playfair text-white mb-2">
            Admin Access
          </h1>
          <p className="text-emerald-400">Secure administrative portal</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-black/40 backdrop-blur-xl p-8 rounded-2xl shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)]"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-emerald-100">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@efoy.com"
                className="bg-black/50 border-emerald-800 text-emerald-100 placeholder:text-emerald-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-emerald-100">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-black/50 border-emerald-800 text-emerald-100 placeholder:text-emerald-700"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Access Admin Panel
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
