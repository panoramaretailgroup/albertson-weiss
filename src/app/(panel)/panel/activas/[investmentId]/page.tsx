"use client";

import PanelShell from "@/components/panel/PanelShell";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  ExternalLink,
  Ship,
  Package,
  Calendar,
  Camera,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

interface Update {
  id: string;
  phase: number | null;
  title: string;
  description: string;
  createdAt: string;
}

type TabKey = "exterior" | "interior" | "details";

interface InvestmentData {
  id: string;
  brand: string;
  model: string;
  year: number;
  vin: string;
  engine: string;
  mileageKm: number;
  color: string;

  // Investment
  investedEur: number;
  expectedReturnEur: number;
  roiPct: number;
  investedAt: string;
  contractUrl: string | null;
  status: "active" | "completed" | "cancelled";
  statusLabel: string;

  // Car state
  currentPhase: number;
  phases: PhaseData[];
  shipping: ShippingInfo | null;

  // Media + updates
  photos: Record<TabKey, string[]>;
  updates: Update[];
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

// â”€â”€ Placeholder data (real Jeep) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const investmentData: InvestmentData = {
  id: "inv-jeep-2025",
  brand: "Jeep",
  model: "Wrangler Rubicon",
  year: 2025,
  vin: "1C4PJXFG2SW566069",
  engine: "3.6L Pentastar V6",
  mileageKm: 13802,
  color: "Negro",

  investedEur: 10000,
  expectedReturnEur: 2500,
  roiPct: 25,
  investedAt: "2026-03-08",
  contractUrl: "/contracts/inv-jeep-2025.pdf",
  status: "active",
  statusLabel: "Activa",

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
    route: "Oakland, US â†’ Rotterdam, NL",
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
    ],
    interior: [
      "/images/cars/jeep-wrangler-2025/interior/front-seats.jpg",
      "/images/cars/jeep-wrangler-2025/interior/rear-seats.jpg",
      "/images/cars/jeep-wrangler-2025/interior/dashboard.jpg",
      "/images/cars/jeep-wrangler-2025/interior/rubicon-seats.jpg",
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
      phase: 5,
      title: "TrÃ¡nsito marÃ­timo iniciado",
      description:
        "Contenedor MEDU9510693 cargado en buque MSC. Ruta Oakland â†’ Rotterdam. ETA 15 mayo.",
      createdAt: "2026-04-04T14:00:00Z",
    },
    {
      id: "u2",
      phase: 3,
      title: "VehÃ­culo recibido en almacÃ©n USA",
      description:
        "InspecciÃ³n visual y mecÃ¡nica completada. Sin daÃ±os. Fotos del almacÃ©n disponibles.",
      createdAt: "2026-03-11T10:00:00Z",
    },
    {
      id: "u3",
      phase: 2,
      title: "Recogido en Eugene, Oregon",
      description:
        "Pickup completado por Super Dispatch. VehÃ­culo en ruta al almacÃ©n de consolidaciÃ³n.",
      createdAt: "2026-03-10T08:00:00Z",
    },
    {
      id: "u4",
      phase: 1,
      title: "Adquirido en subasta",
      description:
        "Jeep Wrangler Rubicon 2025 adquirido con Ã©xito. VIN 1C4PJXFG2SW566069.",
      createdAt: "2026-03-09T16:30:00Z",
    },
  ],
};

// â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

function formatDateShort(iso: string): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
  }).format(new Date(iso));
}

