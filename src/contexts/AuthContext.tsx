import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Session, User } from "@supabase/supabase-js";

interface Profile {
  id?: string;
  user_id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  user_type?: string;
  avatar_url?: string;
  created_at?: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (
    email: string,
    password: string,
    userType?: "renter" | "host",
  ) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signInWithProvider: (provider: "github" | "google") => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (
    updates: Partial<Profile>,
  ) => Promise<{ data: any; error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      // Fetch user profile if user exists
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      // Fetch user profile if user exists
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) {
      return { data: null, error: new Error("User not authenticated") };
    }

    try {
      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("user_id", user.id)
        .select();

      if (error) throw error;

      // Update local profile state
      setProfile((prev) => (prev ? { ...prev, ...updates } : null));

      return { data, error: null };
    } catch (error) {
      console.error("Error updating profile:", error);
      return { data: null, error };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    userType?: "renter" | "host",
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_type: userType || "renter",
          },
        },
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error("Error signing up:", error);
      return { data: null, error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error("Error signing in:", error);
      return { data: null, error };
    }
  };

  const signInWithProvider = async (provider: "github" | "google") => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  };

  const value = {
    user,
    profile,
    session,
    isLoading,
    signUp,
    signIn,
    signInWithProvider,
    signOut,
    resetPassword,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
