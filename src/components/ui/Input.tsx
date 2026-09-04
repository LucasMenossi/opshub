import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Input({
  className,
  type = "text",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn(
        "h-10 w-full rounded-lg",
        "border border-border",
        "bg-background text-foreground",
        "px-3 text-sm",
        "outline-none transition-colors",
        "placeholder:text-muted-foreground",
        "hover:border-foreground/30",
        "focus:border-foreground",
        "focus:ring-2 focus:ring-foreground/10",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
