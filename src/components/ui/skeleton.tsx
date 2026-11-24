import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Pulsing placeholder while content loads. Size it like what it stands in
 * for. A foreground tint, not --muted, so it shows on cards as well as the page.
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden
      className={cn("animate-pulse rounded-md bg-foreground/10", className)}
      {...props}
    />
  );
}

export { Skeleton };
