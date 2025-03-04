import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const ChangePasswordDialog = () => {
  const { changePassword } = useAuth();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ChangePasswordFormData>();

  const newPassword = watch('newPassword');

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      await changePassword(data.currentPassword, data.newPassword);
      toast({
        title: 'Success',
        description: 'Your password has been updated successfully.',
      });
      setIsOpen(false);
      reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to change password',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Enter your current password and choose a new password.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              {...register('currentPassword', {
                required: 'Current password is required',
              })}
            />
            {errors.currentPassword && (
              <p className="text-sm text-red-500">{errors.currentPassword.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              {...register('newPassword', {
                required: 'New password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
                },
              })}
            />
            {errors.newPassword && (
              <p className="text-sm text-red-500">{errors.newPassword.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm your new password',
                validate: (value) =>
                  value === newPassword || 'The passwords do not match',
              })}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsOpen(false);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button type="submit">
              Change Password
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}; 