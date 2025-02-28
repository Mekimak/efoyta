export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          first_name: string | null;
          last_name: string | null;
          avatar_url: string | null;
          email: string | null;
          user_type: "renter" | "landlord" | "admin" | null;
        };
        Insert: {
          id: string;
          created_at?: string;
          updated_at?: string;
          first_name?: string | null;
          last_name?: string | null;
          avatar_url?: string | null;
          email?: string | null;
          user_type?: "renter" | "landlord" | "admin" | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          first_name?: string | null;
          last_name?: string | null;
          avatar_url?: string | null;
          email?: string | null;
          user_type?: "renter" | "landlord" | "admin" | null;
        };
      };
      properties: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          title: string;
          description: string;
          price: number;
          location: string;
          address: string;
          city: string;
          state: string;
          zip_code: string;
          bedrooms: number;
          bathrooms: number;
          square_feet: number;
          year_built: number | null;
          property_type: string;
          status: "available" | "pending" | "rented" | "sold";
          owner_id: string;
          images: string[];
          features: string[];
          views: number;
          inquiries: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title: string;
          description: string;
          price: number;
          location: string;
          address: string;
          city: string;
          state: string;
          zip_code: string;
          bedrooms: number;
          bathrooms: number;
          square_feet: number;
          year_built?: number | null;
          property_type: string;
          status?: "available" | "pending" | "rented" | "sold";
          owner_id: string;
          images?: string[];
          features?: string[];
          views?: number;
          inquiries?: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title?: string;
          description?: string;
          price?: number;
          location?: string;
          address?: string;
          city?: string;
          state?: string;
          zip_code?: string;
          bedrooms?: number;
          bathrooms?: number;
          square_feet?: number;
          year_built?: number | null;
          property_type?: string;
          status?: "available" | "pending" | "rented" | "sold";
          owner_id?: string;
          images?: string[];
          features?: string[];
          views?: number;
          inquiries?: number;
        };
      };
      saved_properties: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          property_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          property_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          property_id?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          created_at: string;
          sender_id: string;
          receiver_id: string;
          property_id: string | null;
          content: string;
          read: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          sender_id: string;
          receiver_id: string;
          property_id?: string | null;
          content: string;
          read?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          sender_id?: string;
          receiver_id?: string;
          property_id?: string | null;
          content?: string;
          read?: boolean;
        };
      };
      applications: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          property_id: string;
          status: "pending" | "approved" | "rejected";
          documents: string[];
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          property_id: string;
          status?: "pending" | "approved" | "rejected";
          documents?: string[];
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          property_id?: string;
          status?: "pending" | "approved" | "rejected";
          documents?: string[];
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
