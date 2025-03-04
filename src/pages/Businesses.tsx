import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { useBusiness } from '@/contexts/BusinessContext';
import { useAuth } from '@/contexts/AuthContext';
import { Search, MapPin, Building2, ChevronRight, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Businesses = () => {
  const { businesses, isLoading } = useBusiness();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Filter out private businesses unless they belong to the current user
  const visibleBusinesses = businesses.filter(business => {
    return !business.isPrivate || (user && business.userId === user.id);
  });

  // Get unique categories from visible businesses
  const categories = ['all', ...new Set(visibleBusinesses.map(b => b.category))];

  // Filter businesses based on search term and category
  const filteredBusinesses = visibleBusinesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || business.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="mb-8 text-center">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
          <div className="h-4 w-96 bg-gray-200 rounded animate-pulse mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (businesses.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold tracking-tight mb-4">No Businesses Yet</h1>
          <p className="text-lg text-gray-600 mb-8">
            Be the first to register your business in our directory and start connecting with potential customers.
          </p>
          <Button size="lg" asChild>
            <Link to="/register">
              Register Your Business
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Business Directory</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Browse our comprehensive directory of registered businesses across various industries
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search businesses by name, description, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredBusinesses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No businesses found matching your search criteria.</p>
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business) => (
            <Card key={business.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl truncate">{business.name}</CardTitle>
                  {business.isPrivate && user && business.userId === user.id && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Lock className="h-3 w-3" /> Private
                    </Badge>
                  )}
                </div>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {business.location}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600 line-clamp-3">{business.description}</p>
            </CardContent>
              <CardFooter className="mt-auto pt-4">
                <Button asChild variant="outline" className="w-full">
                  <Link to={`/businesses/${business.id}`}>
                    View Details
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      )}
    </div>
  );
};

export default Businesses;
