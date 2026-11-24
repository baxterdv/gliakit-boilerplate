import * as React from "react";

import { cn } from "@/lib/utils";

/** A key cap for shortcuts: ⌘, K, esc. */
function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "inline-flex min-w-5 shrink-0 items-center justify-center gap-1 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] whitespace-nowrap text-muted-foreground select-none [&_svg:not([class*='size-'])]:size-3",
        className,
      )}
      {...props}
    />
  );
}

/** Keys pressed together, e.g. ⌘ + K. */
function KbdGroup({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  );
}

export { Kbd, KbdGroup };
