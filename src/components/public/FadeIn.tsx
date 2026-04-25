"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  /**
   * Distance to travel along the direction axis.
   * Default: 40 (y) for up/down, 40 (x) for left/right.
   */
  distance?: number;
}

function getOffset(direction: FadeInProps["direction"], distance = 40) {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
}

export default function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.6,
  distance,
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  // Skip animation entirely for reduced motion preference
  if (prefersReducedMotion) {
    return <div className={cn(className ?? "")}>{children}</div>;
  }

  const offset = getOffset(direction, distance);

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(className ?? "")}
    >
      {children}
    </motion.div>
  );
}
