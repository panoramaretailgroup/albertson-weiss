import { cn } from "@/lib/utils";

interface StatsCardProps {
  /** @deprecated decorative icons are no longer rendered in the editorial style. */
  icon?: React.ReactNode;
  value: string;
  label: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

export default function StatsCard({
  value,
  label,
  trend,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "border border-rule bg-[#f8f5ef] p-6",
        className ?? ""
      )}
    >
      <div className="font-sans text-[9px] uppercase tracking-[0.24em] text-muted font-normal mb-3.5">
        {label}
      </div>
      <div className="num font-light text-[28px] text-text tracking-[0.005em] leading-none mb-2">
        {value}
      </div>
      {trend && (
        <span
          className={cn(
            "inline-block num text-[10px] font-normal border px-2 py-0.5",
            trend.positive
              ? "border-green text-green"
              : "border-red-500 text-red-500"
          )}
        >
          {trend.value}
        </span>
      )}
    </div>
  );
}
