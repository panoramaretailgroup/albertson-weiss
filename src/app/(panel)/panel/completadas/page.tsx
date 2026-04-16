"use client";

import PanelShell from "@/components/panel/PanelShell";
import StatsCard from "@/components/ui/StatsCard";
import Badge from "@/components/ui/Badge";
import { formatCurrency, formatPercentage, formatDate } from "@/lib/utils";
import { DollarSign, TrendingUp, BarChart3 } from "lucide-react";
import type { Investment } from "@/lib/types";
import Image from "next/image";

// Placeholder data
const placeholderCompleted: Investment[] = [
  {
    id: "inv-c1",
    user_id: "u1",
    car_id: "cc1",
    amount_eur: 12000,
    expected_return_eur: 3000,
    actual_return_eur: 3168,
    status: "completed",
    contract_url: null,
    invested_at: "2023-09-15T10:00:00Z",
    completed_at: "2023-12-10T10:00:00Z",
    car: {
      id: "cc1", brand: "Dodge", model: "Challenger SRT", year: 2022, vin: null,
      engine: "6.4L V8", mileage_km: 15000, color: "Negro", equipment: [],
      purchase_price_usd: null, target_sale_price_eur: null,
      investment_needed_eur: 52000, investment_collected_eur: 52000,
      estimated_return_pct: 24.5, estimated_duration_days: 88,
      status: "completed", logistics_phase: 7, logistics_phases: [],
      shipping_container: null, shipping_carrier: null, shipping_route: null,
      shipping_eta: null, photos_showcase: [], photos_exterior: [],
      photos_interior: [], photos_detail: [], thumbnail: null,
      created_at: "2023-09-01", updated_at: "2023-12-10",
    },
  },
  {
    id: "inv-c2",
    user_id: "u1",
    car_id: "cc2",
    amount_eur: 8000,
    expected_return_eur: 1760,
    actual_return_eur: 1904,
    status: "completed",
    contract_url: null,
    invested_at: "2023-11-01T10:00:00Z",
    completed_at: "2024-01-20T10:00:00Z",
    car: {
      id: "cc2", brand: "Tesla", model: "Model 3 Performance", year: 2023, vin: null,
      engine: "Dual Motor AWD", mileage_km: 8000, color: "Blanco", equipment: [],
      purchase_price_usd: null, target_sale_price_eur: null,
      investment_needed_eur: 35000, investment_collected_eur: 35000,
      estimated_return_pct: 21.2, estimated_duration_days: 65,
      status: "completed", logistics_phase: 7, logistics_phases: [],
      shipping_container: null, shipping_carrier: null, shipping_route: null,
      shipping_eta: null, photos_showcase: [], photos_exterior: [],
      photos_interior: [], photos_detail: [], thumbnail: null,
      created_at: "2023-10-20", updated_at: "2024-01-20",
    },
  },
];

export default function InversionesCompletadasPage() {
  const investments = placeholderCompleted;

  const totalInvested = investments.reduce((s, i) => s + i.amount_eur, 0);
  const totalReturns = investments.reduce(
    (s, i) => s + (i.actual_return_eur ?? 0),
    0
  );
  const avgReturn =
    investments.length > 0
      ? investments.reduce(
          (s, i) =>
            s +
            ((i.actual_return_eur ?? 0) / i.amount_eur) * 100,
          0
        ) / investments.length
      : 0;

  return (
    <PanelShell breadcrumb="Completadas">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Inversiones completadas
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Historial de operaciones finalizadas con éxito.
        </p>
      </div>

      {investments.length > 0 ? (
        <>
          {/* Summary stats */}
          <div className="grid gap-4 sm:grid-cols-3 mb-8">
            <StatsCard
              icon={<DollarSign className="h-5 w-5" />}
              value={formatCurrency(totalInvested)}
              label="Total invertido (histórico)"
            />
            <StatsCard
              icon={<TrendingUp className="h-5 w-5" />}
              value={`+${formatCurrency(totalReturns)}`}
              label="Total retornos obtenidos"
              trend={{ value: formatPercentage(avgReturn), positive: true }}
            />
            <StatsCard
              icon={<BarChart3 className="h-5 w-5" />}
              value={formatPercentage(avgReturn)}
              label="Rentabilidad media"
            />
          </div>

          {/* Cards */}
          <div className="grid gap-4 lg:grid-cols-2">
            {investments.map((investment) => {
              const car = investment.car!;
              const realReturn = investment.actual_return_eur ?? 0;
              const realReturnPct = (realReturn / investment.amount_eur) * 100;

              const investedDate = new Date(investment.invested_at);
              const completedDate = new Date(investment.completed_at!);
              const durationDays = Math.floor(
                (completedDate.getTime() - investedDate.getTime()) / 86400000
              );

              return (
                <div
                  key={investment.id}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
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
                        <Badge color="gold">Completada</Badge>
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
                          <span className="text-xs text-gray-400">Invertido</span>
                          <p className="text-sm font-semibold text-gray-900">
                            {formatCurrency(investment.amount_eur)}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-400">
                            Retorno obtenido
                          </span>
                          <p className="text-lg font-bold text-green">
                            +{formatCurrency(realReturn)}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-400">Rentabilidad</span>
                          <p className="text-sm font-semibold text-green">
                            +{formatPercentage(realReturnPct)}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-400">Duración</span>
                          <p className="text-sm font-medium text-gray-700">
                            {durationDays} días
                          </p>
                        </div>
                      </div>

                      <p className="mt-3 text-xs text-gray-400">
                        Completada el {formatDate(investment.completed_at!)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            Aún no tienes inversiones completadas
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Tus operaciones activas aparecerán aquí cuando se completen.
          </p>
        </div>
      )}
    </PanelShell>
  );
}
