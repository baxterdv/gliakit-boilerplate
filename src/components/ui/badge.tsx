import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex max-w-[min(100%,12rem)] shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        neutral: "bg-muted text-muted-foreground",
        accent: "bg-primary-strong text-primary-foreground",
        success: "bg-diff-add/15 text-diff-add",
        warning: "bg-warning/15 text-warning-foreground",
        error: "bg-destructive/15 text-destructive",
        outline: "border border-border text-foreground",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

/**
 * A short label. It never grows past its container: longer text ends in an
 * ellipsis (the whole of it in a tooltip) instead of running out of the row.
 */
function Badge({
  className,
  variant,
  children,
  title,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  const text = typeof children === "string" ? children : undefined;
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      title={title ?? text}
      {...props}
    >
      {React.Children.map(children, (c) =>
        typeof c === "string" || typeof c === "number" ? <span className="min-w-0 truncate">{c}</span> : c,
      )}
    </span>
  );
}

export { Badge, badgeVariants };
