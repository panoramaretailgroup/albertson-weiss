"use client";

import { createContext, useCallback, useState } from "react";
import Toast, { type ToastData } from "@/components/ui/Toast";
import type { NotificationType } from "@/lib/types";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";

interface ToastContextType {
  addToast: (title: string, message: string, type?: NotificationType) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

let toastCounter = 0;

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const router = useRouter();

  const addToast = useCallback(
    (title: string, message: string, type: NotificationType = "info") => {
      const id = `toast-${++toastCounter}`;
      setToasts((prev) => [...prev.slice(-4), { id, title, message, type }]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Toast container */}
      <div className="pointer-events-none fixed right-4 top-4 z-[100] flex flex-col gap-3">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onDismiss={removeToast}
            onClick={() => {
              router.push(ROUTES.panelNotificaciones);
              removeToast(toast.id);
            }}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
