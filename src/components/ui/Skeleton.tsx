import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "light" | "dark";
}

export function Skeleton({ className, variant = "light" }: SkeletonProps) {
  return (
    <div
      className={cn(
        variant === "light" ? "skeleton" : "skeleton-dark",
        className
      )}
    />
  );
}

export function CardSkeleton({ variant = "light" }: { variant?: "light" | "dark" }) {
  const isDark = variant === "dark";
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border",
        isDark ? "border-gold/10 bg-white/5" : "border-gray-200 bg-white"
      )}
    >
      <Skeleton
        variant={variant}
        className={cn("aspect-[16/10] w-full rounded-none", isDark ? "skeleton-dark" : "")}
      />
      <div className="p-4 space-y-3">
        <Skeleton variant={variant} className="h-5 w-3/4" />
        <Skeleton variant={variant} className="h-4 w-1/2" />
        <Skeleton variant={variant} className="h-2 w-full mt-4" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton variant={variant} className="h-4 w-20" />
          <Skeleton variant={variant} className="h-4 w-16" />
        </div>
        <Skeleton variant={variant} className="h-9 w-full mt-2" />
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <Skeleton className="h-10 w-10 rounded-lg" />
      <Skeleton className="mt-4 h-7 w-24" />
      <Skeleton className="mt-2 h-4 w-32" />
    </div>
  );
}

export function TableRowSkeleton({ cols = 5 }: { cols?: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

export function TimelineSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white divide-y divide-gray-100">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-3 px-5 py-4">
          <Skeleton className="h-8 w-8 shrink-0 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-3 w-12" />
        </div>
      ))}
    </div>
  );
}
