import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Bell, User, LogOut, Settings, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LandlordHeaderProps {
  onMenuToggle?: () => void;
  isSidebarOpen?: boolean;
}

const LandlordHeader = ({
  onMenuToggle,
  isSidebarOpen = true,
}: LandlordHeaderProps) => {
  const [notifications, setNotifications] = useState(3);

  return (
    <header className="sticky top-0 z-30 w-full bg-white dark:bg-black/60 backdrop-blur-sm border-b border-emerald-100 dark:border-emerald-800/30 shadow-sm">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="mr-2 lg:hidden rounded-full"
          >
            {isSidebarOpen ? (
              <X className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
            ) : (
              <Menu className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
            )}
          </Button>

          <Link to="/" className="flex items-center gap-2 mr-6">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center text-white font-playfair text-xl">
              E
            </div>
            <span className="font-playfair text-2xl bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent hidden md:inline">
              Efoy
            </span>
          </Link>

          <div className="hidden md:block">
            <h1 className="text-xl font-playfair text-emerald-900 dark:text-emerald-50">
              Landlord Dashboard
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full"
              >
                <Bell className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white">
                    {notifications}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-4">
                <h3 className="font-medium text-emerald-900 dark:text-emerald-50 mb-2">
                  Notifications
                </h3>
                <div className="space-y-2">
                  <div className="p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                    <p className="text-sm text-emerald-900 dark:text-emerald-50">
                      New application received for Modern Apartment
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">
                      2 minutes ago
                    </p>
                  </div>
                  <div className="p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                    <p className="text-sm text-emerald-900 dark:text-emerald-50">
                      Message from John Doe about Spacious Family Home
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">
                      1 hour ago
                    </p>
                  </div>
                  <div className="p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                    <p className="text-sm text-emerald-900 dark:text-emerald-50">
                      Rent payment received for Cozy Studio
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">
                      Yesterday
                    </p>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
                    alt="Michael Chen"
                  />
                  <AvatarFallback className="bg-emerald-200 text-emerald-800">
                    MC
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center gap-2 p-2">
                <div className="flex-shrink-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
                      alt="Michael Chen"
                    />
                    <AvatarFallback className="bg-emerald-200 text-emerald-800">
                      MC
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <p className="text-sm font-medium text-emerald-900 dark:text-emerald-50">
                    Michael Chen
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">
                    michael.c@example.com
                  </p>
                </div>
              </div>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default LandlordHeader;
