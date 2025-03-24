'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { useSupabase } from '@/hooks/useSupabase';
import { TABLES } from '@/lib/supabase';
import { GalleryItem } from '@/lib/supabase-schema';
import { uploadImage, deleteFile } from '@/lib/supabase-storage';
import styles from '../../../styles/admin/gallery.module.css';

export default function GalleryAdminPage() {
  const router = useRouter();
  const { data: images, loading, error, fetchData, deleteRecord, addRecord } = useSupabase<GalleryItem>(TABLES.GALLERY);
  
  // For multi-selection deletion
  const [selectedForDelete, setSelectedForDelete] = useState<Set<string>>(new Set());
  
  // For multi-upload functionality
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Handle multiple file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadFiles(Array.from(files));
    }
  };

  // Upload selected files
  const handleUpload = async () => {
    if (uploadFiles.length === 0) return;
    setUploading(true);
    setUploadError(null);
  
    try {
      for (const file of uploadFiles) {
        // Upload the file and get its URL
        const imgUrl = await uploadImage(file, 'gallery');
  
        // Insert the record into the gallery table with the unique URL
        await addRecord({
          caption: '', // You can later allow editing captions if needed
          img_url: imgUrl,
          created_at: new Date().toISOString(),
        });
      }
  
      // Refresh the gallery data
      await fetchData();
      setUploadFiles([]);
    } catch (err: any) {
      console.error('Error uploading images:', err);
      setUploadError(err.message || 'Failed to upload images.');
    } finally {
      setUploading(false);
    }
  };
  // Toggle selection for deletion
  const toggleSelect = (id: string) => {
    setSelectedForDelete((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  // Delete all selected images
  const handleDeleteSelected = async () => {
    if (selectedForDelete.size === 0) return;
    try {
      for (const id of Array.from(selectedForDelete)) {
        const item = images.find((img) => img.id === id);
        if (item && item.img_url) {
          try {
            await deleteFile(item.img_url);
          } catch (err) {
            console.error('Error deleting file from storage:', err);
            // Continue even if storage deletion fails
          }
        }
        await deleteRecord(id);
      }
      await fetchData();
      setSelectedForDelete(new Set());
    } catch (err: any) {
      console.error('Error deleting selected images:', err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Gallery Management</h1>
        <div className={styles.actions}>
          <Button variant="outline" onClick={() => router.push('/admin')}>Back to Dashboard</Button>
          <Button variant="outline" onClick={handleDeleteSelected} disabled={selectedForDelete.size === 0}>
            Delete Selected
          </Button>
        </div>
      </div>

      <div className={styles.uploadSection}>
        <label className={styles.uploadLabel}>Upload Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className={styles.uploadInput}
        />
        <Button variant="outline" onClick={handleUpload} disabled={uploading || uploadFiles.length === 0}>
          {uploading ? 'Uploading...' : 'Upload Selected Images'}
        </Button>
        {uploadError && <p className={styles.error}>{uploadError}</p>}
      </div>

      {loading ? (
        <p className={styles.loading}>Loading gallery data...</p>
      ) : error ? (
        <p className={styles.error}>Error loading gallery data.</p>
      ) : (
        <div className={styles.grid}>
          {images.length === 0 ? (
            <p>No gallery images found. Add your first image.</p>
          ) : (
            images.map((image) => (
              <div key={image.id} className={styles.card} onClick={() => toggleSelect(image.id)}>
                <div className={styles.imageWrapper}>
                  {image.img_url ? (
                    <Image
                    src={decodeURIComponent(image.img_url)} // Decode the URL
                    alt={image.caption || 'Gallery image'}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 33vw" // Add the sizes prop
                  />
                  ) : (
                    <div className={styles.noImage}>No image</div>
                  )}
                  {selectedForDelete.has(image.id) && <div className={styles.selectedOverlay}>Selected</div> }
                </div>
                {/* <p className={styles.caption}>{image.caption || 'No caption'}</p> */}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
