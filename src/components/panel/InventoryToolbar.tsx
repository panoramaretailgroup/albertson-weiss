"use client";

import { cn } from "@/lib/utils";

export type SortKey =
  | "featured"
  | "roi"
  | "priceDesc"
  | "priceAsc"
  | "timeline"
  | "newest";

export type ViewMode = "grid" | "list";

interface Props {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  resultsCount: number;
  sort: SortKey;
  onSortChange: (s: SortKey) => void;
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
}

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Destacados" },
  { key: "roi", label: "Mayor ROI" },
  { key: "priceDesc", label: "Precio: alto a bajo" },
  { key: "priceAsc", label: "Precio: bajo a alto" },
  { key: "timeline", label: "Menor duración" },
  { key: "newest", label: "Más recientes" },
];

export default function InventoryToolbar({
  searchQuery,
  onSearchChange,
  resultsCount,
  sort,
  onSortChange,
  view,
  onViewChange,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 py-5 border-b border-rule mb-8">
      {/* Left */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            width="12"
            height="12"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="6"
              cy="6"
              r="4.5"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M9.5 9.5L13 13"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar marca o modelo"
            className="w-[280px] bg-transparent border border-rule px-3.5 py-2.5 pl-9 font-sans text-[11px] tracking-[0.04em] text-text placeholder:text-muted outline-none focus:border-text transition-colors"
          />
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="num text-[10px] text-text font-normal">
            {String(resultsCount).padStart(2, "0")}
          </span>
          <span className="font-sans text-[10px] text-muted uppercase tracking-[0.2em] font-normal">
            resultados
          </span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Sort */}
        <div className="flex items-center gap-2.5">
          <span className="font-sans text-[9px] uppercase tracking-[0.22em] text-muted font-normal">
            Ordenar
          </span>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortKey)}
              className="appearance-none bg-transparent border-0 border-b border-rule pb-1 pr-6 font-sans text-[11px] tracking-[0.04em] text-text outline-none focus:border-text cursor-pointer transition-colors"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.key} value={o.key}>
                  {o.label}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-0 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
              width="8"
              height="5"
              viewBox="0 0 10 6"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 1l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* View toggle */}
        <div className="flex border border-rule">
          <ViewButton
            active={view === "grid"}
            onClick={() => onViewChange("grid")}
            label="Grid"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="1" width="4" height="4" fill="currentColor" />
              <rect x="7" y="1" width="4" height="4" fill="currentColor" />
              <rect x="1" y="7" width="4" height="4" fill="currentColor" />
              <rect x="7" y="7" width="4" height="4" fill="currentColor" />
            </svg>
          </ViewButton>
          <ViewButton
            active={view === "list"}
            onClick={() => onViewChange("list")}
            label="Lista"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="2" width="10" height="1.2" fill="currentColor" />
              <rect x="1" y="5.4" width="10" height="1.2" fill="currentColor" />
              <rect x="1" y="8.8" width="10" height="1.2" fill="currentColor" />
            </svg>
          </ViewButton>
        </div>
      </div>
    </div>
  );
}

function ViewButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "w-9 h-9 flex items-center justify-center transition-colors",
        active ? "bg-text text-ivory" : "bg-transparent text-muted hover:text-text"
      )}
    >
      {children}
    </button>
  );
}
