"use client";

import PanelShell from "@/components/panel/PanelShell";
import { StatsSkeleton, CardSkeleton, TimelineSkeleton } from "@/components/ui/Skeleton";

export default function PanelLoading() {
  return (
    <PanelShell breadcrumb="Cargando...">
      <div className="mb-8 space-y-2">
        <div className="skeleton h-7 w-48" />
        <div className="skeleton h-4 w-64" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatsSkeleton key={i} />
        ))}
      </div>
      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      <div className="mt-10">
        <TimelineSkeleton rows={3} />
      </div>
    </PanelShell>
  );
}
