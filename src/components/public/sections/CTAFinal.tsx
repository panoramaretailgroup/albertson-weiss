"use client";

import FadeIn from "@/components/public/FadeIn";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";

export default function CTAFinal() {
  return (
    <section className="relative py-32">
      {/* Top separator */}
      <div className="absolute inset-x-0 top-0">
        <div className="mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-gold/[0.04] to-transparent" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[500px] w-[500px] rounded-full bg-gold/[0.03] blur-[100px]" />
        </div>
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <FadeIn>
          <h2 className="font-serif text-4xl font-light text-cream sm:text-5xl lg:text-6xl">
            Empieza a invertir{" "}
            <span className="text-gold">hoy</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-cream/50">
            Reserva una llamada con nuestro equipo o explora las oportunidades
            disponibles.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={ROUTES.registro}
              className="rounded-lg bg-gold px-8 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-[#b8983f]"
            >
              Reservar llamada
            </Link>
            <Link
              href={ROUTES.oportunidades}
              className="rounded-lg border border-gold/50 px-8 py-3.5 text-sm font-medium text-gold transition-colors hover:border-gold hover:bg-gold/10"
            >
              Ver oportunidades
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="mt-8 text-xs text-cream/30">
            Sin compromiso. Resolvemos todas tus dudas antes de invertir.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
