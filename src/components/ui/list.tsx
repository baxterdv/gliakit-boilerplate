import * as React from "react";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

/** List — rows in a surface container. Mirrors the Figma Lists component. */
function List({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="list"
      className={cn(
        "divide-y divide-border overflow-hidden rounded-lg border border-border bg-card",
        className,
      )}
      {...props}
    />
  );
}

interface ListItemProps extends React.ComponentProps<"button"> {
  /** Leading element (icon in a muted square, avatar, …). */
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  /** Show the trailing chevron. Defaults to true. */
  chevron?: boolean;
}

function ListItem({
  icon,
  title,
  subtitle,
  chevron = true,
  className,
  ...props
}: ListItemProps) {
  return (
    <button
      type="button"
      data-slot="list-item"
      className={cn(
        "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/40",
        className,
      )}
      {...props}
    >
      {icon && (
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-foreground">
          {title}
        </span>
        {subtitle && (
          // Two lines before it's cut, so a short description is read whole.
          <span className="line-clamp-2 text-xs text-muted-foreground">
            {subtitle}
          </span>
        )}
      </span>
      {chevron && (
        <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
      )}
    </button>
  );
}

export { List, ListItem };
