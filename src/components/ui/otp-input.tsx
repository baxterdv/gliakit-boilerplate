"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  /** Fires once every slot is filled. */
  onComplete?: (value: string) => void;
  invalid?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  "aria-label"?: string;
}

/**
 * One-time code input: one box per digit, auto-advance, backspace to go back,
 * arrow keys to move, and paste fills every slot at once.
 */
function OTPInput({
  length = 6,
  value,
  onChange,
  onComplete,
  invalid,
  disabled,
  autoFocus,
  className,
  "aria-label": ariaLabel = "Verification code",
}: OTPInputProps) {
  const [internal, setInternal] = React.useState("");
  const code = (value ?? internal).slice(0, length);
  const refs = React.useRef<(HTMLInputElement | null)[]>([]);

  const commit = (next: string) => {
    const clean = next.replace(/\D/g, "").slice(0, length);
    if (value === undefined) setInternal(clean);
    onChange?.(clean);
    if (clean.length === length) onComplete?.(clean);
    return clean;
  };
  const focus = (i: number) => refs.current[Math.max(0, Math.min(i, length - 1))]?.focus();

  const onInput = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const digit = e.target.value.replace(/\D/g, "").slice(-1);
    if (!digit) return;
    // A box past the filled ones fills the next empty box: the code has no gaps, so the digit and the focus stay in step.
    const at = Math.min(i, code.length);
    const chars = code.padEnd(length, " ").split("");
    chars[at] = digit;
    commit(chars.join("").replace(/\s+$/, "").replace(/\s/g, ""));
    focus(at + 1);
  };

  const onKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (code[i]) commit(code.slice(0, i) + code.slice(i + 1));
      else if (i > 0) {
        commit(code.slice(0, i - 1) + code.slice(i));
        focus(i - 1);
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focus(i - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      focus(i + 1);
    }
  };

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = commit(e.clipboardData.getData("text"));
    focus(pasted.length);
  };

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      data-slot="otp-input"
      className={cn("flex items-center gap-1.5 sm:gap-2", className)}
    >
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          autoFocus={autoFocus && i === 0}
          maxLength={1}
          value={code[i] ?? ""}
          disabled={disabled}
          aria-label={`Digit ${i + 1}`}
          aria-invalid={invalid || undefined}
          onChange={(e) => onInput(i, e)}
          onKeyDown={(e) => onKeyDown(i, e)}
          onPaste={onPaste}
          onFocus={(e) => e.target.select()}
          className={cn(
            "h-12 w-10 rounded-md sm:h-13 sm:w-11 border border-border bg-card text-center font-heading text-lg font-semibold text-foreground shadow-xs transition-colors outline-none",
            "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30",
            "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
            "disabled:pointer-events-none disabled:opacity-50",
          )}
        />
      ))}
    </div>
  );
}

export { OTPInput };
