"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

interface TrustCardData {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ICON_PROPS = {
  className: "w-10 h-10 text-amber",
  viewBox: "0 0 40 40",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const ShieldCheckIcon = () => (
  <svg {...ICON_PROPS} strokeWidth="1">
    <path d="M20 4 L33 8 V20 C33 28 27 34 20 36 C13 34 7 28 7 20 V8 Z" />
    <path d="M13.5 20 L18 24.5 L26.5 16" strokeWidth="1" />
  </svg>
);

const EyeIcon = () => (
  <svg {...ICON_PROPS} strokeWidth="1">
    <path d="M2 20 C7.5 11 13.5 6.5 20 6.5 C26.5 6.5 32.5 11 38 20 C32.5 29 26.5 33.5 20 33.5 C13.5 33.5 7.5 29 2 20 Z" />
    <circle cx="20" cy="20" r="5" />
    <circle cx="20" cy="20" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const TrendBarsIcon = () => (
  <svg {...ICON_PROPS} strokeWidth="1">
    <path d="M5 35 V5" />
    <path d="M5 35 H37" />
    <rect x="10" y="26" width="4" height="9" />
    <rect x="18" y="20" width="4" height="15" />
    <rect x="26" y="13" width="4" height="22" />
    <path d="M12 23 L20 17 L28 11 L34 6" strokeWidth="0.9" />
    <path d="M30 6 L34 6 L34 10" strokeWidth="0.9" />
  </svg>
);

const OpenLockIcon = () => (
  <svg {...ICON_PROPS} strokeWidth="1">
    <rect x="8" y="18" width="24" height="18" />
    <path d="M13 18 V12 C13 7 16.5 4 20 4 C23.5 4 27 7 27 11" />
    <path d="M20 25 V30" />
  </svg>
);

const cards: TrustCardData[] = [
  {
    icon: <ShieldCheckIcon />,
    title: "Contratos legales",
    description:
      "Préstamo privado bilateral regulado por ley española. Seguridad jurídica total para tu inversión.",
  },
  {
    icon: <EyeIcon />,
    title: "Transparencia total",
    description:
      "Sigue cada operación en tiempo real: desde la subasta en EE.UU. hasta la venta final en Europa.",
  },
  {
    icon: <TrendBarsIcon />,
    title: "Track record verificable",
    description:
      "Historial completo de operaciones pasadas con cifras reales y resultados auditables.",
  },
  {
    icon: <OpenLockIcon />,
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
          className="text-center mb-24"
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

        {/* 4-column row on lg, 2 on sm-md, 1 stacked on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 sm:gap-12 lg:gap-0">
          {cards.map((card, i) => (
            <TrustCard
              key={card.title}
              card={card}
              index={i}
              isLast={i === cards.length - 1}
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
  isLast,
  inView,
}: {
  card: TrustCardData;
  index: number;
  isLast: boolean;
  inView: boolean;
}) {
  const cardDelay = 0.15 + index * 0.1;
  const iconDelay = cardDelay + 0.2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: cardDelay, ease: EASE }}
      className={cn(
        "relative px-0 sm:px-10 lg:px-10 py-2",
        // Mobile-only horizontal divider between stacked cards
        !isLast &&
          "pb-10 mb-10 border-b border-white/10 sm:pb-2 sm:mb-0 sm:border-b-0"
      )}
    >
      {/* Vertical divider — lg only, not on first card */}
      {index > 0 && (
        <div
          className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-white/10"
          aria-hidden="true"
        />
      )}

      {/* Icon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: iconDelay, ease: "easeOut" }}
        className="mb-8"
      >
        {card.icon}
      </motion.div>

      {/* Order number */}
      <div className="num text-[11px] text-white/20 font-light tracking-[0.15em] mb-4">
        0{index + 1}
      </div>

      {/* Title */}
      <h3 className="font-serif font-light text-[20px] leading-tight text-white mb-4">
        {card.title}
      </h3>

      {/* Description */}
      <p className="font-sans font-light text-[12.5px] leading-[1.9] text-white/50">
        {card.description}
      </p>
    </motion.div>
  );
}
