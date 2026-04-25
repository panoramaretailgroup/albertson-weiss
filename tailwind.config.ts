import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Brand palette ──────────────────────────────────────────
        black: "#0d0c0a",
        ivory: {
          DEFAULT: "#f3efe8",
          deep: "#ede9e1",
        },
        text: "#1a1612",
        muted: "#8a8480",
        mutedDk: "#4a4540",
        rule: "#c8c0b4",
        amber: "#c4a26a",
        white: "#f5f1ea",

        // ── Status semantic colors ────────────────────────────────
        green: "#1d9e75",
        status: {
          open: "#4a9e6e",
          full: "#888888",
          soon: "#c4a26a",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-raleway)", "system-ui", "sans-serif"],
        num: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        shell: "1440px",
      },
      letterSpacing: {
        "label": "0.3em",
        "label-tight": "0.24em",
        "label-wide": "0.42em",
      },
      boxShadow: {
        card: "0 8px 40px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
