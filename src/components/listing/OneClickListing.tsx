import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Upload,
  X,
  Check,
  Camera,
  Plus,
  Building,
  DollarSign,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";

interface OneClickListingProps {
  onSubmit?: (data: any) => void;
}

const OneClickListing: React.FC<OneClickListingProps> = ({
  onSubmit = () => {},
}) => {
  const [photos, setPhotos] = useState<
    { file: File; preview: string; description: string }[]
  >([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  // Template tags for Ethiopian properties
  const templateTags = [
    "Kebele Approved",
    "Gated Compound",
    "Injera Kitchen Ready",
    "Backup Generator",
    "Water Tank",
    "Guard Service",
    "Balcony",
    "Parking",
    "Move-in Ready",
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return;

    setIsUploading(true);

    // Simulate AI processing
    setTimeout(() => {
      const newPhotos = Array.from(e.target.files!).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        description: "",
      }));

      // Generate AI descriptions
      const aiDescriptions = [
        "Sunlit 2BHK with backup generator",
        "Spacious living room with natural light",
        "Modern kitchen with Injera preparation area",
        "Master bedroom with ensuite bathroom",
      ];

      // Assign AI descriptions to photos
      const photosWithDescriptions = newPhotos.map((photo, index) => ({
        ...photo,
        description: aiDescriptions[index % aiDescriptions.length],
      }));

      setPhotos([...photos, ...photosWithDescriptions]);
      setIsUploading(false);

      // Generate AI suggestions for price
      setAiSuggestions([
        "Price this 3BHK at 12,000 ETB/month (15% below Bole average)",
        "Similar properties in this area rent for 15,000-18,000 ETB",
        "2BHK demand up 30% near AAU – consider 9,000 ETB",
      ]);
    }, 1500);
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    URL.revokeObjectURL(newPhotos[index].preview);
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleVerification = () => {
    // Simulate blockchain verification
    setIsVerified(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const listingData = {
      title,
      price,
      location,
      description,
      photos: photos.map((p) => ({
        url: p.preview,
        description: p.description,
      })),
      tags: selectedTags,
      isVerified,
      transactionId: isVerified
        ? "0x" + Math.random().toString(16).slice(2, 10)
        : null,
      createdAt: new Date().toISOString(),
    };

    onSubmit(listingData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-white dark:bg-black/40 shadow-lg dark:shadow-[0_0_30px_rgba(16,185,129,0.1)]">
          <CardHeader>
            <CardTitle className="text-2xl font-playfair text-emerald-900 dark:text-emerald-50 flex items-center">
              <Building className="mr-2 h-5 w-5 text-emerald-600" />
              One-Click Listing Creation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Photo Upload Section */}
              <div className="space-y-4">
                <Label className="text-lg font-medium text-emerald-800 dark:text-emerald-200">
                  Upload Property Photos
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {photos.map((photo, index) => (
                    <div
                      key={index}
                      className="relative group rounded-lg overflow-hidden"
                    >
                      <img
                        src={photo.preview}
                        alt={`Property ${index + 1}`}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="self-end bg-red-500 text-white p-1 rounded-full"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <div className="bg-emerald-900/80 p-2 rounded text-white text-sm">
                          <p>{photo.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Label
                    htmlFor="photo-upload"
                    className="border-2 border-dashed border-emerald-300 dark:border-emerald-700 rounded-lg h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                  >
                    {isUploading ? (
                      <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500 mb-2"></div>
                        <span className="text-emerald-600 dark:text-emerald-400">
                          Processing...
                        </span>
                      </div>
                    ) : (
                      <>
                        <Camera className="h-10 w-10 text-emerald-500 mb-2" />
                        <span className="text-emerald-600 dark:text-emerald-400">
                          Add Photos
                        </span>
                        <span className="text-emerald-500/70 dark:text-emerald-500/50 text-xs mt-1">
                          AI will generate descriptions
                        </span>
                      </>
                    )}
                    <Input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handlePhotoUpload}
                      disabled={isUploading}
                    />
                  </Label>
                </div>
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="title"
                      className="text-emerald-800 dark:text-emerald-200"
                    >
                      Property Title
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                        <Building className="h-4 w-4" />
                      </div>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., Modern 2BHK in Bole"
                        className="pl-10 bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="price"
                      className="text-emerald-800 dark:text-emerald-200"
                    >
                      Price (ETB)
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                        <DollarSign className="h-4 w-4" />
                      </div>
                      <Input
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="e.g., 12000"
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
                        placeholder="e.g., Bole, Addis Ababa"
                        className="pl-10 bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="description"
                      className="text-emerald-800 dark:text-emerald-200"
                    >
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your property..."
                      className="min-h-[120px] bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800"
                    />
                  </div>

                  {/* AI Price Suggestions */}
                  {aiSuggestions.length > 0 && (
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg border border-emerald-100 dark:border-emerald-800/50">
                      <h4 className="text-sm font-medium text-emerald-800 dark:text-emerald-200 mb-2">
                        AI Pricing Suggestions:
                      </h4>
                      <ul className="space-y-2">
                        {aiSuggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            className="text-xs text-emerald-700 dark:text-emerald-300 flex items-start gap-2 cursor-pointer hover:bg-emerald-100/50 dark:hover:bg-emerald-800/30 p-1 rounded"
                            onClick={() =>
                              setPrice(
                                suggestion
                                  .match(/\d+,?\d*/)?.[0]
                                  ?.replace(",", "") || "",
                              )
                            }
                          >
                            <DollarSign className="h-3 w-3 mt-0.5 flex-shrink-0" />
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Template Tags */}
              <div className="space-y-4">
                <Label className="text-lg font-medium text-emerald-800 dark:text-emerald-200">
                  Property Features
                </Label>
                <div className="flex flex-wrap gap-2">
                  {templateTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={
                        selectedTags.includes(tag) ? "default" : "outline"
                      }
                      className={`cursor-pointer ${selectedTags.includes(tag) ? "bg-emerald-600 hover:bg-emerald-700" : "hover:bg-emerald-100 dark:hover:bg-emerald-900/30"}`}
                      onClick={() => toggleTag(tag)}
                    >
                      {selectedTags.includes(tag) && (
                        <Check className="h-3 w-3 mr-1" />
                      )}
                      {tag}
                    </Badge>
                  ))}
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900/30 border-dashed"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Custom
                  </Badge>
                </div>
              </div>

              {/* Blockchain Verification */}
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800/50">
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-100 dark:bg-emerald-800/50 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-emerald-600 dark:text-emerald-400"
                    >
                      <rect
                        x="2"
                        y="7"
                        width="20"
                        height="14"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-emerald-800 dark:text-emerald-200 font-medium">
                      Blockchain Verification
                    </h3>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-3">
                      Upload your Kebele ID or rental agreement to verify your
                      listing on the Solana blockchain
                    </p>
                    {isVerified ? (
                      <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm">
                        <Check className="h-4 w-4 mr-1" />
                        Verified on chain - Transaction ID: 0x
                        {Math.random().toString(16).slice(2, 10)}
                      </div>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
                        onClick={handleVerification}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Document
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white transition-all duration-300 shadow-md hover:shadow-lg dark:shadow-emerald-900/20 dark:hover:shadow-emerald-900/40"
                >
                  Create Listing
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OneClickListing;
