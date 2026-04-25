"use client";

import PanelNav from "./PanelNav";
import type { Notification } from "@/lib/types";

interface PanelShellProps {
  children: React.ReactNode;
  /**
   * Kept for backward-compat with existing pages (some still pass it);
   * not rendered anywhere in the new top-bar layout.
   */
  breadcrumb?: string;
  notifications?: Notification[];
  unreadCount?: number;
}

export default function PanelShell({
  children,
  notifications = [],
  unreadCount = 0,
}: PanelShellProps) {
  return (
    <div className="min-h-screen bg-ivory text-text">
      <PanelNav notifications={notifications} unreadCount={unreadCount} />
      <main className="px-4 py-6 sm:px-6 lg:px-8 pb-24 lg:pb-6">
        {children}
      </main>
    </div>
  );
}
