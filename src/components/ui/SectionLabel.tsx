import { cn } from "@/lib/utils";

type SectionLabelVariant = "default" | "amber" | "dark";

interface SectionLabelProps {
  children: React.ReactNode;
  variant?: SectionLabelVariant;
  className?: string;
  lineWidth?: number;
}

/**
 * Section label pattern used throughout the site.
 *
 *   ──────  PRIVATE INVESTMENT PLATFORM
 *
 * A thin horizontal rule (28px by default) + uppercase text with
 * letter-spacing 0.3em.  Used before every section heading.
 */
export default function SectionLabel({
  children,
  variant = "default",
  className,
  lineWidth = 28,
}: SectionLabelProps) {
  const lineColor =
    variant === "amber"
      ? "bg-amber"
      : variant === "dark"
        ? "bg-white/20"
        : "bg-rule";

  const textColor =
    variant === "amber"
      ? "text-amber"
      : variant === "dark"
        ? "text-muted"
        : "text-muted";

  return (
    <div className={cn("flex items-center gap-[14px]", className)}>
      <div
        className={cn("h-px", lineColor)}
        style={{ width: `${lineWidth}px` }}
        aria-hidden="true"
      />
      <span
        className={cn(
          "font-sans font-normal text-[9.5px] uppercase tracking-[0.3em]",
          textColor
        )}
      >
        {children}
      </span>
    </div>
  );
}
