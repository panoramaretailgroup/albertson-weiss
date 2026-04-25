"use client";

import { useEffect, useRef } from "react";

/**
 * "Sticky scroll-through" hook — the pattern used by Facebook/Twitter sidebars.
 *
 * The element is sticky-positioned; its `top` is adjusted on page scroll so
 * that a sidebar taller than the viewport reveals its lower content as you
 * scroll down (anchoring its bottom to the viewport bottom), and reveals its
 * upper content as you scroll back up (anchoring its top to `navHeight`).
 *
 * When the sidebar fits entirely inside the viewport, it simply stays pinned
 * at `top: navHeight`.
 */
export function useStickyScroll<T extends HTMLElement = HTMLElement>(
  navHeight = 72
) {
  const ref = useRef<T>(null);
  const state = useRef({ lastY: 0, top: navHeight });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.position = "sticky";
    el.style.top = `${navHeight}px`;
    state.current.lastY = window.scrollY;
    state.current.top = navHeight;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - state.current.lastY;
      const vh = window.innerHeight;
      const sh = el.offsetHeight;

      if (sh <= vh - navHeight) {
        // Sidebar fits in the viewport → just pin it below the nav.
        state.current.top = navHeight;
      } else {
        const minTop = -(sh - vh); // fully scrolled: bottom aligned to viewport bottom
        const maxTop = navHeight; // fully reversed: top pinned below nav

        state.current.top -= delta;
        state.current.top = Math.max(
          minTop,
          Math.min(maxTop, state.current.top)
        );
      }

      el.style.top = `${state.current.top}px`;
      state.current.lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [navHeight]);

  return ref;
}
