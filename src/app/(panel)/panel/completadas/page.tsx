"use client";

import PanelShell from "@/components/panel/PanelShell";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

interface CompletedInvestment {
  id: string;
  brand: string;
  model: string;
  year: number;
  thumbnail: string | null;
  investedEur: number;
  returnedEur: number;
  roiPct: number;
  durationDays: number;
  completedAt: string;
}

// â”€â”€ Placeholder data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const completed: CompletedInvestment[] = [
  {
    id: "inv-c1",
    brand: "Dodge",
    model: "Challenger SRT",
    year: 2022,
    thumbnail: null,
    investedEur: 12000,
    returnedEur: 15168,
    roiPct: 26.4,
    durationDays: 88,
    completedAt: "2025-12-10",
  },
  {
    id: "inv-c2",
    brand: "Tesla",
    model: "Model 3 Performance",
    year: 2023,
    thumbnail: null,
    investedEur: 8000,
    returnedEur: 9696,
    roiPct: 21.2,
    durationDays: 65,
    completedAt: "2026-01-20",
  },
];

export default function CompletadasPage() {
  const totalInvested = completed.reduce((s, i) => s + i.investedEur, 0);
  const totalReturned = completed.reduce((s, i) => s + i.returnedEur, 0);
  const totalProfit = totalReturned - totalInvested;
  const avgRoi =
    completed.length > 0
      ? completed.reduce((s, i) => s + i.roiPct, 0) / completed.length
      : 0;

  return (
    <PanelShell breadcrumb="Completadas">
      <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto max-w-[1280px]">
        <div className="mb-8">
          <h1 className="font-serif text-2xl font-light text-text">
            Inversiones completadas
          </h1>
          <p className="mt-1 text-sm font-light text-muted">
            Historial de operaciones finalizadas con Ã©xito.
          </p>
        </div>

        {completed.length > 0 ? (
          <>
            {/* Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-[2px] mb-8">
              <SummaryCard
                label="Total invertido"
                value={formatCurrency(totalInvested)}
              />
              <SummaryCard
                label="Total retornado"
                value={formatCurrency(totalReturned)}
              />
              <SummaryCard
                label="Beneficio"
                value={`+${formatCurrency(totalProfit)}`}
                accent
              />
              <SummaryCard
                label="ROI medio"
                value={`${avgRoi.toFixed(1).replace(".", ",")}%`}
                accent
              />
            </div>

            {/* List */}
            <div className="space-y-4">
              {completed.map((inv) => (
                <CompletedRow key={inv.id} inv={inv} />
              ))}
            </div>
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </PanelShell>
  );
}

function SummaryCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-[#f8f5ef] border border-rule p-5">
      <div className="font-sans font-normal text-[9px] uppercase tracking-[0.22em] text-muted mb-2">
        {label}
      </div>
      <div
        className={cn(
          "num text-[22px] sm:text-[24px] font-light leading-none",
          accent ? "text-amber" : "text-text"
        )}
      >
        {value}
      </div>
    </div>
  );
}

function CompletedRow({ inv }: { inv: CompletedInvestment }) {
  const profit = inv.returnedEur - inv.investedEur;
  const completedDate = new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(inv.completedAt));

  return (
    <div className="overflow-hidden border border-rule bg-[#f8f5ef]">
      <div className="flex flex-col sm:flex-row">
        {/* Thumbnail */}
        <div className="relative w-full sm:w-[200px] h-[140px] sm:h-auto shrink-0 bg-ivory-deep">
          {inv.thumbnail ? (
            <Image
              src={inv.thumbnail}
              alt={`${inv.brand} ${inv.model}`}
              fill
              className="object-cover"
              sizes="200px"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <CheckCircle
                className="h-8 w-8 text-muted"
                strokeWidth={1.2}
                aria-hidden="true"
              />
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 bg-amber text-black font-sans text-[9px] uppercase tracking-[0.22em] px-2 py-1">
              <CheckCircle className="h-3 w-3" strokeWidth={2} />
              Completada
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 sm:p-6">
          <div className="mb-4">
            <div className="font-sans text-[9px] uppercase tracking-[0.22em] text-muted mb-1">
              {inv.brand} Â· {inv.year}
            </div>
            <h2 className="font-serif text-xl font-light text-text leading-tight">
              {inv.model}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Metric
              label="Invertido"
              value={formatCurrency(inv.investedEur)}
            />
            <Metric
              label="Retornado"
              value={`+${formatCurrency(profit)}`}
              accent
            />
            <Metric label="ROI" value={`${inv.roiPct.toFixed(1).replace(".", ",")}%`} accent />
            <Metric label="DuraciÃ³n" value={`${inv.durationDays} dÃ­as`} />
          </div>

          <div className="mt-4 pt-4 border-t border-rule font-sans text-[10px] uppercase tracking-[0.22em] text-muted">
            Completada el <span className="num text-text">{completedDate}</span>
          </div>
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

function EmptyState() {
  return (
    <div className=" border border-rule bg-[#f8f5ef] p-12 text-center">
      <CheckCircle
        className="mx-auto h-10 w-10 text-rule"
        strokeWidth={1.5}
      />
      <h3 className="mt-4 font-serif text-lg font-light text-text">
        AÃºn no tienes inversiones completadas
      </h3>
      <p className="mt-2 text-sm font-light text-muted max-w-md mx-auto">
        Tus operaciones activas aparecerÃ¡n aquÃ­ cuando se completen y liquiden
        los retornos.
      </p>
    </div>
  );
}
