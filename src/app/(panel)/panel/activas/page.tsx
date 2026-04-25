"use client";

import PanelShell from "@/components/panel/PanelShell";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { Ship, Calendar, Package, MapPin, Briefcase } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface PhaseData {
  phase: number;
  completed: boolean;
  date: string | null;
  photos: string[];
}

interface ShippingInfo {
  container: string;
  carrier: string;
  route: string;
  etaLabel: string;
  trackingUrl: string;
}

interface ActiveInvestment {
  id: string;
  brand: string;
  model: string;
  year: number;
  thumbnail: string;
  investedEur: number;
  expectedReturnEur: number;
  roiPct: number;
  investedAt: string;
  currentPhase: number;
  phases: PhaseData[];
  shipping: ShippingInfo | null;
}

const PHASE_LABELS: Record<number, string> = {
  1: "Adquirido",
  2: "TrÃ¡nsito al almacÃ©n",
  3: "ImportaciÃ³n y aduanas",
  4: "PreparaciÃ³n y certificaciÃ³n",
  5: "Listado en venta",
  6: "Con oferta",
  7: "Vendido",
  8: "Pago procesado",
};

// â”€â”€ Placeholder data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const investments: ActiveInvestment[] = [
  {
    id: "inv-jeep-2025",
    brand: "Jeep",
    model: "Wrangler Rubicon",
    year: 2025,
    thumbnail: "/images/cars/jeep-wrangler-2025/showcase/front.jpg",
    investedEur: 10000,
    expectedReturnEur: 2500,
    roiPct: 25,
    investedAt: "2026-03-08",
    currentPhase: 3,
    phases: [
      { phase: 1, completed: true, date: "2026-03-09", photos: [] },
      { phase: 2, completed: true, date: "2026-03-10", photos: [] },
      { phase: 3, completed: false, date: null, photos: [] },
      { phase: 4, completed: false, date: null, photos: [] },
      { phase: 5, completed: false, date: null, photos: [] },
      { phase: 6, completed: false, date: null, photos: [] },
      { phase: 7, completed: false, date: null, photos: [] },
      { phase: 8, completed: false, date: null, photos: [] },
    ],
    shipping: {
      container: "MEDU9510693",
      carrier: "MSC",
      route: "Oakland, US â†’ Rotterdam, NL",
      etaLabel: "15 mayo 2026",
      trackingUrl:
        "https://www.msc.com/track-a-shipment?query=MEDU9510693",
    },
  },
  {
    id: "inv-mustang-2022",
    brand: "Ford",
    model: "Mustang GT",
    year: 2022,
    thumbnail:
      "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80",
    investedEur: 5000,
    expectedReturnEur: 1100,
    roiPct: 22,
    investedAt: "2026-04-02",
    currentPhase: 2,
    phases: [
      { phase: 1, completed: true, date: "2026-04-03", photos: [] },
      { phase: 2, completed: false, date: null, photos: [] },
      { phase: 3, completed: false, date: null, photos: [] },
      { phase: 4, completed: false, date: null, photos: [] },
      { phase: 5, completed: false, date: null, photos: [] },
      { phase: 6, completed: false, date: null, photos: [] },
      { phase: 7, completed: false, date: null, photos: [] },
      { phase: 8, completed: false, date: null, photos: [] },
    ],
    shipping: null,
  },
];

