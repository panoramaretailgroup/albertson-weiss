"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import type { Notification } from "@/lib/types";

interface PanelShellProps {
  children: React.ReactNode;
  breadcrumb?: string;
  notifications?: Notification[];
  unreadCount?: number;
}

export default function PanelShell({
  children,
  breadcrumb,
  notifications = [],
  unreadCount = 0,
}: PanelShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        unreadCount={unreadCount}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main content */}
      <div className="lg:pl-60">
        <Header
          breadcrumb={breadcrumb}
          notifications={notifications}
          onMobileMenuOpen={() => setMobileOpen(true)}
        />
        <main className="px-4 py-6 sm:px-6 lg:px-8 pb-24 lg:pb-6">
          {children}
        </main>
      </div>
    </div>
  );
}
