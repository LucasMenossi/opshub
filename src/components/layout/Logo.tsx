import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { useSidebarStore } from "@/stores/sidebar.store";

export function Logo() {
  const { isCollapsed, toggle } = useSidebarStore();

  return (
    <div className="flex h-16 items-center justify-between border-b px-4">
      {!isCollapsed && (
        <span className="text-xl font-bold tracking-tight">OpsHub</span>
      )}

      <button
        onClick={toggle}
        className="rounded-md p-2 hover:bg-zinc-100"
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
