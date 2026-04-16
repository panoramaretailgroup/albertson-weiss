"use client";

import FadeIn from "@/components/public/FadeIn";
import { Shield, Eye, BarChart3, Ban } from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    title: "Contratos legales",
    description:
      "Préstamo privado bilateral regulado por ley española. Seguridad jurídica total.",
  },
  {
    icon: Eye,
    title: "Transparencia total",
    description:
      "Sigue cada operación en tiempo real: desde la subasta hasta la venta final.",
  },
  {
    icon: BarChart3,
    title: "Track record verificable",
    description:
      "Historial completo de operaciones pasadas con cifras reales.",
  },
  {
    icon: Ban,
    title: "Sin sorpresas",
    description:
      "Rentabilidad fija pactada. Sin comisiones ocultas.",
  },
];

export default function Trust() {
  return (
    <section className="relative py-32">
      {/* Top separator */}
      <div className="absolute inset-x-0 top-0">
        <div className="mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="text-center">
          <h2 className="font-serif text-4xl font-light text-cream sm:text-5xl">
            Por qué confiar en{" "}
            <span className="text-gold">Albertson & Weiss</span>
          </h2>
        </FadeIn>

        <div className="mt-20 grid gap-6 sm:grid-cols-2">
          {trustItems.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.1}>
              <div className="group rounded-2xl border border-gold/10 bg-white/[0.03] p-8 transition-all duration-300 hover:border-gold/25 hover:bg-white/[0.06]">
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/20 bg-gold/5 transition-all duration-300 group-hover:border-gold/40 group-hover:bg-gold/10">
                    <item.icon
                      className="h-5 w-5 text-gold"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-cream">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/50">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
