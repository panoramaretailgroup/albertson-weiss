import { cn } from "@/lib/utils";

type BadgeColor = "gold" | "green" | "red" | "gray" | "blue";

interface BadgeProps {
  color?: BadgeColor;
  children: React.ReactNode;
  className?: string;
}

const colorStyles: Record<BadgeColor, string> = {
  gold: "bg-gold/15 text-gold border-gold/30",
  green: "bg-green/15 text-green border-green/30",
  red: "bg-red-500/15 text-red-400 border-red-500/30",
  gray: "bg-gray-500/15 text-gray-400 border-gray-500/30",
  blue: "bg-blue-500/15 text-blue-400 border-blue-500/30",
};

export default function Badge({
  color = "gold",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        colorStyles[color],
        className ?? ""
      )}
    >
      {children}
    </span>
  );
}
