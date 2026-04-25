"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import { ROUTES } from "@/lib/constants";

const MIN_INVESTMENT = "€1.000";
const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  // When reduced motion is preferred, skip entry + ambient animations
  const enterInitial = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 30 };
  const enterAnimate = { opacity: 1, y: 0 };

  const staticTransition = { duration: 0 };
  const makeTransition = (delay: number, duration = 0.8) =>
    prefersReducedMotion
      ? staticTransition
      : { duration, delay, ease: EASE };

  return (
    <section className="relative flex items-stretch min-h-screen overflow-hidden bg-ivory pt-[72px]">
      {/* LEFT — text */}
      <div className="relative z-[2] flex-shrink-0 flex flex-col justify-center px-6 py-20 lg:basis-[620px] lg:pl-[88px] lg:pr-0">
        <motion.div
          initial={enterInitial}
          animate={enterAnimate}
          transition={makeTransition(0)}
          className="mb-12"
          style={{ willChange: "transform, opacity" }}
        >
          <SectionLabel lineWidth={30}>
            Plataforma privada de inversión
          </SectionLabel>
        </motion.div>

        <motion.h1
          initial={enterInitial}
          animate={enterAnimate}
          transition={makeTransition(0.2)}
          className="font-serif font-light text-[48px] sm:text-[64px] lg:text-[80px] leading-[1] tracking-[-0.015em] text-text mb-9"
          style={{ willChange: "transform, opacity" }}
        >
          Donde el capital
          <br />
          <em className="italic">encuentra su camino</em>
        </motion.h1>

        <motion.div
          initial={enterInitial}
          animate={enterAnimate}
          transition={makeTransition(0.4)}
          className="w-[44px] h-px bg-rule mb-7"
          aria-hidden="true"
          style={{ willChange: "transform, opacity" }}
        />

        <motion.p
          initial={enterInitial}
          animate={enterAnimate}
          transition={makeTransition(0.6)}
          className="font-sans font-light text-[13.5px] leading-[1.85] tracking-[0.03em] text-muted max-w-[380px] mb-14"
          style={{ willChange: "transform, opacity" }}
        >
          Invierte en vehículos de lujo seleccionados a mano, importados desde
          el mercado estadounidense y vendidos en Europa — desde{" "}
          {MIN_INVESTMENT} por vehículo.
        </motion.p>

        <motion.div
          initial={enterInitial}
          animate={enterAnimate}
          transition={makeTransition(0.8)}
          className="flex flex-wrap gap-5 items-center"
          style={{ willChange: "transform, opacity" }}
        >
          <Link
            href="#investments"
            className="inline-flex items-center justify-center font-sans font-normal text-[10px] uppercase tracking-[0.26em] bg-text text-ivory px-10 py-[15px] transition-opacity duration-200 hover:opacity-85"
          >
            Ver inversiones
          </Link>
          <Link
            href="#how"
            className="inline-flex items-center gap-[10px] font-sans font-normal text-[10px] uppercase tracking-[0.24em] text-muted hover:text-text transition-colors"
          >
            Cómo funciona
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
        </motion.div>
      </div>

      {/* RIGHT — image (desktop only) */}
      <div className="relative flex-1 hidden lg:block">
        {/* Ken Burns — reduced motion: static */}
        <motion.div
          animate={
            prefersReducedMotion ? { scale: 1 } : { scale: [1, 1.04] }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }
          }
          className="relative h-full w-full"
          style={{ willChange: "transform" }}
        >
          <Image
            src="/images/brand/showroom-hero.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="60vw"
          />
        </motion.div>

        {/* Left-edge ivory fade (static, no animation) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "linear-gradient(to right, #f3efe8 0%, transparent 22%)",
          }}
          aria-hidden="true"
        />

        {/* Floating tag */}
        <motion.div
          initial={enterInitial}
          animate={enterAnimate}
          transition={makeTransition(1, 0.8)}
          className="absolute bottom-20 left-[60px] bg-black text-white"
          style={{ padding: "18px 28px", willChange: "transform, opacity" }}
        >
          <div className="font-sans text-[8px] uppercase tracking-[0.3em] text-muted mb-[10px]">
            Oportunidad abierta
          </div>
          <div className="font-serif font-light text-[20px] mb-1">
            Jeep Wrangler Rubicon 2025
          </div>
          <div className="flex gap-5 mt-[10px]">
            <div>
              <div className="font-sans text-[8px] uppercase tracking-[0.2em] text-muted mb-[3px]">
                Rentabilidad objetivo
              </div>
              <div className="num text-[22px] font-light text-amber leading-none">
                25%
              </div>
            </div>
            <div className="w-px bg-white/10" aria-hidden="true" />
            <div>
              <div className="font-sans text-[8px] uppercase tracking-[0.2em] text-muted mb-[3px]">
                Inversión mínima
              </div>
              <div className="num text-[22px] font-light text-white leading-none">
                {MIN_INVESTMENT}
              </div>
            </div>
          </div>
          <Link
            href={ROUTES.oportunidades}
            className="absolute inset-0"
            aria-label="Ver oportunidad actual"
          />
        </motion.div>
      </div>
    </section>
  );
}
