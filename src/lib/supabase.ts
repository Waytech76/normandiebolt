import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://0ec90b57d6e95fcbda19832f.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw';

// Fallback warning for development
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('⚠️ Using fallback Supabase credentials. Check .env file for environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      reviews: {
        Row: {
          id: string;
          tour_name: string;
          client_name: string;
          client_email: string | null;
          rating: number;
          comment: string;
          photos: string[];
          approved: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          tour_name: string;
          client_name: string;
          client_email?: string | null;
          rating: number;
          comment: string;
          photos?: string[];
          approved?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          tour_name?: string;
          client_name?: string;
          client_email?: string | null;
          rating?: number;
          comment?: string;
          photos?: string[];
          approved?: boolean;
          created_at?: string;
        };
      };
    };
  };
};