'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { useSupabase } from '@/hooks/useSupabase'
import { TABLES } from '@/lib/supabase'
import { GalleryItem } from '@/lib/supabase-schema'
import { deleteFile } from '@/lib/supabase-storage'
import Image from 'next/image'

// Define error type instead of using any
interface ErrorResponse {
  message: string;
  status?: number;
  details?: unknown;
}

export default function GalleryManagement() {
  const router = useRouter()
  const { data: images, loading, error, fetchData, deleteRecord } = useSupabase<GalleryItem>(TABLES.GALLERY)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!id) return
    
    setIsDeleting(true)
    setDeleteError(null)
    
    try {
      const imageToDelete = images.find(img => img.id === id)
      
      if (imageToDelete?.img_url) {
        try {
          await deleteFile(imageToDelete.img_url)
        } catch (storageErr) {
          console.error('Error deleting file from storage:', storageErr)
        }
      }
      
      await deleteRecord(id)
      await fetchData()
      setDeleteId(null)
    } catch (err: unknown) {
      const error = err as ErrorResponse;
      console.error('Error deleting gallery image:', error)
      setDeleteError(error.message || 'Failed to delete image. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Gallery Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Add, edit, or remove images from the gallery.
            </p>
          </div>
          <div className="flex gap-4">
            <Button 
              onClick={() => router.push('/admin')}
              className="bg-white text-gray-700 border border-gray-300"
              variant="outline"
            >
              Back to Dashboard
            </Button>
            <Button 
              onClick={() => router.push('/admin/gallery/new')}
              className="bg-blue-600 text-white"
              variant="primary"
            >
              Add New Image
            </Button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">Error loading gallery data. Please try again.</p>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading gallery data...</p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {images.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-gray-500">No gallery images found. Add your first image.</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {images.map((image) => (
                  <li key={image.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                          {image.img_url ? (
                            <div className="relative h-16 w-16">
                              <Image 
                                src={image.img_url} 
                                alt={image.caption || 'Gallery image'} 
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-full w-full flex items-center justify-center">
                              <span className="text-gray-400 text-xs">No image</span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {image.caption || 'No caption'}
                          </div>
                          {image.created_at && (
                            <div className="text-sm text-gray-500">
                              Added: {new Date(image.created_at).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => router.push(`/admin/gallery/edit/${image.id}`)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteId(image.id)}
                          className="text-red-600 hover:text-red-900 ml-4"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete this gallery image? This action cannot be undone.
            </p>
            
            {deleteError && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{deleteError}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-end gap-4">
              <Button
                onClick={() => {
                  setDeleteId(null)
                  setDeleteError(null)
                }}
                disabled={isDeleting}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleDelete(deleteId)}
                disabled={isDeleting}
                variant="danger"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 