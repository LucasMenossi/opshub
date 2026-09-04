import { ChevronDown } from "lucide-react";
import type { SelectHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={cn(
          "h-10 w-full appearance-none rounded-lg",
          "border border-border",
          "bg-background text-foreground",
          "px-3 pr-9 text-sm",
          "outline-none transition-colors",
          "hover:border-foreground/30",
          "focus:border-foreground",
          "focus:ring-2 focus:ring-foreground/10",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
      </select>

      <ChevronDown
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute right-3 top-1/2",
          "h-4 w-4 -translate-y-1/2",
          "text-muted-foreground",
        )}
      />
    </div>
  );
}
