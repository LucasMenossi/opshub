import { Menu } from "lucide-react";
import { useState } from "react";
import type { PropsWithChildren } from "react";

import { AppSidebar } from "@/components/Layout";

export function AppLayout({ children }: PropsWithChildren) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      <main className="min-w-0 flex-1">
        <div className="flex h-16 items-center border-b border-border px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileSidebarOpen(true)}
            className="rounded-md p-2 text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>

          <span className="ml-3 text-lg font-semibold">OpsHub</span>
        </div>

        {children}
      </main>
    </div>
  );
}
