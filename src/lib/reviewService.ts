import { supabase } from './supabase';
import { uploadMultipleImagesToSupabase } from './supabaseStorage';

export interface ReviewData {
  tour_name: string;
  client_name: string;
  client_email?: string;
  rating: number;
  comment: string;
  photos?: string[];
}

export interface Review extends ReviewData {
  id: string;
  approved: boolean;
  created_at: string;
}

export class ReviewService {
  static async submitReview(reviewData: ReviewData): Promise<{ success: boolean; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert({
          tour_name: reviewData.tour_name,
          client_name: reviewData.client_name,
          client_email: reviewData.client_email || null,
          rating: reviewData.rating,
          comment: reviewData.comment,
          photos: reviewData.photos || [],
          approved: false
        })
        .select('*');

      if (error) {
        throw new Error(`Erreur Supabase: ${error.message}`);
      }

      const insertedReview = Array.isArray(data) ? data[0] : data;
      window.dispatchEvent(new CustomEvent('reviewSubmitted', { detail: insertedReview }));
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur inconnue' 
      };
    }
  }

  static async getAllReviews(): Promise<Review[]> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('❌ Erreur getAllReviews:', error);
      return [];
    }
  }

  static async getApprovedReviews(): Promise<Review[]> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('❌ Erreur getApprovedReviews:', error);
      return [];
    }
  }

  static async approveReview(reviewId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ approved: true })
        .eq('id', reviewId);

      if (error) {
        throw error;
      }

      window.dispatchEvent(new CustomEvent('reviewApproved', { detail: reviewId }));
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur inconnue' 
      };
    }
  }

  static async deleteReview(reviewId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId);

      if (error) {
        throw error;
      }

      window.dispatchEvent(new CustomEvent('reviewDeleted', { detail: reviewId }));
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur inconnue' 
      };
    }
  }

  static async uploadPhotos(files: File[]): Promise<{ success: boolean; urls?: string[]; error?: string }> {
    try {
      const urls = await uploadMultipleImagesToSupabase(files);
      return { success: true, urls };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur upload photos' 
      };
    }
  }
}