import { cn } from "@/lib/utils";

interface StatsCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

export default function StatsCard({
  icon,
  value,
  label,
  trend,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white p-5 shadow-sm",
        className ?? ""
      )}
    >
      <div className="flex items-start justify-between">
        <div className="rounded-lg bg-gray-50 p-2.5 text-gray-600">{icon}</div>
        {trend && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium",
              trend.positive
                ? "bg-green/10 text-green"
                : "bg-red-500/10 text-red-500"
            )}
          >
            <svg
              className={cn("h-3 w-3", !trend.positive && "rotate-180")}
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 2.5v7M6 2.5L2.5 6M6 2.5L9.5 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {trend.value}
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-semibold text-gray-900">{value}</p>
      <p className="mt-1 text-sm text-gray-500">{label}</p>
    </div>
  );
}
