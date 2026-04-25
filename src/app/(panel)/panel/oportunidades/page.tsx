"use client";

import PanelShell from "@/components/panel/PanelShell";
import FilterRail, { type FilterState } from "@/components/panel/FilterRail";
import InventoryToolbar, {
  type SortKey,
  type ViewMode,
} from "@/components/panel/InventoryToolbar";
import InventoryCard from "@/components/panel/InventoryCard";
import { cn } from "@/lib/utils";
import type { Car, CarStatus } from "@/lib/types";
import { useMemo, useState } from "react";

// ── Placeholder catalog ─────────────────────────────────────────────────

function makeCar(partial: Partial<Car> & Pick<Car, "id" | "brand" | "model" | "year" | "investment_needed_eur" | "investment_collected_eur" | "estimated_return_pct" | "estimated_duration_days" | "status" | "created_at">): Car {
  return {
    vin: null,
    engine: null,
    mileage_km: null,
    color: null,
    equipment: [],
    purchase_price_usd: null,
    target_sale_price_eur: null,
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
    updated_at: partial.created_at ?? "2026-04-01",
    ...partial,
  };
}

const CATALOG: Car[] = [
  makeCar({
    id: "opp-jeep-2025",
    brand: "Jeep",
    model: "Wrangler Rubicon",
    year: 2025,
    vin: "1C4PJXFG2SW566069",
    engine: "3.6L Pentastar V6",
    mileage_km: 13802,
    color: "Granite Metallic",
    investment_needed_eur: 62000,
    investment_collected_eur: 27400,
    estimated_return_pct: 25,
    estimated_duration_days: 90,
    status: "open",
    logistics_phase: 3,
    thumbnail: "/images/cars/jeep-wrangler-2025/showcase/front.jpg",
    created_at: "2026-04-15",
  }),
  makeCar({
    id: "opp-corvette-2023",
    brand: "Chevrolet",
    model: "Corvette C8",
    year: 2023,
    engine: "6.2L V8",
    mileage_km: 8000,
    color: "Arctic White",
    investment_needed_eur: 78000,
    investment_collected_eur: 42500,
    estimated_return_pct: 28,
    estimated_duration_days: 100,
    status: "open",
    created_at: "2026-04-10",
  }),
  makeCar({
    id: "opp-ram-trx-2023",
    brand: "Ram",
    model: "1500 TRX",
    year: 2023,
    engine: "6.2L V8 Supercharged",
    mileage_km: 5400,
    color: "Flame Red",
    investment_needed_eur: 72000,
    investment_collected_eur: 72000,
    estimated_return_pct: 22,
    estimated_duration_days: 110,
    status: "funded",
    logistics_phase: 4,
    created_at: "2026-03-28",
  }),
  makeCar({
    id: "opp-mustang-2022",
    brand: "Ford",
    model: "Mustang GT",
    year: 2022,
    engine: "5.0L Coyote V8",
    mileage_km: 18200,
    color: "Race Red",
    investment_needed_eur: 38000,
    investment_collected_eur: 38000,
    estimated_return_pct: 22,
    estimated_duration_days: 75,
    status: "in_transit",
    logistics_phase: 5,
    created_at: "2026-02-18",
  }),
  makeCar({
    id: "opp-challenger-2023",
    brand: "Dodge",
    model: "Challenger Hellcat",
    year: 2023,
    engine: "6.2L HEMI V8",
    mileage_km: 9800,
    color: "Octane Red",
    investment_needed_eur: 68000,
    investment_collected_eur: 14200,
    estimated_return_pct: 26,
    estimated_duration_days: 95,
    status: "open",
    created_at: "2026-04-05",
  }),
  makeCar({
    id: "opp-raptor-2024",
    brand: "Ford",
    model: "F-150 Raptor",
    year: 2024,
    engine: "3.5L EcoBoost V6",
    mileage_km: 6100,
    color: "Agate Black",
    investment_needed_eur: 82000,
    investment_collected_eur: 52000,
    estimated_return_pct: 24,
    estimated_duration_days: 105,
    status: "open",
    created_at: "2026-03-20",
  }),
];

// ── Defaults / bounds ───────────────────────────────────────────────────

function computeBounds(cars: Car[]) {
  const prices = cars.map((c) => c.investment_needed_eur);
  const rois = cars.map((c) => c.estimated_return_pct);
  const priceMin = Math.floor(Math.min(...prices) / 1000) * 1000;
  const priceMax = Math.ceil(Math.max(...prices) / 1000) * 1000;
  const roiMin = Math.floor(Math.min(...rois));
  const roiMax = Math.ceil(Math.max(...rois));
  return {
    priceBounds: [priceMin, priceMax] as [number, number],
    roiBounds: [roiMin, roiMax] as [number, number],
  };
}

const { priceBounds: PRICE_BOUNDS, roiBounds: ROI_BOUNDS } =
  computeBounds(CATALOG);

const INITIAL_FILTERS: FilterState = {
  brands: [],
  years: [],
  statuses: [],
  priceRange: PRICE_BOUNDS,
  roiRange: ROI_BOUNDS,
};

const STATUS_FILTER_OPTIONS: { key: CarStatus; label: string }[] = [
  { key: "open", label: "Abierta a inversión" },
  { key: "funded", label: "Completamente financiado" },
  { key: "in_transit", label: "En tránsito" },
];

