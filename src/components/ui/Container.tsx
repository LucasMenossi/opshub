import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
}

const sizeClasses: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-screen-2xl",
  full: "max-w-none",
};

export function Container({
  size = "full",
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 py-8 lg:px-8 lg:py-10",
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
