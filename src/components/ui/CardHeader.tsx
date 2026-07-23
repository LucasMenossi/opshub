import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}

export function CardHeader({
  title,
  description,
  className,
  ...props
}: CardHeaderProps) {
  return (
    <div className={cn("mb-6", className)} {...props}>
      <h2 className="text-lg font-semibold">{title}</h2>

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

CardHeader.displayName = "CardHeader";
