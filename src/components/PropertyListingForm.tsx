import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card, CardContent } from "./ui/card";
import { Upload, MapPin, Plus, X } from "lucide-react";
import { motion } from "framer-motion";

interface PropertyListingFormProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

const PropertyListingForm = ({
  onSubmit = () => {},
  onCancel = () => {},
}: PropertyListingFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    propertyType: "house",
    category: "sale",
    bedrooms: "",
    bathrooms: "",
    squareFeet: "",
    yearBuilt: "",
    amenities: [] as string[],
    images: [] as string[],
  });

  const [amenity, setAmenity] = useState("");
  const [mapVisible, setMapVisible] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const addAmenity = () => {
    if (amenity.trim() !== "") {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, amenity.trim()],
      });
      setAmenity("");
    }
  };

  const removeAmenity = (index: number) => {
    const updatedAmenities = [...formData.amenities];
    updatedAmenities.splice(index, 1);
    setFormData({ ...formData, amenities: updatedAmenities });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const imageUrls = filesArray.map((file) => URL.createObjectURL(file));
      setFormData({ ...formData, images: [...formData.images, ...imageUrls] });
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, images: updatedImages });
  };

  const toggleMap = () => {
    setMapVisible(!mapVisible);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-playfair text-emerald-800 dark:text-emerald-50">
            Basic Information
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Property Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Luxury Villa with Ocean View"
                className="bg-white/50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-800"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your property in detail..."
                className="min-h-[150px] bg-white/50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-800"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="propertyType">Property Type</Label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) =>
                    handleSelectChange("propertyType", value)
                  }
                >
                  <SelectTrigger className="bg-white/50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-800">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="mansion">Mansion</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleSelectChange("category", value)
                  }
                >
                  <SelectTrigger className="bg-white/50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-800">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">For Sale</SelectItem>
                    <SelectItem value="rent">For Rent</SelectItem>
                    <SelectItem value="lease">For Lease</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="1,000,000"
                className="bg-white/50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-800"
                required
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-6">
          <h3 className="text-xl font-playfair text-emerald-800 dark:text-emerald-50">
            Location
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Luxury Lane"
                className="bg-white/50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-800"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Beverly Hills"
                  className="bg-white/50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-800"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="CA"
                  className="bg-white/50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-800"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="90210"
                  className="bg-white/50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-800"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={toggleMap}
                className="flex items-center gap-2 border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900"
              >
                <MapPin className="h-4 w-4" />
                {mapVisible ? "Hide Map" : "Show Map"}
              </Button>

              {mapVisible && (
                <div className="mt-4 rounded-lg overflow-hidden h-[300px] bg-gray-100 dark:bg-gray-800">
                  <iframe
                    title="Google Maps"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
                      `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
                    )}`}
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="space-y-6">
        <h3 className="text-xl font-playfair text-emerald-800 dark:text-emerald-50">
          Property Details
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input
              id="bedrooms"
              name="bedrooms"
              type="number"
              value={formData.bedrooms}
              onChange={handleChange}
              placeholder="4"
              className="bg-white/50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-800"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input
              id="bathrooms"
              name="bathrooms"
              type="number"
              value={formData.bathrooms}
              onChange={handleChange}
              placeholder="3"
              className="bg-white/50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-800"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="squareFeet">Square Feet</Label>
            <Input
              id="squareFeet"
              name="squareFeet"
              type="number"
              value={formData.squareFeet}
              onChange={handleChange}
              placeholder="2500"
              className="bg-white/50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-800"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="yearBuilt">Year Built</Label>
            <Input
              id="yearBuilt"
              name="yearBuilt"
              type="number"
              value={formData.yearBuilt}
              onChange={handleChange}
              placeholder="2020"
              className="bg-white/50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-800"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Amenities</Label>
          <div className="flex items-center gap-2">
            <Input
              value={amenity}
              onChange={(e) => setAmenity(e.target.value)}
              placeholder="Add amenity (e.g., Swimming Pool)"
              className="bg-white/50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-800"
            />
            <Button
              type="button"
              onClick={addAmenity}
              variant="outline"
              className="flex-shrink-0 border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {formData.amenities.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-1 px-3 py-1 bg-emerald-100 dark:bg-emerald-800 rounded-full text-sm text-emerald-700 dark:text-emerald-200"
              >
                {item}
                <button
                  type="button"
                  onClick={() => removeAmenity(index)}
                  className="ml-1 text-emerald-500 hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-100"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="space-y-6">
        <h3 className="text-xl font-playfair text-emerald-800 dark:text-emerald-50">
          Property Images
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-emerald-500 dark:text-emerald-400" />
                <p className="mb-2 text-sm text-emerald-700 dark:text-emerald-300">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-emerald-500 dark:text-emerald-400">
                  PNG, JPG or WEBP (MAX. 5MB each)
                </p>
              </div>
              <input
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {formData.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Property ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-white/80 dark:bg-black/80 rounded-full text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex justify-end gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900"
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
  );
};

export default PropertyListingForm;
