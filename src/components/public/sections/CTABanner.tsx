"use client";

import FadeIn from "@/components/public/FadeIn";
import Logo from "@/components/ui/Logo";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="bg-ivory-deep border-t border-rule py-[100px] px-6 sm:px-10 lg:px-[88px]">
      <div className="mx-auto max-w-[860px] text-center">
        <FadeIn>
          <div className="flex items-center justify-center gap-5 mb-9">
            <div className="flex-1 h-px bg-rule" aria-hidden="true" />
            <Logo variant="light" />
            <div className="flex-1 h-px bg-rule" aria-hidden="true" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-serif font-light text-[36px] sm:text-[44px] lg:text-[52px] leading-[1.1] tracking-[-0.01em] text-text mb-6">
            Únete al grupo selecto de inversores
            <br />
            <em className="italic">que saben dónde se mueve el valor.</em>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="font-sans font-light text-[13px] leading-[1.85] tracking-[0.02em] text-muted max-w-[480px] mx-auto mb-12">
            Crea tu cuenta de inversor en minutos. Accede al inventario
            completo, revisa los datos financieros de cada vehículo e invierte
            a tu ritmo.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ROUTES.registro}
              className="inline-flex items-center justify-center font-sans font-normal text-[10px] uppercase tracking-[0.26em] bg-text text-ivory px-12 py-4 transition-opacity duration-200 hover:opacity-85"
            >
              Crear cuenta de inversor
            </Link>
            <Link
              href={ROUTES.registro}
              className="inline-flex items-center justify-center font-sans font-normal text-[10px] uppercase tracking-[0.26em] border border-rule text-muted px-12 py-4 transition-all duration-200 hover:border-text hover:text-text"
            >
              Reservar llamada
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
