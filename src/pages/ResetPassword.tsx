import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Lock, Eye, EyeOff, Check, AlertCircle } from "lucide-react";
import { supabase } from "../lib/supabase";
import { MouseFollowEffect } from "../components/3d/MouseFollowEffect";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check if we have a hash fragment in the URL (from password reset email)
    const hash = window.location.hash;
    if (!hash || !hash.includes("type=recovery")) {
      setError("Invalid or expired password reset link");
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }

      const { error } = await supabase.auth.updateUser({ password });

      if (error) throw error;

      setSuccess(true);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.error("Error resetting password:", err);
      setError(err instanceof Error ? err.message : "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-black dark:to-emerald-950/20 p-4">
      {/* Mouse follow effect for dark mode */}
      <div className="dark:block hidden">
        <MouseFollowEffect />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-8 bg-white dark:bg-black dark:shadow-[0_0_50px_-12px_rgba(16,185,129,0.4)] rounded-2xl shadow-2xl">
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

            <h2 className="text-2xl font-playfair text-emerald-900 dark:text-emerald-50 mb-2">
              Reset Your Password
            </h2>
            <p className="text-emerald-600 dark:text-emerald-400 mb-6">
              Please enter your new password below
            </p>

            {success ? (
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800/50">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-emerald-800 dark:text-emerald-300 font-medium">
                      Password Reset Successful
                    </h4>
                    <p className="text-emerald-700 dark:text-emerald-400 text-sm">
                      Your password has been reset successfully. You will be
                      redirected to the login page shortly.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-emerald-700 dark:text-emerald-300"
                  >
                    New Password
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                      <Lock className="h-4 w-4" />
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-white dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800 focus-visible:ring-emerald-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-500 hover:text-emerald-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-emerald-700 dark:text-emerald-300"
                  >
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                      <Lock className="h-4 w-4" />
                    </div>
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 pr-10 bg-white dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800 focus-visible:ring-emerald-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-500 hover:text-emerald-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="flex items-start gap-2 text-red-500 dark:text-red-400 text-sm">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white transition-all duration-300 shadow-md hover:shadow-lg dark:shadow-emerald-900/20 dark:hover:shadow-emerald-900/40 luxury-button"
                  disabled={isLoading}
                >
                  {isLoading ? "Resetting Password..." : "Reset Password"}
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;
