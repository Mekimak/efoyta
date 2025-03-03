import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThreeScene } from "@/components/3d/ThreeScene";
import { ArrowRight } from "lucide-react";

const About = () => {
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
                About Efoy Luxury Real Estate
              </h1>
              <p className="text-xl text-emerald-700 dark:text-emerald-300 mb-8">
                Redefining luxury real estate with exceptional properties and
                unparalleled service
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-playfair text-emerald-900 dark:text-emerald-50 mb-6">
                  Our Story
                </h2>
                <p className="text-emerald-700 dark:text-emerald-300 mb-4">
                  Founded in 2010, Efoy began with a vision to transform the
                  luxury real estate market by providing a personalized,
                  high-touch service that caters to the most discerning clients.
                </p>
                <p className="text-emerald-700 dark:text-emerald-300 mb-4">
                  Our founder, Elizabeth Foyer, recognized a gap in the market
                  for truly bespoke real estate services that understand the
                  unique needs of high-net-worth individuals seeking exceptional
                  properties.
                </p>
                <p className="text-emerald-700 dark:text-emerald-300">
                  Today, Efoy has grown into a global luxury real estate brand
                  with a portfolio of the world's most prestigious properties
                  and a reputation for excellence in every aspect of our
                  service.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
                    alt="Luxury Property"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-emerald-100 dark:bg-emerald-900/30 rounded-full blur-3xl -z-10"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values */}
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
                Our Core Values
              </h2>
              <p className="text-emerald-700 dark:text-emerald-300 max-w-3xl mx-auto">
                These principles guide everything we do at Efoy, from how we
                interact with clients to how we select properties for our
                portfolio.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Excellence",
                  description:
                    "We strive for excellence in every aspect of our service, from property curation to client communication.",
                  icon: "✦",
                },
                {
                  title: "Integrity",
                  description:
                    "We operate with complete transparency and honesty, building trust with our clients through every interaction.",
                  icon: "✦",
                },
                {
                  title: "Innovation",
                  description:
                    "We continuously seek new ways to enhance the real estate experience, leveraging technology and creative solutions.",
                  icon: "✦",
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-white/80 dark:bg-black/40 backdrop-blur-sm border-none shadow-lg dark:shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center text-2xl text-emerald-600 dark:text-emerald-400 mb-4">
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-playfair text-emerald-900 dark:text-emerald-50 mb-3">
                        {value.title}
                      </h3>
                      <p className="text-emerald-700 dark:text-emerald-300">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
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
                Our Leadership Team
              </h2>
              <p className="text-emerald-700 dark:text-emerald-300 max-w-3xl mx-auto">
                Meet the experts who lead our company with vision, expertise,
                and a passion for luxury real estate.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Elizabeth Foyer",
                  title: "Founder & CEO",
                  image:
                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
                  bio: "With over 20 years of experience in luxury real estate, Elizabeth founded Efoy with a vision to redefine the industry standard.",
                },
                {
                  name: "Michael Chen",
                  title: "Chief Operating Officer",
                  image:
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=80",
                  bio: "Michael oversees all operational aspects of Efoy, ensuring seamless experiences for both clients and team members.",
                },
                {
                  name: "Sophia Rodriguez",
                  title: "Head of Global Sales",
                  image:
                    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=80",
                  bio: "Sophia leads our international sales team, specializing in connecting clients with extraordinary properties worldwide.",
                },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-xl font-playfair text-white mb-1">
                        {member.name}
                      </h3>
                      <p className="text-emerald-300 mb-4">{member.title}</p>
                      <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {member.bio}
                      </p>
                    </div>
                  </div>
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
                Experience Luxury Real Estate with Efoy
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-emerald-100 mb-8"
              >
                Whether you're looking to buy, sell, or rent a luxury property,
                our team of experts is ready to provide you with exceptional
                service tailored to your unique needs.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Button className="bg-white hover:bg-emerald-50 text-emerald-900">
                  Contact Us <ArrowRight className="ml-2 h-4 w-4" />
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

export default About;
