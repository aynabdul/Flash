import { useState, useEffect, useCallback } from 'react';
import { supabase, createTimestamp, TABLES } from '../lib/supabase';

// Generic type for Supabase documents
export type SupabaseRecord = {
  id: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
};

export function useSupabase<T extends SupabaseRecord>(tableName: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async (): Promise<T[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data: records, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw new Error(error.message);
      }
      
      setData(records as T[]);
      return records as T[];
    } catch (err) {
      const error = err as Error;
      setError(error);
      console.error(`Error fetching data from ${tableName}:`, error);
      return [];
    } finally {
      setLoading(false);
    }
  }, [tableName]);

  const getRecord = useCallback(async (id: string): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data: record, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return record as T;
    } catch (err) {
      const error = err as Error;
      setError(error);
      console.error(`Error fetching record from ${tableName}:`, error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [tableName]);

  const addRecord = useCallback(async (record: Omit<T, 'id' | 'created_at' | 'updated_at'>): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const timestamp = createTimestamp();
      const insertData = {
        ...record,
        created_at: timestamp,
      } as Record<string, any>;

      // Skip updated_at for the gallery table
      if (tableName !== TABLES.GALLERY) {
        insertData['updated_at'] = timestamp;
      }

      const { data: newRecord, error } = await supabase
        .from(tableName)
        .insert(insertData)
        .select()
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Refresh the data
      fetchData();
      
      return newRecord as T;
    } catch (err) {
      const error = err as Error;
      setError(error);
      console.error(`Error adding record to ${tableName}:`, error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [tableName, fetchData]);

  const updateRecord = useCallback(async (id: string, updates: Partial<Omit<T, 'id' | 'created_at' | 'updated_at'>>): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const timestamp = createTimestamp();
      
      const { data: updatedRecord, error } = await supabase
        .from(tableName)
        .update({
          ...updates,
          updated_at: timestamp
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Refresh the data
      fetchData();
      
      return updatedRecord as T;
    } catch (err) {
      const error = err as Error;
      setError(error);
      console.error(`Error updating record in ${tableName}:`, error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [tableName, fetchData]);

  const deleteRecord = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Refresh the data
      fetchData();
      
      return true;
    } catch (err) {
      const error = err as Error;
      setError(error);
      console.error(`Error deleting record from ${tableName}:`, error);
      return false;
    } finally {
      setLoading(false);
    }
  }, [tableName, fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    fetchData,
    getRecord,
    addRecord,
    updateRecord,
    deleteRecord
  };
}