import type { ReactNode } from "react";

interface LogFiltersProps {
  children: ReactNode;
}

export function LogFilters({ children }: LogFiltersProps) {
  return <div className="flex flex-wrap gap-3">{children}</div>;
}
