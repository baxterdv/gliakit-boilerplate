import * as React from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    // relative: absolutely positioned content (e.g. sr-only labels) is
    // clipped by the scroll area instead of widening the page on mobile.
    <div className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

function THead({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      className={cn("border-b border-border bg-muted/40", className)}
      {...props}
    />
  );
}

type SortDirection = "asc" | "desc" | false;

/**
 * Header cell: a quiet sentence-case label, so the rows lead. Pass `onSort`
 * to make it sortable; `sorted` marks the active column and direction (an
 * arrow in the accent colour). Unsorted columns show their sort affordance
 * on hover and keyboard focus only, so the header isn't a row of arrows.
 */
function TH({
  className,
  children,
  sorted,
  onSort,
  ...props
}: React.ComponentProps<"th"> & {
  sorted?: SortDirection;
  onSort?: () => void;
}) {
  const label = onSort ? (
    <button
      type="button"
      onClick={onSort}
      className={cn(
        "group/sort -mx-1 inline-flex items-center gap-1 rounded px-1 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-primary-ink",
        sorted && "text-foreground",
      )}
    >
      {children}
      {sorted === "desc" ? (
        <ArrowDown aria-hidden="true" className="size-3.5 text-primary-ink" />
      ) : sorted === "asc" ? (
        <ArrowUp aria-hidden="true" className="size-3.5 text-primary-ink" />
      ) : (
        <ChevronsUpDown aria-hidden="true" className="size-3.5 opacity-0 transition-opacity group-hover/sort:opacity-60 group-focus-visible/sort:opacity-60 pointer-coarse:opacity-40" />
      )}
    </button>
  ) : (
    children
  );
  return (
    <th
      aria-sort={
        sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : undefined
      }
      className={cn(
        "px-4 py-2.5 text-left text-xs font-medium whitespace-nowrap text-muted-foreground",
        className,
      )}
      {...props}
    >
      {label}
    </th>
  );
}

function TBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody className={className} {...props} />;
}

function TR({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      className={cn(
        "border-b border-border transition-colors last:border-0 hover:bg-muted/30",
        className,
      )}
      {...props}
    />
  );
}

function TD({ className, ...props }: React.ComponentProps<"td">) {
  return <td className={cn("px-4 py-3 align-middle", className)} {...props} />;
}

export { Table, THead, TH, TBody, TR, TD, type SortDirection };
