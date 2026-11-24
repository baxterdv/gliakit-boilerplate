"use client";

import * as React from "react";
import { Popover } from "radix-ui";
import { Check, ChevronDown, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { useField, useFieldControl } from "@/components/ui/input";

export interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  /** The trigger's id, for a label's htmlFor (inside a Field, its label's). */
  id?: string;
  /** Names the trigger where there's no visible label. */
  "aria-label"?: string;
  className?: string;
}

/**
 * Combobox — a searchable select. Trigger styled like an input; the popover
 * filters options as you type. Keyboard: arrows + enter, esc to close.
 */
function Combobox({
  id: ownId,
  "aria-label": ariaLabel,
  options,
  value,
  onValueChange,
  placeholder = "Select option",
  searchPlaceholder = "Search…",
  disabled,
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const field = useField();
  const control = useFieldControl({ id: ownId });
  const uid = React.useId();
  const listId = `${uid}-list`;
  const valueId = `${uid}-value`;
  const optionId = (i: number) => `${uid}-option-${i}`;
  // The highlighted option stays in view as the arrows move past the list's edge.
  React.useEffect(() => {
    if (open) document.getElementById(optionId(active))?.scrollIntoView({ block: "nearest" });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- optionId only joins the stable uid
  }, [open, active]);

  const selected = options.find((o) => o.value === value);
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? options.filter((o) => o.label.toLowerCase().includes(q)) : options;
  }, [options, query]);

  const handleOpenChange = (next: boolean) => {
    if (next) {
      setQuery("");
      setActive(0);
    }
    setOpen(next);
  };

  const select = (option: ComboboxOption) => {
    onValueChange?.(option.value);
    setOpen(false);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && filtered[active]) {
      e.preventDefault();
      select(filtered[active]);
    }
  };

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger asChild>
        <button
          type="button"
          {...control}
          // Its label and its value, so a screen reader says "Country, Germany", not only "Country".
          aria-labelledby={field?.labelId && !ariaLabel ? `${field.labelId} ${valueId}` : undefined}
          aria-label={ariaLabel}
          disabled={disabled}
          data-slot="combobox-trigger"
          aria-haspopup="listbox"
          aria-expanded={open}
          className={cn(
            "flex h-control w-full items-center justify-between gap-2 rounded-md border border-input bg-card px-3 text-sm shadow-xs transition-colors outline-none",
            "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 data-[state=open]:border-ring",
            "disabled:pointer-events-none disabled:opacity-50",
            className,
          )}
        >
          <span id={valueId} className={cn("truncate", selected ? "text-foreground" : "text-muted-foreground")}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={6}
          className="z-50 w-[var(--radix-popover-trigger-width)] rounded-lg border border-border bg-card shadow-lg"
        >
          <div className="flex items-center gap-2 border-b border-border px-2.5">
            <Search className="size-3.5 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              role="combobox"
              aria-label={searchPlaceholder.replace(/…$/, "")}
              aria-expanded
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={filtered[active] ? optionId(active) : undefined}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onKey}
              placeholder={searchPlaceholder}
              className="h-control w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="max-h-56 overflow-y-auto p-1">
            {filtered.length === 0 && (
              <p role="status" className="px-2.5 py-4 text-center text-sm text-muted-foreground">
                No results found.
              </p>
            )}
            <div id={listId} role="listbox" aria-label={selected ? `Options, ${selected.label} selected` : "Options"}>
              {filtered.map((option, index) => (
                <button
                  key={option.value}
                  id={optionId(index)}
                  type="button"
                  role="option"
                  aria-selected={option.value === value}
                  tabIndex={-1}
                  onClick={() => select(option)}
                  onMouseMove={() => setActive(index)}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-left text-sm",
                    index === active && "bg-muted",
                    option.value === value ? "text-primary-ink" : "text-foreground",
                  )}
                >
                  {option.label}
                  {option.value === value && <Check className="size-4" aria-hidden="true" />}
                </button>
              ))}
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export { Combobox };
