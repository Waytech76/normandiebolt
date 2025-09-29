/*
  # Fix RLS policies for reviews table

  1. Security Changes
    - Enable RLS on reviews table
    - Add policy for anonymous users to insert reviews
    - Add policy for anonymous users to read approved reviews
    - Add policy for authenticated users to manage all reviews

  2. Tables
    - reviews table should already exist
    - Add missing RLS policies
*/

-- Ensure RLS is enabled
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Anyone can submit reviews" ON reviews;
DROP POLICY IF EXISTS "Anyone can read approved reviews" ON reviews;
DROP POLICY IF EXISTS "Authenticated users can read all reviews" ON reviews;
DROP POLICY IF EXISTS "Authenticated users can update reviews" ON reviews;
DROP POLICY IF EXISTS "Authenticated users can delete reviews" ON reviews;

-- Allow anonymous users to insert reviews (submit new reviews)
CREATE POLICY "Anyone can submit reviews"
  ON reviews
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous users to read only approved reviews
CREATE POLICY "Anyone can read approved reviews"
  ON reviews
  FOR SELECT
  TO anon
  USING (approved = true);

-- Allow authenticated users (admins) to read all reviews
CREATE POLICY "Authenticated users can read all reviews"
  ON reviews
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users (admins) to update reviews (approve/reject)
CREATE POLICY "Authenticated users can update reviews"
  ON reviews
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users (admins) to delete reviews
CREATE POLICY "Authenticated users can delete reviews"
  ON reviews
  FOR DELETE
  TO authenticated
  USING (true);