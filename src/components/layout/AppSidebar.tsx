import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar.store";

import { Logo } from "./Logo";
import { Navigation } from "./Navigation";

export function AppSidebar() {
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);

  return (
    <aside
      className={cn(
        "flex h-screen shrink-0 flex-col border-r bg-white transition-[width] duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <Logo />
      <Navigation />
    </aside>
  );
}
