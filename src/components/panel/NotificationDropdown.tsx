"use client";

import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { Bell, TrendingUp, Info, Flag, DollarSign } from "lucide-react";
import type { Notification, NotificationType } from "@/lib/types";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface NotificationDropdownProps {
  notifications: Notification[];
}

const typeIcons: Record<NotificationType, typeof Info> = {
  info: Info,
  update: Flag,
  milestone: TrendingUp,
  return: DollarSign,
};

const typeColors: Record<NotificationType, string> = {
  info: "text-blue-500 bg-blue-50",
  update: "text-gold bg-gold/10",
  milestone: "text-green bg-green/10",
  return: "text-green bg-green/10",
};

export default function NotificationDropdown({
  notifications,
}: NotificationDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600"
        aria-label={`Notificaciones${unreadCount > 0 ? ` (${unreadCount} sin leer)` : ""}`}
      >
        <Bell className="h-5 w-5" strokeWidth={1.75} />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg sm:w-96">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <h3 className="text-sm font-semibold text-gray-900">
              Notificaciones
            </h3>
            {unreadCount > 0 && (
              <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">
                {unreadCount} nuevas
              </span>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.slice(0, 8).map((notification) => {
                const Icon = typeIcons[notification.type];
                const colorClass = typeColors[notification.type];

                return (
                  <div
                    key={notification.id}
                    className={cn(
                      "flex gap-3 border-b border-gray-50 px-4 py-3 transition-colors hover:bg-gray-50",
                      !notification.read && "bg-gold/[0.03]"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                        colorClass
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={cn(
                          "text-sm",
                          notification.read
                            ? "text-gray-600"
                            : "font-medium text-gray-900"
                        )}
                      >
                        {notification.title}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-400 truncate">
                        {notification.message}
                      </p>
                      <p className="mt-1 text-[10px] text-gray-400">
                        {formatRelativeTime(notification.created_at)}
                      </p>
                    </div>
                    {!notification.read && (
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                    )}
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-8 text-center">
                <Bell className="mx-auto h-8 w-8 text-gray-200" />
                <p className="mt-2 text-sm text-gray-400">
                  No tienes notificaciones
                </p>
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="border-t border-gray-100 px-4 py-3">
              <Link
                href={ROUTES.panelNotificaciones}
                onClick={() => setOpen(false)}
                className="block text-center text-sm font-medium text-gold hover:text-gold/80 transition-colors"
              >
                Ver todas las notificaciones
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
