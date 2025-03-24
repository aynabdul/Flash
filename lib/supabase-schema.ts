import { SupabaseRecord } from '../hooks/useSupabase';

/**
 * Supabase Schema Definitions
 * 
 * This file defines the types and schemas for Supabase tables.
 */

/**
 * Leadership table schema
 * Stores information about leadership team members
 */
export interface Leadership extends SupabaseRecord {
  full_name: string;
  designation: string;
  img_url: string;
}

/**
 * Gallery table schema
 * Stores images for the gallery section
 */
export interface GalleryItem extends SupabaseRecord {
  img_url: string;
  caption?: string;
}

/**
 * Resources table schema
 * Stores downloadable resources like PDFs
 */
export interface Resource extends SupabaseRecord {
  name: string;
  pdf_url: string;
  description?: string;
}

/**
 * Success Stories table schema
 * Stores success stories of individuals helped by the organization
 */
export interface SuccessStory extends SupabaseRecord {
  name: string;
  circumstances: string;
  engaged_on: string; 
  released_on: string; 
  status: string;
} 