function formatRelative(iso: string): string {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 60) return `hace ${mins} min`;
  if (mins < 60 * 24) return `hace ${Math.floor(mins / 60)} h`;
  const days = Math.floor(mins / (60 * 24));
  if (days < 7) return `hace ${days} d`;
  return formatDate(iso);
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// PAGE
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
export default function InvestmentDetailPage({
  params: _params,
}: {
  params: { investmentId: string };
}) {
  const inv = investmentData;

  return (
    <PanelShell breadcrumb={`${inv.brand} ${inv.model}`}>
      <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto max-w-[1280px]">
        {/* Back link */}
        <Link
          href={ROUTES.panelActivas}
          className="mb-6 inline-flex items-center gap-1 font-sans text-[11px] uppercase tracking-[0.2em] text-muted hover:text-text transition-colors"
        >
          <ChevronLeft className="h-3 w-3" />
          Volver a portfolio
        </Link>

        {/* Header + Your Investment */}
        <YourInvestmentCard inv={inv} />

        {/* Two column: gallery + updates */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[3fr_2fr]">
          <div className="space-y-6">
            <Gallery photos={inv.photos} />
            <PhaseTimeline phases={inv.phases} currentPhase={inv.currentPhase} />
            {inv.shipping && <ShippingCard shipping={inv.shipping} />}
          </div>

          <div className="space-y-6">
            <SpecsCard inv={inv} />
            <UpdatesTimeline updates={inv.updates} />
          </div>
        </div>
      </div>
    </PanelShell>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// YOUR INVESTMENT CARD
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function YourInvestmentCard({ inv }: { inv: InvestmentData }) {
  return (
    <div className=" border border-rule bg-[#f8f5ef] p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
        <div>
          <div className="font-sans font-normal text-[9px] uppercase tracking-[0.22em] text-muted mb-1">
            {inv.brand} Â· {inv.year} Â· VIN <span className="num">{inv.vin}</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-light text-text leading-tight">
            {inv.model}
          </h1>
        </div>
        <div className="inline-flex items-center self-start sm:self-auto px-3 py-1 bg-green/10 text-green font-sans text-[10px] uppercase tracking-[0.22em]">
          {inv.statusLabel}
        </div>
      </div>

      <div className="border-t border-rule pt-5">
        <div className="font-sans font-normal text-[9px] uppercase tracking-[0.22em] text-muted mb-4">
          Tu inversiÃ³n
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <YourMetric
            label="Invertido"
            value={formatCurrency(inv.investedEur)}
          />
          <YourMetric
            label="Retorno esperado"
            value={`+${formatCurrency(inv.expectedReturnEur)}`}
            accent
          />
          <YourMetric label="ROI" value={`${inv.roiPct}%`} accent />
          <YourMetric label="Fecha" value={formatDate(inv.investedAt)} small />
        </div>

        {inv.contractUrl && (
          <a
            href={inv.contractUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.22em] text-muted hover:text-text border-b border-rule hover:border-text pb-0.5 transition-colors"
          >
            <FileText className="h-3 w-3" />
            Contrato de inversiÃ³n
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  );
}

function YourMetric({
  label,
  value,
  accent,
  small,
}: {
  label: string;
  value: string;
  accent?: boolean;
  small?: boolean;
}) {
  return (
    <div>
      <div className="font-sans font-normal text-[8px] uppercase tracking-[0.22em] text-muted mb-1">
        {label}
      </div>
      <div
        className={cn(
          "num font-light leading-tight",
          small ? "text-[13px]" : "text-[18px]",
          accent ? "text-amber" : "text-text"
        )}
      >
        {value}
      </div>
    </div>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// GALLERY (tabs + lightbox)
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function Gallery({ photos }: { photos: Record<TabKey, string[]> }) {
  const [tab, setTab] = useState<TabKey>("exterior");
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);

  const current = photos[tab];

  useEffect(() => {
    setIdx(0);
  }, [tab]);

  const next = useCallback(
    () => setIdx((i) => (i + 1) % current.length),
    [current.length]
  );
  const prev = useCallback(
    () => setIdx((i) => (i - 1 + current.length) % current.length),
    [current.length]
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, next, prev]);

  const tabs: Array<{ key: TabKey; label: string }> = [
    { key: "exterior", label: "Exterior" },
    { key: "interior", label: "Interior" },
    { key: "details", label: "Detalles" },
  ];

  return (
    <div className=" border border-rule bg-[#f8f5ef] overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-rule">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "flex-1 px-4 py-3 font-sans text-[10px] uppercase tracking-[0.22em] transition-colors",
              tab === t.key
                ? "bg-text text-white"
                : "text-muted hover:text-text"
            )}
          >
            {t.label}{" "}
            <span className="num opacity-60">({photos[t.key].length})</span>
          </button>
        ))}
      </div>

      {/* Main image */}
      <button
        onClick={() => current.length > 0 && setOpen(true)}
        disabled={current.length === 0}
        className="relative block w-full h-[320px] sm:h-[420px] bg-ivory-deep cursor-zoom-in disabled:cursor-default"
        aria-label="Ampliar foto"
      >
        <AnimatePresence mode="wait">
          {current[idx] && (
            <motion.div
              key={`${tab}-${idx}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <Image
                src={current[idx]}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Thumbnails */}
      {current.length > 1 && (
        <div className="grid grid-cols-5 gap-1 p-2">
          {current.map((src, i) => (
            <button
              key={`${tab}-t-${i}`}
              onClick={() => setIdx(i)}
              className={cn(
                "relative h-16 overflow-hidden transition-all",
                idx === i
                  ? "ring-2 ring-gray-900 opacity-100"
                  : "opacity-50 hover:opacity-100"
              )}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="120px" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {open && current[idx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-6 top-6 text-white/70 hover:text-white p-2"
              aria-label="Cerrar"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="absolute left-6 top-6 font-sans text-[10px] uppercase tracking-[0.22em] text-white/60">
              <span className="num">{idx + 1}</span> /{" "}
              <span className="num">{current.length}</span>
            </div>
            {current.length > 1 && (
              <button
                onClick={prev}
                className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
            )}
            <div className="relative h-[90vh] w-[90vw]">
              <Image
                src={current[idx]}
                alt=""
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
            {current.length > 1 && (
              <button
                onClick={next}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3"
                aria-label="Siguiente"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// PHASE TIMELINE
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function PhaseTimeline({
  phases,
  currentPhase,
}: {
  phases: PhaseData[];
  currentPhase: number;
}) {
  const [lightbox, setLightbox] = useState<PhaseData | null>(null);
  const [lbIdx, setLbIdx] = useState(0);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft")
        setLbIdx((i) => (i - 1 + lightbox.photos.length) % lightbox.photos.length);
      if (e.key === "ArrowRight")
        setLbIdx((i) => (i + 1) % lightbox.photos.length);
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <div className=" border border-rule bg-[#f8f5ef] p-6">
      <h2 className="font-serif text-lg font-light text-text mb-5">
        Proceso logÃ­stico
      </h2>

      {/* Vertical timeline of 8 phases */}
      <div className="space-y-0">
        {phases.map((p, i) => {
          const isCompleted = p.completed;
          const isCurrent = p.phase === currentPhase;
          const hasPhotos = p.photos.length > 0;
          const isLast = i === phases.length - 1;

          return (
            <div key={p.phase} className="flex gap-4">
              {/* Node + line */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "relative h-7 w-7 rounded-full border-[1.5px] flex items-center justify-center shrink-0",
                    isCompleted
                      ? "bg-text border-text"
                      : isCurrent
                        ? "bg-[#f8f5ef] border-amber"
                        : "bg-[#f8f5ef] border-rule"
                  )}
                >
                  {isCurrent && (
                    <span
                      className="absolute inset-0 rounded-full bg-amber/30 animate-ping"
                      aria-hidden="true"
                    />
                  )}
                  {isCompleted ? (
                    <svg
                      className="h-3 w-3 text-white relative z-[1]"
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
                        "num text-[10px] relative z-[1]",
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
                      "w-[1.5px] flex-1 min-h-[36px]",
                      isCompleted ? "bg-text" : "bg-rule"
                    )}
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Content */}
              <div className={cn("flex-1 pb-6", isLast && "pb-0")}>
                <div
                  className={cn(
                    "font-sans text-[11px] uppercase tracking-[0.2em]",
                    isCurrent
                      ? "text-text font-medium"
                      : isCompleted
                        ? "text-text"
                        : "text-muted"
                  )}
                >
                  {PHASE_LABELS[p.phase]}
                </div>
                <div className="mt-1 flex items-center gap-3 text-[10px]">
                  {p.date && (
                    <span className="num text-muted">
                      {formatDateShort(p.date)}
                    </span>
                  )}
                  {hasPhotos && (
                    <button
                      onClick={() => {
                        setLightbox(p);
                        setLbIdx(0);
                      }}
                      className="inline-flex items-center gap-1 text-muted hover:text-text transition-colors"
                    >
                      <Camera className="h-3 w-3" />
                      <span className="num">{p.photos.length}</span> fotos
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox for phase photos */}
      <AnimatePresence>
        {lightbox && lightbox.photos[lbIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute right-6 top-6 text-white/70 hover:text-white p-2"
              aria-label="Cerrar"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="absolute left-6 top-6">
              <div className="font-sans text-[10px] uppercase tracking-[0.22em] text-white/60 mb-1">
                Fase {lightbox.phase} Â· {PHASE_LABELS[lightbox.phase]}
              </div>
              <div className="font-sans text-[10px] uppercase tracking-[0.22em] text-white/40">
                <span className="num">{lbIdx + 1}</span> /{" "}
                <span className="num">{lightbox.photos.length}</span>
              </div>
            </div>
            {lightbox.photos.length > 1 && (
              <button
                onClick={() =>
                  setLbIdx(
                    (i) =>
                      (i - 1 + lightbox.photos.length) % lightbox.photos.length
                  )
                }
                className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
            )}
            <div className="relative h-[90vh] w-[90vw]">
              <Image
                src={lightbox.photos[lbIdx]}
                alt=""
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
            {lightbox.photos.length > 1 && (
              <button
                onClick={() =>
                  setLbIdx((i) => (i + 1) % lightbox.photos.length)
                }
                className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3"
                aria-label="Siguiente"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SHIPPING CARD
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function ShippingCard({ shipping }: { shipping: ShippingInfo }) {
  return (
    <div className=" border border-rule bg-[#f8f5ef] p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center bg-ivory-deep">
          <Ship className="h-4 w-4 text-muted" strokeWidth={1.5} />
        </div>
        <div>
          <div className="font-sans text-[9px] uppercase tracking-[0.22em] text-muted">
            TrÃ¡nsito marÃ­timo
          </div>
          <h3 className="font-serif text-lg font-light text-text">
            {shipping.route}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-rule pt-4">
        <InfoItem icon={Package} label="Contenedor" value={shipping.container} />
        <InfoItem icon={Ship} label="Naviera" value={shipping.carrier} />
        <InfoItem icon={Calendar} label="ETA" value={shipping.etaLabel} />
      </div>

      <a
        href={shipping.trackingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.22em] text-muted hover:text-text border-b border-rule hover:border-text pb-0.5 transition-colors"
      >
        Ver tracking en {shipping.carrier}
        <ExternalLink className="h-3 w-3" />
      </a>
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Package;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="h-3.5 w-3.5 text-muted mt-0.5 shrink-0" />
      <div className="min-w-0">
        <div className="font-sans text-[8px] uppercase tracking-[0.22em] text-muted mb-0.5">
          {label}
        </div>
        <div className="num text-[12px] text-text truncate">{value}</div>
      </div>
    </div>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SPECS CARD (sidebar)
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function SpecsCard({ inv }: { inv: InvestmentData }) {
  const specs: Array<[string, string]> = [
    ["AÃ±o", String(inv.year)],
    ["Motor", inv.engine],
    ["Kilometraje", `${inv.mileageKm.toLocaleString("es-ES")} km`],
    ["Color", inv.color],
    ["VIN", inv.vin],
  ];

  return (
    <div className=" border border-rule bg-[#f8f5ef] p-6">
      <h2 className="font-serif text-lg font-light text-text mb-5">
        Ficha tÃ©cnica
      </h2>
      <dl className="space-y-3">
        {specs.map(([label, value]) => (
          <div
            key={label}
            className="flex justify-between items-baseline border-b border-rule pb-2 last:border-0"
          >
            <dt className="font-sans font-normal text-[9px] uppercase tracking-[0.22em] text-muted">
              {label}
            </dt>
            <dd className="num text-[12px] text-text text-right truncate max-w-[60%]">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// UPDATES TIMELINE
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function UpdatesTimeline({ updates }: { updates: Update[] }) {
  return (
    <div className=" border border-rule bg-[#f8f5ef] p-6">
      <h2 className="font-serif text-lg font-light text-text mb-5">
        Actualizaciones
      </h2>
      <div className="space-y-5">
        {updates.map((u, i) => (
          <div key={u.id} className="relative flex gap-3">
            {i < updates.length - 1 && (
              <div
                className="absolute top-7 left-[11px] w-px h-[calc(100%-12px)] bg-rule"
                aria-hidden="true"
              />
            )}
            <div className="h-6 w-6 rounded-full bg-text text-white flex items-center justify-center shrink-0 z-[1]">
              <span className="num text-[9px]">{u.phase ?? "â€”"}</span>
            </div>
            <div className="flex-1 min-w-0 pb-1">
              <div className="font-sans text-[12px] font-medium text-text leading-tight">
                {u.title}
              </div>
              <p className="mt-1 font-sans text-[11px] font-light text-muted leading-relaxed">
                {u.description}
              </p>
              <div className="mt-1 font-sans text-[9px] uppercase tracking-[0.22em] text-muted">
                {formatRelative(u.createdAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
