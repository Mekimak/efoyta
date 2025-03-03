import React from "react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { Button } from "../ui/button";
import {
  Home,
  Building2,
  Heart,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const navItems = [
    { icon: Home, label: "Overview", href: "/dashboard" },
    { icon: Heart, label: "Saved Properties", href: "/dashboard/saved" },
    { icon: MessageSquare, label: "Messages", href: "/messages" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-black">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen transition-transform",
          isSidebarOpen ? "w-64" : "w-16",
          !isSidebarOpen && "-translate-x-48",
        )}
      >
        <div className="h-full px-3 py-4 bg-white dark:bg-black/60 dark:backdrop-blur-sm dark:shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)] border-r border-emerald-100 dark:border-emerald-800">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className={cn(
                "text-xl font-playfair text-emerald-800 dark:text-emerald-50",
                !isSidebarOpen && "hidden",
              )}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center text-white font-playfair text-xl">
                  E
                </div>
                <span className="font-playfair text-2xl bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                  Efoy
                </span>
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="rounded-full"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  location.pathname === item.href
                    ? "bg-emerald-100 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-50"
                    : "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className={cn("text-sm", !isSidebarOpen && "hidden")}>
                  {item.label}
                </span>
              </Link>
            ))}

            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 mt-8 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20",
                !isSidebarOpen && "justify-center",
              )}
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = "/login";
              }}
            >
              <LogOut className="h-5 w-5" />
              <span className={cn(!isSidebarOpen && "hidden")}>Sign Out</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={cn(
          "transition-all duration-300",
          isSidebarOpen ? "ml-64" : "ml-16",
        )}
      >
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
