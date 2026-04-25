"use client";

import PanelShell from "@/components/panel/PanelShell";
import PortfolioHeader, {
  type PortfolioStat,
} from "@/components/panel/PortfolioHeader";
import CarCard from "@/components/ui/CarCard";
import ActiveInvestmentCard from "@/components/panel/ActiveInvestmentCard";
import PortfolioCharts from "@/components/panel/PortfolioCharts";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
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
  const activeInvestments = investments.filter((i) => i.status === "active");
  const completedInvestments = investments.filter(
    (i) => i.status === "completed"
  );

  const totalInvested = activeInvestments.reduce(
    (sum, i) => sum + i.amount_eur,
    0
  );

  // For the demo: project a 15% gain on the active capital.
  // Once Supabase is wired, replace with actual mark-to-market value.
  const projectedGainPct = 15;
  const projectedGain = Math.round((totalInvested * projectedGainPct) / 100);
  const currentValue = totalInvested + projectedGain;
  const availableBalance = 0;

  const stats: PortfolioStat[] = [
    {
      label: "Capital invertido",
      value: formatCurrency(totalInvested),
      subtitle: `En ${activeInvestments.length} ${
        activeInvestments.length === 1 ? "vehículo" : "vehículos"
      }`,
    },
    {
      label: "Valor actual",
      value: formatCurrency(currentValue),
      subtitle: "Realizado + proyectado",
      trend: `+${projectedGainPct.toString().replace(".", ",")},0%`,
      trendPositive: true,
    },
    {
      label: "Rentabilidad real",
      value: formatCurrency(projectedGain),
      subtitle: `De ${completedInvestments.length} ${
        completedInvestments.length === 1
          ? "operación cerrada"
          : "operaciones cerradas"
      }`,
      accent: true,
    },
    {
      label: "Capital activo",
      value: formatCurrency(totalInvested),
      subtitle: `En ${activeInvestments.length} ${
        activeInvestments.length === 1
          ? "posición activa"
          : "posiciones activas"
      }`,
    },
    {
      label: "Saldo disponible",
      value: formatCurrency(availableBalance),
      subtitle: "Disponible para invertir",
    },
  ];

  return (
    <PanelShell
      breadcrumb="Dashboard"
      notifications={notifications}
      unreadCount={unreadCount}
    >
      {/* Editorial portfolio header (breaks out of shell padding) */}
      <PortfolioHeader displayName={displayName} stats={stats} />

      {/* Active investments */}
      <section className="mt-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-7 h-px bg-rule" aria-hidden="true" />
              <span className="font-sans text-[9.5px] uppercase tracking-[0.3em] text-muted font-normal">
                Activas · {activeInvestments.length}{" "}
                {activeInvestments.length === 1 ? "posición" : "posiciones"}
              </span>
            </div>
            <h2 className="font-serif font-light text-[32px] leading-[1.05] text-text">
              Tus inversiones <em className="italic">activas</em>
            </h2>
          </div>
          <Link
            href={ROUTES.panelActivas}
            className="font-sans text-[10px] uppercase tracking-[0.24em] text-muted font-normal border-b border-rule pb-[3px] hover:text-text hover:border-text transition-colors"
          >
            Ver todas
          </Link>
        </div>

        {activeInvestments.length > 0 ? (
          <div className="grid gap-[2px] lg:grid-cols-2">
            {activeInvestments.map((investment) => (
              <ActiveInvestmentCard
                key={investment.id}
                investment={investment}
              />
            ))}
          </div>
        ) : (
          <div className="border border-rule bg-[#f8f5ef] p-8 text-center">
            <p className="font-sans text-[11px] text-muted">
              No tienes inversiones activas.{" "}
              <Link
                href={ROUTES.panelOportunidades}
                className="text-amber hover:opacity-85"
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
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-7 h-px bg-rule" aria-hidden="true" />
                <span className="font-sans text-[9.5px] uppercase tracking-[0.3em] text-muted font-normal">
                  Nuevas oportunidades
                </span>
              </div>
              <h2 className="font-serif font-light text-[32px] leading-[1.05] text-text">
                Oportunidades <em className="italic">disponibles</em>
              </h2>
            </div>
            <Link
              href={ROUTES.panelOportunidades}
              className="font-sans text-[10px] uppercase tracking-[0.24em] text-muted font-normal border-b border-rule pb-[3px] hover:text-text hover:border-text transition-colors"
            >
              Ver todas
            </Link>
          </div>

          <div className="grid gap-[2px] sm:grid-cols-2">
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

      {/* Portfolio charts */}
      <PortfolioCharts investments={investments} />
    </PanelShell>
  );
}
