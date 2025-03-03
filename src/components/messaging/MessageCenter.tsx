import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Search, Phone, Video, Info } from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount?: number;
  propertyId?: string;
  propertyTitle?: string;
}

interface MessageCenterProps {
  currentUserId?: string;
}

const MessageCenter = ({ currentUserId = "user1" }: MessageCenterProps) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data - would come from API in real app
  const contacts: Contact[] = [
    {
      id: "landlord1",
      name: "John Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      lastMessage: "When would you like to schedule a viewing?",
      lastMessageTime: new Date(2023, 2, 15, 14, 30),
      unreadCount: 2,
      propertyId: "prop1",
      propertyTitle: "Modern Apartment with City View",
    },
    {
      id: "landlord2",
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      lastMessage: "The apartment is available from June 1st.",
      lastMessageTime: new Date(2023, 2, 14, 9, 15),
      unreadCount: 0,
      propertyId: "prop2",
      propertyTitle: "Spacious Family Home",
    },
    {
      id: "landlord3",
      name: "Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      lastMessage: "Yes, pets are allowed in this property.",
      lastMessageTime: new Date(2023, 2, 10, 16, 45),
      unreadCount: 0,
      propertyId: "prop3",
      propertyTitle: "Cozy Studio in Historic District",
    },
  ];

  const messages: Message[] = [
    {
      id: "msg1",
      senderId: "landlord1",
      receiverId: currentUserId,
      text: "Hello! I saw you're interested in the Modern Apartment with City View.",
      timestamp: new Date(2023, 2, 15, 10, 0),
      read: true,
    },
    {
      id: "msg2",
      senderId: currentUserId,
      receiverId: "landlord1",
      text: "Yes, I'm very interested! Is it still available?",
      timestamp: new Date(2023, 2, 15, 10, 5),
      read: true,
    },
    {
      id: "msg3",
      senderId: "landlord1",
      receiverId: currentUserId,
      text: "It is! Would you like to schedule a viewing?",
      timestamp: new Date(2023, 2, 15, 10, 10),
      read: true,
    },
    {
      id: "msg4",
      senderId: "landlord1",
      receiverId: currentUserId,
      text: "When would you like to schedule a viewing?",
      timestamp: new Date(2023, 2, 15, 14, 30),
      read: false,
    },
  ];

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSendMessage = () => {
    if (messageText.trim() === "" || !selectedContact) return;

    // In a real app, you would send this to your API
    console.log("Sending message to", selectedContact.name, ":", messageText);

    // Clear the input
    setMessageText("");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="h-[700px] flex rounded-lg overflow-hidden bg-white dark:bg-black/40 shadow-lg">
      {/* Contacts sidebar */}
      <div className="w-1/3 border-r border-emerald-100 dark:border-emerald-800/30 flex flex-col">
        <div className="p-4 border-b border-emerald-100 dark:border-emerald-800/30">
          <h2 className="text-xl font-semibold text-emerald-900 dark:text-emerald-50 mb-4">
            Messages
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
            <Input
              placeholder="Search conversations"
              className="pl-10 bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-4 border-b border-emerald-100 dark:border-emerald-800/30 cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors ${selectedContact?.id === contact.id ? "bg-emerald-50 dark:bg-emerald-900/20" : ""}`}
              onClick={() => setSelectedContact(contact)}
            >
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={contact.avatar} alt={contact.name} />
                  <AvatarFallback className="bg-emerald-200 text-emerald-800">
                    {contact.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-emerald-900 dark:text-emerald-50 truncate">
                      {contact.name}
                    </h3>
                    {contact.lastMessageTime && (
                      <span className="text-xs text-emerald-600 dark:text-emerald-400">
                        {formatTime(contact.lastMessageTime)}
                      </span>
                    )}
                  </div>
                  {contact.propertyTitle && (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 truncate mb-1">
                      Re: {contact.propertyTitle}
                    </p>
                  )}
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-emerald-700 dark:text-emerald-300 truncate">
                      {contact.lastMessage}
                    </p>
                    {contact.unreadCount ? (
                      <span className="ml-2 flex-shrink-0 h-5 w-5 bg-emerald-600 rounded-full text-white text-xs flex items-center justify-center">
                        {contact.unreadCount}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            <div className="p-4 border-b border-emerald-100 dark:border-emerald-800/30 flex justify-between items-center">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage
                    src={selectedContact.avatar}
                    alt={selectedContact.name}
                  />
                  <AvatarFallback className="bg-emerald-200 text-emerald-800">
                    {selectedContact.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-emerald-900 dark:text-emerald-50">
                    {selectedContact.name}
                  </h3>
                  {selectedContact.propertyTitle && (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">
                      Re: {selectedContact.propertyTitle}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Phone className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Video className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Info className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages
                .filter(
                  (msg) =>
                    (msg.senderId === selectedContact.id &&
                      msg.receiverId === currentUserId) ||
                    (msg.senderId === currentUserId &&
                      msg.receiverId === selectedContact.id),
                )
                .map((message, index, filteredMessages) => {
                  const isCurrentUser = message.senderId === currentUserId;
                  const showDate =
                    index === 0 ||
                    formatDate(filteredMessages[index - 1].timestamp) !==
                      formatDate(message.timestamp);

                  return (
                    <React.Fragment key={message.id}>
                      {showDate && (
                        <div className="flex justify-center my-4">
                          <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full">
                            {formatDate(message.timestamp)}
                          </span>
                        </div>
                      )}
                      <div
                        className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                            isCurrentUser
                              ? "bg-emerald-600 text-white rounded-tr-none"
                              : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-50 rounded-tl-none"
                          }`}
                        >
                          <p>{message.text}</p>
                          <p
                            className={`text-xs mt-1 ${isCurrentUser ? "text-emerald-100" : "text-emerald-600 dark:text-emerald-400"}`}
                          >
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
            </div>

            <div className="p-4 border-t border-emerald-100 dark:border-emerald-800/30">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  className="bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/30"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={handleSendMessage}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-4">
              <Send className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-playfair text-emerald-900 dark:text-emerald-50 mb-2">
              Your Messages
            </h3>
            <p className="text-emerald-600 dark:text-emerald-400 max-w-md">
              Select a conversation from the list to view messages. You can
              communicate directly with landlords about properties you're
              interested in.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageCenter;
