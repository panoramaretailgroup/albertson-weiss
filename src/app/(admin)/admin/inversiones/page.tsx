"use client";

import AdminShell from "@/components/admin/AdminShell";
import Badge from "@/components/ui/Badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { INVESTMENT_STATUSES } from "@/lib/constants";
import type { InvestmentStatus } from "@/lib/types";
import { useState } from "react";

const allInvestments = [
  { id: "inv-1", investor: "Carlos García", email: "carlos@example.com", car: "Jeep Wrangler Rubicon 2023", amount: 15000, status: "active" as InvestmentStatus, date: "2024-02-01", expectedReturn: 3750, actualReturn: null },
  { id: "inv-2", investor: "María López", email: "maria@example.com", car: "Jeep Wrangler Rubicon 2023", amount: 20000, status: "active" as InvestmentStatus, date: "2024-02-02", expectedReturn: 5000, actualReturn: null },
  { id: "inv-3", investor: "Carlos García", email: "carlos@example.com", car: "Ford Mustang GT 2022", amount: 10000, status: "active" as InvestmentStatus, date: "2024-02-10", expectedReturn: 2200, actualReturn: null },
  { id: "inv-4", investor: "Pedro Sánchez", email: "pedro@example.com", car: "Ford Mustang GT 2022", amount: 18000, status: "active" as InvestmentStatus, date: "2024-02-11", expectedReturn: 3960, actualReturn: null },
  { id: "inv-5", investor: "Carlos García", email: "carlos@example.com", car: "Dodge Challenger SRT 2022", amount: 12000, status: "completed" as InvestmentStatus, date: "2023-09-15", expectedReturn: 3000, actualReturn: 3168 },
  { id: "inv-6", investor: "Ana Martín", email: "ana@example.com", car: "Dodge Challenger SRT 2022", amount: 25000, status: "completed" as InvestmentStatus, date: "2023-09-16", expectedReturn: 6250, actualReturn: 6600 },
  { id: "inv-7", investor: "Carlos García", email: "carlos@example.com", car: "Tesla Model 3 2023", amount: 8000, status: "completed" as InvestmentStatus, date: "2023-11-01", expectedReturn: 1760, actualReturn: 1904 },
];

const statusBadgeColor: Record<InvestmentStatus, "blue" | "green" | "gray"> = {
  active: "blue",
  completed: "green",
  cancelled: "gray",
};

type FilterStatus = "all" | InvestmentStatus;

export default function AdminInversionesPage() {
  const [filter, setFilter] = useState<FilterStatus>("all");

  const filtered = filter === "all" ? allInvestments : allInvestments.filter((i) => i.status === filter);
  const totalActive = allInvestments.filter((i) => i.status === "active").reduce((s, i) => s + i.amount, 0);
  const totalReturns = allInvestments.filter((i) => i.status === "completed").reduce((s, i) => s + (i.actualReturn ?? 0), 0);

  return (
    <AdminShell breadcrumb="Inversiones">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Gestión de inversiones</h1>
        <p className="mt-1 text-sm text-gray-500">
          {allInvestments.length} inversiones · Capital activo: {formatCurrency(totalActive)} · Retornos pagados: {formatCurrency(totalReturns)}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {([
          { value: "all", label: "Todas" },
          { value: "active", label: "Activas" },
          { value: "completed", label: "Completadas" },
          { value: "cancelled", label: "Canceladas" },
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
                <th className="px-4 py-3 font-medium text-gray-500">Inversor</th>
                <th className="px-4 py-3 font-medium text-gray-500">Vehículo</th>
                <th className="px-4 py-3 font-medium text-gray-500">Monto</th>
                <th className="px-4 py-3 font-medium text-gray-500">Estado</th>
                <th className="px-4 py-3 font-medium text-gray-500">Fecha</th>
                <th className="px-4 py-3 font-medium text-gray-500">Retorno</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{inv.investor}</p>
                    <p className="text-xs text-gray-500">{inv.email}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{inv.car}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{formatCurrency(inv.amount)}</td>
                  <td className="px-4 py-3">
                    <Badge color={statusBadgeColor[inv.status]}>{INVESTMENT_STATUSES[inv.status]}</Badge>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{formatDate(inv.date)}</td>
                  <td className="px-4 py-3">
                    {inv.actualReturn ? (
                      <span className="font-semibold text-green">+{formatCurrency(inv.actualReturn)}</span>
                    ) : (
                      <span className="text-gray-400">~{formatCurrency(inv.expectedReturn)}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
