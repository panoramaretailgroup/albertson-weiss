"use client";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard,
  Search,
  TrendingUp,
  CheckCircle,
  Bell,
  User,
  LogOut,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface SidebarProps {
  unreadCount?: number;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const navItems = [
  { href: ROUTES.panel, icon: LayoutDashboard, label: "Dashboard" },
  { href: ROUTES.panelOportunidades, icon: Search, label: "Oportunidades" },
  { href: ROUTES.panelActivas, icon: TrendingUp, label: "Activas" },
  { href: ROUTES.panelCompletadas, icon: CheckCircle, label: "Completadas" },
  { href: ROUTES.panelNotificaciones, icon: Bell, label: "Notificaciones" },
  { href: ROUTES.panelPerfil, icon: User, label: "Mi perfil" },
];

export default function Sidebar({
  unreadCount = 0,
  mobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push(ROUTES.home);
    router.refresh();
  };

  const isActive = (href: string) => {
    if (href === ROUTES.panel) return pathname === ROUTES.panel;
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="px-4 pb-6 pt-2">
        <Link href={ROUTES.home} className="flex flex-col leading-none">
          <span className="font-serif text-sm font-light tracking-[0.15em] text-gray-900">
            ALBERTSON & WEISS
          </span>
          <span className="font-serif text-[8px] font-light tracking-[0.25em] text-gold">
            MOTORS
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const isNotifications = item.href === ROUTES.panelNotificaciones;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-gold/10 text-gray-900"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5",
                  active ? "text-gold" : "text-gray-400"
                )}
                strokeWidth={1.75}
              />
              <span className="flex-1">{item.label}</span>
              {isNotifications && unreadCount > 0 && (
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
              {active && (
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="border-t border-gray-100 px-2 py-4">
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
        >
          <LogOut className="h-5 w-5 text-gray-400" strokeWidth={1.75} />
          Cerrar sesión
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-gray-200 bg-white pt-6 lg:flex">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={onMobileClose}
            aria-hidden="true"
          />
          <aside className="absolute inset-y-0 left-0 w-64 bg-white pt-6 shadow-xl animate-in slide-in-from-left duration-200">
            <div className="absolute right-3 top-3">
              <button
                onClick={onMobileClose}
                className="rounded-lg p-1.5 text-gray-400 hover:text-gray-600"
                aria-label="Cerrar menú"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Mobile bottom tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-gray-200 bg-white lg:hidden">
        <div className="flex items-center justify-around py-1">
          {navItems.slice(0, 5).map((item) => {
            const active = isActive(item.href);
            const isNotifications = item.href === ROUTES.panelNotificaciones;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center gap-0.5 px-3 py-2 text-[10px]",
                  active ? "text-gold" : "text-gray-400"
                )}
              >
                <item.icon className="h-5 w-5" strokeWidth={1.75} />
                <span>{item.label}</span>
                {isNotifications && unreadCount > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
