-- Seed data for the real estate application

-- Insert admin user
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'admin@efoy.com',
  '$2a$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12',
  NOW(),
  '{"provider":"email","providers":["email"],"user_type":"admin"}',
  '{"name":"Admin User"}'
);

-- Insert admin profile
INSERT INTO profiles (id, first_name, last_name, email, user_type)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'Admin',
  'User',
  'admin@efoy.com',
  'admin'
);

-- Insert landlord user
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'sarah.johnson@efoy.com',
  '$2a$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12',
  NOW(),
  '{"provider":"email","providers":["email"],"user_type":"landlord"}',
  '{"name":"Sarah Johnson"}'
);

-- Insert landlord profile
INSERT INTO profiles (id, first_name, last_name, email, user_type, avatar_url)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'Sarah',
  'Johnson',
  'sarah.johnson@efoy.com',
  'landlord',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
);

-- Insert renter user
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  'john.doe@efoy.com',
  '$2a$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12',
  NOW(),
  '{"provider":"email","providers":["email"],"user_type":"renter"}',
  '{"name":"John Doe"}'
);

-- Insert renter profile
INSERT INTO profiles (id, first_name, last_name, email, user_type, avatar_url)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  'John',
  'Doe',
  'john.doe@efoy.com',
  'renter',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
);

-- Insert properties
INSERT INTO properties (title, description, price, location, address, city, state, zip_code, bedrooms, bathrooms, square_feet, year_built, property_type, status, owner_id, images, features)
VALUES (
  'Luxury Villa with Ocean View',
  'Experience the epitome of luxury living in this stunning oceanfront villa. Featuring panoramic views, a private infinity pool, and meticulously designed interiors. This property offers the perfect blend of comfort, style, and sophistication.',
  2500000,
  'Beverly Hills, CA',
  '123 Luxury Lane',
  'Beverly Hills',
  'CA',
  '90210',
  5,
  4,
  4500,
  2020,
  'villa',
  'available',
  '11111111-1111-1111-1111-111111111111',
  ARRAY['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80'],
  ARRAY['Infinity Pool', 'Ocean View', 'Smart Home System', 'Home Theater', 'Wine Cellar', 'Gourmet Kitchen', 'Spa Bathroom', 'Outdoor Kitchen', 'Fireplace', 'Walk-in Closets', 'Security System', 'Gym']
);

INSERT INTO properties (title, description, price, location, address, city, state, zip_code, bedrooms, bathrooms, square_feet, year_built, property_type, status, owner_id, images, features)
VALUES (
  'Modern Apartment with City View',
  'Stunning modern apartment in the heart of downtown with breathtaking city views. Features high-end finishes, floor-to-ceiling windows, and an open concept layout perfect for entertaining.',
  1200000,
  'Downtown, New York, NY',
  '456 Skyline Ave',
  'New York',
  'NY',
  '10001',
  2,
  2,
  1800,
  2018,
  'apartment',
  'available',
  '11111111-1111-1111-1111-111111111111',
  ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80'],
  ARRAY['City View', 'Concierge Service', 'Fitness Center', 'Rooftop Terrace', 'Smart Home Features', 'Hardwood Floors', 'Stainless Steel Appliances']
);

INSERT INTO properties (title, description, price, location, address, city, state, zip_code, bedrooms, bathrooms, square_feet, year_built, property_type, status, owner_id, images, features)
VALUES (
  'Spacious Family Home',
  'Beautiful family home in a quiet suburban neighborhood. Features a large backyard, updated kitchen, and plenty of space for the whole family. Close to excellent schools and parks.',
  850000,
  'Suburban Ave, Chicago, IL',
  '789 Maple Street',
  'Chicago',
  'IL',
  '60007',
  4,
  3,
  3200,
  2010,
  'house',
  'available',
  '11111111-1111-1111-1111-111111111111',
  ARRAY['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop&q=80'],
  ARRAY['Large Backyard', 'Updated Kitchen', 'Finished Basement', 'Two-Car Garage', 'Patio', 'Fireplace', 'Central Air']
);

-- Insert saved properties
INSERT INTO saved_properties (user_id, property_id)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  (SELECT id FROM properties WHERE title = 'Luxury Villa with Ocean View')
);

-- Insert messages
INSERT INTO messages (sender_id, receiver_id, property_id, content, read)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  '11111111-1111-1111-1111-111111111111',
  (SELECT id FROM properties WHERE title = 'Modern Apartment with City View'),
  'I''m interested in scheduling a viewing for this apartment. Is it available this weekend?',
  TRUE
);

INSERT INTO messages (sender_id, receiver_id, property_id, content, read)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  (SELECT id FROM properties WHERE title = 'Modern Apartment with City View'),
  'Yes, the apartment is available for viewing this Saturday at 2 PM. Would that work for you?',
  FALSE
);

-- Insert applications
INSERT INTO applications (user_id, property_id, status, documents)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  (SELECT id FROM properties WHERE title = 'Modern Apartment with City View'),
  'pending',
  ARRAY['ID.pdf', 'ProofOfIncome.pdf', 'RentalHistory.pdf']
);
