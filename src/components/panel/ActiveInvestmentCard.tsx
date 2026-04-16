"use client";

import { cn } from "@/lib/utils";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { CAR_STATUSES } from "@/lib/constants";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import type { Investment, CarStatus } from "@/lib/types";
import { Clock, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ActiveInvestmentCardProps {
  investment: Investment;
  className?: string;
}

const statusBadgeColor: Record<CarStatus, "gold" | "green" | "blue" | "gray" | "red"> = {
  open: "gold",
  funded: "blue",
  in_transit: "blue",
  sold: "green",
  completed: "green",
};

export default function ActiveInvestmentCard({
  investment,
  className,
}: ActiveInvestmentCardProps) {
  const car = investment.car;
  if (!car) return null;

  const logisticsProgress = car.logistics_phase
    ? Math.round((car.logistics_phase / 7) * 100)
    : 0;

  // Estimate remaining days
  const investedDate = new Date(investment.invested_at);
  const elapsedDays = Math.floor(
    (Date.now() - investedDate.getTime()) / 86400000
  );
  const remainingDays = Math.max(car.estimated_duration_days - elapsedDays, 0);

  return (
    <Link
      href={`/panel/activas/${investment.id}`}
      className={cn(
        "group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-gray-300",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative aspect-[16/10] sm:aspect-square sm:w-40 shrink-0">
          {car.thumbnail ? (
            <Image
              src={car.thumbnail}
              alt={`${car.brand} ${car.model}`}
              fill
              className="object-cover"
              sizes="160px"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-100">
              <svg
                className="h-8 w-8 text-gray-300"
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
          <div className="absolute left-2 top-2">
            <Badge color={statusBadgeColor[car.status]}>
              {CAR_STATUSES[car.status]}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <h3 className="font-semibold text-gray-900">
              {car.brand} {car.model}
            </h3>
            <p className="text-sm text-gray-500">{car.year}</p>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <span className="text-xs text-gray-400">Tu inversión</span>
              <p className="text-sm font-semibold text-gray-900">
                {formatCurrency(investment.amount_eur)}
              </p>
            </div>
            <div>
              <span className="text-xs text-gray-400">Rentabilidad esp.</span>
              <p className="flex items-center gap-1 text-sm font-semibold text-green">
                <TrendingUp className="h-3.5 w-3.5" />
                {investment.expected_return_eur
                  ? `+${formatCurrency(investment.expected_return_eur)}`
                  : formatPercentage(car.estimated_return_pct)}
              </p>
            </div>
          </div>

          {/* Logistics mini-bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
              <span>Progreso logístico</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {remainingDays > 0 ? `~${remainingDays} días` : "Finalizando"}
              </span>
            </div>
            <ProgressBar value={logisticsProgress} color="gold" />
          </div>
        </div>
      </div>
    </Link>
  );
}
