"use client";

import * as React from "react";
import { Progress as ProgressPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

const STATUS_FILL = {
  default: "bg-highlight",
  success: "bg-diff-add",
  warning: "bg-warning",
  error: "bg-destructive",
} as const;

/** The status in words, for screen readers: the fill colour alone says nothing to them. */
export const STATUS_WORDS = { default: "", success: "good", warning: "warning", error: "problem" } as const;

/** Linear progress bar, the flat sibling of CircularProgress. */
function Progress({
  value = 0,
  status = "default",
  className,
  ...props
}: Omit<React.ComponentProps<typeof ProgressPrimitive.Root>, "value"> & {
  /** 0–100. */
  value?: number;
  status?: keyof typeof STATUS_FILL;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={clamped}
      getValueLabel={(v) => `${Math.round(v)}%${STATUS_WORDS[status] ? `, ${STATUS_WORDS[status]}` : ""}`}
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-muted", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn("h-full w-full rounded-full transition-transform duration-300", STATUS_FILL[status])}
        style={{ transform: `translateX(-${100 - clamped}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
