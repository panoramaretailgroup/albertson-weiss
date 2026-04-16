"use client";

import { cn } from "@/lib/utils";
import { Info, Flag, TrendingUp, DollarSign, X } from "lucide-react";
import type { NotificationType } from "@/lib/types";
import { useEffect, useState } from "react";

const typeIcons: Record<NotificationType, typeof Info> = {
  info: Info,
  update: Flag,
  milestone: TrendingUp,
  return: DollarSign,
};

const typeStyles: Record<NotificationType, string> = {
  info: "border-blue-200 bg-blue-50",
  update: "border-gold/30 bg-gold/5",
  milestone: "border-green/30 bg-green/5",
  return: "border-green/30 bg-green/5",
};

const iconStyles: Record<NotificationType, string> = {
  info: "text-blue-500",
  update: "text-gold",
  milestone: "text-green",
  return: "text-green",
};

export interface ToastData {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
}

interface ToastProps extends ToastData {
  onDismiss: (id: string) => void;
  onClick?: () => void;
}

export default function Toast({
  id,
  title,
  message,
  type,
  onDismiss,
  onClick,
}: ToastProps) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const Icon = typeIcons[type];

  useEffect(() => {
    // Trigger enter animation
    requestAnimationFrame(() => setVisible(true));

    // Auto-dismiss after 5s
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onDismiss(id), 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, onDismiss]);

  const handleDismiss = () => {
    setExiting(true);
    setTimeout(() => onDismiss(id), 300);
  };

  return (
    <div
      className={cn(
        "pointer-events-auto w-80 overflow-hidden rounded-xl border shadow-lg transition-all duration-300",
        typeStyles[type],
        visible && !exiting
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      )}
      role="alert"
    >
      <div
        className={cn(
          "flex gap-3 p-4",
          onClick && "cursor-pointer"
        )}
        onClick={onClick}
      >
        <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", iconStyles[type])} />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900">{title}</p>
          <p className="mt-0.5 text-xs text-gray-600 line-clamp-2">{message}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDismiss();
          }}
          className="shrink-0 rounded p-0.5 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Cerrar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
