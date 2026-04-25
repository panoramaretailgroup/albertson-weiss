"use client";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import FadeIn from "@/components/public/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";
import InvestmentCard, {
  type InvestmentCardData,
  type InvestmentStatus,
} from "@/components/ui/InvestmentCard";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

const MIN_INVESTMENT = "€1.000";
const PAGE_SIZE = 9;

// ── Internal data model (placeholder, will come from Supabase) ──────
interface CarRecord {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileageKm: number;
  origin: string;
  priceEur: number;
  raisedEur: number;
  roiPct: number;
  timelineMonths: number;
  status: InvestmentStatus;
  image: string;
  createdAt: string;
}

const allCars: CarRecord[] = [
  {
    id: "jeep-wrangler-2025",
    brand: "Jeep",
    model: "Wrangler Rubicon",
    year: 2025,
    mileageKm: 13802,
    origin: "Oregon, US",
    priceEur: 47000,
    raisedEur: 47000,
    roiPct: 25,
    timelineMonths: 3,
    status: "full",
    image: "/images/cars/jeep-wrangler-2025/showcase/front.jpg",
    createdAt: "2026-03-01",
  },
  {
    id: "porsche-911-gt3",
    brand: "Porsche",
    model: "911 GT3 Touring",
    year: 2023,
    mileageKm: 3380,
    origin: "California, US",
    priceEur: 185000,
    raisedEur: 148000,
    roiPct: 18.4,
    timelineMonths: 7,
    status: "open",
    image:
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=800&q=80",
    createdAt: "2026-03-15",
  },
  {
    id: "aston-martin-dbx",
    brand: "Aston Martin",
    model: "DBX 707",
    year: 2024,
    mileageKm: 1930,
    origin: "Texas, US",
    priceEur: 220000,
    raisedEur: 66000,
    roiPct: 16.8,
    timelineMonths: 6,
    status: "soon",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
    createdAt: "2026-03-20",
  },
  {
    id: "ferrari-f8-tributo",
    brand: "Ferrari",
    model: "F8 Tributo Spider",
    year: 2022,
    mileageKm: 7725,
    origin: "Florida, US",
    priceEur: 310000,
    raisedEur: 310000,
    roiPct: 22.1,
    timelineMonths: 9,
    status: "full",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80",
    createdAt: "2026-02-10",
  },
  {
    id: "ford-mustang-gt",
    brand: "Ford",
    model: "Mustang GT",
    year: 2022,
    mileageKm: 28960,
    origin: "Michigan, US",
    priceEur: 38000,
    raisedEur: 18000,
    roiPct: 22,
    timelineMonths: 4,
    status: "open",
    image:
      "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80",
    createdAt: "2026-03-12",
  },
  {
    id: "chevrolet-corvette-c8",
    brand: "Chevrolet",
    model: "Corvette C8",
    year: 2023,
    mileageKm: 12875,
    origin: "Nevada, US",
    priceEur: 62000,
    raisedEur: 15000,
    roiPct: 28,
    timelineMonths: 5,
    status: "open",
    image:
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80",
    createdAt: "2026-03-22",
  },
];

type FilterStatus = "all" | InvestmentStatus;
type FilterPrice = "all" | "under20" | "20-50" | "50-100" | "over100";
type FilterRoi = "all" | "15-20" | "20-25" | "25+";

interface Filters {
  brand: string;
  year: string;
  price: FilterPrice;
  roi: FilterRoi;
  status: FilterStatus;
}

const DEFAULT_FILTERS: Filters = {
  brand: "all",
  year: "all",
  price: "all",
  roi: "all",
  status: "all",
};

// ── Helpers ──────────────────────────────────────────────────────────
function toCardData(c: CarRecord): InvestmentCardData {
  const roiStr = Number.isInteger(c.roiPct)
    ? `${c.roiPct}%`
    : `${c.roiPct.toString().replace(".", ",")}%`;
  const statusLabel: Record<InvestmentStatus, string> = {
    open: "Abierto",
    full: "Financiado",
    soon: "Próximamente",
  };
  return {
    id: c.id,
    name: c.model,
    make: `${c.brand} · ${c.year}`,
    roi: roiStr,
    timeline: `${c.timelineMonths} meses`,
    target: c.priceEur,
    raised: c.raisedEur,
    status: c.status,
    statusLabel: statusLabel[c.status],
    specs: [
      ["Año", String(c.year)],
      ["Km", c.mileageKm.toLocaleString("es-ES")],
      ["Origen", c.origin],
    ],
    image: c.image,
  };
}

