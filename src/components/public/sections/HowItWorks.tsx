"use client";

import { cn } from "@/lib/utils";
import FadeIn from "@/components/public/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";

const MIN_INVESTMENT = "€1.000";

const steps = [
  {
    n: "01",
    title: "Explora la colección",
    body: "Accede a nuestro inventario exclusivo de vehículos pre-seleccionados. Cada listado incluye el historial completo del vehículo, el precio de compra en EE.UU., los costes de importación y el precio de venta estimado en Europa.",
  },
  {
    n: "02",
    title: "Invierte y sigue el proceso",
    body: `Invierte desde ${MIN_INVESTMENT} por vehículo a través de tu cuenta de inversor. Monitoriza cada fase en tiempo real — desde la importación y preparación hasta la colocación en showroom y la venta final.`,
  },
  {
    n: "03",
    title: "Recibe tu rentabilidad",
    body: "Cuando el vehículo se vende, tu parte proporcional del beneficio se transfiere directamente a tu cuenta — normalmente entre 6 y 9 meses después de la inversión.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="bg-ivory-deep py-[120px] px-6 sm:px-10 lg:px-[88px]"
    >
      <div className="mx-auto max-w-shell">
        <FadeIn>
          <SectionLabel className="mb-5">El proceso</SectionLabel>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-serif font-light text-[40px] sm:text-[48px] lg:text-[56px] leading-[1.05] tracking-[-0.01em] text-text mb-20">
            Cómo
            <br />
            <em className="italic">funciona</em>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-0">
          {steps.map((step, i) => (
            <FadeIn key={step.n} delay={i * 0.15}>
              <div
                className={cn(
                  "h-full",
                  i < 2 && "lg:pr-[60px] lg:border-r lg:border-rule",
                  i > 0 && "lg:pl-[60px]"
                )}
              >
                <div className="font-serif font-light text-[64px] leading-none text-rule mb-7">
                  {step.n}
                </div>
                <h3 className="font-serif font-light text-[28px] leading-[1.2] text-text mb-5">
                  {step.title}
                </h3>
                <div
                  className="w-8 h-px bg-rule mb-5"
                  aria-hidden="true"
                />
                <p className="font-sans font-light text-[13px] leading-[1.85] tracking-[0.02em] text-muted">
                  {step.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
