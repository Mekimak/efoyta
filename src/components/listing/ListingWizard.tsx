import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import {
  Building,
  MapPin,
  Home,
  Bed,
  Bath,
  Square,
  DollarSign,
  Calendar,
  Upload,
  Camera,
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  Zap,
  Lightbulb,
  Droplets,
  Shield,
  Utensils,
  Maximize,
  Car,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import AIPhotoEnhancer from "./AIPhotoEnhancer";
import AIPricingTool from "./AIPricingTool";

interface ListingWizardProps {
  onComplete?: (listingData: any) => void;
}

const ListingWizard: React.FC<ListingWizardProps> = ({
  onComplete = () => {},
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [landmark, setLandmark] = useState("");
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [squareMeters, setSquareMeters] = useState(80);
  const [price, setPrice] = useState(12000);
  const [description, setDescription] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [photos, setPhotos] = useState<
    { file: File; preview: string; description: string }[]
  >([]);
  const [enhancedPhotos, setEnhancedPhotos] = useState<
    { original: string; enhanced: string; description: string }[]
  >([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showPhotoEnhancer, setShowPhotoEnhancer] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showPricingTool, setShowPricingTool] = useState(false);
  const [availabilityDates, setAvailabilityDates] = useState({
    start: "",
    end: "",
  });
  const [blockHolidays, setBlockHolidays] = useState(true);

  // Ethiopian subcities
  const subcities = [
    "Bole",
    "Kazanchis",
    "Piassa",
    "Sar Bet",
    "Gerji",
    "CMC",
    "Ayat",
    "Mekanisa",
    "Jemo",
    "Lebu",
  ];

  // Ethiopian landmarks
  const landmarks = [
    "Friendship Mall",
    "Bole International Airport",
    "Meskel Square",
    "National Museum",
    "Addis Ababa University",
    "Merkato",
    "Holy Trinity Cathedral",
    "Entoto Park",
  ];

  // Ethiopian property types
  const propertyTypes = [
    "Villa",
    "Apartment",
    "Studio",
    "1BHK",
    "2BHK",
    "3BHK",
    "4BHK+",
    "G+1",
    "G+2",
    "G+3",
    "G+4",
  ];

  // Ethiopian amenities
  const amenities = [
    {
      id: "generator",
      label: "Backup Generator (ማቲክ)",
      icon: <Zap className="h-4 w-4" />,
    },
    {
      id: "water-tank",
      label: "Water Tank",
      icon: <Droplets className="h-4 w-4" />,
    },
    {
      id: "guard",
      label: "24/7 Guard (ጠባቂ)",
      icon: <Shield className="h-4 w-4" />,
    },
    {
      id: "injera-kitchen",
      label: "Injera Kitchen Ready",
      icon: <Utensils className="h-4 w-4" />,
    },
    {
      id: "balcony",
      label: "Balcony (ባልኮኒ)",
      icon: <Maximize className="h-4 w-4" />,
    },
    { id: "parking", label: "Parking", icon: <Car className="h-4 w-4" /> },
    {
      id: "furnished",
      label: "Fully Furnished",
      icon: <Home className="h-4 w-4" />,
    },
    {
      id: "kebele-approved",
      label: "Kebele Approved",
      icon: <Check className="h-4 w-4" />,
    },
    {
      id: "move-in-ready",
      label: "Move-in Ready",
      icon: <Sparkles className="h-4 w-4" />,
    },
  ];

  // Ethiopian holidays
  const ethiopianHolidays = [
    "Enkutatash (Ethiopian New Year)",
    "Meskel",
    "Timket",
    "Ethiopian Christmas (Genna)",
    "Ethiopian Epiphany",
    "Victory of Adwa",
    "Ethiopian Good Friday",
    "Ethiopian Easter",
    "International Labor Day",
    "Patriots' Victory Day",
    "Downfall of the Derg",
    "Eid al-Fitr",
    "Eid al-Adha",
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return;

    setIsUploading(true);

    // Process each file
    const newPhotos = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      description: "",
    }));

    // Generate AI descriptions
    const aiDescriptions = [
      "Sunlit living room with natural light",
      "Modern kitchen with Injera preparation area",
      "Master bedroom with ensuite bathroom",
      "Spacious balcony with city views",
      "Secure parking area with guard house",
      "Well-maintained garden with shade trees",
    ];

    // Assign AI descriptions to photos
    const photosWithDescriptions = newPhotos.map((photo, index) => ({
      ...photo,
      description: aiDescriptions[index % aiDescriptions.length],
    }));

    setPhotos([...photos, ...photosWithDescriptions]);
    setIsUploading(false);
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    URL.revokeObjectURL(newPhotos[index].preview);
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };

  const handleEnhancePhoto = (index: number) => {
    setCurrentPhotoIndex(index);
    setShowPhotoEnhancer(true);
  };

  const handlePhotoEnhanced = (original: string, enhanced: string) => {
    const updatedEnhancedPhotos = [...enhancedPhotos];
    const existingIndex = enhancedPhotos.findIndex(
      (p) => p.original === original,
    );

    if (existingIndex >= 0) {
      updatedEnhancedPhotos[existingIndex] = {
        ...updatedEnhancedPhotos[existingIndex],
        enhanced,
      };
    } else {
      updatedEnhancedPhotos.push({
        original,
        enhanced,
        description: photos[currentPhotoIndex]?.description || "",
      });
    }

    setEnhancedPhotos(updatedEnhancedPhotos);
    setShowPhotoEnhancer(false);
  };

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId)
        ? prev.filter((id) => id !== amenityId)
        : [...prev, amenityId],
    );
  };

  const handlePriceUpdate = (newPrice: number) => {
    setPrice(newPrice);
    setShowPricingTool(false);
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    // Prepare the final listing data
    const listingData = {
      propertyType,
      location,
      landmark,
      bedrooms,
      bathrooms,
      squareMeters,
      price,
      description,
      amenities: selectedAmenities,
      photos:
        enhancedPhotos.length > 0
          ? enhancedPhotos
          : photos.map((p) => ({
              original: p.preview,
              enhanced: p.preview,
              description: p.description,
            })),
      availability: {
        dates: availabilityDates,
        blockHolidays,
      },
      createdAt: new Date().toISOString(),
    };

    onComplete(listingData);
  };

  // Determine if the current step is complete
  const isStepComplete = () => {
    switch (currentStep) {
      case 1: // Property Type
        return propertyType !== "";
      case 2: // Location
        return location !== "";
      case 3: // Details
        return bedrooms > 0 && bathrooms > 0 && squareMeters > 0;
      case 4: // Amenities
        return true; // Optional
      case 5: // Photos
        return photos.length > 0;
      case 6: // Pricing
        return price > 0;
      case 7: // Availability
        return true; // Optional
      default:
        return false;
    }
  };

  // Render step content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Property Type
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium text-emerald-800 dark:text-emerald-200 mb-4 block">
                What type of property are you listing?
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {propertyTypes.map((type) => (
                  <Button
                    key={type}
                    type="button"
                    variant={propertyType === type ? "default" : "outline"}
                    className={`h-auto py-6 flex flex-col items-center gap-2 ${propertyType === type ? "bg-emerald-600 text-white" : "border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"}`}
                    onClick={() => setPropertyType(type)}
                  >
                    <Home className="h-6 w-6" />
                    <span>{type}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2: // Location
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium text-emerald-800 dark:text-emerald-200 mb-4 block">
                Where is your property located?
              </Label>

              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="subcity"
                    className="text-emerald-800 dark:text-emerald-200"
                  >
                    Subcity/Area
                  </Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800">
                      <SelectValue placeholder="Select subcity" />
                    </SelectTrigger>
                    <SelectContent>
                      {subcities.map((subcity) => (
                        <SelectItem key={subcity} value={subcity}>
                          {subcity}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="landmark"
                    className="text-emerald-800 dark:text-emerald-200"
                  >
                    Nearby Landmark (Optional)
                  </Label>
                  <Select value={landmark} onValueChange={setLandmark}>
                    <SelectTrigger className="bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800">
                      <SelectValue placeholder="Select a landmark" />
                    </SelectTrigger>
                    <SelectContent>
                      {landmarks.map((landmark) => (
                        <SelectItem key={landmark} value={landmark}>
                          {landmark}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="detailed-location"
                    className="text-emerald-800 dark:text-emerald-200"
                  >
                    Detailed Address (Optional)
                  </Label>
                  <Textarea
                    id="detailed-location"
                    placeholder="Provide more specific location details"
                    className="bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800"
                  />
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800/50">
              <h4 className="font-medium text-emerald-800 dark:text-emerald-200 mb-2 flex items-center">
                <Lightbulb className="h-4 w-4 mr-2 text-emerald-600" />
                Location Tip
              </h4>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                Properties with accurate location details receive 40% more
                inquiries. Include nearby landmarks and transportation options
                for best results.
              </p>
            </div>
          </div>
        );

      case 3: // Details
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium text-emerald-800 dark:text-emerald-200 mb-4 block">
                Tell us about your property
              </Label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                    Square Meters
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

              <div>
                <Label
                  htmlFor="description"
                  className="text-emerald-800 dark:text-emerald-200"
                >
                  Property Description
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your property in detail..."
                  className="min-h-[150px] bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800"
                />
              </div>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800/50">
              <h4 className="font-medium text-emerald-800 dark:text-emerald-200 mb-2 flex items-center">
                <Lightbulb className="h-4 w-4 mr-2 text-emerald-600" />
                Description Tip
              </h4>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                Highlight unique features like "newly renovated," "quiet
                neighborhood," or "close to public transportation" to attract
                more potential renters.
              </p>
            </div>
          </div>
        );

      case 4: // Amenities
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium text-emerald-800 dark:text-emerald-200 mb-4 block">
                What amenities does your property offer?
              </Label>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map((amenity) => (
                  <div
                    key={amenity.id}
                    className={`flex items-center space-x-3 p-4 rounded-lg cursor-pointer transition-colors ${selectedAmenities.includes(amenity.id) ? "bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700" : "bg-white dark:bg-black/40 border border-emerald-100 dark:border-emerald-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"}`}
                    onClick={() => toggleAmenity(amenity.id)}
                  >
                    <Checkbox
                      checked={selectedAmenities.includes(amenity.id)}
                      className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-600 dark:text-emerald-400">
                        {amenity.icon}
                      </span>
                      <span className="text-emerald-800 dark:text-emerald-200">
                        {amenity.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 5: // Photos
        return (
          <div className="space-y-6">
            {showPhotoEnhancer ? (
              <AIPhotoEnhancer onEnhance={handlePhotoEnhanced} />
            ) : (
              <>
                <div>
                  <Label className="text-lg font-medium text-emerald-800 dark:text-emerald-200 mb-4 block">
                    Upload property photos
                  </Label>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {photos.map((photo, index) => {
                      const isEnhanced = enhancedPhotos.some(
                        (p) => p.original === photo.preview,
                      );
                      return (
                        <div
                          key={index}
                          className="relative group rounded-lg overflow-hidden border border-emerald-100 dark:border-emerald-800/50"
                        >
                          <img
                            src={
                              enhancedPhotos.find(
                                (p) => p.original === photo.preview,
                              )?.enhanced || photo.preview
                            }
                            alt={`Property ${index + 1}`}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                            <div className="flex justify-end space-x-2">
                              <button
                                type="button"
                                onClick={() => handleEnhancePhoto(index)}
                                className="bg-emerald-600 text-white p-1 rounded-full"
                              >
                                <Sparkles className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => removePhoto(index)}
                                className="bg-red-500 text-white p-1 rounded-full"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="bg-emerald-900/80 p-2 rounded text-white text-sm">
                              <p>{photo.description}</p>
                              {isEnhanced && (
                                <Badge className="mt-1 bg-emerald-600 text-white text-xs">
                                  AI Enhanced
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <Label
                      htmlFor="photo-upload"
                      className="border-2 border-dashed border-emerald-300 dark:border-emerald-700 rounded-lg h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
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

                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800/50">
                  <h4 className="font-medium text-emerald-800 dark:text-emerald-200 mb-2 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2 text-emerald-600" />
                    Photo Tips
                  </h4>
                  <ul className="space-y-2 text-sm text-emerald-700 dark:text-emerald-300">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      Use our AI enhancement tool to improve lighting and colors
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      Include photos of all rooms, especially kitchen and
                      bathrooms
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      Take photos during daylight for best results
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        );

      case 6: // Pricing
        return (
          <div className="space-y-6">
            {showPricingTool ? (
              <AIPricingTool onPriceUpdate={handlePriceUpdate} />
            ) : (
              <>
                <div>
                  <Label className="text-lg font-medium text-emerald-800 dark:text-emerald-200 mb-4 block">
                    Set your price
                  </Label>

                  <div className="space-y-4">
                    <div>
                      <Label
                        htmlFor="price"
                        className="text-emerald-800 dark:text-emerald-200"
                      >
                        Monthly Rent (ETB)
                      </Label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                          <DollarSign className="h-4 w-4" />
                        </div>
                        <Input
                          id="price"
                          type="number"
                          value={price}
                          onChange={(e) =>
                            setPrice(parseInt(e.target.value) || 0)
                          }
                          className="pl-10 bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800 text-lg font-medium"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={() => setShowPricingTool(true)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Use AI Pricing Tool
                    </Button>
                  </div>
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800/50">
                  <h4 className="font-medium text-emerald-800 dark:text-emerald-200 mb-2 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2 text-emerald-600" />
                    Pricing Insights
                  </h4>
                  <ul className="space-y-2 text-sm text-emerald-700 dark:text-emerald-300">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      Similar {propertyType} properties in {location} rent for
                      10,000-15,000 ETB/month
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      Properties with {bedrooms} bedrooms have seen a 5% price
                      increase this month
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      Use our AI Pricing Tool for personalized recommendations
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        );

      case 7: // Availability
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium text-emerald-800 dark:text-emerald-200 mb-4 block">
                When is your property available?
              </Label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label
                    htmlFor="start-date"
                    className="text-emerald-800 dark:text-emerald-200"
                  >
                    Available From
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <Input
                      id="start-date"
                      type="date"
                      value={availabilityDates.start}
                      onChange={(e) =>
                        setAvailabilityDates({
                          ...availabilityDates,
                          start: e.target.value,
                        })
                      }
                      className="pl-10 bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800"
                    />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="end-date"
                    className="text-emerald-800 dark:text-emerald-200"
                  >
                    Available Until (Optional)
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <Input
                      id="end-date"
                      type="date"
                      value={availabilityDates.end}
                      onChange={(e) =>
                        setAvailabilityDates({
                          ...availabilityDates,
                          end: e.target.value,
                        })
                      }
                      className="pl-10 bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="block-holidays"
                    checked={blockHolidays}
                    onCheckedChange={(checked) =>
                      setBlockHolidays(checked === true)
                    }
                    className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                  />
                  <Label
                    htmlFor="block-holidays"
                    className="text-emerald-800 dark:text-emerald-200 cursor-pointer"
                  >
                    Automatically block Ethiopian holidays
                  </Label>
                </div>

                {blockHolidays && (
                  <div className="pl-7">
                    <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-2">
                      The following holidays will be blocked on your calendar:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ethiopianHolidays.slice(0, 5).map((holiday) => (
                        <Badge
                          key={holiday}
                          className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-100"
                        >
                          {holiday}
                        </Badge>
                      ))}
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-100">
                        +{ethiopianHolidays.length - 5} more
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800/50">
              <h4 className="font-medium text-emerald-800 dark:text-emerald-200 mb-2 flex items-center">
                <Lightbulb className="h-4 w-4 mr-2 text-emerald-600" />
                Calendar Tip
              </h4>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                Your calendar will sync with Google Calendar if you connect your
                account. You can update availability anytime from your
                dashboard.
              </p>
            </div>
          </div>
        );

      case 8: // Review & Submit
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium text-emerald-800 dark:text-emerald-200 mb-4 block">
                Review your listing
              </Label>

              <div className="space-y-6">
                <div className="bg-white dark:bg-black/40 rounded-lg border border-emerald-100 dark:border-emerald-800/50 p-4">
                  <h3 className="font-medium text-emerald-900 dark:text-emerald-50 mb-2">
                    {propertyType} in {location}
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">
                        Bedrooms
                      </p>
                      <p className="font-medium text-emerald-900 dark:text-emerald-50">
                        {bedrooms}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">
                        Bathrooms
                      </p>
                      <p className="font-medium text-emerald-900 dark:text-emerald-50">
                        {bathrooms}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">
                        Area
                      </p>
                      <p className="font-medium text-emerald-900 dark:text-emerald-50">
                        {squareMeters} m²
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">
                        Price
                      </p>
                      <p className="font-medium text-emerald-900 dark:text-emerald-50">
                        {price.toLocaleString()} ETB/month
                      </p>
                    </div>
                  </div>

                  {description && (
                    <div className="mb-4">
                      <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-1">
                        Description
                      </p>
                      <p className="text-emerald-800 dark:text-emerald-200">
                        {description}
                      </p>
                    </div>
                  )}

                  {selectedAmenities.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-1">
                        Amenities
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedAmenities.map((amenityId) => {
                          const amenity = amenities.find(
                            (a) => a.id === amenityId,
                          );
                          return amenity ? (
                            <Badge
                              key={amenityId}
                              className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-100 flex items-center gap-1"
                            >
                              {amenity.icon}
                              {amenity.label}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}

                  {photos.length > 0 && (
                    <div>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-1">
                        Photos
                      </p>
                      <div className="grid grid-cols-4 gap-2">
                        {photos.slice(0, 4).map((photo, index) => (
                          <img
                            key={index}
                            src={
                              enhancedPhotos.find(
                                (p) => p.original === photo.preview,
                              )?.enhanced || photo.preview
                            }
                            alt={`Property ${index + 1}`}
                            className="w-full h-20 object-cover rounded"
                          />
                        ))}
                        {photos.length > 4 && (
                          <div className="relative">
                            <img
                              src={photos[4].preview}
                              alt="Property 5"
                              className="w-full h-20 object-cover rounded opacity-50"
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-white font-medium">
                              +{photos.length - 4}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800/50">
                  <h4 className="font-medium text-emerald-800 dark:text-emerald-200 mb-2 flex items-center">
                    <Check className="h-4 w-4 mr-2 text-emerald-600" />
                    Listing Ready
                  </h4>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">
                    Your listing looks great! After submission, it will be
                    reviewed and published within 24 hours. You can edit it
                    anytime from your dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
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
              AI-Driven Listing Wizard
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex justify-between">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center ${index < currentStep ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400 dark:text-gray-600"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${index + 1 === currentStep ? "bg-emerald-600 text-white" : index < currentStep ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400" : "bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600"}`}
                    >
                      {index + 1}
                    </div>
                    <span className="text-xs hidden md:block">
                      {index === 0
                        ? "Type"
                        : index === 1
                          ? "Location"
                          : index === 2
                            ? "Details"
                            : index === 3
                              ? "Amenities"
                              : index === 4
                                ? "Photos"
                                : index === 5
                                  ? "Price"
                                  : index === 6
                                    ? "Calendar"
                                    : "Review"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative mt-2">
                <div className="absolute top-0 left-0 h-1 bg-gray-200 dark:bg-gray-800 w-full rounded"></div>
                <div
                  className="absolute top-0 left-0 h-1 bg-emerald-600 rounded transition-all duration-300"
                  style={{ width: `${((currentStep - 1) / 7) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Step Content */}
            <div className="min-h-[400px]">{renderStepContent()}</div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-4 border-t border-emerald-100 dark:border-emerald-800/50">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                  className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              ) : (
                <div></div>
              )}

              {currentStep < 8 ? (
                <Button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!isStepComplete()}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Submit Listing
                  <Check className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ListingWizard;
