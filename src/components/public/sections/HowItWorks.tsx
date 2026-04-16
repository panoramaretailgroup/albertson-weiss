"use client";

import FadeIn from "@/components/public/FadeIn";
import { ROUTES } from "@/lib/constants";
import { Search, DollarSign, Ship, TrendingUp } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    icon: Search,
    title: "Seleccionamos",
    description:
      "Identificamos vehículos premium en subastas americanas con alto potencial de revalorización en Europa.",
  },
  {
    icon: DollarSign,
    title: "Tú inviertes",
    description:
      "Formalizas un contrato de préstamo privado bilateral y financias la adquisición del vehículo.",
  },
  {
    icon: Ship,
    title: "Importamos",
    description:
      "Gestionamos la compra, transporte marítimo y homologación. Tú sigues el progreso en tiempo real.",
  },
  {
    icon: TrendingUp,
    title: "Cobras tu rentabilidad",
    description:
      "Al venderse el vehículo, recuperas tu inversión más un 25% de rentabilidad anualizada.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-32">
      {/* Top separator */}
      <div className="absolute inset-x-0 top-0">
        <div className="mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="text-center">
          <h2 className="font-serif text-4xl font-light text-cream sm:text-5xl">
            Invierte en <span className="text-gold">4 pasos</span>
          </h2>
        </FadeIn>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <FadeIn key={step.title} delay={index * 0.1}>
              <div className="group text-center">
                {/* Step number */}
                <div className="mb-6 inline-flex items-center gap-3">
                  <span className="text-xs font-medium text-gold/50">
                    0{index + 1}
                  </span>
                  <div className="h-px w-8 bg-gold/30" />
                </div>

                {/* Icon */}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/20 bg-gold/5 transition-all duration-300 group-hover:border-gold/40 group-hover:bg-gold/10">
                  <step.icon className="h-7 w-7 text-gold" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-cream">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/50">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4} className="mt-16 text-center">
          <Link
            href={ROUTES.comoFunciona}
            className="inline-flex items-center gap-2 rounded-lg border border-gold/50 px-6 py-3 text-sm font-medium text-gold transition-colors hover:border-gold hover:bg-gold/10"
          >
            Conoce el proceso completo
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
