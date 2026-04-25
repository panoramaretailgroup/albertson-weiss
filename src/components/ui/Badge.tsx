import { cn } from "@/lib/utils";

type BadgeVariant = "open" | "full" | "soon" | "neutral";

// Legacy color prop (kept for backward compat during redesign migration)
type LegacyColor = "gold" | "green" | "red" | "gray" | "blue";

interface BadgeProps {
  variant?: BadgeVariant;
  /** @deprecated use `variant` instead */
  color?: LegacyColor;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  open: "bg-status-open text-white",
  full: "bg-status-full text-white",
  soon: "bg-status-soon text-white",
  neutral: "bg-text text-ivory",
};

const legacyMap: Record<LegacyColor, BadgeVariant> = {
  gold: "soon",
  green: "open",
  red: "full",
  gray: "full",
  blue: "neutral",
};

export default function Badge({
  variant,
  color,
  children,
  className,
}: BadgeProps) {
  const resolvedVariant: BadgeVariant =
    variant ?? (color ? legacyMap[color] : "open");

  return (
    <span
      className={cn(
        "inline-block font-sans font-normal text-[8px] uppercase tracking-[0.25em] px-3 py-[5px]",
        variantStyles[resolvedVariant],
        className ?? ""
      )}
    >
      {children}
    </span>
  );
}
