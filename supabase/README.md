# Efoy Real Estate Supabase Backend

This directory contains the Supabase configuration for the Efoy Real Estate application.

## Database Schema

The database schema is defined in `migrations/20240101000000_initial_schema.sql`. It includes the following tables:

- `profiles`: User profiles with user type (renter, landlord, admin)
- `properties`: Property listings with details
- `saved_properties`: Properties saved by users
- `messages`: Messages between users
- `applications`: Rental applications

## Edge Functions

The following Edge Functions are available:

- `auth-webhook`: Handles user creation events
- `increment-views`: Increments the view count for a property
- `search-properties`: Advanced property search
- `submit-application`: Submit a rental application
- `update-application-status`: Update the status of an application
- `upload-property-image`: Upload and attach an image to a property

## Local Development

1. Start the Supabase local development environment:

```bash
supabase start
```

2. Apply migrations:

```bash
supabase db reset
```

3. Seed the database:

```bash
supabase db reset
```

## Deployment

To deploy to your Supabase project:

```bash
supabase link --project-ref your-project-ref
supabase db push
```

To deploy Edge Functions:

```bash
supabase functions deploy auth-webhook
supabase functions deploy increment-views
supabase functions deploy search-properties
supabase functions deploy submit-application
supabase functions deploy update-application-status
supabase functions deploy upload-property-image
```

## Storage

Create the following storage buckets:

- `property-images`: For property images
- `documents`: For application documents
- `avatars`: For user profile pictures

Make sure to set appropriate permissions for each bucket.
