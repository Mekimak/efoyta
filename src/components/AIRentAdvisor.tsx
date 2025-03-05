import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  DollarSign,
  Sparkles,
  TrendingUp,
  TrendingDown,
  BarChart,
  MapPin,
  Home,
  Lightbulb,
  MessageSquare,
  Send,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

interface AIRentAdvisorProps {
  onPriceUpdate?: (price: number) => void;
}

const AIRentAdvisor: React.FC<AIRentAdvisorProps> = ({
  onPriceUpdate = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("pricing");
  const [propertyType, setPropertyType] = useState("apartment");
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [area, setArea] = useState("Bole");
  const [squareMeters, setSquareMeters] = useState(80);
  const [amenities, setAmenities] = useState<string[]>([
    "generator",
    "water-tank",
  ]);
  const [suggestedPrice, setSuggestedPrice] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    { role: string; content: string }[]
  >([]);
  const [messageInput, setMessageInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleAnalyzePrice = () => {
    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      // Base price calculation based on area and property type
      let basePrice = 0;

      // Area-based pricing (in ETB)
      if (area === "Bole") basePrice = 12000;
      else if (area === "Kazanchis") basePrice = 10000;
      else if (area === "CMC") basePrice = 15000;
      else if (area === "Ayat") basePrice = 8000;
      else basePrice = 9000;

      // Adjust for property type
      if (propertyType === "villa") basePrice *= 2.5;
      else if (propertyType === "penthouse") basePrice *= 1.8;
      else if (propertyType === "studio") basePrice *= 0.7;

      // Adjust for bedrooms and bathrooms
      basePrice += (bedrooms - 1) * 2000;
      basePrice += (bathrooms - 1) * 1500;

      // Adjust for square meters
      basePrice += (squareMeters - 50) * 50;

      // Adjust for amenities
      if (amenities.includes("generator")) basePrice += 1000;
      if (amenities.includes("water-tank")) basePrice += 500;
      if (amenities.includes("guard")) basePrice += 800;
      if (amenities.includes("parking")) basePrice += 1200;

      // Set price range (±10%)
      const minPrice = Math.round(basePrice * 0.9);
      const maxPrice = Math.round(basePrice * 1.1);

      setSuggestedPrice(basePrice);
      setPriceRange([minPrice, maxPrice]);
      setIsAnalyzing(false);

      // Add initial AI message to chat
      setChatMessages([
        {
          role: "assistant",
          content: `Based on my analysis of ${bedrooms}BHK ${propertyType}s in ${area}, I recommend pricing your property at ${basePrice.toLocaleString()} ETB/month. This is competitive for the current market while maximizing your rental income. Would you like to know more about how this compares to similar properties?`,
        },
      ]);
    }, 2000);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    // Add user message
    const newMessages = [
      ...chatMessages,
      { role: "user", content: messageInput },
    ];
    setChatMessages(newMessages);
    setMessageInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let response = "";
      const lowerCaseMessage = messageInput.toLowerCase();

      if (
        lowerCaseMessage.includes("negotiate") ||
        lowerCaseMessage.includes("bargain") ||
        lowerCaseMessage.includes("lower")
      ) {
        response = `For negotiation, I suggest being open to a minimum of ${(suggestedPrice! * 0.95).toLocaleString()} ETB for quality tenants with good references. You could offer a 5% discount for long-term leases (12+ months) or upfront payments of 3+ months.`;
      } else if (
        lowerCaseMessage.includes("market") ||
        lowerCaseMessage.includes("trend") ||
        lowerCaseMessage.includes("compare")
      ) {
        response = `The ${area} market has seen a 7% increase in rental prices over the past 6 months. Similar ${bedrooms}BHK ${propertyType}s are renting for ${priceRange![0].toLocaleString()}-${priceRange![1].toLocaleString()} ETB/month. Your property's amenities (backup generator, water tank) position it in the upper tier of this range.`;
      } else if (
        lowerCaseMessage.includes("tenant") ||
        lowerCaseMessage.includes("find") ||
        lowerCaseMessage.includes("attract")
      ) {
        response = `To attract quality tenants quickly, highlight the backup generator and water tank in your listing - these are highly sought after in ${area}. Professional photos and virtual tours can reduce vacancy time by up to 30%. The current average time-to-rent for similar properties is 18 days.`;
      } else {
        response = `Based on current market data for ${area}, your ${bedrooms}BHK ${propertyType} with ${squareMeters}m² is well-positioned at ${suggestedPrice?.toLocaleString()} ETB/month. This price reflects the property's size, amenities, and location value. Would you like specific advice on marketing strategies or negotiation tactics?`;
      }

      setChatMessages([
        ...newMessages,
        { role: "assistant", content: response },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleApplyPrice = () => {
    if (suggestedPrice) {
      onPriceUpdate(suggestedPrice);
    }
  };

  const toggleAmenity = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((a) => a !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white dark:bg-black/40 shadow-lg dark:shadow-[0_0_30px_rgba(16,185,129,0.1)]">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-playfair text-emerald-900 dark:text-emerald-50 flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-emerald-600" />
            AI Rent Advisor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger
                value="pricing"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Price Analysis
              </TabsTrigger>
              <TabsTrigger
                value="advisor"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
                disabled={!suggestedPrice}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Negotiation Advisor
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pricing" className="space-y-6">
              {!suggestedPrice ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-emerald-700 dark:text-emerald-300">
                          Property Type
                        </Label>
                        <div className="flex flex-wrap gap-2">
                          {["apartment", "villa", "studio", "penthouse"].map(
                            (type) => (
                              <Button
                                key={type}
                                variant={
                                  propertyType === type ? "default" : "outline"
                                }
                                className={
                                  propertyType === type
                                    ? "bg-emerald-600"
                                    : "border-emerald-200 dark:border-emerald-800"
                                }
                                onClick={() => setPropertyType(type)}
                              >
                                <Home className="mr-2 h-4 w-4" />
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </Button>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-emerald-700 dark:text-emerald-300">
                          Area/Subcity
                        </Label>
                        <div className="flex flex-wrap gap-2">
                          {["Bole", "Kazanchis", "CMC", "Ayat", "Other"].map(
                            (areaOption) => (
                              <Button
                                key={areaOption}
                                variant={
                                  area === areaOption ? "default" : "outline"
                                }
                                className={
                                  area === areaOption
                                    ? "bg-emerald-600"
                                    : "border-emerald-200 dark:border-emerald-800"
                                }
                                onClick={() => setArea(areaOption)}
                              >
                                <MapPin className="mr-2 h-4 w-4" />
                                {areaOption}
                              </Button>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-emerald-700 dark:text-emerald-300">
                          Amenities
                        </Label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { id: "generator", label: "Generator" },
                            { id: "water-tank", label: "Water Tank" },
                            { id: "guard", label: "24/7 Guard" },
                            { id: "parking", label: "Parking" },
                          ].map((amenity) => (
                            <Button
                              key={amenity.id}
                              variant={
                                amenities.includes(amenity.id)
                                  ? "default"
                                  : "outline"
                              }
                              className={
                                amenities.includes(amenity.id)
                                  ? "bg-emerald-600"
                                  : "border-emerald-200 dark:border-emerald-800"
                              }
                              onClick={() => toggleAmenity(amenity.id)}
                            >
                              {amenity.label}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label className="text-emerald-700 dark:text-emerald-300">
                            Bedrooms
                          </Label>
                          <span className="text-emerald-600 dark:text-emerald-400">
                            {bedrooms}
                          </span>
                        </div>
                        <Slider
                          value={[bedrooms]}
                          min={1}
                          max={5}
                          step={1}
                          onValueChange={(value) => setBedrooms(value[0])}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label className="text-emerald-700 dark:text-emerald-300">
                            Bathrooms
                          </Label>
                          <span className="text-emerald-600 dark:text-emerald-400">
                            {bathrooms}
                          </span>
                        </div>
                        <Slider
                          value={[bathrooms]}
                          min={1}
                          max={4}
                          step={1}
                          onValueChange={(value) => setBathrooms(value[0])}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label className="text-emerald-700 dark:text-emerald-300">
                            Square Meters
                          </Label>
                          <span className="text-emerald-600 dark:text-emerald-400">
                            {squareMeters} m²
                          </span>
                        </div>
                        <Slider
                          value={[squareMeters]}
                          min={30}
                          max={300}
                          step={10}
                          onValueChange={(value) => setSquareMeters(value[0])}
                        />
                      </div>

                      <div className="pt-4">
                        <Button
                          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white transition-all duration-300 shadow-md hover:shadow-lg"
                          onClick={handleAnalyzePrice}
                          disabled={isAnalyzing}
                        >
                          {isAnalyzing ? (
                            <>
                              <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                              Analyzing Market Data...
                            </>
                          ) : (
                            <>
                              <Sparkles className="mr-2 h-4 w-4" />
                              Analyze Optimal Price
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800/50">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-emerald-800 dark:text-emerald-300 font-medium">
                          AI Pricing Insights
                        </h4>
                        <p className="text-emerald-700 dark:text-emerald-400 text-sm">
                          Our AI analyzes thousands of Ethiopian rental listings
                          to suggest the optimal price for your property. The
                          algorithm considers location, property features,
                          amenities, and current market trends specific to Addis
                          Ababa.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-emerald-100 dark:bg-emerald-800 p-2 rounded-full">
                        <Sparkles className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-emerald-800 dark:text-emerald-200">
                          AI Price Recommendation
                        </h3>
                        <p className="text-emerald-600 dark:text-emerald-400">
                          Based on current market data for {area}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 bg-white dark:bg-black/60 rounded-lg p-4 border border-emerald-100 dark:border-emerald-800/30 text-center">
                        <h4 className="text-sm font-medium text-emerald-800 dark:text-emerald-200 mb-1">
                          Suggested Price
                        </h4>
                        <div className="text-3xl font-bold text-emerald-900 dark:text-emerald-50 mb-1">
                          {suggestedPrice?.toLocaleString()} ETB
                        </div>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400">
                          per month
                        </p>
                      </div>

                      <div className="flex-1 bg-white dark:bg-black/60 rounded-lg p-4 border border-emerald-100 dark:border-emerald-800/30">
                        <h4 className="text-sm font-medium text-emerald-800 dark:text-emerald-200 mb-2">
                          Market Range
                        </h4>
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-100">
                            <TrendingDown className="h-3 w-3 mr-1" />
                            Min: {priceRange?.[0].toLocaleString()} ETB
                          </Badge>
                          <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-100">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Max: {priceRange?.[1].toLocaleString()} ETB
                          </Badge>
                        </div>
                        <div className="w-full bg-emerald-100 dark:bg-emerald-900/30 rounded-full h-1.5">
                          <div
                            className="bg-emerald-600 h-1.5 rounded-full"
                            style={{
                              width: `${((suggestedPrice! - priceRange![0]) / (priceRange![1] - priceRange![0])) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-emerald-200 dark:border-emerald-800/30">
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-100 flex items-center gap-1">
                          <BarChart className="h-3 w-3" /> {bedrooms}BHK{" "}
                          {propertyType}
                        </Badge>
                        <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-100 flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {area}
                        </Badge>
                        <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-100 flex items-center gap-1">
                          <Home className="h-3 w-3" /> {squareMeters} m²
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        variant="outline"
                        className="flex-1 border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
                        onClick={() => {
                          setSuggestedPrice(null);
                          setPriceRange(null);
                          setChatMessages([]);
                        }}
                      >
                        Recalculate
                      </Button>
                      <Button
                        className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white transition-all duration-300 shadow-md hover:shadow-lg"
                        onClick={handleApplyPrice}
                      >
                        Apply This Price
                      </Button>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
                      onClick={() => setActiveTab("advisor")}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Get Negotiation Advice
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="advisor" className="space-y-6">
              <div className="bg-white dark:bg-black/60 rounded-lg border border-emerald-100 dark:border-emerald-800/30 h-[400px] flex flex-col">
                <div className="p-4 border-b border-emerald-100 dark:border-emerald-800/30 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-emerald-600" />
                  <h3 className="font-medium text-emerald-900 dark:text-emerald-50">
                    AI Negotiation Assistant
                  </h3>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-center">
                      <div className="max-w-sm">
                        <Sparkles className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-emerald-800 dark:text-emerald-200 mb-2">
                          AI Rent Advisor
                        </h3>
                        <p className="text-emerald-600 dark:text-emerald-400 text-sm">
                          Ask about pricing strategies, negotiation tactics, or
                          market trends for your {bedrooms}BHK {propertyType} in{" "}
                          {area}.
                        </p>
                      </div>
                    </div>
                  ) : (
                    chatMessages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${message.role === "user" ? "bg-emerald-600 text-white" : "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200"}`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))
                  )}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3 max-w-[80%]">
                        <div className="flex space-x-2">
                          <div className="h-2 w-2 bg-emerald-600 rounded-full animate-bounce"></div>
                          <div className="h-2 w-2 bg-emerald-600 rounded-full animate-bounce delay-75"></div>
                          <div className="h-2 w-2 bg-emerald-600 rounded-full animate-bounce delay-150"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-emerald-100 dark:border-emerald-800/30">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask about pricing, negotiation tactics, or market trends..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      className="bg-white dark:bg-black border-emerald-100 dark:border-emerald-800 focus-visible:ring-emerald-500"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim() || isTyping}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800/50">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-emerald-800 dark:text-emerald-300 font-medium">
                      Negotiation Tips
                    </h4>
                    <p className="text-emerald-700 dark:text-emerald-400 text-sm">
                      Try asking about seasonal pricing trends, tenant
                      incentives, or how to handle counteroffers. Our AI is
                      trained on Ethiopian rental market data and negotiation
                      best practices.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AIRentAdvisor;
