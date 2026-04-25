"use client";

import InvestmentCard, {
  type InvestmentCardData,
} from "@/components/ui/InvestmentCard";
import SectionLabel from "@/components/ui/SectionLabel";
import FadeIn from "@/components/public/FadeIn";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";

const MIN_INVESTMENT = "€1.000";

// Placeholder — will be replaced with Supabase query
const cars: InvestmentCardData[] = [
  {
    id: "jeep-wrangler-2025",
    name: "Wrangler Rubicon",
    make: "Jeep · 2025",
    roi: "25%",
    timeline: "3 meses",
    target: 47000,
    raised: 47000,
    status: "full",
    statusLabel: "Financiado",
    specs: [
      ["Año", "2025"],
      ["Km", "13.802"],
      ["Origen", "Oregon, US"],
    ],
    image: "/images/cars/jeep-wrangler-2025/showcase/front.jpg",
  },
  {
    id: "porsche-911-gt3",
    name: "911 GT3 Touring",
    make: "Porsche · 2023",
    roi: "18,4%",
    timeline: "7 meses",
    target: 185000,
    raised: 148000,
    status: "open",
    statusLabel: "Abierto",
    specs: [
      ["Año", "2023"],
      ["Km", "3.380"],
      ["Origen", "California, US"],
    ],
    image:
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Investments() {
  return (
    <section
      id="investments"
      className="bg-ivory py-[120px] px-6 sm:px-10 lg:px-[88px]"
    >
      <div className="mx-auto max-w-shell">
        <FadeIn>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
            <div>
              <SectionLabel className="mb-5">Cartera actual</SectionLabel>
              <h2 className="font-serif font-light text-[40px] sm:text-[48px] lg:text-[56px] leading-[1.05] tracking-[-0.01em] text-text">
                Inversiones
                <br />
                <em className="italic">seleccionadas</em>
              </h2>
            </div>
            <Link
              href={ROUTES.oportunidades}
              className="inline-flex items-center gap-[10px] font-sans font-normal text-[10px] uppercase tracking-[0.2em] text-muted border-b border-rule pb-1 hover:text-text hover:border-text transition-colors"
            >
              Ver todos los vehículos
              <svg
                width="16"
                height="10"
                viewBox="0 0 16 10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0 5h14M10 1l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="0.8"
                />
              </svg>
            </Link>
          </div>
        </FadeIn>

        {cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {cars.map((car, i) => (
              <FadeIn key={car.id} delay={i * 0.15}>
                <InvestmentCard
                  car={car}
                  minInvestment={MIN_INVESTMENT}
                  href={`${ROUTES.oportunidades}/${car.id}`}
                />
              </FadeIn>
            ))}
          </div>
        ) : (
          <FadeIn>
            <div className="text-center py-20 border border-rule">
              <p className="font-sans font-light text-[14px] text-muted">
                No hay inversiones abiertas en este momento.
              </p>
              <p className="mt-2 font-sans font-light text-[12px] text-muted/70">
                Déjanos tu email y te avisaremos cuando abramos una nueva
                oportunidad.
              </p>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
