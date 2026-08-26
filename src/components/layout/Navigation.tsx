import {
  navigationGroups,
  settingsNavigationItem,
} from "@/app/config/navigation";
import { useSidebarStore } from "@/stores/sidebar.store";

import { SidebarItem } from "./SidebarItem";

export function Navigation() {
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);

  return (
    <nav className="flex flex-1 flex-col px-3 py-4">
      <div className="space-y-6">
        {navigationGroups.map((group) => (
          <div key={group.label}>
            {!isCollapsed && group.label && (
              <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-zinc-400">
                {group.label}
              </p>
            )}

            <div className="flex flex-col gap-1">
              {group.items.map((item) => (
                <SidebarItem
                  key={item.to}
                  {...item}
                  isCollapsed={isCollapsed}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4">
        <div className="border-t pt-4">
          <SidebarItem {...settingsNavigationItem} isCollapsed={isCollapsed} />
        </div>
      </div>
    </nav>
  );
}
