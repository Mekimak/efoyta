import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add login logic here
    navigate("/dashboard");
  };

  return (
    <Card className="w-[400px] bg-white/90 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-playfair text-emerald-800">
          Welcome Back
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              className="border-emerald-100 focus:border-emerald-500"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              className="border-emerald-100 focus:border-emerald-500"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Sign In
          </Button>
          <div className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-emerald-600 hover:text-emerald-700"
            >
              Sign up
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
