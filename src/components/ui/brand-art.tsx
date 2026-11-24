import * as React from "react";

import { cn } from "@/lib/utils";

/*
  Image placeholders in the theme's colours: covers, thumbnails and
  banners without image files. By default a quiet one: a soft tint of the
  brand (or a signal colour, by seed) with a small picture glyph, so a
  layout reads as "an image goes here" without the art competing with it.
  The same seed always gives the same tint, and a new brand colour repaints
  every placeholder. When the name (or a hint, like "Instagram post · 4:5")
  says what the item is, the placeholder draws a small mock-up of it
  instead of the glyph: a slide, a doc page, a post, a video, a poster, a
  logo, a site, a sheet, a board, an email or a photo, in the brand's
  colours. Four bolder designs (soft orbs, waves, geometric blocks, rings)
  remain for when one is asked for.
*/

export const ART_KINDS = ["placeholder", "orbs", "waves", "blocks", "rings"] as const;
type ArtKind = (typeof ART_KINDS)[number];

// The brand first, then the signal colours, so most covers lead with the brand.
const ACCENTS = ["var(--primary)", "var(--signal-cyan)", "var(--signal-violet)", "var(--signal-orange)", "var(--signal-magenta)"];

/** Small seeded random numbers (mulberry32), so art is stable across renders. */
function seeded(seed: string) {
  let h = 1779033703;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 3432918353) >>> 0;
  return () => {
    h = (h + 0x6d2b79f5) >>> 0;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const mix = (color: string, pct: number, other = "black") => `color-mix(in oklch, ${color} ${pct}%, ${other})`;

function shapes(kind: Exclude<ArtKind, "placeholder">, rand: () => number, a: string, b: string) {
  const r = (min: number, max: number) => min + rand() * (max - min);
  switch (kind) {
    case "orbs":
      return (
        <>
          <circle cx={r(20, 80)} cy={r(10, 60)} r={r(45, 70)} style={{ fill: a, opacity: 0.85 }} />
          <circle cx={r(120, 190)} cy={r(40, 100)} r={r(40, 65)} style={{ fill: b, opacity: 0.75 }} />
          <circle cx={r(80, 140)} cy={r(-10, 30)} r={r(20, 35)} style={{ fill: "white", opacity: 0.35 }} />
        </>
      );
    case "waves": {
      const wave = (y: number, amp: number) => {
        const p = r(0, 40);
        return `M0 ${y} C ${50 + p} ${y - amp}, ${90 + p} ${y + amp}, 200 ${y - amp / 2} L200 100 L0 100 Z`;
      };
      return (
        <>
          <path d={wave(r(30, 45), r(18, 30))} style={{ fill: a, opacity: 0.55 }} />
          <path d={wave(r(55, 65), r(14, 24))} style={{ fill: b, opacity: 0.7 }} />
          <path d={wave(r(75, 85), r(10, 18))} style={{ fill: a }} />
        </>
      );
    }
    case "blocks": {
      const x = r(20, 70);
      return (
        <>
          <rect x={x} y={r(15, 35)} width={r(40, 60)} height="100" rx="4" style={{ fill: a }} />
          <circle cx={x + r(70, 100)} cy={r(30, 55)} r={r(18, 26)} style={{ fill: b }} />
          <path d={`M${x + 50} 100 A 40 40 0 0 1 ${x + 130} 100 Z`} style={{ fill: "white", opacity: 0.85 }} />
          <rect x={r(150, 175)} y={r(8, 20)} width="14" height="14" rx="2" style={{ fill: "white", opacity: 0.5 }} transform={`rotate(${r(0, 45)} 170 20)`} />
        </>
      );
    }
    case "rings": {
      const cx = r(120, 170);
      const cy = r(30, 70);
      return (
        <>
          {[70, 52, 34, 16].map((radius, i) => (
            <circle key={radius} cx={cx} cy={cy} r={radius} style={{ fill: "none", stroke: i % 2 ? b : a, strokeWidth: 9, opacity: 0.9 - i * 0.12 }} />
          ))}
          <circle cx={r(20, 60)} cy={r(60, 85)} r={r(6, 10)} style={{ fill: "white", opacity: 0.6 }} />
        </>
      );
    }
  }
}

/** What an item is, read from its name and hint: the mock-up drawn for it. */
type Mock = "slides" | "cv" | "doc" | "post" | "story" | "video" | "poster" | "logo" | "website" | "sheet" | "board" | "email" | "photo";
const MOCK_RULES: [RegExp, Mock][] = [
  [/\b(cv|resume|résumé)\b/i, "cv"],
  [/presentation|\bslides?\b|\bdeck\b|keynote|pitch/i, "slides"],
  [/\b(reels?|stor(y|ies)|tiktok|shorts?|9:16)\b/i, "story"],
  [/instagram|social|\bposts?\b|4:5|1:1|tweet|linkedin|facebook|pinterest/i, "post"],
  [/poster|flyer|brochure|magazine|\bcover\b|lookbook|invitation|\binvite\b|\bmenu\b|\bcards?\b|certificate|banner|leaflet/i, "poster"],
  [/video|\bfilm\b|movie|youtube|vlog|\bclips?\b|trailer|animation|episode|thumbnail/i, "video"],
  [/\blogos?\b|wordmark|emblem|monogram/i, "logo"],
  [/website|landing|web ?page|homepage|link in bio|\bsite\b|\bweb\b/i, "website"],
  [/\bsheets?\b|spreadsheet|budget|tracker|\btable\b/i, "sheet"],
  [/whiteboard|mind ?map|brainstorm|\bboard\b|moodboard/i, "board"],
  [/email|newsletter/i, "email"],
  [/\bdocs?\b|document|report|letter|proposal|paper|essay|article|e-?book|contract/i, "doc"],
  [/photo|picture|\bimage\b|editor|landscape|shoot|camera/i, "photo"],
];
/** The most specific kind the name or the hint names (rules run most specific first: a CV before a doc, a post before a poster). */
function mockOf(...texts: (string | undefined)[]) {
  const hits = texts.map((t) => (t ? MOCK_RULES.findIndex(([re]) => re.test(t)) : -1)).filter((i) => i >= 0);
  return hits.length ? MOCK_RULES[Math.min(...hits)][1] : null;
}

// Each mock-up: its artboard size inside a 200 × 150 view, and what's drawn on it (its own coordinates).
type Ink = { a: string; b: string; soft: string; softB: string; paper: string; text: string; line: string };
const ARTBOARD: Record<Mock, [number, number]> = {
  slides: [150, 84], cv: [86, 116], doc: [86, 116], post: [93, 116], story: [66, 118], video: [150, 84],
  poster: [88, 118], logo: [100, 100], website: [160, 100], sheet: [150, 96], board: [160, 100], email: [130, 104], photo: [160, 106],
};

function MockContent({ mock, w, h, ink, r }: { mock: Mock; w: number; h: number; ink: Ink; r: (min: number, max: number) => number }) {
  const { a, b, soft, softB, text, line } = ink;
  const lines = (x: number, y: number, widths: number[], gap = 6, hgt = 2.5) =>
    widths.map((lw, i) => <rect key={`${x}-${y}-${i}`} x={x} y={y + i * gap} width={lw} height={hgt} rx={hgt / 2} style={{ fill: line }} />);
  const hills = (x: number, y: number, ww: number, hh: number) => (
    <>
      <path d={`M${x} ${y + hh} L${x + ww * 0.3} ${y + hh * r(0.35, 0.5)} L${x + ww * 0.55} ${y + hh * 0.75} L${x + ww * 0.78} ${y + hh * r(0.3, 0.45)} L${x + ww} ${y + hh * 0.7} L${x + ww} ${y + hh} Z`} style={{ fill: a }} />
      <circle cx={x + ww * r(0.62, 0.8)} cy={y + hh * r(0.22, 0.32)} r={Math.min(ww, hh) * 0.11} style={{ fill: b }} />
    </>
  );
  switch (mock) {
    case "slides": {
      const pts = Array.from({ length: 6 }, (_, i) => [86 + i * 11, 64 - r(6, 30) - i * 2.2]);
      return (
        <>
          <rect x="10" y="14" width="56" height="7" rx="2" style={{ fill: text }} />
          <rect x="10" y="25" width="40" height="7" rx="2" style={{ fill: a }} />
          {lines(10, 42, [50, 42, 30])}
          <path d={`M86 66 ${pts.map(([x, y]) => `L${x} ${y}`).join(" ")} L141 66 Z`} style={{ fill: soft }} />
          <path d={`M${pts.map(([x, y]) => `${x} ${y}`).join(" L")}`} style={{ fill: "none", stroke: a, strokeWidth: 2.2, strokeLinejoin: "round", strokeLinecap: "round" }} />
          <rect x="86" y="66" width="55" height="1.2" style={{ fill: line }} />
        </>
      );
    }
    case "cv":
      return (
        <>
          <rect x="0" y="0" width="28" height={h} style={{ fill: soft }} />
          <circle cx="14" cy="17" r="8" style={{ fill: a }} />
          {lines(6, 34, [16, 12, 16, 10], 6, 2)}
          {lines(6, 64, [14, 16, 11], 6, 2)}
          <rect x="35" y="11" width="40" height="6" rx="2" style={{ fill: text }} />
          <rect x="35" y="21" width="26" height="3" rx="1.5" style={{ fill: a }} />
          {lines(35, 33, [44, 40, 42, 30])}
          <rect x="35" y="61" width="20" height="3" rx="1.5" style={{ fill: a }} />
          {lines(35, 70, [44, 38, 42, 26, 40])}
        </>
      );
    case "doc":
      return (
        <>
          <rect x="9" y="11" width="44" height="6" rx="2" style={{ fill: text }} />
          <rect x="9" y="21" width="24" height="3" rx="1.5" style={{ fill: a }} />
          {lines(9, 31, [68, 64, 68, 42])}
          <rect x="9" y="58" width="68" height="22" rx="2.5" style={{ fill: soft }} />
          {[a, b, a, b].map((fill, i) => {
            const bh = r(6, 15);
            return <rect key={i} x={15 + i * 11} y={77 - bh} width="7" height={bh} rx="1" style={{ fill }} />;
          })}
          {lines(62, 64, [10, 8, 10], 5, 2)}
          {lines(9, 88, [68, 60, 66, 36])}
        </>
      );
    case "post":
      return (
        <>
          <circle cx="11" cy="9" r="4.5" style={{ fill: a }} />
          <rect x="19" y="7.5" width="26" height="3" rx="1.5" style={{ fill: text }} />
          <rect x="0" y="18" width={w} height="64" style={{ fill: softB }} />
          {hills(0, 18, w, 64)}
          <path d="M8 92 c-2.5 -3 -6 -1 -4 2 l4 4 l4 -4 c2 -3 -1.5 -5 -4 -2Z" style={{ fill: a }} transform="translate(0 -2)" />
          {lines(8, 100, [62, 44], 6, 2.5)}
        </>
      );
    case "story":
      return (
        <>
          <rect x="0" y="0" width={w} height={h} style={{ fill: softB }} />
          {hills(0, 20, w, h - 20)}
          {[0, 1, 2].map((i) => (
            <rect key={i} x={6 + i * 19} y="6" width="16" height="2" rx="1" style={{ fill: "white", opacity: i ? 0.55 : 1 }} />
          ))}
          <rect x="8" y={h - 26} width="40" height="6" rx="2" style={{ fill: "white" }} />
          <rect x="8" y={h - 16} width="26" height="3" rx="1.5" style={{ fill: "white", opacity: 0.8 }} />
        </>
      );
    case "video":
      return (
        <>
          <rect x="0" y="0" width={w} height={h} style={{ fill: softB }} />
          {hills(0, 10, w, h - 10)}
          <circle cx={w / 2} cy={h / 2 - 4} r="13" style={{ fill: "white", opacity: 0.95 }} />
          <path d={`M${w / 2 - 4} ${h / 2 - 11} L${w / 2 + 7} ${h / 2 - 4} L${w / 2 - 4} ${h / 2 + 3} Z`} style={{ fill: a }} />
          <rect x="8" y={h - 8} width={w - 16} height="2.5" rx="1.25" style={{ fill: "white", opacity: 0.6 }} />
          <rect x="8" y={h - 8} width={(w - 16) * r(0.25, 0.6)} height="2.5" rx="1.25" style={{ fill: "white" }} />
        </>
      );
    case "poster":
      return (
        <>
          <rect x="0" y="0" width={w} height="64" style={{ fill: a }} />
          <circle cx={w * r(0.55, 0.75)} cy={r(26, 36)} r={r(16, 22)} style={{ fill: b }} />
          <circle cx={w * 0.22} cy="50" r="6" style={{ fill: "white", opacity: 0.45 }} />
          <rect x="9" y="72" width="60" height="8" rx="2" style={{ fill: text }} />
          <rect x="9" y="84" width="44" height="8" rx="2" style={{ fill: text }} />
          {lines(9, 99, [52, 38], 6, 2.5)}
          <rect x="9" y={h - 8} width="20" height="2.5" rx="1.25" style={{ fill: a }} />
        </>
      );
    case "logo": {
      const pick = Math.floor(r(0, 3));
      return (
        <>
          <circle cx={w / 2} cy="40" r="22" style={{ fill: a }} />
          {pick === 0 && <path d={`M${w / 2 - 11} 49 L${w / 2} 28 L${w / 2 + 11} 49 Z`} style={{ fill: "white" }} />}
          {pick === 1 && <circle cx={w / 2} cy="40" r="9" style={{ fill: "none", stroke: "white", strokeWidth: 5 }} />}
          {pick === 2 && <path d={`M${w / 2 - 10} 46 C ${w / 2 - 10} 30, ${w / 2 + 10} 30, ${w / 2 + 10} 34 C ${w / 2 + 10} 50, ${w / 2 - 6} 50, ${w / 2 - 10} 46 Z`} style={{ fill: b }} />}
          <rect x={w / 2 - 24} y="72" width="48" height="7" rx="2" style={{ fill: text }} />
          <rect x={w / 2 - 14} y="84" width="28" height="2.5" rx="1.25" style={{ fill: line }} />
        </>
      );
    }
    case "website":
      return (
        <>
          <rect x="0" y="0" width={w} height="9" style={{ fill: soft }} />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={6 + i * 5} cy="4.5" r="1.6" style={{ fill: i === 0 ? a : line }} />
          ))}
          <rect x="10" y="20" width="56" height="7" rx="2" style={{ fill: text }} />
          <rect x="10" y="31" width="40" height="7" rx="2" style={{ fill: a }} />
          {lines(10, 44, [52, 40], 6, 2.5)}
          <rect x="10" y="57" width="24" height="7" rx="3.5" style={{ fill: a }} />
          <rect x="88" y="17" width="62" height="48" rx="3" style={{ fill: softB }} />
          {hills(88, 17, 62, 48)}
          {[0, 1, 2].map((i) => (
            <rect key={i} x={10 + i * 48} y="74" width="44" height="18" rx="2.5" style={{ fill: "none", stroke: line, strokeWidth: 1.2 }} />
          ))}
        </>
      );
    case "sheet":
      return (
        <>
          <rect x="0" y="0" width={w} height="14" style={{ fill: soft }} />
          {Array.from({ length: 5 }, (_, i) => <rect key={`r${i}`} x="0" y={14 + i * 16} width={w} height="0.9" style={{ fill: line }} />)}
          {[38, 76, 114].map((x) => <rect key={x} x={x} y="0" width="0.9" height={h} style={{ fill: line }} />)}
          {Array.from({ length: 5 }, (_, i) => (
            <React.Fragment key={i}>
              <rect x="6" y={19 + i * 16} width={r(16, 26)} height="3" rx="1.5" style={{ fill: line }} />
              <rect x="120" y={18 + i * 16} width={r(8, 26)} height="6" rx="1.5" style={{ fill: i % 2 ? b : a }} />
            </React.Fragment>
          ))}
        </>
      );
    case "board": {
      const notes = [
        [14, 14, a, -4],
        [62, 22, b, 3],
        [110, 12, soft, -2],
        [36, 58, softB, 4],
        [92, 60, a, -3],
      ] as const;
      return (
        <>
          <path d="M34 34 C 50 50, 70 50, 80 42 M100 40 C 110 60, 104 70, 110 76" style={{ fill: "none", stroke: line, strokeWidth: 1.4, strokeDasharray: "3 3" }} />
          {notes.map(([x, y, fill, rot], i) => (
            <g key={i} transform={`rotate(${rot} ${x + 15} ${y + 13})`}>
              <rect x={x} y={y} width="32" height="27" rx="2" style={{ fill, opacity: fill === a || fill === b ? 0.85 : 1 }} />
              <rect x={x + 5} y={y + 7} width="20" height="2.5" rx="1.25" style={{ fill: "white", opacity: 0.85 }} />
            </g>
          ))}
        </>
      );
    }
    case "email":
      return (
        <>
          <rect x="0" y="0" width={w} height="20" style={{ fill: a }} />
          <circle cx="13" cy="10" r="4" style={{ fill: "white" }} />
          <rect x="22" y="8.5" width="26" height="3" rx="1.5" style={{ fill: "white", opacity: 0.85 }} />
          <rect x="12" y="30" width="58" height="6" rx="2" style={{ fill: text }} />
          {lines(12, 42, [106, 98, 104, 70])}
          <rect x="12" y="72" width="36" height="9" rx="4.5" style={{ fill: a }} />
          {lines(12, 92, [80], 6, 2)}
        </>
      );
    case "photo":
      return (
        <>
          <rect x="0" y="0" width={w} height={h} style={{ fill: softB }} />
          {hills(0, 0, w, h)}
        </>
      );
  }
}

