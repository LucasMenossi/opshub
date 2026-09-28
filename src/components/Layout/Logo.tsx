import { PanelLeftClose, PanelLeftOpen, X } from "lucide-react";

import { useSidebarStore } from "@/stores/sidebar.store";

interface LogoProps {
  onMobileClose: () => void;
}

export function Logo({ onMobileClose }: LogoProps) {
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
        onClick={onMobileClose}
        className="rounded-md p-2 text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 lg:hidden"
        aria-label="Close navigation"
      >
        <X size={18} />
      </button>

      <button
        type="button"
        onClick={toggle}
        className="hidden rounded-md p-2 text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 lg:block cursor-pointer"
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
