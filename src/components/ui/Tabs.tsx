"use client";

import { cn } from "@/lib/utils";

interface Tab {
  label: string;
  value: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (value: string) => void;
  variant?: "dark" | "light";
  className?: string;
}

export default function Tabs({
  tabs,
  activeTab,
  onChange,
  variant = "light",
  className,
}: TabsProps) {
  const isDark = variant === "dark";

  return (
    <div
      role="tablist"
      className={cn(
        "flex gap-1 overflow-x-auto border-b",
        isDark ? "border-gold/20" : "border-gray-200",
        className ?? ""
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === activeTab;
        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.value)}
            className={cn(
              "relative whitespace-nowrap px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50",
              isActive
                ? isDark
                  ? "text-gold"
                  : "text-gray-900"
                : isDark
                  ? "text-cream/50 hover:text-cream/80"
                  : "text-gray-500 hover:text-gray-700"
            )}
          >
            {tab.label}
            {isActive && (
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 h-0.5",
                  isDark ? "bg-gold" : "bg-gold"
                )}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
