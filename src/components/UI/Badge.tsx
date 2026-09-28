import type { HTMLAttributes } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeBase =
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";

const badgeVariants = cva(badgeBase, {
  variants: {
    variant: {
      solid: "",
      outline: "border",
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
      className:
        "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200",
    },
    {
      variant: "solid",
      tone: "success",
      className:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    },
    {
      variant: "solid",
      tone: "warning",
      className:
        "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    },
    {
      variant: "solid",
      tone: "danger",
      className: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
    },
    {
      variant: "solid",
      tone: "info",
      className: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
    },

    {
      variant: "outline",
      tone: "default",
      className: "border-border text-foreground",
    },
    {
      variant: "outline",
      tone: "success",
      className:
        "border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300",
    },
    {
      variant: "outline",
      tone: "warning",
      className:
        "border-amber-300 text-amber-700 dark:border-amber-800 dark:text-amber-300",
    },
    {
      variant: "outline",
      tone: "danger",
      className:
        "border-red-300 text-red-700 dark:border-red-800 dark:text-red-300",
    },
    {
      variant: "outline",
      tone: "info",
      className:
        "border-sky-300 text-sky-700 dark:border-sky-800 dark:text-sky-300",
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
