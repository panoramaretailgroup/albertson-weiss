"use client";

import PanelShell from "@/components/panel/PanelShell";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/utils";
import { Info, Flag, TrendingUp, DollarSign, CheckCheck } from "lucide-react";
import type { Notification, NotificationType } from "@/lib/types";
import { useEffect, useState } from "react";

const typeIcons: Record<NotificationType, typeof Info> = {
  info: Info,
  update: Flag,
  milestone: TrendingUp,
  return: DollarSign,
};

const typeColors: Record<NotificationType, string> = {
  info: "text-blue-500 bg-blue-50",
  update: "text-gold bg-gold/10",
  milestone: "text-green bg-green/10",
  return: "text-green bg-green/10",
};

// Placeholder data
const placeholderNotifications: Notification[] = [
  {
    id: "n1", user_id: "u1",
    title: "Tu Wrangler ha llegado al almacén",
    message: "El Jeep Wrangler Rubicon ha completado la fase 3: almacén USA. El vehículo ha sido inspeccionado y está en perfectas condiciones.",
    type: "milestone", read: false, car_id: "c1",
    created_at: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
  {
    id: "n2", user_id: "u1",
    title: "Contenedor cargado",
    message: "El Ford Mustang GT se ha cargado en el contenedor MEDU9510693 para envío marítimo. Salida estimada: 8 de febrero.",
    type: "update", read: false, car_id: "c2",
    created_at: new Date(Date.now() - 8 * 3600000).toISOString(),
  },
  {
    id: "n3", user_id: "u1",
    title: "Nueva oportunidad disponible",
    message: "Chevrolet Corvette C8 2023 - Rentabilidad estimada: 28%. ¡No te la pierdas!",
    type: "info", read: false, car_id: "opp-1",
    created_at: new Date(Date.now() - 24 * 3600000).toISOString(),
  },
  {
    id: "n4", user_id: "u1",
    title: "Fotos actualizadas",
    message: "Se han añadido nuevas fotos del Jeep Wrangler en el almacén de Oakland, California.",
    type: "update", read: true, car_id: "c1",
    created_at: new Date(Date.now() - 48 * 3600000).toISOString(),
  },
  {
    id: "n5", user_id: "u1",
    title: "Rentabilidad cobrada: Dodge Challenger",
    message: "Has recibido +3.168€ de rentabilidad por tu inversión en el Dodge Challenger SRT 2022. ¡Felicidades!",
    type: "return", read: true, car_id: "cc1",
    created_at: new Date(Date.now() - 72 * 3600000).toISOString(),
  },
  {
    id: "n6", user_id: "u1",
    title: "Operación completada",
    message: "La operación del Dodge Challenger SRT ha finalizado con éxito. Rentabilidad: 26.4%",
    type: "milestone", read: true, car_id: "cc1",
    created_at: new Date(Date.now() - 73 * 3600000).toISOString(),
  },
  {
    id: "n7", user_id: "u1",
    title: "Tu Mustang en tránsito marítimo",
    message: "El Ford Mustang GT ha iniciado el tránsito marítimo Oakland → Rotterdam. ETA: 15 de marzo.",
    type: "update", read: true, car_id: "c2",
    created_at: new Date(Date.now() - 96 * 3600000).toISOString(),
  },
  {
    id: "n8", user_id: "u1",
    title: "Contrato firmado",
    message: "Tu contrato de inversión para el Ford Mustang GT ha sido registrado correctamente.",
    type: "info", read: true, car_id: "c2",
    created_at: new Date(Date.now() - 120 * 3600000).toISOString(),
  },
];

export default function NotificacionesPage() {
  const [notifications, setNotifications] = useState(placeholderNotifications);
  const [markedAll, setMarkedAll] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Mark all as read on mount
  useEffect(() => {
    if (markedAll) return;
    const timer = setTimeout(() => {
      // TODO: Update in Supabase
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setMarkedAll(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [markedAll]);

  return (
    <PanelShell breadcrumb="Notificaciones" unreadCount={unreadCount}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Notificaciones
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {unreadCount > 0
              ? `${unreadCount} notificación${unreadCount !== 1 ? "es" : ""} sin leer`
              : "Todas leídas"}
          </p>
        </div>
        {unreadCount > 0 && !markedAll && (
          <button
            onClick={() => {
              setNotifications((prev) =>
                prev.map((n) => ({ ...n, read: true }))
              );
              setMarkedAll(true);
            }}
            className="flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold/80 transition-colors"
          >
            <CheckCheck className="h-4 w-4" />
            Marcar todas como leídas
          </button>
        )}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        {notifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => {
              const Icon = typeIcons[notification.type];
              const colorClass = typeColors[notification.type];

              return (
                <div
                  key={notification.id}
                  className={cn(
                    "flex gap-4 px-5 py-4 transition-colors",
                    !notification.read && "bg-gold/[0.03]"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                      colorClass
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={cn(
                          "text-sm",
                          notification.read
                            ? "text-gray-700"
                            : "font-semibold text-gray-900"
                        )}
                      >
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {notification.message}
                    </p>
                    <p className="mt-2 text-xs text-gray-400">
                      {formatRelativeTime(notification.created_at)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="px-5 py-12 text-center">
            <Info className="mx-auto h-10 w-10 text-gray-200" />
            <h3 className="mt-3 text-base font-medium text-gray-900">
              No tienes notificaciones
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Las actualizaciones de tus inversiones aparecerán aquí.
            </p>
          </div>
        )}
      </div>
    </PanelShell>
  );
}
