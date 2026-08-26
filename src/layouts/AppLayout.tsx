import type { PropsWithChildren } from "react";

import { AppSidebar } from "@/components/Layout";

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />

      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
