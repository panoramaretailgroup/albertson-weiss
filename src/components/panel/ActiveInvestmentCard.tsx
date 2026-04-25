"use client";

import { cn } from "@/lib/utils";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { CAR_STATUSES } from "@/lib/constants";
import Badge from "@/components/ui/Badge";
import type { Investment, CarStatus } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

interface ActiveInvestmentCardProps {
  investment: Investment;
  className?: string;
}

const statusBadgeColor: Record<
  CarStatus,
  "gold" | "green" | "blue" | "gray" | "red"
> = {
  open: "gold",
  funded: "blue",
  in_transit: "blue",
  sold: "green",
  completed: "green",
};

const LOGISTICS_PHASES = [
  "Subasta",
  "Recogida",
  "Almacén USA",
  "Embarque",
  "Tránsito",
  "Aduana EU",
  "Preparación",
  "Venta",
];

export default function ActiveInvestmentCard({
  investment,
  className,
}: ActiveInvestmentCardProps) {
  const car = investment.car;
  if (!car) return null;

  const currentPhase = Math.min(
    Math.max(car.logistics_phase ?? 1, 1),
    LOGISTICS_PHASES.length
  );
  const phaseName = LOGISTICS_PHASES[currentPhase - 1];
  const phasePct = Math.round((currentPhase / LOGISTICS_PHASES.length) * 100);

  return (
    <Link
      href={`/panel/activas/${investment.id}`}
      className={cn(
        "group block border border-rule bg-[#f8f5ef] transition-colors hover:bg-ivory-deep",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {car.thumbnail ? (
          <Image
            src={car.thumbnail}
            alt={`${car.brand} ${car.model}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-ivory-deep">
            <svg
              className="h-10 w-10 text-rule"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
        <div className="absolute left-3 top-3">
          <Badge color={statusBadgeColor[car.status]}>
            {CAR_STATUSES[car.status]}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Eyebrow */}
        <div className="font-sans font-light text-[9px] uppercase tracking-[0.2em] text-muted mb-1.5">
          {car.brand} · {car.year}
        </div>

        {/* Title */}
        <h3 className="font-serif font-light text-[22px] leading-tight text-text mb-5">
          {car.model}
        </h3>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-x-8 mb-5">
          <div>
            <div className="font-sans font-light text-[8px] uppercase tracking-[0.22em] text-muted mb-1">
              Tu inversión
            </div>
            <div className="num text-[18px] font-light text-text">
              {formatCurrency(investment.amount_eur)}
            </div>
          </div>
          <div>
            <div className="font-sans font-light text-[8px] uppercase tracking-[0.22em] text-muted mb-1">
              Rentabilidad est.
            </div>
            <div className="num text-[18px] font-light text-green">
              {investment.expected_return_eur
                ? `+${formatCurrency(investment.expected_return_eur)}`
                : `+${formatPercentage(car.estimated_return_pct)}`}
            </div>
          </div>
        </div>

        {/* Step tracker */}
        <div className="flex items-center gap-[3px] mb-2">
          {LOGISTICS_PHASES.map((_, j) => {
            const idx = j + 1;
            const done = idx < currentPhase;
            const active = idx === currentPhase;
            return (
              <div
                key={j}
                className={cn(
                  "flex-1 h-[3px]",
                  done ? "bg-text" : active ? "bg-amber" : "bg-rule"
                )}
              />
            );
          })}
        </div>

        {/* Phase label row */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-amber text-[9px] uppercase tracking-[0.14em]">
            <span
              className="inline-block w-1 h-1 rounded-full bg-amber"
              aria-hidden="true"
            />
            {phaseName}
          </span>
          <span className="num text-muted text-[9px]">{phasePct}%</span>
        </div>

        {/* Ver detalle */}
        <div className="flex items-center gap-1.5 justify-end mt-4 font-sans text-[9px] uppercase tracking-[0.22em] text-muted group-hover:text-text transition-colors">
          Ver detalle
          <svg
            width="10"
            height="6"
            viewBox="0 0 16 10"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M0 5h14M10 1l4 4-4 4"
              stroke="currentColor"
              strokeWidth="0.8"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
