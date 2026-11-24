"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

/**
 * Breadcrumb — path navigation. Last item reads as the current page.
 *
 * In a narrow row the parent steps keep their whole label and the current page
 * gives way first, ending in an ellipsis; steps that still do not fit move to
 * the next line whole. Nothing breaks inside a word or runs out of the row.
 */
function Breadcrumb({
  items,
  className,
}: {
  /** Extra anchor props on an item (data attributes, onClick) go on its link. */
  items: ({ label: string; href?: string } & Omit<React.ComponentProps<"a">, "href" | "children">)[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" data-slot="breadcrumb" className={className}>
      <ol className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {items.map(({ label, href, ...rest }, i) => {
          const last = i === items.length - 1;
          // A deep path keeps its first step and the last two; the rest fold into a menu.
          const deep = items.length > 4;
          if (deep && i > 0 && i < items.length - 2) {
            if (i > 1) return null;
            return (
              <li key="more" className="flex shrink-0 items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger aria-label={`${items.length - 3} more levels`} className="grid size-6 place-items-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                    <MoreHorizontal className="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {items.slice(1, -2).map((it) => (
                      <DropdownMenuItem key={it.label} asChild>
                        <a href={it.href ?? "#"}>{it.label}</a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <span aria-hidden="true" className="text-muted-foreground/60">
                  /
                </span>
              </li>
            );
          }
          return (
            <li key={label} className={cn("flex items-center gap-2", last ? "min-w-[8ch] flex-1" : "max-w-full shrink-0")}>
              {last ? (
                <span aria-current="page" className="truncate font-medium text-foreground">
                  {label}
                </span>
              ) : (
                <>
                  <a
                    href={href ?? "#"}
                    {...rest}
                    className="min-w-0 truncate text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                  </a>
                  <span aria-hidden="true" className="shrink-0 text-muted-foreground/60">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Pagination — page controls with the active page in accent. */
function Pagination({
  page,
  pageCount,
  onPageChange,
  className,
}: {
  page: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
  className?: string;
}) {
  // Compact windowing: 1 … around current … last
  const pages: (number | "…")[] = [];
  for (let p = 1; p <= pageCount; p++) {
    if (p === 1 || p === pageCount || Math.abs(p - page) <= 1) pages.push(p);
    else if (pages[pages.length - 1] !== "…") pages.push("…");
  }

  const btn =
    "flex size-8 items-center justify-center rounded-md text-sm transition-colors";

  return (
    <nav aria-label="Pagination" data-slot="pagination" className={className}>
      <ul className="flex items-center gap-1">
        <li>
          <button
            type="button"
            aria-label="Previous page"
            disabled={page <= 1}
            onClick={() => onPageChange?.(page - 1)}
            className={cn(btn, "text-muted-foreground hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40")}
          >
            <ChevronLeft className="size-4" />
          </button>
        </li>
        {pages.map((p, i) => (
          <li key={i}>
            {p === "…" ? (
              <span className={cn(btn, "text-muted-foreground")}>…</span>
            ) : (
              <button
                type="button"
                aria-current={p === page ? "page" : undefined}
                onClick={() => onPageChange?.(p)}
                className={cn(
                  btn,
                  p === page
                    ? "bg-primary-strong font-medium text-primary-foreground"
                    : "text-foreground hover:bg-muted",
                )}
              >
                {p}
              </button>
            )}
          </li>
        ))}
        <li>
          <button
            type="button"
            aria-label="Next page"
            disabled={page >= pageCount}
            onClick={() => onPageChange?.(page + 1)}
            className={cn(btn, "text-muted-foreground hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40")}
          >
            <ChevronRight className="size-4" />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export { Breadcrumb, Pagination };
