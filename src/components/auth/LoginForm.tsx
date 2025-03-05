import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Github,
  Mail,
  Lock,
  Eye,
  EyeOff,
  X,
  Phone,
  AtSign,
  Building,
  Home,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "../ui/dialog";
import OTPVerification from "./OTPVerification";

interface LoginFormProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  isOpen = false,
  onClose = () => {},
}) => {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [userType, setUserType] = useState<"renter" | "host">("renter");
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);

  const { signIn, signInWithProvider, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await signIn(email, password);
      if (error) throw error;

      // Redirect based on user type
      navigate(userType === "host" ? "/landlord-dashboard" : "/user-dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, this would call Supabase signInWithOtp
      // const { error } = await supabase.auth.signInWithOtp({
      //   phone: phone
      // });
      // if (error) throw error;

      // For demo, we'll just show the OTP verification screen
      setShowOtpVerification(true);
    } catch (err) {
      console.error("Phone login error:", err);
      setError(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    setIsLoading(true);
    setOtpError(null);

    try {
      // In a real app, this would verify the OTP with Supabase
      // const { error } = await supabase.auth.verifyOtp({
      //   phone: phone,
      //   token: otp,
      //   type: 'sms'
      // });
      // if (error) throw error;

      // For demo, we'll accept any 4-digit code
      if (otp.length === 4) {
        // Redirect to dashboard
        navigate("/landlord-dashboard");
      } else {
        setOtpError("Invalid verification code. Please try again.");
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      setOtpError(err instanceof Error ? err.message : "Failed to verify OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = () => {
    // In a real app, this would call an API to resend OTP
    console.log("Resending OTP to", phone);
    // Show success message
    alert(`A new verification code has been sent to ${phone}`);
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await resetPassword(email);
      setResetSent(true);
    } catch (err) {
      console.error("Password reset error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to send reset email",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const renderLoginForm = () => {
    if (showOtpVerification) {
      return (
        <OTPVerification
          phoneNumber={phone}
          onVerify={handleVerifyOTP}
          onResend={handleResendOTP}
          error={otpError}
        />
      );
    }

    return (
      <div className="space-y-6">
        <Tabs
          defaultValue={userType}
          onValueChange={(value) => setUserType(value as "renter" | "host")}
          className="w-full mb-4"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="renter"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
            >
              <Home className="mr-2 h-4 w-4" />
              Renter
            </TabsTrigger>
            <TabsTrigger
              value="host"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
            >
              <Building className="mr-2 h-4 w-4" />
              Landlord/Host
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {userType === "host" && (
          <Tabs
            defaultValue={loginMethod}
            onValueChange={(value) =>
              setLoginMethod(value as "email" | "phone")
            }
            className="w-full mb-4"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="email"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                <Mail className="mr-2 h-4 w-4" />
                Email/Password
              </TabsTrigger>
              <TabsTrigger
                value="phone"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                <Phone className="mr-2 h-4 w-4" />
                Phone OTP
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        {loginMethod === "email" ? (
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-emerald-700 dark:text-emerald-300"
              >
                Email
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                  <AtSign className="h-4 w-4" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800 focus-visible:ring-emerald-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label
                  htmlFor="password"
                  className="text-emerald-700 dark:text-emerald-300"
                >
                  Password
                </Label>
                <button
                  type="button"
                  onClick={handlePasswordReset}
                  className="text-xs text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                  <Lock className="h-4 w-4" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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

            {error && <div className="text-red-500 text-sm">{error}</div>}
            {resetSent && (
              <div className="text-emerald-600 dark:text-emerald-400 text-sm">
                Password reset link sent to your email.
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white transition-all duration-300 shadow-md hover:shadow-lg dark:shadow-emerald-900/20 dark:hover:shadow-emerald-900/40 luxury-button"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handlePhoneLogin} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-emerald-700 dark:text-emerald-300"
              >
                Phone Number
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                  <Phone className="h-4 w-4" />
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+251 9XX XXX XXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10 bg-white dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800 focus-visible:ring-emerald-500"
                  required
                />
              </div>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white transition-all duration-300 shadow-md hover:shadow-lg dark:shadow-emerald-900/20 dark:hover:shadow-emerald-900/40 luxury-button"
              disabled={isLoading}
            >
              {isLoading ? "Sending code..." : "Send Verification Code"}
            </Button>
          </form>
        )}

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

        <p className="text-center text-sm text-emerald-600 dark:text-emerald-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-emerald-900 hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-100 relative inline-block group"
          >
            Sign up
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 dark:bg-emerald-400 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
          </Link>
        </p>
      </div>
    );
  };

  const loginContent = (
    <div className="p-8 bg-white dark:bg-black dark:shadow-[0_0_50px_-12px_rgba(16,185,129,0.4)] rounded-2xl shadow-2xl max-w-md w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-playfair text-emerald-900 dark:text-emerald-50 dark:glow-text">
          Sign In
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
        Welcome back to Ethiopia's premier real estate platform
      </p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderLoginForm()}
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
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="relative z-10">{loginContent}</div>
    </div>
  );
};

export default LoginForm;
