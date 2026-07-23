import { navigation } from "@/app/config/navigation";
import { useSidebarStore } from "@/stores/sidebar.store";

import { SidebarItem } from "./SidebarItem";

export function Navigation() {
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);

  return (
    <nav className="flex flex-col gap-1 px-3 py-4">
      {navigation.map((item) => (
        <SidebarItem key={item.to} {...item} isCollapsed={isCollapsed} />
      ))}
    </nav>
  );
}
