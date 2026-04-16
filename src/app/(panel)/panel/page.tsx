"use client";

import PanelShell from "@/components/panel/PanelShell";
import StatsCard from "@/components/ui/StatsCard";
import CarCard from "@/components/ui/CarCard";
import ActiveInvestmentCard from "@/components/panel/ActiveInvestmentCard";
import ActivityTimeline from "@/components/panel/ActivityTimeline";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/lib/constants";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import {
  DollarSign,
  TrendingUp,
  BarChart3,
  Clock,
} from "lucide-react";
import Link from "next/link";
import type { Car, Investment, Notification } from "@/lib/types";

// ── Placeholder data (will be replaced with Supabase queries) ──────────

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
      id: "c1",
      brand: "Jeep",
      model: "Wrangler Rubicon",
      year: 2025,
      vin: "1C4PJXFG2SW566069",
      engine: "3.6L Pentastar V6",
      mileage_km: 13802,
      color: "Black",
      equipment: [],
      purchase_price_usd: null,
      target_sale_price_eur: null,
      investment_needed_eur: 47000,
      investment_collected_eur: 47000,
      estimated_return_pct: 25,
      estimated_duration_days: 90,
      status: "in_transit",
      logistics_phase: 5,
      logistics_phases: [],
      shipping_container: "MEDU9510693",
      shipping_carrier: "MSC",
      shipping_route: "Oakland → Rotterdam",
      shipping_eta: "2026-05-15",
      photos_showcase: [],
      photos_exterior: [],
      photos_interior: [],
      photos_detail: [],
      thumbnail: "/images/cars/jeep-wrangler-2025/showcase/front.jpg",
      created_at: "2026-03-08",
      updated_at: "2026-04-15",
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
      id: "c2",
      brand: "Ford",
      model: "Mustang GT",
      year: 2022,
      vin: null,
      engine: "5.0L V8",
      mileage_km: 18000,
      color: "Rojo",
      equipment: [],
      purchase_price_usd: null,
      target_sale_price_eur: null,
      investment_needed_eur: 38000,
      investment_collected_eur: 38000,
      estimated_return_pct: 22,
      estimated_duration_days: 75,
      status: "in_transit",
      logistics_phase: 3,
      logistics_phases: [],
      shipping_container: null,
      shipping_carrier: null,
      shipping_route: null,
      shipping_eta: null,
      photos_showcase: [],
      photos_exterior: [],
      photos_interior: [],
      photos_detail: [],
      thumbnail: null,
      created_at: "2024-01-10",
      updated_at: "2024-02-15",
    },
  },
];

const placeholderOpportunities: Car[] = [
  {
    id: "opp-1",
    brand: "Chevrolet",
    model: "Corvette C8",
    year: 2023,
    vin: null,
    engine: "6.2L V8",
    mileage_km: 8000,
    color: "Blanco",
    equipment: [],
    purchase_price_usd: null,
    target_sale_price_eur: null,
    investment_needed_eur: 62000,
    investment_collected_eur: 15000,
    estimated_return_pct: 28,
    estimated_duration_days: 100,
    status: "open",
    logistics_phase: 1,
    logistics_phases: [],
    shipping_container: null,
    shipping_carrier: null,
    shipping_route: null,
    shipping_eta: null,
    photos_showcase: [],
    photos_exterior: [],
    photos_interior: [],
    photos_detail: [],
    thumbnail: null,
    created_at: "2024-02-20",
    updated_at: "2024-02-20",
  },
];

