
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BusinessCard, { Business } from '@/components/BusinessCard';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Filter, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// Sample business data
const ALL_BUSINESSES: Business[] = [
  {
    id: '1',
    name: 'TechNova Solutions',
    description: 'Leading provider of innovative software solutions for enterprise businesses, specializing in AI-driven analytics and cloud infrastructure.',
    category: 'Technology',
    location: 'San Francisco, CA',
    isPrivate: false,
    tags: ['Software', 'AI', 'Cloud'],
  },
  {
    id: '2',
    name: 'Green Earth Consulting',
    description: 'Environmental consulting firm helping businesses implement sustainable practices and reduce their carbon footprint through practical strategies.',
    category: 'Consulting',
    location: 'Portland, OR',
    isPrivate: false,
    tags: ['Sustainability', 'Environment', 'Green'],
  },
  {
    id: '3',
    name: 'Horizon Financial',
    description: 'Comprehensive financial services for startups and growing businesses, offering tailored solutions for funding, investment, and financial planning.',
    category: 'Finance',
    location: 'New York, NY',
    isPrivate: false,
    tags: ['Investment', 'Planning', 'Funding'],
  },
  {
    id: '4',
    name: 'Artemis Healthcare',
    description: 'Innovative healthcare provider focused on telemedicine and digital health solutions for patients and healthcare professionals worldwide.',
    category: 'Healthcare',
    location: 'Boston, MA',
    isPrivate: true,
    tags: ['Telemedicine', 'Digital Health'],
  },
  {
    id: '5',
    name: 'GlobalTrade Partners',
    description: 'International trade facilitation services specializing in logistics, customs clearance, and supply chain management for businesses of all sizes.',
    category: 'Logistics',
    location: 'Miami, FL',
    isPrivate: false,
    tags: ['Import', 'Export', 'Logistics'],
  },
  {
    id: '6',
    name: 'Quantum Manufacturing',
    description: 'Precision manufacturing company producing high-quality components for aerospace, automotive, and electronics industries with advanced technologies.',
    category: 'Manufacturing',
    location: 'Detroit, MI',
    isPrivate: false,
    tags: ['Precision', 'Components', 'Advanced'],
  },
  {
    id: '7',
    name: 'EcoEnergy Solutions',
    description: 'Renewable energy solutions provider helping businesses transition to sustainable energy sources with solar, wind, and energy storage solutions.',
    category: 'Energy',
    location: 'Austin, TX',
    isPrivate: false,
    tags: ['Renewable', 'Solar', 'Sustainable'],
  },
  {
    id: '8',
    name: 'DigitalX Marketing',
    description: 'Full-service digital marketing agency specializing in SEO, content marketing, social media, and PPC campaigns for growing businesses.',
    category: 'Marketing',
    location: 'Chicago, IL',
    isPrivate: true,
    tags: ['Digital', 'SEO', 'Content'],
  },
];

const CATEGORIES = ['All', 'Technology', 'Consulting', 'Finance', 'Healthcare', 'Logistics', 'Manufacturing', 'Energy', 'Marketing'];
const LOCATIONS = ['All', 'San Francisco, CA', 'Portland, OR', 'New York, NY', 'Boston, MA', 'Miami, FL', 'Detroit, MI', 'Austin, TX', 'Chicago, IL'];

