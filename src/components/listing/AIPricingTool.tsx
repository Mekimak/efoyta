import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Badge } from "../ui/badge";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Check,
  BarChart,
  RefreshCw,
  Building,
  MapPin,
  Bed,
  Bath,
  Square,
} from "lucide-react";
import { motion } from "framer-motion";

interface AIPricingToolProps {
  onPriceUpdate?: (price: number) => void;
}

const AIPricingTool: React.FC<AIPricingToolProps> = ({
  onPriceUpdate = () => {},
}) => {
  const [propertyType, setPropertyType] = useState("2BHK");
  const [location, setLocation] = useState("Bole");
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [squareMeters, setSquareMeters] = useState(80);
  const [suggestedPrice, setSuggestedPrice] = useState(12000);
  const [priceRange, setPriceRange] = useState([suggestedPrice]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [insights, setInsights] = useState<string[]>([]);

  // Sample market data
  const marketData = {
    averagePrice: 14000,
    priceChange: 5, // percentage increase in last month
    demandChange: 30, // percentage increase in demand
    similarProperties: 12, // number of similar properties in the area
    occupancyRate: 92, // percentage
  };

  const generatePriceSuggestion = () => {
    setIsGenerating(true);

    // Simulate AI processing
    setTimeout(() => {
      // Calculate a price based on inputs
      const basePrice = bedrooms * 5000 + bathrooms * 2000 + squareMeters * 50;
      let locationMultiplier = 1.0;

      // Adjust based on location
      switch (location.toLowerCase()) {
        case "bole":
          locationMultiplier = 1.2;
          break;
        case "kazanchis":
          locationMultiplier = 0.9;
          break;
        case "sar bet":
          locationMultiplier = 0.85;
          break;
        case "piassa":
          locationMultiplier = 0.95;
          break;
        default:
          locationMultiplier = 1.0;
      }

      // Calculate final price
      const calculatedPrice =
        Math.round((basePrice * locationMultiplier) / 100) * 100;
      setSuggestedPrice(calculatedPrice);
      setPriceRange([calculatedPrice]);

      // Generate insights
      setInsights([
        `Price this ${bedrooms}BHK at ${calculatedPrice.toLocaleString()} ETB/month (${Math.round((calculatedPrice / marketData.averagePrice - 1) * 100)}% ${calculatedPrice < marketData.averagePrice ? "below" : "above"} ${location} average)`,
        `${bedrooms}BHK demand up ${marketData.demandChange}% near ${location === "Bole" ? "AAU" : location} – consider ${calculatedPrice < 10000 ? "raising" : "maintaining"} price`,
        `Similar properties in ${location} rent for ${(calculatedPrice * 0.9).toLocaleString()}-${(calculatedPrice * 1.1).toLocaleString()} ETB`,
      ]);

      setIsGenerating(false);

      // Notify parent component
      onPriceUpdate(calculatedPrice);
    }, 1500);
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
    setSuggestedPrice(value[0]);
    onPriceUpdate(value[0]);
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
            <DollarSign className="mr-2 h-5 w-5 text-emerald-600" />
            AI Pricing Tool
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-emerald-700 dark:text-emerald-300">
              Our AI analyzes thousands of listings to suggest the optimal price
              for your property based on location, features, and current market
              demand.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="property-type"
                    className="text-emerald-800 dark:text-emerald-200"
                  >
                    Property Type
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                      <Building className="h-4 w-4" />
                    </div>
                    <Input
                      id="property-type"
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      placeholder="e.g., 2BHK, Villa, Studio"
                      className="pl-10 bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800"
                    />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="location"
                    className="text-emerald-800 dark:text-emerald-200"
                  >
                    Location
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g., Bole, Kazanchis"
                      className="pl-10 bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label
                      htmlFor="bedrooms"
                      className="text-emerald-800 dark:text-emerald-200"
                    >
                      Bedrooms
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                        <Bed className="h-4 w-4" />
                      </div>
                      <Input
                        id="bedrooms"
                        type="number"
                        value={bedrooms}
                        onChange={(e) =>
                          setBedrooms(parseInt(e.target.value) || 0)
                        }
                        className="pl-10 bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="bathrooms"
                      className="text-emerald-800 dark:text-emerald-200"
                    >
                      Bathrooms
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                        <Bath className="h-4 w-4" />
                      </div>
                      <Input
                        id="bathrooms"
                        type="number"
                        value={bathrooms}
                        onChange={(e) =>
                          setBathrooms(parseInt(e.target.value) || 0)
                        }
                        className="pl-10 bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="square-meters"
                      className="text-emerald-800 dark:text-emerald-200"
                    >
                      Sq. Meters
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                        <Square className="h-4 w-4" />
                      </div>
                      <Input
                        id="square-meters"
                        type="number"
                        value={squareMeters}
                        onChange={(e) =>
                          setSquareMeters(parseInt(e.target.value) || 0)
                        }
                        className="pl-10 bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={generatePriceSuggestion}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Market Data...
                    </>
                  ) : (
                    <>
                      <BarChart className="mr-2 h-4 w-4" />
                      Generate Price Suggestion
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-6">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-lg border border-emerald-100 dark:border-emerald-800/50">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-emerald-900 dark:text-emerald-50">
                      Suggested Price
                    </h3>
                    <Badge className="bg-emerald-600 text-white">
                      AI Optimized
                    </Badge>
                  </div>

                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-emerald-900 dark:text-emerald-50">
                      {suggestedPrice.toLocaleString()} ETB
                      <span className="text-base font-normal text-emerald-600 dark:text-emerald-400 ml-1">
                        /month
                      </span>
                    </div>
                    <div className="flex items-center justify-center mt-2 text-sm">
                      <span
                        className={`flex items-center ${suggestedPrice < marketData.averagePrice ? "text-emerald-600" : "text-amber-500"}`}
                      >
                        {suggestedPrice < marketData.averagePrice ? (
                          <>
                            <TrendingDown className="h-4 w-4 mr-1" />
                            {Math.abs(
                              Math.round(
                                (suggestedPrice / marketData.averagePrice - 1) *
                                  100,
                              ),
                            )}
                            % below market
                          </>
                        ) : (
                          <>
                            <TrendingUp className="h-4 w-4 mr-1" />
                            {Math.round(
                              (suggestedPrice / marketData.averagePrice - 1) *
                                100,
                            )}
                            % above market
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-emerald-700 dark:text-emerald-300">
                          Price Range
                        </span>
                        <span className="text-emerald-900 dark:text-emerald-50">
                          {(suggestedPrice * 0.8).toLocaleString()} -{" "}
                          {(suggestedPrice * 1.2).toLocaleString()} ETB
                        </span>
                      </div>
                      <Slider
                        value={priceRange}
                        min={Math.round(suggestedPrice * 0.8)}
                        max={Math.round(suggestedPrice * 1.2)}
                        step={100}
                        onValueChange={handlePriceRangeChange}
                        className="my-4"
                      />
                      <div className="flex justify-between text-xs text-emerald-600 dark:text-emerald-400">
                        <span>Competitive</span>
                        <span>Optimal</span>
                        <span>Premium</span>
                      </div>
                    </div>
                  </div>
                </div>

                {insights.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-emerald-900 dark:text-emerald-50">
                      Market Insights
                    </h3>
                    {insights.map((insight, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-black/60 p-3 rounded-lg border border-emerald-100 dark:border-emerald-800/50 flex items-start gap-2"
                      >
                        {index === 0 ? (
                          <DollarSign className="h-4 w-4 text-emerald-600 mt-0.5" />
                        ) : index === 1 ? (
                          <TrendingUp className="h-4 w-4 text-emerald-600 mt-0.5" />
                        ) : (
                          <Check className="h-4 w-4 text-emerald-600 mt-0.5" />
                        )}
                        <span className="text-sm text-emerald-700 dark:text-emerald-300">
                          {insight}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-amber-800 dark:text-amber-300 font-medium">
                    Pricing Tip
                  </h4>
                  <p className="text-amber-700 dark:text-amber-400 text-sm">
                    Our data shows that properties in {location} priced within
                    5% of our AI suggestion rent 2.5x faster than other
                    listings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AIPricingTool;
