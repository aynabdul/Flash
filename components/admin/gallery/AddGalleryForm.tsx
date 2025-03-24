'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { useSupabase } from '@/hooks/useSupabase';
import { TABLES } from '@/lib/supabase';
import { uploadFile } from '@/lib/supabase-storage';

// Define error type instead of using any
interface ErrorResponse {
  message: string;
  status?: number;
  details?: unknown;
}

export default function AddGalleryForm() {
  const router = useRouter();
  const { addRecord } = useSupabase(TABLES.GALLERY);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      setSelectedFile(file);
      
      // Create preview URL
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Please select an image file.');
      return;
    }
    
    setSaving(true);
    setError(null);
    setUploadProgress(0);
    
    try {
      // Upload the file to Supabase Storage
      const fileName = `gallery/${Date.now()}-${selectedFile.name}`;
      const imgUrl = await uploadFile(fileName, selectedFile);
      
      // Add record to database
      await addRecord({
        caption,
        img_url: imgUrl,
        created_at: new Date().toISOString()
      });
      
      // Navigate back to gallery management
      router.push('/admin/gallery');
    } catch (error: unknown) {
      console.error('Error adding gallery item:', error);
      const err = error as ErrorResponse;
      setError(err.message || 'Failed to add gallery item. Please try again.');
      setSaving(false);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {/* Image Preview */}
        <div className="mb-6">
          <p className="block text-gray-700 font-medium mb-2">Image Preview</p>
          <div className="mt-2 relative h-48 w-full bg-gray-100 rounded-md overflow-hidden">
            {previewUrl ? (
              <div className="relative h-full w-full">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full w-full text-gray-400">
                No image selected
              </div>
            )}
          </div>
        </div>
        
        {/* File Input */}
        <div className="mb-6">
          <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
            Gallery Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="image"
            onChange={handleFileChange}
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />
          
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mt-2">
              <div className="bg-gray-200 rounded-full h-2.5 w-full">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Uploading: {uploadProgress}%
              </p>
            </div>
          )}
        </div>
        
        {/* Caption Input */}
        <div className="mb-6">
          <label htmlFor="caption" className="block text-gray-700 font-medium mb-2">
            Caption
          </label>
          <input
            type="text"
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a caption for this image"
          />
        </div>
        
        {/* Submit & Cancel Buttons */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/gallery')}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Add Image'}
          </Button>
        </div>
      </form>
    </div>
  );
} 