/** A small mock-up of what the item is, on its artboard, centred in the slot. */
function Mockup({ mock, a, b, rand }: { mock: Mock; a: string; b: string; rand: () => number }) {
  const r = (min: number, max: number) => min + rand() * (max - min);
  const [w, h] = ARTBOARD[mock];
  const x = (200 - w) / 2;
  const y = (150 - h) / 2;
  const paper = "color-mix(in oklch, var(--card), white 6%)";
  const ink: Ink = {
    a,
    b,
    paper,
    soft: mix(a, 18, paper),
    softB: mix(b, 22, paper),
    text: "color-mix(in oklch, var(--foreground) 82%, transparent)",
    line: "color-mix(in oklch, var(--muted-foreground) 34%, transparent)",
  };
  const round = mock === "logo" ? 10 : mock === "story" || mock === "post" ? 6 : 3.5;
  // The artboard's rounded corners clip what's drawn full-bleed on it.
  const clip = `mock-${React.useId().replace(/[^a-zA-Z0-9-]/g, "")}`;
  return (
    <svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 size-full" aria-hidden="true">
      <rect x={x} y={y + 2.5} width={w} height={h} rx={round} style={{ fill: "black", opacity: 0.07 }} />
      <svg x={x} y={y} width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: "hidden" }}>
        <defs>
          <clipPath id={clip}>
            <rect x="0" y="0" width={w} height={h} rx={round} />
          </clipPath>
        </defs>
        <rect x="0" y="0" width={w} height={h} rx={round} style={{ fill: paper }} />
        <g clipPath={`url(#${clip})`}>
          <MockContent mock={mock} w={w} h={h} ink={ink} r={r} />
        </g>
      </svg>
      <rect x={x} y={y} width={w} height={h} rx={round} style={{ fill: "none", stroke: "color-mix(in oklch, var(--foreground) 10%, transparent)", strokeWidth: 0.8 }} />
    </svg>
  );
}

