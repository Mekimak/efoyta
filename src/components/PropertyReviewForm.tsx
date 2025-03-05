import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Star, MessageSquare, Check, AlertCircle } from "lucide-react";

interface PropertyReviewFormProps {
  propertyId: string;
  propertyTitle: string;
  onSubmit?: (reviewData: any) => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const PropertyReviewForm: React.FC<PropertyReviewFormProps> = ({
  propertyId,
  propertyTitle,
  onSubmit = () => {},
  isOpen = false,
  onOpenChange = () => {},
}) => {
  const [language, setLanguage] = useState<"english" | "amharic">("english");
  const [ratings, setRatings] = useState({
    cleanliness: 5,
    communication: 5,
    accuracy: 5,
    location: 5,
    overall: 5,
  });
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRatingChange = (
    category: keyof typeof ratings,
    value: number,
  ) => {
    setRatings((prev) => ({
      ...prev,
      [category]: value,
      // Update overall rating as average of all other ratings
      overall:
        category !== "overall"
          ? Math.round(
              (prev.cleanliness +
                prev.communication +
                prev.accuracy +
                prev.location +
                value) /
                4,
            )
          : prev.overall,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate
      if (!comment.trim()) {
        throw new Error("Please provide a review comment");
      }

      // In a real app, this would be an API call to Supabase
      // const { error } = await supabase
      //   .from('reviews')
      //   .insert({
      //     listing_id: propertyId,
      //     renter_id: 'user-456', // Would come from auth context
      //     rating: ratings.overall,
      //     cleanliness: ratings.cleanliness,
      //     communication: ratings.communication,
      //     accuracy: ratings.accuracy,
      //     location: ratings.location,
      //     comment,
      //     language
      //   });

      // if (error) throw error;

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(true);
      onSubmit({
        propertyId,
        ratings,
        comment,
        language,
      });

      // Reset form after successful submission
      setTimeout(() => {
        setRatings({
          cleanliness: 5,
          communication: 5,
          accuracy: 5,
          location: 5,
          overall: 5,
        });
        setComment("");
        setSuccess(false);
        onOpenChange(false);
      }, 2000);
    } catch (err) {
      console.error("Review submission error:", err);
      setError(err instanceof Error ? err.message : "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (category: keyof typeof ratings, label: string) => (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label className="text-emerald-800 dark:text-emerald-200">
          {label}
        </Label>
        <span className="text-amber-500">{ratings[category]}/5</span>
      </div>
      <RadioGroup
        value={ratings[category].toString()}
        onValueChange={(value) => handleRatingChange(category, parseInt(value))}
        className="flex space-x-1"
      >
        {[1, 2, 3, 4, 5].map((value) => (
          <div key={value} className="flex items-center">
            <RadioGroupItem
              value={value.toString()}
              id={`${category}-${value}`}
              className="sr-only"
            />
            <Label
              htmlFor={`${category}-${value}`}
              className={`cursor-pointer p-1 rounded-full hover:bg-amber-50 dark:hover:bg-amber-900/20 ${parseInt(ratings[category].toString()) >= value ? "text-amber-500" : "text-gray-300 dark:text-gray-600"}`}
            >
              <Star className="h-6 w-6 fill-current" />
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );

  const reviewForm = (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Language Selection */}
      <Tabs
        value={language}
        onValueChange={(value) => setLanguage(value as "english" | "amharic")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger
            value="english"
            className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
          >
            English
          </TabsTrigger>
          <TabsTrigger
            value="amharic"
            className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
          >
            አማርኛ (Amharic)
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Star Ratings */}
      <div className="space-y-4">
        {renderStars("cleanliness", "Cleanliness")}
        {renderStars("communication", "Communication")}
        {renderStars("accuracy", "Accuracy")}
        {renderStars("location", "Location")}
      </div>

      {/* Overall Rating */}
      <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800/50">
        <div className="flex justify-between items-center">
          <Label className="text-lg font-medium text-emerald-800 dark:text-emerald-200">
            Overall Rating
          </Label>
          <div className="flex items-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((value) => (
                <Star
                  key={value}
                  className={`h-6 w-6 ${value <= ratings.overall ? "text-amber-500 fill-amber-500" : "text-gray-300 dark:text-gray-600"}`}
                />
              ))}
            </div>
            <span className="ml-2 text-lg font-medium text-emerald-800 dark:text-emerald-200">
              {ratings.overall}/5
            </span>
          </div>
        </div>
      </div>

      {/* Review Comment */}
      <div className="space-y-2">
        <Label
          htmlFor="comment"
          className="text-emerald-800 dark:text-emerald-200"
        >
          Your Review
        </Label>
        <div className="relative">
          <div className="absolute left-3 top-3 text-emerald-500">
            <MessageSquare className="h-5 w-5" />
          </div>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={
              language === "english"
                ? "Share your experience with this property..."
                : "ስለዚህ ንብረት ያለዎትን ተሞክሮ ያካፍሉ..."
            }
            className="pl-10 min-h-[150px] bg-white dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800 focus-visible:ring-emerald-500"
            required
          />
        </div>
        <p className="text-xs text-emerald-600 dark:text-emerald-400">
          {language === "english"
            ? "Your review will be public and helps other renters make decisions."
            : "ግምገማዎ ለሌሎች ተከራዮች ውሳኔ እንዲወስኑ ይረዳቸዋል።"}
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-2 text-red-500 dark:text-red-400 text-sm">
          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="flex items-start gap-2 text-emerald-600 dark:text-emerald-400 text-sm">
          <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span>Your review has been submitted successfully!</span>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
        disabled={isSubmitting || success}
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );

  // If used as a dialog
  if (isOpen !== undefined) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px] dark:bg-black/90 dark:border-emerald-900/50 dark:backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair text-emerald-900 dark:text-emerald-50 flex items-center">
              <Star className="mr-2 h-5 w-5 text-amber-500" />
              Review {propertyTitle}
            </DialogTitle>
          </DialogHeader>
          {reviewForm}
        </DialogContent>
      </Dialog>
    );
  }

  // If used as a standalone component
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-black/40 shadow-lg dark:shadow-[0_0_30px_rgba(16,185,129,0.1)] rounded-lg p-6"
    >
      <h2 className="text-2xl font-playfair text-emerald-900 dark:text-emerald-50 mb-6 flex items-center">
        <Star className="mr-2 h-5 w-5 text-amber-500" />
        Review {propertyTitle}
      </h2>
      {reviewForm}
    </motion.div>
  );
};

export default PropertyReviewForm;
