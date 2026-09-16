import { Menu } from "lucide-react";

import { ThemeToggle } from "../ThemeToggle";

interface AppHeaderProps {
  onMenuClick: () => void;
}

export function AppHeader({ onMenuClick }: AppHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-4 text-foreground">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-md p-2 text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 lg:hidden"
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      <span className="text-lg font-semibold lg:hidden">OpsHub</span>

      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </header>
  );
}
