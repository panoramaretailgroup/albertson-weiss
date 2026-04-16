"use client";

import { cn } from "@/lib/utils";
import { formatCurrency, formatPercentage, calculateProgress } from "@/lib/utils";
import { CAR_STATUSES } from "@/lib/constants";
import { Car, CarStatus } from "@/lib/types";
import Image from "next/image";
import Badge from "./Badge";
import ProgressBar from "./ProgressBar";
import Button from "./Button";

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

  const content = (
    <div
      className={cn(
        "group overflow-hidden rounded-xl border transition-all",
        isDark
          ? "border-gold/20 bg-white/5 hover:border-gold/40 hover:bg-white/10"
          : "border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-gray-300",
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
              isDark ? "bg-brown/50" : "bg-gray-100"
            )}
          >
            <svg
              className={cn(
                "h-12 w-12",
                isDark ? "text-cream/20" : "text-gray-300"
              )}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
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
      <div className="p-4">
        {/* Title */}
        <h3
          className={cn(
            "text-lg font-semibold",
            isDark ? "text-cream" : "text-gray-900"
          )}
        >
          {car.brand} {car.model}
        </h3>

        {/* Info */}
        <div
          className={cn(
            "mt-1 flex items-center gap-2 text-sm",
            isDark ? "text-cream/60" : "text-gray-500"
          )}
        >
          <span>{car.year}</span>
          {car.engine && (
            <>
              <span className="text-gold">·</span>
              <span>{car.engine}</span>
            </>
          )}
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-1.5">
            <span className={isDark ? "text-cream/60" : "text-gray-500"}>
              {formatCurrency(car.investment_collected_eur)} de{" "}
              {formatCurrency(car.investment_needed_eur)}
            </span>
            <span className={cn("font-medium", isDark ? "text-cream" : "text-gray-900")}>
              {progress}%
            </span>
          </div>
          <ProgressBar value={progress} color="gold" />
        </div>

        {/* Stats row */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <svg
              className="h-4 w-4 text-green"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
            <span className="text-sm font-semibold text-green">
              {formatPercentage(car.estimated_return_pct)} est.
            </span>
          </div>
          <span
            className={cn(
              "text-xs",
              isDark ? "text-cream/50" : "text-gray-400"
            )}
          >
            ~{car.estimated_duration_days} días
          </span>
        </div>

        {/* CTA */}
        <div className="mt-4">
          <Button
            variant={isDark ? "secondary" : "primary"}
            size="sm"
            className="w-full"
            aria-label={`Ver detalles de ${car.brand} ${car.model}`}
          >
            {car.status === "open" ? "Ver oportunidad" : "Ver detalles"}
          </Button>
        </div>
      </div>
    </div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return content;
}
