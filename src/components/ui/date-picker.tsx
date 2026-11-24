"use client";

import * as React from "react";
import { Popover } from "radix-ui";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { useField, useFieldControl } from "@/components/ui/input";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const WEEKDAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const sameDay = (a?: Date, b?: Date) =>
  !!a && !!b && a.toDateString() === b.toDateString();
const fullDate = (d: Date) => d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

/**
 * Weekday header + day cells for one month. Shared by Calendar and
 * DateRangePicker; `dayClassName` decides how each day looks and
 * `isSelected` what a screen reader hears (pressed). Each day reads as its
 * full date, today is marked, and the arrows move by day (left, right) and
 * week (up, down), Home and End to the month's ends; Tab leaves the grid in
 * one step.
 */
function MonthGrid({
  year,
  month,
  dayClassName,
  isSelected,
  onPick,
}: {
  year: number;
  month: number;
  dayClassName: (date: Date) => string;
  isSelected?: (date: Date) => boolean;
  onPick?: (date: Date) => void;
}) {
  const startDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  const today = new Date();
  // The day that takes Tab: the one moved to with the arrows, else the selected day, today, or the 1st.
  const [moved, setMoved] = React.useState<number | null>(null);
  const preferred = cells.find((d) => d && isSelected?.(d)) ?? cells.find((d) => d && sameDay(d, today));
  const focusDay = Math.min(moved ?? preferred?.getDate() ?? 1, daysInMonth);
  const days = React.useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: React.KeyboardEvent, day: number) => {
    const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
    const to = e.key === "Home" ? 1 : e.key === "End" ? daysInMonth : step ? day + step : null;
    if (to === null) return;
    e.preventDefault();
    const next = Math.max(1, Math.min(daysInMonth, to));
    setMoved(next);
    days.current[next]?.focus();
  };

  return (
    <>
      <div className="mb-1 grid grid-cols-7">
        {WEEKDAYS.map((d, i) => (
          <div
            key={i}
            className="flex h-6 items-center justify-center text-[11px] font-medium text-muted-foreground"
          >
            <span aria-hidden="true">{d}</span>
            <span className="sr-only">{WEEKDAY_NAMES[i]}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) =>
          date ? (
            <button
              key={i}
              ref={(el) => {
                days.current[date.getDate()] = el;
              }}
              type="button"
              aria-label={fullDate(date)}
              aria-pressed={isSelected ? isSelected(date) : undefined}
              aria-current={sameDay(date, today) ? "date" : undefined}
              tabIndex={date.getDate() === focusDay ? 0 : -1}
              onKeyDown={(e) => onKey(e, date.getDate())}
              onClick={() => onPick?.(date)}
              className={cn(
                "flex size-9 items-center justify-center rounded-md text-sm transition-colors",
                dayClassName(date),
              )}
            >
              {date.getDate()}
            </button>
          ) : (
            <div key={i} aria-hidden="true" className="size-9" />
          ),
        )}
      </div>
    </>
  );
}

/** Single-month calendar grid. Self-contained — no external date library. */
function Calendar({
  selected,
  onSelect,
}: {
  selected?: Date;
  onSelect?: (date: Date) => void;
}) {
  const [view, setView] = React.useState(() => selected ?? new Date());
  const year = view.getFullYear();
  const month = view.getMonth();
  const today = new Date();

  return (
    <div className="w-[280px] rounded-lg border border-border bg-card p-4 shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => setView(new Date(year, month - 1, 1))}
          className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ChevronLeft className="size-4" />
        </button>
        <span className="text-sm font-medium text-foreground">
          {view.toLocaleString("en-US", { month: "long", year: "numeric" })}
        </span>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => setView(new Date(year, month + 1, 1))}
          className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
      <MonthGrid
        year={year}
        month={month}
        onPick={onSelect}
        isSelected={(date) => sameDay(date, selected)}
        dayClassName={(date) =>
          sameDay(date, selected)
            ? "bg-primary-strong font-medium text-primary-foreground"
            : sameDay(date, today)
              ? "border border-border text-foreground hover:bg-muted"
              : "text-foreground hover:bg-muted"
        }
      />
    </div>
  );
}

interface DatePickerProps {
  /** The trigger's id, for a label's htmlFor (inside a Field, its label's). */
  id?: string;
  /** Names the trigger where there's no visible label. */
  "aria-label"?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  className?: string;
}

/** Date picker — input trigger + calendar popover. Single date. */
function DatePicker({
  id: ownId,
  "aria-label": ariaLabel,
  value,
  onChange,
  placeholder = "Pick a date",
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState<Date | undefined>(value);
  const date = value ?? internal;
  const field = useField();
  const control = useFieldControl({ id: ownId });
  const valueId = React.useId();

  const handleSelect = (d: Date) => {
    setInternal(d);
    onChange?.(d);
    setOpen(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          {...control}
          // Its label and the date, so a screen reader says "Due date, November 14, 2026", not only "Due date".
          aria-labelledby={field?.labelId && !ariaLabel ? `${field.labelId} ${valueId}` : undefined}
          aria-label={ariaLabel}
          aria-haspopup="dialog"
          data-slot="date-trigger"
          className={cn(
            "flex h-control w-60 items-center justify-between rounded-md border border-border bg-card px-3 text-sm transition-colors hover:bg-muted/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-primary-ink",
            className,
          )}
        >
          {date ? (
            <span id={valueId} className="text-foreground">
              {date.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          ) : (
            <span id={valueId} className="text-muted-foreground">{placeholder}</span>
          )}
          <CalendarIcon aria-hidden="true" className="size-4 text-muted-foreground" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content align="start" sideOffset={6} className="z-50">
          <Calendar selected={date} onSelect={handleSelect} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export { DatePicker, Calendar, MonthGrid, sameDay };
