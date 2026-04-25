import { cn, formatCurrency, calculateProgress } from "@/lib/utils";
import ProgressBar from "@/components/ui/ProgressBar";
import Badge from "@/components/ui/Badge";
import { CAR_STATUSES } from "@/lib/constants";
import type { Car, CarStatus } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  car: Car;
  stockNumber: number;
  className?: string;
}

const statusBadgeColor: Record<
  CarStatus,
  "gold" | "green" | "blue" | "gray" | "red"
> = {
  open: "gold",
  funded: "blue",
  in_transit: "blue",
  sold: "green",
  completed: "green",
};

export default function InventoryCard({ car, stockNumber, className }: Props) {
  const pct = calculateProgress(
    car.investment_collected_eur,
    car.investment_needed_eur
  );

  const primaryCtaLabel =
    car.status === "open"
      ? "Invertir"
      : car.status === "funded"
        ? "Ver operación"
        : "Ver detalles";

  return (
    <Link
      href={`/panel/oportunidades/${car.id}`}
      className={cn("block group", className)}
    >
      <article className="border border-rule bg-[#f8f5ef] flex flex-col hover:bg-ivory-deep transition-colors h-full">
        {/* Image + overlays */}
        <div className="relative overflow-hidden bg-black h-[340px]">
          {car.thumbnail ? (
            <Image
              src={car.thumbnail}
              alt={`${car.brand} ${car.model}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[#1a1612]">
              <svg
                className="h-16 w-16 text-white/15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
          )}

          {/* Status pill */}
          <div className="absolute top-4 left-4">
            <Badge color={statusBadgeColor[car.status]}>
              {CAR_STATUSES[car.status]}
            </Badge>
          </div>

          {/* Stock number */}
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-ivory px-2.5 py-1.5 num text-[10px] tracking-[0.08em]">
            № {String(stockNumber).padStart(3, "0")}
          </div>

          {/* Bottom gradient with brand + ROI */}
          <div className="absolute bottom-0 left-0 right-0 px-6 py-5 bg-gradient-to-t from-black/75 to-transparent text-white">
            <div className="flex justify-between items-end gap-4">
              <div className="min-w-0">
                <div className="font-sans text-[9px] uppercase tracking-[0.25em] text-white/70 font-light mb-1">
                  {car.brand} · {car.year}
                </div>
                <div className="font-serif font-light text-[30px] leading-[1.05] tracking-[-0.01em] truncate">
                  {car.model}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-sans text-[8px] uppercase tracking-[0.22em] text-white/70 font-light mb-0.5">
                  ROI objetivo
                </div>
                <div className="num text-[26px] font-light text-amber leading-none">
                  {car.estimated_return_pct}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-7 flex-1 flex flex-col">
          {/* Specs */}
          <div className="grid grid-cols-4 gap-5 pb-5 border-b border-rule/60 mb-5">
            <Spec
              label="Kilometraje"
              value={
                car.mileage_km !== null && car.mileage_km !== undefined
                  ? `${car.mileage_km.toLocaleString("es-ES")} km`
                  : "—"
              }
            />
            <Spec label="Motor" value={car.engine ?? "—"} />
            <Spec label="Color" value={car.color ?? "—"} />
            <Spec label="Duración" value={`${car.estimated_duration_days}d`} />
          </div>

          {/* Investment amounts */}
          <div className="flex justify-between items-baseline mb-5 gap-4">
            <div>
              <div className="font-sans text-[8px] uppercase tracking-[0.22em] text-muted font-light mb-1.5">
                Inversión necesaria
              </div>
              <div className="num text-[22px] font-light text-text leading-none">
                {formatCurrency(car.investment_needed_eur)}
              </div>
            </div>
            <div className="text-right">
              <div className="font-sans text-[8px] uppercase tracking-[0.22em] text-muted font-light mb-1.5">
                Inversión mínima
              </div>
              <div className="num text-[22px] font-light text-text leading-none">
                €1.000
              </div>
            </div>
          </div>

          {/* Funding bar */}
          <div className="mb-6">
            <div className="flex justify-between mb-2.5 items-baseline gap-3">
              <span className="font-sans text-[9px] uppercase tracking-[0.22em] text-muted font-normal">
                Financiado
              </span>
              <span className="num text-[10px] text-text font-normal truncate">
                {pct}% · {formatCurrency(car.investment_collected_eur)} de{" "}
                {formatCurrency(car.investment_needed_eur)}
              </span>
            </div>
            <ProgressBar value={pct} variant="text" />
          </div>

          {/* Dual CTAs */}
          <div className="flex gap-3 mt-auto">
            <span className="flex-1 bg-text text-ivory text-center font-sans text-[10px] uppercase tracking-[0.24em] font-normal py-3.5 transition-opacity group-hover:opacity-90">
              {primaryCtaLabel}
            </span>
            <span className="flex-1 border border-rule text-mutedDk text-center font-sans text-[10px] uppercase tracking-[0.24em] font-normal py-3.5 group-hover:border-text group-hover:text-text transition-colors">
              Ver detalles
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <div className="font-sans text-[8px] uppercase tracking-[0.22em] text-muted font-light mb-1.5">
        {label}
      </div>
      <div className="num text-[12px] text-text font-normal truncate">
        {value}
      </div>
    </div>
  );
}
