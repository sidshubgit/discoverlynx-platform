import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Business } from '@/components/BusinessCard';
import { useAuth } from '@/contexts/AuthContext';

type BusinessContextType = {
  businesses: Business[];
  isLoading: boolean;
  addBusiness: (business: Omit<Business, 'id'>) => Promise<void>;
  updateBusiness: (id: string, business: Partial<Business>) => Promise<void>;
  deleteBusiness: (id: string) => Promise<void>;
  getFeaturedBusinesses: () => Business[];
};

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const BusinessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Load businesses from localStorage
    const storedBusinesses = localStorage.getItem('businesses');
    console.log('Loading businesses from localStorage:', storedBusinesses);
    if (storedBusinesses) {
      setBusinesses(JSON.parse(storedBusinesses));
    }
    setIsLoading(false);
  }, []);

  // Listen for user changes and cleanup businesses if user is deleted
  useEffect(() => {
    if (!user) {
      // User has been logged out or deleted, remove their businesses from state
      setBusinesses(prev => prev.filter(business => business.userId !== user?.id));
    }
  }, [user]);

  const addBusiness = async (businessData: Omit<Business, 'id'>) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));

      const newBusiness: Business = {
        ...businessData,
        id: Math.random().toString(36).substring(2, 9),
      };

      console.log('Adding new business:', newBusiness);
      const updatedBusinesses = [...businesses, newBusiness];
      setBusinesses(updatedBusinesses);
      localStorage.setItem('businesses', JSON.stringify(updatedBusinesses));
      console.log('Updated businesses in localStorage:', updatedBusinesses);
    } catch (error) {
      console.error('Add business error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateBusiness = async (id: string, businessData: Partial<Business>) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));

      const businessIndex = businesses.findIndex(b => b.id === id);
      if (businessIndex === -1) {
        throw new Error('Business not found');
      }

      // Ensure user can only update their own businesses
      if (businesses[businessIndex].userId !== user?.id) {
        throw new Error('Unauthorized to update this business');
      }

      const updatedBusinesses = [...businesses];
      updatedBusinesses[businessIndex] = {
        ...updatedBusinesses[businessIndex],
        ...businessData,
      };

      setBusinesses(updatedBusinesses);
      localStorage.setItem('businesses', JSON.stringify(updatedBusinesses));
    } catch (error) {
      console.error('Update business error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBusiness = async (id: string) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));

      const business = businesses.find(b => b.id === id);
      if (!business) {
        throw new Error('Business not found');
      }

      // Ensure user can only delete their own businesses
      if (business.userId !== user?.id) {
        throw new Error('Unauthorized to delete this business');
      }

      const updatedBusinesses = businesses.filter(b => b.id !== id);
      setBusinesses(updatedBusinesses);
      localStorage.setItem('businesses', JSON.stringify(updatedBusinesses));
    } catch (error) {
      console.error('Delete business error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getFeaturedBusinesses = () => {
    console.log('Current businesses:', businesses);
    console.log('Public businesses:', businesses.filter(business => !business.isPrivate));
    // Return up to 4 public businesses, sorted by most recently added
    return businesses
      .filter(business => !business.isPrivate) // Only show public businesses
      .sort((a, b) => b.id.localeCompare(a.id)) // Sort by ID (most recent first, since IDs are time-based)
      .slice(0, 4); // Take up to 4 businesses
  };

  return (
    <BusinessContext.Provider
      value={{
        businesses,
        isLoading,
        addBusiness,
        updateBusiness,
        deleteBusiness,
        getFeaturedBusinesses,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (context === undefined) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
}; 