function matchesFilters(c: CarRecord, f: Filters): boolean {
  if (f.brand !== "all" && c.brand !== f.brand) return false;
  if (f.year !== "all" && String(c.year) !== f.year) return false;

  if (f.price !== "all") {
    if (f.price === "under20" && c.priceEur >= 20000) return false;
    if (f.price === "20-50" && (c.priceEur < 20000 || c.priceEur >= 50000))
      return false;
    if (f.price === "50-100" && (c.priceEur < 50000 || c.priceEur >= 100000))
      return false;
    if (f.price === "over100" && c.priceEur < 100000) return false;
  }

  if (f.roi !== "all") {
    if (f.roi === "15-20" && (c.roiPct < 15 || c.roiPct >= 20)) return false;
    if (f.roi === "20-25" && (c.roiPct < 20 || c.roiPct >= 25)) return false;
    if (f.roi === "25+" && c.roiPct < 25) return false;
  }

  if (f.status !== "all" && c.status !== f.status) return false;
  return true;
}

function sortCars(cars: CarRecord[]): CarRecord[] {
  return [...cars].sort((a, b) => {
    if (a.status === "open" && b.status !== "open") return -1;
    if (a.status !== "open" && b.status === "open") return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

// ── Page ────────────────────────────────────────────────────────────
export default function OportunidadesContent() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [notifyEmail, setNotifyEmail] = useState("");

  const brands = useMemo(
    () => Array.from(new Set(allCars.map((c) => c.brand))).sort(),
    []
  );
  const years = useMemo(
    () =>
      Array.from(new Set(allCars.map((c) => c.year)))
        .sort((a, b) => b - a)
        .map(String),
    []
  );

  const filtered = useMemo(
    () => allCars.filter((c) => matchesFilters(c, filters)),
    [filters]
  );
  const sorted = useMemo(() => sortCars(filtered), [filtered]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const clampedPage = Math.min(page, totalPages);
  const paged = sorted.slice(
    (clampedPage - 1) * PAGE_SIZE,
    clampedPage * PAGE_SIZE
  );

  const hasResults = paged.length > 0;
  const hasInventory = allCars.length > 0;
  const filtersActive =
    JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS);

  function updateFilter<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }

  function clearFilters() {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }

  return (
    <main>
      {/* ── Header ── */}
      <section className="bg-ivory pt-[72px]">
        <div className="mx-auto max-w-shell px-6 sm:px-10 lg:px-[88px] pt-20 pb-12">
          <FadeIn>
            <SectionLabel className="mb-6">
              Inventario de inversiones
            </SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-serif font-light text-[48px] sm:text-[64px] lg:text-[80px] leading-[1] tracking-[-0.015em] text-text mb-6">
              Vehículos
              <br />
              <em className="italic">disponibles</em>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-sans font-light text-[13.5px] leading-[1.85] tracking-[0.02em] text-muted max-w-[500px]">
              Explora nuestra selección curada de vehículos premium abiertos a
              inversión. Cada listado incluye información completa del vehículo
              y proyecciones financieras.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Filters bar ── */}
      <div className="bg-ivory-deep border-y border-rule">
        <div className="mx-auto max-w-shell px-6 sm:px-10 lg:px-[88px] py-5">
          <div className="flex flex-wrap items-center gap-4 lg:gap-6">
            <FilterSelect
              label="Marca"
              value={filters.brand}
              onChange={(v) => updateFilter("brand", v)}
              options={[
                { value: "all", label: "Todas" },
                ...brands.map((b) => ({ value: b, label: b })),
              ]}
            />
            <FilterSelect
              label="Año"
              value={filters.year}
              onChange={(v) => updateFilter("year", v)}
              options={[
                { value: "all", label: "Todos" },
                ...years.map((y) => ({ value: y, label: y })),
              ]}
            />
            <FilterSelect
              label="Precio"
              value={filters.price}
              onChange={(v) => updateFilter("price", v as FilterPrice)}
              options={[
                { value: "all", label: "Todos" },
                { value: "under20", label: "Menos de €20K" },
                { value: "20-50", label: "€20K – €50K" },
                { value: "50-100", label: "€50K – €100K" },
                { value: "over100", label: "Más de €100K" },
              ]}
            />
            <FilterSelect
              label="Rentabilidad"
              value={filters.roi}
              onChange={(v) => updateFilter("roi", v as FilterRoi)}
              options={[
                { value: "all", label: "Toda" },
                { value: "15-20", label: "15 – 20 %" },
                { value: "20-25", label: "20 – 25 %" },
                { value: "25+", label: "Más del 25 %" },
              ]}
            />

            <div className="hidden lg:block flex-1" />

            <StatusPills
              value={filters.status}
              onChange={(v) => updateFilter("status", v)}
            />
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <section className="bg-ivory py-16 px-6 sm:px-10 lg:px-[88px]">
        <div className="mx-auto max-w-shell">
          {/* Result count */}
          <div className="mb-8 flex items-center justify-between">
            <span className="font-sans font-light text-[11px] uppercase tracking-[0.2em] text-muted">
              <span className="num">{sorted.length}</span>{" "}
              {sorted.length === 1 ? "vehículo" : "vehículos"}
              {filtersActive && " coinciden"}
            </span>
            {filtersActive && (
              <button
                onClick={clearFilters}
                className="font-sans font-normal text-[10px] uppercase tracking-[0.2em] text-muted hover:text-text transition-colors"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {hasResults ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px]">
                {paged.map((car, i) => (
                  <FadeIn key={car.id} delay={i * 0.1}>
                    <InvestmentCard
                      car={toCardData(car)}
                      minInvestment={MIN_INVESTMENT}
                      href={`${ROUTES.oportunidades}/${car.id}`}
                    />
                  </FadeIn>
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  page={clampedPage}
                  totalPages={totalPages}
                  onChange={setPage}
                />
              )}
            </>
          ) : hasInventory ? (
            <NoResults onClear={clearFilters} />
          ) : (
            <NoInventory
              email={notifyEmail}
              onEmailChange={setNotifyEmail}
              onSubmit={() => {
                // TODO: persist to Supabase
                alert(
                  "¡Gracias! Te avisaremos cuando publiquemos nuevas oportunidades."
                );
                setNotifyEmail("");
              }}
            />
          )}
        </div>
      </section>
    </main>
  );
}

// ── FilterSelect ────────────────────────────────────────────────────
function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label className="inline-flex items-center gap-3">
      <span className="font-sans font-normal text-[9px] uppercase tracking-[0.22em] text-muted">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-transparent border border-rule text-text font-sans font-normal text-[10px] uppercase tracking-[0.15em] py-2 pl-3 pr-9 cursor-pointer hover:border-text transition-colors focus:outline-none focus:border-text"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 pointer-events-none text-muted"
          strokeWidth={1.5}
        />
      </div>
    </label>
  );
}

