import * as React from "react";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TableToolbarProps {
  search?: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  };
  /** Filter controls, shown after the search box. */
  filters?: React.ReactNode;
  /** Right-aligned actions such as Export. */
  actions?: React.ReactNode;
  /** When above zero, the toolbar switches to the bulk-action bar. */
  selectedCount?: number;
  bulkActions?: React.ReactNode;
  onClearSelection?: () => void;
  className?: string;
}

/**
 * Sits above a data table. Default state: search, filters, actions.
 * Selected state (selectedCount > 0): count, bulk actions, clear selection.
 */
function TableToolbar({
  search,
  filters,
  actions,
  selectedCount = 0,
  bulkActions,
  onClearSelection,
  className,
}: TableToolbarProps) {
  if (selectedCount > 0) {
    return (
      <div
        data-slot="table-toolbar"
        data-state="selected"
        className={cn(
          "flex min-h-11 flex-wrap items-center gap-2 rounded-lg border border-primary/50 bg-primary/5 px-2 py-1.5",
          className,
        )}
      >
        <span className="px-1.5 text-sm font-medium text-primary-ink" aria-live="polite">
          {selectedCount} selected
        </span>
        {bulkActions}
        {onClearSelection && (
          <Button variant="ghost" size="sm" className="ml-auto" onClick={onClearSelection}>
            Clear selection
          </Button>
        )}
      </div>
    );
  }

  return (
    <div
      data-slot="table-toolbar"
      data-state="default"
      className={cn("flex min-h-11 flex-wrap items-center gap-2", className)}
    >
      {search && (
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={search.value}
            onChange={(e) => search.onChange(e.target.value)}
            placeholder={search.placeholder ?? "Search…"}
            aria-label={search.placeholder ?? "Search"}
            className="pl-9"
          />
        </div>
      )}
      {filters}
      {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export { TableToolbar };
