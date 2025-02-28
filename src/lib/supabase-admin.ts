import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

// This client has admin privileges and should only be used in secure server environments
// or in Edge Functions/API routes that are properly secured
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || "";

export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  supabaseServiceKey,
);
