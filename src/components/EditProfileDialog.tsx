import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { Pencil } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface EditProfileFormData {
  name: string;
  email: string;
}

export const EditProfileDialog = () => {
  const { user, updateProfile } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<EditProfileFormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    }
  });

  const onSubmit = async (data: EditProfileFormData) => {
    try {
      await updateProfile(data);
      // Close dialog after successful update
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="flex items-center">
          <Pencil className="mr-2 h-4 w-4" />
          Edit Information
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile Information</DialogTitle>
          <DialogDescription>
            Update your personal information below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <DialogTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogTrigger>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}; 