// ── Page ────────────────────────────────────────────────────────────────

export default function PanelOportunidadesPage() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [sort, setSort] = useState<SortKey>("featured");
  const [view, setView] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Counts across the full catalog (unfiltered).
  const brandOptions = useMemo(() => {
    const counts = new Map<string, number>();
    for (const c of CATALOG) {
      counts.set(c.brand, (counts.get(c.brand) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const yearOptions = useMemo(() => {
    const years = Array.from(new Set(CATALOG.map((c) => c.year))).sort(
      (a, b) => b - a
    );
    return years;
  }, []);

  const statusOptions = useMemo(() => {
    const counts = new Map<CarStatus, number>();
    for (const c of CATALOG) {
      counts.set(c.status, (counts.get(c.status) ?? 0) + 1);
    }
    return STATUS_FILTER_OPTIONS.map((o) => ({
      ...o,
      count: counts.get(o.key) ?? 0,
    }));
  }, []);

  // Filtering
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return CATALOG.filter((c) => {
      if (filters.brands.length > 0 && !filters.brands.includes(c.brand))
        return false;
      if (filters.years.length > 0 && !filters.years.includes(c.year))
        return false;
      if (filters.statuses.length > 0 && !filters.statuses.includes(c.status))
        return false;
      if (
        c.investment_needed_eur < filters.priceRange[0] ||
        c.investment_needed_eur > filters.priceRange[1]
      )
        return false;
      if (
        c.estimated_return_pct < filters.roiRange[0] ||
        c.estimated_return_pct > filters.roiRange[1]
      )
        return false;
      if (q) {
        const hay = `${c.brand} ${c.model}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [filters, searchQuery]);

  // Sorting
  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case "featured":
        arr.sort((a, b) => {
          const aOpen = a.status === "open" ? 0 : 1;
          const bOpen = b.status === "open" ? 0 : 1;
          if (aOpen !== bOpen) return aOpen - bOpen;
          return b.estimated_return_pct - a.estimated_return_pct;
        });
        break;
      case "roi":
        arr.sort((a, b) => b.estimated_return_pct - a.estimated_return_pct);
        break;
      case "priceDesc":
        arr.sort((a, b) => b.investment_needed_eur - a.investment_needed_eur);
        break;
      case "priceAsc":
        arr.sort((a, b) => a.investment_needed_eur - b.investment_needed_eur);
        break;
      case "timeline":
        arr.sort(
          (a, b) => a.estimated_duration_days - b.estimated_duration_days
        );
        break;
      case "newest":
        arr.sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );
        break;
    }
    return arr;
  }, [filtered, sort]);

  return (
    <PanelShell breadcrumb="Oportunidades">
      {/* Header */}
      <InventoryHeader count={filtered.length} total={CATALOG.length} />

      <div className="flex flex-col lg:flex-row gap-0">
        <FilterRail
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters(INITIAL_FILTERS)}
          brandOptions={brandOptions}
          yearOptions={yearOptions}
          priceBounds={PRICE_BOUNDS}
          roiBounds={ROI_BOUNDS}
          statusOptions={statusOptions}
        />

        <div className="flex-1 min-w-0 lg:pl-10">
          <InventoryToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            resultsCount={filtered.length}
            sort={sort}
            onSortChange={setSort}
            view={view}
            onViewChange={setView}
          />

          {sorted.length === 0 ? (
            <EmptyState />
          ) : (
            <div
              className={cn(
                "grid gap-[2px]",
                view === "grid" ? "grid-cols-1 xl:grid-cols-2" : "grid-cols-1"
              )}
            >
              {sorted.map((c, i) => (
                <InventoryCard key={c.id} car={c} stockNumber={i + 1} />
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-rule flex justify-between items-center">
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-muted font-normal">
              Fin del inventario actual
            </span>
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-muted font-normal">
              Nuevos vehículos semanalmente
            </span>
          </div>
        </div>
      </div>
    </PanelShell>
  );
}

// ── Header ──────────────────────────────────────────────────────────────

function InventoryHeader({
  count,
  total,
}: {
  count: number;
  total: number;
}) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-3.5 mb-4">
        <div className="w-7 h-px bg-rule" aria-hidden="true" />
        <span className="font-sans text-[9.5px] uppercase tracking-[0.3em] text-muted font-normal">
          Inventario · Origen USA
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <h1 className="font-serif font-light text-[48px] sm:text-[56px] leading-[1.05] tracking-[-0.01em] text-text">
          La <em className="italic">Colección</em>
        </h1>
        <div className="sm:text-right">
          <div className="font-sans text-[9.5px] uppercase tracking-[0.22em] text-muted font-normal mb-1.5">
            Mostrando
          </div>
          <div className="num text-[28px] font-light text-text tracking-[0.01em]">
            {String(count).padStart(2, "0")}{" "}
            <span className="text-muted text-[16px]">
              / {total} vehículos
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Empty state ─────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="py-[120px] text-center">
      <div className="font-serif text-[32px] font-light text-text mb-4">
        Ningún vehículo coincide con estos filtros
      </div>
      <div className="font-sans text-[12px] text-muted font-light leading-relaxed tracking-[0.02em]">
        Prueba ampliando el rango de precio o limpiando algunos filtros.
      </div>
    </div>
  );
}
