import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

const ListProperty = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add property listing logic here
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-emerald-900 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-playfair text-emerald-800">
              List Your Property
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Property Title
                </label>
                <Input
                  placeholder="e.g., Luxury Beachfront Villa"
                  className="border-emerald-100 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <Input
                    type="number"
                    placeholder="$"
                    className="border-emerald-100 focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <Input
                    placeholder="City, State"
                    className="border-emerald-100 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Bedrooms
                  </label>
                  <Input
                    type="number"
                    className="border-emerald-100 focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Bathrooms
                  </label>
                  <Input
                    type="number"
                    className="border-emerald-100 focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Square Feet
                  </label>
                  <Input
                    type="number"
                    className="border-emerald-100 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <Textarea
                  placeholder="Describe your property..."
                  className="min-h-[150px] border-emerald-100 focus:border-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Upload Images
                </label>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  className="border-emerald-100 focus:border-emerald-500"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                  className="border-emerald-200 hover:bg-emerald-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  List Property
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ListProperty;
