"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "dark" | "light";
}

export default function Card({
  variant = "light",
  className,
  onClick,
  children,
  ...props
}: CardProps) {
  const isDark = variant === "dark";
  const isClickable = !!onClick;

  return (
    <div
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
              }
            }
          : undefined
      }
      className={cn(
        "rounded-xl p-6 transition-all",
        isDark
          ? "border border-gold/20 bg-white/5 backdrop-blur-sm"
          : "border border-gray-200 bg-white shadow-sm",
        isClickable &&
          (isDark
            ? "cursor-pointer hover:border-gold/40 hover:bg-white/10"
            : "cursor-pointer hover:shadow-md hover:border-gray-300"),
        className ?? ""
      )}
      {...props}
    >
      {children}
    </div>
  );
}
