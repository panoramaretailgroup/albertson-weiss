import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

/**
 * Albertson & Weiss Motors logo — pure typography, no image.
 *   ALBERTSON & WEISS  (Raleway 300, 11px, tracking 0.24em)
 *   ────── 68px 1px, opacity 0.55
 *   MOTORS (Raleway 400, 7px, tracking 0.42em, opacity 0.82)
 */
export default function Logo({ variant = "light", className }: LogoProps) {
  const isDark = variant === "dark";
  const textColor = isDark ? "text-white" : "text-text";
  const barColor = isDark ? "bg-white" : "bg-text";

  return (
    <div
      className={cn(
        "inline-flex flex-col items-center gap-[3px] select-none leading-none",
        className
      )}
    >
      <span
        className={cn(
          "font-sans font-light text-[11px] uppercase whitespace-nowrap tracking-[0.24em]",
          textColor
        )}
      >
        Albertson &amp; Weiss
      </span>
      <div
        className={cn("h-px w-[68px] opacity-55", barColor)}
        aria-hidden="true"
      />
      <span
        className={cn(
          "font-sans font-normal text-[7px] uppercase tracking-[0.42em] opacity-[0.82]",
          textColor
        )}
      >
        Motors
      </span>
    </div>
  );
}
