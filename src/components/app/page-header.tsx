import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Screen header. Default: mono eyebrow + heading + action.
 * Detail: pass `breadcrumb` (replaces the eyebrow), `badge` and `description`.
 */
function PageHeader({
  eyebrow,
  breadcrumb,
  title,
  badge,
  description,
  action,
  className,
}: {
  eyebrow?: string;
  /** e.g. <Breadcrumb items={…} />; shown instead of the eyebrow. */
  breadcrumb?: React.ReactNode;
  title: string;
  /** Status badge next to the title. */
  badge?: React.ReactNode;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0">
        {breadcrumb ??
          (eyebrow && (
            <p className="font-mono text-eyebrow uppercase tracking-[0.2em] text-muted-foreground">
              {eyebrow}
            </p>
          ))}
        <div className="mt-1 flex flex-wrap items-center gap-2.5">
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          {badge}
        </div>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
    </div>
  );
}

export { PageHeader };
