"use client";

import { cn } from "@/lib/utils";
import { formatCurrency, formatPercentage, calculateProgress } from "@/lib/utils";
import { CAR_STATUSES } from "@/lib/constants";
import { Car, CarStatus } from "@/lib/types";
import Image from "next/image";
import Badge from "./Badge";
import ProgressBar from "./ProgressBar";

interface CarCardProps {
  car: Car;
  variant?: "dark" | "light";
  href?: string;
  className?: string;
}

const statusBadgeColor: Record<CarStatus, "gold" | "green" | "blue" | "gray" | "red"> = {
  open: "gold",
  funded: "blue",
  in_transit: "blue",
  sold: "green",
  completed: "green",
};

export default function CarCard({
  car,
  variant = "light",
  href,
  className,
}: CarCardProps) {
  const isDark = variant === "dark";
  const progress = calculateProgress(
    car.investment_collected_eur,
    car.investment_needed_eur
  );
  const ctaLabel = car.status === "open" ? "Ver oportunidad" : "Ver detalles";

  const content = (
    <div
      className={cn(
        "group border transition-colors",
        isDark
          ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
          : "border-rule bg-[#f8f5ef] hover:bg-ivory-deep",
        className ?? ""
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {car.thumbnail ? (
          <Image
            src={car.thumbnail}
            alt={`${car.brand} ${car.model}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div
            className={cn(
              "flex h-full items-center justify-center",
              isDark ? "bg-white/[0.02]" : "bg-ivory-deep"
            )}
          >
            <svg
              className={cn(
                "h-12 w-12",
                isDark ? "text-white/20" : "text-rule"
              )}
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
        <div
          className={cn(
            "font-sans font-light text-[9px] uppercase tracking-[0.2em] mb-1.5",
            isDark ? "text-white/50" : "text-muted"
          )}
        >
          {car.brand} · {car.year}
        </div>

        {/* Title */}
        <h3
          className={cn(
            "font-serif font-light text-[22px] leading-tight mb-4",
            isDark ? "text-white" : "text-text"
          )}
        >
          {car.model}
        </h3>

        {/* Metrics row */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div
              className={cn(
                "font-sans font-light text-[8px] uppercase tracking-[0.22em] mb-1",
                isDark ? "text-white/50" : "text-muted"
              )}
            >
              Target ROI
            </div>
            <div className="num text-[18px] font-light text-amber">
              {formatPercentage(car.estimated_return_pct)}
            </div>
          </div>
          <div className="text-right">
            <div
              className={cn(
                "font-sans font-light text-[8px] uppercase tracking-[0.22em] mb-1",
                isDark ? "text-white/50" : "text-muted"
              )}
            >
              Timeline
            </div>
            <div
              className={cn(
                "num text-[18px] font-light",
                isDark ? "text-white" : "text-text"
              )}
            >
              {car.estimated_duration_days}d
            </div>
          </div>
        </div>

        {/* Progress */}
        <ProgressBar value={progress} variant={isDark ? "dark" : "text"} />
        <div className="flex items-center justify-between mt-2">
          <span
            className={cn(
              "num text-[9px] tracking-[0.14em]",
              isDark ? "text-white/50" : "text-muted"
            )}
          >
            {progress}% financiado
          </span>
          <span
            className={cn(
              "num text-[9px] tracking-[0.14em]",
              isDark ? "text-white/50" : "text-muted"
            )}
          >
            {formatCurrency(car.investment_collected_eur)} /{" "}
            {formatCurrency(car.investment_needed_eur)}
          </span>
        </div>

        {/* CTA */}
        <div
          className={cn(
            "mt-5 w-full text-center font-sans text-[10px] uppercase tracking-[0.26em] font-normal py-3.5 transition-opacity hover:opacity-85",
            isDark ? "bg-ivory text-text" : "bg-text text-ivory"
          )}
        >
          {ctaLabel}
        </div>
      </div>
    </div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return content;
}
