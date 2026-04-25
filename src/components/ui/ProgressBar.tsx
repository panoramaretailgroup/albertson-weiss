import { cn } from "@/lib/utils";

type ProgressBarVariant = "text" | "amber" | "dark";

// Legacy color prop (kept for backward compat during redesign migration)
type LegacyColor = "gold" | "green";

interface ProgressBarProps {
  value: number;
  variant?: ProgressBarVariant;
  /** @deprecated use `variant` instead */
  color?: LegacyColor;
  className?: string;
  label?: string;
  ariaLabel?: string;
}

const legacyMap: Record<LegacyColor, ProgressBarVariant> = {
  gold: "amber",
  green: "text",
};

export default function ProgressBar({
  value,
  variant,
  color,
  className,
  ariaLabel,
  label,
}: ProgressBarProps) {
  const clamped = Math.min(Math.max(value, 0), 100);
  const resolvedVariant: ProgressBarVariant =
    variant ?? (color ? legacyMap[color] : "text");

  const trackCls = resolvedVariant === "dark" ? "bg-white/10" : "bg-rule";
  const fillCls =
    resolvedVariant === "amber"
      ? "bg-amber"
      : resolvedVariant === "dark"
        ? "bg-white"
        : "bg-text";

  return (
    <div className={cn("w-full", className ?? "")}>
      {label && (
        <div className="mb-2 flex items-center justify-between text-sm">
          <span>{label}</span>
          <span className="num font-medium">{clamped}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel ?? label ?? `${clamped}% funded`}
        className={cn("h-[2px] w-full", trackCls)}
      >
        <div
          className={cn(
            "h-full transition-[width] duration-1000 ease-out",
            fillCls
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
