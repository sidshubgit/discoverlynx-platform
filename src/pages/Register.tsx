import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useBusiness } from '@/contexts/BusinessContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import BusinessRegistrationForm from '@/components/BusinessRegistrationForm';

interface BusinessData {
  name: string;
  description: string;
  category: string;
  location: string;
  website?: string;
  phone?: string;
  isPrivate: boolean;
}

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [addBusiness, setAddBusiness] = useState(false);
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Account info, Step 2: Business info
  const { register } = useAuth();
  const { addBusiness: saveBusiness } = useBusiness();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateAccountInfo = () => {
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return false;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleNextStep = () => {
    if (validateAccountInfo()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      handleNextStep();
      return;
    }
    
    if (addBusiness && !businessData) {
      toast({
        title: "Missing business information",
        description: "Please fill in your business details",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // First register the user
      const newUser = await register(name, email, password);
      
      // Then save the business if needed
      if (addBusiness && businessData && newUser?.id) {
        await saveBusiness({
          ...businessData,
          userId: newUser.id // Add the user ID to the business data
        });
      }
      
      toast({
        title: "Registration successful",
        description: addBusiness && businessData 
          ? "Your account and business have been created" 
          : "Your account has been created",
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: "An error occurred during registration",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBusinessDataSave = (data: BusinessData) => {
    setBusinessData(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-4">
        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <Card>
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                <CardDescription>
                  Enter your information to create an account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="add-business"
                    checked={addBusiness}
                    onChange={(e) => setAddBusiness(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="add-business" className="text-sm font-normal">
                    I want to add my business to the directory
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button type="button" className="w-full" onClick={handleNextStep} disabled={isLoading}>
                  {addBusiness ? "Next: Add Business Details" : "Register"}
                </Button>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Login
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ) : (
            <>
              {addBusiness ? (
                <div className="space-y-4">
                  <BusinessRegistrationForm
                    onSave={handleBusinessDataSave}
                    isLoading={isLoading}
                  />
                  <div className="flex space-x-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setStep(1)}
                      disabled={isLoading}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Complete Registration"}
                    </Button>
                  </div>
                </div>
              ) : (
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Register"}
                </Button>
              )}
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
