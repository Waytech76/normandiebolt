export interface Review {
  id: string;
  tour_name: string;
  client_name: string;
  client_email: string | null;
  rating: number;
  comment: string;
  photos: string[];
  created_at: string;
  approved: boolean;
}

export interface ReviewFormData {
  tour_name: string;
  client_name: string;
  client_email: string;
  rating: number;
  comment: string;
  photos: File[];
}