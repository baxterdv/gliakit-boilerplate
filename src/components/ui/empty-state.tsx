import * as React from "react";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  /** Optional CTA (a Button, link, etc.). */
  action?: React.ReactNode;
  /** Compact, bordered variant that sits inside a table/panel. */
  compact?: boolean;
  className?: string;
}

/**
 * EmptyState — zero-data state. Full for page-level empties, `compact` for
 * inside a table or panel. Mirrors the Figma EmptyState / TableEmptyState.
 */
function EmptyState({
  icon,
  title,
  description,
  action,
  compact = false,
  className,
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center justify-center text-center",
        compact
          ? "gap-2 rounded-lg border border-border bg-card px-6 py-10"
          : "gap-4 px-8 py-14",
        className,
      )}
    >
      {icon && (
        <div
          className={cn(
            "flex items-center justify-center rounded-full bg-muted text-muted-foreground",
            compact ? "size-10" : "size-14",
          )}
        >
          {icon}
        </div>
      )}
      <div className="space-y-1">
        <p
          className={cn(
            "font-semibold text-foreground",
            compact ? "text-sm" : "text-base",
          )}
        >
          {title}
        </p>
        {description && (
          <p className="mx-auto max-w-xs text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action && <div className="pt-1">{action}</div>}
    </div>
  );
}

export { EmptyState };
