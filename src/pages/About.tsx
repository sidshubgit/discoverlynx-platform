
import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6 text-center">About BizIndex</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="lead text-xl mb-6">
            BizIndex is your go-to resource for discovering and connecting with businesses across industries and locations.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p>
            At BizIndex, we believe in the power of connection. Our mission is to create a comprehensive, 
            user-friendly platform that helps individuals discover businesses that meet their needs while 
            helping businesses reach their target audience efficiently.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Comprehensive business listings across multiple categories</li>
            <li>Detailed business profiles with contact information</li>
            <li>User reviews and ratings to guide your decisions</li>
            <li>Advanced search functionality to find exactly what you need</li>
            <li>Business owner tools to maximize online presence</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
          <p>
            Founded in 2024, BizIndex started as a small project to help local businesses
            gain visibility. As we grew, we expanded our vision to create a platform that serves
            businesses of all sizes across the country.
          </p>
          <p className="mt-4">
            Today, we're proud to connect millions of users with thousands of businesses every month,
            creating value for both consumers and business owners alike.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Join Our Community</h2>
          <p>
            Whether you're looking for services, products, or business opportunities, or you're a 
            business owner looking to expand your reach, BizIndex is here to help. Join our growing
            community today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
