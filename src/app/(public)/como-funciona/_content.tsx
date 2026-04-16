"use client";

import PageHero from "@/components/public/PageHero";
import FadeIn from "@/components/public/FadeIn";
import Accordion from "@/components/ui/Accordion";
import { ROUTES } from "@/lib/constants";
import {
  Search,
  FileText,
  PenLine,
  Ship,
  ShoppingCart,
  Banknote,
} from "lucide-react";
import Link from "next/link";

const steps = [
  {
    icon: Search,
    title: "Análisis y selección",
    description:
      "Monitorizamos subastas de USA (Copart, IAAI, Manheim) buscando vehículos premium con alta demanda en Europa y margen de beneficio atractivo. Analizamos el historial del vehículo, su estado mecánico y el potencial de revalorización en el mercado europeo.",
  },
  {
    icon: FileText,
    title: "Publicación de oportunidad",
    description:
      "Presentamos el vehículo en la plataforma con toda la información: marca, modelo, especificaciones técnicas, inversión necesaria, rentabilidad estimada y plazo previsto. Cada oportunidad incluye fotos, informe de estado y análisis financiero detallado.",
  },
  {
    icon: PenLine,
    title: "Formalización del contrato",
    description:
      "Formalizas un contrato de préstamo privado bilateral regulado por la legislación española. Tu capital financia la adquisición del vehículo. El contrato detalla el importe, la rentabilidad pactada, el plazo estimado y las condiciones de devolución.",
  },
  {
    icon: Ship,
    title: "Compra e importación",
    description:
      "Adquirimos el vehículo, gestionamos el transporte marítimo desde USA hasta Europa, y la homologación necesaria. Sigues todo en tu panel en tiempo real: desde la compra en subasta hasta la llegada al puerto europeo, pasando por cada fase logística.",
  },
  {
    icon: ShoppingCart,
    title: "Venta del vehículo",
    description:
      "Vendemos el vehículo en el mercado europeo a través de nuestra red de contactos y canales especializados. Nuestra experiencia en el mercado de vehículos premium nos permite optimizar el precio de venta y los tiempos de comercialización.",
  },
  {
    icon: Banknote,
    title: "Cobro de rentabilidad",
    description:
      "Recuperas tu inversión inicial más la rentabilidad pactada (25% anualizado). Transferencia directa a tu cuenta bancaria. Todo documentado y transparente.",
  },
];

const quickFaq = [
  {
    question: "¿Cuál es la inversión mínima?",
    answer:
      "La inversión mínima varía según la operación, pero generalmente se sitúa entre 5.000€ y 10.000€. Cada oportunidad especifica el importe total necesario y puedes participar en la cantidad que desees dentro de ese rango.",
  },
  {
    question: "¿Qué pasa si el coche no se vende?",
    answer:
      "En nuestra experiencia, todos los vehículos se han vendido. Trabajamos con vehículos de alta demanda en Europa. En el caso hipotético de que se retrase la venta, el contrato contempla esta situación y tu capital sigue protegido por el valor del activo (el propio vehículo).",
  },
  {
    question: "¿Cuánto tarda una operación completa?",
    answer:
      "Una operación típica dura entre 60 y 120 días, desde la compra en subasta hasta la venta final en Europa. Esto incluye el transporte marítimo (30-45 días), la homologación y la venta. Cada oportunidad indica la duración estimada.",
  },
  {
    question: "¿Es legal?",
    answer:
      "Absolutamente. Las operaciones se formalizan mediante contratos de préstamo privado bilateral, regulados por el Código Civil español (artículos 1740 a 1757). Cada contrato incluye todas las cláusulas legales necesarias para proteger a ambas partes.",
  },
];

export default function ComoFuncionaContent() {
  return (
    <main>
      <PageHero
        title="Cómo"
        highlight="funciona"
        subtitle="Un proceso transparente de principio a fin. Desde la selección del vehículo hasta el cobro de tu rentabilidad."
      />

      {/* Timeline */}
      <section className="pb-32">
        <div className="mx-auto max-w-3xl px-6">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent sm:left-8" />

            <div className="space-y-12">
              {steps.map((step, index) => (
                <FadeIn key={step.title} delay={index * 0.08}>
                  <div className="relative flex gap-6 sm:gap-8">
                    {/* Node */}
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-black sm:h-16 sm:w-16">
                      <step.icon
                        className="h-5 w-5 text-gold sm:h-6 sm:w-6"
                        strokeWidth={1.5}
                      />
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-black sm:h-6 sm:w-6 sm:text-xs">
                        {index + 1}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="pb-2 pt-1">
                      <h3 className="text-lg font-semibold text-cream sm:text-xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-cream/50 sm:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick FAQ */}
      <section className="border-t border-gold/10 py-24">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn className="text-center">
            <h2 className="font-serif text-3xl font-light text-cream sm:text-4xl">
              Preguntas <span className="text-gold">frecuentes</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-12">
              <Accordion items={quickFaq} variant="dark" />
            </div>
          </FadeIn>

          <FadeIn delay={0.3} className="mt-12 text-center">
            <Link
              href={ROUTES.faq}
              className="inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-gold/80"
            >
              Ver todas las preguntas frecuentes
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
