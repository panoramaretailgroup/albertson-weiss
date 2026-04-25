"use client";

import { cn, formatCurrency } from "@/lib/utils";
import type { Investment } from "@/lib/types";
import { useMemo, useState } from "react";

type RangeKey = "1M" | "3M" | "6M" | "1A" | "ALL";

const RANGES: { key: RangeKey; label: string }[] = [
  { key: "1M", label: "1M" },
  { key: "3M", label: "3M" },
  { key: "6M", label: "6M" },
  { key: "1A", label: "1A" },
  { key: "ALL", label: "TODO" },
];

// Placeholder series: 10 realized points + 2 projected (future months).
// Values in EUR. Once Supabase is wired, derive from invested_at + mark-to-market snapshots.
interface SeriesPoint {
  label: string;
  /** ISO-like "YYYY-MM" for sorting / deltas. */
  ym: string;
  value: number;
  projected?: boolean;
}

const ALL_SERIES: SeriesPoint[] = [
  { label: "Jul 25", ym: "2025-07", value: 0 },
  { label: "Ago 25", ym: "2025-08", value: 15000 },
  { label: "Sep 25", ym: "2025-09", value: 15200 },
  { label: "Oct 25", ym: "2025-10", value: 16100 },
  { label: "Nov 25", ym: "2025-11", value: 17400 },
  { label: "Dic 25", ym: "2025-12", value: 19800 },
  { label: "Ene 26", ym: "2026-01", value: 22500 },
  { label: "Feb 26", ym: "2026-02", value: 24100 },
  { label: "Mar 26", ym: "2026-03", value: 26300 },
  { label: "Abr 26", ym: "2026-04", value: 28750 },
  { label: "May 26", ym: "2026-05", value: 31200, projected: true },
  { label: "Jun 26", ym: "2026-06", value: 33700, projected: true },
];

const RANGE_TO_MONTHS: Record<RangeKey, number | null> = {
  "1M": 2,
  "3M": 4,
  "6M": 7,
  "1A": 11,
  ALL: null,
};

// Phase buckets (derived from Car.logistics_phase, 1–8).
interface PhaseBucket {
  key: string;
  label: string;
  color: string;
  range: [number, number];
}

const BUCKETS: PhaseBucket[] = [
  { key: "transit", label: "En tránsito marítimo", color: "#0d0c0a", range: [1, 3] },
  { key: "customs", label: "Aduana / Homologación", color: "#6b6560", range: [4, 4] },
  { key: "prep", label: "Preparación / ITV", color: "#8a8480", range: [5, 6] },
  { key: "sale", label: "En venta", color: "#b0a898", range: [7, 8] },
];

function computePhaseBreakdown(investments: Investment[]) {
  const totals = BUCKETS.map((b) => ({ ...b, amount: 0 }));
  let grand = 0;

  for (const inv of investments) {
    if (inv.status !== "active") continue;
    const phase = inv.car?.logistics_phase ?? 1;
    const bucket = totals.find(
      (b) => phase >= b.range[0] && phase <= b.range[1]
    );
    if (bucket) {
      bucket.amount += inv.amount_eur;
      grand += inv.amount_eur;
    }
  }

  return totals.map((b) => ({
    ...b,
    pct: grand > 0 ? (b.amount / grand) * 100 : 0,
  }));
}

// Chart geometry
const VB_W = 880;
const VB_H = 220;
const CHART_TOP = 20;
const CHART_BOTTOM = 180;
const CHART_LEFT = 40;
const CHART_RIGHT = 840;

interface Props {
  investments: Investment[];
}

