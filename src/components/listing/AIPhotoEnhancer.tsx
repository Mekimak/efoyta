import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Upload,
  Image as ImageIcon,
  SunMedium,
  Contrast,
  Crop,
  RefreshCw,
  Download,
  Undo,
  Redo,
  Trash,
  Check,
  X,
  Maximize,
  Minimize,
  RotateCw,
} from "lucide-react";
import { motion } from "framer-motion";

interface AIPhotoEnhancerProps {
  onEnhance?: (originalImage: string, enhancedImage: string) => void;
}

const AIPhotoEnhancer: React.FC<AIPhotoEnhancerProps> = ({
  onEnhance = () => {},
}) => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState("adjust");
  const [adjustments, setAdjustments] = useState({
    brightness: 0,
    contrast: 0,
    saturation: 0,
    shadows: 0,
    highlights: 0,
  });
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target?.result) {
        const imageUrl = event.target.result as string;
        setOriginalImage(imageUrl);
        setEnhancedImage(imageUrl);

        // Initialize history
        setHistory([imageUrl]);
        setHistoryIndex(0);
      }
    };

    reader.readAsDataURL(file);
  };

  const enhanceImage = () => {
    if (!enhancedImage) return;

    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      // In a real app, this would call an API to enhance the image
      // For demo purposes, we'll just apply a CSS filter to simulate enhancement
      const canvas = document.createElement("canvas");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          // Apply filters based on adjustments
          ctx.filter = `brightness(${1 + adjustments.brightness / 100}) contrast(${1 + adjustments.contrast / 100}) saturate(${1 + adjustments.saturation / 100})`;
          ctx.drawImage(img, 0, 0);

          const enhanced = canvas.toDataURL("image/jpeg");
          setEnhancedImage(enhanced);

          // Add to history
          const newHistory = history.slice(0, historyIndex + 1);
          newHistory.push(enhanced);
          setHistory(newHistory);
          setHistoryIndex(newHistory.length - 1);

          onEnhance(originalImage!, enhanced);
        }

        setIsProcessing(false);
      };

      img.src = enhancedImage;
    }, 1500);
  };

  const handleAdjustmentChange = (
    adjustment: keyof typeof adjustments,
    value: number[],
  ) => {
    setAdjustments((prev) => ({
      ...prev,
      [adjustment]: value[0],
    }));
  };

  const applyAutoEnhance = () => {
    setIsProcessing(true);

    // Simulate AI auto-enhancement
    setTimeout(() => {
      setAdjustments({
        brightness: 10,
        contrast: 15,
        saturation: 5,
        shadows: -5,
        highlights: -10,
      });

      enhanceImage();
    }, 1000);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setEnhancedImage(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setEnhancedImage(history[historyIndex + 1]);
    }
  };

  const handleReset = () => {
    if (originalImage) {
      setEnhancedImage(originalImage);
      setAdjustments({
        brightness: 0,
        contrast: 0,
        saturation: 0,
        shadows: 0,
        highlights: 0,
      });

      // Reset history
      setHistory([originalImage]);
      setHistoryIndex(0);
    }
  };

  const handleDownload = () => {
    if (enhancedImage) {
      const link = document.createElement("a");
      link.href = enhancedImage;
      link.download = "enhanced-property-image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={
        isFullscreen ? "fixed inset-0 z-50 bg-white dark:bg-black p-4" : ""
      }
    >
      <Card className="bg-white dark:bg-black/40 shadow-lg dark:shadow-[0_0_30px_rgba(16,185,129,0.1)]">
        <CardHeader className="pb-2 flex flex-row justify-between items-center">
          <CardTitle className="text-2xl font-playfair text-emerald-900 dark:text-emerald-50 flex items-center">
            <ImageIcon className="mr-2 h-5 w-5 text-emerald-600" />
            AI Photo Enhancer
          </CardTitle>
          {isFullscreen && (
            <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
              <Minimize className="h-5 w-5" />
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {!originalImage ? (
              <div className="border-2 border-dashed border-emerald-200 dark:border-emerald-800/50 rounded-lg p-12">
                <div className="flex flex-col items-center justify-center text-center">
                  <ImageIcon className="h-16 w-16 text-emerald-500 mb-4" />
                  <h3 className="text-lg font-medium text-emerald-800 dark:text-emerald-200 mb-2">
                    Upload Property Photos
                  </h3>
                  <p className="text-emerald-600 dark:text-emerald-400 mb-6 max-w-md">
                    Our AI will automatically enhance your property photos by
                    improving lighting, colors, and clarity
                  </p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photos
                  </Button>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Image Preview */}
                  <div className="flex-1 space-y-4">
                    <div className="relative overflow-hidden rounded-lg border border-emerald-100 dark:border-emerald-800/50 bg-gray-50 dark:bg-gray-900">
                      {isProcessing && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                          <div className="flex flex-col items-center">
                            <RefreshCw className="h-8 w-8 text-white animate-spin mb-2" />
                            <p className="text-white">Enhancing image...</p>
                          </div>
                        </div>
                      )}
                      <div className="relative">
                        <img
                          src={enhancedImage || originalImage}
                          alt="Property"
                          className="w-full h-auto"
                        />
                        {!isFullscreen && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-black/90 rounded-full"
                            onClick={toggleFullscreen}
                          >
                            <Maximize className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Image Controls */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleUndo}
                        disabled={historyIndex <= 0}
                        className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
                      >
                        <Undo className="h-4 w-4 mr-1" /> Undo
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRedo}
                        disabled={historyIndex >= history.length - 1}
                        className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
                      >
                        <Redo className="h-4 w-4 mr-1" /> Redo
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                        className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
                      >
                        <X className="h-4 w-4 mr-1" /> Reset
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={applyAutoEnhance}
                        className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
                      >
                        <SunMedium className="h-4 w-4 mr-1" /> Auto Enhance
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownload}
                        className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
                      >
                        <Download className="h-4 w-4 mr-1" /> Download
                      </Button>
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white ml-auto"
                      >
                        <Upload className="h-4 w-4 mr-1" /> New Photo
                      </Button>
                    </div>
                  </div>

                  {/* Adjustment Controls */}
                  <div className="w-full md:w-80 space-y-4">
                    <Tabs
                      defaultValue={activeTab}
                      onValueChange={setActiveTab}
                      className="w-full"
                    >
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger
                          value="adjust"
                          className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
                        >
                          Adjust
                        </TabsTrigger>
                        <TabsTrigger
                          value="crop"
                          className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
                        >
                          Crop & Rotate
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="adjust" className="space-y-4 pt-4">
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label className="text-emerald-800 dark:text-emerald-200">
                                Brightness
                              </Label>
                              <span className="text-xs text-emerald-600 dark:text-emerald-400">
                                {adjustments.brightness}%
                              </span>
                            </div>
                            <Slider
                              value={[adjustments.brightness]}
                              min={-50}
                              max={50}
                              step={1}
                              onValueChange={(value) =>
                                handleAdjustmentChange("brightness", value)
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label className="text-emerald-800 dark:text-emerald-200">
                                Contrast
                              </Label>
                              <span className="text-xs text-emerald-600 dark:text-emerald-400">
                                {adjustments.contrast}%
                              </span>
                            </div>
                            <Slider
                              value={[adjustments.contrast]}
                              min={-50}
                              max={50}
                              step={1}
                              onValueChange={(value) =>
                                handleAdjustmentChange("contrast", value)
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label className="text-emerald-800 dark:text-emerald-200">
                                Saturation
                              </Label>
                              <span className="text-xs text-emerald-600 dark:text-emerald-400">
                                {adjustments.saturation}%
                              </span>
                            </div>
                            <Slider
                              value={[adjustments.saturation]}
                              min={-50}
                              max={50}
                              step={1}
                              onValueChange={(value) =>
                                handleAdjustmentChange("saturation", value)
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label className="text-emerald-800 dark:text-emerald-200">
                                Shadows
                              </Label>
                              <span className="text-xs text-emerald-600 dark:text-emerald-400">
                                {adjustments.shadows}%
                              </span>
                            </div>
                            <Slider
                              value={[adjustments.shadows]}
                              min={-50}
                              max={50}
                              step={1}
                              onValueChange={(value) =>
                                handleAdjustmentChange("shadows", value)
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label className="text-emerald-800 dark:text-emerald-200">
                                Highlights
                              </Label>
                              <span className="text-xs text-emerald-600 dark:text-emerald-400">
                                {adjustments.highlights}%
                              </span>
                            </div>
                            <Slider
                              value={[adjustments.highlights]}
                              min={-50}
                              max={50}
                              step={1}
                              onValueChange={(value) =>
                                handleAdjustmentChange("highlights", value)
                              }
                            />
                          </div>
                        </div>

                        <Button
                          onClick={enhanceImage}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              Apply Changes
                            </>
                          )}
                        </Button>
                      </TabsContent>

                      <TabsContent value="crop" className="space-y-4 pt-4">
                        <div className="space-y-4">
                          <div className="flex justify-center gap-2">
                            <Button
                              variant="outline"
                              className="flex-1 border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
                            >
                              <Crop className="h-4 w-4 mr-1" /> 1:1
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
                            >
                              <Crop className="h-4 w-4 mr-1" /> 4:3
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
                            >
                              <Crop className="h-4 w-4 mr-1" /> 16:9
                            </Button>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-emerald-800 dark:text-emerald-200">
                              Rotation
                            </Label>
                            <div className="flex justify-center gap-2">
                              <Button
                                variant="outline"
                                className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
                              >
                                <RotateCw className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <p className="text-sm text-emerald-600 dark:text-emerald-400 italic">
                            Note: In this demo, crop and rotate functionality is
                            simulated. In a real application, these would be
                            fully functional.
                          </p>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800/50">
                      <h4 className="font-medium text-emerald-800 dark:text-emerald-200 mb-2 flex items-center">
                        <SunMedium className="h-4 w-4 mr-2 text-emerald-600" />
                        AI Enhancement Tips
                      </h4>
                      <ul className="space-y-2 text-sm text-emerald-700 dark:text-emerald-300">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold">•</span>
                          Use natural lighting when possible for best results
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold">•</span>
                          Our AI works best with high-resolution images
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold">•</span>
                          Try the "Auto Enhance" feature for quick improvements
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-emerald-100 dark:border-emerald-800/50">
                  <div>
                    <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-100">
                      AI Enhanced
                    </Badge>
                  </div>
                  <Button
                    onClick={() => {
                      if (enhancedImage && originalImage) {
                        onEnhance(originalImage, enhancedImage);
                      }
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Save & Continue
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AIPhotoEnhancer;
