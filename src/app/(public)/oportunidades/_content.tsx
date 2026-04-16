"use client";

import PageHero from "@/components/public/PageHero";
import FadeIn from "@/components/public/FadeIn";
import CarCard from "@/components/ui/CarCard";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Car } from "@/lib/types";
import { useState } from "react";

// Placeholder data - will be replaced with Supabase query
const placeholderCars: Car[] = [
  {
    id: "1",
    brand: "Jeep",
    model: "Wrangler Rubicon",
    year: 2023,
    vin: null,
    engine: "3.6L V6",
    mileage_km: 12000,
    color: "Negro",
    equipment: [],
    purchase_price_usd: null,
    target_sale_price_eur: null,
    investment_needed_eur: 45000,
    investment_collected_eur: 28500,
    estimated_return_pct: 25,
    estimated_duration_days: 90,
    status: "open",
    logistics_phase: 1,
    logistics_phases: [],
    shipping_container: null,
    shipping_carrier: null,
    shipping_route: null,
    shipping_eta: null,
    photos_showcase: [],
    photos_exterior: [],
    photos_interior: [],
    photos_detail: [],
    thumbnail: null,
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
  },
  {
    id: "2",
    brand: "Ford",
    model: "Mustang GT",
    year: 2022,
    vin: null,
    engine: "5.0L V8",
    mileage_km: 18000,
    color: "Rojo",
    equipment: [],
    purchase_price_usd: null,
    target_sale_price_eur: null,
    investment_needed_eur: 38000,
    investment_collected_eur: 38000,
    estimated_return_pct: 22,
    estimated_duration_days: 75,
    status: "funded",
    logistics_phase: 3,
    logistics_phases: [],
    shipping_container: null,
    shipping_carrier: null,
    shipping_route: null,
    shipping_eta: null,
    photos_showcase: [],
    photos_exterior: [],
    photos_interior: [],
    photos_detail: [],
    thumbnail: null,
    created_at: "2024-01-10",
    updated_at: "2024-01-20",
  },
  {
    id: "3",
    brand: "Chevrolet",
    model: "Corvette C8",
    year: 2023,
    vin: null,
    engine: "6.2L V8",
    mileage_km: 8000,
    color: "Blanco",
    equipment: [],
    purchase_price_usd: null,
    target_sale_price_eur: null,
    investment_needed_eur: 62000,
    investment_collected_eur: 15000,
    estimated_return_pct: 28,
    estimated_duration_days: 100,
    status: "open",
    logistics_phase: 1,
    logistics_phases: [],
    shipping_container: null,
    shipping_carrier: null,
    shipping_route: null,
    shipping_eta: null,
    photos_showcase: [],
    photos_exterior: [],
    photos_interior: [],
    photos_detail: [],
    thumbnail: null,
    created_at: "2024-01-20",
    updated_at: "2024-01-20",
  },
];

type FilterStatus = "all" | "open" | "funded" | "in_transit";
type SortBy = "recent" | "return" | "duration";

export default function OportunidadesContent() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [sortBy, setSortBy] = useState<SortBy>("recent");

  // Filter
  let filtered = placeholderCars;
  if (filterStatus !== "all") {
    filtered = filtered.filter((c) => c.status === filterStatus);
  }

  // Sort
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "return") return b.estimated_return_pct - a.estimated_return_pct;
    if (sortBy === "duration") return a.estimated_duration_days - b.estimated_duration_days;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const hasResults = filtered.length > 0;

  return (
    <main>
      <PageHero
        title="Oportunidades de"
        highlight="inversión"
        subtitle="Explora los vehículos disponibles y elige en cuál quieres invertir."
      />

      <section className="pb-32">
        <div className="mx-auto max-w-7xl px-6">
          {/* Filters */}
          <FadeIn>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {([
                  { value: "all", label: "Todas" },
                  { value: "open", label: "Abiertas" },
                  { value: "funded", label: "Financiadas" },
                  { value: "in_transit", label: "En proceso" },
                ] as const).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFilterStatus(opt.value)}
                    className={
                      filterStatus === opt.value
                        ? "rounded-full bg-gold/15 border border-gold/30 px-4 py-1.5 text-sm font-medium text-gold"
                        : "rounded-full border border-gold/10 px-4 py-1.5 text-sm text-cream/50 transition-colors hover:border-gold/30 hover:text-cream"
                    }
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="rounded-lg border border-gold/20 bg-white/5 px-4 py-2 text-sm text-cream focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30"
              >
                <option value="recent">Más recientes</option>
                <option value="return">Mayor rentabilidad</option>
                <option value="duration">Menor duración</option>
              </select>
            </div>
          </FadeIn>

          {/* Grid */}
          {hasResults ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {filtered.map((car, index) => (
                <FadeIn key={car.id} delay={index * 0.08}>
                  <CarCard
                    car={car}
                    variant="dark"
                    href={`/oportunidades/${car.id}`}
                  />
                </FadeIn>
              ))}
            </div>
          ) : (
            <FadeIn>
              <div className="mt-16 text-center">
                <div className="mx-auto max-w-md">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/20 bg-gold/5">
                    <svg
                      className="h-7 w-7 text-gold/50"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path d="M10.5 21h-3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v5.5" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                      <path d="M21 15l-3.5 3.5L16 17" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-cream">
                    No hay oportunidades disponibles
                  </h3>
                  <p className="mt-2 text-sm text-cream/50">
                    Déjanos tu email y te avisaremos cuando publiquemos una nueva
                    oportunidad.
                  </p>
                  <div className="mt-6 flex gap-2">
                    <Input
                      type="email"
                      placeholder="tu@email.com"
                      variant="dark"
                      className="flex-1"
                    />
                    <Button variant="primary" size="md">
                      Avisar
                    </Button>
                  </div>
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    </main>
  );
}
