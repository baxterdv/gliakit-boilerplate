"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { smoothPath, type Pt } from "@/components/ui/chart";

interface AreaChartProps {
  data: { label: string; value: number }[];
  /** Optional previous period, drawn as a dashed muted line. */
  compare?: number[];
  height?: number;
  /** Shown around values in the tooltip and axis, e.g. "€" and "k". */
  prefix?: string;
  suffix?: string;
  seriesLabel?: string;
  compareLabel?: string;
  /** Points from this index on are a forecast: a dashed line over a shaded band. */
  forecastFrom?: number;
  /** A level to stay above or below (a buffer, a target), as a dashed line with its label. */
  baseline?: { value: number; label?: string };
  /** Notes on points ("Payday", "Launch"), as a dot with a small label. */
  markers?: { index: number; label: string }[];
  /** Grow to the height the container gives it (at least `height`), e.g. in a card stretched beside a taller one. */
  fill?: boolean;
  className?: string;
}

const W = 600;

/**
 * AreaChart — smooth line over a soft violet area, dashed gridlines, and a
 * hover crosshair with a tooltip (defaults to the latest point). Pure SVG +
 * HTML overlay, no chart library; scales to its container width.
 */
function AreaChart({
  data,
  compare,
  height = 220,
  prefix = "",
  suffix = "",
  seriesLabel = "This period",
  compareLabel = "Previous period",
  forecastFrom,
  baseline,
  markers,
  fill = false,
  className,
}: AreaChartProps) {
  const id = React.useId().replace(/:/g, "");
  const empty = data.length === 0;
  const [hovered, setActive] = React.useState(data.length - 1);
  // The point stays on the data it has: a shorter series (another view, new data) can't leave it past the end.
  const active = Math.max(0, Math.min(hovered, data.length - 1));
  const H = height;
  const all = [...data.map((d) => d.value), ...(compare ?? []), ...(baseline ? [baseline.value] : [])];
  const max = Math.max(...all) * (markers?.length ? 1.24 : 1.12);
  const min = Math.min(0, ...all);
  const x = (i: number) => (i * W) / Math.max(1, data.length - 1);
  const y = (v: number) => H - 6 - ((v - min) / (max - min || 1)) * (H - 22);
  const pts: Pt[] = data.map((d, i) => [x(i), y(d.value)]);
  // With a forecast, the solid line and the area stop where it starts; the rest is dashed.
  const split = forecastFrom !== undefined && forecastFrom > 0 && forecastFrom < data.length ? forecastFrom : null;
  const line = smoothPath(split === null ? pts : pts.slice(0, split + 1));
  const forecastLine = split === null ? null : smoothPath(pts.slice(split));
  const endX = split === null ? W : x(split);
  const area = `${line} L${endX},${H} L0,${H} Z`;
  const comparePts: Pt[] | null = compare ? compare.map((v, i) => [x(i), y(v)]) : null;
  const ticks = [0.25, 0.5, 0.75].map((f) => min + (max - min) * (1 - f));
  const fmt = (v: number) => `${prefix}${Number.isInteger(v) ? v.toLocaleString("en-GB") : v.toFixed(1)}${suffix}`;
  // Axis labels stay short: 44016 -> 44k (unless the series already has a unit).
  const tick = (v: number) =>
    !suffix && Math.abs(v) >= 10000
      ? `${prefix}${Math.abs(v) >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : `${Math.round(v / 1000)}k`}`
      : fmt(v);

  // The y-axis column fits its longest label ("81/100", "€1.2M"), at least the kit's 40px.
  const axis = Math.max(40, Math.ceil(Math.max(...ticks.map((t) => tick(Math.round(t)).length)) * 6.8) + 8);

  // No points (yet): the chart's space, so the card keeps its shape.
  if (empty) return <div data-slot="area-chart" className={cn(fill && "flex-1", className)} style={{ minHeight: height }} />;

  const a = data[active] ?? { label: "", value: 0 };
  const pctX = (x(active) / W) * 100;
  const pctY = (y(a.value) / H) * 100;
  const delta = compare && compare[active] !== undefined ? a.value - compare[active] : null;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const i = Math.round(((e.clientX - r.left) / r.width) * (data.length - 1));
    setActive(Math.max(0, Math.min(data.length - 1, i)));
  };

  return (
    <div data-slot="area-chart" className={cn("flex flex-col gap-2", className)}>
      {/* The points behind the line, for screen readers (the drawing itself is hidden from them). */}
      <table className="sr-only">
        <thead>
          <tr>
            <th scope="col">Period</th>
            <th scope="col">{seriesLabel}</th>
            {compare && <th scope="col">{compareLabel}</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <th scope="row">
                {d.label}
                {split !== null && i >= split ? " (forecast)" : ""}
              </th>
              <td>{fmt(d.value)}</td>
              {compare && <td>{compare[i] !== undefined ? fmt(compare[i]) : "–"}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={cn("relative", fill && "flex-1")} style={fill ? { minHeight: height } : { height }}>
        {/* y-axis labels */}
        {ticks.map((t, i) => (
          <span
            key={i}
            className="pointer-events-none absolute left-0 -translate-y-1/2 font-mono text-[11px] text-muted-foreground"
            style={{ top: `${(0.25 + i * 0.25) * 100}%` }}
          >
            {tick(Math.round(t))}
          </span>
        ))}
        <div
          className="absolute inset-y-0 right-0"
          style={{ left: axis }}
          onPointerMove={onMove}
          onPointerLeave={() => setActive(data.length - 1)}
        >
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" style={{ stopColor: "var(--chart-from)", stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: "var(--chart-from)", stopOpacity: 0 }} />
              </linearGradient>
              <linearGradient id={`${id}-line`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" style={{ stopColor: "var(--chart-from)" }} />
                <stop offset="100%" style={{ stopColor: "var(--chart-to)" }} />
              </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75].map((f) => (
              <line
                key={f}
                data-chart-grid=""
                x1="0"
                x2={W}
                y1={H * f}
                y2={H * f}
                stroke="var(--border)"
                strokeDasharray="2 4"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {comparePts && (
              <path
                d={smoothPath(comparePts)}
                stroke="var(--muted-foreground)"
                strokeOpacity="0.5"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                vectorEffect="non-scaling-stroke"
              />
            )}
            {/* The forecast's band: a quiet wash of the text colour, so it reads in any theme (never a warning tint). */}
            {split !== null && <rect x={endX} y="0" width={W - endX} height={H} fill="var(--foreground)" fillOpacity="0.05" />}
            {baseline && (
              <line x1="0" x2={W} y1={y(baseline.value)} y2={y(baseline.value)} stroke="var(--muted-foreground)" strokeOpacity="0.75" strokeDasharray="6 4" vectorEffect="non-scaling-stroke" />
            )}
            <path data-chart-area="" d={area} fill={`url(#${id}-area)`} />
            {forecastLine && (
              <path d={forecastLine} stroke="var(--chart-to)" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" />
            )}
            <path
              data-chart-line=""
              d={line}
              stroke={`url(#${id}-line)`}
              strokeWidth="2.25"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1={x(active)}
              x2={x(active)}
              y1={y(a.value)}
              y2={H}
              stroke="var(--chart-to)"
              strokeOpacity="0.4"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* notes on points, the baseline's label and the forecast's (HTML so they never stretch) */}
          {markers?.map((m) =>
            data[m.index] ? (
              <span key={m.index} className="pointer-events-none absolute flex -translate-x-1/2 flex-col items-center" style={{ left: `${(x(m.index) / W) * 100}%`, top: `${(y(data[m.index].value) / H) * 100}%` }}>
                {/* A narrow chart keeps the dots and drops the labels, which would overlap each other and the tooltip. */}
                <span className="mb-1 -translate-y-full rounded-full border border-border bg-card px-1.5 py-0.5 font-mono text-[10px] whitespace-nowrap text-foreground @max-sm:hidden">{m.label}</span>
                <span className="absolute top-0 size-2 -translate-y-1/2 rounded-full bg-[var(--chart-to)] ring-2 ring-card" />
              </span>
            ) : null,
          )}
          {baseline?.label && (
            // At the line's start: the latest point's tooltip sits at its end.
            <span className="pointer-events-none absolute left-0 -translate-y-full pb-0.5 font-mono text-[10px] text-muted-foreground" style={{ top: `${(y(baseline.value) / H) * 100}%` }}>
              {baseline.label}
            </span>
          )}
          {split !== null && (
            <span className="pointer-events-none absolute bottom-1 right-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Forecast</span>
          )}

          {/* active point + tooltip (HTML so it never stretches) */}
          <span
            className="pointer-events-none absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--chart-to)] bg-card shadow-[0_0_0_4px_color-mix(in_oklch,var(--chart-to)_20%,transparent)]"
            style={{ left: `${pctX}%`, top: `${pctY}%` }}
          />
          <div
            role="status"
            className={cn(
              "pointer-events-none absolute rounded-md border border-border bg-popover px-2.5 py-1.5 whitespace-nowrap shadow-md",
              // flip below the point when it sits near the top edge
              pctY < 35 ? "translate-y-[14px]" : "-translate-y-[calc(100%+14px)]",
              pctX > 80 ? "-translate-x-full" : pctX < 20 ? "" : "-translate-x-1/2",
            )}
            style={{ left: `${pctX}%`, top: `${pctY}%` }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">{a.label}</p>
            <p className="font-heading text-sm font-semibold tabular-nums text-foreground">
              {fmt(a.value)}
              {delta !== null && (
                <span className={cn("ml-1.5 font-mono text-[11px] font-normal", delta >= 0 ? "text-diff-add" : "text-destructive")}>
                  {delta >= 0 ? "↑" : "↓"} {fmt(Math.abs(delta))}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* x-axis + legend */}
      <div className="flex justify-between font-mono text-[11px] uppercase text-muted-foreground" style={{ paddingLeft: axis }}>
        {data.map((d, i) => (
          <span key={i} className={cn(i % 2 === 1 && "@max-sm:hidden")}>
            {d.label}
          </span>
        ))}
      </div>
      {compare && (
        <div className="flex items-center gap-4 text-xs text-muted-foreground" style={{ paddingLeft: axis }}>
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-3 rounded-full bg-[image:var(--gradient-signal)]" />
            {seriesLabel}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-0 w-3 border-t border-dashed border-muted-foreground" />
            {compareLabel}
          </span>
        </div>
      )}
    </div>
  );
}

export { AreaChart };
