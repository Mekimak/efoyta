-- Create properties table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL NOT NULL,
    location TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    bedrooms INTEGER NOT NULL,
    bathrooms DECIMAL NOT NULL,
    square_feet INTEGER NOT NULL,
    year_built INTEGER,
    property_type TEXT NOT NULL,
    features TEXT[] DEFAULT '{}',
    images TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'available',
    views INTEGER DEFAULT 0,
    inquiries INTEGER DEFAULT 0,
    owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Properties are viewable by everyone" 
    ON public.properties FOR SELECT USING (true);

CREATE POLICY "Properties can be inserted by authenticated users" 
    ON public.properties FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Properties can be updated by owners" 
    ON public.properties FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Properties can be deleted by owners" 
    ON public.properties FOR DELETE USING (auth.uid() = owner_id);

-- Create storage bucket for property images if it doesn't exist
CREATE OR REPLACE FUNCTION create_storage_bucket()
RETURNS void AS $$
BEGIN
    -- This is a placeholder as we can't directly create buckets in SQL
    -- The bucket will be created in the application code
    RAISE NOTICE 'Please create a storage bucket named "property-images" with public access';
END;
$$ LANGUAGE plpgsql;

SELECT create_storage_bucket();