/** A small picture glyph (frame, hill, sun), sized to the slot but never large. */
function Glyph({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ stroke: color, width: "clamp(14px, 14cqi, 36px)", height: "auto" }}
    >
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <circle cx="9" cy="9.5" r="1.75" />
      <path d="m21 16-4.5-4.5L7 20" />
    </svg>
  );
}

/** A cover for an item, from its name in the theme's colours: a quiet placeholder unless a design is asked for. */
function BrandArt({
  seed,
  kind = "placeholder",
  glyph = true,
  hint,
  className,
  children,
}: {
  /** Usually the item's name; the same seed always gives the same art. */
  seed: string;
  kind?: ArtKind;
  /** The placeholder's picture glyph; off for art behind text (heroes, banners). */
  glyph?: boolean;
  /** What the item is, beside its name ("Instagram post · 4:5", "A4 portrait"): picks the mock-up. */
  hint?: string;
  className?: string;
  /** Laid over the art, centred (an icon, a label). */
  children?: React.ReactNode;
}) {
  const rand = seeded(seed);
  const first = Math.floor(rand() * 3) === 0 ? 1 + Math.floor(rand() * 4) : 0;
  const a = ACCENTS[first];
  const b = ACCENTS[(first + 1 + Math.floor(rand() * 4)) % ACCENTS.length];
  if (kind === "placeholder") {
    // A known kind of item draws its mock-up where the glyph would be.
    // From the name and the hint (its format), the more specific: "Meadow lookbook" · "Instagram post" is a post, "CV" · "A4 portrait" a CV.
    const mock = glyph && !children ? mockOf(seed, hint) : null;
    return (
      <div
        data-slot="brand-art"
        className={cn("relative isolate overflow-hidden", className)}
        style={{
          containerType: "inline-size",
          background: `linear-gradient(180deg, ${mix(a, 16, "var(--muted)")}, ${mix(a, 7, "var(--muted)")})`,
        }}
      >
        {mock ? (
          <Mockup mock={mock} a={mix(a, 92, "var(--foreground)")} b={mix(b, 85, "var(--foreground)")} rand={rand} />
        ) : (
          glyph && !children && <Glyph color={mix(a, 35, "var(--muted-foreground)")} />
        )}
        {children && <div className="relative grid size-full place-items-center">{children}</div>}
      </div>
    );
  }
  const design = kind;
  return (
    <div data-slot="brand-art" className={cn("relative isolate overflow-hidden", className)} style={{ background: mix(a, 30, "var(--background)") }}>
      <svg viewBox="0 0 200 100" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden="true">
        {shapes(design, rand, mix(a, 90, "white"), mix(b, 85, "white"))}
      </svg>
      {children && <div className="relative grid size-full place-items-center">{children}</div>}
    </div>
  );
}

export { BrandArt };
