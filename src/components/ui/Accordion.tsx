"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  variant?: "dark" | "light";
  className?: string;
}

export default function Accordion({
  items,
  variant = "dark",
  className,
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isDark = variant === "dark";

  return (
    <div className={cn("divide-y", isDark ? "divide-gold/10" : "divide-gray-200", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={index}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className={cn(
                "flex w-full items-center justify-between py-5 text-left transition-colors",
                isDark
                  ? "text-cream hover:text-gold"
                  : "text-gray-900 hover:text-gray-600"
              )}
              aria-expanded={isOpen}
            >
              <span className="pr-4 text-base font-medium">{item.question}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 transition-transform duration-200",
                  isOpen && "rotate-180",
                  isDark ? "text-gold/50" : "text-gray-400"
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-200 ease-in-out",
                isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p
                  className={cn(
                    "text-sm leading-relaxed",
                    isDark ? "text-cream/50" : "text-gray-500"
                  )}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
