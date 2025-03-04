
import React from 'react';
import Hero from '@/components/Hero';
import FeaturedBusinesses from '@/components/FeaturedBusinesses';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle, Users, Search, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <FeaturedBusinesses />
        
        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                How BizIndex Works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Connect with businesses and grow your network in three simple steps.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
              {[
                {
                  icon: <CheckCircle className="h-10 w-10 text-primary" />,
                  title: "Create Your Profile",
                  description: "Register and build a comprehensive profile that highlights your business's unique value proposition and offerings."
                },
                {
                  icon: <Search className="h-10 w-10 text-primary" />,
                  title: "Discover Businesses",
                  description: "Use our powerful search and filtering tools to find businesses that match your interests and requirements."
                },
                {
                  icon: <Users className="h-10 w-10 text-primary" />,
                  title: "Connect & Grow",
                  description: "Establish valuable connections with potential clients, partners, and investors to fuel your business growth."
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <div className="rounded-full bg-primary/10 p-5 mb-5">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 md:py-24 bg-white border-y border-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {[
                { value: "10,000+", label: "Businesses", icon: <TrendingUp className="h-6 w-6 text-primary" /> },
                { value: "50+", label: "Categories", icon: <TrendingUp className="h-6 w-6 text-primary" /> },
                { value: "30,000+", label: "Users", icon: <TrendingUp className="h-6 w-6 text-primary" /> },
                { value: "120+", label: "Countries", icon: <TrendingUp className="h-6 w-6 text-primary" /> },
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center p-6 rounded-lg glass-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
