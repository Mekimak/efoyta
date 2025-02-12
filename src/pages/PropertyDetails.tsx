import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Heart, Share2 } from "lucide-react";

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

const PropertyDetails = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [reviews] = useState<Review[]>([
    {
      id: "1",
      user: "John Doe",
      rating: 5,
      comment: "Absolutely stunning property with breathtaking views!",
      date: "2024-01-15",
    },
    {
      id: "2",
      user: "Jane Smith",
      rating: 4,
      comment: "Beautiful home, excellent amenities. Highly recommended.",
      date: "2024-01-10",
    },
  ]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // Add review submission logic here
    console.log({ rating, comment });
  };

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-emerald-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Property Images */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <img
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811"
            alt="Property"
            className="w-full h-[500px] object-cover rounded-lg"
          />
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
              alt="Property"
              className="w-full h-[240px] object-cover rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
              alt="Property"
              className="w-full h-[240px] object-cover rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
              alt="Property"
              className="w-full h-[240px] object-cover rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
              alt="Property"
              className="w-full h-[240px] object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Property Info */}
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-playfair text-emerald-800 mb-2">
                    Luxury Beachfront Villa
                  </h1>
                  <p className="text-gray-600">Beverly Hills, CA</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4 text-emerald-600" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4 text-emerald-600" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <p className="text-sm text-gray-600">Bedrooms</p>
                  <p className="text-xl font-semibold text-emerald-800">5</p>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <p className="text-sm text-gray-600">Bathrooms</p>
                  <p className="text-xl font-semibold text-emerald-800">4</p>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <p className="text-sm text-gray-600">Square Feet</p>
                  <p className="text-xl font-semibold text-emerald-800">
                    4,500
                  </p>
                </div>
              </div>

              <div className="prose max-w-none">
                <h2 className="text-xl font-playfair text-emerald-800 mb-4">
                  Description
                </h2>
                <p className="text-gray-600">
                  Experience luxury living at its finest in this stunning
                  beachfront villa. Featuring panoramic ocean views, premium
                  finishes, and resort-style amenities.
                </p>
              </div>
            </div>

            {/* Reviews Section */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-playfair text-emerald-800 mb-6">
                  Reviews & Ratings
                </h2>

                {/* Add Review Form */}
                <form onSubmit={handleSubmitReview} className="mb-8">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1"
                      >
                        <Star
                          className={`h-6 w-6 ${star <= rating ? "fill-emerald-500 text-emerald-500" : "text-gray-300"}`}
                        />
                      </button>
                    ))}
                  </div>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience..."
                    className="mb-4"
                  />
                  <Button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Submit Review
                  </Button>
                </form>

                {/* Reviews List */}
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6">
                      <div className="flex items-center mb-2">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "fill-emerald-500 text-emerald-500" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          |{new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="font-medium text-emerald-800 mb-1">
                        {review.user}
                      </p>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-3xl font-playfair text-emerald-800 mb-6">
                  $2,500,000
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mb-4">
                  Contact Agent
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-emerald-200 hover:bg-emerald-50"
                >
                  Schedule Viewing
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
