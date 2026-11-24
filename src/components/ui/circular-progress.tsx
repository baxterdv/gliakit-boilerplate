import * as React from "react";

import { cn } from "@/lib/utils";

/** The status in words, for screen readers (as in Progress; kept here, as this file has no "use client"). */
const STATUS_WORDS = { default: "", success: "good", warning: "warning", error: "problem" } as const;

const STATUS_STROKE = {
  default: "stroke-highlight",
  success: "stroke-diff-add",
  warning: "stroke-warning",
  error: "stroke-destructive",
} as const;

interface CircularProgressProps {
  /** 0–100. */
  value: number;
  size?: number;
  strokeWidth?: number;
  status?: keyof typeof STATUS_STROKE;
  /** Show the % label in the center. */
  showLabel?: boolean;
  /** What it measures ("Storage used"), for screen readers. */
  "aria-label"?: string;
  className?: string;
}

/** Radial progress ring — mirrors the Figma CircularProgress. */
function CircularProgress({
  value,
  size = 72,
  strokeWidth = 8,
  status = "default",
  showLabel = true,
  "aria-label": ariaLabel,
  className,
}: CircularProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-label={ariaLabel ?? "Progress"}
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`${Math.round(clamped)}%${STATUS_WORDS[status] ? `, ${STATUS_WORDS[status]}` : ""}`}
    >
      <svg width={size} height={size} aria-hidden="true" className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-muted"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn(
            "transition-[stroke-dashoffset] duration-500",
            STATUS_STROKE[status],
          )}
        />
      </svg>
      {showLabel && (
        <span className="absolute text-sm font-semibold text-foreground">
          {Math.round(clamped)}%
        </span>
      )}
    </div>
  );
}

export { CircularProgress };
