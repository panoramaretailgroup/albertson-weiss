"use client";

import SectionLabel from "@/components/ui/SectionLabel";
import FadeIn from "@/components/public/FadeIn";
import Accordion from "@/components/ui/Accordion";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

const categories = [
  {
    name: "General",
    items: [
      {
        question: "¿Qué es Albertson & Weiss Motors?",
        answer:
          "Albertson & Weiss Motors es una plataforma de inversión en vehículos premium. Adquirimos coches en subastas americanas (Copart, IAAI, Manheim), los importamos a Europa y los vendemos obteniendo un beneficio. Los inversores financian la adquisición mediante contratos de préstamo privado y reciben una rentabilidad fija al completarse la operación.",
      },
      {
        question: "¿Cómo funciona la inversión?",
        answer:
          "El proceso es sencillo: seleccionamos un vehículo premium con alto potencial, publicamos la oportunidad en la plataforma, tú inviertes formalizando un contrato de préstamo privado, nosotros gestionamos toda la logística (compra, transporte, homologación, venta), y al venderse el vehículo recuperas tu inversión más la rentabilidad pactada (25% anualizado).",
      },
      {
        question: "¿Quién puede invertir?",
        answer:
          "Cualquier persona mayor de edad con residencia fiscal en España o en la Unión Europea puede invertir a través de nuestra plataforma. Necesitarás un documento de identidad válido y una cuenta bancaria a tu nombre.",
      },
    ],
  },
  {
    name: "Inversión",
    items: [
      {
        question: "¿Cuál es la inversión mínima?",
        answer:
          "La inversión mínima varía según la operación, pero generalmente se sitúa entre 5.000€ y 10.000€. Cada oportunidad publicada especifica el importe total necesario y la inversión mínima para participar.",
      },
      {
        question: "¿Qué rentabilidad puedo esperar?",
        answer:
          "La rentabilidad objetivo es del 25% anualizado por operación. Esto significa que en una operación típica de 90 días, la rentabilidad efectiva sería aproximadamente del 6,25% sobre el capital invertido. Las rentabilidades pasadas de nuestras operaciones están disponibles en la sección Track Record.",
      },
      {
        question: "¿Cómo recibo mi rentabilidad?",
        answer:
          "Al completarse la venta del vehículo, recibes una transferencia bancaria directa a tu cuenta con el importe de tu inversión inicial más la rentabilidad pactada. El proceso de liquidación suele completarse en un plazo de 5 a 10 días hábiles tras la venta.",
      },
      {
        question: "¿Puedo invertir en varios vehículos a la vez?",
        answer:
          "Sí, puedes diversificar tu inversión participando en varias operaciones simultáneamente. Cada inversión es independiente y se formaliza con su propio contrato.",
      },
    ],
  },
  {
    name: "Legal",
    items: [
      {
        question: "¿Qué tipo de contrato se firma?",
        answer:
          "Se firma un contrato de préstamo privado bilateral, regulado por los artículos 1740 a 1757 del Código Civil español. El contrato detalla: el importe del préstamo, la rentabilidad pactada, el plazo estimado, las condiciones de devolución y las garantías del activo (el propio vehículo).",
      },
      {
        question: "¿Está regulado legalmente?",
        answer:
          "Sí. Los contratos de préstamo privado entre particulares son completamente legales en España y están regulados por el Código Civil. Albertson & Weiss Motors no es una entidad financiera regulada, ya que no opera como tal: cada operación es un préstamo privado bilateral entre el inversor y la empresa.",
      },
      {
        question: "¿Mis datos están protegidos?",
        answer:
          "Absolutamente. Cumplimos con el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica de Protección de Datos (LOPD). Tus datos personales y financieros se almacenan de forma segura y cifrada.",
      },
    ],
  },
  {
    name: "Proceso",
    items: [
      {
        question: "¿Qué pasa si el vehículo tarda más en venderse?",
        answer:
          "En caso de que la venta se demore más allá del plazo estimado, tu inversión sigue protegida por el valor del activo (el propio vehículo). Te mantenemos informado en todo momento a través del panel y notificaciones. La rentabilidad se calcula en función del tiempo real de la operación.",
      },
      {
        question: "¿Qué pasa si no se vende?",
        answer:
          "En nuestra experiencia, el 100% de los vehículos se han vendido con éxito. Trabajamos exclusivamente con vehículos de alta demanda en Europa. En un escenario hipotético de no venta, el contrato contempla mecanismos de protección: el vehículo actúa como garantía del préstamo.",
      },
      {
        question: "¿Cómo puedo hacer seguimiento de mi inversión?",
        answer:
          "A través de tu panel de inversor puedes seguir en tiempo real cada fase de la operación: compra en subasta, transporte a almacén, carga en contenedor, tránsito marítimo, llegada a puerto europeo y venta. Cada fase incluye actualizaciones con fotos y documentación.",
      },
      {
        question: "¿Puedo invertir desde fuera de España?",
        answer:
          "Sí, aceptamos inversores con residencia fiscal en cualquier país de la Unión Europea. Los contratos se rigen por la legislación española independientemente de tu país de residencia. Contacta con nosotros para más detalles sobre tu caso particular.",
      },
    ],
  },
];

