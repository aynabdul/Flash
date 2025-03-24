import { supabase } from './supabase';

interface DetailedError extends Error {
  details?: string;
  hint?: string;
  code?: string;
}

/**
 * @param path The path in storage where the file should be stored (including filename)
 * @param file The file to upload
 * @returns The public URL of the uploaded file
 */
export async function uploadFile(
  path: string, 
  file: File
): Promise<string> {
  try {
    const parts = path.split('/');
    const fileName = encodeURIComponent(parts.pop() || ''); // Encode the file name
    const storagePath = parts.join('/');
    const bucket = 'images'; 
    
    console.log(`Uploading ${file.name} to bucket: ${bucket}, path: ${storagePath}/${fileName}`);

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(`${storagePath}/${fileName}`, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: file.type,
      });

    if (error) {
      console.error('Supabase Upload Error:', error);
      throw error;
    }

    if (!data) {
      throw new Error('Upload succeeded but no data was returned');
    }

    const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
    return publicUrlData.publicUrl;
  } catch (error: unknown) {
    console.error('Upload Failed:', error);

    const err = error as DetailedError;
    const errorMessage = err.message || 'Unknown error';
    const errorDetails = err.details || '';
    const errorHint = err.hint || '';
    const errorCode = err.code || '';
    
    throw new Error(`Upload failed: ${errorMessage}${errorDetails ? ` (${errorDetails})` : ''}${errorHint ? ` Hint: ${errorHint}` : ''}${errorCode ? ` Code: ${errorCode}` : ''}`);
  }
}

/**
 * @param file The image file to upload
 * @param collection The collection name (used for organizing files)
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(file: File, collection: string = 'gallery'): Promise<string> {
  const sanitizedFileName = file.name.replace(/\s+/g, '_'); 
  const path = `${collection}/${sanitizedFileName}`;
  return uploadFile(path, file);
}

/**
 * @param file The PDF file to upload
 * @returns The public URL of the uploaded PDF
 */
export async function uploadPDF(file: File): Promise<string> {
  return uploadFile('pdfs/resources', file);
}

/**
 * @param url The URL of the file to delete
 */
export async function deleteFile(url: string): Promise<void> {
  try {
    console.log('Attempting to delete file:', url);
    
    // Extract the path from the URL
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    
    let bucket = '';
    let path = '';
    
    // Log the URL structure to help with debugging
    console.log('URL pathname:', urlObj.pathname);
    console.log('Path parts:', pathParts);
    
    // First try standard Supabase URL format
    // Format: /storage/v1/object/public/[bucket]/[path]
    const publicIndex = pathParts.findIndex(part => part === 'public');
    if (publicIndex !== -1 && publicIndex + 1 < pathParts.length) {
      bucket = pathParts[publicIndex + 1];
      path = pathParts.slice(publicIndex + 2).join('/');
      console.log(`Standard format detected - Bucket: ${bucket}, Path: ${path}`);
    } 
    // Try alternative format
    // Format: /[bucket]/[path]
    else if (pathParts.length >= 2) {
      // Assume the first non-empty part after filtering is the bucket
      const filteredParts = pathParts.filter(part => part.trim() !== '');
      if (filteredParts.length >= 1) {
        bucket = filteredParts[0];
        path = filteredParts.slice(1).join('/');
        console.log(`Alternative format detected - Bucket: ${bucket}, Path: ${path}`);
      }
    }

    // If still no bucket/path, try to extract from hostname and pathname
    if (!bucket || !path) {
      // If the URL contains the bucket name in the subdomain
      // Example: https://bucket-name.supabase.in/path/to/file
      const hostParts = urlObj.hostname.split('.');
      if (hostParts.length > 0 && pathParts.length > 0) {
        bucket = hostParts[0].includes('-') ? hostParts[0].split('-').pop() || '' : hostParts[0];
        path = pathParts.filter(p => p).join('/');
        console.log(`Subdomain format detected - Bucket: ${bucket}, Path: ${path}`);
      }
    }
    
    // Last resort - check if we can parse from Supabase Storage URL directly
    if (!bucket || !path) {
      try {
        // Try to get the bucket and path from the URL directly
        // This is a more direct approach to handle Supabase's specific URL format
        const match = url.match(/\/storage\/v1\/object\/(.+?)\/([^/]+)\/(.+)/);
        if (match && match.length >= 4) {
          const access = match[1]; // public, authenticated, etc.
          bucket = match[2];
          path = match[3];
          console.log(`Direct regex match - Access: ${access}, Bucket: ${bucket}, Path: ${path}`);
        }
      } catch (e) {
        console.error('Error parsing URL with regex:', e);
      }
    }
    
    // If we still couldn't extract the bucket and path, throw an error
    if (!bucket || !path) {
      console.error('Failed to extract bucket and path from URL:', url);
      throw new Error(`Could not extract bucket and path from URL: ${url}`);
    }
    
    console.log(`Deleting file from bucket: ${bucket}, path: ${path}`);
    
    // Delete the file
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);
    
    if (error) {
      console.error('Supabase Delete Error:', error);
      throw error;
    }
    
    console.log('File deleted successfully');
  } catch (error: unknown) {
    const err = error as DetailedError;
    console.error('Error deleting file:', err);
    // Provide more detailed error information
    const errorMessage = err.message || 'Unknown error';
    const errorDetails = err.details || '';
    const errorHint = err.hint || '';
    const errorCode = err.code || '';
    
    throw new Error(`Failed to delete file: ${errorMessage}${errorDetails ? ` (${errorDetails})` : ''}${errorHint ? ` Hint: ${errorHint}` : ''}${errorCode ? ` Code: ${errorCode}` : ''}`);
  }
} 