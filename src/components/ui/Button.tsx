import type { ButtonHTMLAttributes } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-lg text-sm font-medium",
    "text-foreground",
    "transition-colors outline-none",
    "focus-visible:ring-2 focus-visible:ring-foreground/10",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: "border border-border bg-background hover:bg-muted",
        ghost: "bg-transparent hover:bg-muted",
      },

      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({
          variant,
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}
