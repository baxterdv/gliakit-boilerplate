"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Kbd } from "@/components/ui/kbd";

const OPEN_EVENT = "gliakit:command-palette";

/** Programmatically open the palette (e.g. from the sidebar search box). */
function openCommandPalette() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

export interface CommandItem {
  group: string;
  label: string;
  icon?: React.ReactNode;
  /** Shortcut hint rendered on the right (e.g. "G D"). */
  kbd?: string;
  /** Arbitrary payload — usually a route href. */
  value: string;
}

interface CommandPaletteProps {
  items: CommandItem[];
  onSelect: (item: CommandItem) => void;
  placeholder?: string;
}

/**
 * Command palette — ⌘K / Ctrl-K search over grouped actions with keyboard
 * navigation. Mount once in the app shell; open via the shortcut or
 * openCommandPalette().
 */
function CommandPalette({
  items,
  onSelect,
  placeholder = "Search…",
}: CommandPaletteProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((i) => i.label.toLowerCase().includes(q)) : items;
  }, [items, query]);

  // Start fresh each time the palette opens (adjusted during render, not in
  // an effect, so there is no extra render pass).
  const [wasOpen, setWasOpen] = React.useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setQuery("");
      setActive(0);
    }
  }

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  const select = (item: CommandItem) => {
    setOpen(false);
    onSelect(item);
  };

  const uid = React.useId();
  const listId = `${uid}-list`;
  const optionId = (i: number) => `${uid}-option-${i}`;
  // The highlighted command stays in view as the arrows move past the list's edge.
  React.useEffect(() => {
    if (open) document.getElementById(optionId(active))?.scrollIntoView({ block: "nearest" });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- optionId only joins the stable uid
  }, [open, active]);

  const onInputKey = (e: React.KeyboardEvent) => {
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

  // Group the filtered items, preserving order.
  const groups: { name: string; items: { item: CommandItem; index: number }[] }[] = [];
  filtered.forEach((item, index) => {
    const g = groups.find((x) => x.name === item.group);
    if (g) g.items.push({ item, index });
    else groups.push({ name: item.group, items: [{ item, index }] });
  });

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          data-slot="command-palette"
          className="fixed top-[20%] left-1/2 z-50 w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-lg border border-border bg-card shadow-2xl outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
        >
          <DialogPrimitive.Title className="sr-only">
            Command palette
          </DialogPrimitive.Title>
          <div className="flex items-center gap-2.5 border-b border-border px-4">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              role="combobox"
              aria-label="Search commands"
              aria-expanded
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={filtered[active] ? optionId(active) : undefined}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onInputKey}
              placeholder={placeholder}
              className="h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <Kbd>
              esc
            </Kbd>
          </div>
          <div className="max-h-72 overflow-y-auto p-2">
            {filtered.length === 0 && (
              <p role="status" className="px-2.5 py-6 text-center text-sm text-muted-foreground">
                No results found.
              </p>
            )}
            <div id={listId} role="listbox" aria-label="Commands">
            {groups.map((g, gi) => (
              <div key={g.name} role="group" aria-labelledby={`${uid}-group-${gi}`} className="mb-1 last:mb-0">
                <p id={`${uid}-group-${gi}`} className="px-2.5 pt-2 pb-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  {g.name}
                </p>
                {g.items.map(({ item, index }) => (
                  <button
                    key={item.value}
                    id={optionId(index)}
                    type="button"
                    role="option"
                    aria-selected={index === active}
                    tabIndex={-1}
                    onClick={() => select(item)}
                    onMouseMove={() => setActive(index)}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm text-foreground",
                      index === active && "bg-muted",
                    )}
                  >
                    {item.icon && (
                      <span aria-hidden="true" className="text-muted-foreground">{item.icon}</span>
                    )}
                    <span className="flex-1">{item.label}</span>
                    {item.kbd && (
                      <Kbd>
                        {item.kbd}
                      </Kbd>
                    )}
                  </button>
                ))}
              </div>
            ))}
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export { CommandPalette, openCommandPalette };
