"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background with real showroom image */}
      <div className="absolute inset-0">
        <Image
          src="/images/brand/showroom-hero.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {/* Tagline */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-xs font-medium tracking-wider text-gold uppercase">
              Oportunidades abiertas
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="font-serif text-5xl font-light leading-[1.1] text-cream sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Invierte en vehículos{" "}
          <span className="text-gold">premium</span>{" "}
          americanos
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-cream/60 sm:text-xl"
        >
          Adquirimos coches en subastas de EE.UU., los importamos y los vendemos
          en Europa. Tú financias la operación. Tú recibes un{" "}
          <span className="font-semibold text-green">25% de rentabilidad</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.45,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href={ROUTES.oportunidades}
            className="rounded-lg bg-gold px-8 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-[#b8983f]"
          >
            Ver oportunidades actuales
          </Link>
          <Link
            href={ROUTES.comoFunciona}
            className="rounded-lg border border-gold/50 px-8 py-3.5 text-sm font-medium text-gold transition-colors hover:border-gold hover:bg-gold/10"
          >
            Cómo funciona
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-cream/30" />
        </motion.div>
      </motion.div>

      {/* Side decorative lines */}
      <div className="absolute left-8 top-1/2 hidden -translate-y-1/2 lg:block">
        <div className="h-24 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
      </div>
      <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 lg:block">
        <div className="h-24 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
      </div>
    </section>
  );
}
