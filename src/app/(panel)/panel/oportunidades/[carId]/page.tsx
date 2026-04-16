"use client";

import PanelShell from "@/components/panel/PanelShell";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import Button from "@/components/ui/Button";
import { CAR_STATUSES } from "@/lib/constants";
import { formatCurrency, formatPercentage, calculateProgress } from "@/lib/utils";
import type { CarStatus } from "@/lib/types";
import { TrendingUp, Clock, Calendar, Cog, Gauge, Palette } from "lucide-react";
import Link from "next/link";

// Placeholder
const car = {
  id: "opp-1", brand: "Chevrolet", model: "Corvette C8", year: 2023,
  engine: "6.2L V8", mileage_km: 8000, color: "Blanco",
  equipment: ["Performance Package", "Magnetic Ride", "Head-Up Display", "Carbon Flash"],
  investment_needed_eur: 62000, investment_collected_eur: 15000,
  estimated_return_pct: 28, estimated_duration_days: 100,
  status: "open" as CarStatus,
};

const statusBadgeColor: Record<CarStatus, "gold" | "green" | "blue" | "gray" | "red"> = {
  open: "gold", funded: "blue", in_transit: "blue", sold: "green", completed: "green",
};

export default function PanelCarDetailPage({
  params: _params,
}: {
  params: { carId: string };
}) {
  const progress = calculateProgress(car.investment_collected_eur, car.investment_needed_eur);

  return (
    <PanelShell breadcrumb={`${car.brand} ${car.model}`}>
      <Link
        href="/panel/oportunidades"
        className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Volver a oportunidades
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image placeholder */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
            <div className="flex h-full items-center justify-center">
              <svg className="h-16 w-16 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <div className="absolute left-3 top-3">
              <Badge color={statusBadgeColor[car.status]}>{CAR_STATUSES[car.status]}</Badge>
            </div>
          </div>

          {/* Title + specs */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              {car.brand} {car.model} {car.year}
            </h1>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: Calendar, label: "Año", value: String(car.year) },
                { icon: Cog, label: "Motor", value: car.engine },
                { icon: Gauge, label: "Km", value: `${car.mileage_km.toLocaleString("es-ES")} km` },
                { icon: Palette, label: "Color", value: car.color },
              ].map((spec) => (
                <div key={spec.label}>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <spec.icon className="h-3.5 w-3.5" />
                    {spec.label}
                  </div>
                  <p className="mt-1 text-sm font-medium text-gray-900">{spec.value}</p>
                </div>
              ))}
            </div>

            {car.equipment.length > 0 && (
              <div className="mt-6 border-t border-gray-100 pt-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Equipamiento
                </h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {car.equipment.map((item) => (
                    <span key={item} className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-600">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="sticky top-20 rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">Datos de inversión</h2>

            <div className="mt-5 space-y-4">
              <div>
                <span className="text-xs text-gray-400">Inversión necesaria</span>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {formatCurrency(car.investment_needed_eur)}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Financiado</span>
                  <span className="font-medium text-gray-900">{progress}%</span>
                </div>
                <ProgressBar value={progress} color="gold" className="mt-2" />
                <p className="mt-1 text-xs text-gray-400">
                  {formatCurrency(car.investment_collected_eur)} recaudados
                </p>
              </div>

              <div className="h-px bg-gray-100" />

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Rentabilidad est.</span>
                <span className="flex items-center gap-1 text-lg font-semibold text-green">
                  <TrendingUp className="h-4 w-4" />
                  {formatPercentage(car.estimated_return_pct)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Duración est.</span>
                <span className="flex items-center gap-1 text-sm font-medium text-gray-900">
                  <Clock className="h-4 w-4 text-gray-400" />
                  ~{car.estimated_duration_days} días
                </span>
              </div>

              <div className="h-px bg-gray-100" />

              <Button variant="primary" size="lg" className="w-full">
                Invertir en este vehículo
              </Button>
              <p className="text-center text-[11px] text-gray-400">
                Se formalizará un contrato de préstamo privado
              </p>
            </div>
          </div>
        </div>
      </div>
    </PanelShell>
  );
}