const BusinessList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [businesses, setBusinesses] = useState<Business[]>(ALL_BUSINESSES);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>(ALL_BUSINESSES);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('default');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(['All']);
  const [showPrivate, setShowPrivate] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage);
  
  // Search and filter handler
  const handleSearch = (query: string, filters: any) => {
    setSearchQuery(query);
    applyFilters(query, selectedCategories, selectedLocations, showPrivate, sortBy);
  };
  
  // Apply all filters
  const applyFilters = (
    query: string = searchQuery,
    categories: string[] = selectedCategories,
    locations: string[] = selectedLocations,
    showPrivateListings: boolean = showPrivate,
    sort: string = sortBy
  ) => {
    let results = ALL_BUSINESSES;
    
    // Filter by search query
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      results = results.filter(business => 
        business.name.toLowerCase().includes(lowercaseQuery) ||
        business.description.toLowerCase().includes(lowercaseQuery) ||
        business.category.toLowerCase().includes(lowercaseQuery) ||
        business.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      );
    }
    
    // Filter by categories
    if (categories.length > 0 && !categories.includes('All')) {
      results = results.filter(business => categories.includes(business.category));
    }
    
    // Filter by locations
    if (locations.length > 0 && !locations.includes('All')) {
      results = results.filter(business => locations.includes(business.location));
    }
    
    // Filter by privacy status
    if (!showPrivateListings) {
      results = results.filter(business => !business.isPrivate);
    }
    
    // Apply sorting
    if (sort === 'name-asc') {
      results = [...results].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'name-desc') {
      results = [...results].sort((a, b) => b.name.localeCompare(a.name));
    }
    
    setFilteredBusinesses(results);
    setCurrentPage(1);
  };
  
  // Handle category toggle
  const toggleCategory = (category: string) => {
    let newCategories;
    
    if (category === 'All') {
      newCategories = ['All'];
    } else {
      // First, remove 'All' if it exists
      const withoutAll = selectedCategories.filter(c => c !== 'All');
      
      // Check if category is already selected
      if (withoutAll.includes(category)) {
        // If this is the last category, revert to 'All'
        newCategories = withoutAll.filter(c => c !== category);
        if (newCategories.length === 0) {
          newCategories = ['All'];
        }
      } else {
        newCategories = [...withoutAll, category];
      }
    }
    
    setSelectedCategories(newCategories);
    applyFilters(searchQuery, newCategories, selectedLocations, showPrivate, sortBy);
  };
  
  // Handle location toggle
  const toggleLocation = (loc: string) => {
    let newLocations;
    
    if (loc === 'All') {
      newLocations = ['All'];
    } else {
      // First, remove 'All' if it exists
      const withoutAll = selectedLocations.filter(l => l !== 'All');
      
      // Check if location is already selected
      if (withoutAll.includes(loc)) {
        // If this is the last location, revert to 'All'
        newLocations = withoutAll.filter(l => l !== loc);
        if (newLocations.length === 0) {
          newLocations = ['All'];
        }
      } else {
        newLocations = [...withoutAll, loc];
      }
    }
    
    setSelectedLocations(newLocations);
    applyFilters(searchQuery, selectedCategories, newLocations, showPrivate, sortBy);
  };
  
  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortBy(value);
    applyFilters(searchQuery, selectedCategories, selectedLocations, showPrivate, value);
  };
  
  // Handle privacy toggle
  const toggleShowPrivate = () => {
    const newShowPrivate = !showPrivate;
    setShowPrivate(newShowPrivate);
    applyFilters(searchQuery, selectedCategories, selectedLocations, newShowPrivate, sortBy);
  };
  
  // Get current page items
  const getCurrentItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredBusinesses.slice(indexOfFirstItem, indexOfLastItem);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              className="max-w-3xl mx-auto text-center mb-8 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Discover Businesses
              </h1>
              <p className="text-lg text-gray-600">
                Find and connect with businesses across various industries that match your interests and requirements.
              </p>
            </motion.div>
            
            <motion.div 
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SearchBar onSearch={handleSearch} />
            </motion.div>
          </div>
        </section>
        
        {/* Listings Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Mobile Filter Button */}
              <div className="lg:hidden w-full mb-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="py-4 space-y-6">
                      {/* Mobile Filters */}
                      <div>
                        <h3 className="text-sm font-medium mb-3">Sort By</h3>
                        <RadioGroup value={sortBy} onValueChange={handleSortChange}>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="default" id="m-sort-default" />
                              <Label htmlFor="m-sort-default">Default</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="name-asc" id="m-sort-name-asc" />
                              <Label htmlFor="m-sort-name-asc">Name (A-Z)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="name-desc" id="m-sort-name-desc" />
                              <Label htmlFor="m-sort-name-desc">Name (Z-A)</Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-sm font-medium mb-3">Categories</h3>
                        <div className="space-y-2">
                          {CATEGORIES.map((category) => (
                            <div key={category} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`m-category-${category}`} 
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={() => toggleCategory(category)}
                              />
                              <label
                                htmlFor={`m-category-${category}`}
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {category}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-sm font-medium mb-3">Locations</h3>
                        <div className="space-y-2">
                          {LOCATIONS.map((loc) => (
                            <div key={loc} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`m-location-${loc}`} 
                                checked={selectedLocations.includes(loc)}
                                onCheckedChange={() => toggleLocation(loc)}
                              />
                              <label
                                htmlFor={`m-location-${loc}`}
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {loc}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">
                            Show Private Listings
                          </label>
                          <p className="text-xs text-gray-500">
                            Include invitation-only businesses
                          </p>
                        </div>
                        <Switch
                          checked={showPrivate}
                          onCheckedChange={toggleShowPrivate}
                        />
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              
              {/* Desktop Sidebar */}
              <div className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-20 space-y-8">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Sort By</h3>
                    <RadioGroup value={sortBy} onValueChange={handleSortChange}>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="default" id="sort-default" />
                          <Label htmlFor="sort-default">Default</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="name-asc" id="sort-name-asc" />
                          <Label htmlFor="sort-name-asc">Name (A-Z)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="name-desc" id="sort-name-desc" />
                          <Label htmlFor="sort-name-desc">Name (Z-A)</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Categories</h3>
                    <div className="space-y-2">
                      {CATEGORIES.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`category-${category}`} 
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => toggleCategory(category)}
                          />
                          <label
                            htmlFor={`category-${category}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Locations</h3>
                    <div className="space-y-2">
                      {LOCATIONS.map((loc) => (
                        <div key={loc} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`location-${loc}`} 
                            checked={selectedLocations.includes(loc)}
                            onCheckedChange={() => toggleLocation(loc)}
                          />
                          <label
                            htmlFor={`location-${loc}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {loc}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">
                        Show Private Listings
                      </label>
                      <p className="text-xs text-gray-500">
                        Include invitation-only businesses
                      </p>
                    </div>
                    <Switch
                      checked={showPrivate}
                      onCheckedChange={toggleShowPrivate}
                    />
                  </div>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">
                    {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'Business' : 'Businesses'}
                  </h2>
                </div>
                
                {filteredBusinesses.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      {getCurrentItems().map((business, index) => (
                        <BusinessCard key={business.id} business={business} index={index} />
                      ))}
                    </div>
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center mt-10">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                              key={page}
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(page)}
                              className={currentPage === page ? "bg-primary text-white" : ""}
                            >
                              {page}
                            </Button>
                          ))}
                          
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-lg text-gray-500">No businesses found matching your criteria.</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategories(['All']);
                        setSelectedLocations(['All']);
                        setShowPrivate(true);
                        setSortBy('default');
                        setFilteredBusinesses(ALL_BUSINESSES);
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BusinessList;
