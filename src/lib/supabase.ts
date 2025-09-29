import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
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