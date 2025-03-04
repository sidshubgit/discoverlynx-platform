import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import BusinessCard from './BusinessCard';
import { motion } from 'framer-motion';
import { useBusiness } from '@/contexts/BusinessContext';

const FeaturedBusinesses = () => {
  const { getFeaturedBusinesses, isLoading } = useBusiness();
  const featuredBusinesses = getFeaturedBusinesses();

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
            <div className="h-4 w-96 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-96 bg-gray-100 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (featuredBusinesses.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Featured Businesses
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Join our growing community of businesses! Register your business and make it public to get featured here.
            </p>
            <p className="text-sm text-gray-500 max-w-2xl mx-auto mb-8">
              Featured businesses are automatically selected from our public business listings and are regularly updated.
            </p>
            <Button size="lg" asChild>
              <Link to="/register">
                Register Your Business
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Featured Businesses
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            Discover recently registered businesses in our network that are making an impact in their industries.
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Want to see your business here? Register and make your business public to get featured!
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {featuredBusinesses.map((business, index) => (
            <BusinessCard 
              key={business.id} 
              business={business} 
              index={index}
            />
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button size="lg" variant="outline" asChild>
            <Link to="/businesses">
              View All Businesses
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedBusinesses;
