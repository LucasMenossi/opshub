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
  size = "lg",
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full", sizeClasses[size], className)}
      {...props}
    />
  );
}
