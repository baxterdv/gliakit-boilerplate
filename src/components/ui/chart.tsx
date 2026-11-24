"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/** Series colours, from the theme's chart palette (--chart-1…5). */
const SERIES = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];
const seriesColor = (i: number) => SERIES[i % SERIES.length];

/** 44016 -> 44k, 1.2M; small numbers as they are. */
function short(v: number, prefix = "", suffix = "") {
  const a = Math.abs(v);
  const n = a >= 1e6 ? `${(a / 1e6).toFixed(1)}M` : a >= 1e4 ? `${Math.round(a / 1000)}k` : Number.isInteger(a) ? a.toLocaleString("en-GB") : a.toFixed(1);
  return `${v < 0 ? "−" : ""}${prefix}${n}${suffix}`;
}

interface BarChartProps {
  /** One value per column, or one per series (`values`) for grouped, stacked and diverging bars. */
  data: { label: string; value?: number; values?: number[] }[];
  /** Series names, in the order of `values`; drawn as a legend when there are two or more. */
  series?: string[];
  /** grouped: side by side. stacked: on top of each other. diverging: positives up, negatives down from a zero line (in and out, gains and losses). */
  mode?: "grouped" | "stacked" | "diverging";
  height?: number;
  /** Around the numbers in the tooltip and axis, e.g. "€" and "k". */
  prefix?: string;
  suffix?: string;
  /** Index of the emphasised column (one series only); defaults to the largest. */
  highlightIndex?: number;
  /** Grow to the height the container gives it (at least `height`), e.g. in a card stretched beside a taller one. */
  fill?: boolean;
  className?: string;
}

/**
 * BarChart — columns in pure CSS, no chart library. One series keeps the
 * kit's look (the largest bar in the signature gradient); several series
 * draw in the theme's chart palette, grouped, stacked or diverging around a
 * zero line, with a y-axis, a legend and a hover tooltip.
 */
