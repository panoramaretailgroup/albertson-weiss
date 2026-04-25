"use client";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import Logo from "@/components/ui/Logo";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { label: "Inversiones", href: "#investments" },
  { label: "Cómo funciona", href: "#how" },
  { label: "Sobre nosotros", href: ROUTES.sobreNosotros },
  { label: "FAQ", href: ROUTES.faq },
  { label: "Contacto", href: ROUTES.registro },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-[100] bg-black border-b border-white/[0.06]">
        <div className="mx-auto flex h-[72px] max-w-shell items-center justify-between px-6 sm:px-10 lg:px-[72px]">
          {/* Logo — left */}
          <Link href={ROUTES.home} aria-label="Albertson & Weiss Motors — Inicio">
            <Logo variant="dark" />
          </Link>

          {/* Links — center (desktop only) */}
          <div className="hidden lg:flex gap-10">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-sans font-normal text-[10px] uppercase tracking-[0.2em] text-muted transition-colors duration-200 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA — right (desktop) */}
          <Link
            href={ROUTES.login}
            className={cn(
              "hidden lg:inline-flex items-center justify-center",
              "font-sans font-normal text-[10px] uppercase tracking-[0.22em]",
              "border border-white/30 text-white px-5 py-2",
              "transition-all duration-200 hover:bg-white hover:text-black"
            )}
          >
            Acceso inversores
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-white p-2"
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[200] lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-black border-l border-white/10 p-6 animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between">
              <Logo variant="dark" />
              <button
                onClick={() => setMobileOpen(false)}
                className="text-white p-2"
                aria-label="Cerrar menú"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-10 flex flex-col">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-white/[0.06] py-5 font-sans font-normal text-[11px] uppercase tracking-[0.2em] text-muted hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <Link
              href={ROUTES.login}
              onClick={() => setMobileOpen(false)}
              className="mt-10 block text-center font-sans font-normal text-[10px] uppercase tracking-[0.22em] text-white border border-white/30 px-5 py-3 transition-all duration-200 hover:bg-white hover:text-black"
            >
              Acceso inversores
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
