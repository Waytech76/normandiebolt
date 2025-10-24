/*
  # Fix RLS Policy for Anonymous Review Submission

  1. Changes
    - Drop all existing policies on reviews table
    - Create a permissive INSERT policy for anonymous users (anon role)
    - Allow inserting any values including approved=false
    - Keep SELECT policy for approved reviews only
    - Keep full access for authenticated admins

  2. Security
    - Anonymous users can submit reviews with any values
    - Public can only read approved reviews
    - Authenticated users have full admin access
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "public_can_insert_reviews" ON reviews;
DROP POLICY IF EXISTS "public_can_read_approved_reviews" ON reviews;
DROP POLICY IF EXISTS "authenticated_full_access_reviews" ON reviews;

-- Allow anonymous users to insert reviews with any values
CREATE POLICY "anon_can_insert_reviews" 
ON reviews 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Allow anyone to read approved reviews
CREATE POLICY "anyone_can_read_approved_reviews" 
ON reviews 
FOR SELECT 
TO anon
USING (approved = true);

-- Allow authenticated users full access for admin operations
CREATE POLICY "authenticated_users_full_access" 
ON reviews 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);