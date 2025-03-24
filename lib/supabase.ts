import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wghibsxszbtwnruasaor.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnaGlic3hzemJ0d25ydWFzYW9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNzgzMTQsImV4cCI6MjA1Nzc1NDMxNH0.tJHCbXVy0YVpsIS18py6CXDv-bf1lveWx3M6PhLg8ME';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const TABLES = {
  LEADERSHIP: 'leadership',
  GALLERY: 'gallery',
  RESOURCES: 'resources',
  SUCCESS_STORIES: 'success_stories',
};

export const createTimestamp = () => new Date().toISOString(); 