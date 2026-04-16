"use client";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Cómo funciona", href: ROUTES.comoFunciona },
  { label: "Oportunidades", href: ROUTES.oportunidades },
  { label: "Track Record", href: ROUTES.trackRecord },
  { label: "Sobre nosotros", href: ROUTES.sobreNosotros },
  { label: "FAQ", href: ROUTES.faq },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-black/95 backdrop-blur-md border-b border-gold/10"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href={ROUTES.home} className="flex flex-col leading-none">
            <span className="font-serif text-xl font-light tracking-[0.2em] text-cream">
              ALBERTSON & WEISS
            </span>
            <span className="font-serif text-[10px] font-light tracking-[0.35em] text-gold">
              MOTORS
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-cream/70 transition-colors hover:text-cream"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href={ROUTES.login}
              className="rounded-md border border-gold/50 px-4 py-2 text-sm text-gold transition-colors hover:border-gold hover:bg-gold/10"
            >
              Acceso inversores
            </Link>
            <Link
              href={ROUTES.registro}
              className="rounded-md bg-gold px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-[#b8983f]"
            >
              Invertir ahora
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-cream lg:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-black border-l border-gold/10 p-6 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between">
              <span className="font-serif text-lg font-light tracking-[0.2em] text-cream">
                ALBERTSON & WEISS
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 text-cream/70 hover:text-cream"
                aria-label="Cerrar menú"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-10 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-lg text-cream/70 transition-colors hover:bg-white/5 hover:text-cream"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-10 flex flex-col gap-3">
              <Link
                href={ROUTES.login}
                onClick={() => setMobileOpen(false)}
                className="rounded-md border border-gold/50 px-4 py-3 text-center text-sm text-gold transition-colors hover:border-gold hover:bg-gold/10"
              >
                Acceso inversores
              </Link>
              <Link
                href={ROUTES.registro}
                onClick={() => setMobileOpen(false)}
                className="rounded-md bg-gold px-4 py-3 text-center text-sm font-medium text-black transition-colors hover:bg-[#b8983f]"
              >
                Invertir ahora
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
