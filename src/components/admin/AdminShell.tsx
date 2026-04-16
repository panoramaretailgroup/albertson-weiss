"use client";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard,
  Car,
  DollarSign,
  Users,
  LogOut,
  X,
  Menu,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: ROUTES.admin, icon: LayoutDashboard, label: "Dashboard" },
  { href: ROUTES.adminCoches, icon: Car, label: "Coches" },
  { href: ROUTES.adminInversiones, icon: DollarSign, label: "Inversiones" },
  { href: ROUTES.adminUsuarios, icon: Users, label: "Usuarios" },
];

interface AdminShellProps {
  children: React.ReactNode;
  breadcrumb?: string;
}

export default function AdminShell({ children, breadcrumb }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const displayName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Admin";

  const handleSignOut = async () => {
    await signOut();
    router.push(ROUTES.home);
    router.refresh();
  };

  const isActive = (href: string) => {
    if (href === ROUTES.admin) return pathname === ROUTES.admin;
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <>
      {/* Logo + Admin badge */}
      <div className="px-4 pb-6 pt-2">
        <Link href={ROUTES.admin} className="flex items-center gap-2">
          <div className="flex flex-col leading-none">
            <span className="font-serif text-sm font-light tracking-[0.15em] text-gray-900">
              ALBERTSON & WEISS
            </span>
            <span className="font-serif text-[8px] font-light tracking-[0.25em] text-gold">
              MOTORS
            </span>
          </div>
        </Link>
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-gray-900 px-2 py-1">
          <Shield className="h-3 w-3 text-gold" />
          <span className="text-[10px] font-semibold tracking-wider text-gold uppercase">
            Admin
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-gray-900 text-white"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon
                className={cn("h-5 w-5", active ? "text-gold" : "text-gray-400")}
                strokeWidth={1.75}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-100 px-2 py-4">
        <Link
          href={ROUTES.panel}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors mb-1"
        >
          <LayoutDashboard className="h-4 w-4" />
          Ir al panel inversor
        </Link>
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
    <div className="min-h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-gray-200 bg-white pt-6 lg:flex">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <aside className="absolute inset-y-0 left-0 w-64 bg-white pt-6 shadow-xl animate-in slide-in-from-left duration-200">
            <div className="absolute right-3 top-3">
              <button onClick={() => setMobileOpen(false)} className="rounded-lg p-1.5 text-gray-400 hover:text-gray-600" aria-label="Cerrar">
                <X className="h-5 w-5" />
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="lg:pl-60">
        {/* Header */}
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="rounded-lg p-2 text-gray-400 hover:text-gray-600 lg:hidden" aria-label="Menú">
              <Menu className="h-5 w-5" />
            </button>
            {breadcrumb && (
              <nav className="text-sm text-gray-500">
                <span className="hidden sm:inline">Admin</span>
                <span className="hidden sm:inline text-gray-300 mx-2">/</span>
                <span className="font-medium text-gray-900">{breadcrumb}</span>
              </nav>
            )}
          </div>
          <div className="flex items-center gap-2.5">
            <span className="hidden text-sm font-medium text-gray-700 sm:block">{displayName}</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-gold">
              {displayName.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase()}
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
