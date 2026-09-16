import { useState } from "react";
import type { PropsWithChildren } from "react";
import { AppSidebar } from "@/components/Layout";
import { AppHeader } from "@/components/Layout/AppHeader";

export function AppLayout({ children }: PropsWithChildren) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      <main className="min-w-0 flex-1">
        <AppHeader onMenuClick={() => setIsMobileSidebarOpen(true)} />

        {children}
      </main>
    </div>
  );
}
