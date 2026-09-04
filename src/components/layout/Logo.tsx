import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { useSidebarStore } from "@/stores/sidebar.store";

export function Logo() {
  const { isCollapsed, toggle } = useSidebarStore();

  return (
    <div className="flex h-16 items-center justify-between border-b border-border px-4">
      {!isCollapsed && (
        <span className="text-xl font-bold tracking-tight text-foreground">
          OpsHub
        </span>
      )}

      <button
        type="button"
        onClick={toggle}
        className="rounded-md p-2 text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
        aria-label="Toggle sidebar"
      >
        {isCollapsed ? (
          <PanelLeftOpen size={18} />
        ) : (
          <PanelLeftClose size={18} />
        )}
      </button>
    </div>
  );
}