function BarChart({ data, series, mode = "grouped", height = 176, prefix = "", suffix = "", highlightIndex, fill = false, className }: BarChartProps) {
  const cols = data.map((d) => d.values ?? [d.value ?? 0]);
  const n = Math.max(1, ...cols.map((c) => c.length));
  const multi = n > 1;
  const diverging = mode === "diverging";
  // The axis range: stacks sum, groups take the largest, diverging sums each sign.
  const tops = cols.map((c) => (mode === "stacked" ? c.reduce((a, v) => a + Math.abs(v), 0) : Math.max(0, ...c.filter((v) => diverging ? v >= 0 : true).map(Math.abs))));
  const bottoms = cols.map((c) => (diverging ? c.filter((v) => v < 0).reduce((a, v) => a + v, 0) : 0));
  const max = Math.max(1, ...tops);
  const min = Math.min(0, ...bottoms);
  const span = max - min || 1;
  const zero = (max / span) * 100;
  // A bar's share of the plot above the zero line, or below it.
  const up = (v: number) => (Math.abs(v) / max) * 100;
  const down = (v: number) => (Math.abs(v) / (-min || 1)) * 100;
  const hi = multi ? -1 : (highlightIndex ?? cols.findIndex((c) => c[0] === Math.max(...cols.map((x) => x[0]))));
  const [active, setActive] = React.useState<number | null>(null);
  const ticks = diverging ? [max, 0, min] : [max, max / 2, 0];
  const fmt = (v: number) => short(v, prefix, suffix);
  // The y-axis column fits its longest label ("€120k", "90/100"), at least 40px.
  const axis = Math.max(40, Math.ceil(Math.max(...ticks.map((t) => fmt(Math.round(t)).length)) * 6.8) + 8);

  return (
    <div data-slot="bar-chart" className={cn("flex flex-col gap-2", className)}>
      {/* The numbers behind the bars, for screen readers (the bars themselves are hidden from them). */}
      <table className="sr-only">
        <thead>
          <tr>
            <th scope="col">Label</th>
            {(multi && series ? series.slice(0, n) : ["Value"]).map((s) => (
              <th key={s} scope="col">{s}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <th scope="row">{d.label}</th>
              {cols[i].map((v, k) => (
                <td key={k}>{`${v < 0 ? "−" : ""}${prefix}${Math.abs(v).toLocaleString("en-GB")}${suffix}`}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={cn("relative", fill && "flex-1")} style={fill ? { minHeight: height } : { height }}>
        {ticks.map((t, i) => {
          const top = ((max - t) / span) * 100;
          return (
            <React.Fragment key={i}>
              <span className="pointer-events-none absolute left-0 -translate-y-1/2 font-mono text-[11px] text-muted-foreground" style={{ top: `${top}%` }}>
                {fmt(Math.round(t))}
              </span>
              <span aria-hidden="true" data-chart-grid="" className={cn("pointer-events-none absolute right-0 border-t", t === 0 && diverging ? "border-muted-foreground/40" : "border-dashed border-border")} style={{ top: `${top}%`, left: axis }} />
            </React.Fragment>
          );
        })}
        <div className="absolute inset-y-0 right-0 flex items-stretch gap-2" style={{ left: axis }} onPointerLeave={() => setActive(null)}>
          {cols.map((c, i) => (
            <div key={i} className="relative min-w-0 flex-1" onPointerEnter={() => setActive(i)}>
              {/* the column's plot: positives stack up from the zero line, negatives down */}
              {mode === "grouped" ? (
                <div className="absolute inset-x-0 flex items-end gap-px" style={{ top: 0, height: `${zero}%` }}>
                  {c.map((v, k) => (
                    <div
                      key={k}
                      // Bars outside the highlight: a hatched theme draws them hatched (globals.css).
                      data-chart-rest={!multi && i !== hi ? "" : undefined}
                      data-chart-bar=""
                      className={cn("min-w-0 flex-1 rounded-t-md", !multi && (i === hi ? "bg-[image:var(--gradient-signal-135)]" : "bg-highlight/40"))}
                      style={{ height: `${up(v)}%`, ...(multi && { background: seriesColor(k) }) }}
                    />
                  ))}
                </div>
              ) : (
                <>
                  <div className="absolute inset-x-0 flex flex-col-reverse" style={{ top: 0, height: `${zero}%`, justifyContent: "flex-start" }}>
                    {c.map((v, k) =>
                      diverging && v < 0 ? null : (
                        <div key={k} className="w-full first:rounded-b-sm last:rounded-t-md" style={{ height: `${up(v)}%`, background: seriesColor(k), marginTop: 1 }} />
                      ),
                    )}
                  </div>
                  {diverging && (
                    <div className="absolute inset-x-0 flex flex-col" style={{ top: `${zero}%`, bottom: 0 }}>
                      {c.map((v, k) =>
                        v < 0 ? <div key={k} className="w-full first:rounded-t-sm last:rounded-b-md" style={{ height: `${down(v)}%`, background: seriesColor(k), marginTop: 1 }} /> : null,
                      )}
                    </div>
                  )}
                </>
              )}
              {active === i && (
                <div
                  role="status"
                  className={cn(
                    "pointer-events-none absolute top-0 z-10 rounded-md border border-border bg-popover px-2.5 py-1.5 whitespace-nowrap shadow-md",
                    i > cols.length * 0.7 ? "right-0" : i < cols.length * 0.3 ? "left-0" : "left-1/2 -translate-x-1/2",
                  )}
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">{data[i].label}</p>
                  {c.map((v, k) => (
                    <p key={k} className="flex items-center gap-1.5 font-heading text-sm font-semibold text-foreground tabular-nums">
                      {multi && <span className="size-2 rounded-full" style={{ background: seriesColor(k) }} />}
                      {multi && series?.[k] && <span className="font-sans text-xs font-normal text-muted-foreground">{series[k]}</span>}
                      {fmt(v)}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 font-mono text-[10px] uppercase text-muted-foreground" style={{ paddingLeft: axis }}>
        {data.map((d, i) => (
          <span key={i} className="min-w-0 flex-1 truncate text-center">
            {d.label}
          </span>
        ))}
      </div>
      {multi && series && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground" style={{ paddingLeft: axis }}>
          {series.slice(0, n).map((s, k) => (
            <span key={s} className="flex items-center gap-1.5">
              <span className="size-2 rounded-full" style={{ background: seriesColor(k) }} />
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/** Horizontal progress bar with label + percentage. */
function ProgressRow({
  label,
  pct,
  className,
}: {
  label: string;
  pct: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="w-24 shrink-0 text-sm text-muted-foreground">
        {label}
      </span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-highlight"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-10 shrink-0 text-right font-mono text-xs text-muted-foreground">
        {pct}%
      </span>
    </div>
  );
}

type Pt = [number, number];

/** Smooth SVG path through points (Catmull-Rom converted to cubic Béziers). */
function smoothPath(pts: Pt[]) {
  if (!pts.length) return "";
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
  }
  return d;
}

/**
 * Sparkline — a tiny trend for stat tiles, table rows and sidebars: a line,
 * a line over a soft area, or small bars. Tone follows meaning: success when
 * the trend is good, destructive when it is bad. `stretch` fills its box.
 */
function Sparkline({
  data,
  kind = "line",
  tone = "primary",
  color,
  width = 72,
  height = 26,
  stretch = false,
  className,
}: {
  data: number[];
  kind?: "line" | "area" | "bars";
  tone?: "primary" | "success" | "destructive" | "muted";
  /** Any CSS colour, e.g. "var(--chart-2)"; overrides the tone. */
  color?: string;
  width?: number;
  height?: number;
  /** Fills the parent's width and height (set them with classes) instead of its own size. */
  stretch?: boolean;
  className?: string;
}) {
  const max = Math.max(...data);
  const min = Math.min(kind === "bars" ? 0 : Infinity, ...data);
  const pts: Pt[] = data.map((v, i) => [
    (i * width) / Math.max(1, data.length - 1),
    height - 2 - ((v - min) / (max - min || 1)) * (height - 4),
  ]);
  const stroke =
    color ??
    {
      primary: "var(--highlight, var(--primary))",
      success: "var(--diff-add)",
      destructive: "var(--destructive)",
      muted: "var(--muted-foreground)",
    }[tone];
  const line = smoothPath(pts);
  const bar = (width / data.length) * 0.62;
  return (
    <svg
      aria-hidden="true"
      width={stretch ? undefined : width}
      height={stretch ? undefined : height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio={stretch ? "none" : undefined}
      fill="none"
      className={cn("shrink-0", stretch && "h-full w-full", className)}
    >
      {kind === "bars" ? (
        data.map((v, i) => {
          const h = ((v - min) / (max - min || 1)) * (height - 4);
          return <rect key={i} x={(i * width) / data.length + ((width / data.length) - bar) / 2} y={height - 2 - h} width={bar} height={Math.max(1, h)} rx={1} fill={stroke} fillOpacity={i === data.length - 1 ? 1 : 0.45} />;
        })
      ) : (
        <>
          {kind === "area" && <path d={`${line} L${width},${height} L0,${height} Z`} fill={stroke} fillOpacity="0.14" />}
          <path d={line} stroke={stroke} strokeWidth="1.5" strokeLinecap="round" vectorEffect={stretch ? "non-scaling-stroke" : undefined} />
        </>
      )}
    </svg>
  );
}

/**
 * Rings — concentric progress rings, one per item (tasks done of 8, focus
 * hours of 2): the first item is the outer ring. Each ring is its value over
 * its own max, in the theme's chart palette unless the item sets a colour.
 */
function Rings({
  items,
  size = 120,
  thickness = 10,
  gap = 4,
  children,
  className,
}: {
  items: { label: string; value: number; max?: number; color?: string }[];
  size?: number;
  thickness?: number;
  gap?: number;
  /** Shown in the middle. */
  children?: React.ReactNode;
  className?: string;
}) {
  const label = items.map((it) => `${it.label}: ${it.value} of ${it.max ?? 100}`).join(", ");
  // The clear circle inside the innermost ring; what sits in the middle keeps to the width that fits in it.
  const shown = items.filter((_, i) => size / 2 - thickness / 2 - i * (thickness + gap) > 0).length;
  const inner = Math.max(0, size - 2 * shown * thickness - 2 * Math.max(0, shown - 1) * gap);
  return (
    <div role="img" aria-label={label} className={cn("relative grid shrink-0 place-items-center", className)} style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 -rotate-90" aria-hidden="true">
        {items.map((it, i) => {
          const r = size / 2 - thickness / 2 - i * (thickness + gap);
          if (r <= 0) return null;
          const p = Math.max(0, Math.min(1, it.value / (it.max || 100)));
          const color = it.color ?? seriesColor(i);
          return (
            <g key={it.label}>
              <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={thickness} stroke={color} strokeOpacity="0.18" />
              <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={thickness} strokeLinecap="round" stroke={color} pathLength={100} strokeDasharray={`${p * 100} 100`} />
            </g>
          );
        })}
      </svg>
      {children && (
        <div className="relative text-center text-balance" style={{ maxWidth: Math.round(inner * 0.82) }}>
          {children}
        </div>
      )}
    </div>
  );
}

export { BarChart, ProgressRow, Rings, Sparkline, seriesColor, smoothPath, type Pt };
