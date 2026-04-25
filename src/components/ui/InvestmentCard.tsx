"use client";

import { cn } from "@/lib/utils";
import Badge from "./Badge";
import ProgressBar from "./ProgressBar";
import Button from "./Button";
import Image from "next/image";
import Link from "next/link";

export type InvestmentStatus = "open" | "full" | "soon";

export interface InvestmentCardData {
  id: string;
  /** e.g. "911 GT3 Touring" */
  name: string;
  /** e.g. "Porsche · 2023" */
  make: string;
  /** e.g. "18.4%" */
  roi: string;
  /** e.g. "7 mo" */
  timeline: string;
  /** target funding in EUR */
  target: number;
  /** amount raised in EUR */
  raised: number;
  status: InvestmentStatus;
  /** e.g. "Open", "Fully Funded", "Opening Soon" */
  statusLabel: string;
  /** specs shown in the top row: [["Year","2023"], ["Mileage","2,100 mi"]] */
  specs: Array<[string, string]>;
  /** image URL */
  image: string;
}

interface InvestmentCardProps {
  car: InvestmentCardData;
  /** user's minimum investment amount, e.g. "€1,000" */
  minInvestment: string;
  /** show amber accent on ROI and progress bar */
  accent?: boolean;
  /** override the default /investments/[id] link */
  href?: string;
  className?: string;
}

function formatEurK(amount: number): string {
  return `€${Math.round(amount / 1000)}k`;
}

export default function InvestmentCard({
  car,
  minInvestment,
  accent = false,
  href,
  className,
}: InvestmentCardProps) {
  const pct = Math.min(
    100,
    Math.max(0, Math.round((car.raised / car.target) * 100))
  );
  const detailHref = href ?? `/investments/${car.id}`;

  return (
    <div
      className={cn(
        "group flex flex-col bg-ivory border border-rule transition-shadow duration-300 hover:shadow-card",
        className ?? ""
      )}
    >
      {/* Image */}
      <div className="relative">
        <div className="relative h-[320px] w-full overflow-hidden">
          <Image
            src={car.image}
            alt={`${car.make} ${car.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>
        <div className="absolute right-4 top-4">
          <Badge variant={car.status}>{car.statusLabel}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-7 pb-6">
        {/* Make / year small label */}
        <div className="font-sans font-light text-[9px] uppercase tracking-[0.22em] text-muted mb-2">
          {car.make}
        </div>

        {/* Vehicle name */}
        <h3 className="font-serif font-light text-[24px] leading-tight text-text mb-5">
          {car.name}
        </h3>

        {/* Specs row */}
        <div className="flex gap-5 mb-5 pb-5 border-b border-rule">
          {car.specs.map(([key, value]) => (
            <div key={key}>
              <div className="font-sans font-light text-[8px] uppercase tracking-[0.18em] text-muted mb-1">
                {key}
              </div>
              <div className="num text-[12px] text-text font-normal">
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Investment metrics grid */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          <div>
            <div className="font-sans font-light text-[8px] uppercase tracking-[0.18em] text-muted mb-1">
              Projected ROI
            </div>
            <div
              className={cn(
                "num text-[20px] font-light leading-none",
                accent ? "text-amber" : "text-text"
              )}
            >
              {car.roi}
            </div>
          </div>
          <div>
            <div className="font-sans font-light text-[8px] uppercase tracking-[0.18em] text-muted mb-1">
              Min. Investment
            </div>
            <div className="num text-[20px] font-light leading-none text-text">
              {minInvestment}
            </div>
          </div>
          <div>
            <div className="font-sans font-light text-[8px] uppercase tracking-[0.18em] text-muted mb-1">
              Timeline
            </div>
            <div className="num text-[20px] font-light leading-none text-text">
              {car.timeline}
            </div>
          </div>
        </div>

        {/* Funding bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-sans font-light text-[8.5px] uppercase tracking-[0.18em] text-muted">
              Funded
            </span>
            <span className="num text-[8.5px] text-text font-normal">
              {pct}% · {formatEurK(car.raised)} of {formatEurK(car.target)}
            </span>
          </div>
          <ProgressBar
            value={pct}
            variant={accent ? "amber" : "text"}
            ariaLabel={`${pct}% funded`}
          />
        </div>

        {/* CTAs */}
        <div className="flex gap-3 mt-auto">
          <Link href={detailHref} className="flex-1">
            <Button variant="primary" size="sm" className="w-full">
              View Investment
            </Button>
          </Link>
          <Link href="/contact" className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              Schedule Call
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
