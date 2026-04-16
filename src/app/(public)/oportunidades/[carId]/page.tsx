"use client";

import FadeIn from "@/components/public/FadeIn";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import Tabs from "@/components/ui/Tabs";
import PhotoGallery from "@/components/ui/PhotoGallery";
import Button from "@/components/ui/Button";
import { ROUTES, CAR_STATUSES } from "@/lib/constants";
import {
  formatCurrency,
  formatPercentage,
  calculateProgress,
} from "@/lib/utils";
import { CarStatus, LogisticsPhase } from "@/lib/types";
import {
  TrendingUp,
  Gauge,
  Calendar,
  Palette,
  Cog,
  Shield,
  Eye,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Real vehicle data - will be fetched from Supabase
const placeholderCar = {
  id: "jeep-wrangler-2025",
  brand: "Jeep",
  model: "Wrangler Rubicon",
  year: 2025,
  engine: "3.6L Pentastar V6",
  mileage_km: 13802,
  color: "Black",
  equipment: [
    "Tracción 4x4 Rock-Trac",
    "Techo removible Freedom Top",
    "Uconnect 12.3\" Touchscreen",
    "Apple CarPlay / Android Auto",
    "LED headlights",
    "Asientos calefactados cuero",
    "Cámara trasera",
    "BFGoodrich KO2 All-Terrain",
    "Dana 44 Heavy-Duty Axles",
    "Electronic Sway Bar Disconnect",
  ],
  investment_needed_eur: 47000,
  investment_collected_eur: 47000,
  estimated_return_pct: 25,
  estimated_duration_days: 90,
  status: "funded" as CarStatus,
  logistics_phase: 5,
  logistics_phases: [
    { phase: 1, name: "Comprado en subasta", completed: true, date: "2026-03-09", photos: ["/images/cars/jeep-wrangler-2025/logistics/pickup-1.jpg", "/images/cars/jeep-wrangler-2025/logistics/pickup-2.jpg", "/images/cars/jeep-wrangler-2025/logistics/pickup-3.jpg", "/images/cars/jeep-wrangler-2025/logistics/pickup-4.jpg", "/images/cars/jeep-wrangler-2025/logistics/pickup-5.jpg"] },
    { phase: 2, name: "En tránsito a almacén USA", completed: true, date: "2026-03-10", photos: ["/images/cars/jeep-wrangler-2025/logistics/pickup-6.jpg", "/images/cars/jeep-wrangler-2025/logistics/pickup-7.jpg", "/images/cars/jeep-wrangler-2025/logistics/pickup-8.jpg", "/images/cars/jeep-wrangler-2025/logistics/pickup-9.jpg", "/images/cars/jeep-wrangler-2025/logistics/pickup-interior.jpg"] },
    { phase: 3, name: "En almacén USA", completed: true, date: "2026-03-11", photos: ["/images/cars/jeep-wrangler-2025/logistics/warehouse-1.jpg", "/images/cars/jeep-wrangler-2025/logistics/warehouse-2.jpg", "/images/cars/jeep-wrangler-2025/logistics/warehouse-3.jpg"] },
    { phase: 4, name: "Contenedor cargado", completed: true, date: "2026-04-04", photos: [] },
    { phase: 5, name: "En tránsito marítimo", completed: false, date: null, photos: [], tracking: {} },
    { phase: 6, name: "Descargado en puerto Europa", completed: false, date: null, photos: [] },
    { phase: 7, name: "Listo para entrega", completed: false, date: null, photos: [] },
  ] as LogisticsPhase[],
  photos_exterior: [
    "/images/cars/jeep-wrangler-2025/exterior/front.jpg",
    "/images/cars/jeep-wrangler-2025/exterior/side.jpg",
    "/images/cars/jeep-wrangler-2025/exterior/rear.jpg",
    "/images/cars/jeep-wrangler-2025/exterior/rear-quarter.jpg",
    "/images/cars/jeep-wrangler-2025/exterior/top-angle.jpg",
    "/images/cars/jeep-wrangler-2025/exterior/front-detail.jpg",
    "/images/cars/jeep-wrangler-2025/exterior/rear-alt.jpg",
    "/images/cars/jeep-wrangler-2025/exterior/rear-alt2.jpg",
  ],
  photos_interior: [
    "/images/cars/jeep-wrangler-2025/interior/front-seats.jpg",
    "/images/cars/jeep-wrangler-2025/interior/rear-seats.jpg",
    "/images/cars/jeep-wrangler-2025/interior/dashboard.jpg",
    "/images/cars/jeep-wrangler-2025/interior/rubicon-seats.jpg",
    "/images/cars/jeep-wrangler-2025/interior/dashboard-alt.jpg",
  ],
  photos_detail: [
    "/images/cars/jeep-wrangler-2025/showcase/front.jpg",
    "/images/cars/jeep-wrangler-2025/showcase/front2.jpg",
    "/images/cars/jeep-wrangler-2025/showcase/specs.jpg",
  ],
};

const miniSteps = [
  { icon: FileText, text: "Firmas el contrato de préstamo privado" },
  { icon: Eye, text: "Sigues la operación en tiempo real desde tu panel" },
  { icon: TrendingUp, text: "Cobras tu inversión + 25% de rentabilidad" },
];

const statusBadgeColor: Record<CarStatus, "gold" | "green" | "blue" | "gray"> = {
  open: "gold",
  funded: "blue",
  in_transit: "blue",
  sold: "green",
  completed: "green",
};

type PhotoTab = "exterior" | "interior" | "detalles";

export default function CarDetailPublicPage({
  params: _params,
}: {
  params: { carId: string };
}) {
  const car = placeholderCar;
  const progress = calculateProgress(
    car.investment_collected_eur,
    car.investment_needed_eur
  );
  const [photoTab, setPhotoTab] = useState<PhotoTab>("exterior");

  const photoTabs = [
    { label: "Exterior", value: "exterior" },
    { label: "Interior", value: "interior" },
    { label: "Detalles", value: "detalles" },
  ];

  const currentPhotos =
    photoTab === "exterior"
      ? car.photos_exterior
      : photoTab === "interior"
        ? car.photos_interior
        : car.photos_detail;

  return (
    <main className="pt-24">
      <div className="mx-auto max-w-7xl px-6 pb-32">
        {/* Breadcrumb */}
        <FadeIn>
          <nav className="mb-8 flex items-center gap-2 text-sm text-cream/40">
            <Link href={ROUTES.oportunidades} className="hover:text-cream transition-colors">
              Oportunidades
            </Link>
            <span>/</span>
            <span className="text-cream/70">
              {car.brand} {car.model}
            </span>
          </nav>
        </FadeIn>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main content - 2 cols */}
          <div className="lg:col-span-2">
            {/* Hero image placeholder */}
            <FadeIn>
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-brown/50 to-black/80 border border-gold/10">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-16 w-16 text-gold/20"
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
                    <p className="mt-4 text-sm text-cream/30">Foto principal del vehículo</p>
                  </div>
                </div>
                <div className="absolute left-4 top-4">
                  <Badge color={statusBadgeColor[car.status]}>
                    {CAR_STATUSES[car.status]}
                  </Badge>
                </div>
              </div>
            </FadeIn>

            {/* Photo gallery */}
            <FadeIn delay={0.1}>
              <div className="mt-8">
                <Tabs
                  tabs={photoTabs}
                  activeTab={photoTab}
                  onChange={(v) => setPhotoTab(v as PhotoTab)}
                  variant="dark"
                />
                <div className="mt-4">
                  {currentPhotos.length > 0 ? (
                    <PhotoGallery photos={currentPhotos} columns={4} />
                  ) : (
                    <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-gold/10">
                      <p className="text-sm text-cream/30">
                        Las fotos se publicarán próximamente
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>

            {/* Title + specs */}
            <FadeIn delay={0.15}>
              <div className="mt-10">
                <h1 className="font-serif text-4xl font-light text-cream">
                  {car.brand} {car.model}
                </h1>
                <p className="mt-2 text-cream/50">{car.year} · {car.engine}</p>
              </div>
            </FadeIn>

            {/* Technical specs */}
            <FadeIn delay={0.2}>
              <div className="mt-8">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-gold">
                  Ficha técnica
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {[
                    { icon: Calendar, label: "Año", value: String(car.year) },
                    { icon: Cog, label: "Motor", value: car.engine },
                    { icon: Gauge, label: "Kilometraje", value: `${car.mileage_km?.toLocaleString("es-ES")} km` },
                    { icon: Palette, label: "Color", value: car.color },
                  ].map((spec) => (
                    <div
                      key={spec.label}
                      className="rounded-xl border border-gold/10 bg-white/[0.03] p-4"
                    >
                      <div className="flex items-center gap-2 text-cream/40">
                        <spec.icon className="h-4 w-4" />
                        <span className="text-xs uppercase tracking-wider">
                          {spec.label}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-medium text-cream">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Equipment */}
            <FadeIn delay={0.25}>
              <div className="mt-8">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-gold">
                  Equipamiento
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {car.equipment.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-gold/10 bg-white/[0.03] px-3 py-1.5 text-xs text-cream/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Logistics tracker (simplified) */}
            <FadeIn delay={0.3}>
              <div className="mt-10">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-gold">
                  Estado de la operación
                </h2>
                <div className="mt-6">
                  <div className="space-y-3">
                    {car.logistics_phases.map((phase) => {
                      const isCompleted = phase.completed;
                      const isCurrent = phase.phase === car.logistics_phase;

                      return (
                        <div
                          key={phase.phase}
                          className="flex items-center gap-3"
                        >
                          <div
                            className={
                              isCompleted
                                ? "flex h-6 w-6 items-center justify-center rounded-full bg-gold"
                                : isCurrent
                                  ? "flex h-6 w-6 items-center justify-center rounded-full border-2 border-gold animate-pulse"
                                  : "flex h-6 w-6 items-center justify-center rounded-full border border-gray-700"
                            }
                          >
                            {isCompleted && (
                              <svg className="h-3 w-3 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                          <span
                            className={
                              isCompleted
                                ? "text-sm text-cream font-medium"
                                : isCurrent
                                  ? "text-sm text-gold font-medium"
                                  : "text-sm text-cream/30"
                            }
                          >
                            {phase.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* How this investment works */}
            <FadeIn delay={0.35}>
              <div className="mt-10 rounded-2xl border border-gold/10 bg-white/[0.03] p-8">
                <h2 className="text-lg font-semibold text-cream">
                  ¿Cómo funciona esta inversión?
                </h2>
                <div className="mt-6 space-y-4">
                  {miniSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-gold/5">
                        <step.icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
                      </div>
                      <p className="pt-1 text-sm text-cream/60">{step.text}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href={ROUTES.comoFunciona}
                  className="mt-6 inline-flex items-center gap-1 text-sm text-gold hover:text-gold/80 transition-colors"
                >
                  Conoce el proceso completo
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Sidebar - sticky card */}
          <div className="lg:col-span-1">
            <FadeIn delay={0.1}>
              <div className="sticky top-24 rounded-2xl border border-gold/20 bg-white/5 p-6 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-cream">
                  Datos de inversión
                </h2>

                <div className="mt-6 space-y-5">
                  {/* Investment needed */}
                  <div>
                    <span className="text-xs uppercase tracking-wider text-cream/40">
                      Inversión necesaria
                    </span>
                    <p className="mt-1 text-2xl font-semibold text-cream">
                      {formatCurrency(car.investment_needed_eur)}
                    </p>
                  </div>

                  {/* Progress */}
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-cream/40">Financiado</span>
                      <span className="font-medium text-cream">{progress}%</span>
                    </div>
                    <ProgressBar value={progress} color="gold" className="mt-2" />
                    <p className="mt-1 text-xs text-cream/40">
                      {formatCurrency(car.investment_collected_eur)} recaudados
                    </p>
                  </div>

                  {/* Separator */}
                  <div className="h-px bg-gold/10" />

                  {/* Return */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-cream/40">Rentabilidad est.</span>
                    <span className="text-lg font-semibold text-green">
                      {formatPercentage(car.estimated_return_pct)}
                    </span>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-cream/40">Duración est.</span>
                    <span className="text-sm font-medium text-cream">
                      ~{car.estimated_duration_days} días
                    </span>
                  </div>

                  {/* Separator */}
                  <div className="h-px bg-gold/10" />

                  {/* CTA */}
                  <Link href={ROUTES.registro}>
                    <Button variant="primary" size="lg" className="w-full">
                      Invertir en este vehículo
                    </Button>
                  </Link>

                  <p className="text-center text-[11px] text-cream/30">
                    Se requiere registro y verificación previa
                  </p>

                  {/* Trust signals */}
                  <div className="mt-4 space-y-2">
                    {[
                      { icon: Shield, text: "Contrato legal regulado" },
                      { icon: Eye, text: "Seguimiento en tiempo real" },
                      { icon: TrendingUp, text: "100% operaciones exitosas" },
                    ].map((signal) => (
                      <div
                        key={signal.text}
                        className="flex items-center gap-2 text-cream/40"
                      >
                        <signal.icon className="h-3.5 w-3.5" />
                        <span className="text-xs">{signal.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-gold/10 bg-black/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-cream">
              {formatCurrency(car.investment_needed_eur)}
            </p>
            <p className="text-xs text-green">
              {formatPercentage(car.estimated_return_pct)} rentabilidad
            </p>
          </div>
          <Link
            href={ROUTES.registro}
            className="rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#b8983f]"
          >
            Invertir
          </Link>
        </div>
      </div>
    </main>
  );
}
