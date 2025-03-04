
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="font-display text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                BizIndex
              </span>
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              Connecting businesses and fostering growth through discoverability.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" className="text-gray-500 hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-500 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" className="text-gray-500 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/businesses" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  Browse Businesses
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  Search
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/featured" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  Featured Listings
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  API Documentation
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} BizIndex. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="flex items-center text-sm text-gray-500">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> by BizIndex Team
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
