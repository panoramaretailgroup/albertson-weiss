"use client";

import PanelShell from "@/components/panel/PanelShell";
import ActiveInvestmentCard from "@/components/panel/ActiveInvestmentCard";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";
import type { Investment } from "@/lib/types";

// Placeholder data
const placeholderInvestments: Investment[] = [
  {
    id: "inv-1",
    user_id: "u1",
    car_id: "c1",
    amount_eur: 15000,
    expected_return_eur: 3750,
    actual_return_eur: null,
    status: "active",
    contract_url: null,
    invested_at: "2024-02-01T10:00:00Z",
    completed_at: null,
    car: {
      id: "c1", brand: "Jeep", model: "Wrangler Rubicon", year: 2023, vin: null,
      engine: "3.6L V6", mileage_km: 12000, color: "Negro", equipment: [],
      purchase_price_usd: null, target_sale_price_eur: null,
      investment_needed_eur: 45000, investment_collected_eur: 45000,
      estimated_return_pct: 25, estimated_duration_days: 90,
      status: "in_transit", logistics_phase: 5, logistics_phases: [],
      shipping_container: null, shipping_carrier: null, shipping_route: null,
      shipping_eta: null, photos_showcase: [], photos_exterior: [],
      photos_interior: [], photos_detail: [], thumbnail: null,
      created_at: "2024-01-15", updated_at: "2024-02-20",
    },
  },
  {
    id: "inv-2",
    user_id: "u1",
    car_id: "c2",
    amount_eur: 10000,
    expected_return_eur: 2200,
    actual_return_eur: null,
    status: "active",
    contract_url: null,
    invested_at: "2024-02-10T10:00:00Z",
    completed_at: null,
    car: {
      id: "c2", brand: "Ford", model: "Mustang GT", year: 2022, vin: null,
      engine: "5.0L V8", mileage_km: 18000, color: "Rojo", equipment: [],
      purchase_price_usd: null, target_sale_price_eur: null,
      investment_needed_eur: 38000, investment_collected_eur: 38000,
      estimated_return_pct: 22, estimated_duration_days: 75,
      status: "in_transit", logistics_phase: 3, logistics_phases: [],
      shipping_container: null, shipping_carrier: null, shipping_route: null,
      shipping_eta: null, photos_showcase: [], photos_exterior: [],
      photos_interior: [], photos_detail: [], thumbnail: null,
      created_at: "2024-01-10", updated_at: "2024-02-15",
    },
  },
];

export default function InversionesActivasPage() {
  const investments = placeholderInvestments;

  return (
    <PanelShell breadcrumb="Inversiones activas">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Tus inversiones activas
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {investments.length} inversión{investments.length !== 1 ? "es" : ""} en
          curso
        </p>
      </div>

      {investments.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {investments.map((investment) => (
            <ActiveInvestmentCard
              key={investment.id}
              investment={investment}
            />
          ))}
        </div>
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
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No tienes inversiones activas
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Explora las oportunidades disponibles y empieza a invertir.
          </p>
          <Link
            href={ROUTES.panelOportunidades}
            className="mt-6 inline-flex rounded-lg bg-gold px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-[#b8983f]"
          >
            Ver oportunidades
          </Link>
        </div>
      )}
    </PanelShell>
  );
}
