import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

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
        className: "bg-zinc-100 text-zinc-900",
      }}
      className={cn(
        "flex items-center rounded-lg px-3 py-2 text-sm transition-colors hover:bg-zinc-100",
        isCollapsed ? "justify-center" : "gap-3",
      )}
    >
      <Icon size={18} />

      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
}
