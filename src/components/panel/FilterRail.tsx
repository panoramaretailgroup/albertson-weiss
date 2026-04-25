"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import type { CarStatus } from "@/lib/types";

export interface FilterState {
  brands: string[];
  years: number[];
  statuses: CarStatus[];
  priceRange: [number, number];
  roiRange: [number, number];
}

interface Props {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  onReset: () => void;
  brandOptions: { name: string; count: number }[];
  yearOptions: number[];
  priceBounds: [number, number];
  roiBounds: [number, number];
  statusOptions: { key: CarStatus; label: string; count: number }[];
}

export default function FilterRail({
  filters,
  onChange,
  onReset,
  brandOptions,
  yearOptions,
  priceBounds,
  roiBounds,
  statusOptions,
}: Props) {
  const toggle = <T,>(arr: T[], value: T): T[] =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  return (
    <aside className="w-[280px] shrink-0 border-r border-rule py-10 pl-0 pr-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-9">
        <div className="flex items-center gap-2.5">
          <FilterIcon />
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-text font-normal">
            Refinar
          </span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="font-sans text-[9px] uppercase tracking-[0.2em] text-muted font-normal underline underline-offset-[3px] hover:text-text transition-colors"
        >
          Limpiar todo
        </button>
      </div>

      {/* Brand */}
      <Section title="Marca">
        <ul className="space-y-3">
          {brandOptions.map((b) => {
            const checked = filters.brands.includes(b.name);
            return (
              <li key={b.name}>
                <button
                  type="button"
                  onClick={() =>
                    onChange({ ...filters, brands: toggle(filters.brands, b.name) })
                  }
                  className="w-full flex items-center gap-3 group"
                >
                  <CheckboxSquare checked={checked} />
                  <span
                    className={cn(
                      "flex-1 text-left font-sans text-[12px] font-light tracking-[0.02em] transition-colors",
                      checked ? "text-text" : "text-mutedDk"
                    )}
                  >
                    {b.name}
                  </span>
                  <span className="num text-[10px] text-muted">{b.count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Year */}
      <Section title="Año">
        <div className="flex flex-wrap gap-2">
          {yearOptions.map((y) => {
            const active = filters.years.includes(y);
            return (
              <button
                key={y}
                type="button"
                onClick={() =>
                  onChange({ ...filters, years: toggle(filters.years, y) })
                }
                className={cn(
                  "num text-[11px] py-2 px-4 border transition-colors",
                  active
                    ? "bg-text text-ivory border-text"
                    : "bg-transparent text-mutedDk border-rule hover:border-text hover:text-text"
                )}
              >
                {y}
              </button>
            );
          })}
        </div>
      </Section>

      {/* Price range */}
      <Section title="Rango de precio">
        <RangeSlider
          min={priceBounds[0]}
          max={priceBounds[1]}
          step={1000}
          value={filters.priceRange}
          onChange={(v) => onChange({ ...filters, priceRange: v })}
          formatValue={(v) => `€${Math.round(v / 1000)}k`}
        />
      </Section>

      {/* ROI */}
      <Section title="ROI proyectado">
        <RangeSlider
          min={roiBounds[0]}
          max={roiBounds[1]}
          step={1}
          value={filters.roiRange}
          onChange={(v) => onChange({ ...filters, roiRange: v })}
          formatValue={(v) => `${Math.round(v)}%`}
        />
      </Section>

      {/* Status */}
      <Section title="Estado de inversión" last>
        <ul className="space-y-3">
          {statusOptions.map((s) => {
            const checked = filters.statuses.includes(s.key);
            return (
              <li key={s.key}>
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...filters,
                      statuses: toggle(filters.statuses, s.key),
                    })
                  }
                  className="w-full flex items-center gap-3"
                >
                  <CheckboxSquare checked={checked} />
                  <span
                    className={cn(
                      "flex-1 text-left font-sans text-[12px] font-light tracking-[0.02em] transition-colors",
                      checked ? "text-text" : "text-mutedDk"
                    )}
                  >
                    {s.label}
                  </span>
                  <span className="num text-[10px] text-muted">{s.count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Alert */}
      <div className="mt-8">
        <p className="font-sans text-[9px] text-muted font-light tracking-[0.04em] leading-[1.7] mb-3">
          Guardar estos filtros como alerta permanente.
        </p>
        <button
          type="button"
          className="w-full border border-rule text-mutedDk hover:border-text hover:text-text font-sans text-[10px] uppercase tracking-[0.22em] py-3 transition-colors"
        >
          Crear alerta
        </button>
      </div>
    </aside>
  );
}

// ── Subcomponents ───────────────────────────────────────────────────────

function Section({
  title,
  children,
  last,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "pb-7 mb-7",
        !last && "border-b border-rule"
      )}
    >
      <div className="font-sans text-[9px] uppercase tracking-[0.3em] text-text font-normal mb-5">
        {title}
      </div>
      {children}
    </div>
  );
}

function CheckboxSquare({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "w-[14px] h-[14px] flex items-center justify-center shrink-0 border transition-colors",
        checked ? "bg-text border-text" : "bg-transparent border-rule"
      )}
    >
      {checked && (
        <svg
          width="8"
          height="8"
          viewBox="0 0 10 10"
          fill="none"
          className="text-ivory"
        >
          <path
            d="M1.5 5L4 7.5L8.5 2.5"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}

function FilterIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="text-text"
      aria-hidden="true"
    >
      <path
        d="M1 3h12M3 7h8M5 11h4"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Range slider ─────────────────────────────────────────────────────────

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (v: [number, number]) => void;
  formatValue: (v: number) => string;
}

function RangeSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
  formatValue,
}: RangeSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<"min" | "max" | null>(null);

  const span = Math.max(max - min, 1);
  const lowPct = ((value[0] - min) / span) * 100;
  const highPct = ((value[1] - min) / span) * 100;

  const clampStep = (v: number) => {
    const stepped = Math.round((v - min) / step) * step + min;
    return Math.max(min, Math.min(max, stepped));
  };

  const valueFromClientX = (clientX: number) => {
    const rail = trackRef.current;
    if (!rail) return min;
    const rect = rail.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return clampStep(min + ratio * span);
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      const raw = valueFromClientX(e.clientX);
      if (draggingRef.current === "min") {
        onChange([Math.min(raw, value[1]), value[1]]);
      } else {
        onChange([value[0], Math.max(raw, value[0])]);
      }
    };
    const onUp = () => {
      draggingRef.current = null;
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value[0], value[1], min, max, step]);

  return (
    <div>
      <div className="flex justify-between items-baseline mb-5">
        <span className="num text-[12px] text-text font-light">
          {formatValue(value[0])}
        </span>
        <span className="font-sans text-[8px] uppercase tracking-[0.22em] text-muted">
          —
        </span>
        <span className="num text-[12px] text-text font-light">
          {formatValue(value[1])}
        </span>
      </div>

      <div
        ref={trackRef}
        className="relative h-[2px] bg-rule select-none"
        role="presentation"
      >
        {/* active range */}
        <div
          className="absolute top-0 bottom-0 bg-text"
          style={{
            left: `${lowPct}%`,
            width: `${Math.max(highPct - lowPct, 0)}%`,
          }}
        />
        {/* min thumb */}
        <button
          type="button"
          aria-label="Mínimo"
          onMouseDown={() => {
            draggingRef.current = "min";
          }}
          className="absolute top-1/2 w-[14px] h-[14px] -translate-x-1/2 -translate-y-1/2 bg-[#f8f5ef] border border-text cursor-pointer"
          style={{ left: `${lowPct}%` }}
        />
        {/* max thumb */}
        <button
          type="button"
          aria-label="Máximo"
          onMouseDown={() => {
            draggingRef.current = "max";
          }}
          className="absolute top-1/2 w-[14px] h-[14px] -translate-x-1/2 -translate-y-1/2 bg-[#f8f5ef] border border-text cursor-pointer"
          style={{ left: `${highPct}%` }}
        />
      </div>
    </div>
  );
}
