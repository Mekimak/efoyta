import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  MapPin,
  Home,
  Building,
  Filter,
  Star,
  Heart,
  ChevronRight,
  Info,
  MessageSquare,
  Calendar,
  Upload,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import PropertyCard from "@/components/PropertyCard";
import StatsSection from "@/components/StatsSection";
import { Checkbox } from "@/components/ui/checkbox";

const RentalHomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchParams, setSearchParams] = useState({
    location: "",
    propertyType: "",
    minPrice: 0,
    maxPrice: 10000,
    bedrooms: "",
    bathrooms: "",
    amenities: [] as string[],
    keywords: "",
    sortBy: "relevance",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedSearches, setSavedSearches] = useState(false);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search with params:", searchParams);
    // Implement search functionality
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
      maxPrice: value[1] || 10000,
    });
  };

  const handleSaveSearch = () => {
    setSavedSearches(true);
    // In a real app, you would save this to the user's profile
    console.log("Saved search criteria:", searchParams);
  };

  // Common amenities for filtering
  const commonAmenities = [
    { id: "pet-friendly", label: "Pet Friendly" },
    { id: "parking", label: "Parking" },
    { id: "laundry", label: "Laundry" },
    { id: "balcony", label: "Balcony" },
    { id: "ac", label: "Air Conditioning" },
    { id: "furnished", label: "Furnished" },
    { id: "gym", label: "Gym" },
    { id: "pool", label: "Pool" },
  ];

  // Sample featured properties
  const featuredProperties = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=60",
      title: "Modern Apartment with City View",
      price: "$1,200/month",
      location: "Downtown, New York",
      beds: 2,
      baths: 1,
      sqft: 850,
      type: "apartment",
      rating: 4.8,
      views: 1250,
      blurred: !isLoggedIn,
      amenities: ["Pet Friendly", "Parking", "Laundry", "Air Conditioning"],
      securityDeposit: "$1,200",
      leaseTerms: "12 months",
      applicationFee: "$50",
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60",
      title: "Spacious Family Home",
      price: "$2,500/month",
      location: "Suburbia, Chicago",
      beds: 4,
      baths: 3,
      sqft: 2200,
      type: "house",
      rating: 4.7,
      views: 980,
      blurred: !isLoggedIn,
      amenities: [
        "Parking",
        "Laundry",
        "Balcony",
        "Air Conditioning",
        "Furnished",
      ],
      securityDeposit: "$2,500",
      leaseTerms: "12-24 months",
      applicationFee: "$75",
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=60",
      title: "Cozy Studio in Historic District",
      price: "$950/month",
      location: "Old Town, Boston",
      beds: 1,
      baths: 1,
      sqft: 550,
      type: "studio",
      rating: 4.5,
      views: 1500,
      blurred: !isLoggedIn,
      amenities: ["Pet Friendly", "Laundry", "Furnished"],
      securityDeposit: "$950",
      leaseTerms: "6-12 months",
      applicationFee: "$35",
    },
  ];

  // Sample neighborhood data
  const neighborhoods = [
    {
      name: "Downtown",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&auto=format&fit=crop&q=60",
      properties: 120,
      rating: 4.8,
    },
    {
      name: "Suburbia",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=60",
      properties: 85,
      rating: 4.6,
    },
    {
      name: "Riverside",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=60",
      properties: 64,
      rating: 4.7,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header isDarkMode={isDarkMode} onDarkModeToggle={handleDarkModeToggle} />

      {/* Hero Section with Search */}
      <section className="relative w-full h-[600px] bg-gradient-to-br from-white to-emerald-50 dark:from-black dark:to-emerald-950/20 overflow-hidden dark:shadow-[0_0_100px_20px_rgba(16,185,129,0.1)_inset] dark:border-b dark:border-emerald-900/20">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-200 dark:bg-emerald-600/30 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute -left-20 top-40 w-96 h-96 bg-emerald-300 dark:bg-emerald-500/30 rounded-full blur-3xl"
          />
        </div>

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair text-emerald-950 dark:text-white mb-6 drop-shadow-sm">
              Find Your Home
            </h1>
            <p className="text-xl md:text-2xl text-emerald-800/80 dark:text-emerald-100/80 mb-12 max-w-3xl mx-auto font-montserrat">
              Discover the perfect rental property for your lifestyle
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-4xl mx-auto"
          >
            <Card className="bg-white/90 dark:bg-black/60 backdrop-blur-md shadow-lg p-6 rounded-xl">
              <form onSubmit={handleSearch}>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-5 w-5" />
                      <Input
                        name="location"
                        value={searchParams.location}
                        onChange={handleInputChange}
                        placeholder="Enter location, neighborhood, or zip code"
                        className="pl-10 bg-transparent border-emerald-100 dark:border-emerald-800 focus-visible:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="w-full md:w-48">
                    <Select
                      value={searchParams.propertyType}
                      onValueChange={(value) =>
                        handleSelectChange("propertyType", value)
                      }
                    >
                      <SelectTrigger className="bg-transparent border-emerald-100 dark:border-emerald-800">
                        <SelectValue placeholder="Property Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
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
                            max={10000}
                            step={100}
                            onValueChange={handlePriceChange}
                            className="w-full"
                          />
                        </div>
                        <div className="flex justify-between text-sm text-emerald-600 dark:text-emerald-400">
                          <span>${searchParams.minPrice}</span>
                          <span>${searchParams.maxPrice}</span>
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
                          <SelectTrigger className="bg-transparent border-emerald-100 dark:border-emerald-800">
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
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
                          <SelectTrigger className="bg-transparent border-emerald-100 dark:border-emerald-800">
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1+</SelectItem>
                            <SelectItem value="2">2+</SelectItem>
                            <SelectItem value="3">3+</SelectItem>
                            <SelectItem value="4">4+</SelectItem>
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
                        placeholder="e.g., modern, quiet, near subway"
                        className="bg-transparent border-emerald-100 dark:border-emerald-800"
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
                          <SelectTrigger className="w-[180px] bg-transparent border-emerald-100 dark:border-emerald-800">
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
                            <SelectItem value="rating">
                              Highest Rated
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleSaveSearch}
                        className="border-emerald-100 dark:border-emerald-800"
                      >
                        {savedSearches ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-500" />
                            Search Saved
                          </>
                        ) : (
                          <>Save This Search</>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection
        stats={[
          { value: "10,000+", label: "Rental Properties" },
          { value: "98%", label: "Client Satisfaction" },
          { value: "24/7", label: "Customer Support" },
          { value: "50+", label: "Cities Covered" },
        ]}
      />

      {/* Featured Properties Section */}
      <section className="py-16 bg-emerald-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-playfair text-emerald-900 dark:text-emerald-50 mb-2">
                Featured Rentals
              </h2>
              <p className="text-emerald-600 dark:text-emerald-400">
                Handpicked properties for your consideration
              </p>
            </div>
            <Button
              variant="ghost"
              className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
            >
              View All
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <div key={property.id} className="relative">
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
                {property.blurred && (
                  <div className="absolute inset-0 backdrop-blur-md flex flex-col items-center justify-center bg-black/30 rounded-lg">
                    <p className="text-white text-xl mb-4 font-semibold">
                      Sign In to Reveal
                    </p>
                    <Link to="/login">
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                        Sign In
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair text-emerald-900 dark:text-emerald-50 mb-2">
              How It Works
            </h2>
            <p className="text-emerald-600 dark:text-emerald-400 max-w-2xl mx-auto">
              Finding your perfect rental home is easy with our simple process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="bg-white/80 dark:bg-black/40 backdrop-blur-sm border-none shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-playfair text-emerald-900 dark:text-emerald-50 mb-2">
                  Search Properties
                </h3>
                <p className="text-emerald-600 dark:text-emerald-400">
                  Use our advanced filters to find properties that match your
                  exact requirements
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-black/40 backdrop-blur-sm border-none shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-playfair text-emerald-900 dark:text-emerald-50 mb-2">
                  Contact Landlords
                </h3>
                <p className="text-emerald-600 dark:text-emerald-400">
                  Message property owners directly through our secure messaging
                  system
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-black/40 backdrop-blur-sm border-none shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-playfair text-emerald-900 dark:text-emerald-50 mb-2">
                  Schedule Viewings
                </h3>
                <p className="text-emerald-600 dark:text-emerald-400">
                  Book property viewings directly through our platform at times
                  that suit you
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-black/40 backdrop-blur-sm border-none shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-playfair text-emerald-900 dark:text-emerald-50 mb-2">
                  Apply Online
                </h3>
                <p className="text-emerald-600 dark:text-emerald-400">
                  Complete applications and upload documents securely through
                  our platform
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Neighborhoods Section */}
      <section className="py-16 bg-emerald-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair text-emerald-900 dark:text-emerald-50 mb-2">
              Popular Neighborhoods
            </h2>
            <p className="text-emerald-600 dark:text-emerald-400 max-w-2xl mx-auto">
              Explore the most sought-after neighborhoods with great amenities
              and convenient locations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {neighborhoods.map((neighborhood, index) => (
              <motion.div
                key={neighborhood.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-xl">
                  <img
                    src={neighborhood.image}
                    alt={neighborhood.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-playfair text-white mb-1">
                    {neighborhood.name}
                  </h3>
                  <div className="flex items-center text-emerald-300 mb-2">
                    <Star className="h-4 w-4 mr-1 fill-emerald-300" />
                    <span>{neighborhood.rating}</span>
                  </div>
                  <p className="text-white/80">
                    {neighborhood.properties} Properties
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-emerald-900 dark:bg-emerald-900/50 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-playfair text-white mb-4">
                  Are You a Property Owner?
                </h2>
                <p className="text-emerald-100 mb-8">
                  List your property on our platform and reach thousands of
                  potential tenants. Our streamlined process makes property
                  management simple and efficient.
                </p>
                <div>
                  <Link to="/list-property">
                    <Button className="bg-white text-emerald-900 hover:bg-emerald-50">
                      List Your Property
                    </Button>
                  </Link>
                  <Button variant="link" className="text-white ml-4">
                    Learn More <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
              <div className="relative hidden md:block">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=60"
                  alt="Property listing"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-900 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-emerald-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair text-emerald-900 dark:text-emerald-50 mb-2">
              What Our Users Say
            </h2>
            <p className="text-emerald-600 dark:text-emerald-400 max-w-2xl mx-auto">
              Hear from renters and property owners who have used our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Renter",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
                quote:
                  "I found my dream apartment in just two days using this platform. The search filters made it so easy to find exactly what I was looking for!",
              },
              {
                name: "Michael Chen",
                role: "Property Owner",
                image:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
                quote:
                  "As a landlord, I've been able to find reliable tenants quickly. The verification process gives me peace of mind about who I'm renting to.",
              },
              {
                name: "Emily Rodriguez",
                role: "Renter",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
                quote:
                  "The neighborhood guides helped me choose the perfect location for my needs. I love my new home and the community around it!",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/80 dark:bg-black/40 backdrop-blur-sm border-none shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-emerald-500 text-emerald-500"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-emerald-700 dark:text-emerald-300 mb-6 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <p className="font-semibold text-emerald-900 dark:text-emerald-50">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-emerald-600 dark:text-emerald-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair text-emerald-900 dark:text-emerald-50 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-emerald-600 dark:text-emerald-400">
              Find answers to common questions about our rental platform
            </p>
          </div>

          <Tabs defaultValue="renters" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="renters">For Renters</TabsTrigger>
              <TabsTrigger value="owners">For Property Owners</TabsTrigger>
            </TabsList>

            <TabsContent value="renters" className="space-y-4">
              {[
                {
                  question: "How do I search for properties?",
                  answer:
                    "Use our search bar to enter your desired location, then refine your results using our filters for property type, price range, number of bedrooms, and amenities.",
                },
                {
                  question: "Is there an application fee?",
                  answer:
                    "Application fees vary by property. Each listing will clearly display any associated fees before you submit an application.",
                },
                {
                  question: "How do I schedule a viewing?",
                  answer:
                    "Once you've found a property you're interested in, you can schedule a viewing directly through our platform by selecting available time slots or contacting the landlord.",
                },
                {
                  question: "Are utilities included in the rent?",
                  answer:
                    "This varies by property. Check the detailed property description to see which utilities, if any, are included in the monthly rent.",
                },
              ].map((faq, index) => (
                <Card
                  key={index}
                  className="bg-white/80 dark:bg-black/40 backdrop-blur-sm border-none shadow-sm"
                >
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-50 mb-2 flex items-start">
                      <Info className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      {faq.question}
                    </h3>
                    <p className="text-emerald-700 dark:text-emerald-300 pl-7">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="owners" className="space-y-4">
              {[
                {
                  question: "How do I list my property?",
                  answer:
                    "Create an account, then click on 'List Your Property' to access our step-by-step listing form. You'll be able to add details, upload photos, and set your rental terms.",
                },
                {
                  question: "How much does it cost to list a property?",
                  answer:
                    "Basic listings are free. Premium features, such as featured placement and advanced screening tools, are available with our subscription plans.",
                },
                {
                  question: "How are tenant applications handled?",
                  answer:
                    "You'll receive notifications when tenants apply. You can review applications, run background checks, and communicate with applicants directly through our platform.",
                },
                {
                  question: "Can I collect rent through the platform?",
                  answer:
                    "Yes, our integrated payment system allows you to collect rent, security deposits, and other fees securely online with automatic payment tracking.",
                },
              ].map((faq, index) => (
                <Card
                  key={index}
                  className="bg-white/80 dark:bg-black/40 backdrop-blur-sm border-none shadow-sm"
                >
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-50 mb-2 flex items-start">
                      <Info className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      {faq.question}
                    </h3>
                    <p className="text-emerald-700 dark:text-emerald-300 pl-7">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default RentalHomePage;
