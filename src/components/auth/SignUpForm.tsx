import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Checkbox } from "../ui/checkbox";
import {
  Github,
  Mail,
  User,
  Building,
  Home,
  Lock,
  Eye,
  EyeOff,
  X,
  Phone,
  UserCircle,
  AtSign,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "../ui/dialog";
import { supabase } from "@/lib/supabase";
import OTPVerification from "./OTPVerification";
import DocumentUpload from "./DocumentUpload";

interface SignUpFormProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const SignUpForm = ({
  isOpen = false,
  onClose = () => {},
}: SignUpFormProps) => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<"renter" | "host">("renter");
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signUp, signInWithProvider } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Validate form
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (!termsAccepted) {
        throw new Error("You must accept the terms and conditions");
      }

      // Sign up the user
      const { error } = await signUp(
        email,
        password,
        userType as "renter" | "host",
      );

      if (error) throw error;

      // Create profile with first and last name
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user) {
        await supabase.from("profiles").upsert({
          id: userData.user.id,
          first_name: firstName,
          last_name: lastName,
          email: email,
          user_type: userType,
          phone: phone,
        });
      }

      // If host, proceed to phone verification
      if (userType === "host") {
        setStep(2); // Move to OTP verification step
      } else {
        // For renters, show success message and redirect
        alert(
          `Account created successfully! Please verify your email before logging in.`,
        );
        navigate("/login");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err instanceof Error ? err.message : "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    setIsLoading(true);
    setOtpError(null);

    try {
      // In a real app, this would verify the OTP with Twilio/Supabase
      // For demo purposes, we'll accept any 4-digit code
      if (otp.length === 4) {
        // Verification successful, proceed to document upload
        setStep(3);
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

  const handleDocumentUpload = async (file: File) => {
    setIsLoading(true);

    try {
      // In a real app, this would upload the document to Supabase Storage
      // const { data, error } = await supabase.storage
      //   .from('kebele_ids')
      //   .upload(`${email}/${file.name}`, file);

      // if (error) throw error;

      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success message and redirect to dashboard
      alert(
        "Document uploaded successfully! Your account is now being verified.",
      );
      navigate("/landlord-dashboard");
    } catch (err) {
      console.error("Document upload error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to upload document",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const renderStep = () => {
    switch (step) {
      case 1: // Initial signup form
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="text-emerald-700 dark:text-emerald-300"
                  >
                    First Name
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                      <UserCircle className="h-4 w-4" />
                    </div>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="pl-10 bg-white dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800 focus-visible:ring-emerald-500"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="lastName"
                    className="text-emerald-700 dark:text-emerald-300"
                  >
                    Last Name
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                      <UserCircle className="h-4 w-4" />
                    </div>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="pl-10 bg-white dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800 focus-visible:ring-emerald-500"
                      required
                    />
                  </div>
                </div>
              </div>

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

              <Tabs
                defaultValue={userType}
                onValueChange={(value) =>
                  setUserType(value as "renter" | "host")
                }
                className="w-full mb-4"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger
                    value="renter"
                    className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
                  >
                    <Home className="mr-2 h-4 w-4" />
                    I'm looking to rent
                  </TabsTrigger>
                  <TabsTrigger
                    value="host"
                    className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
                  >
                    <Building className="mr-2 h-4 w-4" />
                    I'm a property owner
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {userType === "host" && (
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-emerald-700 dark:text-emerald-300"
                  >
                    Phone Number (Required for Landlords)
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
                      required={userType === "host"}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-emerald-700 dark:text-emerald-300"
                >
                  Password
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                    <Lock className="h-4 w-4" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
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
                  Confirm Password
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                    <Lock className="h-4 w-4" />
                  </div>
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
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

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) =>
                    setTermsAccepted(checked === true)
                  }
                  className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-emerald-700 dark:text-emerald-300"
                >
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-emerald-900 hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-100 underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-emerald-900 hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-100 underline"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white transition-all duration-300 shadow-md hover:shadow-lg dark:shadow-emerald-900/20 dark:hover:shadow-emerald-900/40 luxury-button"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
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

            <p className="text-center text-sm text-emerald-600 dark:text-emerald-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-emerald-900 hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-100 relative inline-block group"
              >
                Sign in
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 dark:bg-emerald-400 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
              </Link>
            </p>
          </form>
        );

      case 2: // Phone verification (OTP)
        return (
          <OTPVerification
            phoneNumber={phone}
            onVerify={handleVerifyOTP}
            onResend={handleResendOTP}
            error={otpError}
          />
        );

      case 3: // Document upload (for hosts)
        return <DocumentUpload onUpload={handleDocumentUpload} error={error} />;

      default:
        return null;
    }
  };

  const signupContent = (
    <div className="p-8 bg-white dark:bg-black dark:shadow-[0_0_50px_-12px_rgba(16,185,129,0.4)] rounded-2xl shadow-2xl max-w-md w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-playfair text-emerald-900 dark:text-emerald-50 dark:glow-text">
          Create Account
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
        Join our exclusive Ethiopian real estate platform
      </p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderStep()}
      </motion.div>
    </div>
  );

  // If used as a modal dialog
  if (isOpen) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="p-0 border-none bg-transparent max-w-md dark:shadow-[0_0_50px_-12px_rgba(16,185,129,0.4)]">
          {signupContent}
        </DialogContent>
      </Dialog>
    );
  }

  // If used as a standalone page
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="relative z-10">{signupContent}</div>
    </div>
  );
};

export default SignUpForm;
