/*
  # Fix RLS policies for public access

  1. Changes
    - Drop existing policies that only target 'anon' role
    - Create new policies targeting 'public' role (includes anon and authenticated)
    - This ensures anonymous users can submit reviews without authentication

  2. Security
    - Public users can INSERT reviews (submit new reviews)
    - Public users can SELECT only approved reviews
    - Authenticated users maintain full access for admin operations
*/

-- Drop existing policies
DROP POLICY IF EXISTS "allow_anonymous_insert_reviews" ON reviews;
DROP POLICY IF EXISTS "allow_public_read_approved_reviews" ON reviews;
DROP POLICY IF EXISTS "allow_authenticated_full_access" ON reviews;

-- Create policy for public to insert reviews
CREATE POLICY "public_can_insert_reviews" 
ON reviews 
FOR INSERT 
TO public
WITH CHECK (true);

-- Create policy for public to read approved reviews
CREATE POLICY "public_can_read_approved_reviews" 
ON reviews 
FOR SELECT 
TO public
USING (approved = true);

-- Create policy for authenticated users to have full access
CREATE POLICY "authenticated_full_access_reviews" 
ON reviews 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);