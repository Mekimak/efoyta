import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import {
  Github,
  Mail,
  User,
  Building,
  Home,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const LoginForm = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("renter");
  const [showPassword, setShowPassword] = useState(false);

  const { signIn, resetPassword, signInWithProvider } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await signIn(email, password);

      if (error) throw error;

      // Redirect based on user type
      if (userType === "renter") {
        navigate("/dashboard");
      } else if (userType === "landlord") {
        navigate("/landlord");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to access your luxury real estate portfolio"
    >
      <Tabs
        defaultValue="renter"
        className="w-full mb-6"
        onValueChange={setUserType}
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger
            value="renter"
            className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white dark:data-[state=active]:bg-emerald-700"
          >
            <Home className="h-4 w-4 mr-2" />
            Renter
          </TabsTrigger>
          <TabsTrigger
            value="landlord"
            className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white dark:data-[state=active]:bg-emerald-700"
          >
            <Building className="h-4 w-4 mr-2" />
            Landlord
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                  <Mail className="h-4 w-4" />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10 bg-white/50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-800 focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (email) {
                      resetPassword(email);
                      alert(
                        "Password reset email sent. Please check your inbox.",
                      );
                    } else {
                      alert("Please enter your email address first.");
                    }
                  }}
                  className="text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                  <Lock className="h-4 w-4" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 bg-white/50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-800 focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-500 hover:text-emerald-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white transition-all duration-300 shadow-md hover:shadow-lg dark:shadow-emerald-900/20 dark:hover:shadow-emerald-900/40 luxury-button"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="dark:bg-emerald-800/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-black px-2 text-emerald-600 dark:text-emerald-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30 luxury-button"
              onClick={() => signInWithProvider("github")}
              type="button"
            >
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button
              variant="outline"
              className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30 luxury-button"
              onClick={() => signInWithProvider("google")}
              type="button"
            >
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>

          <p className="text-center text-sm text-emerald-600 dark:text-emerald-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-emerald-700 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200 relative inline-block group"
            >
              Sign up
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 dark:bg-emerald-400 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
            </Link>
          </p>
        </form>
      </motion.div>
    </AuthLayout>
  );
};

export default LoginForm;
