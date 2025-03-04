
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Search, Building, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] w-[60%] h-[80%] rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute top-[60%] -left-[10%] w-[50%] h-[60%] rounded-full bg-blue-100/50 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-6">
              <span className="font-medium">Business Discovery Platform</span>
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Connect & Discover Businesses with{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              BizIndex
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            The comprehensive platform that helps businesses increase visibility and connect with potential clients, partners, and investors.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="lg" asChild>
              <Link to="/register">
                Get Started
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/businesses">
                <Search className="mr-2 h-4 w-4" />
                Explore Businesses
              </Link>
            </Button>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {[
              {
                icon: <Building className="h-6 w-6 text-blue-600" />,
                title: "Business Profiles",
                description: "Create detailed profiles showcasing your products, services, and unique value proposition."
              },
              {
                icon: <ShieldCheck className="h-6 w-6 text-blue-600" />,
                title: "Public or Private",
                description: "Control visibility with options for public listing or private access by invitation only."
              },
              {
                icon: <Search className="h-6 w-6 text-blue-600" />,
                title: "Advanced Discovery",
                description: "Find the perfect business partner with our powerful search and filtering capabilities."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="glass-card rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <div className="rounded-full bg-blue-50 p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
