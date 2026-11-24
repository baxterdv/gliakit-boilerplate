"use client";

import * as React from "react";
import { createAvatar } from "@dicebear/core";
import * as lorelei from "@dicebear/lorelei";
import * as notionists from "@dicebear/notionists";

import { cn } from "@/lib/utils";
import { initials } from "@/lib/data";

const sizes = {
  xs: "size-6 text-[10px]",
  sm: "size-7 text-[11px]",
  md: "size-9 text-xs",
  lg: "size-12 text-sm",
  xl: "size-16 text-base",
} as const;

/*
  Avatars follow the theme's data-avatar attribute on <html>, like the
  other component styles: illustrated (default), playful, or initials
  (on a brand tint, on the brand fill, in a brand ring, or in neutral
  rounded squares).
  Faces are DiceBear's Notionists and Lorelei styles (CC0 art, MIT code),
  generated from the name, so a person keeps the same face everywhere.
*/
type AvatarStyle = "illustrated" | "playful" | "initials" | "solid" | "ring" | "square";

/** The initials styles; the brand fill pair, the brand ink and the theme's text keep their letters at AA. */
const INITIALS: Record<"initials" | "solid" | "ring" | "square", string> = {
  initials: "bg-primary/15 text-primary-ink",
  solid: "bg-primary-strong text-primary-foreground",
  ring: "bg-card text-primary-ink ring-[1.5px] ring-inset ring-primary-ink/60",
  square: "rounded-[30%] bg-foreground/10 text-foreground ring-1 ring-inset ring-border",
};

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-avatar"] });
  return () => observer.disconnect();
}
const readStyle = () => (document.documentElement.dataset.avatar as AvatarStyle | undefined) ?? "illustrated";
const serverStyle = (): AvatarStyle => "illustrated";

// One face per style and name, made once.
const faces = new Map<string, string>();
function face(style: "illustrated" | "playful", name: string) {
  const key = `${style}:${name}`;
  let uri = faces.get(key);
  if (!uri) {
    const options = { seed: name, scale: 110, translateY: 4 };
    uri = (style === "playful" ? createAvatar(lorelei, options) : createAvatar(notionists, options)).toDataUri();
    faces.set(key, uri);
  }
  return uri;
}

// Light backdrops behind the line-art faces, picked by name.
const TINTS = ["var(--primary)", "var(--signal-cyan)", "var(--signal-violet)", "var(--signal-orange)", "var(--signal-magenta)"];
function tint(name: string) {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return `color-mix(in oklch, ${TINTS[h % TINTS.length]} 32%, white)`;
}

/** A person's avatar: an illustrated face on a light tint, or their initials. */
function Avatar({
  name,
  size = "md",
  className,
}: {
  name: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const style = React.useSyncExternalStore(subscribe, readStyle, serverStyle);
  if (style === "initials" || style === "solid" || style === "ring" || style === "square") {
    return (
      <span
        data-slot="avatar"
        aria-hidden="true"
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-full font-mono font-medium select-none",
          INITIALS[style],
          sizes[size],
          className,
        )}
      >
        {initials(name)}
      </span>
    );
  }
  return (
    <span
      data-slot="avatar"
      aria-hidden="true"
      className={cn("inline-flex shrink-0 overflow-hidden rounded-full select-none", sizes[size], className)}
      style={{ background: tint(name) }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- a generated SVG data URI; next/image adds nothing here */}
      <img src={face(style, name)} alt="" className="size-full" draggable={false} />
    </span>
  );
}

export { Avatar };
