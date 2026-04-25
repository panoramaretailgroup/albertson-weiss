"use client";

import { cn } from "@/lib/utils";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Fragment, useRef } from "react";
import { useCountAnimation } from "@/hooks/useCountAnimation";

interface Stat {
  /** Numeric target for counter animation */
  targetValue?: number;
  /** Static display when not a simple number (e.g. "6–9") */
  staticValue?: string;
  prefix?: string;
  suffix?: string;
  label: string;
}

const stats: Stat[] = [
  { targetValue: 340, suffix: "+", label: "Vehículos importados" },
  { targetValue: 25, suffix: "%", label: "Rentabilidad media" },
  { staticValue: "6–9", suffix: " meses", label: "Período medio" },
  { staticValue: "€2M", suffix: "+", label: "Capital desplegado" },
];

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      ref={ref}
      className="bg-black py-12 px-6 sm:px-10 lg:px-[88px]"
    >
      <div className="mx-auto max-w-shell flex flex-wrap items-center justify-center gap-y-8">
        {stats.map((stat, i) => (
          <Fragment key={stat.label}>
            {i > 0 && (
              <div
                className="hidden sm:block self-stretch w-px bg-white/[0.08] mx-8 md:mx-14"
                aria-hidden="true"
              />
            )}
            <StatCell
              stat={stat}
              index={i}
              trigger={inView}
              reduceMotion={reduceMotion}
              className={cn(
                i > 0 && "sm:ml-0",
                "w-1/2 sm:w-auto text-center sm:text-left"
              )}
            />
          </Fragment>
        ))}
      </div>
    </section>
  );
}

function StatCell({
  stat,
  index,
  trigger,
  reduceMotion,
  className,
}: {
  stat: Stat;
  index: number;
  trigger: boolean;
  reduceMotion: boolean;
  className?: string;
}) {
  const animatedValue = useCountAnimation(stat.targetValue ?? 0, {
    trigger: trigger && stat.targetValue !== undefined,
    duration: 2000,
    delay: index * 150,
    reduceMotion,
  });

  const display =
    stat.targetValue !== undefined
      ? `${stat.prefix ?? ""}${Math.round(animatedValue)}${stat.suffix ?? ""}`
      : `${stat.prefix ?? ""}${stat.staticValue ?? ""}${stat.suffix ?? ""}`;

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      animate={
        trigger
          ? { opacity: 1, y: 0 }
          : reduceMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 15 }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.5, delay: (index * 150) / 1000 }
      }
      className={className}
    >
      <div className="num font-light text-[28px] tracking-[0.01em] text-white leading-none tabular-nums">
        {display}
      </div>
      <div className="font-sans font-light text-[8.5px] uppercase tracking-[0.22em] text-muted mt-[5px]">
        {stat.label}
      </div>
    </motion.div>
  );
}
