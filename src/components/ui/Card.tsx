import type { HTMLAttributes } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-xl border border-border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        elevated: "",
        outlined: "shadow-none",
        flat: "border-transparent shadow-none",
      },
    },
    defaultVariants: {
      variant: "elevated",
    },
  },
);

interface CardProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

export function Card({ className, variant, ...props }: CardProps) {
  return (
    <div className={cn(cardVariants({ variant }), className)} {...props} />
  );
}