export default function FAQContent() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-ivory pt-40 pb-24 px-6 sm:px-10 lg:px-[88px]">
        <div className="mx-auto max-w-shell text-center">
          <FadeIn>
            <div className="flex justify-center mb-5">
              <SectionLabel>Soporte</SectionLabel>
            </div>
            <h1 className="font-serif font-light text-[48px] sm:text-[64px] lg:text-[76px] leading-[1.05] tracking-[-0.01em] text-text">
              Preguntas
              <br />
              <em className="italic text-amber">frecuentes</em>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl font-sans font-light text-[15px] leading-[1.85] text-muted">
              Todo lo que necesitas saber antes de invertir. Si no encuentras
              tu respuesta, contacta con nosotros.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-ivory pb-32 px-6 sm:px-10 lg:px-[88px]">
        <div className="mx-auto max-w-shell">
          {categories.map((category, catIndex) => (
            <FadeIn key={category.name} delay={catIndex * 0.08}>
              <div
                className={cn(
                  "grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-16",
                  catIndex > 0 && "pt-16 mt-16 border-t border-rule"
                )}
              >
                {/* Category name */}
                <div className="lg:pt-6">
                  <div className="flex items-center gap-3.5">
                    <div className="w-7 h-px bg-rule" aria-hidden="true" />
                    <span className="font-sans text-[9.5px] uppercase tracking-[0.3em] text-muted font-normal">
                      {category.name}
                    </span>
                  </div>
                </div>

                {/* Accordion */}
                <Accordion items={category.items} />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-24 px-6 sm:px-10 lg:px-[88px]">
        <div className="mx-auto max-w-xl text-center">
          <FadeIn>
            <h2 className="font-serif font-light text-[40px] sm:text-[48px] leading-[1.05] tracking-[-0.01em] text-white">
              ¿Tienes más <em className="italic text-amber">dudas</em>?
            </h2>
            <p className="mt-6 font-sans font-light text-[14px] leading-[1.85] text-white/50">
              Nuestro equipo está disponible para resolver todas tus preguntas
              antes de invertir.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={ROUTES.registro}
                className="bg-amber text-black font-sans text-[10px] uppercase tracking-[0.26em] font-normal px-9 py-4 hover:opacity-85 transition-opacity"
              >
                Contactar con el equipo
              </Link>
              <a
                href="mailto:info@albertsonweiss.com"
                className="border border-white/30 text-white/70 font-sans text-[10px] uppercase tracking-[0.26em] font-normal px-9 py-4 hover:border-white hover:text-white transition-colors"
              >
                info@albertsonweiss.com
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
