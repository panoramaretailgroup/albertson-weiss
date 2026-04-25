"use client";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { useAuth } from "@/hooks/useAuth";
import Logo from "@/components/ui/Logo";
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
      <div className="px-6 pt-2 pb-8 flex justify-center">
        <Link href={ROUTES.home} aria-label="Albertson & Weiss Motors — Inicio">
          <Logo variant="dark" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 px-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const isNotifications = item.href === ROUTES.panelNotificaciones;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={cn(
                "group relative flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "text-white"
                  : "text-white/50 hover:text-white"
              )}
            >
              {active && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[2px] bg-amber"
                  aria-hidden="true"
                />
              )}
              <item.icon
                className={cn(
                  "h-[18px] w-[18px] shrink-0",
                  active ? "text-amber" : "text-white/40 group-hover:text-white/70"
                )}
                strokeWidth={1.75}
              />
              <span className="flex-1">{item.label}</span>
              {isNotifications && unreadCount > 0 && (
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-amber px-1.5 text-[10px] font-semibold text-black">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="border-t border-white/10 px-2 py-4">
        <button
          onClick={handleSignOut}
          className="group flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-white/50 transition-colors hover:text-white"
        >
          <LogOut
            className="h-[18px] w-[18px] text-white/40 group-hover:text-white/70"
            strokeWidth={1.75}
          />
          Cerrar sesión
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col bg-black pt-8 lg:flex">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={onMobileClose}
            aria-hidden="true"
          />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col bg-black pt-8 animate-in slide-in-from-left duration-200">
            <button
              onClick={onMobileClose}
              className="absolute right-3 top-3 rounded-lg p-1.5 text-white/60 hover:text-white"
              aria-label="Cerrar menú"
            >
              <X className="h-5 w-5" />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Mobile bottom tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-30 bg-black lg:hidden">
        <div className="flex items-center justify-around">
          {navItems.slice(0, 5).map((item) => {
            const active = isActive(item.href);
            const isNotifications = item.href === ROUTES.panelNotificaciones;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center gap-0.5 px-3 py-3 text-[10px] transition-colors",
                  active ? "text-white" : "text-white/40"
                )}
              >
                {active && (
                  <span
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-8 bg-amber"
                    aria-hidden="true"
                  />
                )}
                <item.icon
                  className={cn("h-5 w-5", active && "text-amber")}
                  strokeWidth={1.75}
                />
                <span>{item.label}</span>
                {isNotifications && unreadCount > 0 && (
                  <span className="absolute right-1 top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-amber px-1 text-[9px] font-bold text-black">
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
