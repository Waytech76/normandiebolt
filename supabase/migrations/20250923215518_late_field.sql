/*
  # Système d'avis complet pour Normandie Tours

  1. Nouvelles Tables
    - `reviews` - Table principale des avis avec toutes les colonnes nécessaires
    - Colonnes: id, tour_name, client_name, client_email, rating, comment, photos, approved, created_at
  
  2. Sécurité
    - RLS activé sur la table reviews
    - Politique permettant à tous d'insérer des avis (anon et authenticated)
    - Politique permettant à tous de lire les avis approuvés
    - Politique permettant aux utilisateurs authentifiés de tout gérer
  
  3. Storage
    - Bucket review-photos pour stocker les images
    - Politiques permettant l'upload et la lecture publique
*/

-- Supprimer la table existante si elle existe
DROP TABLE IF EXISTS public.reviews CASCADE;

-- Créer la table reviews
CREATE TABLE public.reviews (
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

-- Activer RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Supprimer toutes les politiques existantes
DROP POLICY IF EXISTS "Anyone can submit reviews" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can read approved reviews" ON public.reviews;
DROP POLICY IF EXISTS "Authenticated users can manage reviews" ON public.reviews;
DROP POLICY IF EXISTS "anon_can_insert_reviews" ON public.reviews;
DROP POLICY IF EXISTS "anon_can_read_approved_reviews" ON public.reviews;
DROP POLICY IF EXISTS "authenticated_can_read_all_reviews" ON public.reviews;
DROP POLICY IF EXISTS "authenticated_can_update_reviews" ON public.reviews;
DROP POLICY IF EXISTS "authenticated_can_delete_reviews" ON public.reviews;

-- Créer les nouvelles politiques
CREATE POLICY "Public can insert reviews"
  ON public.reviews
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can read approved reviews"
  ON public.reviews
  FOR SELECT
  TO public
  USING (approved = true);

CREATE POLICY "Authenticated can read all reviews"
  ON public.reviews
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can update reviews"
  ON public.reviews
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete reviews"
  ON public.reviews
  FOR DELETE
  TO authenticated
  USING (true);

-- Créer le bucket de stockage s'il n'existe pas
INSERT INTO storage.buckets (id, name, public)
VALUES ('review-photos', 'review-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Supprimer les politiques de stockage existantes
DROP POLICY IF EXISTS "Public can upload review photos" ON storage.objects;
DROP POLICY IF EXISTS "Public can view review photos" ON storage.objects;

-- Créer les politiques de stockage
CREATE POLICY "Public can upload review photos"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'review-photos');

CREATE POLICY "Public can view review photos"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'review-photos');