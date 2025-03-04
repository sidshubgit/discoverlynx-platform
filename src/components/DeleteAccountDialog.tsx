import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const DeleteAccountDialog = () => {
  const { user, deleteAccount } = useAuth();
  const [confirmation, setConfirmation] = useState('');
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (confirmation.toLowerCase() !== 'delete') {
      return;
    }

    try {
      await deleteAccount();
      navigate('/');
    } catch (error) {
      console.error('Failed to delete account:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="confirmation">
              Type "delete" to confirm
            </Label>
            <Input
              id="confirmation"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              placeholder="delete"
              className="mt-1"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <DialogTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogTrigger>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={confirmation.toLowerCase() !== 'delete'}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 