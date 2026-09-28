import { cn } from "@/lib/utils";

import { useSidebarStore } from "@/stores/sidebar.store";

import { Logo } from "./Logo";
import { Navigation } from "./Navigation";

interface AppSidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export function AppSidebar({ isMobileOpen, onMobileClose }: AppSidebarProps) {
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);

  return (
    <>
      {isMobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onMobileClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-60 shrink-0 -translate-x-full flex-col",
          "border-r border-border bg-background text-foreground",
          "transition-[width,transform] duration-300",
          "lg:static lg:translate-x-0",
          isCollapsed ? "lg:w-16" : "lg:w-60",
          isMobileOpen && "translate-x-0",
        )}
      >
        <Logo onMobileClose={onMobileClose} />

        <Navigation />
      </aside>
    </>
  );
}
