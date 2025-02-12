import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add signup logic here
    navigate("/dashboard");
  };

  return (
    <Card className="w-[400px] bg-white/90 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-playfair text-emerald-800">
          Create Account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="First Name"
              className="border-emerald-100 focus:border-emerald-500"
            />
            <Input
              placeholder="Last Name"
              className="border-emerald-100 focus:border-emerald-500"
            />
          </div>
          <Input
            type="email"
            placeholder="Email"
            className="border-emerald-100 focus:border-emerald-500"
          />
          <Input
            type="password"
            placeholder="Password"
            className="border-emerald-100 focus:border-emerald-500"
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            className="border-emerald-100 focus:border-emerald-500"
          />
          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Create Account
          </Button>
          <div className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-emerald-600 hover:text-emerald-700"
            >
              Sign in
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
