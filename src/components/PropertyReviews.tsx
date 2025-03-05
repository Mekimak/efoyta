import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Star,
  MessageSquare,
  ThumbsUp,
  Flag,
  Calendar,
  Check,
} from "lucide-react";
import PropertyReviewForm from "./PropertyReviewForm";

interface Review {
  id: string;
  renterName: string;
  renterAvatar?: string;
  rating: number;
  cleanliness: number;
  communication: number;
  accuracy: number;
  location: number;
  comment: string;
  date: string;
  language: "english" | "amharic";
  verified: boolean;
  hostResponse?: {
    comment: string;
    date: string;
  };
}

interface PropertyReviewsProps {
  propertyId: string;
  propertyTitle: string;
  reviews?: Review[];
  onAddReview?: (reviewData: any) => void;
  onReportReview?: (reviewId: string) => void;
  onLikeReview?: (reviewId: string) => void;
}

const PropertyReviews: React.FC<PropertyReviewsProps> = ({
  propertyId,
  propertyTitle,
  reviews: initialReviews = [],
  onAddReview = () => {},
  onReportReview = () => {},
  onLikeReview = () => {},
}) => {
  const [reviews, setReviews] = useState<Review[]>(
    initialReviews.length > 0
      ? initialReviews
      : [
          {
            id: "1",
            renterName: "Abebe Kebede",
            renterAvatar:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=Abebe",
            rating: 4,
            cleanliness: 4,
            communication: 5,
            accuracy: 4,
            location: 3,
            comment:
              "Great property with excellent amenities. The backup generator was very reliable during power outages. The location is convenient, close to shops and restaurants. The host was very responsive and helpful throughout our stay.",
            date: "2023-12-15",
            language: "english",
            verified: true,
          },
          {
            id: "2",
            renterName: "Tigist Haile",
            renterAvatar:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=Tigist",
            rating: 5,
            cleanliness: 5,
            communication: 5,
            accuracy: 5,
            location: 5,
            comment:
              "ቤቱ በጣም ጥሩ ነው። አካባቢው ለመኖር ምቹ ነው። ባለቤቱም በጣም ጥሩ ሰው ነው። ሁሉም ነገር በጣም ጥሩ ነው።",
            date: "2023-11-20",
            language: "amharic",
            verified: true,
            hostResponse: {
              comment: "እናመሰግናለን ትግስት! በድጋሚ እንጠብቅዎታለን።",
              date: "2023-11-21",
            },
          },
          {
            id: "3",
            renterName: "Dawit Mekonnen",
            renterAvatar:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=Dawit",
            rating: 3,
            cleanliness: 3,
            communication: 4,
            accuracy: 2,
            location: 3,
            comment:
              "The property was okay but not as described in the listing. The water tank was smaller than expected and ran out quickly. The location is good but a bit noisy at night. The host was responsive though.",
            date: "2023-10-05",
            language: "english",
            verified: true,
            hostResponse: {
              comment:
                "Thank you for your feedback, Dawit. We've upgraded the water tank since your stay and added soundproofing to address the noise issue.",
              date: "2023-10-06",
            },
          },
        ],
  );
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<
    "all" | "english" | "amharic"
  >("all");

  // Calculate average ratings
  const averageRatings = {
    overall:
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length,
    cleanliness:
      reviews.reduce((sum, review) => sum + review.cleanliness, 0) /
      reviews.length,
    communication:
      reviews.reduce((sum, review) => sum + review.communication, 0) /
      reviews.length,
    accuracy:
      reviews.reduce((sum, review) => sum + review.accuracy, 0) /
      reviews.length,
    location:
      reviews.reduce((sum, review) => sum + review.location, 0) /
      reviews.length,
  };

  const handleAddReview = (reviewData: any) => {
    // In a real app, this would be handled by the onAddReview callback
    // For demo purposes, we'll add it to the local state
    const newReview: Review = {
      id: `new-${Date.now()}`,
      renterName: "You",
      renterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      rating: reviewData.ratings.overall,
      cleanliness: reviewData.ratings.cleanliness,
      communication: reviewData.ratings.communication,
      accuracy: reviewData.ratings.accuracy,
      location: reviewData.ratings.location,
      comment: reviewData.comment,
      date: new Date().toISOString().split("T")[0],
      language: reviewData.language,
      verified: true,
    };

    setReviews([newReview, ...reviews]);
    setShowReviewForm(false);
    onAddReview(reviewData);
  };

  const handleReportReview = (reviewId: string) => {
    // In a real app, this would call an API
    onReportReview(reviewId);
    alert(
      "Review reported for moderation. Thank you for helping maintain quality content.",
    );
  };

  const handleLikeReview = (reviewId: string) => {
    // In a real app, this would call an API
    onLikeReview(reviewId);
    // For demo, we'll just show a message
    alert("You found this review helpful!");
  };

  const filteredReviews =
    activeLanguage === "all"
      ? reviews
      : reviews.filter((review) => review.language === activeLanguage);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      {/* Reviews Summary */}
      <div className="bg-white dark:bg-black/40 shadow-md dark:shadow-[0_0_20px_rgba(16,185,129,0.05)] rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Overall Rating */}
          <div className="flex-1 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-emerald-100 dark:border-emerald-800/50 pb-6 md:pb-0 md:pr-6">
            <h3 className="text-lg font-medium text-emerald-800 dark:text-emerald-200 mb-2">
              Overall Rating
            </h3>
            <div className="text-5xl font-bold text-emerald-900 dark:text-emerald-50 mb-2">
              {averageRatings.overall.toFixed(1)}
            </div>
            <div className="flex mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${star <= Math.round(averageRatings.overall) ? "text-amber-500 fill-amber-500" : "text-gray-300 dark:text-gray-600"}`}
                />
              ))}
            </div>
            <p className="text-emerald-600 dark:text-emerald-400 text-sm">
              Based on {reviews.length} reviews
            </p>
          </div>

          {/* Rating Categories */}
          <div className="flex-1 space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-emerald-800 dark:text-emerald-200">
                  Cleanliness
                </span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  {averageRatings.cleanliness.toFixed(1)}
                </span>
              </div>
              <div className="w-full bg-emerald-100 dark:bg-emerald-900/30 rounded-full h-1.5">
                <div
                  className="bg-emerald-600 h-1.5 rounded-full"
                  style={{
                    width: `${(averageRatings.cleanliness / 5) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-emerald-800 dark:text-emerald-200">
                  Communication
                </span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  {averageRatings.communication.toFixed(1)}
                </span>
              </div>
              <div className="w-full bg-emerald-100 dark:bg-emerald-900/30 rounded-full h-1.5">
                <div
                  className="bg-emerald-600 h-1.5 rounded-full"
                  style={{
                    width: `${(averageRatings.communication / 5) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-emerald-800 dark:text-emerald-200">
                  Accuracy
                </span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  {averageRatings.accuracy.toFixed(1)}
                </span>
              </div>
              <div className="w-full bg-emerald-100 dark:bg-emerald-900/30 rounded-full h-1.5">
                <div
                  className="bg-emerald-600 h-1.5 rounded-full"
                  style={{ width: `${(averageRatings.accuracy / 5) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-emerald-800 dark:text-emerald-200">
                  Location
                </span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  {averageRatings.location.toFixed(1)}
                </span>
              </div>
              <div className="w-full bg-emerald-100 dark:bg-emerald-900/30 rounded-full h-1.5">
                <div
                  className="bg-emerald-600 h-1.5 rounded-full"
                  style={{ width: `${(averageRatings.location / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Review Button */}
        <div className="mt-6 pt-6 border-t border-emerald-100 dark:border-emerald-800/50 text-center">
          <Button
            onClick={() => setShowReviewForm(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Write a Review
          </Button>
        </div>
      </div>

      {/* Review Form Dialog */}
      <PropertyReviewForm
        propertyId={propertyId}
        propertyTitle={propertyTitle}
        isOpen={showReviewForm}
        onOpenChange={setShowReviewForm}
        onSubmit={handleAddReview}
      />

      {/* Reviews List */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-medium text-emerald-900 dark:text-emerald-50">
            {reviews.length} Reviews
          </h3>

          {/* Language Filter */}
          <Tabs
            value={activeLanguage}
            onValueChange={(value) =>
              setActiveLanguage(value as "all" | "english" | "amharic")
            }
          >
            <TabsList className="bg-white dark:bg-black/40 border border-emerald-100 dark:border-emerald-800/50">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                All
              </TabsTrigger>
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
                አማርኛ
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Reviews */}
        <div className="space-y-6">
          {filteredReviews.length === 0 ? (
            <div className="bg-white dark:bg-black/40 shadow-md dark:shadow-[0_0_20px_rgba(16,185,129,0.05)] rounded-lg p-6 text-center">
              <MessageSquare className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-emerald-900 dark:text-emerald-50 mb-2">
                No reviews yet
              </h3>
              <p className="text-emerald-600 dark:text-emerald-400 max-w-md mx-auto">
                Be the first to review this property!
              </p>
              <Button
                onClick={() => setShowReviewForm(true)}
                className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Write a Review
              </Button>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-black/40 shadow-md dark:shadow-[0_0_20px_rgba(16,185,129,0.05)] rounded-lg p-6"
              >
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-emerald-100 dark:border-emerald-800">
                      <AvatarImage
                        src={review.renterAvatar}
                        alt={review.renterName}
                      />
                      <AvatarFallback className="bg-emerald-100 text-emerald-800">
                        {review.renterName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-emerald-900 dark:text-emerald-50">
                        {review.renterName}
                      </h4>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${star <= review.rating ? "text-amber-500 fill-amber-500" : "text-gray-300 dark:text-gray-600"}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-emerald-600 dark:text-emerald-400">
                          {review.rating}/5
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-xs text-emerald-600 dark:text-emerald-400">
                        {formatDate(review.date)}
                      </span>
                    </div>
                    {review.verified && (
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-100 flex items-center gap-1">
                        <Check className="h-3 w-3" /> Verified Stay
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-emerald-800 dark:text-emerald-200 whitespace-pre-line">
                    {review.comment}
                  </p>
                </div>

                {/* Host Response */}
                {review.hostResponse && (
                  <div className="mt-4 bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-lg border-l-4 border-emerald-600">
                    <div className="flex justify-between items-start">
                      <h5 className="font-medium text-emerald-900 dark:text-emerald-50 mb-2">
                        Response from Host
                      </h5>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400">
                        {formatDate(review.hostResponse.date)}
                      </span>
                    </div>
                    <p className="text-emerald-700 dark:text-emerald-300 text-sm">
                      {review.hostResponse.comment}
                    </p>
                  </div>
                )}

                {/* Review Actions */}
                <div className="mt-4 pt-4 border-t border-emerald-100 dark:border-emerald-800/50 flex justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLikeReview(review.id)}
                    className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Helpful
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleReportReview(review.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    Report
                  </Button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyReviews;
