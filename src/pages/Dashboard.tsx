import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useBusiness } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { MapPin, Plus, ChevronRight, Globe, Lock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { businesses, updateBusiness, deleteBusiness, isLoading: isLoadingBusinesses } = useBusiness();
  const { toast } = useToast();

  // Show loading state
  if (isLoading || isLoadingBusinesses) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Filter businesses for the current user
  const userBusinesses = businesses.filter(business => business.userId === user.id);

  const handleVisibilityToggle = async (businessId: string, currentIsPrivate: boolean) => {
    try {
      await updateBusiness(businessId, { isPrivate: !currentIsPrivate });
      toast({
        title: "Business updated",
        description: `Business visibility set to ${currentIsPrivate ? 'public' : 'private'}`,
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Failed to update business visibility",
        variant: "destructive",
      });
    }
  };

  const handleDeleteBusiness = async (businessId: string) => {
    try {
      await deleteBusiness(businessId);
      toast({
        title: "Business deleted",
        description: "Your business has been successfully deleted",
      });
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Failed to delete business",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
        <p className="text-lg text-gray-600">
          Welcome back, {user?.name}!
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Business Management Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Your Businesses</CardTitle>
                <CardDescription>Manage your registered businesses</CardDescription>
              </div>
              <Button asChild>
                <Link to="/add-business" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Business
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {userBusinesses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">You haven't registered any businesses yet.</p>
                  <Button asChild variant="outline">
                    <Link to="/add-business" className="flex items-center gap-2">
                      Register Your First Business
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {userBusinesses.map((business) => (
                    <Card key={business.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold truncate">{business.name}</h3>
                              <Badge variant={business.isPrivate ? "secondary" : "default"} className="flex items-center gap-1">
                                {business.isPrivate ? (
                                  <><Lock className="h-3 w-3" /> Private</>
                                ) : (
                                  <><Globe className="h-3 w-3" /> Public</>
                                )}
                              </Badge>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                              <MapPin className="h-3.5 w-3.5 mr-1" />
                              <span className="truncate">{business.location}</span>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                              {business.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleVisibilityToggle(business.id, business.isPrivate)}
                              >
                                {business.isPrivate ? 'Make Public' : 'Make Private'}
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteBusiness(business.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Activity Section */}
          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
              <CardDescription>Your recent activity</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 italic">No recent activity</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Name:</span>
                <span className="font-medium">{user?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email:</span>
                <span className="font-medium">{user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Account Type:</span>
                <span className="font-medium capitalize">{user?.role}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
          {/* Favorites Section */}
        <Card>
          <CardHeader>
            <CardTitle>Favorites</CardTitle>
            <CardDescription>Your saved businesses</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 italic">No saved businesses yet</p>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
