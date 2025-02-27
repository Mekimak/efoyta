import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import PropertyCard from "@/components/PropertyCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, MapPin, Home, DollarSign } from "lucide-react";

const Properties = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    location: "",
    propertyType: "",
    minPrice: 0,
    maxPrice: 10000000,
    bedrooms: "",
    bathrooms: "",
    amenities: [] as string[],
    keywords: "",
    sortBy: "relevance",
  });

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handlePriceChange = (value: number[]) => {
    setSearchParams({
      ...searchParams,
      minPrice: value[0],
      maxPrice: value[1] || 10000000,
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search with params:", searchParams);
    // Implement search functionality
  };

  // Sample properties data
  const properties = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=80",
      title: "Luxury Villa with Ocean View",
      price: "$2,500,000",
      location: "Beverly Hills, CA",
      beds: 5,
      baths: 4,
      sqft: 4500,
      type: "villa",
      rating: 4.9,
      views: 1250,
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80",
      title: "Modern Mansion Estate",
      price: "$5,900,000",
      location: "Bel Air, CA",
      beds: 7,
      baths: 8,
      sqft: 8200,
      type: "mansion",
      rating: 4.8,
      views: 980,
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
      title: "Contemporary Beachfront Villa",
      price: "$4,200,000",
      location: "Malibu, CA",
      beds: 4,
      baths: 5,
      sqft: 3800,
      type: "villa",
      rating: 4.7,
      views: 1500,
    },
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop&q=80",
      title: "Elegant Penthouse Suite",
      price: "$3,800,000",
      location: "Downtown LA, CA",
      beds: 3,
      baths: 3.5,
      sqft: 3200,
      type: "penthouse",
      rating: 4.9,
      views: 1100,
    },
    {
      id: "5",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=80",
      title: "Mediterranean Estate",
      price: "$7,200,000",
      location: "Pacific Palisades, CA",
      beds: 6,
      baths: 7,
      sqft: 7500,
      type: "estate",
      rating: 4.8,
      views: 950,
    },
    {
      id: "6",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      title: "Modernist Glass Mansion",
      price: "$8,500,000",
      location: "Hollywood Hills, CA",
      beds: 5,
      baths: 6,
      sqft: 6800,
      type: "mansion",
      rating: 4.7,
      views: 1300,
    },
  ];

  // Common amenities for filtering
  const commonAmenities = [
    { id: "pool", label: "Swimming Pool" },
    { id: "gym", label: "Gym" },
    { id: "spa", label: "Spa" },
    { id: "garden", label: "Garden" },
    { id: "garage", label: "Garage" },
    { id: "security", label: "Security System" },
    { id: "waterfront", label: "Waterfront" },
    { id: "view", label: "Panoramic View" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header isDarkMode={isDarkMode} onDarkModeToggle={handleDarkModeToggle} />

      <main className="pt-20">
        {/* Search Section */}
        <section className="py-12 bg-emerald-50 dark:bg-emerald-950/20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-8">
              <h1 className="text-4xl font-playfair text-emerald-900 dark:text-emerald-50 mb-4">
                Luxury Properties
              </h1>
              <p className="text-emerald-700 dark:text-emerald-300">
                Discover our exclusive collection of luxury properties
              </p>
            </div>

            <form onSubmit={handleSearch}>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-5 w-5" />
                  <Input
                    name="location"
                    value={searchParams.location}
                    onChange={handleInputChange}
                    placeholder="Enter location, neighborhood, or zip code"
                    className="pl-10 bg-white dark:bg-black border-emerald-100 dark:border-emerald-800 focus-visible:ring-emerald-500"
                  />
                </div>

                <div className="w-full md:w-48">
                  <Select
                    value={searchParams.propertyType}
                    onValueChange={(value) =>
                      handleSelectChange("propertyType", value)
                    }
                  >
                    <SelectTrigger className="bg-white dark:bg-black border-emerald-100 dark:border-emerald-800">
                      <SelectValue placeholder="Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="mansion">Mansion</SelectItem>
                      <SelectItem value="penthouse">Penthouse</SelectItem>
                      <SelectItem value="estate">Estate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="md:w-auto border-emerald-100 dark:border-emerald-800"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>

                <Button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>

              {isFilterOpen && (
                <div className="mt-4 pt-4 border-t border-emerald-100 dark:border-emerald-800">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label>Price Range</Label>
                      <div className="pt-6 px-2">
                        <Slider
                          defaultValue={[
                            searchParams.minPrice,
                            searchParams.maxPrice,
                          ]}
                          max={10000000}
                          step={100000}
                          onValueChange={handlePriceChange}
                          className="w-full"
                        />
                      </div>
                      <div className="flex justify-between text-sm text-emerald-600 dark:text-emerald-400">
                        <span>${searchParams.minPrice.toLocaleString()}</span>
                        <span>${searchParams.maxPrice.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Bedrooms</Label>
                      <Select
                        value={searchParams.bedrooms}
                        onValueChange={(value) =>
                          handleSelectChange("bedrooms", value)
                        }
                      >
                        <SelectTrigger className="bg-white dark:bg-black border-emerald-100 dark:border-emerald-800">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any</SelectItem>
                          <SelectItem value="1">1+</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                          <SelectItem value="5">5+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Bathrooms</Label>
                      <Select
                        value={searchParams.bathrooms}
                        onValueChange={(value) =>
                          handleSelectChange("bathrooms", value)
                        }
                      >
                        <SelectTrigger className="bg-white dark:bg-black border-emerald-100 dark:border-emerald-800">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any</SelectItem>
                          <SelectItem value="1">1+</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                          <SelectItem value="5">5+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <Label>Keywords</Label>
                    <Input
                      name="keywords"
                      value={searchParams.keywords}
                      onChange={handleInputChange}
                      placeholder="e.g., modern, pool, view"
                      className="bg-white dark:bg-black border-emerald-100 dark:border-emerald-800"
                    />
                  </div>

                  <div className="space-y-2 mb-4">
                    <Label>Amenities</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {commonAmenities.map((amenity) => (
                        <div
                          key={amenity.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={amenity.id} />
                          <label
                            htmlFor={amenity.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-emerald-700 dark:text-emerald-300"
                          >
                            {amenity.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="space-y-2">
                      <Label>Sort By</Label>
                      <Select
                        value={searchParams.sortBy}
                        onValueChange={(value) =>
                          handleSelectChange("sortBy", value)
                        }
                      >
                        <SelectTrigger className="w-[180px] bg-white dark:bg-black border-emerald-100 dark:border-emerald-800">
                          <SelectValue placeholder="Relevance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relevance">Relevance</SelectItem>
                          <SelectItem value="price_low">
                            Price: Low to High
                          </SelectItem>
                          <SelectItem value="price_high">
                            Price: High to Low
                          </SelectItem>
                          <SelectItem value="date">Newest First</SelectItem>
                          <SelectItem value="rating">Highest Rated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-playfair text-emerald-900 dark:text-emerald-50">
                  {properties.length} Properties Found
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="border-emerald-100 dark:border-emerald-800"
                >
                  <Home className="h-4 w-4 mr-2" /> Save Search
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <PropertyCard
                    image={property.image}
                    title={property.title}
                    price={property.price}
                    location={property.location}
                    beds={property.beds}
                    baths={property.baths}
                    sqft={property.sqft}
                    type={property.type}
                    rating={property.rating}
                    views={property.views}
                  />
                </motion.div>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Button
                variant="outline"
                className="border-emerald-100 dark:border-emerald-800"
              >
                Load More Properties
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Properties;
