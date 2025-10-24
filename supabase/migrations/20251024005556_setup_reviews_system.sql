/*
  # Système d'avis complet pour Normandie Tours

  1. Nouvelles Tables
    - `reviews` - Table principale des avis
      - `id` (uuid, primary key)
      - `tour_name` (text, required) - Nom du tour
      - `client_name` (text, required) - Nom du client
      - `client_email` (text, optional) - Email du client
      - `rating` (integer, 1-5, required) - Note du tour
      - `comment` (text, required) - Commentaire
      - `photos` (text array) - URLs des photos
      - `approved` (boolean, default false) - Statut de modération
      - `created_at` (timestamp) - Date de création
  
  2. Sécurité
    - RLS activé sur la table reviews
    - Politique permettant aux utilisateurs anonymes d'insérer des avis
    - Politique permettant à tous de lire les avis approuvés
    - Politique permettant aux utilisateurs authentifiés de tout gérer (admin)
  
  3. Storage
    - Bucket `review-photos` pour stocker les images
    - Politiques permettant l'upload public et la lecture publique
    - Gestion complète pour les administrateurs authentifiés
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

-- Créer les politiques RLS
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

-- Créer le bucket de stockage
INSERT INTO storage.buckets (id, name, public) 
VALUES ('review-photos', 'review-photos', true) 
ON CONFLICT (id) DO UPDATE SET public = true;

-- Créer les politiques de stockage
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