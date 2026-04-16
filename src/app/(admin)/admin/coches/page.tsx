"use client";

import AdminShell from "@/components/admin/AdminShell";
import Badge from "@/components/ui/Badge";
import { ROUTES, CAR_STATUSES } from "@/lib/constants";
import { formatCurrency, calculateProgress } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { CarStatus } from "@/lib/types";

const allCars = [
  { id: "c1", brand: "Jeep", model: "Wrangler Rubicon", year: 2025, status: "in_transit" as CarStatus, phase: 5, needed: 47000, collected: 47000, returnPct: 25 },
  { id: "c2", brand: "Ford", model: "Mustang GT", year: 2022, status: "in_transit" as CarStatus, phase: 3, needed: 38000, collected: 38000, returnPct: 22 },
  { id: "c3", brand: "Chevrolet", model: "Corvette C8", year: 2023, status: "open" as CarStatus, phase: 1, needed: 62000, collected: 15000, returnPct: 28 },
  { id: "c4", brand: "Ram", model: "1500 TRX", year: 2023, status: "open" as CarStatus, phase: 1, needed: 72000, collected: 30000, returnPct: 26 },
  { id: "c5", brand: "Dodge", model: "Challenger SRT", year: 2022, status: "completed" as CarStatus, phase: 7, needed: 52000, collected: 52000, returnPct: 24.5 },
  { id: "c6", brand: "Tesla", model: "Model 3 Performance", year: 2023, status: "completed" as CarStatus, phase: 7, needed: 35000, collected: 35000, returnPct: 21.2 },
];

const statusBadgeColor: Record<CarStatus, "gold" | "green" | "blue" | "gray" | "red"> = {
  open: "gold", funded: "blue", in_transit: "blue", sold: "green", completed: "green",
};

type FilterStatus = "all" | CarStatus;

export default function AdminCochesPage() {
  const [filter, setFilter] = useState<FilterStatus>("all");

  const filtered = filter === "all" ? allCars : allCars.filter((c) => c.status === filter);

  return (
    <AdminShell breadcrumb="Coches">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Gestión de coches</h1>
          <p className="mt-1 text-sm text-gray-500">{allCars.length} vehículos registrados</p>
        </div>
        <Link
          href={ROUTES.adminCochesNuevo}
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" />
          Añadir coche
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {([
          { value: "all", label: "Todos" },
          { value: "open", label: "Abiertos" },
          { value: "funded", label: "Financiados" },
          { value: "in_transit", label: "En tránsito" },
          { value: "sold", label: "Vendidos" },
          { value: "completed", label: "Completados" },
        ] as const).map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={
              filter === opt.value
                ? "rounded-full bg-gray-900 px-3.5 py-1.5 text-xs font-medium text-white"
                : "rounded-full border border-gray-200 px-3.5 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
            }
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-4 py-3 font-medium text-gray-500">Vehículo</th>
                <th className="px-4 py-3 font-medium text-gray-500">Estado</th>
                <th className="px-4 py-3 font-medium text-gray-500">Fase</th>
                <th className="px-4 py-3 font-medium text-gray-500">Inversión</th>
                <th className="px-4 py-3 font-medium text-gray-500">Financiado</th>
                <th className="px-4 py-3 font-medium text-gray-500">Rent. est.</th>
                <th className="px-4 py-3 font-medium text-gray-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((car) => {
                const progress = calculateProgress(car.collected, car.needed);
                return (
                  <tr key={car.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{car.brand} {car.model}</p>
                          <p className="text-xs text-gray-500">{car.year}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge color={statusBadgeColor[car.status]}>{CAR_STATUSES[car.status]}</Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{car.phase}/7</td>
                    <td className="px-4 py-3 text-gray-900 font-medium">{formatCurrency(car.needed)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-200">
                          <div className="h-full rounded-full bg-gold" style={{ width: `${progress}%` }} />
                        </div>
                        <span className="text-xs text-gray-500">{progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-green font-medium">{car.returnPct}%</td>
                    <td className="px-4 py-3">
                      <Link href={`${ROUTES.adminCoches}/${car.id}`} className="text-sm font-medium text-gold hover:text-gold/80">
                        Editar
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