// â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function ActivasPage() {
  return (
    <PanelShell breadcrumb="Portfolio">
      <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto max-w-[1280px]">
        <div className="mb-8">
          <h1 className="font-serif text-2xl font-light text-text">
            Inversiones activas
          </h1>
          <p className="mt-1 text-sm font-light text-muted">
            {investments.length}{" "}
            {investments.length === 1 ? "inversiÃ³n" : "inversiones"} en curso
          </p>
        </div>

        {investments.length > 0 ? (
          <div className="space-y-4">
            {investments.map((inv) => (
              <InvestmentRow key={inv.id} investment={inv} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </PanelShell>
  );
}

// â”€â”€ Investment row â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function InvestmentRow({ investment }: { investment: ActiveInvestment }) {
  const completedPhases = investment.phases.filter((p) => p.completed).length;
  const progressPct = (completedPhases / investment.phases.length) * 100;

  return (
    <div className="overflow-hidden border border-rule bg-[#f8f5ef] ">
      <div className="flex flex-col lg:flex-row">
        {/* Thumbnail */}
        <div className="relative w-full lg:w-[240px] h-[180px] lg:h-auto shrink-0">
          <Image
            src={investment.thumbnail}
            alt={`${investment.brand} ${investment.model}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 240px"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
              <div className="font-sans text-[9px] uppercase tracking-[0.22em] text-muted mb-1">
                {investment.brand} Â· {investment.year}
              </div>
              <h2 className="font-serif text-xl font-light text-text leading-tight">
                {investment.model}
              </h2>
            </div>
            <Link
              href={`${ROUTES.panelActivas}/${investment.id}`}
              className="inline-flex items-center justify-center self-start sm:self-auto font-sans font-normal text-[10px] uppercase tracking-[0.22em] bg-text text-white px-5 py-2.5 hover:bg-text transition-colors"
            >
              Ver detalle
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Metric
              label="Invertido"
              value={formatCurrency(investment.investedEur)}
            />
            <Metric
              label="Retorno esperado"
              value={`+${formatCurrency(investment.expectedReturnEur)}`}
              accent
            />
            <Metric label="ROI" value={`${investment.roiPct}%`} accent />
            <Metric
              label="Fecha"
              value={new Intl.DateTimeFormat("es-ES", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }).format(new Date(investment.investedAt))}
            />
          </div>

          <PhaseTracker
            phases={investment.phases}
            currentPhase={investment.currentPhase}
            progressPct={progressPct}
          />

          {investment.shipping && (
            <ShippingCard shipping={investment.shipping} />
          )}
        </div>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="font-sans font-normal text-[8px] uppercase tracking-[0.22em] text-muted mb-1">
        {label}
      </div>
      <div
        className={cn(
          "num text-[15px] font-light leading-none",
          accent ? "text-amber" : "text-text"
        )}
      >
        {value}
      </div>
    </div>
  );
}

// â”€â”€ Phase tracker â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function PhaseTracker({
  phases,
  currentPhase,
  progressPct,
}: {
  phases: PhaseData[];
  currentPhase: number;
  progressPct: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-[9px] font-normal uppercase tracking-[0.2em] text-muted mb-2">
        <span>
          Fase <span className="num text-text">{currentPhase}</span> / 8 Â·{" "}
          {PHASE_LABELS[currentPhase]}
        </span>
        <span className="num">{Math.round(progressPct)}%</span>
      </div>

      <div className="relative flex items-center">
        {phases.map((p, i) => {
          const isLast = i === phases.length - 1;
          const isCompleted = p.completed;
          const isCurrent = p.phase === currentPhase;
          return (
            <div key={p.phase} className="flex items-center flex-1">
              <div
                className={cn(
                  "relative h-5 w-5 rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-colors",
                  isCompleted
                    ? "bg-text border-text"
                    : isCurrent
                      ? "bg-[#f8f5ef] border-amber"
                      : "bg-[#f8f5ef] border-rule"
                )}
                title={`Fase ${p.phase}: ${PHASE_LABELS[p.phase]}`}
              >
                {isCurrent && (
                  <span
                    className="absolute inset-0 rounded-full bg-amber/30 animate-ping"
                    aria-hidden="true"
                  />
                )}
                {isCompleted ? (
                  <svg
                    className="h-2.5 w-2.5 text-white relative z-[1]"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 6.5L4.5 9L10 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span
                    className={cn(
                      "num text-[8px] relative z-[1]",
                      isCurrent ? "text-amber" : "text-muted"
                    )}
                  >
                    {p.phase}
                  </span>
                )}
              </div>

              {!isLast && (
                <div
                  className={cn(
                    "flex-1 h-[1.5px] mx-1",
                    isCompleted ? "bg-text" : "bg-rule"
                  )}
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ShippingCard({ shipping }: { shipping: ShippingInfo }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-t border-rule pt-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center bg-ivory-deep shrink-0">
          <Ship className="h-4 w-4 text-muted" strokeWidth={1.5} />
        </div>
        <div>
          <div className="font-sans text-[9px] uppercase tracking-[0.2em] text-muted mb-1">
            TrÃ¡nsito marÃ­timo
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text">
            <span className="inline-flex items-center gap-1">
              <Package className="h-3 w-3 text-muted" />
              <span className="num">{shipping.container}</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3 text-muted" />
              {shipping.route}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3 text-muted" />
              ETA <span className="num">{shipping.etaLabel}</span>
            </span>
          </div>
        </div>
      </div>
      <a
        href={shipping.trackingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-sans font-normal text-[10px] uppercase tracking-[0.22em] text-muted hover:text-text border-b border-rule hover:border-text pb-0.5 transition-colors whitespace-nowrap"
      >
        Ver tracking
      </a>
    </div>
  );
}

function EmptyState() {
  return (
    <div className=" border border-rule bg-[#f8f5ef] p-12 text-center">
      <Briefcase
        className="mx-auto h-10 w-10 text-rule"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <h3 className="mt-4 font-serif text-lg font-light text-text">
        No tienes inversiones activas
      </h3>
      <p className="mt-2 text-sm font-light text-muted max-w-md mx-auto">
        Explora las oportunidades disponibles y empieza a invertir desde â‚¬1.000
        por vehÃ­culo.
      </p>
      <Link
        href={ROUTES.panelOportunidades}
        className="mt-6 inline-flex items-center justify-center font-sans font-normal text-[10px] uppercase tracking-[0.24em] bg-amber text-black px-6 py-3 hover:opacity-85 transition-opacity"
      >
        Ver oportunidades
      </Link>
    </div>
  );
}
