"use client";

import PanelShell from "@/components/panel/PanelShell";
import CarCard from "@/components/ui/CarCard";
import type { Car } from "@/lib/types";

// Placeholder data
const placeholderCars: Car[] = [
  {
    id: "opp-1", brand: "Chevrolet", model: "Corvette C8", year: 2023, vin: null,
    engine: "6.2L V8", mileage_km: 8000, color: "Blanco", equipment: [],
    purchase_price_usd: null, target_sale_price_eur: null,
    investment_needed_eur: 62000, investment_collected_eur: 15000,
    estimated_return_pct: 28, estimated_duration_days: 100,
    status: "open", logistics_phase: 1, logistics_phases: [],
    shipping_container: null, shipping_carrier: null, shipping_route: null,
    shipping_eta: null, photos_showcase: [], photos_exterior: [],
    photos_interior: [], photos_detail: [], thumbnail: null,
    created_at: "2024-02-20", updated_at: "2024-02-20",
  },
  {
    id: "opp-2", brand: "Ram", model: "1500 TRX", year: 2023, vin: null,
    engine: "6.2L V8 Supercharged", mileage_km: 5000, color: "Gris", equipment: [],
    purchase_price_usd: null, target_sale_price_eur: null,
    investment_needed_eur: 72000, investment_collected_eur: 30000,
    estimated_return_pct: 26, estimated_duration_days: 110,
    status: "open", logistics_phase: 1, logistics_phases: [],
    shipping_container: null, shipping_carrier: null, shipping_route: null,
    shipping_eta: null, photos_showcase: [], photos_exterior: [],
    photos_interior: [], photos_detail: [], thumbnail: null,
    created_at: "2024-02-22", updated_at: "2024-02-22",
  },
];

export default function PanelOportunidadesPage() {
  return (
    <PanelShell breadcrumb="Oportunidades">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Oportunidades de inversión
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Vehículos disponibles para invertir.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {placeholderCars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            variant="light"
            href={`/panel/oportunidades/${car.id}`}
          />
        ))}
      </div>
    </PanelShell>
  );
}
