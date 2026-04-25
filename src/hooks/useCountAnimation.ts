"use client";

import { useEffect, useState } from "react";

interface UseCountAnimationOptions {
  trigger: boolean;
  duration?: number;
  delay?: number;
  reduceMotion?: boolean;
}

/**
 * Animated counter from 0 to targetValue using requestAnimationFrame.
 * Uses ease-out quad: 1 - (1 - t)^2 (fast start, smooth deceleration).
 */
export function useCountAnimation(
  targetValue: number,
  options: UseCountAnimationOptions
): number {
  const { trigger, duration = 2000, delay = 0, reduceMotion = false } = options;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    if (reduceMotion) {
      setValue(targetValue);
      return;
    }

    let rafId = 0;
    let startTime: number | null = null;

    const step = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setValue(eased * targetValue);

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    const timeoutId = window.setTimeout(() => {
      rafId = requestAnimationFrame(step);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [targetValue, duration, delay, trigger, reduceMotion]);

  return value;
}

/**
 * Format a number with Spanish thousand separators.
 * Returns a string like "1.234" for 1234, or "500" for 500.
 */
export function formatCount(value: number): string {
  return new Intl.NumberFormat("es-ES").format(Math.round(value));
}
