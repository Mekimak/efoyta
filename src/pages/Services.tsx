import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThreeScene } from "@/components/3d/ThreeScene";
import { ArrowRight, Check } from "lucide-react";

const Services = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header isDarkMode={isDarkMode} onDarkModeToggle={handleDarkModeToggle} />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-emerald-50 dark:bg-emerald-950/20 overflow-hidden">
          <ThreeScene className="opacity-30" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-emerald-900 dark:text-emerald-50 mb-6">
                Our Services
              </h1>
              <p className="text-xl text-emerald-700 dark:text-emerald-300 mb-8">
                Comprehensive luxury real estate services tailored to your needs
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Property Sales",
                  description:
                    "Expert guidance through every step of selling your luxury property, from valuation to closing.",
                  image:
                    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80",
                },
                {
                  title: "Property Acquisition",
                  description:
                    "Personalized property search and acquisition services to help you find your dream luxury home.",
                  image:
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
                },
                {
                  title: "Property Management",
                  description:
                    "Comprehensive management services for luxury rental properties, ensuring maximum returns and minimal stress.",
                  image:
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-6">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="text-xl font-playfair text-emerald-900 dark:text-emerald-50 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-emerald-700 dark:text-emerald-300">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Services */}
        <section className="py-20 bg-emerald-50 dark:bg-emerald-950/10">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-playfair text-emerald-900 dark:text-emerald-50 mb-4">
                Our Comprehensive Services
              </h2>
              <p className="text-emerald-700 dark:text-emerald-300 max-w-3xl mx-auto">
                Discover the full range of luxury real estate services we offer
                to our discerning clients
              </p>
            </motion.div>

            <div className="space-y-12">
              {/* Property Sales */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-playfair text-emerald-900 dark:text-emerald-50 mb-4">
                    Luxury Property Sales
                  </h3>
                  <p className="text-emerald-700 dark:text-emerald-300 mb-6">
                    Our property sales service is designed to maximize the value
                    of your luxury property while ensuring a smooth and
                    efficient sales process. We combine market expertise,
                    strategic pricing, and targeted marketing to attract
                    qualified buyers.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Comprehensive property valuation",
                      "Professional photography and virtual tours",
                      "Strategic pricing and positioning",
                      "Global marketing exposure",
                      "Qualified buyer screening",
                      "Expert negotiation",
                      "Seamless closing process",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start text-emerald-700 dark:text-emerald-300"
                      >
                        <Check className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&auto=format&fit=crop&q=80"
                      alt="Luxury Property Sales"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="text-white text-lg font-playfair">
                          Maximize your property's value with our expert sales
                          team
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Property Acquisition */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="order-2 lg:order-1"
                >
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1600585154526-990dced4db3d?w=800&auto=format&fit=crop&q=80"
                      alt="Property Acquisition"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="text-white text-lg font-playfair">
                          Find your dream luxury property with our acquisition
                          experts
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="order-1 lg:order-2"
                >
                  <h3 className="text-2xl font-playfair text-emerald-900 dark:text-emerald-50 mb-4">
                    Property Acquisition
                  </h3>
                  <p className="text-emerald-700 dark:text-emerald-300 mb-6">
                    Our property acquisition service helps you find and secure
                    the perfect luxury property that meets your specific
                    requirements and preferences. We provide personalized
                    guidance throughout the entire buying process.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Personalized property search",
                      "Access to off-market properties",
                      "Detailed property analysis",
                      "Virtual tours for remote clients",
                      "Expert negotiation to secure the best price",
                      "Due diligence coordination",
                      "Seamless closing process",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start text-emerald-700 dark:text-emerald-300"
                      >
                        <Check className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Property Management */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-playfair text-emerald-900 dark:text-emerald-50 mb-4">
                    Property Management
                  </h3>
                  <p className="text-emerald-700 dark:text-emerald-300 mb-6">
                    Our property management service takes the stress out of
                    owning rental properties. We handle all aspects of property
                    management, from tenant screening to maintenance, ensuring
                    your investment is well-maintained and profitable.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Tenant screening and selection",
                      "Rent collection and financial reporting",
                      "Property maintenance and repairs",
                      "24/7 emergency response",
                      "Regular property inspections",
                      "Lease renewal and negotiation",
                      "Legal compliance management",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start text-emerald-700 dark:text-emerald-300"
                      >
                        <Check className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1600566753376-12c8ab8e17a9?w=800&auto=format&fit=crop&q=80"
                      alt="Property Management"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="text-white text-lg font-playfair">
                          Hassle-free property management for luxury rentals
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Packages */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-playfair text-emerald-900 dark:text-emerald-50 mb-4">
                Our Service Packages
              </h2>
              <p className="text-emerald-700 dark:text-emerald-300 max-w-3xl mx-auto">
                Choose the service package that best suits your luxury real
                estate needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Essential",
                  price: "$5,000",
                  description:
                    "Basic services for property buyers and sellers looking for expert guidance.",
                  features: [
                    "Property valuation",
                    "Basic marketing package",
                    "Buyer/seller representation",
                    "Closing coordination",
                    "30-day listing period",
                  ],
                  recommended: false,
                },
                {
                  title: "Premium",
                  price: "$10,000",
                  description:
                    "Enhanced services with additional marketing and support for luxury properties.",
                  features: [
                    "Comprehensive property valuation",
                    "Premium marketing package",
                    "Professional photography",
                    "Virtual tours",
                    "Buyer/seller representation",
                    "Closing coordination",
                    "60-day listing period",
                    "Social media promotion",
                  ],
                  recommended: true,
                },
                {
                  title: "Exclusive",
                  price: "$25,000",
                  description:
                    "White-glove service for ultra-luxury properties with global marketing reach.",
                  features: [
                    "Expert property valuation",
                    "Global marketing exposure",
                    "Professional photography & videography",
                    "3D virtual tours",
                    "Staging consultation",
                    "Dedicated agent",
                    "Buyer/seller representation",
                    "Closing coordination",
                    "90-day listing period",
                    "Global social media campaign",
                    "Featured in luxury publications",
                  ],
                  recommended: false,
                },
              ].map((pkg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <Card
                    className={`h-full bg-white/80 dark:bg-black/40 backdrop-blur-sm border-none shadow-lg dark:shadow-[0_0_20px_rgba(16,185,129,0.1)] ${pkg.recommended ? "ring-2 ring-emerald-500 dark:ring-emerald-400" : ""}`}
                  >
                    {pkg.recommended && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Recommended
                      </div>
                    )}
                    <CardContent className="p-6">
                      <h3 className="text-xl font-playfair text-emerald-900 dark:text-emerald-50 mb-2">
                        {pkg.title}
                      </h3>
                      <div className="text-3xl font-semibold text-emerald-700 dark:text-emerald-300 mb-4">
                        {pkg.price}
                      </div>
                      <p className="text-emerald-600 dark:text-emerald-400 mb-6">
                        {pkg.description}
                      </p>
                      <ul className="space-y-3 mb-8">
                        {pkg.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start text-emerald-700 dark:text-emerald-300"
                          >
                            <Check className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`w-full ${pkg.recommended ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-black/60 dark:hover:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800"}`}
                      >
                        Select Package
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-emerald-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <ThreeScene />
          </div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl font-playfair text-white mb-6"
              >
                Ready to Experience Our Premium Services?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-emerald-100 mb-8"
              >
                Contact our team today to discuss how we can help you achieve
                your luxury real estate goals. We're here to provide
                personalized service tailored to your specific needs.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button className="bg-white hover:bg-emerald-50 text-emerald-900">
                  Schedule a Consultation
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-emerald-800/30"
                >
                  View All Services
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
