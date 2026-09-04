import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface SidebarItemProps {
  label: string;
  to: string;
  icon: LucideIcon;
  isCollapsed: boolean;
}

export function SidebarItem({
  label,
  to,
  icon: Icon,
  isCollapsed,
}: SidebarItemProps) {
  return (
    <Link
      to={to}
      activeProps={{
        className: "bg-muted text-foreground",
      }}
      className={cn(
        "flex items-center rounded-lg px-3 py-2",
        "text-sm text-muted-foreground",
        "transition-colors",
        "hover:bg-muted hover:text-foreground",
        "focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-foreground/20",
        isCollapsed ? "justify-center" : "gap-3",
      )}
    >
      <Icon size={18} />

      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
}
