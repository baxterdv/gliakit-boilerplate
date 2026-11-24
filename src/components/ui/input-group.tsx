"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useFieldControl } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * An input with things attached inside its border: an icon, a unit, a
 * button. The group carries the field look (same as Input) and lights up
 * when the input inside is focused or invalid.
 */
function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      data-slot="input-group"
      className={cn(
        "flex h-control w-full min-w-0 items-center rounded-md border border-input bg-card text-sm shadow-xs transition-colors",
        "has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/40",
        "has-[[data-slot=input-group-control][aria-invalid=true]]:border-destructive has-[[data-slot=input-group-control][aria-invalid=true]]:ring-2 has-[[data-slot=input-group-control][aria-invalid=true]]:ring-destructive/25",
        "has-[[data-slot=input-group-control]:disabled]:opacity-50",
        "has-[[data-align=inline-start]]:[&>input]:pl-2 has-[[data-align=inline-end]]:[&>input]:pr-2",
        className,
      )}
      {...props}
    />
  );
}

/** The input itself, borderless inside the group. */
function InputGroupInput({ className, ...rest }: React.ComponentProps<"input">) {
  const props = useFieldControl(rest);
  return (
    <input
      data-slot="input-group-control"
      className={cn(
        "h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:pointer-events-none",
        className,
      )}
      {...props}
    />
  );
}

/** Icons, text or buttons at the start or end. Clicking it focuses the input. */
function InputGroupAddon({
  align = "inline-start",
  className,
  onClick,
  ...props
}: React.ComponentProps<"div"> & { align?: "inline-start" | "inline-end" }) {
  return (
    <div
      data-slot="input-group-addon"
      data-align={align}
      onClick={(e) => {
        onClick?.(e);
        if ((e.target as HTMLElement).closest("button")) return;
        e.currentTarget.parentElement?.querySelector<HTMLInputElement>("[data-slot=input-group-control]")?.focus();
      }}
      className={cn(
        "flex h-full shrink-0 cursor-text items-center gap-1.5 text-muted-foreground select-none [&_svg:not([class*='size-'])]:size-4",
        align === "inline-start" ? "order-first pl-3" : "order-last pr-1.5 has-[>span:last-child]:pr-3",
        className,
      )}
      {...props}
    />
  );
}

/** A unit or prefix such as "€" or ".com". */
function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

/** A small button inside the field: clear, copy, show password. */
function InputGroupButton({
  variant = "ghost",
  size = "icon-xs",
  type = "button",
  ...props
}: React.ComponentProps<typeof Button>) {
  return <Button data-slot="input-group-button" variant={variant} size={size} type={type} {...props} />;
}

export { InputGroup, InputGroupInput, InputGroupAddon, InputGroupText, InputGroupButton };
