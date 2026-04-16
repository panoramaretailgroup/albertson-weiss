"use client";

import { useAuth } from "@/hooks/useAuth";
import { Menu } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import type { Notification } from "@/lib/types";

interface HeaderProps {
  breadcrumb?: string;
  notifications?: Notification[];
  onMobileMenuOpen?: () => void;
}

export default function Header({
  breadcrumb,
  notifications = [],
  onMobileMenuOpen,
}: HeaderProps) {
  const { user } = useAuth();

  const displayName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Usuario";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={onMobileMenuOpen}
          className="rounded-lg p-2 text-gray-400 hover:text-gray-600 lg:hidden"
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Breadcrumb */}
        {breadcrumb && (
          <nav className="text-sm text-gray-500">
            <span className="hidden sm:inline">Panel</span>
            <span className="hidden sm:inline text-gray-300 mx-2">/</span>
            <span className="font-medium text-gray-900">{breadcrumb}</span>
          </nav>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <NotificationDropdown notifications={notifications} />

        {/* User avatar */}
        <div className="flex items-center gap-2.5">
          <span className="hidden text-sm font-medium text-gray-700 sm:block">
            {displayName}
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-xs font-semibold text-gold">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}
