"use client";

import PageHero from "@/components/public/PageHero";
import FadeIn from "@/components/public/FadeIn";
import Badge from "@/components/ui/Badge";
import { formatCurrency, formatPercentage } from "@/lib/utils";

// Placeholder data - will be replaced with Supabase query (cars with status 'completed')
const stats = [
  { value: "15", label: "Operaciones completadas" },
  { value: "25.3%", label: "Rentabilidad media" },
  { value: "+500K €", label: "Capital gestionado" },
  { value: "100%", label: "Tasa de éxito" },
];

const completedOps = [
  {
    id: "c1",
    brand: "Jeep",
    model: "Wrangler Sahara",
    year: 2022,
    returnPct: 26.4,
    durationDays: 82,
    investmentEur: 42000,
    returnEur: 11088,
  },
  {
    id: "c2",
    brand: "Ford",
    model: "Mustang Mach 1",
    year: 2021,
    returnPct: 23.8,
    durationDays: 95,
    investmentEur: 55000,
    returnEur: 13090,
  },
  {
    id: "c3",
    brand: "Chevrolet",
    model: "Camaro ZL1",
    year: 2022,
    returnPct: 28.1,
    durationDays: 78,
    investmentEur: 48000,
    returnEur: 13488,
  },
  {
    id: "c4",
    brand: "Dodge",
    model: "Challenger SRT",
    year: 2023,
    returnPct: 24.5,
    durationDays: 88,
    investmentEur: 52000,
    returnEur: 12740,
  },
  {
    id: "c5",
    brand: "Tesla",
    model: "Model 3 Performance",
    year: 2023,
    returnPct: 21.2,
    durationDays: 65,
    investmentEur: 35000,
    returnEur: 7420,
  },
  {
    id: "c6",
    brand: "Ram",
    model: "1500 TRX",
    year: 2022,
    returnPct: 27.6,
    durationDays: 105,
    investmentEur: 68000,
    returnEur: 18768,
  },
];

export default function TrackRecordContent() {
  return (
    <main>
      <PageHero
        title="Nuestro"
        highlight="historial"
        subtitle="Cifras reales de operaciones completadas. Transparencia total en cada inversión."
      />

      {/* Stats */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-gold/10 bg-white/[0.03] p-6 text-center"
                >
                  <p className="font-serif text-3xl font-light text-gold sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs text-cream/50">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Completed operations grid */}
      <section className="border-t border-gold/10 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <h2 className="font-serif text-3xl font-light text-cream sm:text-4xl">
              Operaciones <span className="text-gold">completadas</span>
            </h2>
          </FadeIn>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {completedOps.map((op, index) => (
              <FadeIn key={op.id} delay={index * 0.08}>
                <div className="group overflow-hidden rounded-xl border border-gold/10 bg-white/[0.03] transition-all duration-300 hover:border-gold/25 hover:bg-white/[0.06]">
                  {/* Image placeholder */}
                  <div className="relative aspect-[16/10]">
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-brown/30 to-black/50">
                      <svg
                        className="h-10 w-10 text-cream/10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        aria-hidden="true"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                    <div className="absolute left-3 top-3">
                      <Badge color="green">Completada</Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-cream">
                      {op.brand} {op.model}
                    </h3>
                    <p className="text-sm text-cream/50">{op.year}</p>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-xs text-cream/40">Rentabilidad</span>
                        <p className="text-lg font-semibold text-green">
                          +{formatPercentage(op.returnPct)}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-cream/40">Duración</span>
                        <p className="text-lg font-semibold text-cream">
                          {op.durationDays} días
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-cream/40">Inversión</span>
                        <p className="text-sm font-medium text-cream/70">
                          {formatCurrency(op.investmentEur)}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-cream/40">Beneficio</span>
                        <p className="text-sm font-medium text-green">
                          +{formatCurrency(op.returnEur)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
