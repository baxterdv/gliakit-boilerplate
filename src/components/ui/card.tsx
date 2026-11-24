import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Sparkline } from "@/components/ui/chart";

const cardVariants = cva(
  // min-w-0: in a grid or a row a card takes the room it's given; long content
  // wraps or ends in an ellipsis inside it, never stretching it past its column.
  "min-w-0 rounded-lg bg-card text-card-foreground",
  {
    variants: {
      variant: {
        // default keeps the original hairline-border look (no regression)
        default: "border border-border",
        elevated: "border border-transparent shadow-lg",
        outline: "border-2 border-border",
        media: "overflow-hidden border border-border",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Card({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  );
}

/** Media strip for `variant="media"` cards — put it first inside the Card. */
function CardMedia({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-media"
      className={cn("aspect-[16/9] w-full bg-muted", className)}
      {...props}
    />
  );
}

function CardHeader({
  title,
  description,
  action,
  className,
}: {
  title: React.ReactNode;
  /** Supporting description text under the title. */
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-slot="card-header"
      // The title keeps at least 12rem: in a narrow card the action moves under it instead of squeezing it.
      className={cn("flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 pt-4", className)}
    >
      <div className="min-w-0 flex-[1_1_12rem]">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        {description && (
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-content" className={cn("p-5", className)} {...props} />
  );
}

/** Footer strip — right-aligned actions, divided from the body. */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center justify-end gap-2 border-t border-border px-5 py-3.5",
        className,
      )}
      {...props}
    />
  );
}

/**
 * KPI stat tile — label, value, delta pill and an optional sparkline. Mirrors
 * the Figma StatCard. The delta tone follows meaning, not direction: pass
 * `invert` for metrics where down is good (churn, latency, refunds).
 */
function StatCard({
  label,
  value,
  prefix,
  unit,
  delta,
  trend,
  invert = false,
  spark,
  hint,
  tone,
  className,
}: {
  label: string;
  value: string;
  /** Muted leading symbol, e.g. "€". */
  prefix?: string;
  /** Muted trailing unit, e.g. "%". */
  unit?: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
  invert?: boolean;
  spark?: number[];
  /** Small line under the value; defaults to "vs last month" when there's a delta. */
  hint?: string;
  /** The card's own colour: a wash of the brand, the brand fill, or the opposite mode (a dark card on a light page). */
  tone?: "tinted" | "brand" | "inverse";
  className?: string;
}) {
  const note = hint ?? (delta ? "vs last month" : undefined);
  const good = trend === "flat" || !trend ? null : (trend === "up") !== invert;
  const pill =
    good === null
      ? "bg-muted text-muted-foreground"
      : good
        ? "bg-diff-add/15 text-diff-add"
        : "bg-destructive/15 text-destructive";
  const arrow = trend === "up" ? "↑" : trend === "down" ? "↓" : "→";
  return (
    <Card data-card-tone={tone} className={cn("@container px-5 pt-4 pb-4 shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--foreground)_6%,transparent)]", className)}>
      <div className="flex min-h-[22px] items-center justify-between gap-2">
        <p className="font-mono text-eyebrow uppercase tracking-[0.15em] text-muted-foreground">
          {label}
        </p>
        {delta && (
          <span className={cn("shrink-0 rounded-full px-1.5 py-0.5 font-mono text-[11px] whitespace-nowrap tabular-nums", pill)}>
            {arrow} {delta.replace(/^[+-]/, "")}
          </span>
        )}
      </div>
      <div className="mt-2.5 flex items-end justify-between gap-3">
        <p className="font-heading text-[28px] leading-none font-semibold tracking-tight text-foreground tabular-nums">
          {prefix && <span className="mr-0.5 text-lg text-muted-foreground">{prefix}</span>}
          {value}
          {unit && <span className="ml-0.5 text-lg text-muted-foreground">{unit}</span>}
        </p>
        {/* The sparkline needs room beside the figure: a narrow card (four in a row on a small page) does without it. */}
        {spark && (
          <span className="hidden shrink-0 @min-[12rem]:block">
            <Sparkline data={spark} tone={good === null ? "muted" : good ? "success" : "destructive"} />
          </span>
        )}
      </div>
      {note && <p className="mt-2 text-xs text-muted-foreground">{note}</p>}
    </Card>
  );
}

export { Card, CardMedia, CardHeader, CardContent, CardFooter, StatCard, cardVariants };
