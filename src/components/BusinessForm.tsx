
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Business } from './BusinessCard';
import { Upload, X } from 'lucide-react';

// Business form schema
const businessFormSchema = z.object({
  name: z.string().min(2, { message: 'Business name must be at least 2 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  category: z.string({ required_error: 'Please select a category' }),
  location: z.string().min(2, { message: 'Location is required' }),
  website: z.string().url({ message: 'Please enter a valid URL' }).optional().or(z.literal('')),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().optional(),
  isPrivate: z.boolean().default(false),
  tags: z.string().optional(),
});

type BusinessFormValues = z.infer<typeof businessFormSchema>;

type BusinessFormProps = {
  initialData?: Partial<Business>;
  onSubmit: (data: BusinessFormValues) => void;
  isLoading?: boolean;
};

const CATEGORIES = [
  'Technology', 
  'Finance', 
  'Healthcare', 
  'Retail', 
  'Manufacturing', 
  'Consulting',
  'Education',
  'Food & Beverage',
  'Real Estate',
  'Entertainment',
  'Marketing',
  'Other'
];

const BusinessForm: React.FC<BusinessFormProps> = ({ 
  initialData, 
  onSubmit, 
  isLoading = false 
}) => {
  const { toast } = useToast();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const form = useForm<BusinessFormValues>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      category: initialData?.category || '',
      location: initialData?.location || '',
      website: '',
      email: '',
      phone: '',
      isPrivate: initialData?.isPrivate || false,
      tags: initialData?.tags?.join(', ') || '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (data: BusinessFormValues) => {
    onSubmit(data);
    toast({
      title: initialData ? "Business Updated" : "Business Created",
      description: `${data.name} has been ${initialData ? "updated" : "created"} successfully.`,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-4 text-center">
              <h3 className="text-lg font-medium mb-1">Business Logo</h3>
              <p className="text-sm text-gray-500">Upload your business logo</p>
            </div>

            <div className="flex items-center justify-center w-full">
              {logoPreview ? (
                <div className="relative w-32 h-32 mb-2">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-full h-full object-contain rounded-md border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => setLogoPreview(null)}
                    className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm border border-gray-200"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="logo-upload"
                  className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                  </div>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter business name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your business, products, services..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="City, State" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input placeholder="contact@business.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1 (555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="Enter tags separated by commas" {...field} />
              </FormControl>
              <FormDescription>
                Add relevant tags to help with discoverability (e.g., software, consulting, remote)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPrivate"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Private Listing</FormLabel>
                <FormDescription>
                  Enable to make this listing private and accessible by invitation only
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : initialData ? 'Update Business' : 'Create Business'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BusinessForm;
