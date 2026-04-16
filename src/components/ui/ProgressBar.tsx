import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  label?: string;
  color?: "gold" | "green";
  className?: string;
}

const barColors = {
  gold: "bg-gold",
  green: "bg-green",
};

export default function ProgressBar({
  value,
  label,
  color = "gold",
  className,
}: ProgressBarProps) {
  const clamped = Math.min(Math.max(value, 0), 100);

  return (
    <div className={cn("w-full", className ?? "")}>
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-sm">
          <span>{label}</span>
          <span className="font-medium">{clamped}%</span>
        </div>
      )}
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-gray-200/20"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? `${clamped}% completado`}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            barColors[color]
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
