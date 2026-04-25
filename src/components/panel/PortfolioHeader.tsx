"use client";

import { cn } from "@/lib/utils";

export interface PortfolioStat {
  label: string;
  value: string;
  /** Secondary line shown under the value (sub-text). */
  subtitle?: string;
  /** Optional trend badge, e.g. "+15,0%". */
  trend?: string;
  /** Border/text color of the trend badge. Defaults to true (green). */
  trendPositive?: boolean;
  /** Paint the value in amber instead of white. */
  accent?: boolean;
}

interface PortfolioHeaderProps {
  displayName: string;
  stats: PortfolioStat[];
  onWithdraw?: () => void;
  onDeposit?: () => void;
}

/**
 * Full-width editorial header for the investor dashboard.
 *
 *   ─ INVESTOR · Nombre
 *   Tu Portfolio                                   [ Retirar ] [ Depositar ]
 *   ─────────────────────────────────────────────────────────────────────
 *   €25.000 │ €28.750 +15% │ €3.750 │ €25.000 │ €0
 *
 * Breaks out of the PanelShell main padding using negative margins.
 */
export default function PortfolioHeader({
  displayName,
  stats,
  onWithdraw,
  onDeposit,
}: PortfolioHeaderProps) {
  return (
    <section
      className={cn(
        // Break out of PanelShell padding (main uses px-4 sm:px-6 lg:px-8 py-6)
        "mx-[-16px] sm:mx-[-24px] lg:mx-[-32px] mt-[-24px] mb-10",
        // Own surface + padding
        "bg-black",
        "px-6 sm:px-10 lg:px-14",
        "py-12 lg:py-14"
      )}
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Top row: title + actions */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 mb-12">
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3.5 mb-4">
              <div className="h-px w-7 bg-white/20" aria-hidden="true" />
              <span className="font-sans font-normal text-[9.5px] uppercase tracking-[0.3em] text-white/50">
                Inversor · {displayName}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif font-light text-[48px] sm:text-[56px] lg:text-[64px] leading-[1.05] tracking-[-0.015em] text-white">
              Tu <em className="italic">Portfolio</em>
            </h1>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onWithdraw}
              className="bg-transparent border border-white/25 text-white font-sans font-normal text-[10px] uppercase tracking-[0.24em] px-6 py-3 hover:bg-white hover:text-black transition-colors"
            >
              Retirar
            </button>
            <button
              type="button"
              onClick={onDeposit}
              className="bg-amber text-black font-sans font-normal text-[10px] uppercase tracking-[0.24em] px-7 py-3 hover:opacity-85 transition-opacity"
            >
              Depositar fondos
            </button>
          </div>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-6 lg:gap-0">
          {stats.map((stat, i) => (
            <PortfolioMetric
              key={stat.label}
              stat={stat}
              isFirst={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioMetric({
  stat,
  isFirst,
}: {
  stat: PortfolioStat;
  isFirst: boolean;
}) {
  const positive = stat.trendPositive !== false;

  return (
    <div
      className={cn(
        "lg:px-8",
        "lg:border-l lg:border-white/[0.08]",
        isFirst && "lg:border-l-0 lg:pl-0"
      )}
    >
      {/* Label */}
      <div className="font-sans font-normal text-[9px] uppercase tracking-[0.24em] text-white/50 mb-3.5">
        {stat.label}
      </div>

      {/* Value */}
      <div
        className={cn(
          "num font-num font-light text-[32px] tracking-[0.005em] leading-none mb-2.5",
          stat.accent ? "text-amber" : "text-white"
        )}
      >
        {stat.value}
      </div>

      {/* Trend badge + subtitle */}
      {(stat.trend || stat.subtitle) && (
        <div className="flex items-center gap-2.5">
          {stat.trend && (
            <span
              className={cn(
                "num font-num font-normal text-[10px] tracking-[0.04em] border px-2 py-0.5",
                positive
                  ? "border-green text-green"
                  : "border-red-400 text-red-400"
              )}
            >
              {stat.trend}
            </span>
          )}
          {stat.subtitle && (
            <span className="font-sans font-light text-[10px] tracking-[0.04em] text-white/50">
              {stat.subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
