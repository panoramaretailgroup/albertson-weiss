"use client";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import FadeIn from "@/components/public/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";
import Badge from "@/components/ui/Badge";
import Gallery, { type GalleryPhotos } from "./_gallery";
import {
  Camera,
  ChevronLeft,
  FileText,
  Ship,
  Download,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

// ── Phase names (EN → ES) ───────────────────────────────────────────
const PHASE_LABELS_ES: Record<number, string> = {
  1: "Adquirido",
  2: "Tránsito al almacén",
  3: "Importación y aduanas",
  4: "Preparación y certificación",
  5: "Listado en venta",
  6: "Con oferta",
  7: "Vendido",
  8: "Pago procesado",
};

const TOTAL_PHASES = 8;

// ── Types ───────────────────────────────────────────────────────────
interface PhaseData {
  phase: number;
  completed: boolean;
  date: string | null;
  photos: string[];
}

interface Update {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

interface ShippingInfo {
  container: string;
  carrier: string;
  route: string;
  etaLabel: string;
  trackingUrl: string;
}

interface VehicleData {
  id: string;
  brand: string;
  model: string;
  year: number;
  vin: string;
  engine: string;
  mileageKm: number;
  color: string;
  drivetrain: string;
  transmission: string;
  equipment: string[];
  priceEur: number;
  raisedEur: number;
  roiPct: number;
  timelineDays: number;
  status: "open" | "full" | "soon";
  statusLabel: string;
  currentPhase: number;
  phases: PhaseData[];
  shipping: ShippingInfo | null;
  photos: GalleryPhotos;
  updates: Update[];
  breakdown: {
    usPurchase: string;
    importLogistics: string;
    prepCertification: string;
    totalCostBasis: string;
    europeanSalePrice: string;
    projectedProfit: string;
    projectedRoi: string;
  };
}

// ── Placeholder data (will be replaced with Supabase query) ─────────
const vehicleData: VehicleData = {
  id: "jeep-wrangler-2025",
  brand: "Jeep",
  model: "Wrangler Rubicon",
  year: 2025,
  vin: "1C4PJXFG2SW566069",
  engine: "3.6L Pentastar V6",
  mileageKm: 13802,
  color: "Negro",
  drivetrain: "4x4 Rock-Trac",
  transmission: "Automática 8 velocidades",
  equipment: [
    "Techo removible Freedom Top",
    "Uconnect 12,3″ táctil",
    "Apple CarPlay / Android Auto",
    "Faros LED",
    "Asientos de cuero calefactados",
    "BFGoodrich KO2 All-Terrain",
    "Dana 44 HD Axles",
    "Desconexión electrónica de barra estabilizadora",
  ],
  priceEur: 47000,
  raisedEur: 47000,
  roiPct: 25,
  timelineDays: 90,
  status: "full",
  statusLabel: "Financiado",
  currentPhase: 3,
  phases: [
    {
      phase: 1,
      completed: true,
      date: "2026-03-09",
      photos: [
        "/images/cars/jeep-wrangler-2025/logistics/pickup-1.jpg",
        "/images/cars/jeep-wrangler-2025/logistics/pickup-2.jpg",
        "/images/cars/jeep-wrangler-2025/logistics/pickup-3.jpg",
      ],
    },
    {
      phase: 2,
      completed: true,
      date: "2026-03-10",
      photos: [
        "/images/cars/jeep-wrangler-2025/logistics/pickup-7.jpg",
        "/images/cars/jeep-wrangler-2025/logistics/pickup-interior.jpg",
      ],
    },
    {
      phase: 3,
      completed: false,
      date: null,
      photos: [
        "/images/cars/jeep-wrangler-2025/logistics/warehouse-1.jpg",
        "/images/cars/jeep-wrangler-2025/logistics/warehouse-2.jpg",
      ],
    },
    { phase: 4, completed: false, date: null, photos: [] },
    { phase: 5, completed: false, date: null, photos: [] },
    { phase: 6, completed: false, date: null, photos: [] },
    { phase: 7, completed: false, date: null, photos: [] },
    { phase: 8, completed: false, date: null, photos: [] },
  ],
  shipping: {
    container: "MEDU9510693",
    carrier: "MSC",
    route: "Oakland, US → Rotterdam, NL",
    etaLabel: "15 mayo 2026",
    trackingUrl:
      "https://www.msc.com/track-a-shipment?query=MEDU9510693",
  },
  photos: {
    exterior: [
      "/images/cars/jeep-wrangler-2025/exterior/front.jpg",
      "/images/cars/jeep-wrangler-2025/exterior/side.jpg",
      "/images/cars/jeep-wrangler-2025/exterior/rear.jpg",
      "/images/cars/jeep-wrangler-2025/exterior/rear-quarter.jpg",
      "/images/cars/jeep-wrangler-2025/exterior/top-angle.jpg",
      "/images/cars/jeep-wrangler-2025/exterior/front-detail.jpg",
      "/images/cars/jeep-wrangler-2025/exterior/rear-alt.jpg",
      "/images/cars/jeep-wrangler-2025/exterior/rear-alt2.jpg",
    ],
    interior: [
      "/images/cars/jeep-wrangler-2025/interior/front-seats.jpg",
      "/images/cars/jeep-wrangler-2025/interior/rear-seats.jpg",
      "/images/cars/jeep-wrangler-2025/interior/dashboard.jpg",
      "/images/cars/jeep-wrangler-2025/interior/rubicon-seats.jpg",
      "/images/cars/jeep-wrangler-2025/interior/dashboard-alt.jpg",
    ],
    details: [
      "/images/cars/jeep-wrangler-2025/showcase/front.jpg",
      "/images/cars/jeep-wrangler-2025/showcase/front2.jpg",
      "/images/cars/jeep-wrangler-2025/showcase/specs.jpg",
    ],
  },
  updates: [
    {
      id: "u1",
      title: "Tránsito marítimo iniciado",
      description:
        "Contenedor MEDU9510693 cargado en buque MSC. Ruta Oakland → Rotterdam. ETA 15 mayo.",
      createdAt: "2026-04-04T14:00:00Z",
    },
    {
      id: "u2",
      title: "Vehículo recibido en almacén USA",
      description:
        "Inspección visual y mecánica completada. Sin daños. Fotos del almacén disponibles en la galería logística.",
      createdAt: "2026-03-11T10:00:00Z",
    },
    {
      id: "u3",
      title: "Recogido en Eugene, Oregon",
      description:
        "Pickup completado por Super Dispatch. Vehículo cargado en camión para transporte al almacén de consolidación.",
      createdAt: "2026-03-10T08:00:00Z",
    },
    {
      id: "u4",
      title: "Adquirido en subasta",
      description:
        "Jeep Wrangler Rubicon 2025 adquirido con éxito. VIN 1C4PJXFG2SW566069. Precio conforme al presupuesto.",
      createdAt: "2026-03-09T16:30:00Z",
    },
  ],
  breakdown: {
    usPurchase: "$ 38.000",
    importLogistics: "+ $ 4.500",
    prepCertification: "+ $ 2.000",
    totalCostBasis: "$ 44.500",
    europeanSalePrice: "€ 56.000",
    projectedProfit: "€ 11.500",
    projectedRoi: "25,8 %",
  },
};

// ── Helpers ─────────────────────────────────────────────────────────
function formatRelativeEs(iso: string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diffMs = now - then;
  const mins = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);
  if (mins < 60) return `hace ${mins} min`;
  if (hours < 24) return `hace ${hours} h`;
  if (days < 7) return `hace ${days} d`;
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

function formatDateShort(iso: string): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
  }).format(new Date(iso));
}

