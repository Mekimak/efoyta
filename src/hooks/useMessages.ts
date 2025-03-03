import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { Database } from "../types/supabase";

type Message = Database["public"]["Tables"]["messages"]["Row"];

export const useMessages = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (user) {
      fetchMessages();
      setupSubscription();
    } else {
      setMessages([]);
      setIsLoading(false);
    }

    return () => {
      // Clean up subscription
      supabase.removeAllChannels();
    };
  }, [user]);

  const fetchMessages = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from("messages")
        .select("*")
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;

      setMessages(data || []);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const setupSubscription = () => {
    if (!user) return;

    // Subscribe to new messages
    supabase
      .channel("messages-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `sender_id=eq.${user.id}:receiver_id=eq.${user.id}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => [newMessage, ...prev]);
        },
      )
      .subscribe();
  };

  const sendMessage = async (
    receiverId: string,
    content: string,
    propertyId?: string,
  ) => {
    if (!user) return { error: new Error("User not authenticated") };

    try {
      const { data, error: sendError } = await supabase
        .from("messages")
        .insert({
          sender_id: user.id,
          receiver_id: receiverId,
          content,
          property_id: propertyId,
          read: false,
        })
        .select()
        .single();

      if (sendError) throw sendError;

      // No need to update state as the subscription will handle it
      return { data, error: null };
    } catch (err) {
      console.error("Error sending message:", err);
      return { data: null, error: err as Error };
    }
  };

  const markAsRead = async (messageId: string) => {
    if (!user) return { error: new Error("User not authenticated") };

    try {
      const { error: updateError } = await supabase
        .from("messages")
        .update({ read: true })
        .eq("id", messageId)
        .eq("receiver_id", user.id);

      if (updateError) throw updateError;

      // Update local state
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, read: true } : msg,
        ),
      );

      return { error: null };
    } catch (err) {
      console.error("Error marking message as read:", err);
      return { error: err as Error };
    }
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    markAsRead,
    refresh: fetchMessages,
  };
};
