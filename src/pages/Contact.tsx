import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ThreeScene } from "@/components/3d/ThreeScene";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the form data to your backend
    alert("Thank you for your message. We'll get back to you shortly!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
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
                Contact Us
              </h1>
              <p className="text-xl text-emerald-700 dark:text-emerald-300 mb-8">
                Get in touch with our luxury real estate specialists
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-playfair text-emerald-900 dark:text-emerald-50 mb-8">
                  Our Contact Information
                </h2>

                <div className="space-y-8">
                  <Card className="bg-white/80 dark:bg-black/40 backdrop-blur-sm border-none shadow-lg dark:shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mr-4 flex-shrink-0">
                          <MapPin className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-50 mb-2">
                            Office Address
                          </h3>
                          <p className="text-emerald-700 dark:text-emerald-300">
                            123 Luxury Lane, Beverly Hills
                            <br />
                            California, 90210
                            <br />
                            United States
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 dark:bg-black/40 backdrop-blur-sm border-none shadow-lg dark:shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mr-4 flex-shrink-0">
                          <Phone className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-50 mb-2">
                            Phone Numbers
                          </h3>
                          <p className="text-emerald-700 dark:text-emerald-300 mb-2">
                            Main: +1 (310) 555-1234
                          </p>
                          <p className="text-emerald-700 dark:text-emerald-300">
                            Sales: +1 (310) 555-5678
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 dark:bg-black/40 backdrop-blur-sm border-none shadow-lg dark:shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mr-4 flex-shrink-0">
                          <Mail className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-50 mb-2">
                            Email Addresses
                          </h3>
                          <p className="text-emerald-700 dark:text-emerald-300 mb-2">
                            General: info@efoy.com
                          </p>
                          <p className="text-emerald-700 dark:text-emerald-300">
                            Support: support@efoy.com
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 dark:bg-black/40 backdrop-blur-sm border-none shadow-lg dark:shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mr-4 flex-shrink-0">
                          <Clock className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-50 mb-2">
                            Business Hours
                          </h3>
                          <p className="text-emerald-700 dark:text-emerald-300 mb-2">
                            Monday - Friday: 9:00 AM - 6:00 PM
                          </p>
                          <p className="text-emerald-700 dark:text-emerald-300">
                            Saturday: 10:00 AM - 4:00 PM (By appointment only)
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-3xl font-playfair text-emerald-900 dark:text-emerald-50 mb-8">
                  Send Us a Message
                </h2>

                <Card className="bg-white/80 dark:bg-black/40 backdrop-blur-sm border-none shadow-lg dark:shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label
                            htmlFor="name"
                            className="text-emerald-900 dark:text-emerald-50"
                          >
                            Your Name
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800 focus-visible:ring-emerald-500"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className="text-emerald-900 dark:text-emerald-50"
                          >
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john.doe@example.com"
                            className="bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800 focus-visible:ring-emerald-500"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label
                            htmlFor="phone"
                            className="text-emerald-900 dark:text-emerald-50"
                          >
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 (123) 456-7890"
                            className="bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800 focus-visible:ring-emerald-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="subject"
                            className="text-emerald-900 dark:text-emerald-50"
                          >
                            Subject
                          </Label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Property Inquiry"
                            className="bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800 focus-visible:ring-emerald-500"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="message"
                          className="text-emerald-900 dark:text-emerald-50"
                        >
                          Your Message
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Please provide details about your inquiry..."
                          className="min-h-[150px] bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800 focus-visible:ring-emerald-500"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white transition-all duration-300 shadow-md hover:shadow-lg dark:shadow-emerald-900/20 dark:hover:shadow-emerald-900/40"
                      >
                        <Send className="mr-2 h-4 w-4" /> Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-emerald-50 dark:bg-emerald-950/10">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-playfair text-emerald-900 dark:text-emerald-50 mb-4">
                Visit Our Office
              </h2>
              <p className="text-emerald-700 dark:text-emerald-300 max-w-3xl mx-auto">
                Our luxury office is conveniently located in the heart of
                Beverly Hills. We welcome you to visit us for a personalized
                consultation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden h-[400px] shadow-lg"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26455.075507241855!2d-118.42290285!3d34.0736204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0xd6c7c379fd081ed1!2sBeverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1652364513136!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Efoy Office Location"
              ></iframe>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