function formatEur(value: number): string {
  return `€${value.toLocaleString("es-ES")}`;
}

// ═══════════════════════════════════════════════════════════════════
//  PAGE
// ═══════════════════════════════════════════════════════════════════
export default function VehicleDetailContent({
  carId: _carId,
}: {
  carId: string;
}) {
  const car = vehicleData;
  const progress = Math.min(
    100,
    Math.round((car.raisedEur / car.priceEur) * 100)
  );

  return (
    <main className="pb-24 lg:pb-0">
      {/* Breadcrumb */}
      <div className="bg-ivory pt-[72px]">
        <div className="mx-auto max-w-shell px-6 sm:px-10 lg:px-[88px] pt-8">
          <Link
            href={ROUTES.oportunidades}
            className="inline-flex items-center gap-2 font-sans font-normal text-[10px] uppercase tracking-[0.22em] text-muted hover:text-text transition-colors"
          >
            <ChevronLeft className="h-3 w-3" />
            Volver al inventario
          </Link>
        </div>
      </div>

      {/* Main grid: gallery + specs left / sidebar right */}
      <section className="bg-ivory py-10 lg:py-14 px-6 sm:px-10 lg:px-[88px]">
        <div className="mx-auto max-w-shell grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16">
          {/* LEFT */}
          <div>
            {/* Vehicle header */}
            <div className="mb-8">
              <div className="font-sans font-normal text-[9px] uppercase tracking-[0.22em] text-muted mb-2">
                {car.brand} · {car.year}
              </div>
              <h1 className="font-serif font-light text-[40px] sm:text-[56px] leading-[1.05] tracking-[-0.01em] text-text">
                {car.model}
              </h1>
            </div>

            {/* Gallery */}
            <FadeIn>
              <Gallery photos={car.photos} />
            </FadeIn>

            {/* Specs */}
            <SpecsBlock car={car} />
          </div>

          {/* RIGHT — sticky sidebar */}
          <div className="lg:sticky lg:top-[96px] lg:self-start">
            <InvestmentSidebar car={car} />
          </div>
        </div>
      </section>

      {/* Investment Breakdown (dark) */}
      <InvestmentBreakdown car={car} />

      {/* Process Timeline */}
      <ProcessTimeline
        phases={car.phases}
        currentPhase={car.currentPhase}
        shipping={car.shipping}
      />

      {/* Updates */}
      <UpdatesTimeline updates={car.updates} />

      {/* Legal */}
      <LegalDisclaimer />

      {/* Mobile sticky bottom CTA */}
      <MobileStickyCTA progress={progress} />
    </main>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  SPECS BLOCK
// ═══════════════════════════════════════════════════════════════════
function SpecsBlock({ car }: { car: VehicleData }) {
  const specs: Array<[string, string]> = [
    ["Año", String(car.year)],
    ["Marca", car.brand],
    ["Modelo", car.model],
    ["Motor", car.engine],
    ["Kilometraje", `${car.mileageKm.toLocaleString("es-ES")} km`],
    ["Color", car.color],
    ["Tracción", car.drivetrain],
    ["Transmisión", car.transmission],
  ];

  return (
    <section className="mt-16 pt-16 border-t border-rule">
      <FadeIn>
        <SectionLabel className="mb-5">Ficha técnica</SectionLabel>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h2 className="font-serif font-light text-[36px] sm:text-[44px] leading-[1.05] tracking-[-0.01em] text-text mb-10">
          Especificaciones
          <br />
          <em className="italic">completas</em>
        </h2>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
          {specs.map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between items-baseline border-b border-rule py-4"
            >
              <span className="font-sans font-normal text-[9px] uppercase tracking-[0.22em] text-muted">
                {label}
              </span>
              <span className="num text-[14px] text-text font-normal">
                {value}
              </span>
            </div>
          ))}
        </div>
      </FadeIn>

      {car.equipment.length > 0 && (
        <FadeIn delay={0.2}>
          <div className="mt-10">
            <div className="font-sans font-normal text-[9px] uppercase tracking-[0.22em] text-muted mb-4">
              Equipamiento
            </div>
            <div className="flex flex-wrap gap-2">
              {car.equipment.map((item) => (
                <span
                  key={item}
                  className="border border-rule px-3 py-1.5 font-sans font-light text-[11px] text-text"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      )}
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  INVESTMENT BREAKDOWN (dark section)
// ═══════════════════════════════════════════════════════════════════
function InvestmentBreakdown({ car }: { car: VehicleData }) {
  const rows: Array<{ label: string; value: string; accent?: boolean; bold?: boolean }> = [
    { label: "Precio de compra en EE.UU.", value: car.breakdown.usPurchase },
    { label: "Importación y logística", value: car.breakdown.importLogistics },
    { label: "Preparación y certificación", value: car.breakdown.prepCertification },
    { label: "Base total de coste", value: car.breakdown.totalCostBasis, bold: true },
    { label: "Precio de venta en Europa", value: car.breakdown.europeanSalePrice },
    { label: "Beneficio proyectado", value: car.breakdown.projectedProfit, accent: true },
    { label: "Rentabilidad proyectada", value: car.breakdown.projectedRoi, accent: true },
  ];

  return (
    <section className="bg-black py-20 px-6 sm:px-10 lg:px-[88px] border-t border-white/5">
      <div className="mx-auto max-w-shell flex flex-col lg:flex-row gap-16 lg:gap-[120px] items-start">
        {/* LEFT */}
        <div className="lg:basis-[420px] lg:flex-shrink-0 w-full">
          <FadeIn>
            <SectionLabel variant="dark" className="mb-5">
              Desglose financiero
            </SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-serif font-light text-[36px] sm:text-[44px] leading-[1.05] tracking-[-0.01em] text-white mb-7">
              Los números
              <br />
              <em className="italic">de esta operación</em>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="w-9 h-px bg-white/15 mb-6" aria-hidden="true" />
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-sans font-light text-[13px] leading-[1.85] tracking-[0.02em] text-muted">
              Estas son las cifras proyectadas para esta operación. Al completarse la venta, tu parte proporcional del beneficio se transfiere directamente a tu cuenta.
            </p>
          </FadeIn>
        </div>

        {/* RIGHT table */}
        <div className="flex-1 w-full lg:border-l lg:border-white/[0.08] lg:pl-20">
          <FadeIn delay={0.15}>
            <div className="font-serif font-light text-[16px] sm:text-[18px] tracking-[0.18em] uppercase text-muted mb-8">
              {car.brand} {car.model} {car.year}
            </div>
          </FadeIn>

          {rows.map((row, i) => (
            <FadeIn key={row.label} delay={0.2 + i * 0.04}>
              <div
                className={cn(
                  "flex justify-between items-baseline py-[14px] border-b border-white/[0.06]",
                  row.bold && "border-t border-white/15 mt-1"
                )}
              >
                <span
                  className={cn(
                    "font-sans text-[11px] tracking-[0.08em]",
                    row.bold
                      ? "text-white font-normal"
                      : "text-muted font-light"
                  )}
                >
                  {row.label}
                </span>
                <span
                  className={cn(
                    "num font-light text-[18px]",
                    row.accent
                      ? "text-amber"
                      : row.bold
                        ? "text-white"
                        : "text-white/55"
                  )}
                >
                  {row.value}
                </span>
              </div>
            </FadeIn>
          ))}

          <FadeIn delay={0.5}>
            <div className="mt-5 font-sans text-[8.5px] tracking-[0.12em] leading-[1.6] text-white/20">
              Cifras proyectadas. El rendimiento real puede variar. La inversión conlleva riesgos. Rentabilidades pasadas no garantizan resultados futuros.
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  PROCESS TIMELINE
// ═══════════════════════════════════════════════════════════════════
function ProcessTimeline({
  phases,
  currentPhase,
  shipping,
}: {
  phases: PhaseData[];
  currentPhase: number;
  shipping: ShippingInfo | null;
}) {
  return (
    <section className="bg-ivory-deep py-20 px-6 sm:px-10 lg:px-[88px] border-t border-rule">
      <div className="mx-auto max-w-shell">
        <FadeIn>
          <SectionLabel className="mb-5">Seguimiento</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-serif font-light text-[36px] sm:text-[44px] leading-[1.05] tracking-[-0.01em] text-text mb-12">
            Proceso y
            <br />
            <em className="italic">estado actual</em>
          </h2>
        </FadeIn>

        {/* Horizontal (desktop) */}
        <FadeIn delay={0.15}>
          <div className="hidden lg:block relative">
            <div className="grid grid-cols-8 gap-0">
              {phases.map((phase) => (
                <PhaseNodeHorizontal
                  key={phase.phase}
                  phase={phase}
                  currentPhase={currentPhase}
                  total={TOTAL_PHASES}
                />
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Vertical (mobile) */}
        <FadeIn delay={0.15}>
          <div className="lg:hidden flex flex-col">
            {phases.map((phase, i) => (
              <PhaseNodeVertical
                key={phase.phase}
                phase={phase}
                currentPhase={currentPhase}
                isLast={i === phases.length - 1}
              />
            ))}
          </div>
        </FadeIn>

        {/* Shipping card */}
        {shipping && (
          <FadeIn delay={0.3}>
            <div className="mt-12 border border-rule bg-ivory p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="border border-rule p-3">
                  <Ship className="h-5 w-5 text-text" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-sans font-normal text-[9px] uppercase tracking-[0.22em] text-muted mb-1">
                    Tránsito marítimo en curso
                  </div>
                  <div className="font-serif font-light text-[18px] text-text leading-tight">
                    {shipping.route}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-4 text-[11px]">
                    <span className="text-muted">
                      Contenedor{" "}
                      <span className="num text-text">
                        {shipping.container}
                      </span>
                    </span>
                    <span className="text-muted">
                      Naviera{" "}
                      <span className="text-text">{shipping.carrier}</span>
                    </span>
                    <span className="text-muted">
                      ETA{" "}
                      <span className="text-text">{shipping.etaLabel}</span>
                    </span>
                  </div>
                </div>
              </div>
              <a
                href={shipping.trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-sans font-normal text-[10px] uppercase tracking-[0.22em] border border-rule text-muted px-6 py-3 hover:border-text hover:text-text transition-colors whitespace-nowrap"
              >
                Ver tracking
              </a>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

function PhaseNodeHorizontal({
  phase,
  currentPhase,
  total,
}: {
  phase: PhaseData;
  currentPhase: number;
  total: number;
}) {
  const isCurrent = phase.phase === currentPhase;
  const isCompleted = phase.completed;
  const name = PHASE_LABELS_ES[phase.phase];
  const hasPhotos = phase.photos.length > 0;
  const isLast = phase.phase === total;

  return (
    <div className="relative flex flex-col items-center text-center px-1">
      {/* Connector line */}
      {!isLast && (
        <div
          className={cn(
            "absolute top-[15px] left-[calc(50%+18px)] right-[-50%] h-px",
            isCompleted ? "bg-text" : "bg-rule"
          )}
          aria-hidden="true"
        />
      )}

      {/* Node */}
      <div
        className={cn(
          "relative z-10 h-[30px] w-[30px] rounded-full flex items-center justify-center transition-all",
          isCompleted
            ? "bg-text"
            : isCurrent
              ? "bg-ivory border-2 border-text"
              : "bg-ivory border border-rule"
        )}
      >
        {isCurrent && (
          <span
            className="absolute inset-0 rounded-full bg-text/20 animate-ping"
            aria-hidden="true"
          />
        )}
        <span
          className={cn(
            "num text-[10px] font-normal",
            isCompleted ? "text-ivory" : isCurrent ? "text-text" : "text-muted"
          )}
        >
          {phase.phase}
        </span>
      </div>

      {/* Label */}
      <div className="mt-3 min-h-[44px] max-w-[120px]">
        <div
          className={cn(
            "font-sans font-normal text-[9px] uppercase tracking-[0.12em] leading-[1.3]",
            isCurrent ? "text-text font-medium" : isCompleted ? "text-text" : "text-muted"
          )}
        >
          {name}
        </div>
        {phase.date && (
          <div className="num text-[9px] text-muted mt-1">
            {formatDateShort(phase.date)}
          </div>
        )}
      </div>

      {/* Camera */}
      {hasPhotos && (
        <div
          className="mt-2 inline-flex items-center justify-center text-muted hover:text-text transition-colors"
          aria-label={`${phase.photos.length} fotos disponibles`}
          title={`${phase.photos.length} fotos`}
        >
          <Camera className="h-3.5 w-3.5" strokeWidth={1.5} />
        </div>
      )}
    </div>
  );
}

function PhaseNodeVertical({
  phase,
  currentPhase,
  isLast,
}: {
  phase: PhaseData;
  currentPhase: number;
  isLast: boolean;
}) {
  const isCurrent = phase.phase === currentPhase;
  const isCompleted = phase.completed;
  const name = PHASE_LABELS_ES[phase.phase];

  return (
    <div className="flex gap-4 relative">
      {/* Vertical connector */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "relative z-10 h-[30px] w-[30px] rounded-full flex items-center justify-center shrink-0",
            isCompleted
              ? "bg-text"
              : isCurrent
                ? "bg-ivory border-2 border-text"
                : "bg-ivory border border-rule"
          )}
        >
          {isCurrent && (
            <span
              className="absolute inset-0 rounded-full bg-text/20 animate-ping"
              aria-hidden="true"
            />
          )}
          <span
            className={cn(
              "num text-[10px] font-normal",
              isCompleted
                ? "text-ivory"
                : isCurrent
                  ? "text-text"
                  : "text-muted"
            )}
          >
            {phase.phase}
          </span>
        </div>
        {!isLast && (
          <div
            className={cn(
              "flex-1 w-px min-h-[44px]",
              isCompleted ? "bg-text" : "bg-rule"
            )}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Content */}
      <div className="pb-8 flex-1">
        <div
          className={cn(
            "font-sans font-normal text-[10px] uppercase tracking-[0.18em]",
            isCurrent
              ? "text-text font-medium"
              : isCompleted
                ? "text-text"
                : "text-muted"
          )}
        >
          {name}
        </div>
        <div className="mt-1 flex items-center gap-3">
          {phase.date && (
            <span className="num text-[10px] text-muted">
              {formatDateShort(phase.date)}
            </span>
          )}
          {phase.photos.length > 0 && (
            <span className="inline-flex items-center gap-1 text-[10px] text-muted">
              <Camera className="h-3 w-3" strokeWidth={1.5} />
              <span className="num">{phase.photos.length}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  UPDATES TIMELINE
// ═══════════════════════════════════════════════════════════════════
function UpdatesTimeline({ updates }: { updates: Update[] }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? updates : updates.slice(0, 5);

  return (
    <section className="bg-ivory py-20 px-6 sm:px-10 lg:px-[88px] border-t border-rule">
      <div className="mx-auto max-w-shell">
        <FadeIn>
          <SectionLabel className="mb-5">Actividad</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-serif font-light text-[36px] sm:text-[44px] leading-[1.05] tracking-[-0.01em] text-text mb-10">
            Últimas
            <br />
            <em className="italic">actualizaciones</em>
          </h2>
        </FadeIn>

        <div>
          {visible.map((update, i) => (
            <FadeIn key={update.id} delay={0.15 + i * 0.05}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 py-6 border-b border-rule">
                <div className="font-sans font-normal text-[9px] uppercase tracking-[0.22em] text-muted sm:w-[140px] shrink-0 pt-1">
                  {formatRelativeEs(update.createdAt)}
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-light text-[20px] sm:text-[22px] text-text mb-1 leading-tight">
                    {update.title}
                  </h3>
                  <p className="font-sans font-light text-[13px] leading-[1.7] text-muted">
                    {update.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {updates.length > 5 && !showAll && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 font-sans font-normal text-[10px] uppercase tracking-[0.22em] text-muted hover:text-text transition-colors"
            >
              Ver todas las actualizaciones ({updates.length})
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  LEGAL DISCLAIMER
// ═══════════════════════════════════════════════════════════════════
function LegalDisclaimer() {
  return (
    <section className="bg-ivory py-16 px-6 sm:px-10 lg:px-[88px] border-t border-rule">
      <div className="mx-auto max-w-shell grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
        <div>
          <SectionLabel className="mb-5">Información legal</SectionLabel>
          <p className="font-sans font-light text-[12px] leading-[1.8] text-muted max-w-[600px]">
            La inversión en vehículos conlleva riesgos. Las cifras proyectadas son estimaciones basadas en operaciones similares y las condiciones actuales del mercado. El rendimiento pasado no garantiza resultados futuros. Cada operación se formaliza mediante un contrato de préstamo privado bilateral regulado por los artículos 1740-1757 del Código Civil español.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <a
            href="#"
            className="inline-flex items-center gap-2 font-sans font-normal text-[10px] uppercase tracking-[0.22em] text-muted hover:text-text transition-colors border border-rule px-4 py-3 hover:border-text"
          >
            <FileText className="h-3.5 w-3.5" strokeWidth={1.5} />
            Informe de valoración
            <Download className="h-3 w-3" strokeWidth={1.5} />
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 font-sans font-normal text-[10px] uppercase tracking-[0.22em] text-muted hover:text-text transition-colors border border-rule px-4 py-3 hover:border-text"
          >
            <FileText className="h-3.5 w-3.5" strokeWidth={1.5} />
            Modelo de contrato
            <Download className="h-3 w-3" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  INVESTMENT SIDEBAR
// ═══════════════════════════════════════════════════════════════════
function InvestmentSidebar({ car }: { car: VehicleData }) {
  const progress = Math.min(
    100,
    Math.round((car.raisedEur / car.priceEur) * 100)
  );
  const [amount, setAmount] = useState("1000");

  const numAmount = useMemo(() => {
    const n = parseInt(amount.replace(/[^0-9]/g, ""), 10);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }, [amount]);

  const estimatedReturn = useMemo(
    () => Math.round((numAmount * car.roiPct) / 100),
    [numAmount, car.roiPct]
  );

  const isValid = numAmount >= 1000 && car.status === "open";
  const isFull = car.status === "full";

  return (
    <div className="bg-ivory border border-rule">
      {/* Status */}
      <div className="p-6 pb-0">
        <Badge variant={car.status}>{car.statusLabel}</Badge>
      </div>

      {/* Name */}
      <div className="p-6 pt-4 pb-6">
        <div className="font-sans font-normal text-[9px] uppercase tracking-[0.22em] text-muted mb-2">
          {car.brand} · {car.year}
        </div>
        <h2 className="font-serif font-light text-[26px] sm:text-[28px] leading-tight text-text">
          {car.model}
        </h2>
      </div>

      <div className="h-px bg-rule" />

      {/* Metrics */}
      <div className="p-6 space-y-5">
        <div>
          <div className="font-sans font-normal text-[8.5px] uppercase tracking-[0.22em] text-muted mb-1">
            Inversión necesaria
          </div>
          <div className="num text-[28px] font-light text-text leading-none">
            {formatEur(car.priceEur)}
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="font-sans font-normal text-[8.5px] uppercase tracking-[0.22em] text-muted">
              Financiado
            </span>
            <span className="num text-[11px] text-text font-normal">
              {progress}% · {formatEur(car.raisedEur)}
            </span>
          </div>
          <div className="h-[3px] bg-rule" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <div
              className={cn(
                "h-full transition-all",
                isFull ? "bg-amber" : "bg-text"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <MetricRow label="Rentabilidad estimada" value={`${car.roiPct}%`} accent />
        <MetricRow label="Plazo estimado" value={`~${car.timelineDays} días`} />
        <MetricRow label="Inversión mínima" value="€1.000" />
      </div>

      <div className="h-px bg-rule" />

      {/* Investment input */}
      <div className="p-6 space-y-4">
        <div>
          <label
            htmlFor="investment-amount"
            className="font-sans font-normal text-[8.5px] uppercase tracking-[0.22em] text-muted block mb-2"
          >
            Tu inversión
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans font-light text-[16px] text-muted">
              €
            </span>
            <input
              id="investment-amount"
              type="text"
              inputMode="numeric"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isFull}
              className={cn(
                "num bg-ivory-deep border border-rule pl-10 pr-4 py-3 w-full font-light text-[18px] text-text transition-colors focus:border-text focus:outline-none",
                isFull && "opacity-50 cursor-not-allowed"
              )}
              placeholder="1.000"
            />
          </div>
          {numAmount > 0 && numAmount < 1000 && !isFull && (
            <p className="mt-2 font-sans font-light text-[10px] text-[#c25] uppercase tracking-[0.1em]">
              Mínimo €1.000
            </p>
          )}
        </div>

        {numAmount >= 1000 && !isFull && (
          <div className="border border-amber/40 bg-amber/5 p-3">
            <div className="font-sans font-normal text-[8.5px] uppercase tracking-[0.22em] text-muted mb-1">
              Retorno estimado
            </div>
            <div className="flex justify-between items-baseline">
              <span className="num text-[18px] text-amber font-light">
                +{formatEur(estimatedReturn)}
              </span>
              <span className="font-sans font-light text-[10px] text-muted">
                Total: {formatEur(numAmount + estimatedReturn)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* CTAs */}
      <div className="px-6 pb-6 space-y-3">
        <button
          disabled={!isValid}
          className={cn(
            "w-full font-sans font-normal text-[11px] uppercase tracking-[0.24em] py-4 transition-opacity",
            isValid
              ? "bg-amber text-black hover:opacity-85"
              : "bg-rule text-muted cursor-not-allowed"
          )}
        >
          {isFull ? "Totalmente financiado" : "Invertir ahora"}
        </button>
        <Link
          href={ROUTES.registro}
          className="block text-center w-full border border-rule text-muted font-sans font-normal text-[10px] uppercase tracking-[0.22em] py-3 hover:border-text hover:text-text transition-colors"
        >
          Reservar llamada
        </Link>
      </div>

      {/* Legal note */}
      <div className="px-6 pb-6">
        <p className="font-sans font-light text-[10px] leading-[1.6] text-muted">
          La inversión se formaliza mediante un contrato de préstamo privado bilateral regulado por la legislación española.
        </p>
      </div>
    </div>
  );
}

function MetricRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex justify-between items-baseline">
      <span className="font-sans font-normal text-[8.5px] uppercase tracking-[0.22em] text-muted">
        {label}
      </span>
      <span
        className={cn(
          "num text-[16px] font-light",
          accent ? "text-amber" : "text-text"
        )}
      >
        {value}
      </span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  MOBILE STICKY BOTTOM CTA
// ═══════════════════════════════════════════════════════════════════
function MobileStickyCTA({ progress }: { progress: number }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-black text-white border-t border-white/10">
      <div className="px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="font-sans font-normal text-[8px] uppercase tracking-[0.22em] text-muted">
            Inversión mínima
          </div>
          <div className="flex items-center gap-3">
            <span className="num text-[16px] font-light">€1.000</span>
            <span className="text-muted text-[11px]">
              · <span className="num">{progress}%</span> financiado
            </span>
          </div>
        </div>
        <button className="bg-amber text-black font-sans font-normal text-[10px] uppercase tracking-[0.24em] px-8 py-3 hover:opacity-85 transition-opacity whitespace-nowrap">
          Invertir
        </button>
      </div>
    </div>
  );
}
