-- Create storage buckets with public access for development
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for avatars
CREATE POLICY "Avatar images are publicly accessible."
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Anyone can upload an avatar."
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Anyone can update their own avatar."
ON storage.objects FOR UPDATE
USING (bucket_id = 'avatars');

CREATE POLICY "Anyone can delete their own avatar."
ON storage.objects FOR DELETE
USING (bucket_id = 'avatars');

-- Set up storage policies for property images
CREATE POLICY "Property images are publicly accessible."
ON storage.objects FOR SELECT
USING (bucket_id = 'property-images');

CREATE POLICY "Anyone can upload property images."
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'property-images');

CREATE POLICY "Anyone can update their own property images."
ON storage.objects FOR UPDATE
USING (bucket_id = 'property-images');

CREATE POLICY "Anyone can delete their own property images."
ON storage.objects FOR DELETE
USING (bucket_id = 'property-images');