"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  highlight?: string;
  subtitle?: string;
}

export default function PageHero({ title, highlight, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40">
      {/* Decorative background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.03] to-transparent" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          <div className="h-[300px] w-[600px] rounded-full bg-gold/[0.03] blur-[100px]" />
        </div>
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="font-serif text-4xl font-light text-cream sm:text-5xl lg:text-6xl"
        >
          {title}{" "}
          {highlight && <span className="text-gold">{highlight}</span>}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="mx-auto mt-6 max-w-2xl text-lg text-cream/50"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
