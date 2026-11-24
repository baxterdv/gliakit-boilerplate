"use client";

import * as React from "react";
import { Popover } from "radix-ui";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { MonthGrid, sameDay } from "@/components/ui/date-picker";
import { useField, useFieldControl } from "@/components/ui/input";

export interface DateRange {
  from: Date;
  to: Date;
}

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

const PRESETS: { label: string; range: () => DateRange }[] = [
  { label: "Today", range: () => ({ from: startOfDay(new Date()), to: startOfDay(new Date()) }) },
  { label: "Last 7 days", range: () => ({ from: addDays(startOfDay(new Date()), -6), to: startOfDay(new Date()) }) },
  { label: "Last 30 days", range: () => ({ from: addDays(startOfDay(new Date()), -29), to: startOfDay(new Date()) }) },
  {
    label: "This month",
    range: () => {
      const t = new Date();
      return { from: new Date(t.getFullYear(), t.getMonth(), 1), to: startOfDay(t) };
    },
  },
  {
    label: "Last month",
    range: () => {
      const t = new Date();
      return { from: new Date(t.getFullYear(), t.getMonth() - 1, 1), to: new Date(t.getFullYear(), t.getMonth(), 0) };
    },
  },
  { label: "Last 90 days", range: () => ({ from: addDays(startOfDay(new Date()), -89), to: startOfDay(new Date()) }) },
  {
    label: "This quarter",
    range: () => {
      const t = new Date();
      return { from: new Date(t.getFullYear(), Math.floor(t.getMonth() / 3) * 3, 1), to: startOfDay(t) };
    },
  },
  {
    label: "Year to date",
    range: () => {
      const t = new Date();
      return { from: new Date(t.getFullYear(), 0, 1), to: startOfDay(t) };
    },
  },
];

function formatRange(range?: Partial<DateRange>) {
  if (!range?.from) return "";
  const short = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  if (!range.to) return short(range.from);
  return `${short(range.from)} - ${short(range.to)}, ${range.to.getFullYear()}`;
}

const dayCount = (r: DateRange) =>
  Math.round((startOfDay(r.to).getTime() - startOfDay(r.from).getTime()) / 86_400_000) + 1;

/** The same number of days just before the range: what "compare" sets it against. */
const previousPeriod = (r: DateRange): DateRange => ({ from: addDays(r.from, -dayCount(r)), to: addDays(r.from, -1) });

interface DateRangePickerProps {
  /** The trigger's id, for a label's htmlFor (inside a Field, its label's). */
  id?: string;
  /** Names the trigger where there's no visible label. */
  "aria-label"?: string;
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  placeholder?: string;
  className?: string;
  /** Whether the range is compared with the period before it (controlled). */
  compare?: boolean;
  /** Shows the "Compare to previous period" switch; called when Apply changes it. */
  onCompareChange?: (compare: boolean) => void;
  /** Shows the switch without a handler (a design preview). */
  comparable?: boolean;
  /** What's chosen before anyone picks: a preset's name ("Last 30 days") selects that preset, any other text is shown as is. */
  defaultLabel?: string;
}

/**
 * Date range picker: input trigger, presets (Custom when the days are
 * picked by hand), two months side by side, an optional "Compare to
 * previous period" switch, and Cancel / Apply. The first click sets the
 * start, the second sets the end. The trigger names the preset when one is
 * chosen ("Last 30 days") and the dates otherwise.
 */
