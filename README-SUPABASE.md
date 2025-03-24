# Supabase Configuration & Security

This document outlines important information about the Supabase configuration for the FLASH application.

## Storage Bucket Setup

The application uses two main storage buckets:
- `images` - For storing gallery images
- `pdfs` - For storing resource documents

### Current Configuration

Both buckets have been configured as public with RLS (Row Level Security) disabled. This means:
- Anyone can upload files to these buckets
- Anyone can view files in these buckets
- Anyone can delete files from these buckets

This configuration is suitable for development but **NOT recommended for production**.

## Recommended Production Configuration

For a production environment, you should:

1. **Enable RLS for storage buckets**:
   - Go to Supabase Dashboard > Storage > [bucket name] > Settings > Enable RLS

2. **Create appropriate storage policies**:
   
   For example, to allow only authenticated users to upload and delete:
   ```sql
   -- Allow anyone to read files (public access)
   CREATE POLICY "Public Access" ON storage.objects
     FOR SELECT
     USING (bucket_id IN ('images', 'pdfs'));
   
   -- Allow only authenticated users to upload files
   CREATE POLICY "Auth Upload" ON storage.objects
     FOR INSERT
     TO authenticated
     WITH CHECK (bucket_id IN ('images', 'pdfs'));
   
   -- Allow only authenticated users to delete their own files
   CREATE POLICY "Auth Delete Own Files" ON storage.objects
     FOR DELETE
     TO authenticated
     USING (auth.uid() = owner AND bucket_id IN ('images', 'pdfs'));
   ```

## Security Best Practices

1. **Never expose your service role key in client-side code**
   - Use `NEXT_PUBLIC_SUPABASE_ANON_KEY` for client-side operations
   - Use `SUPABASE_SERVICE_KEY` only in server-side code (API routes)

2. **Use environment variables**
   - Copy `.env.local.example` to `.env.local` and update with your credentials
   - Make sure `.env.local` is in your `.gitignore` file

3. **Use RLS for database tables**
   - Create policies that restrict access to authenticated users
   - Use column-level security for sensitive data

## NextAuth Integration

If you're using NextAuth with Supabase:

1. Create a server-side API route to handle authentication
2. Use the Supabase JWT from NextAuth session to make authenticated requests
3. Set up appropriate policies that match your authentication method

## Environment Variables

Ensure you've set up the following environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Server-side only (for API routes)
SUPABASE_SERVICE_KEY=your-service-key
```

## Development Bypass Authentication

During development, you can use the `bypass-auth.ts` utility to temporarily authorize operations:

```typescript
import { bypassAuth } from '../lib/bypass-auth';

// Use this before making storage or protected database operations
await bypassAuth();
```

⚠️ **IMPORTANT**: Remove this before deploying to production! 