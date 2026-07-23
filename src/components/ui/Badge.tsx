import type { HTMLAttributes } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeBase =
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";

const badgeVariants = cva(badgeBase, {
  variants: {
    variant: {
      solid: "",
      outline: "",
      subtle: "",
    },
    tone: {
      default: "",
      success: "",
      warning: "",
      danger: "",
      info: "",
    },
  },

  compoundVariants: [
    {
      variant: "solid",
      tone: "default",
      className: "bg-zinc-100 text-zinc-700",
    },
    {
      variant: "solid",
      tone: "success",
      className: "bg-emerald-100 text-emerald-700",
    },
    {
      variant: "solid",
      tone: "warning",
      className: "bg-amber-100 text-amber-700",
    },
    {
      variant: "solid",
      tone: "danger",
      className: "bg-red-100 text-red-700",
    },
    {
      variant: "solid",
      tone: "info",
      className: "bg-sky-100 text-sky-700",
    },
  ],

  defaultVariants: {
    variant: "solid",
    tone: "default",
  },
});

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, tone, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        badgeVariants({
          variant,
          tone,
        }),
        className,
      )}
      {...props}
    />
  );
}

Badge.displayName = "Badge";