// ── StatusPills ─────────────────────────────────────────────────────
function StatusPills({
  value,
  onChange,
}: {
  value: FilterStatus;
  onChange: (v: FilterStatus) => void;
}) {
  const options: Array<{ value: FilterStatus; label: string }> = [
    { value: "all", label: "Todos" },
    { value: "open", label: "Abiertos" },
    { value: "full", label: "Financiados" },
    { value: "soon", label: "Próximamente" },
  ];

  return (
    <div className="flex border border-rule">
      {options.map((opt, i) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "font-sans font-normal text-[10px] uppercase tracking-[0.18em] px-4 py-2 transition-colors",
            i > 0 && "border-l border-rule",
            value === opt.value
              ? "bg-text text-ivory"
              : "bg-transparent text-muted hover:text-text"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ── Pagination ──────────────────────────────────────────────────────
function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  return (
    <div className="mt-16 flex items-center justify-center gap-10">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="font-sans font-normal text-[10px] uppercase tracking-[0.2em] text-muted hover:text-text transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        « Anterior
      </button>
      <span className="font-sans font-normal text-[10px] uppercase tracking-[0.2em] text-text">
        Página <span className="num">{page}</span> de{" "}
        <span className="num">{totalPages}</span>
      </span>
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="font-sans font-normal text-[10px] uppercase tracking-[0.2em] text-muted hover:text-text transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Siguiente »
      </button>
    </div>
  );
}

// ── Empty states ────────────────────────────────────────────────────
function NoResults({ onClear }: { onClear: () => void }) {
  return (
    <div className="text-center py-24 border border-rule">
      <div className="mx-auto mb-6 inline-flex h-12 w-12 items-center justify-center border border-rule">
        <svg
          className="h-5 w-5 text-muted"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </div>
      <h3 className="font-serif font-light text-[24px] text-text mb-2">
        Ningún vehículo coincide
      </h3>
      <p className="font-sans font-light text-[13px] text-muted max-w-[400px] mx-auto mb-8">
        Prueba a ajustar o limpiar los filtros para ver más resultados.
      </p>
      <button
        onClick={onClear}
        className="inline-flex items-center justify-center font-sans font-normal text-[10px] uppercase tracking-[0.26em] bg-text text-ivory px-10 py-[15px] transition-opacity duration-200 hover:opacity-85"
      >
        Limpiar filtros
      </button>
    </div>
  );
}

function NoInventory({
  email,
  onEmailChange,
  onSubmit,
}: {
  email: string;
  onEmailChange: (v: string) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="text-center py-24 border border-rule">
      <div className="mx-auto mb-6 inline-flex h-12 w-12 items-center justify-center border border-rule">
        <svg
          className="h-5 w-5 text-muted"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M3 7l9 6 9-6" />
          <rect x="3" y="5" width="18" height="14" />
        </svg>
      </div>
      <h3 className="font-serif font-light text-[24px] text-text mb-2">
        Pronto, nuevas oportunidades
      </h3>
      <p className="font-sans font-light text-[13px] text-muted max-w-[420px] mx-auto mb-8">
        Déjanos tu email y te avisaremos cuando publiquemos un nuevo vehículo.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="mx-auto flex max-w-[440px] gap-2"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="tu@email.com"
          required
          className="flex-1 bg-ivory border border-rule px-4 py-3 font-sans font-light text-[13px] text-text placeholder:text-muted focus:outline-none focus:border-text transition-colors"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center font-sans font-normal text-[10px] uppercase tracking-[0.22em] bg-text text-ivory px-6 py-3 transition-opacity duration-200 hover:opacity-85"
        >
          Avisarme
        </button>
      </form>
    </div>
  );
}
