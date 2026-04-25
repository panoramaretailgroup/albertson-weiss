"use client";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { useAuth } from "@/hooks/useAuth";
import Logo from "@/components/ui/Logo";
import type { Notification } from "@/lib/types";
import { Bell, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface PanelNavProps {
  notifications?: Notification[];
  unreadCount?: number;
}

const navLinks = [
  { href: ROUTES.panel, label: "Dashboard" },
  { href: ROUTES.panelOportunidades, label: "Oportunidades" },
  { href: ROUTES.panelActivas, label: "Activas" },
  { href: ROUTES.panelCompletadas, label: "Completadas" },
  { href: ROUTES.panelNotificaciones, label: "Notificaciones" },
];

/**
 * Single-line editorial top navbar for the investor panel.
 * Replaces the old left Sidebar + top Header combo.
 *
 *   [ A&W ]     Dashboard · Oportunidades · Activas · …     🔔  [ JR ] NOMBRE ▾
 */
export default function PanelNav({ unreadCount = 0 }: PanelNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const displayName =
    (user?.user_metadata?.full_name as string | undefined) ||
    user?.email?.split("@")[0] ||
    "Inversor";

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const isActive = (href: string) => {
    if (href === ROUTES.panel) return pathname === ROUTES.panel;
    return pathname.startsWith(href);
  };

  // Close user menu on outside click / Escape
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch {
      // ignore
    }
    router.push(ROUTES.home);
    router.refresh();
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-black border-b border-white/[0.06] h-[72px]">
        <div className="max-w-[1600px] mx-auto h-full px-6 sm:px-10 lg:px-14 flex items-center justify-between">
          {/* LEFT — Logo */}
          <Link
            href={ROUTES.home}
            aria-label="Albertson & Weiss Motors — Inicio"
          >
            <Logo variant="dark" />
          </Link>

          {/* CENTER — Nav links (desktop only) */}
          <div className="hidden lg:flex gap-10 h-full items-stretch">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative flex items-center font-sans font-normal text-[10px] uppercase tracking-[0.22em] transition-colors py-[26px]",
                    active ? "text-white" : "text-white/50 hover:text-white"
                  )}
                >
                  {link.label}
                  {active && (
                    <span
                      className="absolute bottom-[-1px] left-0 right-0 h-px bg-white"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* RIGHT — actions */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Bell (desktop only — on mobile notifications is reachable via menu) */}
            <Link
              href={ROUTES.panelNotificaciones}
              className="relative hidden lg:inline-flex p-2 -m-2 text-white/50 hover:text-white transition-colors"
              aria-label={`Notificaciones${
                unreadCount > 0 ? ` (${unreadCount} sin leer)` : ""
              }`}
            >
              <Bell className="h-4 w-4" strokeWidth={1.5} />
              {unreadCount > 0 && (
                <span
                  className="absolute top-0.5 right-0.5 w-[5px] h-[5px] rounded-full bg-amber"
                  aria-hidden="true"
                />
              )}
            </Link>

            {/* User chip (desktop only) */}
            <div ref={userMenuRef} className="relative hidden lg:block">
              <button
                type="button"
                onClick={() => setUserMenuOpen((o) => !o)}
                className="flex items-center gap-2.5 cursor-pointer"
                aria-expanded={userMenuOpen}
                aria-haspopup="menu"
                aria-label="Menú de usuario"
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] tracking-[0.1em] font-normal"
                  style={{
                    background:
                      "linear-gradient(135deg, #3a332b 0%, #1f1b17 100%)",
                  }}
                >
                  {initials}
                </div>
                <span className="text-white/50 text-[10px] tracking-[0.2em] uppercase font-normal">
                  {displayName}
                </span>
              </button>

              {userMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-3 w-52 bg-black border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.4)] overflow-hidden"
                >
                  <Link
                    href={ROUTES.panelPerfil}
                    onClick={() => setUserMenuOpen(false)}
                    role="menuitem"
                    className="block px-4 py-3 font-sans text-[10px] uppercase tracking-[0.22em] text-white/60 hover:text-white hover:bg-white/[0.03] transition-colors"
                  >
                    Mi perfil
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    role="menuitem"
                    className="block w-full text-left px-4 py-3 border-t border-white/[0.06] font-sans text-[10px] uppercase tracking-[0.22em] text-white/60 hover:text-white hover:bg-white/[0.03] transition-colors"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="relative lg:hidden text-white p-2 -m-2"
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
              {unreadCount > 0 && (
                <span
                  className="absolute top-1 right-1 w-[5px] h-[5px] rounded-full bg-amber"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside className="absolute inset-y-0 right-0 w-full max-w-sm bg-black flex flex-col animate-in slide-in-from-right duration-200">
            {/* Header row */}
            <div className="flex items-center justify-between h-[72px] px-6 border-b border-white/[0.06]">
              <Logo variant="dark" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="text-white/70 hover:text-white p-2 -m-2"
                aria-label="Cerrar menú"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 flex flex-col overflow-y-auto">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                const isNotifs = link.href === ROUTES.panelNotificaciones;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "relative flex items-center justify-between border-b border-white/[0.06] py-5 px-6",
                      "font-sans font-normal text-[11px] uppercase tracking-[0.22em] transition-colors",
                      active ? "text-white" : "text-white/50 hover:text-white"
                    )}
                  >
                    <span>{link.label}</span>
                    {isNotifs && unreadCount > 0 && (
                      <span className="num min-w-[22px] text-center text-[10px] bg-amber text-black px-1.5 py-0.5">
                        {unreadCount > 99 ? "99+" : unreadCount}
                      </span>
                    )}
                  </Link>
                );
              })}
              <Link
                href={ROUTES.panelPerfil}
                onClick={() => setMobileOpen(false)}
                className="border-b border-white/[0.06] py-5 px-6 font-sans font-normal text-[11px] uppercase tracking-[0.22em] text-white/50 hover:text-white transition-colors"
              >
                Mi perfil
              </Link>
            </nav>

            {/* Footer: user + sign out */}
            <div className="border-t border-white/[0.06] p-6">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] tracking-[0.1em] font-normal"
                  style={{
                    background:
                      "linear-gradient(135deg, #3a332b 0%, #1f1b17 100%)",
                  }}
                >
                  {initials}
                </div>
                <span className="text-white/70 text-[12px] font-light truncate">
                  {displayName}
                </span>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="block w-full text-left font-sans text-[10px] uppercase tracking-[0.22em] text-white/50 hover:text-white transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
