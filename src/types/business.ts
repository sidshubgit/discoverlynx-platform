export interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  userId: string;
  isPrivate: boolean;
  website?: string;
  email?: string;
  phone?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
} 