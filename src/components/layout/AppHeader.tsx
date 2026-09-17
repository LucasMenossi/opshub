import { LogOut, Menu } from "lucide-react";

import { useAuthStore } from "@/stores/auth.store";

import { ThemeToggle } from "../ThemeToggle";

interface AppHeaderProps {
  onMenuClick: () => void;
}

export function AppHeader({ onMenuClick }: AppHeaderProps) {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-4 text-foreground">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-md p-2 text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 lg:hidden cursor-pointer"
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      <span className="text-lg font-semibold lg:hidden">OpsHub</span>

      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-md p-2 text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 cursor-pointer"
          aria-label="Logout"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
