"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant =
  | "primary"
  | "outline"
  | "amber"
  | "ghost"
  | "outline-dark"
  // Legacy aliases kept during redesign migration
  | "secondary"
  | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

// Sharp-cornered, uppercase, Raleway. NO border-radius.
const base =
  "inline-flex items-center justify-center font-sans uppercase font-normal transition-all duration-200 disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  // Dark text bg + ivory text (for light backgrounds)
  primary: "bg-text text-ivory hover:opacity-85",
  // Transparent with muted text, becomes text color on hover
  outline:
    "border border-rule text-muted bg-transparent hover:border-text hover:text-text",
  // For dark backgrounds: white text outline
  "outline-dark":
    "border border-white/30 text-white bg-transparent hover:bg-white hover:text-black",
  // Amber accent CTA
  amber: "bg-amber text-black hover:opacity-85",
  // No chrome — text link style
  ghost: "text-muted hover:text-text bg-transparent",
  // Legacy: maps to outline
  secondary:
    "border border-rule text-muted bg-transparent hover:border-text hover:text-text",
  // Legacy: red destructive button
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-[9.5px] tracking-[0.22em] px-6 py-3",
  md: "text-[10px] tracking-[0.26em] px-10 py-[15px]",
  lg: "text-[10px] tracking-[0.26em] px-12 py-4",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          base,
          variantStyles[variant],
          sizeStyles[size],
          className ?? ""
        )}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-3 w-3 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
