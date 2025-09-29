/*
  # Fix RLS policies for reviews table

  1. Security Changes
    - Drop all existing policies on reviews table
    - Create new policy allowing anonymous users to insert reviews
    - Create policy for reading approved reviews
    - Create policy for authenticated users (admin) to manage all reviews

  2. Tables Affected
    - `reviews` table policies updated
*/

-- First, drop all existing policies on reviews table
DROP POLICY IF EXISTS "Anyone can submit reviews" ON reviews;
DROP POLICY IF EXISTS "Anyone can read approved reviews" ON reviews;
DROP POLICY IF EXISTS "Authenticated users can read all reviews" ON reviews;
DROP POLICY IF EXISTS "Authenticated users can update reviews" ON reviews;
DROP POLICY IF EXISTS "Authenticated users can delete reviews" ON reviews;

-- Ensure RLS is enabled
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous users to insert reviews
CREATE POLICY "anon_can_insert_reviews" 
ON reviews 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Create policy for anonymous users to read approved reviews
CREATE POLICY "anon_can_read_approved_reviews" 
ON reviews 
FOR SELECT 
TO anon 
USING (approved = true);

-- Create policy for authenticated users to read all reviews
CREATE POLICY "authenticated_can_read_all_reviews" 
ON reviews 
FOR SELECT 
TO authenticated 
USING (true);

-- Create policy for authenticated users to update reviews
CREATE POLICY "authenticated_can_update_reviews" 
ON reviews 
FOR UPDATE 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Create policy for authenticated users to delete reviews
CREATE POLICY "authenticated_can_delete_reviews" 
ON reviews 
FOR DELETE 
TO authenticated 
USING (true);