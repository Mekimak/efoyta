import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Upload, X, Plus, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface PropertyFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialData?: any;
}

const PropertyForm = ({
  onSuccess,
  onCancel,
  initialData,
}: PropertyFormProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>(
    initialData?.features || [],
  );
  const [newFeature, setNewFeature] = useState("");

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    location: initialData?.location || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    zip_code: initialData?.zip_code || "",
    bedrooms: initialData?.bedrooms || "",
    bathrooms: initialData?.bathrooms || "",
    square_feet: initialData?.square_feet || "",
    year_built: initialData?.year_built || "",
    property_type: initialData?.property_type || "villa",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length || !user) return;

    setUploadingImages(true);
    setError(null);

    try {
      const newImages = [];
      const newPreviewImages = [];

      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        const fileExt = file.name.split(".").pop();
        const filePath = `${user.id}/${Date.now()}-${i}.${fileExt}`;

        // Create a preview URL
        const previewUrl = URL.createObjectURL(file);
        newPreviewImages.push(previewUrl);

        // Check if bucket exists and create it if not
        const { data: buckets } = await supabase.storage.listBuckets();
        if (
          !buckets ||
          !buckets.find((bucket) => bucket.name === "property-images")
        ) {
          await supabase.storage.createBucket("property-images", {
            public: true,
          });
        }

        // Upload to Supabase
        const { error: uploadError, data } = await supabase.storage
          .from("property-images")
          .upload(filePath, file, { upsert: true });

        if (uploadError) throw uploadError;

        // Get the public URL
        const { data: publicUrlData } = supabase.storage
          .from("property-images")
          .getPublicUrl(filePath);

        newImages.push(publicUrlData.publicUrl);
      }

      setImages([...images, ...newImages]);
      setPreviewImages([...previewImages, ...newPreviewImages]);
    } catch (err) {
      console.error("Error uploading images:", err);
      setError("Failed to upload images. Please try again.");
    } finally {
      setUploadingImages(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviewImages = [...previewImages];
    if (index < newPreviewImages.length) {
      URL.revokeObjectURL(newPreviewImages[index]);
      newPreviewImages.splice(index, 1);
      setPreviewImages(newPreviewImages);
    }
  };

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...features];
    newFeatures.splice(index, 1);
    setFeatures(newFeatures);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Validate required fields
      const requiredFields = [
        "title",
        "description",
        "price",
        "location",
        "address",
        "city",
        "state",
        "zip_code",
        "bedrooms",
        "bathrooms",
        "square_feet",
      ];

      for (const field of requiredFields) {
        if (!formData[field as keyof typeof formData]) {
          throw new Error(`${field.replace("_", " ")} is required`);
        }
      }

      // Prepare data for submission
      const propertyData = {
        ...formData,
        price: parseFloat(formData.price.toString()),
        bedrooms: parseInt(formData.bedrooms.toString()),
        bathrooms: parseFloat(formData.bathrooms.toString()),
        square_feet: parseInt(formData.square_feet.toString()),
        year_built: formData.year_built
          ? parseInt(formData.year_built.toString())
          : null,
        owner_id: user.id,
        images: images || [],
        features: features || [],
        status: "available",
        views: 0,
        inquiries: 0,
      };

      // Log the data being submitted for debugging
      console.log("Submitting property data:", propertyData);

      let result;

      if (initialData?.id) {
        // Update existing property
        result = await supabase
          .from("properties")
          .update(propertyData)
          .eq("id", initialData.id)
          .select()
          .single();
      } else {
        // Create new property
        result = await supabase
          .from("properties")
          .insert(propertyData)
          .select()
          .single();
      }

      if (result.error) throw result.error;

      // Success
      if (onSuccess) {
        onSuccess();
      } else {
        navigate("/landlord");
      }
    } catch (err) {
      console.error("Error submitting property:", err);
      setError(
        err instanceof Error ? err.message : "Failed to submit property",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-5xl mx-auto bg-white dark:bg-black/40 shadow-lg dark:shadow-[0_0_30px_rgba(16,185,129,0.1)] overflow-auto max-h-[80vh]">
      <CardHeader>
        <CardTitle className="text-2xl font-playfair text-emerald-900 dark:text-emerald-50">
          {initialData ? "Edit Property" : "List a New Property"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-4 rounded-md mb-6">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-emerald-900 dark:text-emerald-50">
              Step 1: Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Property Title*</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Luxury Villa with Ocean View"
                  className="bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="property_type">Property Type*</Label>
                <Select
                  value={formData.property_type}
                  onValueChange={(value) =>
                    handleSelectChange("property_type", value)
                  }
                >
                  <SelectTrigger className="bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="mansion">Mansion</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description*</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Detailed description of the property..."
                className="min-h-[120px] bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (USD)*</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="2500000"
                  className="bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location/Neighborhood*</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Beverly Hills, CA"
                  className="bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-emerald-900 dark:text-emerald-50">
              Step 2: Address
            </h3>

            <div className="space-y-2">
              <Label htmlFor="address">Street Address*</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Luxury Lane"
                className="bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City*</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Beverly Hills"
                  className="bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State*</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="CA"
                  className="bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zip_code">ZIP Code*</Label>
                <Input
                  id="zip_code"
                  name="zip_code"
                  value={formData.zip_code}
                  onChange={handleChange}
                  placeholder="90210"
                  className="bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-emerald-900 dark:text-emerald-50">
              Step 3: Property Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms*</Label>
                <Input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="4"
                  className="bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms*</Label>
                <Input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  step="0.5"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  placeholder="3.5"
                  className="bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="square_feet">Square Feet*</Label>
                <Input
                  id="square_feet"
                  name="square_feet"
                  type="number"
                  value={formData.square_feet}
                  onChange={handleChange}
                  placeholder="3500"
                  className="bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year_built">Year Built</Label>
                <Input
                  id="year_built"
                  name="year_built"
                  type="number"
                  value={formData.year_built}
                  onChange={handleChange}
                  placeholder="2020"
                  className="bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-emerald-900 dark:text-emerald-50">
              Step 4: Features & Images
            </h3>

            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Label htmlFor="newFeature">Add Feature</Label>
                <Input
                  id="newFeature"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="e.g., Swimming Pool"
                  className="bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800"
                />
              </div>
              <Button
                type="button"
                onClick={addFeature}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" /> Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 px-3 py-1 rounded-full flex items-center"
                >
                  <span>{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="ml-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {features.length === 0 && (
                <p className="text-emerald-600 dark:text-emerald-400 text-sm">
                  No features added yet
                </p>
              )}
            </div>

            <div className="flex items-center justify-center w-full">
              <Label
                htmlFor="images"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-emerald-300 dark:border-emerald-700 rounded-lg cursor-pointer bg-emerald-50 dark:bg-emerald-950/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {uploadingImages ? (
                    <>
                      <Loader2 className="h-8 w-8 text-emerald-500 animate-spin mb-2" />
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">
                        Uploading...
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-emerald-500 mb-2" />
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">
                        Click to upload images
                      </p>
                      <p className="text-xs text-emerald-500 dark:text-emerald-500">
                        PNG, JPG, WEBP (Max 5MB each)
                      </p>
                    </>
                  )}
                </div>
                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={uploadingImages}
                />
              </Label>
            </div>

            {(images.length > 0 || previewImages.length > 0) && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 max-h-64 overflow-y-auto">
                {images.map((image, index) => (
                  <div key={`img-${index}`} className="relative group">
                    <img
                      src={image}
                      alt={`Property ${index + 1}`}
                      className="h-32 w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {previewImages.map((preview, index) => (
                  <div key={`preview-${index}`} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="h-32 w-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-sm rounded-lg">
                      Uploading...
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <CardFooter className="px-0 pt-6 flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel || (() => navigate("/landlord"))}
              className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={isSubmitting || uploadingImages}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {initialData ? "Updating..." : "Submitting..."}
                </>
              ) : (
                <>{initialData ? "Update Property" : "List Property"}</>
              )}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default PropertyForm;
