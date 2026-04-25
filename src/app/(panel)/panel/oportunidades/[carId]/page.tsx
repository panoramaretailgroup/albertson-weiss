"use client";

import PanelShell from "@/components/panel/PanelShell";
import VehicleGallery from "@/components/panel/VehicleGallery";
import VehicleSpecs from "@/components/panel/VehicleSpecs";
import VehicleTimeline from "@/components/panel/VehicleTimeline";
import VehicleDocuments from "@/components/panel/VehicleDocuments";
import InvestPanel from "@/components/panel/InvestPanel";
import { useStickyScroll } from "@/hooks/useStickyScroll";
import Link from "next/link";
import type { Car } from "@/lib/types";

// ── Placeholder car data ───────────────────────────────────────────────
// Uses Jeep Wrangler 2025 (which has real photos under /public/images/cars/).
const JEEP_BASE = "/images/cars/jeep-wrangler-2025";

const car: Car = {
  id: "opp-jeep-2025",
  brand: "Jeep",
  model: "Wrangler Rubicon",
  year: 2025,
  vin: "1C4PJXFG2SW566069",
  engine: "3.6L Pentastar V6",
  mileage_km: 13802,
  color: "Granite Crystal Metallic",
  equipment: [
    "Rubicon Package",
    "Steel Bumpers",
    "Rock Rails",
    "LED Lighting Group",
    "Cold Weather Group",
    "Trailer Tow Package",
  ],
  purchase_price_usd: 48500,
  target_sale_price_eur: 72000,
  investment_needed_eur: 62000,
  investment_collected_eur: 27400,
  estimated_return_pct: 25,
  estimated_duration_days: 90,
  status: "open",
  logistics_phase: 3,
  logistics_phases: [],
  shipping_container: null,
  shipping_carrier: null,
  shipping_route: null,
  shipping_eta: null,
  photos_showcase: [
    `${JEEP_BASE}/showcase/front.jpg`,
    `${JEEP_BASE}/showcase/front2.jpg`,
    `${JEEP_BASE}/showcase/specs.jpg`,
  ],
  photos_exterior: [
    `${JEEP_BASE}/exterior/front.jpg`,
    `${JEEP_BASE}/exterior/front-detail.jpg`,
    `${JEEP_BASE}/exterior/side.jpg`,
    `${JEEP_BASE}/exterior/rear-quarter.jpg`,
    `${JEEP_BASE}/exterior/rear.jpg`,
    `${JEEP_BASE}/exterior/rear-alt.jpg`,
    `${JEEP_BASE}/exterior/rear-alt2.jpg`,
    `${JEEP_BASE}/exterior/top-angle.jpg`,
  ],
  photos_interior: [
    `${JEEP_BASE}/interior/dashboard.jpg`,
    `${JEEP_BASE}/interior/dashboard-alt.jpg`,
    `${JEEP_BASE}/interior/front-seats.jpg`,
    `${JEEP_BASE}/interior/rear-seats.jpg`,
    `${JEEP_BASE}/interior/rubicon-seats.jpg`,
  ],
  photos_detail: [],
  thumbnail: `${JEEP_BASE}/showcase/front.jpg`,
  created_at: "2026-03-08",
  updated_at: "2026-04-15",
};

const logisticsPhotos = [
  `${JEEP_BASE}/logistics/pickup-1.jpg`,
  `${JEEP_BASE}/logistics/pickup-2.jpg`,
  `${JEEP_BASE}/logistics/pickup-3.jpg`,
  `${JEEP_BASE}/logistics/pickup-4.jpg`,
  `${JEEP_BASE}/logistics/pickup-5.jpg`,
  `${JEEP_BASE}/logistics/pickup-interior.jpg`,
  `${JEEP_BASE}/logistics/warehouse-1.jpg`,
  `${JEEP_BASE}/logistics/warehouse-2.jpg`,
  `${JEEP_BASE}/logistics/warehouse-3.jpg`,
  `${JEEP_BASE}/logistics/tracking-container.jpg`,
  `${JEEP_BASE}/logistics/tracking-route-1.jpg`,
  `${JEEP_BASE}/logistics/tracking-timeline.jpg`,
];

// ── Page ───────────────────────────────────────────────────────────────

function splitModel(model: string): { head: string; tail: string } {
  const parts = model.trim().split(" ");
  if (parts.length === 1) return { head: "", tail: parts[0] };
  const tail = parts[parts.length - 1];
  const head = parts.slice(0, -1).join(" ");
  return { head, tail };
}

