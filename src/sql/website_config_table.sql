-- Create website_config table for admin customization
CREATE TABLE IF NOT EXISTS public.website_config (
  id SERIAL PRIMARY KEY,
  primary_color VARCHAR(20) NOT NULL DEFAULT '#10b981',
  logo_url TEXT,
  site_title VARCHAR(100) NOT NULL DEFAULT 'Efoy',
  site_description TEXT DEFAULT 'Luxury Real Estate Platform',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default record
INSERT INTO public.website_config (id, primary_color, site_title, site_description)
VALUES (1, '#10b981', 'Efoy', 'Luxury Real Estate Platform')
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for website assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('website-assets', 'website-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for website_config
ALTER TABLE public.website_config ENABLE ROW LEVEL SECURITY;

-- Admin can read and write website config
CREATE POLICY "Admins can read website config"
  ON public.website_config
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.user_type = 'admin'
  ));

CREATE POLICY "Admins can update website config"
  ON public.website_config
  FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.user_type = 'admin'
  ));

-- Everyone can read website config
CREATE POLICY "Everyone can read website config"
  ON public.website_config
  FOR SELECT
  USING (true);
