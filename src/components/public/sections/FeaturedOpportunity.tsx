"use client";

import FadeIn from "@/components/public/FadeIn";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import { ROUTES } from "@/lib/constants";
import { formatCurrency, formatPercentage, calculateProgress } from "@/lib/utils";
import { TrendingUp, Clock, DollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Real data - will be replaced with Supabase query
const placeholderCar = {
  id: "jeep-wrangler-2025",
  brand: "Jeep",
  model: "Wrangler Rubicon",
  year: 2025,
  engine: "3.6L Pentastar V6",
  mileage_km: 13802,
  investment_needed_eur: 47000,
  investment_collected_eur: 47000,
  estimated_return_pct: 25,
  estimated_duration_days: 90,
  status: "funded" as const,
  thumbnail: "/images/cars/jeep-wrangler-2025/showcase/front.jpg",
};

export default function FeaturedOpportunity() {
  const car = placeholderCar;
  const progress = calculateProgress(
    car.investment_collected_eur,
    car.investment_needed_eur
  );

  return (
    <section className="relative py-32">
      {/* Top separator */}
      <div className="absolute inset-x-0 top-0">
        <div className="mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="text-center">
          <h2 className="font-serif text-4xl font-light text-cream sm:text-5xl">
            Oportunidad <span className="text-gold">actual</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-16 overflow-hidden rounded-2xl border border-gold/20 bg-white/5 backdrop-blur-sm">
            <div className="grid lg:grid-cols-2">
              {/* Car image */}
              <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                <Image
                  src={car.thumbnail || "/images/cars/jeep-wrangler-2025/showcase/front.jpg"}
                  alt={`${car.brand} ${car.model} ${car.year}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute left-4 top-4">
                  <Badge color="blue">Financiado</Badge>
                </div>
              </div>

              {/* Details */}
              <div className="p-8 lg:p-10">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-3xl font-light text-cream">
                      {car.brand} {car.model}
                    </h3>
                    <p className="mt-1 text-cream/50">
                      {car.year} · {car.engine} · {car.mileage_km?.toLocaleString("es-ES")} km
                    </p>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="mt-8 grid grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-cream/40">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-xs uppercase tracking-wider">Inversión</span>
                    </div>
                    <p className="mt-1 text-xl font-semibold text-cream">
                      {formatCurrency(car.investment_needed_eur)}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-cream/40">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-xs uppercase tracking-wider">Rentabilidad</span>
                    </div>
                    <p className="mt-1 text-xl font-semibold text-green">
                      {formatPercentage(car.estimated_return_pct)}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-cream/40">
                      <Clock className="h-4 w-4" />
                      <span className="text-xs uppercase tracking-wider">Duración</span>
                    </div>
                    <p className="mt-1 text-xl font-semibold text-cream">
                      ~{car.estimated_duration_days} días
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-8">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-cream/50">Financiación</span>
                    <span className="font-medium text-cream">
                      {formatCurrency(car.investment_collected_eur)} / {formatCurrency(car.investment_needed_eur)}
                    </span>
                  </div>
                  <ProgressBar value={progress} color="gold" />
                </div>

                {/* CTA */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`${ROUTES.panelOportunidades}/${car.id}`}
                    className="flex-1 rounded-lg bg-gold px-6 py-3 text-center text-sm font-semibold text-black transition-colors hover:bg-[#b8983f]"
                  >
                    Invertir en esta operación
                  </Link>
                  <Link
                    href={ROUTES.oportunidades}
                    className="flex-1 rounded-lg border border-gold/50 px-6 py-3 text-center text-sm font-medium text-gold transition-colors hover:border-gold hover:bg-gold/10"
                  >
                    Ver todas las oportunidades
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
