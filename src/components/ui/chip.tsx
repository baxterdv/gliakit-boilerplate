import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[13px] font-medium whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        filled: "bg-muted text-muted-foreground",
        outline: "border border-border bg-card text-foreground",
      },
      selected: { true: "", false: "" },
    },
    compoundVariants: [
      { variant: "filled", selected: true, className: "bg-primary-strong text-primary-foreground" },
      { variant: "outline", selected: true, className: "border-primary text-primary-ink" },
    ],
    defaultVariants: { variant: "filled", selected: false },
  },
);

interface ChipProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof chipVariants> {
  /** Leading element (a dot, avatar, or icon). */
  icon?: React.ReactNode;
  /** Render a trailing dismiss button; called on click. */
  onDismiss?: () => void;
}

function Chip({
  className,
  variant,
  selected,
  icon,
  onDismiss,
  children,
  ...props
}: ChipProps) {
  return (
    <span
      data-slot="chip"
      data-selected={selected ? "true" : undefined}
      className={cn(chipVariants({ variant, selected }), className)}
      {...props}
    >
      {icon}
      {children}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          // Names what it removes ("Remove Design"), with a 20px target around the 12px icon.
          aria-label={typeof children === "string" ? `Remove ${children}` : "Remove"}
          className="-my-1 -mr-1.5 ml-0 grid size-5 place-items-center rounded-full opacity-70 transition-opacity hover:opacity-100"
        >
          <X className="size-3" aria-hidden="true" />
        </button>
      )}
    </span>
  );
}

export { Chip, chipVariants };
