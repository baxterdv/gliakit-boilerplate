import * as React from "react";

import { cn } from "@/lib/utils";

interface StepperProps {
  steps: string[];
  /** Index of the current step (0-based). Earlier steps read as complete. */
  current: number;
  className?: string;
}

/**
 * Stepper — segmented progress with numbered labels. Complete and current
 * steps get a filled bar; upcoming steps a muted one. Mirrors the Figma
 * Stepper component.
 */
function Stepper({ steps, current, className }: StepperProps) {
  return (
    <ol data-slot="stepper" className={cn("flex w-full gap-6", className)}>
      {steps.map((label, i) => {
        const reached = i <= current;
        return (
          <li key={label} aria-current={i === current ? "step" : undefined} className="flex flex-1 flex-col gap-2.5">
            <span
              aria-hidden="true"
              className={cn(
                "h-1.5 w-full rounded-full",
                reached ? "bg-primary" : "bg-muted",
              )}
            />
            <span
              className={cn(
                "text-sm",
                i === current
                  ? "font-semibold text-foreground"
                  : reached
                    ? "font-medium text-foreground"
                    : "text-muted-foreground",
              )}
            >
              {i + 1}. {label}
              {/* The bars say it by colour; this says it in words. */}
              <span className="sr-only">{i < current ? ", completed" : i === current ? ", current step" : ""}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export { Stepper };