export default function PortfolioCharts({ investments }: Props) {
  const [range, setRange] = useState<RangeKey>("1A");
  const [hovered, setHovered] = useState<number | null>(null);

  const series = useMemo(() => {
    const months = RANGE_TO_MONTHS[range];
    if (months === null) return ALL_SERIES;
    // Keep the last N real points plus the 2 projected tail points.
    const realPoints = ALL_SERIES.filter((p) => !p.projected);
    const projected = ALL_SERIES.filter((p) => p.projected);
    const tail = realPoints.slice(-months);
    return [...tail, ...projected];
  }, [range]);

  const phases = useMemo(() => computePhaseBreakdown(investments), [investments]);

  const { minV, maxV } = useMemo(() => {
    const values = series.map((p) => p.value);
    const lo = Math.min(...values);
    const hi = Math.max(...values);
    const pad = (hi - lo) * 0.1 || 1;
    return { minV: Math.max(0, lo - pad), maxV: hi + pad };
  }, [series]);

  const points = useMemo(() => {
    const n = series.length;
    return series.map((p, i) => {
      const x =
        n === 1
          ? (CHART_LEFT + CHART_RIGHT) / 2
          : CHART_LEFT + ((CHART_RIGHT - CHART_LEFT) * i) / (n - 1);
      const y =
        CHART_BOTTOM -
        ((p.value - minV) / (maxV - minV || 1)) * (CHART_BOTTOM - CHART_TOP);
      return { ...p, x, y };
    });
  }, [series, minV, maxV]);

  const firstProjectedIdx = points.findIndex((p) => p.projected);
  const lastRealIdx =
    firstProjectedIdx === -1 ? points.length - 1 : firstProjectedIdx - 1;

  const realPoints = points.slice(0, lastRealIdx + 1);
  const projectedPoints =
    firstProjectedIdx === -1 ? [] : points.slice(lastRealIdx); // overlap 1 for continuity

  const realPath = realPoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const projectedPath = projectedPoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaPath =
    realPoints.length > 0
      ? `${realPath} L ${realPoints[realPoints.length - 1].x} ${CHART_BOTTOM} L ${realPoints[0].x} ${CHART_BOTTOM} Z`
      : "";

  const hoveredPoint = hovered !== null ? points[hovered] : null;

  // Month-over-month delta for tooltip
  const hoveredDelta = useMemo(() => {
    if (hovered === null || hovered === 0) return null;
    const prev = points[hovered - 1].value;
    const curr = points[hovered].value;
    if (prev === 0) return null;
    const pct = ((curr - prev) / prev) * 100;
    return { abs: curr - prev, pct };
  }, [hovered, points]);

  return (
    <section className="mt-10">
      <div className="flex items-center gap-3.5 mb-4">
        <div className="w-7 h-px bg-rule" aria-hidden="true" />
        <span className="font-sans text-[9.5px] uppercase tracking-[0.3em] text-muted font-normal">
          Analítica
        </span>
      </div>
      <h2 className="font-serif font-light text-[32px] leading-[1.05] text-text mb-6">
        Evolución del <em className="italic">portfolio</em>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[2px]">
        {/* LEFT — line chart */}
        <div className="lg:col-span-2 border border-rule bg-[#f8f5ef] p-6">
          {/* Header: title + range selector */}
          <div className="flex items-start justify-between mb-5 gap-4 flex-wrap">
            <div>
              <div className="font-sans text-[9px] uppercase tracking-[0.24em] text-muted mb-1.5">
                Valor total
              </div>
              <div className="num font-num font-light text-[28px] text-text leading-none">
                {formatCurrency(points[realPoints.length - 1]?.value ?? 0)}
              </div>
            </div>

            <div className="flex gap-1">
              {RANGES.map((r) => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => {
                    setRange(r.key);
                    setHovered(null);
                  }}
                  className={cn(
                    "num font-num text-[11px] tracking-[0.04em] px-2.5 py-1 border transition-colors",
                    range === r.key
                      ? "border-text bg-text text-ivory"
                      : "border-rule text-muted hover:border-text hover:text-text"
                  )}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="relative">
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              preserveAspectRatio="none"
              className="w-full h-[240px]"
              role="img"
              aria-label="Evolución del valor del portfolio"
            >
              <defs>
                <linearGradient id="pf-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c4a26a" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#c4a26a" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Horizontal gridlines */}
              {[0.25, 0.5, 0.75, 1].map((t) => {
                const y = CHART_TOP + (CHART_BOTTOM - CHART_TOP) * t;
                return (
                  <line
                    key={t}
                    x1={CHART_LEFT}
                    x2={CHART_RIGHT}
                    y1={y}
                    y2={y}
                    stroke="#c8c0b4"
                    strokeWidth="0.5"
                    strokeOpacity={t === 1 ? 1 : 0.5}
                    strokeDasharray={t === 1 ? undefined : "2 3"}
                  />
                );
              })}

              {/* Area fill under real line */}
              {areaPath && <path d={areaPath} fill="url(#pf-area)" />}

              {/* Real line */}
              {realPath && (
                <path
                  d={realPath}
                  fill="none"
                  stroke="#c4a26a"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              )}

              {/* Projected line (dashed) */}
              {projectedPath && (
                <path
                  d={projectedPath}
                  fill="none"
                  stroke="#c4a26a"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  strokeOpacity="0.55"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              )}

              {/* Dots */}
              {points.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r={2}
                  fill="#c4a26a"
                  fillOpacity={p.projected ? 0.5 : 1}
                />
              ))}

              {/* Hover indicator line */}
              {hoveredPoint && (
                <line
                  x1={hoveredPoint.x}
                  x2={hoveredPoint.x}
                  y1={CHART_TOP}
                  y2={CHART_BOTTOM}
                  stroke="#0d0c0a"
                  strokeWidth="0.5"
                  strokeOpacity="0.3"
                />
              )}

              {/* Transparent hover targets */}
              {points.map((p, i) => (
                <circle
                  key={`h-${i}`}
                  cx={p.x}
                  cy={p.y}
                  r={14}
                  fill="transparent"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onTouchStart={() => setHovered(i)}
                  style={{ cursor: "pointer" }}
                />
              ))}

              {/* X-axis labels */}
              {points.map((p, i) => {
                const n = points.length;
                // Show label every other point if many points, otherwise all.
                const skip = n > 8 && i % 2 !== 0 && i !== n - 1;
                if (skip) return null;
                return (
                  <text
                    key={`l-${i}`}
                    x={p.x}
                    y={VB_H - 4}
                    textAnchor="middle"
                    className="num"
                    fill="#8a8480"
                    fontSize="9"
                  >
                    {p.label}
                  </text>
                );
              })}
            </svg>

            {/* Tooltip */}
            {hoveredPoint && (
              <div
                className="absolute pointer-events-none bg-text text-ivory px-3 py-2 z-10"
                style={{
                  left: `${(hoveredPoint.x / VB_W) * 100}%`,
                  top: `${(hoveredPoint.y / VB_H) * 100}%`,
                  transform: "translate(-50%, calc(-100% - 10px))",
                  whiteSpace: "nowrap",
                }}
              >
                <div className="font-sans text-[9px] uppercase tracking-[0.2em] text-ivory/60 mb-0.5">
                  {hoveredPoint.label}
                  {hoveredPoint.projected && " · Proyección"}
                </div>
                <div className="num font-num text-[13px] text-ivory leading-none mb-1">
                  {formatCurrency(hoveredPoint.value)}
                </div>
                {hoveredDelta && (
                  <div
                    className={cn(
                      "num font-num text-[10px] tracking-[0.02em]",
                      hoveredDelta.pct >= 0 ? "text-green" : "text-red-400"
                    )}
                  >
                    {hoveredDelta.pct >= 0 ? "+" : ""}
                    {hoveredDelta.pct.toFixed(1).replace(".", ",")}% MoM
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-5 mt-4 pt-4 border-t border-rule">
            <div className="flex items-center gap-2">
              <span className="w-4 h-px bg-amber" aria-hidden="true" />
              <span className="font-sans text-[9.5px] uppercase tracking-[0.2em] text-muted">
                Real
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="w-4 h-px"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #c4a26a 50%, transparent 50%)",
                  backgroundSize: "4px 1px",
                  backgroundRepeat: "repeat-x",
                }}
                aria-hidden="true"
              />
              <span className="font-sans text-[9.5px] uppercase tracking-[0.2em] text-muted">
                Proyección
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT — phase breakdown */}
        <div className="border border-rule bg-[#f8f5ef] p-6">
          <div className="mb-5">
            <div className="font-sans text-[9px] uppercase tracking-[0.24em] text-muted mb-1.5">
              Capital por fase
            </div>
            <h3 className="font-serif text-lg font-light text-text">
              Distribución
            </h3>
          </div>

          {/* Stacked horizontal bar */}
          <div className="flex w-full h-[3px] overflow-hidden bg-ivory-deep mb-5">
            {phases.map((p) =>
              p.pct > 0 ? (
                <div
                  key={p.key}
                  style={{
                    width: `${p.pct}%`,
                    backgroundColor: p.color,
                  }}
                  aria-label={`${p.label}: ${p.pct.toFixed(0)}%`}
                />
              ) : null
            )}
          </div>

          {/* Bucket list */}
          <ul className="space-y-3.5">
            {phases.map((p) => (
              <li key={p.key} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="w-2 h-2 flex-shrink-0"
                    style={{ backgroundColor: p.color }}
                    aria-hidden="true"
                  />
                  <span className="font-sans text-[11px] text-text truncate">
                    {p.label}
                  </span>
                </div>
                <div className="flex items-baseline gap-2 flex-shrink-0">
                  <span className="num font-num text-[12px] text-text">
                    {p.pct.toFixed(0)}%
                  </span>
                  <span className="num font-num text-[10px] text-muted">
                    {formatCurrency(p.amount)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
