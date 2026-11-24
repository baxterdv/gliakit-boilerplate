import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const iconBg = {
  info: "bg-primary",
  success: "bg-diff-add",
  warning: "bg-warning",
  error: "bg-destructive",
} as const;

const glyphs = { info: "i", success: "✓", warning: "!", error: "✕" } as const;

interface ToastProps extends React.ComponentProps<"div"> {
  variant?: keyof typeof iconBg;
  onDismiss?: () => void;
}

/**
 * Toast — transient notification with status icon, message, and dismiss.
 * Presentational; wire it to your notification state (or a portal) as needed.
 */
function Toast({
  variant = "info",
  onDismiss,
  className,
  children,
  ...props
}: ToastProps) {
  return (
    <div
      role="status"
      data-slot="toast"
      className={cn(
        "flex w-fit min-w-64 items-center gap-2.5 rounded-lg border border-border bg-card py-2.5 pr-2.5 pl-3 shadow-md",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white",
          iconBg[variant],
        )}
      >
        {glyphs[variant]}
      </span>
      <span className="flex-1 text-sm text-foreground">{children}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}

export { Toast };