const placeholderNotifications: Notification[] = [
  {
    id: "n1",
    user_id: "u1",
    title: "Tu Wrangler ha llegado al almacén",
    message: "El Jeep Wrangler Rubicon ha completado la fase 3: almacén USA",
    type: "milestone",
    read: false,
    car_id: "c1",
    created_at: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
  {
    id: "n2",
    user_id: "u1",
    title: "Contenedor cargado",
    message: "El Ford Mustang GT se ha cargado en el contenedor para envío",
    type: "update",
    read: false,
    car_id: "c2",
    created_at: new Date(Date.now() - 8 * 3600000).toISOString(),
  },
  {
    id: "n3",
    user_id: "u1",
    title: "Nueva oportunidad disponible",
    message: "Chevrolet Corvette C8 2023 - Rentabilidad estimada: 28%",
    type: "info",
    read: true,
    car_id: "opp-1",
    created_at: new Date(Date.now() - 24 * 3600000).toISOString(),
  },
  {
    id: "n4",
    user_id: "u1",
    title: "Fotos actualizadas",
    message: "Se han añadido nuevas fotos del Jeep Wrangler en tránsito",
    type: "update",
    read: true,
    car_id: "c1",
    created_at: new Date(Date.now() - 48 * 3600000).toISOString(),
  },
];

// ── Component ──────────────────────────────────────────────────────────

export default function PanelDashboardPage() {
  const { user } = useAuth();

  const displayName =
    user?.user_metadata?.full_name?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "Inversor";

  const investments = placeholderInvestments;
  const opportunities = placeholderOpportunities;
  const notifications = placeholderNotifications;
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Stats calculations
  const totalInvested = investments
    .filter((i) => i.status === "active")
    .reduce((sum, i) => sum + i.amount_eur, 0);

  const totalReturns = investments
    .filter((i) => i.status === "completed" && i.actual_return_eur)
    .reduce((sum, i) => sum + (i.actual_return_eur ?? 0), 0);

  const activeCount = investments.filter((i) => i.status === "active").length;

  // Find nearest expected return
  const nearestReturn = investments
    .filter((i) => i.status === "active" && i.expected_return_eur)
    .sort(
      (a, b) =>
        (a.car?.estimated_duration_days ?? 999) -
        (b.car?.estimated_duration_days ?? 999)
    )[0];

  return (
    <PanelShell
      breadcrumb="Dashboard"
      notifications={notifications}
      unreadCount={unreadCount}
    >
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Hola, {displayName}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Aquí tienes un resumen de tus inversiones.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          icon={<DollarSign className="h-5 w-5" />}
          value={formatCurrency(totalInvested)}
          label="Capital invertido"
        />
        <StatsCard
          icon={<TrendingUp className="h-5 w-5" />}
          value={totalReturns > 0 ? `+${formatCurrency(totalReturns)}` : "—"}
          label="Rentabilidad acumulada"
          trend={
            totalReturns > 0
              ? { value: formatPercentage(25.3), positive: true }
              : undefined
          }
        />
        <StatsCard
          icon={<BarChart3 className="h-5 w-5" />}
          value={String(activeCount)}
          label="Inversiones activas"
        />
        <StatsCard
          icon={<Clock className="h-5 w-5" />}
          value={
            nearestReturn?.expected_return_eur
              ? `+${formatCurrency(nearestReturn.expected_return_eur)}`
              : "—"
          }
          label="Próxima rentabilidad est."
        />
      </div>

      {/* Active investments */}
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Tus inversiones activas
          </h2>
          <Link
            href={ROUTES.panelActivas}
            className="text-sm font-medium text-gold hover:text-gold/80 transition-colors"
          >
            Ver todas
          </Link>
        </div>

        {investments.filter((i) => i.status === "active").length > 0 ? (
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {investments
              .filter((i) => i.status === "active")
              .map((investment) => (
                <ActiveInvestmentCard
                  key={investment.id}
                  investment={investment}
                />
              ))}
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-gray-200 bg-white p-8 text-center">
            <p className="text-sm text-gray-500">
              No tienes inversiones activas.{" "}
              <Link
                href={ROUTES.panelOportunidades}
                className="text-gold hover:text-gold/80"
              >
                Explora las oportunidades disponibles
              </Link>
            </p>
          </div>
        )}
      </section>

      {/* Opportunities preview */}
      {opportunities.length > 0 && (
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Oportunidades disponibles
            </h2>
            <Link
              href={ROUTES.panelOportunidades}
              className="text-sm font-medium text-gold hover:text-gold/80 transition-colors"
            >
              Ver todas
            </Link>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {opportunities.slice(0, 2).map((car) => (
              <CarCard
                key={car.id}
                car={car}
                variant="light"
                href={`/panel/oportunidades/${car.id}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* Activity */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold text-gray-900">
          Actividad reciente
        </h2>
        <div className="mt-4">
          <ActivityTimeline notifications={notifications.slice(0, 5)} />
        </div>
      </section>
    </PanelShell>
  );
}
