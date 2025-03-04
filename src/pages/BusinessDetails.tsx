import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBusiness } from '@/contexts/BusinessContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Globe, Phone, Mail, Lock, ArrowLeft } from 'lucide-react';

const BusinessDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { businesses, isLoading } = useBusiness();
  const { user } = useAuth();

  // Find the business
  const business = businesses.find(b => b.id === id);

  // Check if the business is private and the user is not the owner
  const isPrivateAndNotOwner = business?.isPrivate && (!user || business.userId !== user.id);

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-2/3 bg-gray-200 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Handle not found or private business
  if (!business || isPrivateAndNotOwner) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-4">
            {isPrivateAndNotOwner ? "Private Business" : "Business Not Found"}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {isPrivateAndNotOwner
              ? "This business is private and can only be viewed by its owner."
              : "The business you're looking for doesn't exist or has been removed."}
          </p>
          <Button onClick={() => navigate('/businesses')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Directory
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="outline"
          className="mb-6"
          onClick={() => navigate('/businesses')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Directory
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-3xl">{business.name}</CardTitle>
                <CardDescription className="flex items-center mt-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  {business.location}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge>{business.category}</Badge>
                {business.isPrivate && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Lock className="h-3 w-3" /> Private
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{business.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {business.website && (
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Globe className="h-4 w-4" />
                  Website
                </a>
              )}
              
              {business.phone && (
                <a
                  href={`tel:${business.phone}`}
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  {business.phone}
                </a>
              )}

              {business.email && (
                <a
                  href={`mailto:${business.email}`}
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  {business.email}
                </a>
              )}
            </div>

            {business.tags && business.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {business.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessDetails; 