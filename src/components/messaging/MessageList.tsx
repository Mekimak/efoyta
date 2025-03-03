import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useMessages } from "@/hooks/useMessages";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Send, User, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Message {
  id: string;
  created_at: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read: boolean;
  property_id?: string | null;
}

interface Profile {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  avatar_url?: string | null;
  email?: string | null;
  user_type?: "renter" | "landlord" | "admin" | null;
}

const MessageList = () => {
  const { user, profile } = useAuth();
  const { messages, sendMessage, markAsRead, refresh } = useMessages();
  const [newMessage, setNewMessage] = useState("");
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [contacts, setContacts] = useState<Profile[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [contactProfiles, setContactProfiles] = useState<
    Record<string, Profile>
  >({});

  useEffect(() => {
    if (user) {
      fetchContacts();
      fetchMessages();
    }
  }, [user]);

  useEffect(() => {
    if (messages.length > 0 && contacts.length > 0 && !selectedContact) {
      setSelectedContact(contacts[0].id);
    }
  }, [messages, contacts, selectedContact]);

  const fetchContacts = async () => {
    try {
      if (!user || !profile) return;

      let query;

      // If user is a renter, fetch landlords
      if (profile.user_type === "renter") {
        query = supabase
          .from("profiles")
          .select("*")
          .eq("user_type", "landlord");
      }
      // If user is a landlord, fetch renters who have messaged them
      else if (profile.user_type === "landlord") {
        // First get unique user IDs from messages
        const { data: messageData } = await supabase
          .from("messages")
          .select("sender_id, receiver_id")
          .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`);

        if (messageData && messageData.length > 0) {
          // Extract unique user IDs that are not the current user
          const uniqueUserIds = [
            ...new Set(
              messageData
                .flatMap((msg) => [
                  msg.sender_id !== user.id ? msg.sender_id : null,
                  msg.receiver_id !== user.id ? msg.receiver_id : null,
                ])
                .filter(Boolean),
            ),
          ] as string[];

          if (uniqueUserIds.length > 0) {
            query = supabase
              .from("profiles")
              .select("*")
              .in("id", uniqueUserIds);
          } else {
            setContacts([]);
            return;
          }
        } else {
          setContacts([]);
          return;
        }
      }

      if (query) {
        const { data, error } = await query;
        if (error) throw error;
        setContacts(data || []);

        // Create a map of user IDs to profiles for quick lookup
        const profileMap: Record<string, Profile> = {};
        data?.forEach((profile) => {
          profileMap[profile.id] = profile;
        });
        setContactProfiles(profileMap);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const fetchMessages = async () => {
    if (refresh) {
      await refresh();
    }
  };

  const handleSendMessage = async () => {
    if (!user || !selectedContact || !newMessage.trim()) return;

    setIsSending(true);
    try {
      await sendMessage(selectedContact, newMessage);
      setNewMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const getFilteredMessages = () => {
    if (!selectedContact) return [];

    return messages
      .filter(
        (msg) =>
          (msg.sender_id === user?.id && msg.receiver_id === selectedContact) ||
          (msg.sender_id === selectedContact && msg.receiver_id === user?.id),
      )
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      );
  };

  const getContactName = (contactId: string) => {
    const contact = contactProfiles[contactId];
    if (!contact) return "Unknown";
    return contact.first_name && contact.last_name
      ? `${contact.first_name} ${contact.last_name}`
      : contact.email?.split("@")[0] || "Unknown";
  };

  const getInitials = (contactId: string) => {
    const contact = contactProfiles[contactId];
    if (!contact) return "?";
    if (contact.first_name && contact.last_name) {
      return `${contact.first_name[0]}${contact.last_name[0]}`;
    }
    return contact.email && contact.email[0]
      ? contact.email[0].toUpperCase()
      : "?";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const filteredMessages = getFilteredMessages();

  return (
    <div className="flex h-[calc(100vh-200px)] bg-white dark:bg-black/40 rounded-lg overflow-hidden shadow-lg dark:shadow-[0_0_30px_rgba(16,185,129,0.1)]">
      {/* Contacts sidebar */}
      <div className="w-1/4 border-r border-emerald-100 dark:border-emerald-800/30 overflow-y-auto">
        <div className="p-4 border-b border-emerald-100 dark:border-emerald-800/30">
          <h2 className="font-medium text-emerald-900 dark:text-emerald-50">
            Contacts
          </h2>
        </div>
        <div className="divide-y divide-emerald-100 dark:divide-emerald-800/30">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-4 cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors ${selectedContact === contact.id ? "bg-emerald-50 dark:bg-emerald-900/30" : ""}`}
              onClick={() => setSelectedContact(contact.id)}
            >
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={contact.avatar_url || undefined} />
                  <AvatarFallback className="bg-emerald-200 text-emerald-800">
                    {getInitials(contact.id)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-emerald-900 dark:text-emerald-50">
                    {contact.first_name} {contact.last_name}
                  </p>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">
                    {contact.user_type === "landlord" ? "Landlord" : "Renter"}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {contacts.length === 0 && (
            <div className="p-4 text-center text-emerald-600 dark:text-emerald-400">
              No contacts found
            </div>
          )}
        </div>
      </div>

      {/* Message area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Contact header */}
            <div className="p-4 border-b border-emerald-100 dark:border-emerald-800/30 flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage
                  src={
                    contactProfiles[selectedContact]?.avatar_url || undefined
                  }
                />
                <AvatarFallback className="bg-emerald-200 text-emerald-800">
                  {getInitials(selectedContact)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-emerald-900 dark:text-emerald-50">
                  {getContactName(selectedContact)}
                </p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  {contactProfiles[selectedContact]?.user_type === "landlord"
                    ? "Landlord"
                    : "Renter"}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender_id === user?.id ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] ${
                        message.sender_id === user?.id
                          ? "bg-emerald-600 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg"
                          : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-50 rounded-tl-lg rounded-tr-lg rounded-br-lg"
                      } p-3 shadow-sm`}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs mt-1 opacity-70 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(message.created_at)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-emerald-600 dark:text-emerald-400 text-center">
                    No messages yet. Start a conversation!
                  </p>
                </div>
              )}
            </div>

            {/* Message input */}
            <div className="p-4 border-t border-emerald-100 dark:border-emerald-800/30">
              <div className="flex space-x-2">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 min-h-[80px] bg-white/50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800 focus-visible:ring-emerald-500"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white self-end"
                  disabled={isSending || !newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-emerald-600 dark:text-emerald-400 text-center">
              Select a contact to start messaging
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageList;
