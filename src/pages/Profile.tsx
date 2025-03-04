import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EditProfileDialog } from '@/components/EditProfileDialog';
import { DeleteAccountDialog } from '@/components/DeleteAccountDialog';
import { ChangePasswordDialog } from '@/components/ChangePasswordDialog';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Your Profile</h1>
        <p className="text-lg text-gray-600">
          Manage your account information and settings
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your basic account details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p className="mt-1 text-base">{user?.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1 text-base">{user?.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Account Type</h3>
                  <p className="mt-1 text-base capitalize">{user?.role}</p>
                </div>
                <div className="pt-4">
                  <EditProfileDialog />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium">Password and Security</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Update your password and security preferences
                  </p>
                  <div className="mt-3">
                    <ChangePasswordDialog />
                  </div>
                </div>

                <div className="border-t pt-5">
                  <h3 className="text-base font-medium">Delete Account</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Permanently delete your account and all associated data
                  </p>
                  <div className="mt-3">
                    <DeleteAccountDialog />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
