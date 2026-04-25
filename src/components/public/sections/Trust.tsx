"use client";

import { motion, useInView } from "framer-motion";
import { Shield, Eye, BarChart3, Ban, type LucideIcon } from "lucide-react";
import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";

interface TrustCardData {
  icon: LucideIcon;
  title: string;
  description: string;
}

const cards: TrustCardData[] = [
  {
    icon: Shield,
    title: "Contratos legales",
    description:
      "Préstamo privado bilateral regulado por ley española. Seguridad jurídica total para tu inversión.",
  },
  {
    icon: Eye,
    title: "Transparencia total",
    description:
      "Sigue cada operación en tiempo real: desde la subasta en EE.UU. hasta la venta final en Europa.",
  },
  {
    icon: BarChart3,
    title: "Track record verificable",
    description:
      "Historial completo de operaciones pasadas con cifras reales y resultados auditables.",
  },
  {
    icon: Ban,
    title: "Sin sorpresas",
    description:
      "Rentabilidad fija pactada por contrato. Sin comisiones ocultas ni letra pequeña.",
  },
];

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export default function Trust() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="bg-black py-[120px] px-6 sm:px-10 lg:px-[88px]"
    >
      <div className="mx-auto max-w-shell">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-20"
        >
          <div className="flex justify-center mb-5">
            <SectionLabel variant="dark">Confianza</SectionLabel>
          </div>
          <h2 className="font-serif font-light text-[40px] sm:text-[48px] lg:text-[56px] leading-[1.05] tracking-[-0.01em] text-white">
            Por qué confiar en
            <br />
            <em className="italic text-amber">Albertson &amp; Weiss</em>
          </h2>
        </motion.div>

        {/* 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
          {cards.map((card, i) => (
            <TrustCard
              key={card.title}
              card={card}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustCard({
  card,
  index,
  inView,
}: {
  card: TrustCardData;
  index: number;
  inView: boolean;
}) {
  const Icon = card.icon;
  const cardDelay = 0.15 + index * 0.1;
  const iconDelay = cardDelay + 0.2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: cardDelay, ease: EASE }}
      className="group p-10 bg-white/[0.03] border border-white/[0.06] transition-colors duration-300 hover:bg-white/[0.05]"
    >
      {/* Icon container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          inView
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.8 }
        }
        transition={{ duration: 0.5, delay: iconDelay, ease: "easeOut" }}
        className="inline-flex h-14 w-14 items-center justify-center bg-amber/10"
      >
        <Icon
          className="h-8 w-8 text-amber"
          strokeWidth={1.25}
          aria-hidden={true}
        />
      </motion.div>

      {/* Title */}
      <h3 className="mt-6 font-sans font-medium text-[16px] leading-tight text-white">
        {card.title}
      </h3>

      {/* Description */}
      <p className="mt-3 font-sans font-light text-[13px] leading-[1.85] text-muted">
        {card.description}
      </p>
    </motion.div>
  );
}