function DateRangePicker({
  id: ownId,
  "aria-label": ariaLabel,
  value,
  onChange,
  placeholder = "Pick a date range",
  className,
  compare,
  onCompareChange,
  comparable,
  defaultLabel,
}: DateRangePickerProps) {
  const canCompare = comparable || Boolean(onCompareChange) || compare !== undefined;
  const [comparing, setComparing] = React.useState(compare ?? false);
  const compared = compare ?? comparing;
  const [compareDraft, setCompareDraft] = React.useState(compared);
  const [label, setLabel] = React.useState<string | null>(() => (value ? null : (defaultLabel ?? null)));
  const [open, setOpen] = React.useState(false);
  const [committed, setCommitted] = React.useState<DateRange | undefined>(() => value ?? PRESETS.find((p) => p.label === defaultLabel)?.range());
  const current = value ?? committed;
  const [draft, setDraft] = React.useState<Partial<DateRange>>(current ?? {});
  const [view, setView] = React.useState(() => {
    const base = current?.from ?? new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const [preset, setPreset] = React.useState<string | null>(null);

  const handleOpenChange = (next: boolean) => {
    if (next) {
      setDraft(current ?? {});
      setPreset(PRESETS.some((p) => p.label === label) ? label : null);
      setCompareDraft(compared);
    }
    setOpen(next);
  };

  const pick = (date: Date) => {
    setPreset(null);
    if (!draft.from || draft.to) return setDraft({ from: date });
    if (date < draft.from) return setDraft({ from: date, to: draft.from });
    setDraft({ from: draft.from, to: date });
  };

  const applyPreset = (p: (typeof PRESETS)[number]) => {
    const r = p.range();
    setPreset(p.label);
    setDraft(r);
    setView(new Date(r.from.getFullYear(), r.from.getMonth(), 1));
  };

  const apply = () => {
    if (!draft.from) return;
    const range = { from: draft.from, to: draft.to ?? draft.from };
    setCommitted(range);
    setLabel(preset);
    onChange?.(range);
    if (compareDraft !== compared) {
      setComparing(compareDraft);
      onCompareChange?.(compareDraft);
    }
    setOpen(false);
  };

  const dayClassName = (date: Date) => {
    const { from, to } = draft;
    const edge = sameDay(date, from) || sameDay(date, to);
    const inside = from && to && date > from && date < to;
    if (edge) return "bg-primary-strong font-medium text-primary-foreground";
    if (inside) return "bg-primary/12 text-foreground hover:bg-primary/20";
    if (sameDay(date, new Date())) return "border border-border text-foreground hover:bg-muted";
    return "text-foreground hover:bg-muted";
  };

  const months = [view, new Date(view.getFullYear(), view.getMonth() + 1, 1)];
  // The start, the end and the days between read as selected.
  const isSelected = (date: Date) => {
    const { from, to } = draft;
    return sameDay(date, from) || sameDay(date, to) || Boolean(from && to && date > from && date < to);
  };
  const field = useField();
  const control = useFieldControl({ id: ownId });
  const valueId = React.useId();

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger asChild>
        <button
          type="button"
          {...control}
          aria-labelledby={field?.labelId && !ariaLabel ? `${field.labelId} ${valueId}` : undefined}
          aria-label={ariaLabel}
          aria-haspopup="dialog"
          data-slot="date-range-trigger"
          className={cn(
            "flex h-control w-72 items-center justify-between gap-2 rounded-md border border-border bg-card px-3 text-sm transition-colors hover:bg-muted/40 data-[state=open]:border-ring focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-primary-ink",
            className,
          )}
        >
          {current || label ? (
            <span id={valueId} className="truncate text-foreground">{label ?? formatRange(current)}</span>
          ) : (
            <span id={valueId} className="truncate text-muted-foreground">{placeholder}</span>
          )}
          {canCompare && compared && <span className="shrink-0 text-muted-foreground">· vs previous</span>}
          <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={6}
          sticky="always"
          collisionPadding={16}
          // Focus the chosen preset (or the panel), not the first button, which would read as picked.
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            const panel = e.currentTarget as HTMLElement;
            (panel.querySelector<HTMLElement>("[aria-pressed=true]") ?? panel).focus();
          }}
          tabIndex={-1}
          className="z-50 max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg border border-border bg-card shadow-lg outline-none"
        >
          <div className="flex flex-col sm:flex-row">
            <div className="flex gap-0.5 overflow-x-auto border-b border-border p-2 sm:flex-col sm:border-r sm:border-b-0">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => applyPreset(p)}
                  aria-pressed={preset === p.label}
                  className={cn(
                    "shrink-0 rounded-md px-2.5 py-1.5 text-left text-sm whitespace-nowrap transition-colors sm:w-36",
                    preset === p.label
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  )}
                >
                  {p.label}
                </button>
              ))}
              <span
                aria-current={draft.from && !preset ? "true" : undefined}
                className={cn(
                  "shrink-0 rounded-md px-2.5 py-1.5 text-left text-sm whitespace-nowrap sm:mt-1 sm:w-36 sm:border-t sm:border-border sm:rounded-t-none sm:pt-2",
                  draft.from && !preset ? "bg-muted font-medium text-foreground" : "text-muted-foreground",
                )}
              >
                Custom
              </span>
            </div>
            <div className="flex gap-6 p-4">
              {months.map((m, i) => (
                <div key={i} className={cn("w-[276px]", i === 1 && "hidden md:block")}>
                  <div className="mb-3 flex h-7 items-center justify-between">
                    {i === 0 ? (
                      <button
                        type="button"
                        aria-label="Previous month"
                        onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
                        className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <ChevronLeft className="size-4" />
                      </button>
                    ) : (
                      <span className="size-7" />
                    )}
                    <span className="text-sm font-medium text-foreground">
                      {m.toLocaleString("en-US", { month: "long", year: "numeric" })}
                    </span>
                    <button
                      type="button"
                      aria-label="Next month"
                      onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
                      className={cn(
                        "flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                        i === 0 && "md:invisible",
                      )}
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                  <MonthGrid
                    year={m.getFullYear()}
                    month={m.getMonth()}
                    onPick={pick}
                    isSelected={isSelected}
                    dayClassName={dayClassName}
                  />
                </div>
              ))}
            </div>
          </div>
          {canCompare && (
            <label className="flex cursor-pointer items-center gap-3 border-t border-border px-4 py-3 text-sm text-foreground">
              <Switch checked={compareDraft} onCheckedChange={setCompareDraft} />
              <span className="flex-1">Compare to previous period</span>
              {compareDraft && draft.from && draft.to && (
                <span className="text-xs text-muted-foreground">vs {formatRange(previousPeriod(draft as DateRange))}</span>
              )}
            </label>
          )}
          <div className="flex items-center gap-2 border-t border-border px-4 py-3">
            <p className="flex-1 text-xs text-muted-foreground" aria-live="polite">
              {draft.from && draft.to
                ? `${formatRange(draft)} · ${dayCount(draft as DateRange)} ${dayCount(draft as DateRange) === 1 ? "day" : "days"}`
                : draft.from
                  ? "Pick an end date"
                  : "Pick a start date"}
            </p>
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={apply} disabled={!draft.from}>
              Apply
            </Button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export { DateRangePicker, previousPeriod };
