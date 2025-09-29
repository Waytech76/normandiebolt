/*
  # Create reviews system

  1. New Tables
    - `reviews`
      - `id` (uuid, primary key)
      - `tour_name` (text)
      - `client_name` (text)
      - `client_email` (text)
      - `rating` (integer, 1-5)
      - `comment` (text)
      - `photos` (text array for photo URLs)
      - `approved` (boolean, default false)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `reviews` table
    - Add policy for public insert (clients can submit reviews)
    - Add policy for authenticated read (admin can view all reviews)
*/

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_name text NOT NULL,
  client_name text NOT NULL,
  client_email text,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  photos text[] DEFAULT '{}',
  approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert reviews (for clients)
CREATE POLICY "Anyone can submit reviews"
  ON reviews
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow public to read approved reviews
CREATE POLICY "Anyone can read approved reviews"
  ON reviews
  FOR SELECT
  TO anon
  USING (approved = true);

-- Allow authenticated users to read all reviews (for admin)
CREATE POLICY "Authenticated users can read all reviews"
  ON reviews
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update reviews (for admin approval)
CREATE POLICY "Authenticated users can update reviews"
  ON reviews
  FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated users to delete reviews (for admin)
CREATE POLICY "Authenticated users can delete reviews"
  ON reviews
  FOR DELETE
  TO authenticated
  USING (true);