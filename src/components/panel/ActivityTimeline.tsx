import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/utils";
import { Info, Flag, TrendingUp, DollarSign } from "lucide-react";
import type { Notification, NotificationType } from "@/lib/types";

interface ActivityTimelineProps {
  notifications: Notification[];
  className?: string;
}

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

export default function ActivityTimeline({
  notifications,
  className,
}: ActivityTimelineProps) {
  if (notifications.length === 0) {
    return (
      <div className={cn("rounded-xl border border-gray-200 bg-white p-8 text-center", className)}>
        <Info className="mx-auto h-8 w-8 text-gray-200" />
        <p className="mt-2 text-sm text-gray-400">
          No hay actividad reciente
        </p>
      </div>
    );
  }

  return (
    <div className={cn("rounded-xl border border-gray-200 bg-white", className)}>
      <div className="divide-y divide-gray-100">
        {notifications.map((notification) => {
          const Icon = typeIcons[notification.type];
          const colorClass = typeColors[notification.type];

          return (
            <div key={notification.id} className="flex gap-3 px-5 py-4">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                  colorClass
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {notification.title}
                </p>
                <p className="mt-0.5 text-sm text-gray-500 truncate">
                  {notification.message}
                </p>
              </div>
              <span className="shrink-0 text-xs text-gray-400 pt-0.5">
                {formatRelativeTime(notification.created_at)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
