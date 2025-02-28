import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/types/supabase";

type Message = Database["public"]["Tables"]["messages"]["Row"];

export function useMessages() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setMessages([]);
      setConversations([]);
      setIsLoading(false);
      return;
    }

    const fetchMessages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Get all messages where the user is either sender or receiver
        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setMessages(data || []);

        // Process conversations
        const conversationsMap = new Map();

        for (const message of data || []) {
          const otherUserId =
            message.sender_id === user.id
              ? message.receiver_id
              : message.sender_id;

          if (!conversationsMap.has(otherUserId)) {
            // Get user profile
            const { data: profileData } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", otherUserId)
              .single();

            conversationsMap.set(otherUserId, {
              id: otherUserId,
              profile: profileData,
              lastMessage: message,
              unreadCount:
                message.sender_id !== user.id && !message.read ? 1 : 0,
            });
          } else {
            const conversation = conversationsMap.get(otherUserId);
            if (message.sender_id !== user.id && !message.read) {
              conversation.unreadCount += 1;
            }
          }
        }

        setConversations(Array.from(conversationsMap.values()));
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred"),
        );
        console.error("Error fetching messages:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();

    // Set up real-time subscription
    const subscription = supabase
      .channel("messages_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `receiver_id=eq.${user.id}`,
        },
        () => {
          fetchMessages();
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const getConversationMessages = async (otherUserId: string) => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(
          `and(sender_id.eq.${user.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${user.id})`,
        )
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error("Error fetching conversation messages:", err);
      throw err;
    }
  };

  const sendMessage = async (
    receiverId: string,
    content: string,
    propertyId?: string,
  ) => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    try {
      const { data, error } = await supabase
        .from("messages")
        .insert({
          sender_id: user.id,
          receiver_id: receiverId,
          property_id: propertyId || null,
          content,
          read: false,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error("Error sending message:", err);
      throw err;
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from("messages")
        .update({ read: true })
        .eq("id", messageId);

      if (error) throw error;
    } catch (err) {
      console.error("Error marking message as read:", err);
      throw err;
    }
  };

  const markConversationAsRead = async (otherUserId: string) => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    try {
      const { error } = await supabase
        .from("messages")
        .update({ read: true })
        .eq("sender_id", otherUserId)
        .eq("receiver_id", user.id)
        .eq("read", false);

      if (error) throw error;
    } catch (err) {
      console.error("Error marking conversation as read:", err);
      throw err;
    }
  };

  return {
    messages,
    conversations,
    isLoading,
    error,
    getConversationMessages,
    sendMessage,
    markAsRead,
    markConversationAsRead,
  };
}
