import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Phone, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface OTPVerificationProps {
  phoneNumber: string;
  onVerify: (otp: string) => Promise<void>;
  onResend: () => void;
  error?: string | null;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  phoneNumber,
  onVerify,
  onResend,
  error,
}) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0 && !canResend) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCanResend(true);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, canResend]);

  const handleVerify = async () => {
    if (otp.length !== 4) return;

    setIsLoading(true);
    try {
      await onVerify(otp);
    } catch (error) {
      console.error("OTP verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    if (!canResend) return;

    onResend();
    setCanResend(false);
    setCountdown(60);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 mb-4">
          <Phone className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-xl font-medium text-emerald-900 dark:text-emerald-50 mb-2">
          Verify Your Phone Number
        </h3>
        <p className="text-emerald-600 dark:text-emerald-400">
          We've sent a verification code to{" "}
          <span className="font-medium">{phoneNumber}</span>
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="otp"
            className="text-emerald-700 dark:text-emerald-300"
          >
            Enter Verification Code
          </Label>
          <Input
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
            placeholder="Enter 4-digit code"
            className="text-center text-lg tracking-widest bg-white dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800 focus-visible:ring-emerald-500"
            maxLength={4}
            required
          />
        </div>

        {error && (
          <div className="flex items-start gap-2 text-red-500 dark:text-red-400 text-sm">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <Button
          onClick={handleVerify}
          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white transition-all duration-300 shadow-md hover:shadow-lg dark:shadow-emerald-900/20 dark:hover:shadow-emerald-900/40 luxury-button"
          disabled={isLoading || otp.length !== 4}
        >
          {isLoading ? "Verifying..." : "Verify Code"}
        </Button>

        <div className="text-center">
          <p className="text-sm text-emerald-600 dark:text-emerald-400">
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={!canResend}
              className={`font-medium ${canResend ? "text-emerald-900 hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-100" : "text-emerald-400 dark:text-emerald-600 cursor-not-allowed"} relative inline-block group`}
            >
              {canResend ? "Resend Code" : `Resend in ${countdown}s`}
              {canResend && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 dark:bg-emerald-400 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
              )}
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default OTPVerification;
