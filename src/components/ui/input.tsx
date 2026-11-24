"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/** What a Field tells the control inside it: the id its label points at, the note that describes it, and whether it's in error. */
type FieldInfo = { id: string; labelId?: string; describedBy?: string; invalid: boolean };
const FieldContext = React.createContext<FieldInfo | null>(null);

type ControlProps = { id?: string; "aria-describedby"?: string; "aria-invalid"?: React.AriaAttributes["aria-invalid"] };

/**
 * A control's props with what its Field adds: the label's id (so the label
 * names it), the helper or error as its description, and aria-invalid on an
 * error. The control's own props win. Outside a Field, nothing changes.
 */
function useFieldControl<P extends ControlProps>(props: P): P {
  const field = React.useContext(FieldContext);
  if (!field) return props;
  const describedBy = [props["aria-describedby"], field.describedBy].filter(Boolean).join(" ") || undefined;
  return { ...props, id: props.id ?? field.id, "aria-describedby": describedBy, "aria-invalid": props["aria-invalid"] ?? (field.invalid || undefined) };
}

function Input({ className, type, ...rest }: React.ComponentProps<"input">) {
  const props = useFieldControl(rest);
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-control w-full min-w-0 rounded-md border border-input bg-card px-3 py-1 text-sm text-foreground shadow-xs transition-colors outline-none",
        "placeholder:text-muted-foreground",
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40",
        "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/25",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

/** Multi-line input — same field styling as Input. */
function Textarea({ className, ...rest }: React.ComponentProps<"textarea">) {
  const props = useFieldControl(rest);
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-20 w-full min-w-0 resize-y rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground shadow-xs transition-colors outline-none",
        "placeholder:text-muted-foreground",
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40",
        "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/25",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "text-[13px] font-medium text-secondary-foreground",
        className,
      )}
      {...props}
    />
  );
}

/**
 * A labelled control with an optional helper or error. The label, the
 * control and the note are a grid, so a theme can move the label beside
 * the control, onto its top border or inside it (data-field on <html>).
 */
function Field({
  label,
  htmlFor,
  required,
  helper,
  error,
  children,
  className,
}: {
  label?: string;
  /** The control's id, so the label focuses it. */
  htmlFor?: string;
  required?: boolean;
  helper?: string;
  /** Validation message — replaces the helper and reads in destructive. */
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const noteId = React.useId();
  const autoId = React.useId();
  const id = htmlFor ?? autoId;
  const note = error ?? helper;
  const labelId = `${autoId}-label`;
  const info = React.useMemo<FieldInfo>(
    () => ({ id, labelId: label ? labelId : undefined, describedBy: note ? noteId : undefined, invalid: Boolean(error) }),
    [id, label, labelId, note, noteId, error],
  );
  return (
    <div data-slot="field" className={cn("grid min-w-0 gap-1.5", className)}>
      {label && (
        <Label data-slot="field-label" id={labelId} htmlFor={id}>
          {label}
          {required && (
            <span aria-hidden="true" className="ml-0.5 text-destructive">
              *
            </span>
          )}
        </Label>
      )}
      <div data-slot="field-control" className="relative min-w-0">
        <FieldContext.Provider value={info}>{children}</FieldContext.Provider>
      </div>
      {/* Linked to the control (aria-describedby); an error that appears is announced. */}
      <p id={noteId} data-slot="field-note" aria-live="polite" className={cn("text-xs empty:hidden", error ? "text-destructive" : "text-muted-foreground")}>
        {note}
      </p>
    </div>
  );
}

/** The Field around a control, if any: for controls that name themselves from its label (a trigger showing a value). */
const useField = () => React.useContext(FieldContext);

export { Input, Textarea, Label, Field, useFieldControl, useField };
