import { cn } from "@/lib/utils";
import { Fragment } from "react";

export interface StatItem {
  value: string;
  label: string;
}

interface StatsBarProps {
  stats: StatItem[];
  accent?: boolean;
  className?: string;
}

/**
 * Horizontal dark stats bar.
 *   - Black background
 *   - Large number (DM Sans 28px, weight 300) + tiny uppercase label
 *   - Vertical 1px rgba(255,255,255,0.08) separators between items
 *   - Optional amber accent on numbers
 */
export default function StatsBar({
  stats,
  accent = false,
  className,
}: StatsBarProps) {
  const valueCls = accent ? "text-amber" : "text-white";

  return (
    <div
      className={cn(
        "bg-black flex items-center justify-center py-8 px-[88px]",
        className ?? ""
      )}
    >
      {stats.map((stat, i) => (
        <Fragment key={`${stat.label}-${i}`}>
          {i > 0 && (
            <div
              className="self-stretch w-px bg-white/[0.08] mx-14"
              aria-hidden="true"
            />
          )}
          <div>
            <div
              className={cn(
                "num font-light text-[28px] tracking-[0.01em] leading-none",
                valueCls
              )}
            >
              {stat.value}
            </div>
            <div className="font-sans font-light text-[8.5px] uppercase tracking-[0.22em] text-muted mt-[5px]">
              {stat.label}
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
