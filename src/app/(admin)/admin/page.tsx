"use client";

import AdminShell from "@/components/admin/AdminShell";
import StatsCard from "@/components/ui/StatsCard";
import Badge from "@/components/ui/Badge";
import { ROUTES, CAR_STATUSES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { DollarSign, TrendingUp, CheckCircle, Users, Clock, Plus, ListChecks } from "lucide-react";
import Link from "next/link";
import type { CarStatus } from "@/lib/types";

const stats = {
  totalCapital: 485000,
  activeOps: 4,
  completedOps: 15,
  investors: 28,
  pendingReturns: 62000,
};

const activeCars = [
  { id: "c1", brand: "Jeep", model: "Wrangler Rubicon", year: 2025, status: "in_transit" as CarStatus, phase: 5, funded: 100 },
  { id: "c2", brand: "Ford", model: "Mustang GT", year: 2022, status: "in_transit" as CarStatus, phase: 3, funded: 100 },
  { id: "c3", brand: "Chevrolet", model: "Corvette C8", year: 2023, status: "open" as CarStatus, phase: 1, funded: 24 },
  { id: "c4", brand: "Ram", model: "1500 TRX", year: 2023, status: "open" as CarStatus, phase: 1, funded: 42 },
];

const statusBadgeColor: Record<CarStatus, "gold" | "green" | "blue" | "gray" | "red"> = {
  open: "gold", funded: "blue", in_transit: "blue", sold: "green", completed: "green",
};

export default function AdminDashboardPage() {
  return (
    <AdminShell breadcrumb="Dashboard">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Admin</h1>
        <p className="mt-1 text-sm text-gray-500">Vista general de la plataforma.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatsCard icon={<DollarSign className="h-5 w-5" />} value={formatCurrency(stats.totalCapital)} label="Capital gestionado" />
        <StatsCard icon={<TrendingUp className="h-5 w-5" />} value={String(stats.activeOps)} label="Operaciones activas" />
        <StatsCard icon={<CheckCircle className="h-5 w-5" />} value={String(stats.completedOps)} label="Completadas" />
        <StatsCard icon={<Users className="h-5 w-5" />} value={String(stats.investors)} label="Inversores" />
        <StatsCard icon={<Clock className="h-5 w-5" />} value={formatCurrency(stats.pendingReturns)} label="Retornos pendientes" />
      </div>

      {/* Quick actions */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={ROUTES.adminCochesNuevo}
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" />
          Añadir coche
        </Link>
        <Link
          href={ROUTES.adminInversiones}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <ListChecks className="h-4 w-4" />
          Ver inversiones
        </Link>
      </div>

      {/* Active cars table */}
      <section className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Coches activos</h2>
          <Link href={ROUTES.adminCoches} className="text-sm font-medium text-gold hover:text-gold/80 transition-colors">
            Ver todos
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-4 py-3 font-medium text-gray-500">Vehículo</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Estado</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Fase</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Financiado</th>
                  <th className="px-4 py-3 font-medium text-gray-500"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {activeCars.map((car) => (
                  <tr key={car.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{car.brand} {car.model}</p>
                      <p className="text-xs text-gray-500">{car.year}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge color={statusBadgeColor[car.status]}>{CAR_STATUSES[car.status]}</Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-600">Fase {car.phase}/7</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-200">
                          <div className="h-full rounded-full bg-gold" style={{ width: `${car.funded}%` }} />
                        </div>
                        <span className="text-xs text-gray-500">{car.funded}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`${ROUTES.adminCoches}/${car.id}`} className="text-sm font-medium text-gold hover:text-gold/80">
                        Gestionar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </AdminShell>
  );
}