export default function PanelCarDetailPage({
  params: _params,
}: {
  params: { carId: string };
}) {
  const basePriceK = Math.round(car.investment_needed_eur / 1000);
  const { head: modelHead, tail: modelTail } = splitModel(car.model);
  const sidebarRef = useStickyScroll<HTMLDivElement>(72);

  return (
    <PanelShell breadcrumb={`${car.brand} ${car.model}`}>
      {/* ── Breadcrumb ────────────────────────────────────────── */}
      <div className="flex items-center gap-2.5 text-[9.5px] uppercase tracking-[0.22em] font-normal mb-8">
        <Link
          href="/panel/oportunidades"
          className="text-muted hover:text-text transition-colors"
        >
          Oportunidades
        </Link>
        <span className="text-rule">/</span>
        <span className="text-muted">{car.brand}</span>
        <span className="text-rule">/</span>
        <span className="text-text">{car.model}</span>
      </div>

      {/* ── Vehicle header ─────────────────────────────────────── */}
      <header className="border-b border-rule pb-10 mb-10 flex flex-col lg:flex-row lg:justify-between lg:items-end gap-10 lg:gap-20">
        <div>
          <div className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted font-normal mb-4">
            {car.brand} · {car.year}
          </div>
          <h1 className="font-serif font-light text-[56px] lg:text-[72px] leading-[1] tracking-[-0.015em] text-text">
            {modelHead && <span>{modelHead} </span>}
            <em className="italic">{modelTail}</em>
          </h1>
        </div>

        <div className="flex flex-wrap gap-x-12 gap-y-6 items-end">
          <HeaderMetric label="Precio base" value={`€${basePriceK}k`} />
          <HeaderMetric
            label="ROI objetivo"
            value={`${car.estimated_return_pct}%`}
            accent
          />
          <HeaderMetric
            label="Plazo estimado"
            value={`${car.estimated_duration_days} días`}
          />
          <HeaderMetric label="Inversión mín." value="€1.000" />
        </div>
      </header>

      {/* ── Gallery ───────────────────────────────────────────── */}
      <VehicleGallery
        carName={`${car.brand} ${car.model}`}
        categories={{
          showcase: car.photos_showcase,
          exterior: car.photos_exterior,
          interior: car.photos_interior,
          logistics: logisticsPhotos,
        }}
      />

      {/* ── Body: left column + sticky-scroll-through right sidebar ─── */}
      <div className="flex gap-16 items-start">
        {/* Left */}
        <div className="flex-1 flex flex-col gap-[88px] min-w-0">
          <VehicleSpecs
            car={car}
            extras={{
              stockNumber: "AWM-2025-0142",
              origin: "Dallas, TX · Subasta Manheim",
              horsepower: "285 hp @ 6.400 rpm",
              torque: "347 Nm @ 4.100 rpm",
              transmission: "Automática 8 velocidades",
              drivetrain: "4x4 Command-Trac Selec-Trac",
              interior: "Cuero negro con pespuntes rojos",
              wheels: 'Llantas aleación 17" Rubicon',
              owners: 1,
              accidentHistory: "Sin accidentes reportados",
              serviceHistory: "Service completo en concesionario",
            }}
          />

          <VehicleTimeline currentPhase={car.logistics_phase} />

          <VehicleDocuments />

          {/* Risk disclosure */}
          <section className="bg-ivory-deep border border-rule p-10 lg:p-12">
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-7 h-px bg-rule" aria-hidden="true" />
              <span className="font-sans text-[9.5px] uppercase tracking-[0.3em] text-muted font-normal">
                Divulgación de riesgos
              </span>
            </div>
            <div className="font-sans text-[11.5px] text-muted font-light leading-[1.85] tracking-[0.015em] max-w-[920px] space-y-5">
              <p>
                La inversión en vehículos de lujo individuales conlleva riesgo
                material. Los rendimientos proyectados son objetivos de
                suscripción basados en datos históricos del mercado y no
                constituyen garantías. Los rendimientos reales dependen del
                precio de venta final europeo, el periodo de tenencia, los
                movimientos de divisa y costes imprevistos.{" "}
                <span className="font-normal text-text">
                  Capital en riesgo: puede recuperar menos de lo invertido.
                </span>
              </p>
              <p>
                Esta página es únicamente un resumen. Antes de invertir, lea el
                Memorándum de Inversión, la Divulgación de Riesgos y el
                Contrato de Suscripción completos. Albertson & Weiss Motors
                S.à r.l. está registrada en Luxemburgo (B.123.456) y
                supervisada por la Commission de Surveillance du Secteur
                Financier (CSSF). Las inversiones no están cubiertas por el
                esquema de garantía de depósitos de Luxemburgo.
              </p>
            </div>
          </section>
        </div>

        {/* Right — sticky scroll-through invest sidebar (desktop only) */}
        <aside
          ref={sidebarRef}
          className="hidden lg:block w-[380px] shrink-0 self-start"
        >
          <InvestPanel car={car} />
        </aside>
      </div>

      {/* Mobile invest panel — shown below content, no sticky */}
      <div className="lg:hidden mt-12">
        <InvestPanel car={car} />
      </div>
    </PanelShell>
  );
}

function HeaderMetric({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="text-right">
      <div className="font-sans text-[8.5px] uppercase tracking-[0.22em] text-muted font-normal mb-2">
        {label}
      </div>
      <div
        className={
          "num text-[26px] font-light tracking-[0.01em] leading-none " +
          (accent ? "text-amber" : "text-text")
        }
      >
        {value}
      </div>
    </div>
  );
}
