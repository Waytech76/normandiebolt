/*
  # Fix RLS policies for reviews table

  1. Security Changes
    - Drop all existing policies to start fresh
    - Create proper policies for public review submission
    - Allow anonymous users to insert reviews
    - Allow public to read approved reviews only
    - Allow authenticated users (admin) full access

  2. Storage Configuration
    - Ensure review-photos bucket exists
    - Set proper public access for photo uploads
*/

-- Drop all existing policies on reviews table
DROP POLICY IF EXISTS "Public can insert reviews" ON reviews;
DROP POLICY IF EXISTS "Public can read approved reviews" ON reviews;
DROP POLICY IF EXISTS "Authenticated can read all reviews" ON reviews;
DROP POLICY IF EXISTS "Authenticated can update reviews" ON reviews;
DROP POLICY IF EXISTS "Authenticated can delete reviews" ON reviews;
DROP POLICY IF EXISTS "Anyone can submit reviews" ON reviews;
DROP POLICY IF EXISTS "Anyone can read approved reviews" ON reviews;
DROP POLICY IF EXISTS "anon_can_insert_reviews" ON reviews;
DROP POLICY IF EXISTS "anon_can_read_approved" ON reviews;
DROP POLICY IF EXISTS "authenticated_full_access" ON reviews;

-- Ensure RLS is enabled
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create new policies with clear names and permissions
CREATE POLICY "allow_anonymous_insert_reviews" 
ON reviews FOR INSERT 
TO anon 
WITH CHECK (true);

CREATE POLICY "allow_public_read_approved_reviews" 
ON reviews FOR SELECT 
TO anon 
USING (approved = true);

CREATE POLICY "allow_authenticated_full_access" 
ON reviews FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Ensure storage bucket exists and is properly configured
INSERT INTO storage.buckets (id, name, public) 
VALUES ('review-photos', 'review-photos', true) 
ON CONFLICT (id) DO UPDATE SET public = true;

-- Create storage policies for public access
DROP POLICY IF EXISTS "Public can upload review photos" ON storage.objects;
DROP POLICY IF EXISTS "Public can view review photos" ON storage.objects;

CREATE POLICY "allow_public_upload_review_photos" 
ON storage.objects FOR INSERT 
TO anon 
WITH CHECK (bucket_id = 'review-photos');

CREATE POLICY "allow_public_read_review_photos" 
ON storage.objects FOR SELECT 
TO anon 
USING (bucket_id = 'review-photos');

CREATE POLICY "allow_authenticated_manage_review_photos" 
ON storage.objects FOR ALL 
TO authenticated 
USING (bucket_id = 'review-photos') 
WITH CHECK (bucket_id = 'review-photos');