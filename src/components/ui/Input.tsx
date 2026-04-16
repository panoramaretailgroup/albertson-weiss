"use client";

import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type InputVariant = "dark" | "light";

interface BaseInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: InputVariant;
}

type InputFieldProps = BaseInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
    type?: "text" | "email" | "password" | "number";
  };

type TextareaFieldProps = BaseInputProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    type: "textarea";
  };

type InputProps = InputFieldProps | TextareaFieldProps;

const variantBase: Record<InputVariant, string> = {
  dark: "border-gold/30 bg-white/5 text-cream placeholder:text-cream/40 focus:border-gold focus:ring-gold/30",
  light:
    "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-gold focus:ring-gold/30",
};

const labelVariant: Record<InputVariant, string> = {
  dark: "text-cream/80",
  light: "text-gray-700",
};

const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>((props, ref) => {
  const {
    label,
    error,
    helperText,
    variant = "light",
    className,
    id,
    ...rest
  } = props;

  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  const isTextarea = rest.type === "textarea";

  const sharedClasses = cn(
    "w-full rounded-lg border px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2",
    variantBase[variant],
    error ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : "",
    className ?? ""
  );

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            "mb-1.5 block text-sm font-medium",
            labelVariant[variant]
          )}
        >
          {label}
        </label>
      )}
      {isTextarea ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          id={inputId}
          className={cn(sharedClasses, "min-h-[100px] resize-y")}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          id={inputId}
          className={sharedClasses}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-xs text-red-400">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p
          id={`${inputId}-helper`}
          className={cn(
            "mt-1 text-xs",
            variant === "dark" ? "text-cream/50" : "text-gray-500"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";
export default Input;
