"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type CardVariant = "ivory" | "dark";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hoverable?: boolean;
}

/**
 * Generic container card.
 *   - ivory (default): bg-ivory, 1px rule border
 *   - dark: bg-black, subtle white/10 border
 *   - hoverable or onClick → box-shadow on hover
 *   - NO border-radius (sharp corners)
 */
export default function Card({
  variant = "ivory",
  hoverable = false,
  className,
  onClick,
  children,
  ...props
}: CardProps) {
  const isClickable = !!onClick || hoverable;
  const variantCls =
    variant === "dark"
      ? "bg-black text-white border border-white/10"
      : "bg-ivory text-text border border-rule";

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
              }
            }
          : undefined
      }
      className={cn(
        "transition-shadow duration-300",
        variantCls,
        isClickable && "cursor-pointer hover:shadow-card",
        className ?? ""
      )}
      {...props}
    >
      {children}
    </div>
  );
}
