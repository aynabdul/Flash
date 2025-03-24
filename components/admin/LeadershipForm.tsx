import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Leadership } from '../../lib/supabase-schema';
import { uploadImage } from '../../lib/supabase-storage';
import Button from '../ui/Button';
import Image from 'next/image';

interface LeadershipFormProps {
  initialData?: Partial<Leadership>;
  onSubmit: (data: Partial<Leadership>) => Promise<void>;
  isSubmitting: boolean;
}

const LeadershipForm: React.FC<LeadershipFormProps> = ({
  initialData = {},
  onSubmit,
  isSubmitting
}) => {
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData.img_url || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Partial<Leadership>>({
    defaultValues: initialData
  });

  const handleFormSubmit = async (data: Partial<Leadership>) => {
    try {
      // If a file was selected, upload it first
      if (selectedFile) {
        setUploadProgress(0);
        const imageUrl = await uploadImage(selectedFile, 'leadership');
        setUploadProgress(100);
        
        // Update the form data with the new image URL
        data.img_url = imageUrl;
      }
      
      await onSubmit(data);
    } catch (error) {
      console.error('Error in form submission:', error);
      setUploadProgress(null);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Create a preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Clear the text input since we're using the file
      setValue('img_url', '');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="full_name"
          type="text"
          {...register('full_name', { required: 'Full name is required' })}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
            errors.full_name ? 'border-red-300' : ''
          }`}
        />
        {errors.full_name && (
          <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
          Designation
        </label>
        <input
          id="designation"
          type="text"
          {...register('designation', { required: 'Designation is required' })}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
            errors.designation ? 'border-red-300' : ''
          }`}
        />
        {errors.designation && (
          <p className="mt-1 text-sm text-red-600">{errors.designation.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Profile Image
        </label>
        
        {previewUrl && (
          <div className="mb-4">
            <div className="h-40 w-40 rounded-full overflow-hidden bg-gray-100 mx-auto">
              <Image 
                src={previewUrl} 
                alt="Preview" 
                width={160}
                height={160}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}
        
        <div className="mt-1 flex flex-col space-y-4">
          <div>
            <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="mt-1 text-xs text-gray-500">
              Recommended size: 500x500 pixels
            </p>
          </div>
          
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          
          <div>
            <label htmlFor="img_url" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              id="img_url"
              type="text"
              placeholder="https://example.com/image.jpg"
              {...register('img_url')}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              onChange={(e) => {
                if (e.target.value) {
                  setPreviewUrl(e.target.value);
                  setSelectedFile(null);
                }
              }}
            />
          </div>
        </div>
        
        {uploadProgress !== null && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {uploadProgress < 100 ? 'Uploading...' : 'Upload complete'}
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/leadership')}
          disabled={isSubmitting || uploadProgress !== null && uploadProgress < 100}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting || uploadProgress !== null && uploadProgress < 100}
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
};

export default LeadershipForm; 