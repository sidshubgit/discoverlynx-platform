import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useBusiness } from '@/contexts/BusinessContext';
import BusinessRegistrationForm from '@/components/BusinessRegistrationForm';
import { useToast } from '@/components/ui/use-toast';

const AddBusiness = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { addBusiness } = useBusiness();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const handleBusinessSave = async (businessData: any) => {
    if (!businessData || !businessData.name || !businessData.description || !businessData.location) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const newBusiness = {
        ...businessData,
        userId: user.id,
        isPrivate: businessData.isPrivate || false,
      };

      await addBusiness(newBusiness);

      toast({
        title: "Business added",
        description: "Your business has been successfully registered",
      });

      // Only navigate after successful addition
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Add business error:', error);
      toast({
        title: "Failed to add business",
        description: "An error occurred while adding your business",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Add New Business</h1>
        <BusinessRegistrationForm
          onSave={handleBusinessSave}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default AddBusiness; 