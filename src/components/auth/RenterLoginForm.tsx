import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Github, Mail, Home, Lock, Eye, EyeOff, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "../ui/dialog";
import { supabase } from "../../lib/supabase";

interface RenterLoginFormProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const RenterLoginForm = ({
  isOpen = false,
  onClose = () => {},
}: RenterLoginFormProps) => {
  const navigate = useNavigate();
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

      // Check user type and redirect to appropriate dashboard
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userData.user.id)
          .single();

        if (profileData?.user_type === "renter") {
          window.location.href = "/user-dashboard";
        } else {
          // If not a renter, show error
          throw new Error("Access denied. This login is for renters only.");
        }
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

  const loginContent = (
    <div className="p-8 bg-white dark:bg-black dark:shadow-[0_0_50px_-12px_rgba(16,185,129,0.4)] rounded-2xl shadow-2xl max-w-md w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-playfair text-emerald-900 dark:text-emerald-50 dark:glow-text">
          Renter Login
        </h2>
        {isOpen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <p className="text-emerald-600 dark:text-emerald-300 mb-6">
        Sign in to find your dream home
      </p>

      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
          <Home className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-emerald-700 dark:text-emerald-300"
              >
                Email
              </Label>
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
                  className="pl-10 bg-white dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800 focus-visible:ring-emerald-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-emerald-700 dark:text-emerald-300"
                >
                  Password
                </Label>
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
                  className="text-sm text-emerald-600 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300"
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
                  className="pl-10 pr-10 bg-white dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800 focus-visible:ring-emerald-500"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-300"
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

          {error && (
            <div className="text-red-500 dark:text-red-400 text-sm mb-4">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white transition-all duration-300 shadow-md hover:shadow-lg dark:shadow-emerald-900/20 dark:hover:shadow-emerald-900/40 luxury-button"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In as Renter"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="dark:bg-emerald-800" />
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
              className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
              onClick={() => signInWithProvider("github")}
              type="button"
            >
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button
              variant="outline"
              className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
              onClick={() => signInWithProvider("google")}
              type="button"
            >
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-emerald-600 dark:text-emerald-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-emerald-900 hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-100 relative inline-block group"
              >
                Sign up
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 dark:bg-emerald-400 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
              </Link>
            </p>
            <p className="text-sm text-emerald-600 dark:text-emerald-400">
              Are you a property owner?{" "}
              <Link
                to="/login"
                className="font-medium text-emerald-900 hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-100 relative inline-block group"
              >
                Go to login page
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 dark:bg-emerald-400 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );

  // If used as a modal dialog
  if (isOpen) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="p-0 border-none bg-transparent max-w-md dark:shadow-[0_0_50px_-12px_rgba(16,185,129,0.4)]">
          {loginContent}
        </DialogContent>
      </Dialog>
    );
  }

  // If used as a standalone page
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-black dark:to-emerald-950/20 p-4">
      <div className="relative z-10">{loginContent}</div>
    </div>
  );
};

export default RenterLoginForm;
