"use client";

import * as React from "react";
import { Check, RotateCw, Upload, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFiles: (files: File[]) => void;
  /** Passed to the file input, e.g. "image/*,.pdf". */
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  hint?: string;
  className?: string;
}

/** Drag-and-drop zone with click-to-browse. States: default, dragover, disabled. */
function FileUpload({
  onFiles,
  accept,
  multiple = true,
  disabled,
  hint = "PNG, JPG or PDF up to 10 MB",
  className,
}: FileUploadProps) {
  const [dragging, setDragging] = React.useState(false);

  const take = (list: FileList | null) => {
    if (!list || disabled) return;
    const files = Array.from(list);
    if (files.length) onFiles(multiple ? files : files.slice(0, 1));
  };

  return (
    <label
      data-slot="file-upload"
      data-dragging={dragging || undefined}
      aria-disabled={disabled || undefined}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDragging(true);
      }}
      // Moving onto the zone's own text or icon isn't leaving it.
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        take(e.dataTransfer.files);
      }}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-2.5 rounded-lg border-[1.5px] border-dashed border-input bg-card px-6 py-8 text-center transition-colors",
        "hover:border-primary/60 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-solid has-focus-visible:outline-primary-ink",
        "data-dragging:border-primary data-dragging:bg-primary/5",
        "aria-disabled:pointer-events-none aria-disabled:opacity-50",
        className,
      )}
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="sr-only"
        onChange={(e) => {
          take(e.target.files);
          e.target.value = "";
        }}
      />
      <span
        className={cn(
          "flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground",
          dragging && "bg-primary/15 text-primary-ink",
        )}
      >
        <Upload className="size-4" />
      </span>
      {dragging ? (
        <span className="text-sm font-medium text-primary-ink">Drop to upload</span>
      ) : (
        <span className="text-sm text-foreground">
          Drag files here or <span className="font-medium text-primary-ink">browse</span>
        </span>
      )}
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface FileItemProps {
  name: string;
  /** Size in bytes. */
  size: number;
  status: "uploading" | "complete" | "error";
  /** 0 to 100, shown while uploading. */
  progress?: number;
  error?: string;
  onRemove?: () => void;
  onRetry?: () => void;
  className?: string;
}

/** A file row: type badge, name, progress or result, and a remove or retry action. */
function FileItem({
  name,
  size,
  status,
  progress = 0,
  error = "Upload failed",
  onRemove,
  onRetry,
  className,
}: FileItemProps) {
  const ext = name.includes(".") ? name.split(".").pop()!.slice(0, 4).toUpperCase() : "FILE";
  return (
    <div
      data-slot="file-item"
      data-status={status}
      className={cn(
        "flex items-center gap-3 rounded-lg border border-border bg-card px-3.5 py-3",
        status === "error" && "border-destructive/60",
        className,
      )}
    >
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-md bg-muted font-mono text-[10px] font-medium text-muted-foreground",
          status === "error" && "bg-destructive/10 text-destructive",
        )}
      >
        {ext}
      </span>
      <div className="min-w-0 flex-1">
        {/* The name has the first line to itself; the size, progress or a failure's reason go under it. */}
        <p className="truncate text-sm font-medium text-foreground" title={name}>
          {name}
        </p>
        {status === "uploading" ? (
          <div className="mt-2 flex items-center gap-2">
            <div
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Uploading ${name}`}
              className="h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-muted"
            >
              <div
                className="h-full rounded-full bg-primary transition-[width]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="shrink-0 text-xs text-muted-foreground tabular-nums">{Math.round(progress)}%</span>
          </div>
        ) : status === "complete" ? (
          <p className="mt-0.5 truncate text-xs">
            <span className="text-diff-add">Uploaded</span>
            <span className="text-muted-foreground"> · {formatBytes(size)}</span>
          </p>
        ) : (
          <p role="alert" className="mt-0.5 text-xs [overflow-wrap:anywhere] text-destructive">
            {error}
            {/* The generic failure says what to do; a specific reason already does. */}
            {error === "Upload failed" && <span className="text-muted-foreground">. Check your connection and try again.</span>}
          </p>
        )}
      </div>
      {status === "complete" && !onRemove ? (
        <Check className="size-4 shrink-0 text-diff-add" aria-hidden="true" />
      ) : status === "error" && onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          aria-label={`Retry ${name}`}
          className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <RotateCw className="size-4" />
        </button>
      ) : onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${name}`}
          className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      ) : null}
    </div>
  );
}

export { FileUpload, FileItem, formatBytes };
