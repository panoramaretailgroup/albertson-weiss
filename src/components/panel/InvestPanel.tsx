"use client";

import { cn, formatCurrency } from "@/lib/utils";
import type { Car } from "@/lib/types";
import { useMemo, useState } from "react";

interface Props {
  car: Car;
  /** Optional: number of backers shown in the panel. */
  investorsCount?: number;
  /** Optional: days left until round closes. */
  daysRemaining?: number;
}

const QUICK_AMOUNTS = [1000, 5000, 10000, 25000];
const MIN_AMOUNT = 1000;

export default function InvestPanel({
  car,
  investorsCount = 47,
  daysRemaining = 18,
}: Props) {
  const targetEur = car.investment_needed_eur;
  const collectedEur = car.investment_collected_eur;
  const pct = Math.min(
    Math.round((collectedEur / Math.max(targetEur, 1)) * 100),
    100
  );

  const [amount, setAmount] = useState<number>(MIN_AMOUNT);

  const isOpen = car.status === "open";
  const isFunded = car.status === "funded" || pct >= 100;

  const title = isFunded
    ? "Totalmente financiado"
    : isOpen
      ? "Actualmente abierta"
      : "Próximamente";

  const { shareOfVehicle, projReturn, profit } = useMemo(() => {
    const share = targetEur > 0 ? (amount / targetEur) * 100 : 0;
    const ret = (amount * (100 + car.estimated_return_pct)) / 100;
    return {
      shareOfVehicle: share,
      projReturn: ret,
      profit: ret - amount,
    };
  }, [amount, targetEur, car.estimated_return_pct]);

  const disabled = !isOpen || isFunded;

  return (
    <>
      {/* Main invest panel — dark */}
      <div className="bg-black text-white p-9">
        {/* Eyebrow */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-7 h-px bg-white/20" aria-hidden="true" />
          <span className="font-sans text-[9.5px] uppercase tracking-[0.3em] text-white/50 font-normal">
            Inversión
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif font-light text-[32px] text-white tracking-[-0.01em] leading-[1.1] mb-8">
          {title}
        </h3>

        {/* Funding bar */}
        <div>
          <div className="flex justify-between items-baseline mb-2.5">
            <span className="num text-[28px] font-light text-white leading-none">
              {formatCurrency(collectedEur)}
            </span>
            <span className="font-sans text-[9px] uppercase tracking-[0.22em] text-white/50">
              de {formatCurrency(targetEur)} · {pct}%
            </span>
          </div>
          <div className="h-[3px] bg-white/10 overflow-hidden">
            <div
              className="h-full bg-amber transition-[width] duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between mt-3">
            <span className="num text-[9px] text-white font-normal tracking-[0.08em]">
              {investorsCount} inversores
            </span>
            <span className="num text-[9px] text-white font-normal tracking-[0.08em]">
              {daysRemaining} días restantes
            </span>
          </div>
        </div>

        {/* Amount input */}
        <div className="pt-7 border-t border-white/10 mt-9">
          <label
            htmlFor="invest-amount"
            className="block font-sans text-[9px] uppercase tracking-[0.24em] text-white/50 mb-3.5"
          >
            Tu inversión
          </label>

          <div className="flex items-baseline gap-2 border-b border-white/20 pb-2.5 mb-4">
            <span className="num text-[24px] text-white/50 font-light">€</span>
            <input
              id="invest-amount"
              type="number"
              min={MIN_AMOUNT}
              step={500}
              value={amount}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10);
                setAmount(Number.isFinite(v) ? v : 0);
              }}
              disabled={disabled}
              className="num text-[32px] text-white font-light bg-transparent border-none outline-none w-full p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50"
            />
          </div>

          {/* Quick amounts */}
          <div className="flex gap-1.5 mb-5">
            {QUICK_AMOUNTS.map((q) => {
              const selected = amount === q;
              const label =
                q >= 1000 ? `€${Math.round(q / 1000)}k` : `€${q}`;
              return (
                <button
                  key={q}
                  type="button"
                  onClick={() => setAmount(q)}
                  disabled={disabled}
                  className={cn(
                    "num text-[10px] px-0 py-2 flex-1 text-center border cursor-pointer font-normal tracking-[0.04em] transition-colors",
                    selected
                      ? "bg-amber border-amber text-black"
                      : "bg-transparent border-white/20 text-white/50 hover:border-white/50 hover:text-white",
                    disabled && "opacity-40 cursor-not-allowed"
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projection */}
        <div className="py-4 border-y border-white/[0.06] mb-6">
          <Row
            label="Participación"
            value={`${shareOfVehicle.toFixed(2).replace(".", ",")}%`}
          />
          <Row
            label="Retorno proyectado"
            value={formatCurrency(Math.round(projReturn))}
          />
          <Row
            label="Beneficio estimado"
            value={`+${formatCurrency(Math.round(profit))}`}
            accent
          />
        </div>

        {/* Primary CTA */}
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "w-full font-sans text-[10px] uppercase tracking-[0.28em] font-normal py-4 border-none cursor-pointer transition-opacity",
            disabled
              ? "bg-white/[0.08] text-white/50 cursor-not-allowed"
              : "bg-amber text-black hover:opacity-85"
          )}
        >
          {isFunded ? "Ronda cerrada" : "Invertir ahora"}
        </button>

        {/* Secondary CTA */}
        <button
          type="button"
          className="w-full mt-3 bg-transparent text-white border border-white/25 font-sans text-[10px] uppercase tracking-[0.26em] font-normal py-3.5 hover:bg-white hover:text-black transition-all"
        >
          Agendar llamada
        </button>

        {/* Footer */}
        <div className="flex items-center gap-2.5 pt-5 mt-5 border-t border-white/[0.08]">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="shrink-0 text-white/40"
            aria-hidden="true"
          >
            <path
              d="M6 1l4.5 1.8V6c0 2.8-2 4.5-4.5 5.2C3.5 10.5 1.5 8.8 1.5 6V2.8L6 1z"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
          </svg>
          <p className="font-sans text-[9px] text-white/50 font-light tracking-[0.12em] leading-[1.8]">
            Protegido por escrow. Fondos custodiados por Hauck Aufhäuser,
            Luxemburgo.
          </p>
        </div>
      </div>

      {/* Analyst call block */}
      <div className="bg-[#f8f5ef] border border-rule border-t-0 px-9 py-7">
        <h4 className="font-serif font-light text-[18px] text-text mb-1.5">
          Hablar con un analista
        </h4>
        <p className="font-sans text-[11px] text-muted font-light leading-[1.75] tracking-[0.02em] mb-4">
          Te explicamos la estructura del acuerdo, el perfil de riesgo y los
          plazos estimados.
        </p>
        <a
          href="#agendar"
          className="font-sans text-[10px] uppercase tracking-[0.24em] text-text font-normal border-b border-text pb-[3px] inline-flex items-center gap-2 hover:text-amber hover:border-amber transition-colors"
        >
          Reservar 20 min · Gratis
          <svg width="10" height="6" viewBox="0 0 16 10" fill="none">
            <path
              d="M0 5h14M10 1l4 4-4 4"
              stroke="currentColor"
              strokeWidth="0.8"
            />
          </svg>
        </a>
      </div>
    </>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex justify-between py-1.5 items-baseline">
      <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-white/50 font-light">
        {label}
      </span>
      <span
        className={cn(
          "num text-[12px] font-normal",
          accent ? "text-amber" : "text-white"
        )}
      >
        {value}
      </span>
    </div>
  );
}
