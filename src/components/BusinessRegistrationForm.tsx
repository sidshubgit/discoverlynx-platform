import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';

interface BusinessFormData {
  name: string;
  description: string;
  category: string;
  location: string;
  website?: string;
  phone?: string;
  isPrivate: boolean;
}

interface BusinessRegistrationFormProps {
  onSave: (businessData: BusinessFormData) => void;
  isLoading: boolean;
}

const BusinessRegistrationForm: React.FC<BusinessRegistrationFormProps> = ({ onSave, isLoading }) => {
  const [businessData, setBusinessData] = useState<BusinessFormData>({
    name: '',
    description: '',
    category: '',
    location: '',
    website: '',
    phone: '',
    isPrivate: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusinessData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVisibilityChange = (value: string) => {
    setBusinessData((prev) => ({
      ...prev,
      isPrivate: value === 'private',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(businessData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>Add your business details to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="business-name">Business Name *</Label>
              <Input
                id="business-name"
                name="name"
                value={businessData.name}
                onChange={handleChange}
                placeholder="ACME Corporation"
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="business-description">Description *</Label>
              <Textarea
                id="business-description"
                name="description"
                value={businessData.description}
                onChange={handleChange}
                placeholder="Tell us about your business"
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="business-category">Category *</Label>
              <Input
                id="business-category"
                name="category"
                value={businessData.category}
                onChange={handleChange}
                placeholder="Technology, Retail, Services, etc."
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="business-location">Location *</Label>
              <Input
                id="business-location"
                name="location"
                value={businessData.location}
                onChange={handleChange}
                placeholder="City, State"
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="business-website">Website (Optional)</Label>
              <Input
                id="business-website"
                name="website"
                value={businessData.website}
                onChange={handleChange}
                placeholder="https://yourbusiness.com"
                type="url"
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="business-phone">Phone (Optional)</Label>
              <Input
                id="business-phone"
                name="phone"
                value={businessData.phone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
                type="tel"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label>Business Visibility</Label>
              <RadioGroup
                defaultValue={businessData.isPrivate ? 'private' : 'public'}
                onValueChange={handleVisibilityChange}
                disabled={isLoading}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public" className="font-normal">
                    Public - Show my business in the directory and featured section
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private" className="font-normal">
                    Private - Only show my business to registered users
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Adding Business..." : "Add Business"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default BusinessRegistrationForm;
