import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export type Business = {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  isPrivate: boolean;
  userId: string;
  logoUrl?: string;
  tags?: string[];
};

type BusinessCardProps = {
  business: Business;
  index?: number;
};

const BusinessCard: React.FC<BusinessCardProps> = ({ business, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-md group">
        <CardContent className="p-0">
          <div className="relative overflow-hidden">
            <div 
              className="h-36 w-full bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center p-4"
            >
              {business.logoUrl ? (
                <img 
                  src={business.logoUrl} 
                  alt={`${business.name} logo`} 
                  className="max-h-24 object-contain"
                />
              ) : (
                <div className="text-2xl font-bold text-primary/60">
                  {business.name.charAt(0)}
                </div>
              )}
            </div>
            {business.isPrivate && (
              <Badge variant="secondary" className="absolute top-3 right-3 flex items-center gap-1">
                <Lock className="h-3 w-3" />
                Private
              </Badge>
            )}
          </div>
          
          <div className="p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg line-clamp-1">{business.name}</h3>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground mb-3">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span>{business.location}</span>
            </div>
            
            <p className="text-sm text-gray-600 line-clamp-3 mb-3">
              {business.description}
            </p>
            
            <div className="flex flex-wrap gap-1.5 mb-3">
              <Badge variant="outline" className="bg-primary/5 text-primary/90">
                {business.category}
              </Badge>
              
              {business.tags?.slice(0, 2).map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline"
                  className="bg-secondary/80"
                >
                  {tag}
                </Badge>
              ))}
              
              {(business.tags?.length || 0) > 2 && (
                <Badge variant="outline" className="bg-secondary/50">
                  +{(business.tags?.length || 0) - 2}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-5 pt-0">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full transition-colors group-hover:bg-primary/10"
            asChild
          >
            <Link to={`/businesses/${business.id}`}>
              View Details
              <ExternalLink className="ml-2 h-3.5 w-3.5 opacity-70" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default BusinessCard;
