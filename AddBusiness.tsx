import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useBusiness } from '@/contexts/BusinessContext';
import BusinessRegistrationForm from '@/components/BusinessRegistrationForm';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

interface BusinessData {
  name: string;
  description: string;
  category: string;
  location: string;
  website?: string;
  phone?: string;
  isPrivate: boolean;
}

const AddBusiness = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const { user, isAuthenticated } = useAuth();
  const { addBusiness } = useBusiness();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const handleBusinessDataSave = (data: BusinessData) => {
    setBusinessData(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!businessData || !businessData.name || !businessData.description || !businessData.category || !businessData.location) {
      toast({
        title: "Missing business information",
        description: "Please fill in all required business fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const newBusiness = {
        ...businessData,
        userId: user.id,
      };

      await addBusiness(newBusiness);

      toast({
        title: "Business added",
        description: "Your business has been successfully registered",
      });

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
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <BusinessRegistrationForm
              onSave={handleBusinessDataSave}
              isLoading={isLoading}
              isRegistrationFlow={false}
            />
            <div className="flex justify-between space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Adding Business..." : "Add Business"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBusiness; 