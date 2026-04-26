"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export default function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("divide-y divide-rule", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between py-6 text-left group"
              aria-expanded={isOpen}
            >
              <span className="pr-6 font-sans font-normal text-[15px] text-text group-hover:text-amber transition-colors">
                {item.question}
              </span>
              <svg
                className={cn(
                  "w-3.5 h-3.5 shrink-0 text-muted transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2 5l5 5 5-5" />
              </svg>
            </button>
            <div
              className={cn(
                "grid transition-all duration-200 ease-in-out",
                isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p className="font-sans font-light text-[13px] leading-[1.9] text-muted pr-12">
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
