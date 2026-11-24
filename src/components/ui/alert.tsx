import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "flex flex-wrap items-start gap-x-3 gap-y-2 rounded-lg border px-4 py-3",
  {
    variants: {
      variant: {
        info: "border-primary/30 bg-primary/10",
        success: "border-diff-add/30 bg-diff-add/10",
        warning: "border-warning/30 bg-warning/10",
        error: "border-destructive/30 bg-destructive/10",
      },
    },
    defaultVariants: { variant: "info" },
  },
);

const iconBg = {
  info: "bg-primary",
  success: "bg-diff-add",
  warning: "bg-warning",
  error: "bg-destructive",
} as const;

const glyphs = { info: "i", success: "✓", warning: "!", error: "✕" } as const;

/**
 * Inline alert strip — icon, title, description, optional action.
 * Colors come from semantic tokens only.
 */
function Alert({
  variant = "warning",
  title,
  children,
  action,
  className,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & {
    title: string;
    action?: React.ReactNode;
  }) {
  const v = variant ?? "info";
  return (
    <div
      role="status"
      data-slot="alert"
      data-variant={v}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white",
          iconBg[v],
        )}
      >
        {glyphs[v]}
      </span>
      {/* Wraps: an action that doesn't fit beside a 12rem message moves under it. */}
      <div className="min-w-0 flex-1 basis-48">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {children && (
          <p className="text-xs text-muted-foreground">{children}</p>
        )}
      </div>
      {action && <div className="max-w-full min-w-0 shrink-0">{action}</div>}
    </div>
  );
}

export { Alert, alertVariants };
