import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  MessageSquare,
  Eye,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart,
  Calendar,
  DollarSign,
  ArrowUpRight,
  Building,
  Users,
} from "lucide-react";

interface HostDashboardProps {
  userName?: string;
  userAvatar?: string;
}

const HostDashboard: React.FC<HostDashboardProps> = ({
  userName = "Abebe Kebede",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Abebe",
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data
  const stats = {
    properties: 3,
    inquiries: 12,
    views: 156,
    messages: 8,
    responseRate: 95,
    averageResponseTime: 1.5, // hours
  };

  const recentMessages = [
    {
      id: "msg1",
      sender: "Tigist Haile",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tigist",
      message: "Is the apartment still available for viewing this weekend?",
      time: "2 hours ago",
      property: "2BHK in Bole",
      unread: true,
    },
    {
      id: "msg2",
      sender: "Dawit Mekonnen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dawit",
      message: "I'm interested in your property. Is the price negotiable?",
      time: "Yesterday",
      property: "Villa in Ayat",
      unread: false,
    },
    {
      id: "msg3",
      sender: "Hanna Girma",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hanna",
      message:
        "Thank you for showing me the apartment yesterday. I'd like to proceed with the application.",
      time: "2 days ago",
      property: "Studio in Kazanchis",
      unread: false,
    },
  ];

  const properties = [
    {
      id: "prop1",
      title: "2BHK in Bole",
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop&q=80",
      price: "12,000 ETB/month",
      views: 78,
      inquiries: 5,
      status: "active",
    },
    {
      id: "prop2",
      title: "Villa in Ayat",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=80",
      price: "35,000 ETB/month",
      views: 45,
      inquiries: 3,
      status: "active",
    },
    {
      id: "prop3",
      title: "Studio in Kazanchis",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      price: "8,000 ETB/month",
      views: 33,
      inquiries: 4,
      status: "active",
    },
  ];

  const insights = [
    {
      title: "Price Insight",
      description:
        "Your 2BHK in Bole is priced 8% higher than similar properties in the area",
      icon: <DollarSign className="h-5 w-5 text-amber-500" />,
      action: "Consider adjusting price",
    },
    {
      title: "Demand Alert",
      description:
        "2BHK demand up 30% near AAU – consider raising price to 9,000 ETB",
      icon: <TrendingUp className="h-5 w-5 text-emerald-500" />,
      action: "Update pricing",
    },
    {
      title: "Viewing Opportunity",
      description: "Saturday viewings get 40% more inquiries than other days",
      icon: <Calendar className="h-5 w-5 text-blue-500" />,
      action: "Schedule open house",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border-2 border-emerald-100 dark:border-emerald-800">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback className="bg-emerald-100 text-emerald-800">
              {userName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-playfair text-emerald-900 dark:text-emerald-50">
              {userName}'s Dashboard
            </h1>
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-100">
                Host
              </Badge>
              {stats.responseRate >= 90 && (
                <Badge className="bg-emerald-600 text-white flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> Quick Responder
                </Badge>
              )}
            </div>
          </div>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <Building className="mr-2 h-4 w-4" /> Add New Property
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white dark:bg-black/40 shadow-md dark:shadow-[0_0_20px_rgba(16,185,129,0.05)]">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  Properties
                </p>
                <h3 className="text-3xl font-bold text-emerald-900 dark:text-emerald-50">
                  {stats.properties}
                </h3>
              </div>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                <Building className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-black/40 shadow-md dark:shadow-[0_0_20px_rgba(16,185,129,0.05)]">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  Total Views
                </p>
                <h3 className="text-3xl font-bold text-emerald-900 dark:text-emerald-50">
                  {stats.views}
                </h3>
              </div>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                <Eye className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-black/40 shadow-md dark:shadow-[0_0_20px_rgba(16,185,129,0.05)]">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  Inquiries
                </p>
                <h3 className="text-3xl font-bold text-emerald-900 dark:text-emerald-50">
                  {stats.inquiries}
                </h3>
              </div>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                <Users className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-black/40 shadow-md dark:shadow-[0_0_20px_rgba(16,185,129,0.05)]">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  Response Rate
                </p>
                <h3 className="text-3xl font-bold text-emerald-900 dark:text-emerald-50">
                  {stats.responseRate}%
                </h3>
              </div>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                <Clock className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs
        defaultValue="overview"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="inbox"
            className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
          >
            Inbox
          </TabsTrigger>
          <TabsTrigger
            value="insights"
            className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
          >
            Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-white dark:bg-black/40 shadow-md dark:shadow-[0_0_20px_rgba(16,185,129,0.05)]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-playfair text-emerald-900 dark:text-emerald-50">
                    Your Properties
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {properties.map((property) => (
                      <div
                        key={property.id}
                        className="flex gap-4 p-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors"
                      >
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-emerald-900 dark:text-emerald-50">
                              {property.title}
                            </h3>
                            <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-100">
                              {property.status}
                            </Badge>
                          </div>
                          <p className="text-emerald-600 dark:text-emerald-400 text-sm">
                            {property.price}
                          </p>
                          <div className="flex gap-4 mt-2">
                            <div className="flex items-center text-sm text-emerald-600 dark:text-emerald-400">
                              <Eye className="h-4 w-4 mr-1" /> {property.views}{" "}
                              views
                            </div>
                            <div className="flex items-center text-sm text-emerald-600 dark:text-emerald-400">
                              <MessageSquare className="h-4 w-4 mr-1" />{" "}
                              {property.inquiries} inquiries
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="bg-white dark:bg-black/40 shadow-md dark:shadow-[0_0_20px_rgba(16,185,129,0.05)]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-playfair text-emerald-900 dark:text-emerald-50">
                    Recent Messages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentMessages.slice(0, 3).map((message) => (
                      <div
                        key={message.id}
                        className={`p-3 rounded-lg ${message.unread ? "bg-emerald-50 dark:bg-emerald-900/20" : "hover:bg-emerald-50 dark:hover:bg-emerald-900/10"} transition-colors`}
                      >
                        <div className="flex gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={message.avatar}
                              alt={message.sender}
                            />
                            <AvatarFallback className="bg-emerald-100 text-emerald-800">
                              {message.sender
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-emerald-900 dark:text-emerald-50 truncate">
                                {message.sender}
                              </h4>
                              <span className="text-xs text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                                {message.time}
                              </span>
                            </div>
                            <p className="text-sm text-emerald-700 dark:text-emerald-300 truncate">
                              {message.message}
                            </p>
                            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                              Re: {message.property}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4 border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
                  >
                    View All Messages
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="inbox">
          <Card className="bg-white dark:bg-black/40 shadow-md dark:shadow-[0_0_20px_rgba(16,185,129,0.05)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-playfair text-emerald-900 dark:text-emerald-50">
                Message Inbox
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg ${message.unread ? "bg-emerald-50 dark:bg-emerald-900/20" : "hover:bg-emerald-50 dark:hover:bg-emerald-900/10"} transition-colors`}
                  >
                    <div className="flex gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={message.avatar}
                          alt={message.sender}
                        />
                        <AvatarFallback className="bg-emerald-100 text-emerald-800">
                          {message.sender
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-emerald-900 dark:text-emerald-50">
                            {message.sender}
                            {message.unread && (
                              <Badge className="ml-2 bg-emerald-600 text-white">
                                New
                              </Badge>
                            )}
                          </h4>
                          <span className="text-sm text-emerald-600 dark:text-emerald-400">
                            {message.time}
                          </span>
                        </div>
                        <p className="text-emerald-700 dark:text-emerald-300 my-2">
                          {message.message}
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-emerald-600 dark:text-emerald-400">
                            Re: {message.property}
                          </p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
                            >
                              View Details
                            </Button>
                            <Button
                              size="sm"
                              className="h-8 bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-white dark:bg-black/40 shadow-md dark:shadow-[0_0_20px_rgba(16,185,129,0.05)]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-playfair text-emerald-900 dark:text-emerald-50">
                    Performance Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {insights.map((insight, index) => (
                      <div
                        key={index}
                        className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg"
                      >
                        <div className="flex gap-4">
                          <div className="p-3 bg-white dark:bg-black/60 rounded-full">
                            {insight.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-emerald-900 dark:text-emerald-50">
                              {insight.title}
                            </h3>
                            <p className="text-emerald-700 dark:text-emerald-300 text-sm my-2">
                              {insight.description}
                            </p>
                            <Button
                              size="sm"
                              className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                              {insight.action}{" "}
                              <ArrowUpRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="bg-white dark:bg-black/40 shadow-md dark:shadow-[0_0_20px_rgba(16,185,129,0.05)]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-playfair text-emerald-900 dark:text-emerald-50">
                    Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                      <h3 className="font-medium text-emerald-900 dark:text-emerald-50 mb-2">
                        Your Performance
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-emerald-700 dark:text-emerald-300">
                              Response Rate
                            </span>
                            <span className="text-emerald-900 dark:text-emerald-50 font-medium">
                              {stats.responseRate}%
                            </span>
                          </div>
                          <div className="w-full bg-emerald-200 dark:bg-emerald-800/50 rounded-full h-2">
                            <div
                              className="bg-emerald-600 h-2 rounded-full"
                              style={{ width: `${stats.responseRate}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs mt-1">
                            <span className="text-emerald-600 dark:text-emerald-400">
                              You
                            </span>
                            <span className="text-emerald-600 dark:text-emerald-400">
                              Area Avg: 82%
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-emerald-700 dark:text-emerald-300">
                              Inquiry Conversion
                            </span>
                            <span className="text-emerald-900 dark:text-emerald-50 font-medium">
                              42%
                            </span>
                          </div>
                          <div className="w-full bg-emerald-200 dark:bg-emerald-800/50 rounded-full h-2">
                            <div
                              className="bg-emerald-600 h-2 rounded-full"
                              style={{ width: `42%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs mt-1">
                            <span className="text-emerald-600 dark:text-emerald-400">
                              You
                            </span>
                            <span className="text-emerald-600 dark:text-emerald-400">
                              Area Avg: 35%
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-emerald-700 dark:text-emerald-300">
                              Listing Quality
                            </span>
                            <span className="text-emerald-900 dark:text-emerald-50 font-medium">
                              88%
                            </span>
                          </div>
                          <div className="w-full bg-emerald-200 dark:bg-emerald-800/50 rounded-full h-2">
                            <div
                              className="bg-emerald-600 h-2 rounded-full"
                              style={{ width: `88%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs mt-1">
                            <span className="text-emerald-600 dark:text-emerald-400">
                              You
                            </span>
                            <span className="text-emerald-600 dark:text-emerald-400">
                              Area Avg: 75%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
                    >
                      <BarChart className="mr-2 h-4 w-4" />
                      View Detailed Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HostDashboard;
