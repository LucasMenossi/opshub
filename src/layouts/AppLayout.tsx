import type { PropsWithChildren } from "react";

import { AppHeader, AppSidebar } from "@/components/Layout";

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
