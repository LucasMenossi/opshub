import type { InputHTMLAttributes } from "react";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

interface SearchInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className,
  ...props
}: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border bg-background pr-3 pl-9 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
        {...props}
      />
    </div>
  );
}
