import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Home, Heart, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-emerald-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-playfair text-emerald-800">
                My Properties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-600">3</div>
              <p className="text-gray-500">Listed Properties</p>
              <Button
                onClick={() => navigate("/list-property")}
                className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                List New Property
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-playfair text-emerald-800">
                Saved Homes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-600">12</div>
              <p className="text-gray-500">Favorited Properties</p>
              <Button
                variant="outline"
                onClick={() => navigate("/saved")}
                className="mt-4 w-full border-emerald-200 hover:bg-emerald-50"
              >
                <Heart className="mr-2 h-4 w-4 text-emerald-600" />
                View Saved Homes
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-playfair text-emerald-800">
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                onClick={() => navigate("/settings")}
                className="w-full border-emerald-200 hover:bg-emerald-50"
              >
                <Settings className="mr-2 h-4 w-4 text-emerald-600" />
                Manage Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
