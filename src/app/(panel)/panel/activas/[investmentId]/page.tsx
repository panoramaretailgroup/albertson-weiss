"use client";

import PanelShell from "@/components/panel/PanelShell";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import LogisticsTracker from "@/components/ui/LogisticsTracker";
import { ROUTES, CAR_STATUSES, INVESTMENT_STATUSES } from "@/lib/constants";
import {
  formatCurrency,
  formatPercentage,
  formatDate,
  calculateProgress,
} from "@/lib/utils";
import type { Investment, LogisticsPhase, CarUpdate } from "@/lib/types";
import {
  TrendingUp,
  Calendar,
  FileText,
  ExternalLink,
  Ship,
  MapPin,
  Clock,
  Gauge,
  Cog,
  Palette,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Real vehicle data
const placeholderInvestment: Investment = {
  id: "inv-1",
  user_id: "u1",
  car_id: "jeep-wrangler-2025",
  amount_eur: 15000,
  expected_return_eur: 3750,
  actual_return_eur: null,
  status: "active",
  contract_url: "/contracts/inv-1.pdf",
  invested_at: "2026-03-08T10:00:00Z",
  completed_at: null,
  car: {
    id: "jeep-wrangler-2025", brand: "Jeep", model: "Wrangler Rubicon", year: 2025,
    vin: "1C4PJXFG2SW566069",
    engine: "3.6L Pentastar V6", mileage_km: 13802, color: "Black", equipment: [
      "Tracción 4x4 Rock-Trac", "Techo removible Freedom Top", "Uconnect 12.3\"",
      "Apple CarPlay", "LED headlights", "Asientos calefactados cuero",
      "BFGoodrich KO2", "Dana 44 HD Axles", "Electronic Sway Bar Disconnect",
    ],
    purchase_price_usd: null, target_sale_price_eur: null,
    investment_needed_eur: 47000, investment_collected_eur: 47000,
    estimated_return_pct: 25, estimated_duration_days: 90,
    status: "in_transit", logistics_phase: 5,
    logistics_phases: [
      { phase: 1, name: "Comprado en subasta", completed: true, date: "2026-03-09", photos: ["/images/cars/jeep-wrangler-2025/logistics/pickup-1.jpg", "/images/cars/jeep-wrangler-2025/logistics/pickup-2.jpg", "/images/cars/jeep-wrangler-2025/logistics/pickup-3.jpg", "/images/cars/jeep-wrangler-2025/logistics/pickup-4.jpg", "/images/cars/jeep-wrangler-2025/logistics/pickup-5.jpg"] },
      { phase: 2, name: "En tránsito a almacén USA", completed: true, date: "2026-03-10", photos: ["/images/cars/jeep-wrangler-2025/logistics/pickup-6.jpg", "/images/cars/jeep-wrangler-2025/logistics/pickup-7.jpg", "/images/cars/jeep-wrangler-2025/logistics/pickup-8.jpg", "/images/cars/jeep-wrangler-2025/logistics/pickup-9.jpg", "/images/cars/jeep-wrangler-2025/logistics/pickup-interior.jpg"] },
      { phase: 3, name: "En almacén USA", completed: true, date: "2026-03-11", photos: ["/images/cars/jeep-wrangler-2025/logistics/warehouse-1.jpg", "/images/cars/jeep-wrangler-2025/logistics/warehouse-2.jpg", "/images/cars/jeep-wrangler-2025/logistics/warehouse-3.jpg"] },
      { phase: 4, name: "Contenedor cargado", completed: true, date: "2026-04-04", photos: [] },
      { phase: 5, name: "En tránsito marítimo", completed: false, date: null, photos: [], tracking: {} },
      { phase: 6, name: "Descargado en puerto Europa", completed: false, date: null, photos: [] },
      { phase: 7, name: "Listo para entrega", completed: false, date: null, photos: [] },
    ] as LogisticsPhase[],
    shipping_container: "MEDU9510693",
    shipping_carrier: "MSC",
    shipping_route: "Oakland, US → Rodman, PA → Rotterdam, NL",
    shipping_eta: "2026-05-15",
    photos_showcase: ["/images/cars/jeep-wrangler-2025/showcase/front.jpg"],
    photos_exterior: ["/images/cars/jeep-wrangler-2025/exterior/front.jpg", "/images/cars/jeep-wrangler-2025/exterior/side.jpg", "/images/cars/jeep-wrangler-2025/exterior/rear.jpg"],
    photos_interior: ["/images/cars/jeep-wrangler-2025/interior/front-seats.jpg", "/images/cars/jeep-wrangler-2025/interior/dashboard.jpg"],
    photos_detail: [],
    thumbnail: "/images/cars/jeep-wrangler-2025/showcase/front.jpg",
    created_at: "2026-03-08", updated_at: "2026-04-15",
  },
};

const placeholderUpdates: CarUpdate[] = [
  {
    id: "u1", car_id: "jeep-wrangler-2025", phase: 5,
    title: "En tránsito marítimo — MSC desde Oakland",
    description: "El contenedor MEDU9510693 (45' High Cube Dry) ha sido cargado en el buque MSC. Ruta: Oakland → Rodman, PA → Rotterdam. ETA: 15 mayo 2026.",
    photos: [], created_at: "2026-04-04T14:00:00Z",
  },
  {
    id: "u2", car_id: "jeep-wrangler-2025", phase: 4,
    title: "Contenedor cargado en puerto de Oakland, CA",
    description: "Export received at CY el 1 de abril. Cargado en buque el 4 de abril. Container: MEDU9510693.",
    photos: [], created_at: "2026-04-01T10:00:00Z",
  },
  {
    id: "u3", car_id: "jeep-wrangler-2025", phase: 3,
    title: "Vehículo recibido en almacén USA",
    description: "Jeep Wrangler Rubicon 2025 recibido en almacén. Inspección visual completada. Sin daños. Fotos de warehouse disponibles.",
    photos: [], created_at: "2026-03-11T10:00:00Z",
  },
  {
    id: "u4", car_id: "jeep-wrangler-2025", phase: 2,
    title: "Recogido en Eugene, OR — En tránsito a almacén",
    description: "Pickup completado por Super Dispatch desde Eugene, OR 97402. En ruta al almacén de consolidación.",
    photos: [], created_at: "2026-03-10T08:00:00Z",
  },
  {
    id: "u5", car_id: "jeep-wrangler-2025", phase: 1,
    title: "Vehículo adquirido en subasta — Eugene, OR",
    description: "Jeep Wrangler Rubicon 2025 (VIN: 1C4PJXFG2SW566069) adquirido con éxito. 3.6L Pentastar V6, 13.802 km. Ubicación: Eugene, Oregon.",
    photos: [], created_at: "2026-03-09T16:30:00Z",
  },
];

const statusBadgeColor: Record<string, "gold" | "green" | "blue" | "gray"> = {
  active: "blue",
  completed: "green",
  cancelled: "gray",
};

export default function InvestmentDetailPage({
  params: _params,
}: {
  params: { investmentId: string };
}) {
  const investment = placeholderInvestment;
  const car = investment.car!;
  const updates = placeholderUpdates;
  const progress = calculateProgress(car.investment_collected_eur, car.investment_needed_eur);

  const hasShipping = car.shipping_container && car.status === "in_transit";

  return (
    <PanelShell breadcrumb={`${car.brand} ${car.model}`}>
      {/* Back link */}
      <Link
        href={ROUTES.panelActivas}
        className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Volver a inversiones activas
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Investment summary card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {car.brand} {car.model} {car.year}
                </h1>
                <p className="mt-1 text-sm text-gray-500">{car.engine}</p>
              </div>
              <Badge color={statusBadgeColor[investment.status]}>
                {INVESTMENT_STATUSES[investment.status]}
              </Badge>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <span className="text-xs text-gray-400">Tu inversión</span>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {formatCurrency(investment.amount_eur)}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-400">Retorno esperado</span>
                <p className="mt-1 text-lg font-semibold text-green">
                  +{formatCurrency(investment.expected_return_eur ?? 0)}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-400">Rentabilidad</span>
                <p className="mt-1 flex items-center gap-1 text-lg font-semibold text-green">
                  <TrendingUp className="h-4 w-4" />
                  {formatPercentage(car.estimated_return_pct)}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-400">Fecha de inversión</span>
                <p className="mt-1 flex items-center gap-1 text-sm font-medium text-gray-900">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  {formatDate(investment.invested_at)}
                </p>
              </div>
            </div>

            {investment.contract_url && (
              <div className="mt-4 border-t border-gray-100 pt-4">
                <a
                  href={investment.contract_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold/80 transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  Ver contrato
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </div>

          {/* Logistics tracker */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Seguimiento logístico
            </h2>
            <div className="mt-6">
              <LogisticsTracker
                phases={car.logistics_phases}
                currentPhase={car.logistics_phase}
              />
            </div>
          </div>

          {/* Shipping card */}
          {hasShipping && (
            <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Ship className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Tránsito marítimo
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <span className="text-xs text-gray-500">Contenedor</span>
                  <p className="mt-1 text-sm font-mono font-semibold text-gray-900">
                    {car.shipping_container}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Naviera</span>
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {car.shipping_carrier}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Ruta</span>
                  <p className="mt-1 flex items-center gap-1 text-sm font-medium text-gray-900">
                    <MapPin className="h-3.5 w-3.5 text-gray-400" />
                    {car.shipping_route}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">ETA</span>
                  <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-gray-900">
                    <Clock className="h-3.5 w-3.5 text-gray-400" />
                    {car.shipping_eta ? formatDate(car.shipping_eta) : "—"}
                  </p>
                </div>
              </div>
              <div className="mt-4 border-t border-blue-200 pt-4">
                <a
                  href={`https://www.msc.com/track-a-shipment?query=${car.shipping_container}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Ver tracking en {car.shipping_carrier}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          )}

          {/* Updates timeline */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Actualizaciones
            </h2>
            <div className="mt-6 space-y-6">
              {updates.map((update, index) => (
                <div key={update.id} className="relative flex gap-4">
                  {index < updates.length - 1 && (
                    <div className="absolute left-[15px] top-8 h-full w-px bg-gray-200" />
                  )}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/10">
                    <span className="text-xs font-bold text-gold">
                      {update.phase ?? "—"}
                    </span>
                  </div>
                  <div className="pb-2">
                    <p className="text-sm font-medium text-gray-900">
                      {update.title}
                    </p>
                    {update.description && (
                      <p className="mt-1 text-sm text-gray-500">
                        {update.description}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-400">
                      {formatDate(update.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Car image */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="relative aspect-[4/3]">
              {car.thumbnail ? (
                <Image
                  src={car.thumbnail}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gray-100">
                  <svg
                    className="h-12 w-12 text-gray-300"
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
                <Badge color="blue">{CAR_STATUSES[car.status]}</Badge>
              </div>
            </div>
          </div>

          {/* Technical specs */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-gray-900">Ficha técnica</h3>
            <div className="mt-4 space-y-3">
              {[
                { icon: Calendar, label: "Año", value: String(car.year) },
                { icon: Cog, label: "Motor", value: car.engine ?? "—" },
                { icon: Gauge, label: "Kilometraje", value: car.mileage_km ? `${car.mileage_km.toLocaleString("es-ES")} km` : "—" },
                { icon: Palette, label: "Color", value: car.color ?? "—" },
              ].map((spec) => (
                <div key={spec.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <spec.icon className="h-4 w-4 text-gray-400" />
                    {spec.label}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Funding progress */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-gray-900">Financiación</h3>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-500">
                  {formatCurrency(car.investment_collected_eur)} de{" "}
                  {formatCurrency(car.investment_needed_eur)}
                </span>
                <span className="font-medium text-gray-900">{progress}%</span>
              </div>
              <ProgressBar value={progress} color="gold" />
            </div>
          </div>

          {/* Equipment */}
          {car.equipment.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="text-sm font-semibold text-gray-900">Equipamiento</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {car.equipment.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PanelShell>
  );
}
