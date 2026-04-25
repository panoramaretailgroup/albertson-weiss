"use client";

import PanelShell from "@/components/panel/PanelShell";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/utils";
import {
  Bell,
  CheckCheck,
  DollarSign,
  Flag,
  Info,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type NotifType = "info" | "update" | "milestone" | "return";

interface Notification {
  id: string;
  type: NotifType;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const typeConfig: Record<
  NotifType,
  { icon: LucideIcon; label: string; iconBg: string; iconColor: string }
> = {
  info: {
    icon: Info,
    label: "InformaciÃ³n",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  update: {
    icon: RefreshCw,
    label: "ActualizaciÃ³n",
    iconBg: "bg-amber/10",
    iconColor: "text-amber",
  },
  milestone: {
    icon: Flag,
    label: "Hito",
    iconBg: "bg-green/10",
    iconColor: "text-green",
  },
  return: {
    icon: DollarSign,
    label: "Retorno",
    iconBg: "bg-green/10",
    iconColor: "text-green",
  },
};

// â”€â”€ Placeholder data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const initialNotifications: Notification[] = [
  {
    id: "n1",
    type: "milestone",
    title: "Jeep Wrangler ha llegado al almacÃ©n",
    message:
      "El Jeep Wrangler Rubicon ha completado la fase 3 (importaciÃ³n y aduanas). Sin daÃ±os detectados.",
    createdAt: new Date(Date.now() - 2 * 3600_000).toISOString(),
    read: false,
  },
  {
    id: "n2",
    type: "update",
    title: "Contenedor MSC en trÃ¡nsito marÃ­timo",
    message:
      "El contenedor MEDU9510693 ha zarpado desde Oakland. ETA en Rotterdam: 15 mayo 2026.",
    createdAt: new Date(Date.now() - 8 * 3600_000).toISOString(),
    read: false,
  },
  {
    id: "n3",
    type: "info",
    title: "Nueva oportunidad disponible",
    message:
      "Porsche 911 GT3 Touring 2023 â€” rentabilidad estimada 18,4%. Revisa los detalles en la secciÃ³n de oportunidades.",
    createdAt: new Date(Date.now() - 24 * 3600_000).toISOString(),
    read: false,
  },
  {
    id: "n4",
    type: "update",
    title: "Fotos de almacÃ©n actualizadas",
    message:
      "Se han aÃ±adido 3 nuevas fotos del Jeep Wrangler en el almacÃ©n de Oakland.",
    createdAt: new Date(Date.now() - 48 * 3600_000).toISOString(),
    read: true,
  },
  {
    id: "n5",
    type: "return",
    title: "Retorno liquidado: Dodge Challenger",
    message:
      "Has recibido +â‚¬3.168 de rentabilidad por tu inversiÃ³n en el Dodge Challenger SRT 2022.",
    createdAt: new Date(Date.now() - 72 * 3600_000).toISOString(),
    read: true,
  },
  {
    id: "n6",
    type: "milestone",
    title: "OperaciÃ³n completada: Dodge Challenger",
    message: "La operaciÃ³n ha finalizado con Ã©xito. Rentabilidad final: 26,4%.",
    createdAt: new Date(Date.now() - 73 * 3600_000).toISOString(),
    read: true,
  },
  {
    id: "n7",
    type: "info",
    title: "Contrato firmado",
    message:
      "Tu contrato de inversiÃ³n para el Ford Mustang GT se ha registrado.",
    createdAt: new Date(Date.now() - 120 * 3600_000).toISOString(),
    read: true,
  },
];

type FilterKey = "all" | "unread" | NotifType;

// â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function NotificacionesPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [autoMarked, setAutoMarked] = useState(false);
  const [filter, setFilter] = useState<FilterKey>("all");

  // Auto-mark all as read after 2.5s on mount
  useEffect(() => {
    if (autoMarked) return;
    const t = setTimeout(() => {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setAutoMarked(true);
    }, 2500);
    return () => clearTimeout(t);
  }, [autoMarked]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = useMemo(() => {
    if (filter === "all") return notifications;
    if (filter === "unread") return notifications.filter((n) => !n.read);
    return notifications.filter((n) => n.type === filter);
  }, [filter, notifications]);

  const filters: Array<{ key: FilterKey; label: string; count?: number }> = [
    { key: "all", label: "Todas", count: notifications.length },
    { key: "unread", label: "Sin leer", count: unreadCount },
    { key: "update", label: "Actualizaciones" },
    { key: "milestone", label: "Hitos" },
    { key: "return", label: "Retornos" },
  ];

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setAutoMarked(true);
  };

  return (
    <PanelShell breadcrumb="Notificaciones" unreadCount={unreadCount}>
      <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto max-w-[960px]">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl font-light text-text">
              Notificaciones
            </h1>
            <p className="mt-1 text-sm font-light text-muted">
              {unreadCount > 0
                ? `${unreadCount} sin leer Â· ${notifications.length} en total`
                : `${notifications.length} notificaciones Â· todas leÃ­das`}
            </p>
          </div>
          {unreadCount > 0 && !autoMarked && (
            <button
              onClick={markAllRead}
              className="inline-flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.22em] text-muted hover:text-text border-b border-rule hover:border-text pb-0.5 transition-colors"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Marcar todas como leÃ­das
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.22em] border transition-colors",
                filter === f.key
                  ? "bg-text text-white border-text"
                  : "bg-[#f8f5ef] text-muted border-rule hover:border-text hover:text-text"
              )}
            >
              <span>{f.label}</span>
              {typeof f.count === "number" && (
                <span className="num opacity-80">{f.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* List */}
        <div className=" border border-rule bg-[#f8f5ef] overflow-hidden">
          {filtered.length > 0 ? (
            <ul className="divide-y divide-rule">
              {filtered.map((n) => (
                <NotificationRow key={n.id} notification={n} />
              ))}
            </ul>
          ) : (
            <div className="p-12 text-center">
              <Bell
                className="mx-auto h-10 w-10 text-rule"
                strokeWidth={1.5}
              />
              <h3 className="mt-4 font-serif text-lg font-light text-text">
                Sin notificaciones
              </h3>
              <p className="mt-2 font-sans text-sm text-muted">
                {filter === "unread"
                  ? "No hay notificaciones sin leer."
                  : "No hay notificaciones en esta categorÃ­a."}
              </p>
            </div>
          )}
        </div>
      </div>
    </PanelShell>
  );
}

// â”€â”€ Row â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function NotificationRow({
  notification,
}: {
  notification: Notification;
}) {
  const cfg = typeConfig[notification.type];
  const Icon = cfg.icon;

  return (
    <li
      className={cn(
        "flex gap-4 px-5 py-4 transition-colors",
        !notification.read && "bg-ivory-deep"
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center shrink-0",
          cfg.iconBg
        )}
      >
        <Icon className={cn("h-4 w-4", cfg.iconColor)} strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div
            className={cn(
              "font-sans text-[13px] leading-snug",
              notification.read
                ? "text-text font-normal"
                : "text-text font-semibold"
            )}
          >
            {notification.title}
          </div>
          {!notification.read && (
            <span
              className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber"
              aria-label="No leÃ­do"
            />
          )}
        </div>
        <p className="mt-1 font-sans text-[12px] text-muted leading-relaxed">
          {notification.message}
        </p>
        <div className="mt-1.5 flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.2em] text-muted">
          <span>{cfg.label}</span>
          <span aria-hidden="true">Â·</span>
          <span className="normal-case tracking-normal">
            {formatRelativeTime(notification.createdAt)}
          </span>
        </div>
      </div>
    </li>
  );
}
