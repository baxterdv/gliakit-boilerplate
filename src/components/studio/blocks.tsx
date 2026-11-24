"use client";

import * as React from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Bell,
  MapPin,
  MessageSquare,
  Music,
  Search,
  ShoppingBag,
  BarChart3,
  Crop,
  Minus,
  Upload,
  WandSparkles,
  BookOpen,
  ChevronRight,
  FolderKanban,
  ListChecks,
  Play,
  SquareCheck,
  Target,
  Clapperboard,
  Film,
  Image as ImageIcon,
  Layers,
  Palette,
  Rocket,
  Star,
  Timer,
  TrendingUp,
  Trophy,
  User,
  Wallet,
  Calendar,
  Check,
  Circle,
  CircleAlert,
  CircleCheck,
  ZoomIn,
  ZoomOut,
  Clock,
  Download,
  FileText,
  Flame,
  FolderOpen,
  Heart,
  Info,
  Lock,
  Mail,
  MoreHorizontal,
  OctagonAlert,
  PieChart,
  Plus,
  RefreshCw,
  Settings,
  Shield,
  Sparkles,
  Users,
  Zap,
  ChevronDown,
  LayoutGrid,
  List as ListIcon,
  SlidersHorizontal,
  Tag,
  Plane,
  Armchair,
  RotateCcw,
  Activity,
  Server,
  TriangleAlert,
  GitCommitHorizontal,
  Terminal,
  Globe,
  Copy,
  Bold,
  Italic,
  Link2,
  ListOrdered,
  CreditCard,
  Eye,
  EyeOff,
  X,
  Inbox,
  SearchX,
  ChartColumn,
  CalendarX2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Alert } from "@/components/ui/alert";
import { AreaChart } from "@/components/ui/area-chart";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BrandArt } from "@/components/ui/brand-art";
import { openCommandPalette } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Dialog, DialogBody, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Drawer, DrawerBody, DrawerContent, DrawerFooter } from "@/components/ui/drawer";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetBody, SheetContent, SheetFooter } from "@/components/ui/sheet";
import { Toast } from "@/components/ui/toast";
import { Card, CardContent, CardFooter, CardHeader, StatCard } from "@/components/ui/card";
import { Breadcrumb, Pagination } from "@/components/ui/breadcrumb";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Combobox } from "@/components/ui/combobox";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { chipVariants } from "@/components/ui/chip";
import { CircularProgress } from "@/components/ui/circular-progress";
import { BarChart, Rings, Sparkline } from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/ui/empty-state";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Field, Input, Textarea } from "@/components/ui/input";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Stepper } from "@/components/ui/stepper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { TableToolbar } from "@/components/ui/table-toolbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List, ListItem } from "@/components/ui/list";
import { DatePicker } from "@/components/ui/date-picker";
import { OTPInput } from "@/components/ui/otp-input";
import {
  OverlayContext,
  SlotButton,
  SlotLink,
  usePageTabs,
  useSearchable,
  useSectionWiring,
  useSlot,
  useSlotAction,
  useUnsaved,
  ConfirmDiscard,
  useAppActions,
  useQuickAction,
  type OverlayApi,
} from "./frames";

/*
  GliaKit Studio sections. Each block composes the GliaKit UI components
  and takes plain data props, so a page is just a list of blocks. Most
  blocks come in a few design variants (the `variant` prop); the content
  props stay the same, so switching a variant never loses data. The same
  file renders the Studio preview and ships in every code export.
*/

// --- app sections ----------------------------------------------------------

/** An icon for a card, read from its title ("Today's tasks" -> a checkbox). */
const HEADER_ICONS: [RegExp, React.ComponentType<{ className?: string }>][] = [
  [/task|todo|to-do|priorit|checklist/i, SquareCheck],
  [/project|board|portfolio/i, FolderKanban],
  [/calendar|schedule|agenda|today|week|upcoming|deadline/i, Calendar],
  [/activity|update|feed|recent|log/i, Zap],
  [/focus|timer|session|pomodoro/i, Target],
  [/assistant|\bai\b|copilot|suggest/i, Sparkles],
  [/action|shortcut/i, Zap],
  [/team|member|people/i, Users],
  [/progress|goal/i, ListChecks],
  [/busiest|busy|peak|hours|heat/i, Flame],
  [/\btop\b|leader|rank|\bbest\b/i, Trophy],
  [/breakdown|split|share|\bby \w+$/i, PieChart],
  [/detail|summary|account|info|overview/i, FileText],
];

/** The icon a title suggests, or none: a card with no obvious icon gets no decoration. */
const headerIcon = (title: string) => HEADER_ICONS.find(([re]) => re.test(title))?.[1] ?? null;

/** Card header with an icon, the title, and an optional "View all" link. */
function BlockHeader({
  title,
  description,
  linkLabel,
  icon = true,
  children,
}: {
  title: string;
  description?: string;
  linkLabel?: string;
  icon?: boolean;
  children?: React.ReactNode;
}) {
  return (
    // Wraps: an action or link that doesn't fit beside a 12rem title moves under it.
    <div data-slot="block-header" className="flex flex-wrap items-start gap-x-3 gap-y-2 px-5 pt-4">
      {icon && headerIcon(title) && (
        <span data-slot="block-icon" className="mt-0.5 shrink-0">
          {React.createElement(headerIcon(title)!, { className: "size-5 text-primary-ink" })}
        </span>
      )}
      <div className="min-w-0 flex-1 basis-48">
        <h2 className="font-heading text-[15px] font-semibold tracking-tight [overflow-wrap:anywhere] text-foreground">{title}</h2>
        {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
      {linkLabel && (
        <SlotLink slot="more" className="flex max-w-full min-w-0 shrink-0 items-center gap-1 pt-0.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
          <span className="truncate">{linkLabel}</span>
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </SlotLink>
      )}
    </div>
  );
}

/**
 * A page's views as the kit's line tabs. Each tab is a slot ("tab-0"…), so it
 * can open another page or an overlay; otherwise it just shows as selected.
 */
function HeaderTabs({ tabs }: { tabs: string[] }) {
  // The open tab is the page's (so sections can show for one tab), else this header's own.
  const page = usePageTabs();
  const [own, setOwn] = React.useState(0);
  const active = Math.min(page ? page.active : own, tabs.length - 1);
  const pick = (v: string) => (page ? page.setActive : setOwn)(Math.max(0, tabs.indexOf(v)));
  return (
    <Tabs value={tabs[active]} onValueChange={pick}>
      <TabsList variant="line" aria-label="Views" className="max-w-full overflow-x-auto overflow-y-hidden pb-1.5 group-data-horizontal/tabs:h-control">
        {tabs.map((t, i) => (
          <HeaderTab key={t} value={t} slot={`tab-${i}`} />
        ))}
      </TabsList>
    </Tabs>
  );
}

/** The search header's views as pills ("Home", "Templates"); like the tabs, the page's own when it has them. */
function HeaderPills({ tabs }: { tabs: string[] }) {
  const page = usePageTabs();
  const [own, setOwn] = React.useState(0);
  const active = Math.min(page ? page.active : own, tabs.length - 1);
  return (
    <div role="group" aria-label="Views" className="flex flex-wrap justify-center gap-2">
      {tabs.map((t, i) => (
        <HeaderPill key={t} label={t} slot={`tab-${i}`} on={i === active} onPick={() => (page ? page.setActive : setOwn)(i)} />
      ))}
    </div>
  );
}

function HeaderPill({ label, slot, on, onPick }: { label: string; slot: string; on: boolean; onPick: () => void }) {
  const act = useSlotAction(slot);
  return (
    <button
      type="button"
      aria-pressed={on}
      data-link={slot}
      onClick={(e) => {
        onPick();
        act?.(e.currentTarget);
      }}
      className={cn(
        "h-9 rounded-full border px-4 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        on ? "border-primary-ink bg-card text-foreground shadow-sm" : "border-border bg-card/60 text-foreground/80 hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

function HeaderTab({ value, slot }: { value: string; slot: string }) {
  const act = useSlotAction(slot);
  return (
    <TabsTrigger value={value} data-link={slot} onClick={act ? (e) => act(e.currentTarget) : undefined} className="px-2.5">
      {value}
    </TabsTrigger>
  );
}

function PageHeaderBlock({
  variant = "default",
  eyebrow,
  title,
  highlight,
  breadcrumb,
  range,
  description,
  primaryAction,
  secondaryAction,
  date,
  tabs,
  search,
}: {
  variant?: "default" | "banner" | "band" | "greeting" | "hero" | "search" | "display";
  eyebrow?: string;
  title: string;
  /** Part of the title drawn in the accent (the hero design), or muted (the display design's second tone). */
  highlight?: string;
  /** Parent pages above the title, for a detail page (["Customers"]). */
  breadcrumb?: string[];
  /** A date range filter for the page ("Mar 28 – Apr 27, 2024"), opening the kit's range picker. */
  range?: string;
  description?: string;
  primaryAction?: string;
  secondaryAction?: string;
  /** Today's date, shown as a chip on the right ("Thu, Oct 24, 2026"). */
  date?: string;
  /** Views of this page as tabs under the title ("Overview", "Members", "Billing"); the first is shown. */
  tabs?: string[];
  /** The search design's field: what it looks for ("Search templates, designs and photos"). */
  search?: string;
}) {
  const tabRow = tabs?.length ? <HeaderTabs tabs={tabs} /> : null;
  // The crumbs go back where "back" is wired (a record page's parent list).
  const back = useSlot("back");
  const crumbs = breadcrumb?.length ? (
    <Breadcrumb items={[...breadcrumb.map((label) => ({ label, ...(back.overlay === undefined && back.target !== undefined ? back.props : {}) })), { label: title }]} className="mb-2" />
  ) : null;
  const rangePicker = range ? <DateRangePicker defaultLabel={range} comparable className="w-auto" /> : null;
  const dateChip = date && (
    <span className="flex h-control items-center gap-2 rounded-md border border-border bg-card px-3 text-xs text-foreground">
      <Calendar className="size-4 text-muted-foreground" aria-hidden="true" />
      {date}
    </span>
  );
  // A home that starts with search (a creative tool's, a marketplace's): a centred
  // question with its key word in the brand's gradient, view pills and one big
  // search field (it opens the app's search) on a soft wash of the brand.
  if (variant === "search") {
    const [before, word, after] = splitHighlight(title, highlight);
    return (
      <div className="relative isolate overflow-hidden rounded-xl text-foreground">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(115deg, color-mix(in oklch, var(--signal-cyan) 16%, var(--background)), color-mix(in oklch, var(--primary) 12%, var(--background)) 50%, color-mix(in oklch, var(--signal-magenta) 14%, var(--background)))",
          }}
        />
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-5 py-10 text-center @3xl:py-14">
          {eyebrow && <p className="text-sm font-medium text-muted-foreground">{eyebrow}</p>}
          <h1 className="font-heading text-3xl leading-tight font-bold tracking-tight text-balance @3xl:text-5xl">
            {before}
            {word && <span className="bg-[image:var(--gradient-signal)] bg-clip-text text-transparent">{word}</span>}
            {after}
          </h1>
          {description && <p className="max-w-lg text-base text-muted-foreground">{description}</p>}
          {tabs && <HeaderPills tabs={tabs} />}
          <button
            type="button"
            onClick={openCommandPalette}
            className="flex h-14 w-full max-w-2xl items-center gap-3 rounded-2xl border border-border bg-card px-5 text-left text-base text-muted-foreground shadow-[0_8px_24px_-12px_rgb(0_0_0/0.18)] transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <Search className="size-5 shrink-0 text-foreground" aria-hidden="true" />
            <span className="truncate">{search ?? "Search anything"}</span>
          </button>
          {(primaryAction || secondaryAction) && (
            <div className="flex flex-wrap justify-center gap-3">
              {primaryAction && <SlotButton slot="action">{primaryAction}</SlotButton>}
              {secondaryAction && (
                <SlotButton slot="secondary" variant="outline">
                  {secondaryAction}
                </SlotButton>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
  // The home of a consumer or creative product: a statement on a soft tint of
  // the brand with a glow in the corner; the theme's own text reads on it.
  if (variant === "hero") {
    const [before, word, after] = splitHighlight(title, highlight);
    return (
      <div className="relative isolate overflow-hidden rounded-xl border border-border text-foreground">
        <BrandArt seed={title} glyph={false} className="absolute inset-0 -z-10 size-full" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(55%_90%_at_88%_15%,color-mix(in_oklch,var(--primary)_24%,transparent),transparent)]" />
        <div className="flex min-h-72 max-w-xl flex-col justify-center gap-4 px-6 py-10 @3xl:px-10 @3xl:py-12">
          {eyebrow && <p className="text-sm font-medium tracking-[0.08em] text-muted-foreground uppercase">{eyebrow}</p>}
          <h1 className="font-heading text-4xl leading-[1.05] font-bold tracking-tight text-balance @3xl:text-5xl">
            {before}
            {word && <span className="text-primary-ink">{word}</span>}
            {after}
          </h1>
          {description && <p className="max-w-md text-base text-muted-foreground">{description}</p>}
          {(primaryAction || secondaryAction) && (
            <div className="mt-2 flex flex-wrap gap-3">
              {primaryAction && (
                <SlotButton slot="action" size="lg">
                  {primaryAction}
                  <ArrowRight />
                </SlotButton>
              )}
              {secondaryAction && (
                <SlotButton slot="secondary" size="lg" variant="outline">
                  {secondaryAction}
                </SlotButton>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
  // A big, light headline in two tones (the highlight muted) over one data
  // sentence whose figures are bold: the page opens on a statement, not a box.
  if (variant === "display") {
    const [before, word, after] = splitHighlight(title, highlight);
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-5 @3xl:flex-row @3xl:items-end @3xl:justify-between">
          <div className="min-w-0 @3xl:flex-1">
            {crumbs}
            {eyebrow && <p className="text-sm text-muted-foreground">{eyebrow}</p>}
            <h1 className="mt-1 font-heading text-4xl leading-[1.04] font-light tracking-[-0.035em] text-balance text-foreground @3xl:text-6xl">
              {before}
              {word && <span className="text-muted-foreground">{word}</span>}
              {after}
            </h1>
            {description && (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                <BoldFigures text={description} />
              </p>
            )}
          </div>
          {(dateChip || rangePicker || primaryAction || secondaryAction) && (
            <div className="flex min-w-0 flex-wrap items-center gap-2 @3xl:max-w-[45%] @3xl:justify-end">
              {rangePicker}
              {dateChip}
              {secondaryAction && <SlotButton slot="secondary" variant="outline">{secondaryAction}</SlotButton>}
              {primaryAction && (
                <SlotButton slot="action">
                  <Plus />
                  {primaryAction}
                </SlotButton>
              )}
            </div>
          )}
        </div>
        {tabRow}
      </div>
    );
  }
  // A greeting line over a large statement title ("Make today count.").
  if (variant === "greeting") {
    const greeting = (
      <div className="flex flex-col gap-4 @2xl:flex-row @2xl:items-start @2xl:justify-between">
        <div className="min-w-0 @2xl:flex-1">
          {crumbs}
          {eyebrow && <p className="text-base text-muted-foreground">{eyebrow}</p>}
          <h1 className="mt-1 font-heading text-4xl font-bold tracking-tight text-balance text-foreground @3xl:text-5xl">{title}</h1>
          {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
        </div>
        {(dateChip || rangePicker || primaryAction || secondaryAction) && (
          <div className="flex min-w-0 flex-wrap items-center gap-2 @2xl:max-w-[60%] @2xl:justify-end">
            {rangePicker}
            {dateChip}
            {secondaryAction && <SlotButton slot="secondary" variant="outline">{secondaryAction}</SlotButton>}
            {primaryAction && (
              <SlotButton slot="action">
                <Plus />
                {primaryAction}
              </SlotButton>
            )}
          </div>
        )}
      </div>
    );
    return tabRow ? (
      <div className="flex flex-col gap-5">
        {greeting}
        {tabRow}
      </div>
    ) : (
      greeting
    );
  }
  // Same anatomy as the kit's PageHeader, laid out by the section's width.
  const header = (
    <div className="relative flex flex-col gap-4 @2xl:flex-row @2xl:items-end @2xl:justify-between">
      <div className="min-w-0 @2xl:flex-1">
        {crumbs}
        {eyebrow && (
          <p className="font-mono text-eyebrow uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</p>
        )}
        <h1 className="mt-1 font-heading text-2xl font-semibold tracking-tight text-balance text-foreground">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {(dateChip || rangePicker || primaryAction || secondaryAction) && (
        <div className="flex min-w-0 flex-wrap items-center gap-2 @2xl:max-w-[60%] @2xl:justify-end">
          {rangePicker}
          {dateChip}
          {secondaryAction && <SlotButton slot="secondary" variant="outline">{secondaryAction}</SlotButton>}
          {primaryAction && (
            <SlotButton slot="action">
              <Plus />
              {primaryAction}
            </SlotButton>
          )}
        </div>
      )}
    </div>
  );
  // A coloured band (the theme's navigation colour, else the brand colour);
  // its tokens turn light inside, so the same header reads white on it.
  if (variant === "band") {
    return (
      <div data-slot="nav-band" className="flex flex-col gap-5 rounded-lg px-6 pt-6 pb-4 text-foreground">
        {header}
        {tabRow}
      </div>
    );
  }
  if (variant !== "banner") {
    return tabRow ? (
      <div className="flex flex-col gap-5">
        {header}
        {tabRow}
      </div>
    ) : (
      header
    );
  }
  // Text and actions on the left, generated art on the right where a hero
  // illustration would sit, fading into the card.
  return (
    <Card className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_140%_at_100%_0%,color-mix(in_oklch,var(--primary)_20%,transparent),transparent)]"
      />
      <div className="relative grid @3xl:grid-cols-[minmax(0,1fr)_40%]">
        <div className="min-w-0 px-6 py-7">
          {crumbs}
          {eyebrow && <p className="font-mono text-eyebrow uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</p>}
          <h1 className="mt-1 font-heading text-2xl font-semibold tracking-tight text-balance text-foreground">{title}</h1>
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
          {(dateChip || rangePicker || primaryAction || secondaryAction) && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {primaryAction && (
                <SlotButton slot="action">
                  <Plus />
                  {primaryAction}
                </SlotButton>
              )}
              {secondaryAction && <SlotButton slot="secondary" variant="outline">{secondaryAction}</SlotButton>}
              {rangePicker}
              {dateChip}
            </div>
          )}
          {tabRow && <div className="mt-5">{tabRow}</div>}
        </div>
        <BrandArt seed={title} glyph={false} className="hidden [mask-image:linear-gradient(to_right,transparent,black_40%)] @3xl:block" />
      </div>
    </Card>
  );
}

/** Figures in a sentence set bold ("4 live sites · €120.9M under contract"): money, counts, percentages and durations. */
function BoldFigures({ text }: { text: string }) {
  const parts = text.split(/((?:[€$£¥]\s?)?\d[\d,.]*(?:\s?(?:%|[kKMB]\b|h\b|min\b|days?\b|hours?\b|weeks?\b))?)/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 ? (
          <strong key={i} className="font-semibold text-foreground">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

type Stat = {
  label: string;
  value: string;
  prefix?: string;
  unit?: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
  invert?: boolean;
  spark?: number[];
  /** Supporting line under the number. */
  hint?: string;
  /** The whole the value is part of, shown as "/ 12". */
  total?: string;
  /** Progress toward the total, 0–100, drawn as a bar. */
  pct?: number;
  /** This stat's own colour: a wash of the brand, the brand fill, or the opposite mode. */
  tone?: "tinted" | "brand" | "inverse";
};

// Column counts follow the section's own width (container queries), so a
// stat row at half width stacks instead of squeezing four tiles together.
const statCols = {
  1: "grid-cols-1",
  2: "@md:grid-cols-2",
  3: "@md:grid-cols-2 @2xl:grid-cols-3",
  4: "@md:grid-cols-2 @4xl:grid-cols-4",
  5: "@md:grid-cols-2 @3xl:grid-cols-3 @4xl:grid-cols-5",
} as const;

const stripCols = statCols;

// Icon tiles are narrower than chart cards, so four fit in a row sooner.
const tileCols = { ...statCols, 4: "@md:grid-cols-2 @3xl:grid-cols-4" } as const;

/** Delta tone by meaning (as StatCard does): invert for "down is good" metrics. */
function deltaTone(s: Stat) {
  if (!s.trend || s.trend === "flat") return "bg-muted text-muted-foreground";
  return (s.trend === "up") !== Boolean(s.invert) ? "bg-diff-add/15 text-diff-add" : "bg-destructive/15 text-destructive";
}

/** An icon for a metric, read from its label ("Characters" -> a person). */
const STAT_ICONS: [RegExp, React.ComponentType<{ className?: string }>][] = [
  [/task|todo|done|complet|check/i, SquareCheck],
  [/project|board/i, FolderOpen],
  [/focus|session/i, Clock],
  [/productiv|velocity|score|efficien/i, TrendingUp],
  [/cartoon|image|photo|gallery|picture|drawing|design/i, ImageIcon],
  [/character|user|people|person|customer|member|patient|client|student|team/i, User],
  [/star|rating|review|favou?rite|like|badge|reward/i, Star],
  [/minute|hour|time|duration|watch/i, Timer],
  [/revenue|sales|mrr|arr|income|spend|cost|price|€|\$/i, Wallet],
  [/stor(y|ies)|book|chapter|lesson|course/i, BookOpen],
  [/video|animation|episode|film/i, Clapperboard],
];

const statIcon = (label: string) => STAT_ICONS.find(([re]) => re.test(label))?.[1] ?? TrendingUp;

/**
 * A stat panel's accent, by position: the brand, the accent (the chart lead), the two blended,
 * then the accent nudged toward the text colour. The first two read at 3:1 on a card; the
 * blend sits between them and the last moves toward the text, so both hold too.
 */
const PANEL_ACCENTS = [
  "var(--primary-mark)",
  "var(--chart-1)",
  "color-mix(in oklch, var(--primary-mark) 50%, var(--chart-1))",
  "color-mix(in oklch, var(--chart-1) 72%, var(--foreground))",
];

/** A score out of 100 as a ring with the stat's icon inside, in the panel's accent. The number beside it says the value. */
function StatRing({ value, label, Icon }: { value: number; label: string; Icon: React.ComponentType<{ className?: string }> }) {
  const size = 56;
  const stroke = 5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  return (
    <span role="img" aria-label={`${label}: ${Math.round(pct)} of 100`} className="relative grid shrink-0 place-items-center text-[var(--stat-accent)]" style={{ width: size, height: size }}>
      <svg width={size} height={size} aria-hidden="true" className="absolute inset-0 -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="stroke-muted" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c} stroke="currentColor" />
      </svg>
      <Icon className="size-[18px]" />
    </span>
  );
}

function StatRow({ variant = "cards", stats }: { variant?: "cards" | "strip" | "compact" | "tiles" | "panels" | "spark" | "lead" | "ticker"; stats: Stat[] }) {
  const n = Math.min(5, Math.max(1, stats.length)) as 1 | 2 | 3 | 4 | 5;
  const figure = (s: Stat, size: string, small: string) => (
    <p className={cn("font-heading leading-none font-semibold tracking-tight text-foreground tabular-nums", size)}>
      {s.prefix && <span className={cn("mr-0.5 text-muted-foreground", small)}>{s.prefix}</span>}
      {s.value}
      {s.unit && <span className={cn("ml-0.5 text-muted-foreground", small)}>{s.unit}</span>}
      {s.total && <span className={cn("ml-1 font-medium text-muted-foreground", small)}>/ {s.total}</span>}
    </p>
  );
  const deltaPill = (s: Stat) =>
    s.delta ? (
      <span className={cn("inline-flex max-w-full min-w-0 shrink-0 items-center gap-0.5 rounded-full px-2 py-0.5 font-mono text-[11px] tabular-nums", deltaTone(s))}>
        {s.trend === "down" ? <ArrowDownRight className="size-3 shrink-0" aria-hidden="true" /> : s.trend === "up" ? <ArrowUpRight className="size-3 shrink-0" aria-hidden="true" /> : null}
        <span className="truncate">{s.delta}</span>
      </span>
    ) : null;
  if (variant === "ticker") {
    // A ticker: one strip of instruments, each a mark, its name, the figure, the change and a
    // short line, split by rules; it scrolls sideways where they don't all fit.
    return (
      <Card data-stat-row={n} className="overflow-hidden">
        <ul className="flex snap-x overflow-x-auto [scrollbar-width:thin]">
          {stats.map((s, i) => {
            const good = s.trend !== "flat" && (s.trend === "up") !== Boolean(s.invert);
            return (
              <li key={s.label} data-card-tone={s.tone} className={cn("flex min-w-[13.5rem] flex-1 snap-start items-center gap-3 px-4 py-3.5", i > 0 && "border-l border-border")}>
                <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-muted font-heading text-xs font-semibold text-foreground">
                  {s.label.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase() || "•"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs text-muted-foreground">{s.label}</p>
                  <p className="font-heading text-base leading-tight font-semibold tracking-tight text-foreground tabular-nums">
                    {s.prefix}
                    {s.value}
                    {s.unit && <span className="text-muted-foreground">{s.unit}</span>}
                  </p>
                  {s.delta && (
                    <p className={cn("font-mono text-[11px] tabular-nums", s.trend === "flat" ? "text-muted-foreground" : good ? "text-diff-add" : "text-destructive")}>
                      {s.trend === "down" ? "▼" : s.trend === "up" ? "▲" : ""} {s.delta}
                    </p>
                  )}
                </div>
                {s.spark && s.spark.length > 1 && (
                  <Sparkline data={s.spark} tone={s.trend === "flat" ? "muted" : good ? "success" : "destructive"} width={56} height={24} />
                )}
              </li>
            );
          })}
        </ul>
      </Card>
    );
  }
  if (variant === "spark") {
    // The change as a pill in the corner and the trend as a small line beside the figure.
    return (
      <div data-stat-row={n} className={cn("grid gap-4", statCols[n])}>
        {stats.map((s) => (
          <Card key={s.label} data-card-tone={s.tone} className="@container/stat flex flex-col gap-5 p-5">
            <div className="flex items-start justify-between gap-2">
              <p className="min-w-0 truncate text-sm text-muted-foreground">{s.label}</p>
              {deltaPill(s)}
            </div>
            <div className="mt-auto flex items-end justify-between gap-3">
              <div className="min-w-0">
                {figure(s, "text-3xl", "text-xl")}
                {s.hint && <p className="mt-2 truncate text-xs text-muted-foreground">{s.hint}</p>}
              </div>
              {s.spark && s.spark.length > 1 && (
                <Sparkline data={s.spark} kind="area" tone={s.trend === "flat" ? "muted" : (s.trend === "up") !== Boolean(s.invert) ? "primary" : "destructive"} width={80} height={32} className="hidden shrink-0 @[12rem]/stat:block" />
              )}
            </div>
          </Card>
        ))}
      </div>
    );
  }
  if (variant === "lead" && stats.length > 1) {
    // The first stat leads: wider, filled with the brand (unless it has its own tone), its
    // figure larger and its trend drawn across the card; the rest stay quiet beside it.
    const [first, ...rest] = stats;
    return (
      <div
        data-stat-row={n}
        className="grid gap-4 @md:grid-cols-2 @4xl:grid-cols-[var(--lead-cols)]"
        style={{ "--lead-cols": `minmax(0,1.6fr) repeat(${rest.length}, minmax(0,1fr))` } as React.CSSProperties}
      >
        <Card data-card-tone={first.tone ?? "brand"} className="@container/stat flex flex-col gap-4 p-5 @md:col-span-2 @4xl:col-span-1">
          <div className="flex items-start justify-between gap-2">
            <p className="min-w-0 truncate text-sm text-muted-foreground">{first.label}</p>
            {deltaPill(first)}
          </div>
          {figure(first, "text-4xl @md/stat:text-5xl", "text-2xl")}
          {first.hint && <p className="text-xs text-muted-foreground">{first.hint}</p>}
          {first.spark && first.spark.length > 1 && <Sparkline data={first.spark} kind="area" stretch className="mt-auto h-10 w-full" />}
        </Card>
        {rest.map((s) => (
          <Card key={s.label} data-card-tone={s.tone} className="flex flex-col gap-3 p-5">
            <p className="truncate text-sm text-muted-foreground">{s.label}</p>
            {figure(s, "text-2xl", "text-base")}
            <div className="mt-auto flex flex-wrap items-center gap-2">
              {deltaPill(s)}
              {s.hint && <span className="min-w-0 truncate text-xs text-muted-foreground">{s.hint}</span>}
            </div>
          </Card>
        ))}
      </div>
    );
  }
  if (variant === "panels") {
    // Icon square beside the label and number, then the stat's trend line (or,
    // for a score out of 100, a ring in place of the icon), and the change in
    // a footer line with a link arrow. Each panel takes the next accent:
    // the brand, the accent, then chart shades, all 3:1 on the card.
    return (
      <div data-stat-row={n} className={cn("grid gap-4", tileCols[n])}>
        {stats.map((s, i) => {
          const Icon = statIcon(s.label);
          const good = s.trend !== "flat" && (s.trend === "up") !== Boolean(s.invert);
          const ring = s.pct !== undefined;
          return (
            <Card key={s.label} data-card-tone={s.tone} className="flex flex-col p-4" style={{ "--stat-accent": PANEL_ACCENTS[i % PANEL_ACCENTS.length] } as React.CSSProperties}>
              <div className="flex items-start gap-3">
                {!ring && (
                  <span className="grid size-10 shrink-0 place-items-center rounded-md border border-[color-mix(in_oklch,var(--stat-accent)_30%,transparent)] bg-[color-mix(in_oklch,var(--stat-accent)_12%,transparent)] text-[var(--stat-accent)]">
                    <Icon className="size-5" />
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] text-muted-foreground">{s.label}</p>
                  <p className="mt-1.5 font-heading text-2xl leading-none font-semibold tracking-tight text-foreground tabular-nums">
                    {s.prefix && <span className="mr-0.5 text-lg text-muted-foreground">{s.prefix}</span>}
                    {s.value}
                    {s.unit && <span className="ml-0.5 text-base">{s.unit}</span>}
                    {s.total && <span className="ml-1 text-lg font-medium text-muted-foreground">/ {s.total}</span>}
                  </p>
                </div>
                {ring && <StatRing value={s.pct!} label={s.label} Icon={Icon} />}
              </div>
              {/* The stat's trend, when it has one: each panel in its own accent. */}
              {s.spark && s.spark.length > 1 && <Sparkline data={s.spark} kind="area" stretch color="var(--stat-accent)" className={cn("w-full", ring ? "mt-2 h-8" : "mt-3 h-11")} />}
              <div className="mt-auto flex items-center gap-1.5 pt-3 text-xs">
                {s.delta && (
                  <span className={cn("tabular-nums", s.trend === "flat" ? "text-muted-foreground" : good ? "text-diff-add" : "text-destructive")}>
                    {s.trend === "down" ? "↓" : s.trend === "up" ? "↑" : ""} {s.delta}
                  </span>
                )}
                {s.hint && <span className="truncate text-muted-foreground">{s.hint}</span>}
                <ArrowRight className="ml-auto size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
              </div>
            </Card>
          );
        })}
      </div>
    );
  }
  if (variant === "tiles") {
    // Icon tile + label, number with its change, and a quiet hint.
    return (
      <div data-stat-row={n} className={cn("grid gap-4", tileCols[n])}>
        {stats.map((s) => {
          const Icon = statIcon(s.label);
          return (
            <Card key={s.label} data-card-tone={s.tone} className="flex items-start gap-3.5 p-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/12 text-primary-ink">
                <Icon className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-snug text-muted-foreground">{s.label}</p>
                <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <p className="max-w-full min-w-0 font-heading text-3xl leading-none font-semibold tracking-tight text-foreground tabular-nums">
                    {s.prefix && <span className="mr-0.5 text-xl text-muted-foreground">{s.prefix}</span>}
                    {s.value}
                    {s.unit && <span className="ml-0.5 text-xl text-muted-foreground">{s.unit}</span>}
                  </p>
                  {s.delta && (
                    <span className={cn("max-w-full truncate rounded-full px-1.5 py-0.5 font-mono text-[11px] tabular-nums", deltaTone(s))}>{s.delta}</span>
                  )}
                </div>
                {s.hint && <p className="mt-1.5 text-xs text-muted-foreground">{s.hint}</p>}
              </div>
            </Card>
          );
        })}
      </div>
    );
  }
  if (variant === "strip") {
    return (
      // gap-px over a border-coloured card draws hairlines between cells in any column count.
      <Card data-stat-row={n} className={cn("grid gap-px overflow-hidden bg-border", stripCols[n])}>
        {stats.map((s) => (
          <div key={s.label} data-card-tone={s.tone} className="bg-card px-5 py-5">
            <p className="font-mono text-eyebrow uppercase tracking-[0.15em] text-muted-foreground">{s.label}</p>
            <div className="mt-3 flex items-baseline gap-2">
              <p className="font-heading text-3xl leading-none font-semibold tracking-tight text-foreground tabular-nums">
                {s.prefix && <span className="mr-0.5 text-xl text-muted-foreground">{s.prefix}</span>}
                {s.value}
                {s.unit && <span className="ml-0.5 text-xl text-muted-foreground">{s.unit}</span>}
              </p>
              {s.delta && (
                <span className={cn("rounded-full px-1.5 py-0.5 font-mono text-[11px] tabular-nums", deltaTone(s))}>{s.delta}</span>
              )}
            </div>
            {s.hint && <p className="mt-2 text-xs text-muted-foreground">{s.hint}</p>}
          </div>
        ))}
      </Card>
    );
  }
  return (
    <div data-stat-row={n} className={cn("grid gap-4", statCols[n])}>
      {stats.map((s) => (
        <StatCard key={s.label} {...s} spark={variant === "compact" ? undefined : s.spark} />
      ))}
    </div>
  );
}

/**
 * The same series seen over another range: each range after the first
 * reshapes the values a little (deterministically), so switching tabs in a
 * prototype visibly changes the chart. The first range is the data as given.
 */
function forRange<T extends { value: number }>(data: T[], range: number): T[] {
  if (!range) return data;
  return data.map((d, i) => ({ ...d, value: Math.max(0, Math.round(d.value * (1 + 0.22 * Math.sin(i * 1.7 + range * 2.3)) * (1 + range * 0.18))) }));
}

/** Range tabs for a chart's header ("7d", "30d", "90d"), the kit's pill tabs. */
function RangeTabs({ ranges, onChange, label }: { ranges: string[]; onChange: (r: string) => void; label: string }) {
  return (
    <TabsList aria-label={`${label} range`} className="h-control-sm">
      {ranges.map((r) => (
        <TabsTrigger key={r} value={r} className="px-2 text-xs" onClick={() => onChange(r)}>
          {r}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}

/** One tab of an area chart card with views: its own line, and optionally its own title. */
type AreaView = {
  label: string;
  title?: string;
  description?: string;
  seriesLabel?: string;
  points: { label: string; value: number }[];
  compare?: number[];
  compareLabel?: string;
  forecastFrom?: number;
  baseline?: { value: number; label?: string };
  markers?: { index: number; label: string }[];
};

type BarVariant = "default" | "stacked" | "diverging" | "focus" | "capsule" | "combo";

/** One tab of a bar chart card with views: its own bars, series and variant. */
type BarView = {
  label: string;
  title?: string;
  description?: string;
  bars: { label: string; value?: number; values?: number[] }[];
  series?: string[];
  variant?: BarVariant;
};

/**
 * One period in focus: every bar neutral (hatched in a hatched theme) but
 * the focused one, solid in the accent with its value in a pill above.
 * "capsule" draws each bar rising inside a full-height pale track. A click
 * (or Enter) moves the focus. One value per bar; several series sum.
 */
function SpotBars({
  data,
  capsule,
  prefix = "",
  suffix = "",
  focus,
}: {
  data: { label: string; value?: number; values?: number[] }[];
  capsule?: boolean;
  prefix?: string;
  suffix?: string;
  /** The bar in focus at first; the last (the current period) when left out. */
  focus?: number;
}) {
  const values = data.map((d) => Math.max(0, (d.values ?? [d.value ?? 0]).reduce((a, v) => a + v, 0)));
  const max = Math.max(1, ...values);
  const [picked, setPicked] = React.useState(focus ?? values.length - 1);
  const on = Math.min(Math.max(0, picked), values.length - 1);
  const fmt = (v: number) => `${prefix}${v >= 1e4 ? `${Math.round(v / 1000)}k` : v.toLocaleString("en-GB")}${suffix}`;
  return (
    <div data-slot="spot-bars" className="flex flex-1 flex-col gap-2">
      <div role="group" aria-label="Bars, pick one to focus it" className="flex flex-1 items-stretch gap-1.5 pt-8 @md:gap-2.5" style={{ minHeight: 184 }}>
        {values.map((v, i) => {
          const focused = i === on;
          const h = Math.max(capsule ? 8 : 2, (v / max) * 100);
          return (
            <button
              key={i}
              type="button"
              aria-pressed={focused}
              aria-label={`${data[i].label}: ${fmt(v)}`}
              onClick={() => setPicked(i)}
              className="group relative flex min-w-0 flex-1 cursor-pointer justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span aria-hidden="true" className={cn("relative h-full w-full", capsule ? "max-w-10" : "max-w-14")}>
                {/* The capsule's track, apart from the value pill so a rounded end never cuts it. */}
                {capsule && <span className="absolute inset-0 rounded-full bg-muted" />}
                <span
                  data-chart-rest={focused ? undefined : ""}
                  className={cn(
                    "absolute inset-x-0 bottom-0 transition-[height,background-color] duration-300",
                    capsule ? "rounded-full" : "rounded-t-lg",
                    focused ? "bg-highlight" : capsule ? "bg-highlight/30" : "bg-muted-foreground/20 group-hover:bg-muted-foreground/30",
                  )}
                  style={{ height: `${h}%` }}
                />
                {focused && (
                  <span
                    className="absolute left-1/2 -translate-x-1/2 rounded-full bg-foreground px-2 py-0.5 font-mono text-[11px] whitespace-nowrap text-background tabular-nums"
                    style={{ bottom: `calc(${h}% + 6px)` }}
                  >
                    {fmt(v)}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
      <div aria-hidden="true" className="flex gap-1.5 font-mono text-[10px] uppercase text-muted-foreground @md:gap-2.5">
        {data.map((d, i) => (
          <span key={i} className="flex min-w-0 flex-1 justify-center">
            <span className={cn("truncate rounded-full px-1.5 py-0.5", i === on && "bg-foreground text-background")}>{d.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** A chart card's views as a full-width tab row under its title: the names stay whole even in a narrow card. */
function ViewTabs({ views, onChange, label }: { views: string[]; onChange: (v: string) => void; label: string }) {
  return (
    <div className="px-5 pb-1">
      <TabsList aria-label={`${label} views`} className="h-control-sm w-full">
        {views.map((v) => (
          <TabsTrigger key={v} value={v} title={v} className="min-w-0 flex-1 px-2 text-xs" onClick={() => onChange(v)}>
            <span className="truncate">{v}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
}

/** A status as a dot and its words: the words carry the meaning, the dot's colour only backs it. */
function Status({ label }: { label: string }) {
  const tone: string = statusTone(label);
  const dot = tone === "success" ? "bg-diff-add" : tone === "warning" ? "bg-warning" : tone === "error" ? "bg-destructive" : tone === "neutral" ? "bg-muted-foreground/50" : "bg-primary-mark";
  return (
    <span className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
      <span aria-hidden="true" className={cn("size-1.5 shrink-0 rounded-full", dot)} />
      {label}
    </span>
  );
}

type DocLine = { label: string; detail?: string; qty?: string; amount: string };

/**
 * A document: an invoice, a receipt, a quote, an order confirmation. Its
 * facts across the top (number, dates, parties), the lines as a table, and
 * the sums under them with the last one, the total, set large.
 */
function DocumentCard({
  title,
  description,
  items,
  lines,
  sums,
  action,
  linkLabel,
}: {
  title: string;
  description?: string;
  items: { label: string; value: string; status?: boolean }[];
  lines: DocLine[];
  sums?: { label: string; value: string }[];
  action?: string;
  linkLabel?: string;
}) {
  const status = items.find((it) => it.status);
  const facts = items.filter((it) => !it.status);
  const hasQty = lines.some((l) => l.qty);
  return (
    <Card className="@container flex h-full flex-col">
      <CardContent className="flex flex-1 flex-col gap-6 pt-6">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
          <div className="min-w-0">
            <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">{title}</h2>
            {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
          </div>
          {status && <Badge variant={statusTone(status.value)}>{status.value}</Badge>}
        </div>
        {facts.length > 0 && (
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-y border-border py-4 @lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="min-w-0">
                <dt className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase">{f.label}</dt>
                <dd className="mt-1 text-sm font-medium break-words text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase">
              <th scope="col" className="pb-2 font-medium">Description</th>
              {hasQty && <th scope="col" className="pb-2 pl-3 text-right font-medium @max-xs:hidden">Qty</th>}
              <th scope="col" className="pb-2 pl-3 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((l, i) => (
              <tr key={i} className="border-t border-border align-top">
                <td className="py-2.5">
                  <span className="block text-pretty text-foreground">{l.label}</span>
                  {l.detail && <span className="block text-xs text-pretty text-muted-foreground">{l.detail}</span>}
                </td>
                {hasQty && <td className="py-2.5 pl-3 text-right whitespace-nowrap text-muted-foreground tabular-nums @max-xs:hidden">{l.qty}</td>}
                <td className="py-2.5 pl-3 text-right font-medium whitespace-nowrap text-foreground tabular-nums">{l.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {sums && sums.length > 0 && (
          <dl className="ml-auto flex w-full max-w-xs flex-col gap-1.5 border-t border-border pt-3">
            {sums.map((s, i) => {
              const total = i === sums.length - 1;
              return (
                <div key={s.label} className={cn("flex items-baseline justify-between gap-4", total && "mt-1 border-t border-border pt-2.5")}>
                  <dt className={cn("text-sm", total ? "font-medium text-foreground" : "text-muted-foreground")}>{s.label}</dt>
                  <dd className={cn("text-right whitespace-nowrap text-foreground tabular-nums", total ? "font-heading text-xl font-semibold tracking-tight" : "text-sm")}>{s.value}</dd>
                </div>
              );
            })}
          </dl>
        )}
        {(action || linkLabel) && (
          <div className="mt-auto flex flex-wrap items-center gap-3">
            {action && (
              <SlotButton slot="action" size="sm">
                <Download />
                {action}
              </SlotButton>
            )}
            {linkLabel && (
              <SlotLink slot="link" className="text-sm font-medium text-primary-ink underline-offset-4 hover:underline">
                {linkLabel}
              </SlotLink>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** One week of the month as seven columns: the day, its date (today filled) and its events as chips. In a narrow card, a list of the days that have something on. */
function WeekCalendar({ title, month, startDay, days, today, events, linkLabel }: { title: string; month: string; startDay: number; days: number; today?: number; events: { day: number; title: string; time?: string }[]; linkLabel?: string }) {
  const anchor = today ?? events[0]?.day ?? 1;
  const first = Math.max(1, anchor - ((startDay + anchor - 1) % 7));
  const week = Array.from({ length: 7 }, (_, i) => first + i).filter((d) => d <= days);
  const on = (d: number) => events.filter((e) => e.day === d);
  return (
    <Card className="@container flex h-full flex-col">
      <BlockHeader title={title} description={`${month} · ${week[0]}–${week[week.length - 1]}`} linkLabel={linkLabel} />
      <CardContent className="flex-1">
        <ol className="hidden h-full grid-cols-7 gap-px overflow-hidden rounded-lg border border-border bg-border @2xl:grid">
          {week.map((d) => {
            const wd = WEEKDAYS[(startDay + d - 1) % 7];
            return (
              <li key={d} className="flex min-h-40 min-w-0 flex-col gap-1.5 bg-card p-2">
                <p className="flex items-center justify-between gap-1">
                  <span className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase">{wd}</span>
                  <span className={cn("grid size-6 place-items-center rounded-full text-xs tabular-nums", d === today ? "bg-primary-strong font-semibold text-primary-foreground" : "text-foreground")}>
                    {d}
                    {d === today && <span className="sr-only">, today</span>}
                  </span>
                </p>
                {on(d).map((e, i) => (
                  <p key={i} className="rounded-sm border-l-2 border-primary-mark bg-primary/10 px-1.5 py-1 text-[11px] leading-snug text-foreground">
                    {e.time && <span className="block font-mono text-[10px] text-muted-foreground">{e.time}</span>}
                    <span className="line-clamp-2 [overflow-wrap:anywhere]">{e.title}</span>
                  </p>
                ))}
              </li>
            );
          })}
        </ol>
        <ol className="flex flex-col divide-y divide-border @2xl:hidden">
          {week.map((d) => (
            <li key={d} className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
              <span className={cn("grid size-9 shrink-0 place-items-center rounded-md text-center leading-none", d === today ? "bg-primary-strong text-primary-foreground" : "bg-muted text-foreground")}>
                <span className="font-mono text-[9px] uppercase">{WEEKDAYS[(startDay + d - 1) % 7]}</span>
                <span className="text-sm font-semibold tabular-nums">{d}</span>
              </span>
              <span className="min-w-0 flex-1 pt-0.5">
                {on(d).length === 0 ? (
                  <span className="text-sm text-muted-foreground">Nothing planned</span>
                ) : (
                  on(d).map((e, i) => (
                    <span key={i} className="block text-sm text-pretty text-foreground">
                      {e.time && <span className="mr-1.5 font-mono text-xs text-muted-foreground">{e.time}</span>}
                      {e.title}
                    </span>
                  ))
                )}
              </span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}

/** The top three on a podium (second, first, third, the first tallest) and everyone after them in a list. */
function Podium({ title, description, items, linkLabel }: { title: string; description?: string; items: { name: string; meta?: string; value?: string; change?: string }[]; linkLabel?: string }) {
  const top = items.slice(0, 3);
  const order = top.length === 3 ? [1, 0, 2] : top.map((_, i) => i);
  const HEIGHT = ["h-24", "h-16", "h-12"];
  return (
    <Card className="@container flex h-full flex-col">
      <BlockHeader title={title} description={description} linkLabel={linkLabel} />
      <CardContent className="flex flex-1 flex-col gap-4">
        <ol className="flex items-end justify-center gap-2 @sm:gap-4" aria-label="Top three">
          {order.map((i) => {
            const it = top[i];
            return (
              <li key={it.name} value={i + 1} className="flex min-w-0 flex-1 flex-col items-center gap-1.5 text-center">
                <Avatar name={it.name} size={i === 0 ? "lg" : "md"} />
                <span className="line-clamp-2 max-w-full text-xs font-medium text-foreground [overflow-wrap:anywhere] @sm:text-sm">{it.name}</span>
                {it.value && <span className="text-xs font-semibold text-foreground tabular-nums">{it.value}</span>}
                <span className={cn("grid w-full place-items-start justify-center rounded-t-lg pt-2 font-heading text-lg font-semibold", HEIGHT[i], i === 0 ? "bg-primary-strong text-primary-foreground" : "bg-muted text-foreground")}>
                  {i + 1}
                  <span className="sr-only">{i === 0 ? "st place" : i === 1 ? "nd place" : "rd place"}</span>
                </span>
              </li>
            );
          })}
        </ol>
        {items.length > 3 && (
          <ol start={4} className="flex flex-col divide-y divide-border">
            {items.slice(3).map((it, i) => (
              <li key={it.name} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                <span className="w-5 shrink-0 text-center font-mono text-xs text-muted-foreground tabular-nums">{i + 4}</span>
                <Avatar name={it.name} size="sm" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-foreground">{it.name}</span>
                  {it.meta && <span className="block truncate text-xs text-muted-foreground">{it.meta}</span>}
                </span>
                {it.value && <span className="shrink-0 text-sm font-medium text-foreground tabular-nums">{it.value}</span>}
              </li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  );
}

// --- the designs above, as variants of their elements ----------------------
// Each element keeps its own component (…Base); the wrapper sends the newer
// designs to theirs. A design that needs content the section doesn't have
// (an inbox without conversations) falls back to the element's first design.

type BaseProps<T extends (props: never) => unknown, Extra> = Omit<Parameters<T>[0], "variant"> & { variant?: string } & Extra;

function KeyValueCard({ variant, lines, sums, ...props }: BaseProps<typeof KeyValueCardBase, { lines?: DocLine[]; sums?: { label: string; value: string }[] }>) {
  if (variant === "document" && lines && lines.length > 0) return <DocumentCard title={props.title} description={props.description} items={props.items} lines={lines} sums={sums} action={props.action} linkLabel={props.linkLabel} />;
  return <KeyValueCardBase {...props} variant={variant === "grid" || variant === "properties" || variant === "methods" ? variant : "list"} />;
}

function CalendarCard({ variant, ...props }: BaseProps<typeof CalendarCardBase, object>) {
  if (variant === "week") return <WeekCalendar title={props.title} month={props.month} startDay={props.startDay ?? 0} days={props.days ?? 30} today={props.today} events={props.events ?? []} linkLabel={props.linkLabel} />;
  return <CalendarCardBase {...props} variant={variant === "events" ? "events" : "month"} />;
}

function LeaderboardCard({ variant, ...props }: BaseProps<typeof LeaderboardCardBase, object>) {
  if (variant === "podium" && props.items.length >= 3) return <Podium title={props.title} description={props.description} items={props.items} linkLabel={props.linkLabel} />;
  return <LeaderboardCardBase {...props} variant={variant === "people" ? "people" : "ranked"} />;
}

// --- plots: several series, stacked areas, a scatter, bars with a line --------

/**
 * A chart with four or more series takes its colours as a scale: shades of
 * one colour run light to dark by series, where the usual order (each next
 * to the shade furthest from it) reads as noise. See [data-series-ramp] in
 * globals.css; other palettes are the same either way.
 */
const ramp = (series: number) => (series > 3 ? { "data-series-ramp": "" } : {});

const PLOT_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

const plotNum = (v: number) => (Math.abs(v) >= 1e6 ? `${+(v / 1e6).toFixed(1)}M` : Math.abs(v) >= 1e3 ? `${+(v / 1e3).toFixed(1)}k` : `${+v.toFixed(Math.abs(v) < 10 && v % 1 ? 1 : 0)}`);

/** The axis top for a largest value: the next 1, 2, 2.5, 5 or 10 times a power of ten. */
function niceTop(v: number) {
  const p = Math.pow(10, Math.floor(Math.log10(Math.max(v, 1e-9))));
  const f = v / p;
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p;
}

type PlotSeries = { label: string; values: number[] };

type PlotDot = { x: number; y: number; label?: string; size?: number };

/**
 * One plot for the charts a single line can't draw: "lines" (two to four
 * series on one scale), "stacked" (the same as areas adding up to a total),
 * "scatter" (things placed by two measures, the dot's size a third) and
 * "combo" (bars with a line on its own scale: volume and a rate). The data
 * is also a table for screen readers; series are told apart by the legend's
 * names as well as colour.
 */
function PlotChart({
  mode,
  title,
  labels = [],
  series = [],
  dots = [],
  bars = [],
  line = [],
  barLabel,
  lineLabel,
  xLabel,
  yLabel,
  prefix = "",
  suffix = "",
  lineSuffix = "",
}: {
  mode: "lines" | "stacked" | "scatter" | "combo";
  title: string;
  labels?: string[];
  series?: PlotSeries[];
  dots?: PlotDot[];
  bars?: number[];
  line?: number[];
  barLabel?: string;
  lineLabel?: string;
  xLabel?: string;
  yLabel?: string;
  prefix?: string;
  suffix?: string;
  lineSuffix?: string;
}) {
  const W = 600;
  const H = 200;
  const n = mode === "combo" ? bars.length : labels.length;
  const totals = labels.map((_, i) => series.reduce((a, s) => a + (s.values[i] ?? 0), 0));
  const ys = mode === "stacked" ? totals : mode === "scatter" ? dots.map((d) => d.y) : mode === "combo" ? bars : series.flatMap((s) => s.values);
  const top = niceTop(Math.max(1, ...ys));
  const xTop = niceTop(Math.max(1, ...dots.map((d) => d.x)));
  const lineTop = niceTop(Math.max(1, ...line));
  const y = (v: number, max = top) => H - (v / max) * (H - 6);
  const x = (i: number) => (mode === "combo" ? ((i + 0.5) / Math.max(1, n)) * W : n <= 1 ? W / 2 : (i / (n - 1)) * W);
  const path = (vals: number[], max = top) => vals.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v, max).toFixed(1)}`).join(" ");
  const fmt = (v: number) => `${prefix}${plotNum(v)}${suffix}`;
  // Stacked: each series sits on the ones before it.
  const bands = series.map((s, k) => {
    const base = labels.map((_, i) => series.slice(0, k).reduce((a, b) => a + (b.values[i] ?? 0), 0));
    const upper = base.map((b, i) => b + (s.values[i] ?? 0));
    return { upper, d: `${path(upper)} ${base.map((b, i) => `L${x(labels.length - 1 - i).toFixed(1)},${y(base[labels.length - 1 - i]).toFixed(1)}`).join(" ")} Z` };
  });
  const legend =
    mode === "combo"
      ? [
          { label: barLabel ?? "Volume", color: PLOT_COLORS[0], square: true },
          ...(line.length ? [{ label: lineLabel ?? "Rate", color: PLOT_COLORS[1], square: false }] : []),
        ]
      : mode === "scatter"
        ? []
        : series.map((s, k) => ({ label: s.label, color: PLOT_COLORS[k % 5], square: mode === "stacked" }));
  const axis = "2.75rem";
  return (
    <div data-slot="plot-chart" className="relative flex flex-1 flex-col gap-2">
      {/* For screen readers. The wrapper is what's hidden: a table ignores sr-only's 1px width, and four series made it wider than a phone. */}
      <div className="sr-only">
      <table>
        <caption>{title}</caption>
        {mode === "scatter" ? (
          <tbody>
            {dots.map((d, i) => (
              <tr key={i}>
                <th scope="row">{d.label ?? `Point ${i + 1}`}</th>
                <td>{`${xLabel ?? "x"} ${d.x}`}</td>
                <td>{`${yLabel ?? "y"} ${d.y}`}</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            {(mode === "combo" ? bars.map((_, i) => labels[i] ?? `${i + 1}`) : labels).map((l, i) => (
              <tr key={i}>
                <th scope="row">{l}</th>
                {mode === "combo" ? (
                  <>
                    <td>{`${barLabel ?? "Volume"} ${fmt(bars[i])}`}</td>
                    {line[i] !== undefined && <td>{`${lineLabel ?? "Rate"} ${plotNum(line[i])}${lineSuffix}`}</td>}
                  </>
                ) : (
                  series.map((s) => <td key={s.label}>{`${s.label} ${fmt(s.values[i] ?? 0)}`}</td>)
                )}
              </tr>
            ))}
          </tbody>
        )}
      </table>
      </div>
      <div aria-hidden="true" className="relative min-h-44 flex-1">
        {[1, 0.75, 0.5, 0.25].map((f) => (
          <span key={f} className="pointer-events-none absolute left-0 -translate-y-1/2 font-mono text-[11px] text-muted-foreground" style={{ top: `${(y(top * f) / H) * 100}%` }}>
            {fmt(top * f)}
          </span>
        ))}
        {mode === "combo" && line.length > 0 && (
          <span className="pointer-events-none absolute top-0 right-0 -translate-y-1/2 font-mono text-[11px]" style={{ color: PLOT_COLORS[1] }}>
            {plotNum(lineTop)}
            {lineSuffix}
          </span>
        )}
        <div className="absolute inset-y-0 right-0" style={{ left: axis }}>
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" fill="none">
            {[1, 0.75, 0.5, 0.25].map((f) => (
              <line key={f} data-chart-grid="" x1="0" x2={W} y1={y(top * f)} y2={y(top * f)} stroke="var(--border)" strokeDasharray="2 4" vectorEffect="non-scaling-stroke" />
            ))}
            <line x1="0" x2={W} y1={H} y2={H} stroke="var(--border)" vectorEffect="non-scaling-stroke" />
            {mode === "stacked" && bands.map((b, k) => <path key={k} d={b.d} style={{ fill: PLOT_COLORS[k % 5], fillOpacity: 0.26 }} />)}
            {mode === "stacked" && bands.map((b, k) => <path key={k} d={path(b.upper)} strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" style={{ stroke: PLOT_COLORS[k % 5] }} />)}
            {mode === "lines" &&
              series.map((s, k) => (
                <path key={s.label} data-chart-line="" d={path(s.values)} strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={k === 0 ? undefined : k === 1 ? "none" : "6 4"} vectorEffect="non-scaling-stroke" style={{ stroke: PLOT_COLORS[k % 5] }} />
              ))}
            {mode === "combo" && line.length > 1 && <path data-chart-line="" d={path(line, lineTop)} strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" style={{ stroke: PLOT_COLORS[1] }} />}
          </svg>
          {/* Bars, points and dots are HTML so they stay round and square at any width. */}
          {mode === "combo" &&
            bars.map((v, i) => (
              <span key={i} data-chart-bar="" className="absolute bottom-0 -translate-x-1/2 rounded-t-md" style={{ left: `${(x(i) / W) * 100}%`, width: `${Math.min(56, 62 / Math.max(1, n))}%`, height: `${(v / top) * ((H - 6) / H) * 100}%`, background: `color-mix(in oklch, ${PLOT_COLORS[0]} 78%, var(--card))` }} />
            ))}
          {mode === "combo" &&
            line.map((v, i) => (
              <span key={i} className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-card" style={{ left: `${(x(i) / W) * 100}%`, top: `${(y(v, lineTop) / H) * 100}%`, background: PLOT_COLORS[1] }} />
            ))}
          {mode === "lines" &&
            series.map((s, k) => (
              <span key={s.label} className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-card" style={{ left: "100%", top: `${(y(s.values[s.values.length - 1] ?? 0) / H) * 100}%`, background: PLOT_COLORS[k % 5] }} />
            ))}
          {mode === "scatter" &&
            dots.map((d, i) => {
              const size = 8 + Math.min(1, (d.size ?? 0) / Math.max(1, ...dots.map((q) => q.size ?? 0))) * 14;
              return (
                <span
                  key={i}
                  title={d.label}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border"
                  style={{ left: `${(d.x / xTop) * 100}%`, top: `${(y(d.y) / H) * 100}%`, width: size, height: size, background: `color-mix(in oklch, ${PLOT_COLORS[i % 2]} 40%, transparent)`, borderColor: PLOT_COLORS[i % 2] }}
                />
              );
            })}
          {/* The few points worth naming carry their label; the rest read from the axes. */}
          {mode === "scatter" &&
            dots
              .filter((d) => d.label)
              .slice(0, 4)
              .map((d, i) => (
                <span key={i} className="pointer-events-none absolute -translate-y-1/2 pl-3 font-mono text-[10px] whitespace-nowrap text-foreground @max-xs:hidden" style={{ left: `${(d.x / xTop) * 100}%`, top: `${(y(d.y) / H) * 100}%` }}>
                  {d.label}
                </span>
              ))}
        </div>
      </div>
      {mode === "scatter" ? (
        <div aria-hidden="true" className="flex justify-between font-mono text-[11px] text-muted-foreground" style={{ paddingLeft: axis }}>
          <span>0</span>
          <span>{xLabel}</span>
          <span>{plotNum(xTop)}</span>
        </div>
      ) : (
        <div aria-hidden="true" className={cn("flex font-mono text-[11px] uppercase text-muted-foreground", mode === "combo" ? "justify-around" : "justify-between")} style={{ paddingLeft: axis }}>
          {(mode === "combo" ? bars.map((_, i) => labels[i] ?? "") : labels).map((l, i) => (
            <span key={i} className={cn("min-w-0 truncate", i % 2 === 1 && "@max-sm:hidden")}>
              {l}
            </span>
          ))}
        </div>
      )}
      {(legend.length > 0 || yLabel) && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground" style={{ paddingLeft: axis }}>
          {legend.map((l) => (
            <span key={l.label} className="flex items-center gap-1.5">
              <span aria-hidden="true" className={cn("size-2", l.square ? "rounded-[2px]" : "rounded-full")} style={{ background: l.color }} />
              {l.label}
            </span>
          ))}
          {mode === "scatter" && yLabel && <span>{yLabel} up, {xLabel ?? "x"} across</span>}
        </div>
      )}
    </div>
  );
}

function AreaChartCard({
  variant = "default",
  title,
  description,
  seriesLabel,
  prefix,
  suffix,
  points: given,
  ranges,
  compare,
  compareLabel,
  forecastFrom,
  baseline,
  markers,
  views,
  series,
  dots,
  xLabel,
  yLabel,
}: {
  variant?: "default" | "summary" | "lines" | "stacked" | "scatter";
  title: string;
  description?: string;
  seriesLabel: string;
  prefix?: string;
  suffix?: string;
  /** lines, stacked: two to four series, one value per point. */
  series?: PlotSeries[];
  /** scatter: things placed by two measures. */
  dots?: PlotDot[];
  xLabel?: string;
  yLabel?: string;
  points: { label: string; value: number }[];
  /** Range tabs over the chart ("7d", "30d", "90d"); the first is selected. */
  ranges?: string[];
  /** The same points over the previous period, as a dashed line. */
  compare?: number[];
  compareLabel?: string;
  /** Points from this index on are a forecast. */
  forecastFrom?: number;
  /** A level to stay above or below, with its label ("Buffer €60k"). */
  baseline?: { value: number; label?: string };
  /** Notes on points ("Payday"). */
  markers?: { index: number; label: string }[];
  /** 2-3 related charts in one card, as tabs in its header (in place of range tabs): the first is this chart's own. */
  views?: AreaView[];
}) {
  const [picked, setRange] = React.useState(ranges?.[0] ?? "");
  const [viewPicked, setView] = React.useState(views?.[0]?.label ?? "");
  // Several series, or a scatter: the plot (a single series keeps the area chart below).
  const plot = variant === "scatter" ? (dots && dots.length > 1 ? "scatter" : null) : variant === "lines" || variant === "stacked" ? (series && series.length > 1 ? variant : null) : null;
  if (plot) {
    return (
      <Card className="@container flex h-full flex-col" {...ramp(plot === "scatter" ? 0 : (series?.length ?? 0))}>
        <CardHeader title={title} description={description} />
        <CardContent className="flex flex-1 flex-col">
          <PlotChart mode={plot} title={title} labels={given.map((p) => p.label)} series={series} dots={dots} xLabel={xLabel} yLabel={yLabel} prefix={prefix} suffix={suffix} />
        </CardContent>
      </Card>
    );
  }
  if (views && views.length > 1) {
    const v = views.find((x) => x.label === viewPicked) ?? views[0];
    return (
      <Tabs value={v.label} onValueChange={setView} className="h-full gap-0">
        <Card className="flex h-full flex-col">
          <CardHeader title={v.title ?? title} description={v.description ?? description} />
          <ViewTabs views={views.map((x) => x.label)} onChange={setView} label={title} />
          <CardContent className="flex flex-1 flex-col">
            <TabsContent value={v.label} className="mt-0 flex flex-1 flex-col">
              <AreaChart
                data={v.points}
                seriesLabel={v.seriesLabel ?? seriesLabel}
                prefix={prefix}
                suffix={suffix}
                compare={v.compare?.length === v.points.length ? v.compare : undefined}
                compareLabel={v.compareLabel}
                forecastFrom={v.forecastFrom}
                baseline={v.baseline}
                markers={v.markers}
                fill
                className="flex-1"
              />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    );
  }
  const range = ranges?.includes(picked) ? picked : (ranges?.[0] ?? "");
  const points = forRange(given, Math.max(0, ranges?.indexOf(range) ?? 0));
  const rangeTabs = ranges?.length ? <RangeTabs ranges={ranges} onChange={setRange} label={title} /> : undefined;
  const first = points[0]?.value ?? 0;
  const last = points[points.length - 1]?.value ?? 0;
  const change = first ? Math.round(((last - first) / first) * 100) : 0;
  return (
    <Tabs value={range} onValueChange={setRange} className="h-full gap-0">
      {/* In a card stretched beside a taller one, the chart takes the extra height instead of leaving it empty. */}
      <Card className="flex h-full flex-col">
        {variant === "summary" ? (
          <div className="px-5 pt-4">
            {/* Narrow (a third of the page): the range tabs go under the title instead of squeezing it. */}
            <div className="flex flex-col gap-2 @sm:flex-row @sm:items-start @sm:justify-between @sm:gap-3">
              <p className="min-w-0 font-mono text-eyebrow uppercase tracking-[0.15em] text-muted-foreground">{title}</p>
              {rangeTabs}
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="font-heading text-3xl font-semibold tracking-tight text-foreground tabular-nums">
                {prefix}
                {last.toLocaleString("en-GB")}
                {suffix}
              </p>
              <Badge variant={change >= 0 ? "success" : "error"}>
                {change >= 0 ? "↑" : "↓"} {Math.abs(change)}%
              </Badge>
            </div>
            {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
          </div>
        ) : (
          <CardHeader title={title} description={description} action={rangeTabs} />
        )}
        <CardContent className="flex flex-1 flex-col">
          <TabsContent value={range} className="mt-0 flex flex-1 flex-col">
            <AreaChart
              data={points}
              seriesLabel={seriesLabel}
              prefix={prefix}
              suffix={suffix}
              compare={compare?.length === points.length ? compare : undefined}
              compareLabel={compareLabel}
              forecastFrom={forecastFrom}
              baseline={baseline}
              markers={markers}
              fill
              className="flex-1"
            />
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
}

function BarChartCard({
  variant = "default",
  title,
  description,
  focus,
  bars: given,
  series,
  prefix,
  suffix,
  ranges,
  views,
  line,
  lineLabel,
  lineSuffix,
}: {
  /**
   * stacked: the series on top of each other. diverging: positives up, negatives down (in and out).
   * focus: one bar solid and labelled, the rest neutral. capsule: bars rising in full-height tracks.
   * combo: the bars with a line over them on its own scale (volume and a rate).
   */
  variant?: BarVariant;
  /** combo: one value per bar for the line, its name and its unit ("%"). */
  line?: number[];
  lineLabel?: string;
  lineSuffix?: string;
  title: string;
  description?: string;
  /** The bar focus and capsule start on (the last when left out). */
  focus?: number;
  /** One value per bar, or `values` (one per series) for several series. */
  bars: { label: string; value?: number; values?: number[] }[];
  /** The series' names, in the order of `values`. */
  series?: string[];
  prefix?: string;
  suffix?: string;
  /** Range tabs over the chart ("Week", "Month", "Year"); the first is selected. */
  ranges?: string[];
  /** 2-3 related charts in one card, as tabs in its header (in place of range tabs): the first is this chart's own. */
  views?: BarView[];
}) {
  const [picked, setRange] = React.useState(ranges?.[0] ?? "");
  const [viewPicked, setView] = React.useState(views?.[0]?.label ?? "");
  if (variant === "combo" && line && line.length > 1) {
    return (
      <Card className="@container flex h-full flex-col">
        <CardHeader title={title} description={description} />
        <CardContent className="flex flex-1 flex-col">
          <PlotChart mode="combo" title={title} labels={given.map((b) => b.label)} bars={given.map((b) => b.value ?? b.values?.[0] ?? 0)} line={line.slice(0, given.length)} barLabel={series?.[0]} lineLabel={lineLabel} lineSuffix={lineSuffix} prefix={prefix} suffix={suffix} />
        </CardContent>
      </Card>
    );
  }
  if (views && views.length > 1) {
    const v = views.find((x) => x.label === viewPicked) ?? views[0];
    const vmulti = v.bars.some((b) => (b.values?.length ?? 0) > 1);
    const mode = v.variant ?? variant;
    // Focus and capsule show one value per bar; several series keep the regular chart.
    const spot = !vmulti && (mode === "focus" || mode === "capsule");
    return (
      <Tabs value={v.label} onValueChange={setView} className="h-full gap-0">
        <Card className="flex h-full flex-col" {...ramp(vmulti ? (v.series?.length ?? 0) : 0)}>
          <CardHeader title={v.title ?? title} description={v.description ?? description} />
          <ViewTabs views={views.map((x) => x.label)} onChange={setView} label={title} />
          <CardContent className="flex flex-1 flex-col">
            <TabsContent value={v.label} className="mt-0 flex flex-1 flex-col">
              {spot ? (
                <SpotBars data={v.bars} capsule={mode === "capsule"} prefix={prefix} suffix={suffix} focus={focus} />
              ) : (
                <BarChart data={v.bars} series={vmulti ? v.series : undefined} mode={mode === "stacked" || mode === "diverging" ? mode : "grouped"} prefix={prefix} suffix={suffix} fill className="flex-1" />
              )}
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    );
  }
  const range = ranges?.includes(picked) ? picked : (ranges?.[0] ?? "");
  const step = Math.max(0, ranges?.indexOf(range) ?? 0);
  // Each series reshaped for the range, keeping its sign (diverging bars go down).
  const bars = given.map((b) => {
    const values = b.values ?? [b.value ?? 0];
    const shaped = values.map((v) => Math.sign(v || 1) * forRange([{ value: Math.abs(v) }], step)[0].value);
    return { label: b.label, values: shaped };
  });
  const multi = bars.some((b) => b.values.length > 1);
  return (
    <Tabs value={range} onValueChange={setRange} className="h-full gap-0">
      <Card className="flex h-full flex-col" {...ramp(multi ? (series?.length ?? 0) : 0)}>
        <CardHeader title={title} description={description} action={ranges?.length ? <RangeTabs ranges={ranges} onChange={setRange} label={title} /> : undefined} />
        <CardContent className="flex flex-1 flex-col">
          <TabsContent value={range} className="mt-0 flex flex-1 flex-col">
            {!multi && (variant === "focus" || variant === "capsule") ? (
              <SpotBars data={bars} capsule={variant === "capsule"} prefix={prefix} suffix={suffix} focus={focus} />
            ) : (
              <BarChart data={bars} series={multi ? series : undefined} mode={variant === "stacked" || variant === "diverging" ? variant : "grouped"} prefix={prefix} suffix={suffix} fill className="flex-1" />
            )}
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
}

// One colour per item for the "dots" design: the brand first, then signals.
// Series colours come from the theme's chart palette (--chart-1…5).
const ITEM_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)", "var(--muted-foreground)"];

/** Status words map to badge tones by meaning, not by position. */
function statusTone(value: string) {
  const v = value.toLowerCase();
  // Checked first: "deactivated" contains "active".
  if (/(deactivated|inactive|disabled|archived|not used|unassigned)/.test(v)) return "neutral";
  if (/(lost|stolen|revoked)/.test(v)) return "error";
  if (/(demand|low battery|^low$|warning|attention|expiring|needs you|needs review|action needed)/.test(v)) return "warning";
  if (/(synchron|synced|programmed|online|good)/.test(v)) return "success";
  if (/(active|paid|done|complete|confirmed|success|live|healthy|approved|delivered|open|returned|checked in|published|featured)/.test(v)) return "success";
  if (/(pending|trial|draft|review|scheduled|waiting|processing|new|invited|progress|transit|editing|on rent)/.test(v)) return "warning";
  if (/(overdue|failed|cancel|churn|declined|error|blocked|expired|lost|no-show|delayed)/.test(v)) return "error";
  return "neutral";
}

/** Read-only tags from "A, B, C": up to three, then "+n". */
function Tags({ value }: { value: string }) {
  const tags = value
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t && t !== "–");
  if (tags.length === 0) return <span className="text-muted-foreground">–</span>;
  return (
    <span className="inline-flex flex-wrap gap-1">
      {tags.slice(0, 3).map((t) => (
        <span key={t} className="rounded-full bg-primary/12 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-primary-ink">
          {t}
        </span>
      ))}
      {tags.length > 3 && (
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground" title={tags.slice(3).join(", ")}>
          +{tags.length - 3}
        </span>
      )}
    </span>
  );
}

/**
 * The right-aligned ••• menu for a table row. Each action is a slot
 * ("row-0"…) that can open an overlay for this row; data-slots tells the
 * Studio about them while the menu is closed.
 */
function RowMenu({ actions, label, vars }: { actions: string[]; label: string; vars: Record<string, string> }) {
  const trigger = React.useRef<HTMLButtonElement>(null);
  const { opens } = useSectionWiring();
  const overlays = actions.map((_, i) => opens[`row-${i}`]).filter((o) => o !== undefined);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          ref={trigger}
          variant="ghost"
          size="icon-sm"
          aria-label={label}
          data-slots={JSON.stringify(actions.map((a, i) => [`row-${i}`, `Row menu: ${a}`]))}
          data-opens={overlays.length ? overlays.join(",") : undefined}
        >
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((a, i) => (
          <RowMenuItem key={a} slot={`row-${i}`} trigger={trigger} vars={vars}>
            {a}
          </RowMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function RowMenuItem({ slot, trigger, vars, children }: { slot: string; trigger: React.RefObject<HTMLButtonElement | null>; vars: Record<string, string>; children: React.ReactNode }) {
  const act = useSlotAction(slot);
  const quick = useQuickAction();
  // Once the menu has closed and handed focus back to its button. Unwired: it does what it says, to this row.
  return (
    <DropdownMenuItem
      onSelect={() =>
        window.setTimeout(() => (act ? act(trigger.current, vars) : quick(`${typeof children === "string" ? children : ""}${vars.name ? ` ${vars.name}` : ""}`)))
      }
    >
      {children}
    </DropdownMenuItem>
  );
}

/**
 * A row's name: hover or focus shows the rest of the row in a card, and a
 * click opens what the "row" slot is wired to (its details, usually).
 */
function RowName({ name, details, vars, avatar }: { name: string; details: [string, string][]; vars: Record<string, string>; avatar?: boolean }) {
  const act = useSlotAction("row");
  const overlay = useSectionWiring().opens.row;
  // The card steps aside once the name opens something.
  const [card, setCard] = React.useState(false);
  const content = (
    <>
      {avatar && <Avatar name={name} size="sm" />}
      <span className={cn(act && "underline-offset-4 group-hover/name:underline")}>{name}</span>
    </>
  );
  const trigger = act ? (
    <button
      type="button"
      aria-haspopup={overlay !== undefined ? "dialog" : undefined}
      data-link="row"
      data-overlay={overlay}
      data-slot-label="Each row's name"
      onClick={(e) => {
        setCard(false);
        act(e.currentTarget, vars);
      }}
      className="group/name flex items-center gap-2.5 rounded-sm text-left font-medium text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {content}
    </button>
  ) : (
    <span data-link="row" data-slot-label="Each row's name" className="flex items-center gap-2.5">
      {content}
    </span>
  );
  if (!details.length) return trigger;
  return (
    <HoverCard open={card} onOpenChange={setCard} openDelay={350} closeDelay={100}>
      <HoverCardTrigger asChild>{trigger}</HoverCardTrigger>
      <HoverCardContent align="start" className="flex flex-col gap-3">
        <span className="flex items-center gap-2.5">
          <Avatar name={name} size="md" />
          <span className="font-heading text-sm font-semibold">{name}</span>
        </span>
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 border-t border-border pt-2.5 text-xs">
          {details.slice(0, 4).map(([k, v]) => (
            <React.Fragment key={k}>
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="truncate text-foreground">{v}</dd>
            </React.Fragment>
          ))}
        </dl>
      </HoverCardContent>
    </HoverCard>
  );
}

// Thumbnails without images: generated art in the theme's colours per item,
// with a small badge for its kind, so a gallery reads as media rather than rows.
const THUMB_ICONS: [RegExp, React.ComponentType<{ className?: string }>][] = [
  [/\b(comic|story|book)/i, BookOpen],
  [/\b(animation|video|film|episode)/i, Clapperboard],
  [/\b(drawing|art|paint|illustration|design)/i, Palette],
  [/\b(cartoon|movie)/i, Film],
];

const THUMB_FALLBACK = [Rocket, Sparkles, Star, Palette];

function Thumbnail({ name, kind, index }: { name: string; kind: string; index: number }) {
  const Icon = THUMB_ICONS.find(([re]) => re.test(kind))?.[1] ?? THUMB_FALLBACK[index % THUMB_FALLBACK.length];
  return (
    <BrandArt seed={name} className="aspect-[2/1] rounded-[calc(var(--radius-lg)-2px)]">
      <span role="img" aria-label={`${name} cover`} className="absolute inset-0" />
      <span aria-hidden="true" className="absolute bottom-2 left-2 grid size-7 place-items-center rounded-md bg-black/35 text-white backdrop-blur-sm">
        <Icon className="size-4" />
      </span>
      <span aria-hidden="true" className="absolute top-2 right-2 grid size-7 place-items-center rounded-full bg-white/90 text-neutral-700">
        <MoreHorizontal className="size-4" />
      </span>
    </BrandArt>
  );
}

/** Search and filter chips over a table (the kit's table toolbar); filters toggle on and off. */
function TableTools({ search, filters = [] }: { search?: string; filters?: string[] }) {
  const [query, setQuery] = React.useState("");
  const [on, setOn] = React.useState<string[]>([]);
  const narrowed = Boolean(query.trim()) || on.length > 0;
  return (
    <TableToolbar
      search={search ? { value: query, onChange: setQuery, placeholder: search } : undefined}
      filters={
        (filters.length > 0 || narrowed) && (
          <div role="group" aria-label="Filters" className="flex flex-wrap items-center gap-1.5">
            {filters.map((f) => {
              const pressed = on.includes(f);
              return (
                <button
                  data-slot="chip"
                  key={f}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => setOn(pressed ? on.filter((x) => x !== f) : [...on, f])}
                  className={cn(chipVariants({ variant: "outline", selected: pressed }), "min-h-8")}
                >
                  {f}
                </button>
              );
            })}
            {/* Back to everything in one go, once a search or a filter narrows the list. */}
            {narrowed && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setQuery("");
                  setOn([]);
                }}
              >
                Clear all
              </Button>
            )}
          </div>
        )
      }
    />
  );
}

/** "Mara Lindqvist", "M. Kowalski": a person, who gets a face; "WO-2481" or "HR coil" doesn't. */
const isPersonName = (v: string) => /^[A-Z][a-zà-ÿ'’-]*\.?(\s+[A-Z][a-zà-ÿ'’.-]+){1,2}$/.test(v.trim()) && !/\d/.test(v);

/** "WO-2481", "INV-0042", "#1290": a record's id, set in monospace. */
const isRecordId = (v: string) => /^(#?[A-Z]{1,6}[-_ ]?\d{2,}|#\d{2,})$/.test(v.trim());

function DataTableCard({
  variant = "table",
  title,
  description,
  columns,
  rows: allRows,
  statusColumn,
  tagColumns,
  rowActions,
  actionLabel,
  search,
  filters,
  statusTabs,
  groupBy,
  total,
  bulkActions,
  loadMore = false,
  totals,
  highlight,
}: {
  variant?: "table" | "plain" | "grid" | "gallery" | "compare";
  /** A totals row under the table: one cell per column, empty where a column has no total. */
  totals?: string[];
  /** compare: the column to feature (1 = the first option). */
  highlight?: number;
  title: string;
  description?: string;
  columns: string[];
  rows: string[][];
  statusColumn?: number;
  /** Columns whose cells are comma-separated tags. */
  tagColumns?: number[];
  /** Labels for the ••• menu on each row. */
  rowActions?: string[];
  actionLabel?: string;
  /** A search box over the table (its placeholder). */
  search?: string;
  /** Filter chips beside the search ("Active", "Overdue"). */
  filters?: string[];
  /** Tabs over the table, one per status with its count ("All 6 · Confirmed 3 · Pending 1"), filtering the rows. */
  statusTabs?: boolean;
  /** A column to group the rows under: a heading row per value, with its count. */
  groupBy?: number;
  /** How many records there are in all; the rows are the first page of them. */
  total?: number;
  /** What can be done to several selected rows at once ("Archive", "Export"); without them, the bulk-friendly row actions and Export. */
  bulkActions?: string[];
  /** A Load more button under the rows instead of page numbers: feeds, logs, activity. */
  loadMore?: boolean;
}) {
  const [picked, setStatus] = React.useState("All");
  const [pageAsked, setPage] = React.useState(1);
  const [sort, setSort] = React.useState<{ col: number; dir: "asc" | "desc" } | null>(null);
  const [selected, setSelected] = React.useState<Set<number>>(() => new Set());
  // Groups folded shut, by their heading.
  const [closed, setClosed] = React.useState<Set<string>>(() => new Set());
  const toggleGroup = (name: string) =>
    setClosed((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  const [done, setDone] = React.useState<{ key: number; text: string; undo: () => void } | null>(null);
  const [loaded, setLoaded] = React.useState(1);
  const [hidden, setHidden] = React.useState<number[]>([]);
  // ⌘K finds the table's records by name, and jumps to the row.
  useSearchable(`table:${title}`, allRows.slice(0, 40).map((r) => ({ group: "Records", label: r[0], detail: title })));
  const frame = React.useRef<HTMLDivElement>(null);
  const fit = useTableFit(frame);
  const narrow = fit === 2;
  const statuses = statusTabs && statusColumn !== undefined ? [...new Set(allRows.map((r) => r[statusColumn]).filter((v) => v && v !== "–"))] : [];
  const status = statuses.includes(picked) ? picked : "All";
  const filtered = status === "All" || statusColumn === undefined ? allRows : allRows.filter((r) => r[statusColumn] === status);
  // With a total, the rows stand for the first page of all the records and the counts scale up to it;
  // without one, the rows are all there is (a team, a few keys): one page.
  const perPage = Math.max(1, allRows.length);
  const all = Math.max(total ?? perPage, perPage);
  const countOf = (n: number) => Math.max(n, Math.round((n / perPage) * all));
  const records = countOf(filtered.length);
  const pageCount = Math.max(1, Math.ceil(records / perPage));
  const page = Math.min(pageAsked, pageCount);
  // Another page shows the same records in another order, so paging feels alive (not when grouped: groups keep their order).
  const shift = groupBy === undefined && filtered.length ? ((page - 1) * 3) % filtered.length : 0;
  const firstPage = shift ? [...filtered.slice(shift), ...filtered.slice(0, shift)] : filtered;
  // Load more: each batch is the same records in another order, as copies with their own ids.
  const batches = loadMore ? Math.min(loaded, pageCount) : 1;
  const rows = [
    ...firstPage,
    ...Array.from({ length: batches - 1 }, (_, b) => {
      const at = ((b + 1) * 3) % Math.max(1, filtered.length);
      return [...filtered.slice(at), ...filtered.slice(0, at)].map((row) => [...row]);
    }).flat(),
  ];
  const changeStatus = (st: string) => {
    setStatus(st);
    setPage(1);
  };
  const footer = loadMore ? (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm text-muted-foreground tabular-nums" aria-live="polite">
        Showing {Math.min(records, rows.length).toLocaleString("en-GB")} of {records.toLocaleString("en-GB")} {recordsNoun(title, columns[0])}
      </p>
      {rows.length < records && (
        <Button size="sm" variant="outline" onClick={() => setLoaded((n) => n + 1)}>
          Load more
        </Button>
      )}
    </div>
  ) : (
    <TablePages
      from={(page - 1) * perPage + 1}
      to={Math.min(records, (page - 1) * perPage + rows.length)}
      of={records}
      noun={recordsNoun(title, columns[0])}
      page={page}
      pageCount={pageCount}
      onPage={setPage}
    />
  );
  const tabList = statuses.length > 1 && (
    <TabsList variant="line" aria-label={`${title} by status`} className="max-w-full overflow-x-auto overflow-y-hidden pb-1.5 group-data-horizontal/tabs:h-control">
      {["All", ...statuses].map((st) => (
        <TabsTrigger key={st} value={st} className="gap-1.5 px-2.5">
          {st}
          <span className="font-mono text-[11px] text-muted-foreground">{countOf(st === "All" ? allRows.length : allRows.filter((r) => r[statusColumn!] === st).length)}</span>
        </TabsTrigger>
      ))}
    </TabsList>
  );
  const action = actionLabel ? <SlotButton slot="action" variant="outline" size="sm">{actionLabel}</SlotButton> : undefined;
  const tools = search || filters?.length ? <TableTools search={search} filters={filters} /> : null;
  // With status tabs: the section is the tab set, and the records are the selected tab's panel.
  const byStatus = (node: React.ReactNode) =>
    tabList ? (
      <Tabs value={status} onValueChange={changeStatus} className="h-full gap-0">
        {node}
      </Tabs>
    ) : (
      node
    );
  const panel = (node: React.ReactNode) =>
    tabList ? (
      <TabsContent value={status} className="mt-0">
        {node}
      </TabsContent>
    ) : (
      node
    );

  if (variant === "compare") {
    // Options side by side: one column each, a row per criterion. Yes and no are a tick and a dash
    // (with the word for screen readers); anything else is the text. The featured column is tinted.
    const yes = /^(yes|y|true|✓|✔|included|available)$/i;
    const no = /^(no|n|false|✗|✕|x|–|-|—|none|not included)$/i;
    const feature = highlight !== undefined && highlight > 0 && highlight < columns.length ? highlight : -1;
    return (
      <Card className="flex h-full flex-col">
        <BlockHeader title={title} description={description} />
        <CardContent className="flex-1 px-0">
          {/* relative: the cells' screen-reader words stay inside the scroller. */}
          <div className="relative overflow-x-auto px-5">
            <table className="w-full min-w-max border-separate border-spacing-0 text-sm">
              <thead>
                <tr>
                  <th scope="col" className="py-2.5 pr-4 text-left font-mono text-[11px] font-medium tracking-[0.1em] text-muted-foreground uppercase">{columns[0]}</th>
                  {columns.slice(1).map((c, i) => (
                    <th key={c} scope="col" className={cn("min-w-24 px-3 py-2.5 text-center font-heading text-sm font-semibold text-foreground", i + 1 === feature && "rounded-t-lg bg-primary/10")}>
                      {c}
                      {i + 1 === feature && <span className="mt-0.5 block font-mono text-[10px] font-medium tracking-[0.08em] text-primary-ink uppercase">Recommended</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allRows.map((row, r) => (
                  <tr key={r}>
                    <th scope="row" className="max-w-56 border-t border-border py-2.5 pr-4 text-left font-normal text-pretty text-foreground">{row[0]}</th>
                    {columns.slice(1).map((c, i) => {
                      const cell = (row[i + 1] ?? "").trim();
                      return (
                        <td key={c} className={cn("border-t border-border px-3 py-2.5 text-center text-muted-foreground", i + 1 === feature && "bg-primary/10", i + 1 === feature && r === allRows.length - 1 && "rounded-b-lg")}>
                          {yes.test(cell) ? (
                            <>
                              <Check aria-hidden="true" className="mx-auto size-4 text-diff-add" />
                              <span className="sr-only">Yes</span>
                            </>
                          ) : no.test(cell) || !cell ? (
                            <>
                              <Minus aria-hidden="true" className="mx-auto size-4 text-muted-foreground/60" />
                              <span className="sr-only">No</span>
                            </>
                          ) : (
                            <span className={cn("tabular-nums", i + 1 === feature && "font-medium text-foreground")}>{cell}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
  }
  if (variant === "gallery") {
    // Media cards: a thumbnail, the name, one tag, one count and the status.
    const tagCol = tagColumns?.[0] ?? columns.findIndex((c, i) => i > 0 && i !== statusColumn && /type|kind|category|genre|format/i.test(c));
    const countCol = rows[0]?.findIndex((cell, i) => i > 0 && i !== statusColumn && i !== tagCol && /^\d[\d,.]*$/.test(cell)) ?? -1;
    return byStatus(
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
          </div>
          {action}
        </div>
        {tools}
        {tabList}
        {panel(<div className="grid gap-4 @md:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4">
          {rows.map((row, r) => (
            <Card key={r} className="overflow-hidden p-1.5">
              <Thumbnail name={row[0]} kind={tagCol >= 0 ? row[tagCol] : ""} index={r} />
              <div className="px-2.5 pt-3 pb-2.5">
                <p className="truncate text-sm font-semibold text-foreground">{row[0]}</p>
                {tagCol >= 0 && row[tagCol] && (
                  <span className="mt-2 inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary-ink">{row[tagCol]}</span>
                )}
                <div className="mt-3 flex items-center justify-between gap-2">
                  {countCol >= 0 ? (
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Layers className="size-3.5" />
                      {row[countCol]} {columns[countCol].toLowerCase()}
                    </span>
                  ) : (
                    <span />
                  )}
                  {statusColumn !== undefined && <Badge variant={statusTone(row[statusColumn])}>{row[statusColumn]}</Badge>}
                </div>
              </div>
            </Card>
          ))}
        </div>)}
        {footer}
      </section>,
    );
  }

  if (variant === "grid") {
    return byStatus(
      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <div className="min-w-0 flex-1 basis-48">
            <h2 className="text-sm font-semibold [overflow-wrap:anywhere] text-foreground">{title}</h2>
            {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
          </div>
          {action}
        </div>
        {tools}
        {tabList}
        {panel(<div className="grid grid-cols-1 gap-3 @xl:grid-cols-2 @5xl:grid-cols-3">
          {rows.map((row, r) => {
            // A percentage column ("58%") is drawn as a bar at the foot; the other fields flow three or four to a row.
            const pctCol = row.findIndex((cell, i) => i > 0 && i !== statusColumn && /^\d{1,3}(\.\d+)?\s?%$/.test(cell.trim()));
            const pct = pctCol >= 0 ? Math.max(0, Math.min(100, parseFloat(row[pctCol]))) : null;
            return (
              <Card key={r} className="@container/rec px-5 py-4">
                <div className="flex items-center gap-3">
                  {/* A face only for a person; an order, an invoice or a ticket reads as its id. */}
                  {isPersonName(row[0]) && <Avatar name={row[0]} size="sm" />}
                  <p className={cn("min-w-0 flex-1 truncate text-sm font-medium text-foreground", isRecordId(row[0]) && "font-mono")}>{row[0]}</p>
                  {statusColumn !== undefined && <Badge variant={statusTone(row[statusColumn])} className="max-w-[50%]">{row[statusColumn]}</Badge>}
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 @sm/rec:grid-cols-3 @xl/rec:grid-cols-4">
                  {row.map((cell, i) =>
                    i === 0 || i === statusColumn || i === pctCol ? null : (
                      <div key={i} className="min-w-0">
                        <dt className="truncate font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{columns[i]}</dt>
                        <dd className="text-sm [overflow-wrap:anywhere] text-foreground">{tagColumns?.includes(i) ? <Tags value={cell} /> : cell}</dd>
                      </div>
                    ),
                  )}
                </dl>
                {pct !== null && (
                  <div className="mt-3 flex items-center gap-3 text-xs">
                    <span className="shrink-0 text-muted-foreground">{columns[pctCol]}</span>
                    <span
                      role="progressbar"
                      aria-label={columns[pctCol]}
                      aria-valuenow={pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-muted"
                    >
                      <span className="block h-full rounded-full bg-highlight" style={{ width: `${pct}%` }} />
                    </span>
                    <span className="w-10 shrink-0 text-right font-medium text-foreground tabular-nums">{row[pctCol]}</span>
                  </div>
                )}
              </Card>
            );
          })}
        </div>)}
        {footer}
      </section>,
    );
  }

  const plain = variant === "plain";
  // Selection is for the full table: a checkbox per row, and a bulk bar in place of the search and filters.
  const selectable = variant === "table" && fit === 0;
  const idOf = new Map(allRows.map((row, i) => [row, i]));
  rows.forEach((row, i) => idOf.has(row) || idOf.set(row, allRows.length + i));
  const shownIds = rows.map((row) => idOf.get(row)!);
  const allShown = shownIds.length > 0 && shownIds.every((id) => selected.has(id));
  const someShown = shownIds.some((id) => selected.has(id));
  const toggleRow = (id: number) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const toggleShown = () =>
    setSelected((prev) => {
      const next = new Set(prev);
      shownIds.forEach((id) => (allShown ? next.delete(id) : next.add(id)));
      return next;
    });
  const bulk = bulkActions?.length ? bulkActions : bulkFrom(rowActions);
  const noun = recordsNoun(title, columns[0]);
  const runBulk = (a: string) => {
    const was = selected;
    const n = was.size;
    setSelected(new Set());
    // A new key per toast, so a second bulk action shows a fresh one.
    setDone((d) => ({ key: (d?.key ?? 0) + 1, text: `${n} ${n === 1 ? noun.replace(/s$/, "") : noun} ${pastOf(a)}`, undo: () => setSelected(was) }));
  };
  const bar =
    selectable && selected.size > 0 ? (
      <TableToolbar
        selectedCount={selected.size}
        onClearSelection={() => setSelected(new Set())}
        bulkActions={bulk.map((a) => (
          <Button key={a} size="sm" variant="outline" className={cn(DESTRUCTIVE_BULK.test(a) && "text-destructive")} onClick={() => runBulk(a)}>
            {a}
          </Button>
        ))}
      />
    ) : null;
  // Sorted by the picked column; grouped rows stay under their group.
  const shown = sortRows(rows, sort, groupBy);
  const sortOf = (i: number) => (sort?.col === i ? sort.dir : false);
  const sortBy = (i: number) => setSort((cur) => (cur?.col === i ? (cur.dir === "asc" ? { col: i, dir: "desc" } : null) : { col: i, dir: "asc" }));
  const varsOf = (row: string[]): Record<string, string> => ({ ...Object.fromEntries(columns.map((c, i) => [c, row[i] ?? ""])), name: row[0] ?? "" });
  const detailsOf = (row: string[]) => columns.slice(1).map((c, i): [string, string] => [c, row[i + 1] ?? ""]).filter(([, v]) => v);
  const headsAt = (r: number) => groupBy !== undefined && shown[r][groupBy] !== shown[r - 1]?.[groupBy];
  const groupCount = (row: string[]) => shown.filter((x) => x[groupBy!] === row[groupBy!]).length;
  const rowCheck = (row: string[]) => {
    const id = idOf.get(row)!;
    return <Checkbox aria-label={`Select ${row[0]}`} checked={selected.has(id)} onCheckedChange={() => toggleRow(id)} />;
  };

  const table = (
    <Table>
      {/* Opaque, so rows pass under it when a long table scrolls in its card. */}
      <THead className={cn("sticky top-0 z-[1]", plain ? "bg-card" : "bg-[color-mix(in_srgb,var(--muted)_40%,var(--card))]")}>
        <tr>
          {selectable && (
            <TH className="w-10">
              <Checkbox aria-label={`Select all ${noun} on this page`} checked={allShown ? true : someShown ? "indeterminate" : false} onCheckedChange={toggleShown} />
            </TH>
          )}
          {columns.map((c, i) =>
            hidden.includes(i) ? null : (
              <TH key={c} className={plain ? "py-2" : undefined} sorted={sortOf(i)} onSort={() => sortBy(i)}>
                {c}
              </TH>
            ),
          )}
          {rowActions && (
            <TH className={plain ? "py-2" : undefined}>
              <span className="sr-only">Actions</span>
            </TH>
          )}
        </tr>
      </THead>
      <TBody>
        {shown.map((row, r) => {
          const vars = varsOf(row);
          const on = selectable && selected.has(idOf.get(row)!);
          const folded = groupBy !== undefined && closed.has(row[groupBy]);
          if (folded && !headsAt(r)) return null;
          return (
            <React.Fragment key={idOf.get(row)}>
              {headsAt(r) && (
                <tr>
                  <td colSpan={columns.length - hidden.length + (rowActions ? 1 : 0) + (selectable ? 1 : 0)} className="bg-muted/40 px-5 py-1">
                    <GroupToggle label={row[groupBy!] || "–"} count={groupCount(row)} open={!folded} onToggle={() => toggleGroup(row[groupBy!])} />
                  </td>
                </tr>
              )}
              {folded ? null : (
              <TR data-state={on ? "selected" : undefined} data-searchable={row[0]} className="data-[state=selected]:bg-primary/5">
                {selectable && <TD className="w-10">{rowCheck(row)}</TD>}
                {row.map((cell, i) => hidden.includes(i) ? null : (
                  <TD key={i} className={cn(i === 0 ? "min-w-40 font-medium text-foreground" : "text-muted-foreground", plain && "py-2.5")}>
                    {i === statusColumn ? (
                      // A status is a word or two; a longer one ends in an ellipsis rather than squeezing the name.
                      <Badge variant={statusTone(cell)} className="max-w-48">{cell}</Badge>
                    ) : tagColumns?.includes(i) ? (
                      <Tags value={cell} />
                    ) : i === 0 ? (
                      <RowName name={cell} details={detailsOf(row)} vars={vars} avatar={!plain} />
                    ) : (
                      cell
                    )}
                  </TD>
                ))}
                {rowActions && (
                  <TD className={cn("w-12 text-right", plain && "py-2.5")}>
                    <RowMenu actions={rowActions} label={`Actions for ${row[0]}`} vars={vars} />
                  </TD>
                )}
              </TR>
              )}
            </React.Fragment>
          );
        })}
      </TBody>
      {totals && totals.some(Boolean) && (
        <tfoot>
          <tr className="border-t-2 border-border">
            {selectable && <td />}
            {columns.map((c, i) =>
              hidden.includes(i) ? null : (
                <td key={c} className={cn("px-5 py-3 text-sm font-semibold text-foreground tabular-nums", plain && "py-2.5")}>
                  {totals[i] || (i === 0 ? "Total" : "")}
                </td>
              ),
            )}
            {rowActions && <td />}
          </tr>
        </tfoot>
      )}
    </Table>
  );

  // In a narrow card or on a phone: a compact list. The name with the other details on one quiet line
  // under it, and the amount and status on the right; no column labels.
  const amountCol = (() => {
    for (let i = columns.length - 1; i > 0; i--) if (i !== statusColumn && shown.every((row) => AMOUNT.test((row[i] ?? "").trim()))) return i;
    return -1;
  })();
  const metaOf = (row: string[]) =>
    row
      .map((cell, i) => (i === 0 || i === statusColumn || i === amountCol || !cell || cell === "–" ? null : cell))
      .filter(Boolean)
      .join(" · ");
  const cards = (
    <ul className="flex flex-col divide-y divide-border border-t border-border" aria-label={title}>
      {shown.map((row, r) => {
        const vars = varsOf(row);
        const meta = metaOf(row);
        const folded = groupBy !== undefined && closed.has(row[groupBy]);
        if (folded && !headsAt(r)) return null;
        return (
          <React.Fragment key={idOf.get(row)}>
            {headsAt(r) && (
              <li className="bg-muted/40 px-5 py-1">
                <GroupToggle label={row[groupBy!] || "–"} count={groupCount(row)} open={!folded} onToggle={() => toggleGroup(row[groupBy!])} />
              </li>
            )}
            {folded ? null : (
            <li data-searchable={row[0]} className="flex items-center gap-3 px-5 py-3">
              {/* Under 20rem the row is the name's: no avatar, and the amount and status move under it. */}
              {!plain && <Avatar name={row[0]} size="sm" className="@max-xs:hidden" />}
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-foreground">
                  <RowName name={row[0]} details={detailsOf(row)} vars={vars} />
                </div>
                {/* Wraps rather than cut: on a phone the amount and status beside it leave little room. */}
                {meta && <p className="text-xs break-words text-muted-foreground">{meta}</p>}
                {(amountCol >= 0 || statusColumn !== undefined) && (
                  <div className="mt-1 flex min-w-0 flex-wrap items-center gap-2 @xs:hidden">
                    {amountCol >= 0 && <span className="max-w-full truncate text-sm font-medium text-foreground tabular-nums">{row[amountCol]}</span>}
                    {statusColumn !== undefined && <Badge variant={statusTone(row[statusColumn])}>{row[statusColumn]}</Badge>}
                  </div>
                )}
              </div>
              {(amountCol >= 0 || statusColumn !== undefined) && (
                <div className="hidden max-w-[45%] min-w-0 shrink-0 flex-col items-end gap-1 @xs:flex">
                  {amountCol >= 0 && <span className="max-w-full truncate text-sm font-medium text-foreground tabular-nums">{row[amountCol]}</span>}
                  {statusColumn !== undefined && <Badge variant={statusTone(row[statusColumn])}>{row[statusColumn]}</Badge>}
                </div>
              )}
              {rowActions && <RowMenu actions={rowActions} label={`Actions for ${row[0]}`} vars={vars} />}
            </li>
            )}
          </React.Fragment>
        );
      })}
      {totals && totals.some(Boolean) && (
        <li className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t-2 border-border px-5 py-3 text-sm font-semibold text-foreground">
          <span>{totals[0] || "Total"}</span>
          <span className="text-right tabular-nums">{totals.slice(1).filter(Boolean).join(" · ")}</span>
        </li>
      )}
    </ul>
  );

  // Which columns show: every one but the first can be turned off.
  const columnsMenu =
    columns.length > 3 && !narrow ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="ghost" className="gap-1.5">
            <SlidersHorizontal className="size-3.5" />
            Columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Show columns</DropdownMenuLabel>
          {columns.map((c, i) => (
            <DropdownMenuCheckboxItem
              key={c}
              checked={!hidden.includes(i)}
              disabled={i === 0}
              onSelect={(e) => e.preventDefault()}
              onCheckedChange={(on) => setHidden((h) => (on ? h.filter((x) => x !== i) : [...h, i]))}
            >
              {c}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    ) : null;
  return byStatus(
    // The card fills its row: beside a taller card the rows end where they end and the footer sits at the foot, not over a hole.
    <Card ref={frame} className="flex h-full flex-col overflow-hidden">
      <CardHeader
        title={title}
        description={description}
        className="pb-4"
        action={
          columnsMenu || action ? (
            <div className="flex items-center gap-2">
              {columnsMenu}
              {action}
            </div>
          ) : undefined
        }
      />
      {(bar || tools) && <div className="px-5 pb-3">{bar ?? tools}</div>}
      {tabList && <div className="px-5 pb-2">{tabList}</div>}
      {/* The table is as tall as its rows (a page of the records): nothing scrolls inside the card. */}
      {panel(narrow ? cards : table)}
      <div className="mt-auto border-t border-border px-5 py-3">{footer}</div>
      <div aria-live="polite" className="pointer-events-none fixed right-4 bottom-4 left-4 z-[60] flex justify-end sm:left-auto">
        {done && (
          <Toast key={done.key} variant="success" onDismiss={() => setDone(null)} className="pointer-events-auto max-w-sm">
            <span className="flex items-center justify-between gap-3">
              {done.text}
              <Button
                size="sm"
                variant="outline"
                className="h-7"
                onClick={() => {
                  done.undo();
                  setDone(null);
                }}
              >
                Undo
              </Button>
            </span>
          </Toast>
        )}
      </div>
    </Card>,
  );
}

/** Bulk actions that remove or undo things, drawn in the destructive colour. */
const DESTRUCTIVE_BULK = /^(delete|remove|cancel|reject|deactivate|revoke|refund)\b/i;

/** Without bulk actions given: the row actions that make sense for many at once, then Export. */
function bulkFrom(rowActions?: string[]): string[] {
  const many = (rowActions ?? []).filter((a) => /^(archive|delete|remove|export|assign|approve|reject|cancel|mark|move|tag|send|resend|download|duplicate|close|resolve|deactivate|pause|refund)\b/i.test(a));
  return [...many, ...(many.some((a) => /^export\b/i.test(a)) ? [] : ["Export"])].slice(0, 3);
}

/** "Archive" -> "archived", "Mark as paid" -> "marked as paid": the toast after a bulk action. */
function pastOf(action: string): string {
  const [verb = "", ...rest] = action.trim().split(/\s+/);
  const v = verb.toLowerCase();
  const IRREGULAR: Record<string, string> = { send: "sent", resend: "resent", cancel: "cancelled", pay: "paid", set: "set" };
  const past = IRREGULAR[v] ?? (v.endsWith("e") ? `${v}d` : /^[^aeiou]*[aeiou][bdgmnpt]$/.test(v) ? `${v}${v.at(-1)}ed` : v.endsWith("y") && !/[aeiou]y$/.test(v) ? `${v.slice(0, -1)}ied` : `${v}ed`);
  return [past, ...rest.map((w) => w.toLowerCase())].join(" ");
}

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/** A cell's sort key: a number for amounts, counts, percentages and "Nov 12" dates; otherwise the text. */
function sortKey(cell: string): number | string {
  const date = /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+(\d{1,2})(?:,?\s+(\d{4}))?/i.exec(cell.trim());
  if (date) return Number(date[3] ?? 0) * 10000 + MONTHS.indexOf(date[1].toLowerCase()) * 100 + Number(date[2]);
  const num = /^[^\d-]*(-?[\d,]*\.?\d+)\s*([kKmM])?/.exec(cell.replace(/\s/g, ""));
  if (num && /\d/.test(cell) && !/[a-z]{3,}/i.test(cell.replace(/[kKmM]\b/, ""))) return parseFloat(num[1].replace(/,/g, "")) * (num[2]?.toLowerCase() === "k" ? 1e3 : num[2]?.toLowerCase() === "m" ? 1e6 : 1);
  return cell.toLowerCase();
}

/** Rows sorted by one column, stable; grouped rows keep their groups' order. */
function sortRows(rows: string[][], sort: { col: number; dir: "asc" | "desc" } | null, groupBy?: number): string[][] {
  if (!sort) return rows;
  const groupAt = new Map<string, number>();
  if (groupBy !== undefined) rows.forEach((r) => groupAt.has(r[groupBy]) || groupAt.set(r[groupBy], groupAt.size));
  const keys = rows.map((r) => sortKey(r[sort.col] ?? ""));
  const numeric = keys.every((k) => typeof k === "number");
  return rows
    .map((row, i) => ({ row, i }))
    .sort((a, b) => {
      if (groupBy !== undefined) {
        const g = groupAt.get(a.row[groupBy])! - groupAt.get(b.row[groupBy])!;
        if (g) return g;
      }
      const ka = keys[a.i];
      const kb = keys[b.i];
      const c = numeric ? (ka as number) - (kb as number) : String(ka).localeCompare(String(kb), undefined, { numeric: true });
      return (sort.dir === "asc" ? c : -c) || a.i - b.i;
    })
    .map((x) => x.row);
}

/**
 * How much a table gives up to fit its card without scrolling sideways:
 * 0 = everything, 1 = no selection column, 2 = a compact list (a narrow
 * column, a phone). It remembers the width each step needed, to step back
 * up once the card is that wide again.
 */
function useTableFit(frame: React.RefObject<HTMLElement | null>): 0 | 1 | 2 {
  const [fit, setFit] = React.useState<0 | 1 | 2>(0);
  const needed = React.useRef<number[]>([0, 0]);
  const check = React.useCallback(() => {
    const el = frame.current;
    if (!el) return;
    const width = el.clientWidth;
    const scroller = el.querySelector<HTMLElement>("[data-slot=table]")?.parentElement;
    const over = scroller ? scroller.scrollWidth > scroller.clientWidth + 2 : false;
    const need = scroller ? scroller.scrollWidth + (width - scroller.clientWidth) : 0;
    setFit((level) => {
      if (over && level < 2) {
        needed.current[level] = need;
        return (level + 1) as 1 | 2;
      }
      if (!over && level > 0 && width >= needed.current[level - 1]) return (level - 1) as 0 | 1;
      return level;
    });
  }, [frame]);
  // The card's width, and the table's own: it widens after the first check when fonts or late content arrive.
  React.useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const ro = new ResizeObserver(check);
    ro.observe(el);
    const table = el.querySelector<HTMLElement>("[data-slot=table]");
    if (table) ro.observe(table);
    return () => ro.disconnect();
  }, [frame, check, fit]);
  // Each step changes the table (or not at all, when there was nothing to drop): look again once it has drawn.
  React.useEffect(() => {
    const id = requestAnimationFrame(check);
    return () => cancelAnimationFrame(id);
  }, [fit, check]);
  return fit;
}

/** "€2,980", "1.4k", "38%", "12": a cell that reads as an amount, for the right side of a compact row. */
const AMOUNT = /^[^\w\s]{0,2}\s?-?\d[\d,.]*\s?([kKmM%]|[^\w\s]{1,2})?$/;

/** "Upcoming bookings" -> "bookings": what a table's records are called, for its footer. */
/** What a table counts: its title's plural ("Invoices"), else its first column's ("Receipt" -> "receipts"). */
function recordsNoun(title: string, first?: string): string {
  const plural = (w: string) => /^[a-z]{3,}s$/.test(w) && !w.endsWith("ss");
  const last = title.trim().split(/\s+/).at(-1)?.toLowerCase() ?? "";
  if (plural(last)) return last;
  const head = first?.trim().toLowerCase() ?? "";
  if (!/^[a-z]{3,}$/.test(head)) return "records";
  if (plural(head)) return head;
  if (/[^aeiou]y$/.test(head)) return `${head.slice(0, -1)}ies`;
  return /(s|x|ch|sh)$/.test(head) ? `${head}es` : `${head}s`;
}

/** Under every table: which records show, of how many, and the pages. */
function TablePages({ from, to, of, noun, page, pageCount, onPage }: { from: number; to: number; of: number; noun: string; page: number; pageCount: number; onPage: (p: number) => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground tabular-nums">
        Showing {from.toLocaleString("en-GB")}–{to.toLocaleString("en-GB")} of {of.toLocaleString("en-GB")} {noun}
      </p>
      <Pagination page={page} pageCount={pageCount} onPageChange={onPage} />
    </div>
  );
}

/**
 * A lit sphere of connected points on a ringed base, with two orbits: the
 * illustration for a highlight card on AI, data and futuristic products
 * (the "engine", the "core", the "network"). Drawn from the brand and the
 * accent, the same every render (no randomness), and decorative: the card's
 * own text says what it is.
 */
function GlowOrb({ label, fill }: { label?: string; fill?: boolean }) {
  const id = React.useId();
  // Points spread evenly over a sphere (a Fibonacci lattice), tilted toward the viewer.
  const N = 110;
  const tilt = 0.42;
  const pts = Array.from({ length: N }, (_, i) => {
    const y = 1 - (2 * (i + 0.5)) / N;
    const r = Math.sqrt(1 - y * y);
    const a = i * 2.39996323;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    // Tilt around the x axis.
    return { x, y: y * Math.cos(tilt) - z * Math.sin(tilt), z: y * Math.sin(tilt) + z * Math.cos(tilt) };
  });
  // Each point joins its nearest neighbours: the mesh.
  const lines: { a: number; b: number }[] = [];
  pts.forEach((p, i) => {
    const near = pts
      .map((q, j) => ({ j, d: (p.x - q.x) ** 2 + (p.y - q.y) ** 2 + (p.z - q.z) ** 2 }))
      .filter((q) => q.j > i)
      .sort((u, v) => u.d - v.d)
      .slice(0, 3);
    for (const q of near) if (q.d < 0.16) lines.push({ a: i, b: q.j });
  });
  const R = 78;
  const cx = 200;
  const cy = 118;
  const px = (p: { x: number }) => cx + p.x * R;
  const py = (p: { y: number }) => cy - p.y * R;
  const n = (v: number) => Math.round(v * 10) / 10;
  return (
    <figure className={cn("relative flex min-w-0 flex-col items-center justify-center", fill && "grow")}>
      <svg viewBox="0 0 400 270" role="img" aria-label={label ?? "Illustration"} className="h-auto max-h-80 w-full max-w-[34rem]">
        <defs>
          <radialGradient id={`${id}-halo`} cx="50%" cy="44%" r="50%">
            <stop offset="0%" style={{ stopColor: "var(--primary)", stopOpacity: 0.5 }} />
            <stop offset="45%" style={{ stopColor: "var(--primary)", stopOpacity: 0.16 }} />
            <stop offset="100%" style={{ stopColor: "var(--primary)", stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id={`${id}-core`} cx="42%" cy="36%" r="70%">
            <stop offset="0%" style={{ stopColor: "var(--highlight, var(--primary))", stopOpacity: 0.34 }} />
            <stop offset="100%" style={{ stopColor: "var(--primary)", stopOpacity: 0.05 }} />
          </radialGradient>
          <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--highlight, var(--primary))", stopOpacity: 0 }} />
            <stop offset="100%" style={{ stopColor: "var(--highlight, var(--primary))", stopOpacity: 0.28 }} />
          </linearGradient>
        </defs>
        {/* the light around it */}
        <ellipse cx={cx} cy={cy} rx="190" ry="130" fill={`url(#${id}-halo)`} />
        {/* the base: rings on the floor, and the beam that lifts the sphere */}
        {[150, 112, 76, 42].map((rx, i) => (
          <ellipse key={rx} cx={cx} cy="232" rx={rx} ry={rx * 0.16} fill="none" strokeWidth={i === 3 ? 1.6 : 1} style={{ stroke: i % 2 ? "var(--highlight, var(--primary))" : "var(--primary)", strokeOpacity: 0.22 + i * 0.16 }} />
        ))}
        <path d={`M${cx - 40},232 L${cx - 26},${cy + R * 0.6} L${cx + 26},${cy + R * 0.6} L${cx + 40},232 Z`} fill={`url(#${id}-beam)`} />
        {/* the orbit behind the sphere */}
        <ellipse cx={cx} cy={cy} rx={R * 1.62} ry={R * 0.44} fill="none" strokeWidth="1" transform={`rotate(-16 ${cx} ${cy})`} style={{ stroke: "var(--highlight, var(--primary))", strokeOpacity: 0.3 }} />
        {/* the sphere */}
        <circle cx={cx} cy={cy} r={R} fill={`url(#${id}-core)`} />
        {lines.map(({ a, b }, i) => {
          const depth = (pts[a].z + pts[b].z) / 2;
          return <line key={i} x1={n(px(pts[a]))} y1={n(py(pts[a]))} x2={n(px(pts[b]))} y2={n(py(pts[b]))} strokeWidth="0.7" style={{ stroke: depth > 0 ? "var(--highlight, var(--primary))" : "var(--primary)", strokeOpacity: n(0.12 + 0.34 * ((depth + 1) / 2)) }} />;
        })}
        {pts.map((p, i) => (
          <circle key={i} cx={n(px(p))} cy={n(py(p))} r={n(0.9 + 1.5 * ((p.z + 1) / 2))} style={{ fill: i % 3 === 0 ? "var(--highlight, var(--primary))" : "var(--primary)", fillOpacity: n(0.3 + 0.7 * ((p.z + 1) / 2)) }} />
        ))}
        {/* the orbit in front, with its satellite */}
        <path d={`M${cx - R * 1.5},${cy} A${R * 1.5},${R * 0.4} 0 0 0 ${cx + R * 1.5},${cy}`} fill="none" strokeWidth="1.2" transform={`rotate(14 ${cx} ${cy})`} style={{ stroke: "var(--primary)", strokeOpacity: 0.55 }} />
        <circle cx={cx + R * 1.5} cy={cy} r="3.2" transform={`rotate(14 ${cx} ${cy})`} style={{ fill: "var(--highlight, var(--primary))" }} />
        <circle cx={cx - R * 1.62} cy={cy} r="2.4" transform={`rotate(-16 ${cx} ${cy})`} style={{ fill: "var(--primary)" }} />
      </svg>
      {label && <figcaption className="-mt-1 text-center font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase">{label}</figcaption>}
    </figure>
  );
}

type ArtKindName = "signal" | "stack" | "radar" | "network";

/**
 * The orb's family: the same lit, two-colour drawing for other kinds of
 * product. signal = waves of a live stream (voice, audio, telemetry);
 * stack = plates stacked in the air (a platform, layers, infrastructure);
 * radar = a sweep over rings with blips (security, monitoring, scanning);
 * network = points on a dotted field joined by arcs (logistics, places, a
 * graph). Drawn the same every render, decorative, in the brand and accent.
 */
function GlowArt({ kind, label, fill }: { kind: ArtKindName; label?: string; fill?: boolean }) {
  const id = React.useId();
  const P = "var(--primary)";
  const A = "var(--highlight, var(--primary))";
  const n = (v: number) => Math.round(v * 10) / 10;
  let art: React.ReactNode = null;
  if (kind === "signal") {
    // Three waves of one stream, the front one brightest, with its live point.
    const wave = (amp: number, len: number, phase: number, y: number) =>
      `M20,${y} ` + Array.from({ length: 73 }, (_, i) => `L${20 + i * 5},${n(y - Math.sin(i / len + phase) * amp * Math.sin((i / 72) * Math.PI))}`).join(" ");
    art = (
      <>
        {Array.from({ length: 19 }, (_, i) => (
          <line key={i} x1={20 + i * 20} y1="60" x2={20 + i * 20} y2="210" strokeWidth="1" style={{ stroke: P, strokeOpacity: 0.08 }} />
        ))}
        <path d={wave(46, 5.2, 0.6, 140)} fill="none" strokeWidth="1.2" style={{ stroke: P, strokeOpacity: 0.35 }} />
        <path d={wave(62, 4.1, 2.1, 136)} fill="none" strokeWidth="1.6" style={{ stroke: P, strokeOpacity: 0.7 }} />
        <path d={wave(74, 3.3, 0, 132)} fill="none" strokeWidth="2.4" strokeLinecap="round" style={{ stroke: A }} />
        <path d={`${wave(74, 3.3, 0, 132)} L380,220 L20,220 Z`} fill={`url(#${id}-fade)`} />
        <circle cx="290" cy={n(132 - Math.sin(54 / 3.3) * 74 * Math.sin((54 / 72) * Math.PI))} r="5" style={{ fill: A }} />
        <circle cx="290" cy={n(132 - Math.sin(54 / 3.3) * 74 * Math.sin((54 / 72) * Math.PI))} r="11" fill="none" strokeWidth="1.2" style={{ stroke: A, strokeOpacity: 0.5 }} />
      </>
    );
  } else if (kind === "stack") {
    // Four plates in the air, seen from above and to the side: the top one lit.
    const plate = (y: number, w: number) => `M200,${y - w * 0.27} L${200 + w},${y} L200,${y + w * 0.27} L${200 - w},${y} Z`;
    art = (
      <>
        {[196, 158, 120, 82].map((y, i) => (
          <g key={y}>
            <path d={plate(y + 9, 118)} style={{ fill: P, fillOpacity: 0.07 + i * 0.03 }} />
            <path d={plate(y, 118)} strokeWidth={i === 3 ? 1.8 : 1.1} style={{ fill: i === 3 ? A : P, fillOpacity: i === 3 ? 0.2 : 0.1 + i * 0.04, stroke: i === 3 ? A : P, strokeOpacity: 0.45 + i * 0.15 }} />
          </g>
        ))}
        {[-64, -22, 22, 64].map((dx, i) => (
          <circle key={dx} cx={200 + dx} cy={82 + (i % 2 ? 6 : -6)} r="3" style={{ fill: A, fillOpacity: 0.9 }} />
        ))}
        <path d="M136,76 L178,88 L222,76 L264,88" fill="none" strokeWidth="1.2" style={{ stroke: A, strokeOpacity: 0.7 }} />
        {[82, 318].map((x) => (
          <line key={x} x1={x} y1="82" x2={x} y2="196" strokeWidth="1" strokeDasharray="2 5" style={{ stroke: P, strokeOpacity: 0.4 }} />
        ))}
      </>
    );
  } else if (kind === "radar") {
    // Rings, cross hairs, a sweep fading behind its leading edge, and what it found.
    const blips: [number, number, number][] = [[58, -34, 4], [-46, 22, 3], [22, 62, 3], [-70, -52, 2.6], [84, 30, 2.6]];
    art = (
      <>
        {[104, 78, 52, 26].map((r, i) => (
          <circle key={r} cx="200" cy="135" r={r} fill="none" strokeWidth="1" style={{ stroke: i % 2 ? A : P, strokeOpacity: 0.22 + i * 0.1 }} />
        ))}
        <line x1="96" y1="135" x2="304" y2="135" strokeWidth="1" style={{ stroke: P, strokeOpacity: 0.2 }} />
        <line x1="200" y1="31" x2="200" y2="239" strokeWidth="1" style={{ stroke: P, strokeOpacity: 0.2 }} />
        <path d="M200,135 L200,31 A104,104 0 0 1 290,83 Z" fill={`url(#${id}-sweep)`} />
        <line x1="200" y1="135" x2="290" y2="83" strokeWidth="1.8" strokeLinecap="round" style={{ stroke: A }} />
        {blips.map(([dx, dy, r], i) => (
          <g key={i}>
            <circle cx={200 + dx} cy={135 + dy} r={r * 2.6} style={{ fill: A, fillOpacity: 0.16 }} />
            <circle cx={200 + dx} cy={135 + dy} r={r} style={{ fill: i === 0 ? A : P }} />
          </g>
        ))}
        <circle cx="200" cy="135" r="4" style={{ fill: A }} />
      </>
    );
  } else {
    // A dotted field with places on it, joined by arcs from the main one.
    const hubs: [number, number][] = [[112, 150], [186, 96], [250, 168], [308, 112], [148, 200], [336, 186]];
    art = (
      <>
        {Array.from({ length: 11 }, (_, r) =>
          Array.from({ length: 18 }, (_, c) => <circle key={`${r}-${c}`} cx={30 + c * 20 + (r % 2) * 10} cy={50 + r * 17} r="1.3" style={{ fill: P, fillOpacity: 0.22 }} />),
        )}
        {hubs.slice(1).map(([x, y], i) => {
          const [hx, hy] = hubs[1];
          const [mx, my] = [(x + hx) / 2, Math.min(y, hy) - 34 - i * 4];
          return i === 0 ? null : <path key={i} d={`M${hx},${hy} Q${mx},${my} ${x},${y}`} fill="none" strokeWidth="1.3" strokeDasharray={i % 2 ? "0" : "3 4"} style={{ stroke: i % 2 ? A : P, strokeOpacity: 0.75 }} />;
        })}
        <path d={`M${hubs[1][0]},${hubs[1][1]} Q150,84 ${hubs[0][0]},${hubs[0][1]}`} fill="none" strokeWidth="1.3" style={{ stroke: A, strokeOpacity: 0.75 }} />
        {hubs.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={i === 1 ? 16 : 9} style={{ fill: i === 1 ? A : P, fillOpacity: 0.16 }} />
            <circle cx={x} cy={y} r={i === 1 ? 5.5 : 3.6} style={{ fill: i === 1 ? A : P }} />
          </g>
        ))}
      </>
    );
  }
  return (
    <figure className={cn("relative flex min-w-0 flex-col items-center justify-center", fill && "grow")}>
      <svg viewBox="0 0 400 270" role="img" aria-label={label ?? "Illustration"} className="h-auto max-h-80 w-full max-w-[34rem]">
        <defs>
          <radialGradient id={`${id}-halo`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: P, stopOpacity: 0.34 }} />
            <stop offset="55%" style={{ stopColor: P, stopOpacity: 0.1 }} />
            <stop offset="100%" style={{ stopColor: P, stopOpacity: 0 }} />
          </radialGradient>
          <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: A, stopOpacity: 0.22 }} />
            <stop offset="100%" style={{ stopColor: A, stopOpacity: 0 }} />
          </linearGradient>
          <linearGradient id={`${id}-sweep`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" style={{ stopColor: A, stopOpacity: 0 }} />
            <stop offset="100%" style={{ stopColor: A, stopOpacity: 0.34 }} />
          </linearGradient>
        </defs>
        <ellipse cx="200" cy="135" rx="190" ry="128" fill={`url(#${id}-halo)`} />
        {art}
      </svg>
      {label && <figcaption className="-mt-1 text-center font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase">{label}</figcaption>}
    </figure>
  );
}

/** A group's heading as a button that folds its rows away and back. */
function GroupToggle({ label, count, open, onToggle }: { label: string; count?: number; open: boolean; onToggle: () => void }) {
  return (
    <button type="button" aria-expanded={open} onClick={onToggle} className="-mx-1.5 flex min-h-7 items-center gap-1.5 rounded-sm px-1.5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-ink">
      <ChevronDown aria-hidden="true" className={cn("size-3.5 shrink-0 text-muted-foreground transition-transform", !open && "-rotate-90")} />
      <GroupHeading label={label} count={count} />
    </button>
  );
}

/** A heading over a group of rows ("Today · 3"), in a list, a timeline or a table. */
function GroupHeading({ label, count, className }: { label: string; count?: number; className?: string }) {
  return (
    <p className={cn("flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase", className)}>
      {label}
      {count !== undefined && <span className="tracking-normal">{count}</span>}
    </p>
  );
}

/** Whether item i starts a new group (the first of a group, or a group after another). */
const startsGroup = <T extends { group?: string }>(items: T[], i: number) => !!items[i].group && items[i].group !== items[i - 1]?.group;

const groupSize = <T extends { group?: string }>(items: T[], i: number) => items.filter((x) => x.group === items[i].group).length;

/** One field of a settings form: a text input or a textarea, its label tied to it. */
/** A secret shown once (a new API key, a recovery key): the value in mono with a Copy button, and why to copy it now. */
function SecretField({ label, value, note }: { label?: string; value: string; note?: string }) {
  const id = React.useId();
  const [copied, setCopied] = React.useState(false);
  const field = React.useRef<HTMLInputElement>(null);
  const copy = () => {
    navigator.clipboard?.writeText(value).then(
      () => setCopied(true),
      () => field.current?.select(),
    );
  };
  return (
    <Field label={label ?? "Your new key"} htmlFor={id} helper={note ?? "Copy it now. For your security we won't show it again."}>
      <InputGroup>
        <InputGroupInput ref={field} id={id} readOnly value={value} onFocus={(e) => e.currentTarget.select()} className="font-mono text-xs" />
        <InputGroupAddon align="inline-end">
          <Button type="button" size="sm" variant="ghost" onClick={copy} className="h-7 gap-1.5 px-2">
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}

/** A profile photo: the current one, Upload (a preview straight away) and Remove. */
/** The crop stage and the circle in it, in px. */
const CROP_STAGE = 280;

const CROP_CIRCLE = 240;

/**
 * Crops a chosen photo to a circle: drag it (or the arrow keys) to place it,
 * the slider (or + and -) to zoom; Save draws the circle's square at 256px.
 */
function AvatarCrop({ file, onCancel, onSave }: { file: string; onCancel: () => void; onSave: (url: string) => void }) {
  const img = React.useRef<HTMLImageElement>(null);
  const drag = React.useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const [natural, setNatural] = React.useState<{ w: number; h: number } | null>(null);
  const [zoom, setZoom] = React.useState(1);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  // The photo always covers the circle: scaled to it at zoom 1, and kept from sliding off it.
  const scale = natural ? (CROP_CIRCLE / Math.min(natural.w, natural.h)) * zoom : 1;
  const w = (natural?.w ?? 0) * scale;
  const h = (natural?.h ?? 0) * scale;
  const clamp = (v: number, size: number) => Math.max(-(size - CROP_CIRCLE) / 2, Math.min((size - CROP_CIRCLE) / 2, v));
  const at = { x: clamp(pos.x, w), y: clamp(pos.y, h) };
  const move = (dx: number, dy: number) => setPos({ x: clamp(at.x + dx, w), y: clamp(at.y + dy, h) });
  const save = () => {
    if (!natural || !img.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 256;
    // The circle's square, in the photo's own pixels.
    const left = (w - CROP_CIRCLE) / 2 - at.x;
    const top = (h - CROP_CIRCLE) / 2 - at.y;
    canvas.getContext("2d")?.drawImage(img.current, left / scale, top / scale, CROP_CIRCLE / scale, CROP_CIRCLE / scale, 0, 0, 256, 256);
    onSave(canvas.toDataURL("image/png"));
  };
  return (
    <Dialog open onOpenChange={(open) => !open && onCancel()}>
      <DialogContent
        title="Crop your photo"
        size="sm"
        aria-describedby={undefined}
        // To the photo, so the arrow keys move it straight away.
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          (e.currentTarget as HTMLElement).querySelector<HTMLElement>("[role=group]")?.focus();
        }}
      >
        <DialogBody className="flex flex-col items-center gap-4">
          <div
            role="group"
            aria-label="Photo position: drag, or use the arrow keys"
            tabIndex={0}
            className="relative cursor-grab touch-none overflow-hidden rounded-lg bg-muted outline-none select-none focus-visible:ring-2 focus-visible:ring-primary/40 active:cursor-grabbing"
            style={{ width: CROP_STAGE, height: CROP_STAGE }}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              drag.current = { x: at.x, y: at.y, px: e.clientX, py: e.clientY };
            }}
            onPointerMove={(e) => {
              const d = drag.current;
              if (d) setPos({ x: clamp(d.x + e.clientX - d.px, w), y: clamp(d.y + e.clientY - d.py, h) });
            }}
            onPointerUp={() => (drag.current = null)}
            onPointerCancel={() => (drag.current = null)}
            onKeyDown={(e) => {
              const step = e.shiftKey ? 32 : 8;
              const keys: Record<string, () => void> = {
                ArrowLeft: () => move(-step, 0),
                ArrowRight: () => move(step, 0),
                ArrowUp: () => move(0, -step),
                ArrowDown: () => move(0, step),
                "+": () => setZoom((z) => Math.min(3, z + 0.1)),
                "=": () => setZoom((z) => Math.min(3, z + 0.1)),
                "-": () => setZoom((z) => Math.max(1, z - 0.1)),
              };
              if (keys[e.key]) {
                e.preventDefault();
                keys[e.key]();
              }
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- a local file being cropped */}
            <img
              ref={img}
              src={file}
              alt=""
              draggable={false}
              onLoad={(e) => setNatural({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })}
              className="pointer-events-none absolute top-1/2 left-1/2 max-w-none"
              style={{ width: w || undefined, height: h || undefined, transform: `translate(-50%, -50%) translate(${at.x}px, ${at.y}px)` }}
            />
            {/* What's kept: the circle; the rest is dimmed. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute rounded-full"
              style={{ inset: (CROP_STAGE - CROP_CIRCLE) / 2, border: "2px solid rgb(255 255 255 / 0.9)", boxShadow: "0 0 0 999px rgb(0 0 0 / 0.55)" }}
            />
          </div>
          <div className="flex w-full items-center gap-3">
            <ZoomOut className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <Slider aria-label="Zoom" value={[zoom]} min={1} max={3} step={0.05} onValueChange={([z]) => setZoom(z)} />
            <ZoomIn className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={save} disabled={!natural}>
            Save photo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AvatarField({ label, name, hint }: { label: string; name: string; hint?: string }) {
  const id = React.useId();
  const [src, setSrc] = React.useState<string | null>(null);
  // A chosen file waits in the crop step; only a saved crop becomes the photo.
  const [picked, setPicked] = React.useState<string | null>(null);
  return (
    <div className="flex items-center gap-4 @xl:col-span-2">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element -- a local preview of the chosen file
        <img src={src} alt="" className="size-16 shrink-0 rounded-full object-cover" />
      ) : (
        <Avatar name={name || label} size="lg" className="size-16 text-lg" />
      )}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <div className="flex gap-2">
          <Button asChild size="sm" variant="outline">
            <label htmlFor={id} className="cursor-pointer">
              Upload photo
              <input
                id={id}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                onChange={(e) => {
                  const f = e.currentTarget.files?.[0];
                  if (f) setPicked(URL.createObjectURL(f));
                  // The same file can be picked again after a cancel.
                  e.currentTarget.value = "";
                }}
              />
            </label>
          </Button>
          {src && (
            <Button type="button" size="sm" variant="ghost" onClick={() => setSrc(null)}>
              Remove
            </Button>
          )}
        </div>
        <span className="text-xs text-muted-foreground">{hint ?? "JPG or PNG, at least 400 × 400 px."}</span>
      </div>
      {picked && (
        <AvatarCrop
          file={picked}
          onCancel={() => {
            URL.revokeObjectURL(picked);
            setPicked(null);
          }}
          onSave={(url) => {
            URL.revokeObjectURL(picked);
            setPicked(null);
            setSrc(url);
          }}
        />
      )}
    </div>
  );
}

/** What a field holds, for the browser's and password manager's autofill ("Email" -> email, "Company" -> organization). */
const AUTOFILL: [RegExp, string][] = [
  [/^(full |your )?name$/i, "name"],
  [/first name|given name/i, "given-name"],
  [/last name|surname|family name/i, "family-name"],
  [/e-?mail/i, "email"],
  [/phone|mobile|telephone/i, "tel"],
  [/company|organi[sz]ation|business name|agency name/i, "organization"],
  [/job title|^title$|position/i, "organization-title"],
  [/street|address line 1|^address$/i, "street-address"],
  [/address line 2|apartment|suite/i, "address-line2"],
  [/^city$|town/i, "address-level2"],
  [/post ?code|zip/i, "postal-code"],
  [/country/i, "country-name"],
  [/website|^url$/i, "url"],
  [/user ?name|handle/i, "username"],
  [/birth/i, "bday"],
];

function autofillFor(label: string, type?: string): string | undefined {
  if (type === "email") return "email";
  if (type === "tel") return "tel";
  return AUTOFILL.find(([re]) => re.test(label.trim()))?.[1];
}

function SettingsField({ label, value, type, helper }: { label: string; value: string; type?: "text" | "email" | "textarea" | "date" | "code" | "avatar"; helper?: string }) {
  const id = React.useId();
  return (
    <Field label={label} htmlFor={id} helper={helper} className={type === "textarea" ? "@xl:col-span-2" : undefined}>
      {type === "textarea" ? <Textarea id={id} defaultValue={value} rows={3} /> : <Input id={id} type={type ?? "text"} defaultValue={value} autoComplete={autofillFor(label, type)} />}
    </Field>
  );
}

function SettingsFormCard({
  title,
  description,
  fields,
  submitLabel,
}: {
  title: string;
  description?: string;
  /** date: the kit's date picker; code: the kit's OTP input (value = how many digits, "6"); avatar: a profile photo (value = the person's name). */
  fields: { label: string; value: string; type?: "text" | "email" | "textarea" | "date" | "code" | "avatar"; helper?: string }[];
  submitLabel?: string;
}) {
  // Edits show as "Unsaved changes" with Discard; leaving the page with them asks first (frames' LeaveGuard).
  const unsaved = useUnsaved(title);
  const [round, setRound] = React.useState(0);
  const [saved, setSaved] = React.useState(false);
  const onFooterClick = (e: React.MouseEvent) => {
    const slot = (e.target as Element).closest("[data-link]")?.getAttribute("data-link");
    const button = (e.target as Element).closest("[data-link]");
    if (slot === "submit" && unsaved.dirty) {
      unsaved.reset();
      setSaved(true);
      // Unwired, the status line says it was saved; no second notice.
      if (button && !button.hasAttribute("data-overlay") && !button.hasAttribute("data-nav-index")) e.stopPropagation();
    } else if (slot === "cancel" && unsaved.dirty) {
      // Discard puts the fields back, here, instead of going wherever Cancel leads.
      e.preventDefault();
      e.stopPropagation();
      unsaved.reset();
      setRound((r) => r + 1);
    }
  };
  const mark = (e: React.SyntheticEvent) => {
    if (!(e.target as Element).closest?.("[data-slot=card-footer]")) {
      setSaved(false);
      unsaved.handlers.onInput(e);
    }
  };
  return (
    <Card {...unsaved.attrs} onInput={mark} onChange={mark} onClick={(e) => !(e.target as Element).closest?.("[data-slot=card-footer]") && unsaved.handlers.onClick(e)}>
      <CardHeader title={title} description={description} />
      <CardContent key={round} className="grid gap-4 @xl:grid-cols-2">
        {fields.map((f) =>
          f.type === "date" ? (
            <DateField key={f.label} label={f.label} value={f.value} hint={f.helper} />
          ) : f.type === "avatar" ? (
            <AvatarField key={f.label} label={f.label} name={f.value} hint={f.helper} />
          ) : f.type === "code" ? (
            <div key={f.label} className="@xl:col-span-2">
              <CodeField label={f.label} length={Math.min(8, Math.max(4, Number(f.value) || 6))} hint={f.helper} />
            </div>
          ) : (
            <SettingsField key={f.label} label={f.label} value={f.value} type={f.type} helper={f.helper} />
          ),
        )}
      </CardContent>
      <CardFooter onClickCapture={onFooterClick}>
        <p role="status" className="mr-auto flex items-center gap-2 text-sm text-muted-foreground">
          {unsaved.dirty ? (
            <>
              <span className="size-2 rounded-full bg-warning" aria-hidden="true" />
              Unsaved changes
            </>
          ) : saved ? (
            <>
              <CircleCheck className="size-4 text-diff-add" aria-hidden="true" />
              Changes saved
            </>
          ) : null}
        </p>
        <SlotButton slot="cancel" variant="ghost">{unsaved.dirty ? "Discard" : "Cancel"}</SlotButton>
        <SlotButton slot="submit">{submitLabel ?? "Save changes"}</SlotButton>
      </CardFooter>
    </Card>
  );
}

function ToggleListCard({
  variant = "default",
  title,
  description,
  items,
  columns,
  rowLabel,
  locked,
  action,
}: {
  /** matrix: a grid of checkboxes, rows by columns: notification events by channel, permissions by role. */
  variant?: "default" | "matrix";
  title: string;
  description?: string;
  items: { label: string; description?: string; enabled: boolean; values?: boolean[]; group?: string }[];
  /** matrix: the 2-5 column heads ("Email", "In-app", "Push"; "Owner", "Admin", "Member"). */
  columns?: string[];
  /** matrix: what the rows are, over the first column ("Event", "Permission"). */
  rowLabel?: string;
  /** matrix: columns that can't be changed (an owner can do everything). */
  locked?: number[];
  action?: string;
}) {
  if (variant === "matrix" && columns?.length) {
    return (
      <Card className="h-full overflow-hidden">
        <CardHeader title={title} description={description} />
        <Table>
          <THead>
            <tr>
              <TH className="w-full">{rowLabel ?? <span className="sr-only">Item</span>}</TH>
              {columns.map((c, k) => (
                <TH key={c} className="px-3 text-center whitespace-nowrap">
                  <span className="inline-flex items-center gap-1">
                    {c}
                    {locked?.includes(k) && <Lock aria-label="Can't be changed" className="size-3" />}
                  </span>
                </TH>
              ))}
            </tr>
          </THead>
          <TBody>
            {items.map((it, r) => (
              <React.Fragment key={it.label}>
                {it.group && it.group !== items[r - 1]?.group && (
                  <tr>
                    <td colSpan={columns.length + 1} className="bg-muted/40 px-4 py-1.5">
                      <GroupHeading label={it.group} />
                    </td>
                  </tr>
                )}
                <TR>
                  <TD className="py-2.5">
                    <span className="block text-sm font-medium text-foreground">{it.label}</span>
                    {it.description && <span className="block text-xs text-muted-foreground">{it.description}</span>}
                  </TD>
                  {columns.map((c, k) => (
                    <TD key={c} className="px-3 py-2.5 text-center">
                      <Checkbox
                        aria-label={`${it.label}: ${c}`}
                        defaultChecked={locked?.includes(k) ? true : (it.values?.[k] ?? it.enabled)}
                        disabled={locked?.includes(k)}
                        className="mx-auto"
                      />
                    </TD>
                  ))}
                </TR>
              </React.Fragment>
            ))}
          </TBody>
        </Table>
        {action && (
          <div className="flex justify-end border-t border-border px-5 py-3">
            <SlotButton slot="action" size="sm">
              {action}
            </SlotButton>
          </div>
        )}
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader title={title} description={description} />
      <CardContent className="flex flex-col divide-y divide-border py-2">
        {items.map((it) => (
          <label key={it.label} className="flex cursor-pointer items-center justify-between gap-6 py-3.5">
            <span>
              <span className="block text-sm font-medium text-foreground">{it.label}</span>
              {it.description && <span className="block text-sm text-muted-foreground">{it.description}</span>}
            </span>
            <Switch defaultChecked={it.enabled} aria-label={it.label} />
          </label>
        ))}
      </CardContent>
    </Card>
  );
}

const toneFill = {
  success: "bg-diff-add",
  warning: "bg-warning",
  error: "bg-destructive",
  info: "bg-primary-mark",
  neutral: "bg-muted-foreground/40",
} as const;

type Tone = keyof typeof toneFill;

const toneIcon = { info: Info, warning: CircleAlert, error: OctagonAlert, success: CircleCheck, neutral: Circle };

const toneText = {
  info: "text-primary-ink",
  warning: "text-warning-foreground",
  error: "text-destructive",
  success: "text-diff-add",
  neutral: "text-muted-foreground",
} as const;

function AttentionListCard({
  variant = "default",
  title,
  items,
  linkLabel,
}: {
  variant?: "default" | "actions";
  title: string;
  /** impact = what acting on it is expected to bring ("+24% revenue"), shown as a badge (the actions variant). */
  items: { tone: Tone; title: string; text?: string; linkLabel?: string; impact?: string }[];
  linkLabel?: string;
}) {
  const urgent = items.filter((it) => it.tone === "error").length;
  const warnings = items.filter((it) => it.tone === "warning").length;
  if (variant === "actions") {
    // Recommendations: an icon for what it is about, the suggestion and its reason,
    // the expected impact as a badge and the action as a button. In a narrow card the
    // badge and the button go under the text.
    return (
      <Card className="@container flex h-full flex-col">
        {linkLabel ? <BlockHeader title={title} linkLabel={linkLabel} /> : <CardHeader title={title} />}
        <CardContent className="flex flex-1 flex-col">
          <ul className="flex flex-1 flex-col justify-between divide-y divide-border">
            {items.map((it, i) => {
              const Icon = statIcon(`${it.title} ${it.text ?? ""}`);
              return (
                <li key={i} className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0 @lg:items-center">
                  <span className="grid size-10 shrink-0 place-items-center rounded-md border border-[color-mix(in_oklch,var(--primary)_28%,transparent)] bg-primary/12 text-primary-ink">
                    <Icon className="size-5" />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-2 @lg:flex-row @lg:items-center @lg:gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-pretty text-foreground">{it.title}</p>
                      {it.text && <p className="mt-0.5 text-xs text-pretty text-muted-foreground">{it.text}</p>}
                    </div>
                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                      {it.impact && (
                        <span className="rounded-full border border-[color-mix(in_oklch,var(--diff-add)_45%,transparent)] px-2 py-0.5 font-mono text-[11px] whitespace-nowrap text-diff-add tabular-nums">{it.impact}</span>
                      )}
                      {it.linkLabel && (
                        <SlotButton slot={`item-${i}`} size="sm" variant="soft" className="rounded-full">
                          {it.linkLabel}
                        </SlotButton>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    );
  }
  return (
    // @container: in a narrow card the action goes under its text rather than squeezing it to a word a line.
    <Card className="@container flex h-full flex-col">
      <CardHeader title={title} />
      <CardContent className="flex flex-1 flex-col">
        {/* Rows keep their own height, the icon level with its title; beside a taller card the summary sits at the foot. */}
        <ul className="flex flex-col divide-y divide-border">
          {items.map((it, i) => {
            const Icon = toneIcon[it.tone] ?? Info;
            return (
              <li key={i} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <Icon className={cn("mt-px size-[18px] shrink-0", toneText[it.tone])} aria-hidden="true" />
                <div className="flex min-w-0 flex-1 flex-col gap-1.5 @md:flex-row @md:items-center @md:gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{it.title}</p>
                    {it.text && <p className="mt-0.5 text-sm text-muted-foreground">{it.text}</p>}
                  </div>
                  {it.linkLabel && (
                    <SlotLink slot={`item-${i}`} className="shrink-0 self-start text-sm font-medium text-primary-ink underline-offset-4 hover:underline @md:self-center">
                      {it.linkLabel}
                    </SlotLink>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border pt-3 text-xs text-muted-foreground">
          <span>
            {items.length} {items.length === 1 ? "alert" : "alerts"}
          </span>
          {urgent > 0 && (
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-destructive" />
              {urgent} urgent
            </span>
          )}
          {warnings > 0 && (
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-warning" />
              {warnings} {warnings === 1 ? "warning" : "warnings"}
            </span>
          )}
        </p>
      </CardContent>
    </Card>
  );
}

const EVENT_ICONS: [RegExp, React.ComponentType<{ className?: string }>][] = [
  [/standup|meeting|sync|1:1|call|interview/i, Users],
  [/review|design|feedback/i, FileText],
  [/focus|deep work|block/i, Target],
  [/client|customer|demo/i, Mail],
];

const eventIcon = (title: string) => EVENT_ICONS.find(([re]) => re.test(title))?.[1] ?? Calendar;

const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => ({ day, date: String(21 + i) }));

function AgendaCard({
  variant = "week",
  title,
  date,
  days = WEEK,
  today = 3,
  events,
  linkLabel,
}: {
  variant?: "week" | "list";
  title: string;
  /** The day shown, e.g. "Thu, Oct 24". */
  date?: string;
  /** The week strip: short day name and date number. */
  days?: { day: string; date: string }[];
  /** Index of today in days. */
  today?: number;
  events: { time: string; title: string; duration?: string }[];
  linkLabel?: string;
}) {
  // An event on another day reads "Fri 10:00": it goes under that day's heading, its time alone in the column.
  const DAY = /^(mon|tue|wed|thu|fri|sat|sun)[a-z]*\.?,?\s+(.+)$/i;
  const dayHeading = (word: string) => {
    const d = days.find((x) => x.day.slice(0, 3).toLowerCase() === word.slice(0, 3).toLowerCase());
    return d ? `${d.day} ${d.date}` : word.charAt(0).toUpperCase() + word.slice(1, 3).toLowerCase();
  };
  const rows = events.map((e) => {
    const m = DAY.exec(e.time.trim());
    return { ...e, time: m ? m[2] : e.time, day: m ? dayHeading(m[1]) : null };
  });
  // A length ("45 min", "2 h") reads as plain text; a word ("Today", "Due") is a due marker, shown as a tag.
  const isLength = (v: string) => /\d/.test(v);
  const dueToday = rows.filter((e) => !e.day && e.duration && !isLength(e.duration)).length;
  return (
    <Card className="@container flex h-full flex-col">
      <BlockHeader title={title} linkLabel={linkLabel} />
      <CardContent className="flex flex-1 flex-col gap-4">
        {date && <p className="text-sm font-medium text-foreground">{date}</p>}
        {variant === "week" && (
          <ol className="grid grid-cols-7 gap-1 text-center">
            {days.map((d, i) => (
              <li
                key={i}
                aria-current={i === today ? "date" : undefined}
                className={cn("mx-auto flex w-full max-w-12 flex-col gap-1 rounded-md py-1.5", i === today ? "bg-primary-strong text-primary-foreground" : "text-muted-foreground")}
              >
                <span className="text-[10px]">{d.day}</span>
                <span className={cn("text-sm font-medium tabular-nums", i !== today && "text-foreground")}>{d.date}</span>
              </li>
            ))}
          </ol>
        )}
        <ul className="flex flex-col gap-3">
          {rows.map((e, i) => {
            const Icon = eventIcon(e.title);
            const heading = e.day && e.day !== rows[i - 1]?.day ? e.day : null;
            return (
              <React.Fragment key={i}>
                {heading && <li className="pt-1 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">{heading}</li>}
                <li className="flex items-center gap-3 text-sm">
                  <span className="w-11 shrink-0 font-mono text-xs text-muted-foreground tabular-nums">{e.time}</span>
                  {/* A narrow card drops the icon, so the title keeps a readable width. */}
                  <span className="hidden size-7 shrink-0 place-items-center rounded-md border border-border text-muted-foreground @xs:grid">
                    <Icon className="size-3.5" />
                  </span>
                  {/* Wraps rather than cuts off on a narrow card. */}
                  <span className="min-w-0 flex-1 text-pretty text-foreground">{e.title}</span>
                  {e.duration &&
                    (isLength(e.duration) ? (
                      <span className="shrink-0 text-right text-xs text-muted-foreground tabular-nums @xs:min-w-14">{e.duration}</span>
                    ) : (
                      <span className="flex shrink-0 justify-end @xs:min-w-14">
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-foreground">{e.duration}</span>
                      </span>
                    ))}
                </li>
              </React.Fragment>
            );
          })}
        </ul>
        {/* The week in one line at the foot: a card stretched beside a taller one ends here, not on a gap. */}
        <p className="mt-auto flex justify-between gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
          <span>
            {events.length} {events.length === 1 ? "event" : "events"} this week
          </span>
          {dueToday > 0 && <span className="font-medium text-foreground">{dueToday} due today</span>}
        </p>
      </CardContent>
    </Card>
  );
}

/** How a whole splits: a donut, or a half-donut gauge, with the total in the middle and a legend. */
/** The size of the figure in the middle of the rings, by how long it is and how many rings close in on it. */
function ringFigure(figure: string, rings: number) {
  const sizes = ["text-2xl", "text-xl", "text-lg", "text-base", "text-sm"];
  // The chart grows with three or more rings (see BreakdownCard), so the middle stays about as wide however many there are.
  const step = figure.length > 10 ? 4 : figure.length > 9 ? 3 : figure.length > 7 ? 2 : figure.length > 5 ? 1 : 0;
  return sizes[Math.min(step + (rings > 4 ? 1 : 0), sizes.length - 1)];
}

function BreakdownCard({
  variant = "donut",
  title,
  description,
  total,
  totalLabel,
  items,
  linkLabel,
}: {
  variant?: "donut" | "half" | "rings" | "bar";
  title: string;
  description?: string;
  /** The middle figure as written ("€48.2k"); the sum of the values when left out. */
  total?: string;
  totalLabel?: string;
  /** value sizes the slice; display is how it reads in the legend ("€18.4k"). In "rings", max is each item's own whole (3 of 8 tasks). */
  items: { label: string; value: number; display?: string; max?: number }[];
  linkLabel?: string;
}) {
  if (variant === "rings") {
    // Each item its own ring against its own whole: a day's tasks, focus and meetings.
    const rings = items.slice(0, 4).map((it, i) => ({ label: it.label, value: it.value, max: it.max ?? Math.max(...items.map((x) => x.max ?? x.value)) ?? 100, color: ITEM_COLORS[i % ITEM_COLORS.length] }));
    return (
      <Card className="@container/breakdown h-full" {...ramp(items.length)}>
        <BlockHeader title={title} description={description} linkLabel={linkLabel} />
        <CardContent className="flex flex-col items-center gap-6 @sm/breakdown:flex-row @sm/breakdown:gap-8">
          {/* Thinner rings as they multiply, and a larger chart with three or more, so the middle stays wide enough for the figure. */}
          <Rings items={rings} size={rings.length >= 3 ? 176 : 152} thickness={rings.length >= 4 ? 6 : rings.length === 3 ? 8 : 11} gap={3}>
            {total && (
              <>
                {/* The figure steps down as it grows longer ("82%" to "3 h 42 min"), so it fits the middle on one line. */}
                <span className={cn("block font-heading leading-none font-semibold tracking-tight text-foreground tabular-nums", ringFigure(total, rings.length))}>{total}</span>
                {totalLabel && <span className="mt-1 block text-xs leading-snug text-muted-foreground">{totalLabel}</span>}
              </>
            )}
          </Rings>
          <ul className="flex w-full min-w-0 flex-col gap-4">
            {rings.map((it, i) => (
              <li key={it.label} className="flex items-start gap-3 border-l-[3px] pl-3" style={{ borderColor: it.color }}>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">{it.label}</p>
                  <p className="font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground tabular-nums">
                    {items[i].display ?? it.value}
                    <span className="text-base font-normal text-muted-foreground"> / {items[i].max ?? it.max}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  }
  const sum = items.reduce((n, it) => n + it.value, 0) || 1;
  // Each slice is a dash on a path measured as 100 units, with a hairline gap between slices.
  const gap = items.length > 1 ? 0.8 : 0;
  const arcs = items.map((it, i) => {
    const start = (items.slice(0, i).reduce((n, x) => n + x.value, 0) / sum) * 100;
    const len = (it.value / sum) * 100;
    return { key: it.label, color: ITEM_COLORS[i % ITEM_COLORS.length], dash: Math.max(len - gap, 0.4), offset: -start };
  });
  const half = variant === "half";
  const figure = total ?? new Intl.NumberFormat("en").format(sum);
  if (variant === "bar") {
    // The total big, one bar split by share, then a legend row per part with its value and share.
    const label = items.map((it) => `${it.label}: ${it.display ?? it.value}`).join(", ");
    return (
      <Card className="h-full" {...ramp(items.length)}>
        <BlockHeader title={title} description={description} linkLabel={linkLabel} />
        <CardContent className="flex flex-col gap-4">
          <div>
            <p className="font-heading text-4xl leading-none font-semibold tracking-tight text-foreground tabular-nums">{figure}</p>
            <p className="mt-1.5 text-xs text-muted-foreground">{totalLabel ?? "Total"}</p>
          </div>
          <div className="flex h-3 gap-1" role="img" aria-label={label}>
            {items.map((it, i) => (
              <span key={it.label} className="min-w-1.5 rounded-full" style={{ flex: `${Math.max(it.value, 0)} 1 0%`, background: ITEM_COLORS[i % ITEM_COLORS.length] }} />
            ))}
          </div>
          <ul className="flex flex-col divide-y divide-border">
            {items.map((it, i) => (
              <li key={it.label} className="flex items-center gap-2.5 py-2 text-sm first:pt-0 last:pb-0">
                <span aria-hidden="true" className="size-2.5 shrink-0 rounded-[3px]" style={{ background: ITEM_COLORS[i % ITEM_COLORS.length] }} />
                <span className="min-w-0 flex-1 truncate text-muted-foreground">{it.label}</span>
                <span className="font-medium text-foreground tabular-nums">{it.display ?? it.value.toLocaleString("en-GB")}</span>
                <span className="w-10 text-right font-mono text-xs text-muted-foreground tabular-nums">{Math.round((it.value / sum) * 100)}%</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  }
  // The figure shrinks as it lengthens, so it stays inside the ring's hole.
  const middle = (
    <>
      <span className={cn("font-heading leading-none font-semibold tracking-tight text-foreground tabular-nums", figure.length > 7 ? "text-lg" : figure.length > 5 ? "text-xl" : "text-2xl")}>{figure}</span>
      <span className="mt-1 text-xs text-muted-foreground">{totalLabel ?? "Total"}</span>
    </>
  );
  const label = items.map((it) => `${it.label}: ${it.display ?? it.value}`).join(", ");
  return (
    <Card className="@container/breakdown h-full" {...ramp(items.length)}>
      <BlockHeader title={title} description={description} linkLabel={linkLabel} />
      <CardContent className={cn("flex flex-col items-center gap-5", !half && "@sm/breakdown:flex-row @sm/breakdown:gap-6")}>
        {half ? (
          <div className="relative w-full max-w-60" role="img" aria-label={label}>
            <svg viewBox="0 0 100 54" className="w-full" aria-hidden="true">
              <path d="M8 50 A42 42 0 0 1 92 50" pathLength={100} fill="none" stroke="var(--muted)" strokeWidth="9" />
              {arcs.map((a) => (
                <path key={a.key} d="M8 50 A42 42 0 0 1 92 50" pathLength={100} fill="none" stroke={a.color} strokeWidth="9" strokeDasharray={`${a.dash} ${100 - a.dash}`} strokeDashoffset={a.offset} />
              ))}
            </svg>
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">{middle}</div>
          </div>
        ) : (
          <div className="relative size-40 shrink-0" role="img" aria-label={label}>
            <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden="true">
              <circle cx="50" cy="50" r="41" pathLength={100} fill="none" stroke="var(--muted)" strokeWidth="12" />
              {arcs.map((a) => (
                <circle key={a.key} cx="50" cy="50" r="41" pathLength={100} fill="none" stroke={a.color} strokeWidth="12" strokeDasharray={`${a.dash} ${100 - a.dash}`} strokeDashoffset={a.offset} />
              ))}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">{middle}</div>
          </div>
        )}
        <ul className="flex w-full min-w-0 flex-col gap-2.5">
          {items.map((it, i) => (
            <li key={it.label} className="flex items-center gap-2.5 text-sm">
              <span className="size-2.5 shrink-0 rounded-full" style={{ background: ITEM_COLORS[i % ITEM_COLORS.length] }} />
              <span className="min-w-0 flex-1 truncate text-muted-foreground">{it.label}</span>
              <span className="font-medium text-foreground tabular-nums">{it.display ?? it.value}</span>
              <span className="w-9 text-right font-mono text-xs text-muted-foreground tabular-nums">{Math.round((it.value / sum) * 100)}%</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

const PRESENCE = { online: "bg-diff-add", away: "bg-warning", offline: "bg-muted-foreground/40" } as const;

/** Top performers ranked by a value, or a list of people with their status and an action. */
function LeaderboardCardBase({
  variant = "ranked",
  title,
  description,
  items,
  linkLabel,
}: {
  variant?: "ranked" | "people";
  title: string;
  description?: string;
  /** meta = role, plan or company; pct = share for the ranked bar; action = a button ("Follow", "Approve"). */
  items: { name: string; meta?: string; value?: string; change?: string; pct?: number; status?: keyof typeof PRESENCE; action?: string }[];
  linkLabel?: string;
}) {
  const ranked = variant === "ranked";
  // ⌘K finds the people on a people list.
  useSearchable(`people:${title}`, ranked ? [] : items.map((it) => ({ group: "People", label: it.name, detail: it.meta })));
  // A queue (every row the same act: Approve, Review): a footer at the card's foot sums it up and acts on all,
  // so beside a taller card the column ends on it instead of empty space.
  const act = items.length > 1 && items.every((it) => it.action && it.action === items[0].action) ? items[0].action! : null;
  // Acting on a row (Approve, Follow) marks it done; "… all" does every row.
  const [done, setDone] = React.useState<number[]>([]);
  const { notify } = useAppActions();
  const doneLabel = (a: string) => (/^follow$/i.test(a) ? "Following" : /e$/i.test(a) ? `${a}d` : `${a}ed`);
  const left = items.map((_, i) => i).filter((i) => !done.includes(i));
  const total = act ? sumAmounts(left.map((i) => `${items[i].value ?? ""} ${items[i].meta ?? ""}`)) : null;
  return (
    <Card className="flex h-full flex-col">
      <BlockHeader title={title} description={description} linkLabel={linkLabel} />
      <CardContent className="flex flex-1 flex-col">
        {/* Beside a taller card the rows share the extra height, so no empty band opens above the footer. */}
        <ol className="flex flex-1 flex-col divide-y divide-border">
          {items.map((it, i) => (
            <li key={i} data-searchable={it.name} className="flex flex-1 items-center gap-3 py-2.5 first:pt-0 last:pb-0">
              {ranked && (
                <span className={cn("w-4 shrink-0 text-center font-mono text-xs tabular-nums", i < 3 ? "font-semibold text-foreground" : "text-muted-foreground")}>{i + 1}</span>
              )}
              <span className="relative shrink-0">
                <Avatar name={it.name} size="sm" />
                {!ranked && it.status && (
                  <span className={cn("absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full ring-2 ring-card", PRESENCE[it.status])}>
                    <span className="sr-only">{it.status}</span>
                  </span>
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{it.name}</p>
                {it.meta && <p className="line-clamp-2 text-xs text-muted-foreground">{it.meta}</p>}
                {ranked && it.pct !== undefined && (
                  <Progress value={it.pct} aria-label={it.name} className="mt-1.5 h-1" />
                )}
              </div>
              {it.action ? (
                done.includes(i) ? (
                  <button type="button" onClick={() => setDone((d) => d.filter((x) => x !== i))} aria-label={`Undo: ${it.action} ${it.name}`} className="flex max-w-[45%] shrink-0 items-center gap-1 text-xs font-medium text-diff-add">
                    <Check className="size-3.5 shrink-0" aria-hidden="true" />
                    <span className="truncate">{doneLabel(it.action)}</span>
                  </button>
                ) : (
                  <Button size="xs" variant={i === 0 && !ranked ? "default" : "outline"} className="max-w-[45%] shrink-0" onClick={() => setDone((d) => [...d, i])}>
                    {it.action}
                  </Button>
                )
              ) : (
                (it.value || it.change) && (
                  <div className="max-w-[40%] shrink-0 text-right">
                    {it.value && <p className="truncate text-sm font-semibold text-foreground tabular-nums">{it.value}</p>}
                    {it.change && (
                      <p className={cn("truncate font-mono text-[11px] tabular-nums", /^[-−]/.test(it.change) ? "text-destructive" : "text-diff-add")}>{it.change}</p>
                    )}
                  </div>
                )
              )}
            </li>
          ))}
        </ol>
      </CardContent>
      {act && (
        <CardFooter className="mt-auto justify-between">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {left.length ? (
              <>
                <span className="font-medium text-foreground tabular-nums">{left.length}</span> waiting
                {total && (
                  <>
                    {" · "}
                    <span className="font-medium text-foreground tabular-nums">{total}</span>
                  </>
                )}
              </>
            ) : (
              "All done"
            )}
          </p>
          <Button
            size="sm"
            disabled={!left.length}
            onClick={() => {
              setDone(items.map((_, i) => i));
              notify(`${doneLabel(act)} ${left.length} ${left.length === 1 ? "item" : "items"}`);
            }}
          >
            {act} all
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

/**
 * The sum of the one amount each line names ("Photo studio hire · €640"), in
 * that currency ("€925"); null unless every line has one, all in one currency.
 */
function sumAmounts(lines: string[]): string | null {
  const found = lines.map((l) => /([€$£])\s?(\d[\d,]*(?:\.\d+)?)/.exec(l));
  if (!found.length || found.some((m) => !m) || new Set(found.map((m) => m![1])).size > 1) return null;
  const sum = found.reduce((t, m) => t + Number(m![2].replace(/,/g, "")), 0);
  const decimals = found.some((m) => m![2].includes(".")) ? 2 : 0;
  return `${found[0]![1]}${sum.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
}

/** Label and value pairs: a record's details or a summary, as rows or a grid of tiles. */
/** A saved payment method's mark: the card network's short name in a card-shaped tile, or a card icon. */
function PaymentMark({ label }: { label: string }) {
  const brand = /visa/i.test(label) ? "VISA" : /master/i.test(label) ? "MC" : /amex|american express/i.test(label) ? "AMEX" : /paypal/i.test(label) ? "PayPal" : /sepa|iban|bank|ach/i.test(label) ? "BANK" : null;
  return (
    <span aria-hidden className="grid h-7 w-11 shrink-0 place-items-center rounded-md border border-border bg-muted/50 font-mono text-[9px] font-semibold tracking-wider text-foreground">
      {brand ?? <CreditCard className="size-4 text-muted-foreground" />}
    </span>
  );
}

function KeyValueCardBase({
  variant: asked = "list",
  title,
  description,
  items,
  linkLabel,
  action,
}: {
  /** methods: saved payment methods, each with its card mark, the default marked and a warning when it's expiring. */
  variant?: "list" | "grid" | "properties" | "methods";
  title: string;
  description?: string;
  /** status = show the value as a badge coloured by its meaning ("Paid", "Overdue"). methods: isDefault marks the default, warning a problem ("Expires this month"). */
  items: { label: string; value: string; status?: boolean; isDefault?: boolean; warning?: string }[];
  linkLabel?: string;
  action?: string;
}) {
  const value = (it: (typeof items)[number]) => (it.status ? <Badge variant={statusTone(it.value)}>{it.value}</Badge> : it.value);
  // A default and a warning only mean something on saved payment methods: items that carry them are shown as those.
  const variant = asked !== "methods" && items.some((it) => it.isDefault || it.warning) ? "methods" : asked;
  if (variant === "methods") {
    return (
      <Card className="h-full">
        <BlockHeader title={title} description={description} linkLabel={linkLabel} />
        <CardContent className="flex flex-col gap-4">
          <ul className="flex flex-col divide-y divide-border">
            {items.map((it) => (
              <li key={it.label} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <PaymentMark label={it.label} />
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-foreground">
                    <span className="min-w-0 break-words">{it.label}</span>
                    {it.isDefault && <Badge variant="neutral" className="shrink-0">Default</Badge>}
                  </p>
                  <p className="text-xs text-muted-foreground">{it.value}</p>
                  {it.warning && (
                    <Badge variant="warning" className="mt-1.5 gap-1">
                      <TriangleAlert className="size-3" />
                      {it.warning}
                    </Badge>
                  )}
                </div>
                <RowMenu actions={it.isDefault ? ["Edit", "Remove"] : ["Set as default", "Edit", "Remove"]} label={`Actions for ${it.label}`} vars={{ name: it.label }} />
              </li>
            ))}
          </ul>
          {action && (
            <SlotButton slot="action" size="sm" variant="outline" className="w-full">
              <Plus />
              {action}
            </SlotButton>
          )}
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="h-full">
      <BlockHeader title={title} description={description} linkLabel={linkLabel} />
      <CardContent className="flex flex-col gap-4">
        {variant === "properties" ? (
          // A record's properties, as a detail page's rail shows them: each
          // value a chip (several, split at commas), people with an avatar.
          <dl className="grid grid-cols-[minmax(72px,auto)_minmax(0,1fr)] items-center gap-x-4 gap-y-2.5 text-sm">
            {items.map((it) => (
              <React.Fragment key={it.label}>
                <dt className="text-muted-foreground">{it.label}</dt>
                <dd className="flex min-w-0 flex-wrap gap-1.5">
                  {it.status ? (
                    <Badge variant={statusTone(it.value)}>{it.value}</Badge>
                  ) : (
                    chipsOf(it.value).map((v) => (
                        <span key={v} className="inline-flex max-w-full items-center gap-1.5 rounded-md bg-muted py-0.5 pr-2 pl-1.5 text-[13px] font-medium text-foreground">
                          {/assignee|owner|lead|author|reporter|manager|contact|created by|agent|rep\b/i.test(it.label) && <Avatar name={v} size="sm" className="size-5 text-[9px]" />}
                          <span className="truncate">{v}</span>
                        </span>
                      ))
                  )}
                </dd>
              </React.Fragment>
            ))}
          </dl>
        ) : variant === "grid" ? (
          <dl className="grid grid-cols-2 gap-2">
            {items.map((it) => (
              <div key={it.label} className="min-w-0 rounded-lg bg-muted/60 px-3 py-2.5">
                {/* A value is the content: it wraps in a narrow tile, never ends in "…". */}
                <dt className="text-xs break-words text-muted-foreground">{it.label}</dt>
                <dd className="mt-1 text-sm leading-snug font-semibold break-words text-foreground tabular-nums">{value(it)}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <dl className="flex flex-col divide-y divide-border">
            {items.map((it) => (
              <div key={it.label} className="flex items-baseline justify-between gap-4 py-2.5 first:pt-0 last:pb-0 text-sm">
                <dt className="max-w-[55%] shrink-0 text-muted-foreground">{it.label}</dt>
                <dd className="min-w-0 text-right font-medium break-words text-foreground tabular-nums">{value(it)}</dd>
              </div>
            ))}
          </dl>
        )}
        {action && (
          <SlotButton slot="action" size="sm" variant="outline" className="w-full">
            {action}
          </SlotButton>
        )}
      </CardContent>
    </Card>
  );
}

/** A property's value as chips: several at commas ("Bug, Mobile"), unless a part is a number, as in a date ("Oct 29, 2026"). */
function chipsOf(value: string): string[] {
  const parts = value.split(",").map((v) => v.trim()).filter(Boolean);
  return parts.length > 1 && parts.every((v) => !/^[\d.,\s]+$/.test(v)) ? parts : [value];
}

/** Intensity across two dimensions (days by hours): tinted cells, or dots sized by the value. */
function HeatmapCard({
  variant = "cells",
  title,
  description,
  rowLabels,
  columnLabels,
  values,
  summary,
  linkLabel,
}: {
  variant?: "cells" | "dots" | "cohort";
  title: string;
  description?: string;
  rowLabels: string[];
  columnLabels: string[];
  /** One row per label, one value (0-100) per column; in a cohort grid a row can stop early (a newer cohort has fewer periods). */
  values: number[][];
  /** A one-line takeaway beside the legend ("Busiest: Tue 10am"). */
  summary?: string;
  linkLabel?: string;
}) {
  const max = Math.max(1, ...values.flat());
  const level = (v: number) => v / max;
  // Without a written takeaway, name the peak cell, so the line always matches the grid.
  const peak = values.flatMap((row, r) => row.map((v, c) => ({ v, r, c }))).reduce((a, b) => (b.v > a.v ? b : a), { v: -1, r: 0, c: 0 });
  const takeaway = summary ?? `Peak: ${rowLabels[peak.r]} ${columnLabels[peak.c]}`;
  if (variant === "cohort") return <CohortGrid title={title} description={description} rowLabels={rowLabels} columnLabels={columnLabels} values={values} summary={summary} linkLabel={linkLabel} />;
  return (
    <Card className="h-full">
      <BlockHeader title={title} description={description} linkLabel={linkLabel} />
      <CardContent className="flex flex-col gap-4">
        <div
          role="img"
          aria-label={`${title}. ${takeaway}`}
          className="grid items-center gap-1"
          style={{ gridTemplateColumns: `auto repeat(${columnLabels.length}, minmax(0, 1fr))` }}
        >
          {rowLabels.map((row, r) => (
            <React.Fragment key={row}>
              <span className="pr-1.5 text-[11px] text-muted-foreground">{row}</span>
              {columnLabels.map((col, c) => {
                const t = level(values[r]?.[c] ?? 0);
                return variant === "dots" ? (
                  <span key={col} className="grid h-5 place-items-center">
                    <span className="rounded-full bg-highlight" style={{ width: 4 + t * 12, height: 4 + t * 12, opacity: 0.3 + t * 0.7 }} />
                  </span>
                ) : (
                  <span key={col} className="h-5 rounded-[4px]" style={{ background: `color-mix(in oklch, var(--highlight, var(--primary)) ${Math.round(8 + t * 92)}%, var(--muted))` }} />
                );
              })}
            </React.Fragment>
          ))}
          <span />
          {columnLabels.map((col) => (
            <span key={col} className="truncate pt-0.5 text-center text-[10px] text-muted-foreground">{col}</span>
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          Less
          {[0.08, 0.3, 0.55, 0.8, 1].map((t) => (
            <span key={t} className="size-2.5 rounded-[3px]" style={{ background: `color-mix(in oklch, var(--highlight, var(--primary)) ${Math.round(t * 100)}%, var(--muted))` }} />
          ))}
          More
          <span className="ml-auto truncate font-medium text-foreground">{takeaway}</span>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * A cohort grid: one row per cohort (the month they joined), one column per
 * period since, each cell the share still active. Newer cohorts have lived
 * fewer periods, so the grid is a triangle: a row the data stops early ends
 * there, and without that the newest row keeps only its first period. A row
 * of averages closes it. Cells are tinted by value at most halfway to the
 * accent, so the figure on every cell keeps the theme's text contrast.
 */
function CohortGrid({
  title,
  description,
  rowLabels,
  columnLabels,
  values,
  summary,
  linkLabel,
}: {
  title: string;
  description?: string;
  rowLabels: string[];
  columnLabels: string[];
  values: number[][];
  summary?: string;
  linkLabel?: string;
}) {
  const rows = rowLabels.length;
  const cols = columnLabels.length;
  // The data's own shape when a row stops early; otherwise each newer cohort one period shorter.
  const ragged = values.some((row) => row.length < cols);
  const shown = (r: number, c: number) => (ragged ? c < (values[r]?.length ?? 0) : c <= Math.round((cols - 1) * (1 - r / Math.max(1, rows - 1))));
  const cells = rowLabels.flatMap((_, r) => columnLabels.flatMap((__, c) => (shown(r, c) ? [values[r]?.[c] ?? 0] : [])));
  const lo = Math.min(...cells);
  const hi = Math.max(...cells);
  const level = (v: number) => (hi > lo ? (v - lo) / (hi - lo) : 1);
  const average = columnLabels.map((_, c) => {
    const col = rowLabels.flatMap((__, r) => (shown(r, c) ? [values[r]?.[c] ?? 0] : []));
    return col.length ? Math.round((col.reduce((a, b) => a + b, 0) / col.length) * 10) / 10 : null;
  });
  return (
    <Card className="h-full">
      <BlockHeader title={title} description={description} linkLabel={linkLabel} />
      <CardContent className="flex flex-col gap-4">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max border-separate border-spacing-1 text-center font-mono text-[11px] tabular-nums">
            <caption className="sr-only">{`${title}: the share of each cohort still active, by period since it started.`}</caption>
            <thead>
              <tr>
                <th scope="col" className="sr-only">Cohort</th>
                {columnLabels.map((col) => (
                  <th key={col} scope="col" className="px-1 pb-1 font-normal text-muted-foreground">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rowLabels.map((row, r) => (
                <tr key={row}>
                  <th scope="row" className="pr-2 text-left font-sans text-[11px] font-normal whitespace-nowrap text-muted-foreground">
                    {row}
                  </th>
                  {columnLabels.map((col, c) =>
                    shown(r, c) ? (
                      <td
                        key={col}
                        className="h-7 min-w-8 rounded-[5px] px-1 text-foreground"
                        style={{ background: `color-mix(in oklch, var(--highlight, var(--primary)) ${Math.round(6 + level(values[r]?.[c] ?? 0) * 44)}%, var(--card))` }}
                      >
                        {values[r]?.[c] ?? 0}
                      </td>
                    ) : (
                      <td key={col} aria-hidden="true" />
                    ),
                  )}
                </tr>
              ))}
              <tr>
                <th scope="row" className="pt-1 pr-2 text-left font-sans text-[11px] font-medium text-foreground">
                  Average
                </th>
                {average.map((v, c) => (
                  <td key={columnLabels[c]} className="h-7 rounded-[5px] border border-border px-1 font-medium text-foreground">
                    {v ?? ""}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          {lo}%
          {[0.08, 0.3, 0.55, 0.8, 1].map((t) => (
            <span key={t} aria-hidden="true" className="size-2.5 rounded-[3px]" style={{ background: `color-mix(in oklch, var(--highlight, var(--primary)) ${Math.round(6 + t * 44)}%, var(--card))` }} />
          ))}
          {hi}%
          {summary && <span className="ml-auto truncate font-medium text-foreground">{summary}</span>}
        </div>
      </CardContent>
    </Card>
  );
}

// --- marketing sections ----------------------------------------------------

/** A title around its highlighted word, at the word's first appearance: "Fill every chair, every day" keeps its second "every". */
function splitHighlight(title: string, highlight?: string): [string, string | null, string] {
  const at = highlight ? title.indexOf(highlight) : -1;
  return at >= 0 ? [title.slice(0, at), highlight!, title.slice(at + highlight!.length)] : [title, null, ""];
}

type Plan = {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

/** Stages of a process and how many make it through: flowing bands, or bars. */
function FunnelCard({
  variant = "bands",
  title,
  description,
  stages,
  linkLabel,
}: {
  variant?: "bands" | "bars" | "columns";
  title: string;
  description?: string;
  /** previous = the same stage last period, drawn as a dashed tick in "columns". */
  stages: { label: string; value: number; display?: string; previous?: number }[];
  linkLabel?: string;
}) {
  const first = stages[0]?.value || 1;
  const rate = (v: number) => `${Math.round((v / first) * 100)}%`;
  if (variant === "columns") return <FunnelColumns title={title} description={description} stages={stages} linkLabel={linkLabel} />;
  return (
    <Card className="h-full">
      <BlockHeader title={title} description={description} linkLabel={linkLabel} />
      <CardContent className="flex flex-col gap-4">
        {variant === "bands" ? (
          <>
            <svg viewBox={`0 0 ${stages.length * 100} 100`} preserveAspectRatio="none" className="h-36 w-full" aria-hidden="true">
              {stages.map((s, i) => {
                const h = (s.value / first) * 90;
                const next = stages[i + 1] ? (stages[i + 1].value / first) * 90 : h * 0.6;
                const x = i * 100;
                return (
                  <g key={s.label}>
                    {[1, 0.66, 0.4].map((k, j) => (
                      <polygon
                        key={j}
                        points={`${x},${50 - (h * k) / 2} ${x + 100},${50 - (next * k) / 2} ${x + 100},${50 + (next * k) / 2} ${x},${50 + (h * k) / 2}`}
                        style={{ fill: `color-mix(in oklch, var(--chart-1) ${[22, 38, 60][j]}%, transparent)` }}
                      />
                    ))}
                    {i > 0 && <line x1={x} y1="2" x2={x} y2="98" strokeWidth="1" vectorEffect="non-scaling-stroke" className="stroke-card" />}
                  </g>
                );
              })}
            </svg>
            <div className="grid text-xs" style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }}>
              {stages.map((s) => (
                <div key={s.label} className="min-w-0 px-1">
                  <p className="truncate text-muted-foreground">{s.label}</p>
                  <p className="font-heading text-lg font-semibold text-foreground tabular-nums">{s.display ?? s.value.toLocaleString("en")}</p>
                  <p className="text-muted-foreground tabular-nums">{rate(s.value)}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <ul className="flex flex-col gap-3">
            {stages.map((s, i) => (
              <li key={s.label} className="flex flex-col gap-1.5">
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="truncate text-foreground">{s.label}</span>
                  <span className="shrink-0 text-muted-foreground tabular-nums">
                    <span className="font-medium text-foreground">{s.display ?? s.value.toLocaleString("en")}</span> · {rate(s.value)}
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full"
                    style={{ width: rate(s.value), background: `color-mix(in oklch, var(--chart-1) ${100 - i * 15}%, var(--card))` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * A funnel as tall columns, one per stage: the part that made it through
 * filled from the bottom, what dropped off above it hatched, last period's
 * level as a dashed tick, and each step's conversion between the columns.
 * Below a comfortable width the columns become the bars layout's rows.
 */
function FunnelColumns({
  title,
  description,
  stages,
  linkLabel,
}: {
  title: string;
  description?: string;
  stages: { label: string; value: number; display?: string; previous?: number }[];
  linkLabel?: string;
}) {
  const first = stages[0]?.value || 1;
  const firstBefore = stages[0]?.previous || 0;
  const share = (v: number, of = first) => Math.max(0, Math.min(1, v / (of || 1)));
  const pct = (v: number, digits = 1) => `${(v * 100).toFixed(digits).replace(/\.0$/, "")}%`;
  const last = stages[stages.length - 1];
  const overall = last ? share(last.value) : 0;
  const before = last?.previous && firstBefore ? share(last.previous, firstBefore) : null;
  const hatch = "repeating-linear-gradient(-45deg, color-mix(in oklch, var(--foreground) 14%, transparent) 0 1px, transparent 1px 6px)";
  return (
    <Card className="@container/funnel h-full">
      <BlockHeader title={title} description={description} linkLabel={linkLabel} />
      <CardContent className="flex flex-col gap-4">
        <ol className="hidden gap-3 @xl/funnel:grid" style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }}>
          {stages.map((s, i) => {
            const h = share(s.value);
            const prev = s.previous && firstBefore ? share(s.previous, firstBefore) : null;
            const step = i > 0 ? share(s.value, stages[i - 1].value) : null;
            return (
              <li key={s.label} className="flex min-w-0 flex-col gap-3">
                <div className="min-w-0">
                  <p className="truncate text-xs text-muted-foreground">
                    {i + 1}. {s.label}
                  </p>
                  <p className="font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground tabular-nums">{s.display ?? s.value.toLocaleString("en")}</p>
                  <p className="text-xs text-muted-foreground tabular-nums">{i === 0 ? "100% of start" : `${pct(h)} of start`}</p>
                </div>
                <div aria-hidden="true" className="relative h-44 overflow-visible rounded-[var(--radius-md,0.5rem)] bg-muted/60" style={{ backgroundImage: hatch }}>
                  <div className="absolute inset-x-0 bottom-0 rounded-[inherit]" style={{ height: `${Math.max(2, h * 100)}%`, background: "linear-gradient(to top, var(--chart-1), color-mix(in oklch, var(--chart-1) 70%, var(--card)))" }} />
                  {prev !== null && <span className="absolute inset-x-1.5 border-t-2 border-dashed border-foreground/45" style={{ bottom: `${prev * 100}%` }} />}
                  {step !== null && (
                    <span className="absolute top-1/2 -left-1.5 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-card px-1.5 py-0.5 font-mono text-[10px] whitespace-nowrap text-foreground tabular-nums">
                      {pct(step)}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
        {/* Narrow: one row per stage, as in the bars layout. */}
        <ul className="flex flex-col gap-3 @xl/funnel:hidden">
          {stages.map((s) => (
            <li key={s.label} className="flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="truncate text-foreground">{s.label}</span>
                <span className="shrink-0 text-muted-foreground tabular-nums">
                  <span className="font-medium text-foreground">{s.display ?? s.value.toLocaleString("en")}</span> · {pct(share(s.value), 0)}
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-muted" style={{ backgroundImage: hatch }}>
                <div className="h-full rounded-full" style={{ width: `${share(s.value) * 100}%`, background: "var(--chart-1)" }} />
              </div>
            </li>
          ))}
        </ul>
        <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-border pt-3 text-xs text-muted-foreground">
          <span>
            Overall <span className="font-medium text-foreground tabular-nums">{pct(overall, 2)}</span>
          </span>
          {before !== null && (
            <span>
              Last period <span className="tabular-nums">{pct(before, 2)}</span>
            </span>
          )}
          {stages.some((s) => s.previous) && <span className="ml-auto">Dashed: last period</span>}
        </p>
      </CardContent>
    </Card>
  );
}

/** A month at a glance: marked days, and optionally what's on. */
function CalendarCardBase({
  variant = "month",
  title,
  month,
  startDay = 0,
  days = 30,
  today,
  marked = [],
  events = [],
  linkLabel,
}: {
  variant?: "month" | "events";
  title: string;
  /** e.g. "April 2026". */
  month: string;
  /** Weekday of the 1st, 0 = Monday. */
  startDay?: number;
  days?: number;
  today?: number;
  /** Days with something on. */
  marked?: number[];
  events?: { day: number; title: string; time?: string }[];
  linkLabel?: string;
}) {
  const cells = [...Array.from({ length: startDay }, () => 0), ...Array.from({ length: days }, (_, i) => i + 1)];
  return (
    <Card className="h-full">
      <BlockHeader title={title} linkLabel={linkLabel} />
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">{month}</p>
          <span className="flex gap-1 text-muted-foreground">
            <ChevronRight className="size-4 rotate-180" aria-hidden="true" />
            <ChevronRight className="size-4" aria-hidden="true" />
          </span>
        </div>
        <ol className="grid grid-cols-7 gap-y-1 text-center text-xs">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
            <li key={d} className="pb-1 text-muted-foreground">
              {d}
            </li>
          ))}
          {cells.map((d, i) => (
            <li key={i} className="grid place-items-center">
              {d > 0 && (
                <span
                  aria-current={d === today ? "date" : undefined}
                  className={cn(
                    "grid size-7 place-items-center rounded-full tabular-nums",
                    d === today
                      ? "bg-primary-strong font-medium text-primary-foreground"
                      : marked.includes(d)
                        ? "font-medium text-foreground ring-1 ring-primary"
                        : "text-foreground/80",
                  )}
                >
                  {d}
                  {d === today ? <span className="sr-only">, today</span> : marked.includes(d) ? <span className="sr-only">, booked</span> : null}
                </span>
              )}
            </li>
          ))}
        </ol>
        {variant === "events" && events.length > 0 && (
          <ul className="flex flex-col gap-2 border-t border-border pt-3">
            {events.map((e, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <span className="grid size-8 shrink-0 place-items-center rounded-md bg-muted font-medium text-foreground tabular-nums">{e.day}</span>
                <span className="min-w-0 flex-1 truncate text-foreground">{e.title}</span>
                {e.time && <span className="shrink-0 text-xs text-muted-foreground">{e.time}</span>}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

const minutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
};

/** Events that overlap (in time, or on screen) share their cluster's width: each gets a lane and the lane count, by input index. */
function lanesOf(events: { start: number; end: number }[]): { lane: number; lanes: number }[] {
  const placed = events.map((e, i) => ({ ...e, i })).sort((a, b) => a.start - b.start);
  const out: { lane: number; lanes: number }[] = [];
  for (let c = 0; c < placed.length; ) {
    const cluster = [placed[c]];
    let reach = placed[c].end;
    while (++c < placed.length && placed[c].start < reach) {
      cluster.push(placed[c]);
      reach = Math.max(reach, placed[c].end);
    }
    const ends: number[] = [];
    const inCluster = cluster.map((p) => {
      const free = ends.findIndex((end) => end <= p.start);
      const lane = free === -1 ? ends.length : free;
      ends[lane] = p.end;
      return { i: p.i, lane };
    });
    for (const { i, lane } of inCluster) out[i] = { lane, lanes: ends.length };
  }
  return out;
}

/**
 * A day hour by hour, with each event as a block across its time; or a week
 * on a time grid, seven columns with today marked, a line at the time now,
 * events coloured by kind and a legend.
 */
function ScheduleCard({
  variant = "day",
  title,
  date,
  from = 8,
  to = 14,
  events,
  days,
  today,
  now,
  kinds = [],
  linkLabel,
}: {
  variant?: "day" | "week";
  title: string;
  date?: string;
  /** First and last hour shown. */
  from?: number;
  to?: number;
  /** day = the column (0-6) in a week; place = where ("Quarry"); kind = index into kinds, for its colour. */
  events: { title: string; start: string; end: string; day?: number; place?: string; kind?: number }[];
  /** Week: the seven column labels ("Mon 26"). */
  days?: string[];
  /** Week: today's column (0-6). */
  today?: number;
  /** Week: the time now ("09:15"), as a line across today. */
  now?: string;
  /** Week: the event kinds, in colour order, for the legend. */
  kinds?: string[];
  linkLabel?: string;
}) {
  // The grid runs from the first event's hour at the latest to the last one's end at the earliest.
  const first = Math.min(from, ...events.map((e) => Math.floor(minutes(e.start) / 60)));
  const last = Math.max(to, ...events.map((e) => Math.ceil(minutes(e.end) / 60)));
  const hours = Array.from({ length: Math.max(1, last - first) + 1 }, (_, i) => first + i);
  const span = (last - first) * 60 || 60;
  const ROW = variant === "week" ? 44 : 48;
  const MIN_HEIGHT = variant === "week" ? 22 : 36;
  const height = (hours.length - 1) * ROW;
  const y = (m: number) => ((m - first * 60) / span) * height;
  const placed = events.map((e, i) => ({ e, i, start: minutes(e.start), end: Math.max(minutes(e.end), minutes(e.start) + (MIN_HEIGHT * 60) / ROW) }));
  const color = (e: (typeof events)[number], i: number) => ITEM_COLORS[(variant === "week" ? (e.kind ?? 0) : i) % 5];

  if (variant === "week") {
    const cols = (days?.length ? days : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]).slice(0, 7);
    const byDay = cols.map((_, d) => placed.filter((p) => Math.min(6, Math.max(0, p.e.day ?? 0)) === d));
    const laneOf = new Map<number, { lane: number; lanes: number }>();
    for (const list of byDay) lanesOf(list).forEach((l, k) => laneOf.set(list[k].i, l));
    const nowAt = now ? minutes(now) : null;
    return (
      <Card className="h-full">
        <BlockHeader title={title} description={date} linkLabel={linkLabel} />
        <CardContent className="overflow-x-auto">
          <div className="min-w-[640px]">
            <div className="grid" style={{ gridTemplateColumns: "3rem repeat(7, minmax(0, 1fr))" }}>
              <span />
              {cols.map((c, d) => {
                const [name, ...rest] = c.split(" ");
                const num = rest.join(" ");
                return (
                  <div key={d} className="flex flex-col items-center gap-1 pb-2">
                    <span className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">{name}</span>
                    {num && (
                      <span aria-current={d === today ? "date" : undefined} className={cn("grid h-7 min-w-7 place-items-center rounded-full px-1 text-sm tabular-nums", d === today ? "bg-primary-strong font-medium text-primary-foreground" : "text-foreground")}>
                        {num}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="relative" style={{ height: height + 8 }}>
              {hours.map((h, i) => (
                <div key={h} aria-hidden="true" className="absolute inset-x-0 flex items-center gap-2" style={{ top: i * ROW }}>
                  <span className="w-10 shrink-0 font-mono text-[10px] text-muted-foreground tabular-nums">{String(h).padStart(2, "0")}:00</span>
                  <span className="h-px flex-1 bg-border" />
                </div>
              ))}
              <div className="absolute inset-y-0 right-0 left-12 grid" style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}>
                {cols.map((_, d) => (
                  <div key={d} className={cn("relative border-l border-border", d === today && "bg-primary/[0.04]")}>
                    {byDay[d].map((p) => {
                      const tone = color(p.e, p.i);
                      const { lane, lanes: count } = laneOf.get(p.i) ?? { lane: 0, lanes: 1 };
                      const h = Math.max(MIN_HEIGHT, y(p.end) - y(p.start) - 3);
                      return (
                        <div
                          key={p.i}
                          title={`${p.e.title} · ${p.e.start}`}
                          className="@container/event absolute overflow-hidden rounded-md border-l-2 px-1.5 py-1 text-[11px] leading-tight"
                          style={{
                            top: y(p.start) + 2,
                            height: h,
                            left: `calc(${(lane / count) * 100}% + 2px)`,
                            width: `calc(${100 / count}% - 4px)`,
                            background: `color-mix(in oklch, ${tone} 16%, var(--card))`,
                            borderColor: tone,
                          }}
                        >
                          {/* Too narrow for words (overlaps split the day): the colour alone, its name in the tooltip and for screen readers. */}
                          <span className="sr-only @min-[2.5rem]/event:not-sr-only @min-[2.5rem]/event:block @min-[2.5rem]/event:truncate @min-[2.5rem]/event:font-medium @min-[2.5rem]/event:text-foreground">{p.e.title}</span>
                          {h >= 34 && (
                            <span className="hidden truncate text-muted-foreground tabular-nums @min-[2.5rem]/event:block">
                              {p.e.start}
                              {p.e.place ? ` · ${p.e.place}` : ""}
                            </span>
                          )}
                        </div>
                      );
                    })}
                    {d === today && nowAt !== null && nowAt >= first * 60 && nowAt <= last * 60 && (
                      <div aria-hidden="true" className="absolute inset-x-0 z-10 flex items-center" style={{ top: y(nowAt) }}>
                        <span className="-ml-1 size-2 rounded-full bg-destructive" />
                        <span className="h-px flex-1 bg-destructive" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {kinds.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                {kinds.map((k, i) => (
                  <li key={k} className="flex items-center gap-1.5">
                    <span className="size-2 rounded-[3px]" style={{ background: ITEM_COLORS[i % 5] }} />
                    {k}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  const lanes = lanesOf(placed);
  return (
    <Card className="h-full">
      <BlockHeader title={title} description={date} linkLabel={linkLabel} />
      <CardContent>
        <div className="relative" style={{ height: height + 12 }}>
          {hours.map((h, i) => (
            <div key={h} aria-hidden="true" className="absolute inset-x-0 flex items-center gap-3" style={{ top: i * ROW }}>
              <span className="w-10 shrink-0 font-mono text-[11px] text-muted-foreground tabular-nums">{String(h).padStart(2, "0")}:00</span>
              <span className="h-px flex-1 bg-border" />
            </div>
          ))}
          {events.map((e, i) => {
            const top = y(minutes(e.start)) + 6;
            const h = Math.max(MIN_HEIGHT, y(minutes(e.end)) - y(minutes(e.start)));
            const tone = color(e, i);
            const { lane, lanes: count } = lanes[i];
            return (
              <div
                key={i}
                title={`${e.title} · ${e.start} – ${e.end}`}
                className="@container/event absolute flex flex-col justify-center overflow-hidden rounded-md border px-2.5 text-[11px] leading-tight"
                style={{
                  top,
                  height: h,
                  left: `calc(3.25rem + (100% - 3.25rem) * ${lane / count})`,
                  width: `calc((100% - 3.25rem) / ${count} - 4px)`,
                  background: `color-mix(in oklch, ${tone} 18%, var(--card))`,
                  borderColor: `color-mix(in oklch, ${tone} 45%, transparent)`,
                }}
              >
                <span className="sr-only @min-[2.5rem]/event:not-sr-only @min-[2.5rem]/event:truncate @min-[2.5rem]/event:font-medium @min-[2.5rem]/event:text-foreground">{e.title}</span>
                <span className="hidden truncate text-muted-foreground tabular-nums @min-[2.5rem]/event:block">
                  {e.start} – {e.end}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Items as bars across periods: deals from created to due, projects by
 * week, a roadmap. Rows group under headings, a line marks today, and the
 * bars take their kind's colour. Each row opens what "item" is wired to.
 */
function TimelineBlock({
  variant = "bars",
  title,
  description,
  columns,
  today,
  items,
  kinds = [],
  linkLabel,
}: {
  variant?: "bars" | "compact" | "runway";
  title?: string;
  description?: string;
  /** The periods across the top ("Sep 7", "14", "21"), 6-14. */
  columns: string[];
  /** Where today falls, in columns (8.4 = a little into the ninth). */
  today?: number;
  /** start and end in columns (1.5 = halfway through the second); label = on the bar ("Rebrand · $12k"); kind = index into kinds. */
  items: { name: string; meta?: string; start: number; end: number; label?: string; group?: string; kind?: number }[];
  /** The item kinds, in colour order, for the legend. */
  kinds?: string[];
  linkLabel?: string;
}) {
  const act = useSlotAction("item");
  const n = Math.max(1, columns.length);
  const compact = variant === "compact";
  if (variant === "runway") return <RunwayTimeline title={title} description={description} columns={columns} today={today} items={items} kinds={kinds} linkLabel={linkLabel} />;
  const at = (v: number) => `${(Math.max(0, Math.min(n, v)) / n) * 100}%`;
  const lines: React.CSSProperties = { backgroundImage: "linear-gradient(to right, var(--border) 1px, transparent 1px)", backgroundSize: `${100 / n}% 100%` };
  const todayLine = today !== undefined && today >= 0 && today <= n ? <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 z-10 w-px bg-primary-mark" style={{ left: at(today) }} /> : null;
  return (
    <Card className="h-full">
      {(title || description || linkLabel) && <BlockHeader title={title ?? "Timeline"} description={description} linkLabel={linkLabel} />}
      {kinds.length > 0 && (
        <ul className="flex flex-wrap gap-x-4 gap-y-1 px-5 pb-3 text-[11px] text-muted-foreground">
          {kinds.map((k, i) => (
            <li key={k} className="flex items-center gap-1.5">
              <span className="size-2 rounded-[3px]" style={{ background: ITEM_COLORS[i % 5] }} />
              {k}
            </li>
          ))}
        </ul>
      )}
      <CardContent className="overflow-x-auto p-0">
        <div className="grid min-w-[720px]" style={{ gridTemplateColumns: `${compact ? "180px" : "220px"} minmax(0, 1fr)` }}>
          <div className="border-y border-border px-5 py-2 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">Item</div>
          <div className="relative grid border-y border-border" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`, ...lines }}>
            {columns.map((c, i) => (
              <span key={i} className="truncate px-1.5 py-2 font-mono text-[10px] text-muted-foreground tabular-nums">
                {c}
              </span>
            ))}
            {today !== undefined && today >= 0 && today <= n && (
              <span className="pointer-events-none absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-strong px-1.5 py-0.5 font-mono text-[10px] leading-none text-primary-foreground" style={{ left: at(today) }}>
                Today
              </span>
            )}
          </div>
          {items.map((it, i) => {
            const tone = ITEM_COLORS[(it.kind ?? 0) % 5];
            const row = (
              <React.Fragment key={i}>
                <div
                  data-link="item"
                  role={act ? "button" : undefined}
                  tabIndex={act ? 0 : undefined}
                  onClick={act ? (e) => act(e.currentTarget, { name: it.name }) : undefined}
                  onKeyDown={act ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); act(e.currentTarget, { name: it.name }); } } : undefined}
                  className={cn("flex min-w-0 flex-col justify-center border-b border-border px-5", compact ? "h-9" : "h-12", act && "cursor-pointer transition-colors hover:bg-muted/40")}
                >
                  <span className="truncate text-[13px] font-medium text-foreground">{it.name}</span>
                  {!compact && it.meta && <span className="truncate text-[11px] text-muted-foreground">{it.meta}</span>}
                </div>
                <div className={cn("relative border-b border-border", compact ? "h-9" : "h-12")} style={lines}>
                  {todayLine}
                  <div
                    className={cn("absolute top-1/2 flex -translate-y-1/2 items-center overflow-hidden rounded-md border-l-2 px-2 text-[11px] whitespace-nowrap", compact ? "h-6" : "h-7")}
                    style={{ left: at(it.start), width: `${(Math.max(0.2, Math.min(n, it.end) - Math.max(0, it.start)) / n) * 100}%`, background: `color-mix(in oklch, ${tone} 16%, var(--card))`, borderColor: tone }}
                  >
                    <span className="truncate font-medium text-foreground">{it.label ?? it.name}</span>
                  </div>
                </div>
              </React.Fragment>
            );
            return startsGroup(items, i) ? (
              <React.Fragment key={`g${i}`}>
                <div className="col-span-2 bg-muted/50 px-5 py-1.5">
                  <GroupHeading label={it.group!} count={groupSize(items, i)} />
                </div>
                {row}
              </React.Fragment>
            ) : (
              row
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * A runway: each item a thin track from its start to its date, done up to
 * today in its status colour, the rest still to run; a ring where it stands
 * today, a dot on its date and the note above it ("Appraisal late"), and
 * its status in words at the end of the row (never colour alone).
 */
function RunwayTimeline({
  title,
  description,
  columns,
  today,
  items,
  kinds = [],
  linkLabel,
}: {
  title?: string;
  description?: string;
  columns: string[];
  today?: number;
  items: { name: string; meta?: string; start: number; end: number; label?: string; group?: string; kind?: number }[];
  kinds?: string[];
  linkLabel?: string;
}) {
  const act = useSlotAction("item");
  const n = Math.max(1, columns.length);
  const clamp = (v: number) => Math.max(0, Math.min(n, v));
  const at = (v: number) => `${(clamp(v) / n) * 100}%`;
  const hasToday = today !== undefined && today >= 0 && today <= n;
  const grid = { gridTemplateColumns: `200px minmax(0, 1fr)${kinds.length ? " 112px" : ""}` };
  return (
    <Card className="h-full">
      {(title || description || linkLabel) && <BlockHeader title={title ?? "Runway"} description={description} linkLabel={linkLabel} />}
      <CardContent className="overflow-x-auto p-0">
        <div className="grid min-w-[720px]" style={grid}>
          <div className="border-b border-border px-5 py-2" />
          <div className="relative grid border-b border-border" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
            {columns.map((c, i) => (
              <span key={i} className="truncate px-1 py-2 text-center font-mono text-[10px] text-muted-foreground tabular-nums">
                {c}
              </span>
            ))}
            {hasToday && (
              <span className="pointer-events-none absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground px-1.5 py-0.5 font-mono text-[10px] leading-none text-background" style={{ left: at(today!) }}>
                Today
              </span>
            )}
          </div>
          {kinds.length > 0 && <div className="border-b border-border" />}
          {items.map((it, i) => {
            const tone = ITEM_COLORS[(it.kind ?? 0) % 5];
            const start = clamp(it.start);
            const end = clamp(it.end);
            const now = hasToday ? Math.max(start, Math.min(end, today!)) : start;
            // The note sits above the date, toward the middle so it never runs off the row.
            const noteRight = end > n * 0.6;
            return (
              <React.Fragment key={i}>
                <div
                  data-link="item"
                  role={act ? "button" : undefined}
                  tabIndex={act ? 0 : undefined}
                  onClick={act ? (e) => act(e.currentTarget, { name: it.name }) : undefined}
                  onKeyDown={act ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); act(e.currentTarget, { name: it.name }); } } : undefined}
                  className={cn("flex h-16 min-w-0 flex-col justify-center border-b border-border px-5", act && "cursor-pointer transition-colors hover:bg-muted/40")}
                >
                  <span className="truncate text-[13px] font-medium text-foreground">{it.name}</span>
                  {it.meta && <span className="truncate text-[11px] text-muted-foreground">{it.meta}</span>}
                </div>
                <div className="relative h-16 border-b border-border" aria-hidden="true">
                  {hasToday && <span className="absolute inset-y-0 w-px bg-foreground/70" style={{ left: at(today!) }} />}
                  <span className="absolute top-1/2 h-px -translate-y-1/2 bg-foreground/25" style={{ left: at(start), width: `${((end - start) / n) * 100}%` }} />
                  <span className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full" style={{ left: at(start), width: `${((now - start) / n) * 100}%`, background: tone }} />
                  <span className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-card" style={{ left: at(start), borderColor: tone }} />
                  {hasToday && today! > start && today! < end && (
                    <span className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-foreground/60 bg-card" style={{ left: at(today!) }} />
                  )}
                  <span className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-card" style={{ left: at(end), background: tone }} />
                  {it.label && (
                    <span className={cn("absolute top-1.5 max-w-[45%] truncate text-[11px] text-muted-foreground", noteRight ? "-translate-x-full pr-1" : "pl-1")} style={{ left: at(end) }}>
                      {it.label}
                    </span>
                  )}
                </div>
                {kinds.length > 0 && (
                  <div className="flex h-16 items-center border-b border-border pr-5 pl-2">
                    {it.kind !== undefined && kinds[it.kind] && (
                      <span className="inline-flex max-w-full items-center gap-1.5 truncate rounded-full border border-border px-2 py-0.5 text-[11px] font-medium text-foreground">
                        <span className="size-1.5 shrink-0 rounded-full" style={{ background: tone }} />
                        <span className="truncate">{kinds[it.kind]}</span>
                      </span>
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

const FIELD_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  place: MapPin, from: Plane, to: MapPin, date: Calendar, people: Users, kind: Star, seat: Armchair, tag: Tag, time: Clock, search: Search,
};

/**
 * The controls above a list or grid: a bar of labelled fields with a search
 * button (a trip, a booking, a report's scope), or filter chips with counts
 * beside a search, a sort and a grid/list toggle (a catalogue, a library).
 */
function FilterBarBlock({
  variant = "fields",
  fields = [],
  chips = [],
  toggle,
  search,
  sort,
  views = [],
  action,
  note,
}: {
  variant?: "fields" | "chips";
  /** fields: each a label over its value, with an icon by name (from, to, place, date, people, kind, seat, tag, time). */
  fields?: { label: string; value: string; icon?: string }[];
  /** chips: the first is selected; count sits after the label; a colour dot before it when colored. */
  chips?: { label: string; count?: number; colored?: boolean }[];
  /** chips: an extra on/off chip with a count ("Low only", 3). */
  toggle?: { label: string; count?: number };
  /** The search placeholder. */
  search?: string;
  /** The sort shown ("Sort: Name"). */
  sort?: string;
  /** View names for a toggle ("Grid", "List"); the first is on. */
  views?: string[];
  /** fields: the button's label ("Search"). */
  action?: string;
  /** fields: a quiet note before the button ("8 routes"). */
  note?: string;
}) {
  const [chip, setChip] = React.useState(0);
  const [view, setView] = React.useState(0);
  const [on, setOn] = React.useState(false);
  if (variant === "chips") {
    return (
      <div className="flex flex-col gap-3">
        {chips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {chips.map((c, i) => (
              <button data-slot="chip" key={c.label} type="button" aria-pressed={i === chip} onClick={() => setChip(i)} className={cn(chipVariants({ variant: "outline", selected: i === chip }), "min-h-control gap-1.5")}>
                {c.colored && i !== chip && <span className="size-1.5 rounded-full" style={{ background: ITEM_COLORS[(i - 1 + 5) % 5] }} aria-hidden="true" />}
                {c.label}
                {c.count !== undefined && <span className={cn("font-mono text-[11px] tabular-nums", i === chip ? "opacity-80" : "text-muted-foreground")}>{c.count}</span>}
              </button>
            ))}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2">
          {toggle && (
            <button data-slot="chip" type="button" aria-pressed={on} onClick={() => setOn((v) => !v)} className={cn(chipVariants({ variant: "outline", selected: on }), "min-h-control gap-1.5")}>
              <span className="size-1.5 rounded-full bg-warning" aria-hidden="true" />
              {toggle.label}
              {toggle.count !== undefined && <span className="font-mono text-[11px] text-muted-foreground tabular-nums">{toggle.count}</span>}
            </button>
          )}
          <label className="relative ml-auto flex h-control min-w-0 flex-1 items-center sm:max-w-xs">
            <Search aria-hidden="true" className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
            <Input aria-label={search ?? "Search"} placeholder={search ?? "Search…"} className="rounded-full pl-9" />
          </label>
          {sort && <SortMenu initial={sort} />}
          {views.length > 1 && (
            <span role="group" aria-label="View" className="flex h-control items-center rounded-full border border-border bg-card p-0.5">
              {views.map((v, i) => {
                const Icon = i === 0 ? LayoutGrid : ListIcon;
                return (
                  <button key={v} type="button" aria-pressed={i === view} onClick={() => setView(i)} className={cn("flex h-full items-center gap-1.5 rounded-full px-3 text-xs transition-colors", i === view ? "bg-foreground font-medium text-background" : "text-muted-foreground hover:text-foreground")}>
                    <Icon className="size-3.5" aria-hidden="true" />
                    {v}
                  </button>
                );
              })}
            </span>
          )}
        </div>
      </div>
    );
  }
  return (
    // Its own pill, not a card, so a bare surface (where it belongs) keeps it.
    <div className="flex flex-wrap items-stretch gap-y-2 rounded-full border border-border bg-card px-2 py-2 shadow-sm">
      {fields.map((f, i) => (
        <FieldPill key={f.label} field={f} first={i === 0} />
      ))}
      <span className="flex shrink-0 items-center gap-3 pl-2">
        {note && <span className="text-xs text-muted-foreground">{note}</span>}
        <SlotButton slot="action" className="rounded-full">
          <Search />
          {action ?? "Search"}
        </SlotButton>
      </span>
    </div>
  );
}

/** "16:9" -> a small outline of that shape, for aspect-ratio options. */
function RatioIcon({ ratio }: { ratio: string }) {
  const m = /^(\d+):(\d+)$/.exec(ratio);
  if (!m) return null;
  const [w, h] = [Number(m[1]), Number(m[2])];
  const k = 14 / Math.max(w, h);
  return <span aria-hidden="true" className="inline-block rounded-[2px] border-[1.5px] border-current" style={{ width: Math.round(w * k), height: Math.round(h * k) }} />;
}

/** A row of exclusive choices (the kit's toggle group): one is on, arrow keys move between them. */
function SegmentedChoice({ label, options, value }: { label: string; options: string[]; value?: string }) {
  const [picked, setPicked] = React.useState(value && options.includes(value) ? value : options[0]);
  // Shapes only for aspect ratios, never for times ("07:00") that read the same.
  const ratios = /ratio|aspect|format|shape|size/i.test(label);
  // Never a cramped or cut-off label: a bar gives every option the same share, so it's a bar only while the
  // widest label (with room either side) fits a share; otherwise the same choice wraps as chips. Measured on
  // the labels themselves, so a new font or size (a theme change) re-decides it as well as a new width.
  const box = React.useRef<HTMLDivElement>(null);
  const [bar, setBar] = React.useState(true);
  React.useEffect(() => {
    const el = box.current;
    if (!el) return;
    const decide = () => {
      const labels = [...el.querySelectorAll<HTMLElement>("[data-seg-label]")];
      if (!labels.length || !el.clientWidth) return;
      const widest = Math.max(...labels.map((l) => l.getBoundingClientRect().width));
      setBar(widest + 28 <= el.clientWidth / options.length);
    };
    const ro = new ResizeObserver(decide);
    ro.observe(el);
    el.querySelectorAll("[data-seg-label]").forEach((l) => ro.observe(l));
    return () => ro.disconnect();
  }, [options.length, bar]);
  const text = (o: string) => (
    <span data-seg-label className="inline-flex items-center gap-1.5 whitespace-nowrap">
      {ratios && <RatioIcon ratio={o} />}
      {o}
    </span>
  );
  return (
    <div ref={box} className="w-full min-w-0">
      {bar ? (
        <ToggleGroup type="single" variant="outline" size="lg" value={picked} onValueChange={(v) => v && setPicked(v)} aria-label={label} className="w-full">
          {options.map((o) => (
            <ToggleGroupItem key={o} value={o} className="min-w-0 flex-1 px-1.5 text-xs data-[state=on]:bg-primary/12 data-[state=on]:text-foreground">
              {text(o)}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      ) : (
        // A radio group as the keyboard expects: one Tab stop (the picked chip), the arrows move and pick.
        <div
          role="radiogroup"
          aria-label={label}
          className="flex flex-wrap gap-2"
          onKeyDown={(e) => {
            const at = options.indexOf(picked);
            const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
            if (!step) return;
            e.preventDefault();
            const next = options[(at + step + options.length) % options.length];
            setPicked(next);
            (e.currentTarget.querySelector(`[data-option="${CSS.escape(next)}"]`) as HTMLElement | null)?.focus();
          }}
        >
          {options.map((o) => (
            <button
              data-slot="chip"
              key={o}
              type="button"
              role="radio"
              data-option={o}
              aria-checked={picked === o}
              tabIndex={picked === o || (!options.includes(picked) && o === options[0]) ? 0 : -1}
              onClick={() => setPicked(o)}
              className={cn(chipVariants({ variant: "outline", selected: picked === o }), "min-h-control px-3 text-xs")}
            >
              {text(o)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** A composed card's chip: picked and unpicked on click. */
function ChipToggle({ text, initial }: { text: string; initial: boolean }) {
  const [on, setOn] = React.useState(initial);
  return (
    <button data-slot="chip" type="button" aria-pressed={on} onClick={() => setOn((v) => !v)} className={cn(chipVariants({ variant: "outline", selected: on }), "min-h-8")}>
      {text}
    </button>
  );
}

/** Colour swatches: one picked, ringed. */
function Swatches({ label, colors, initial }: { label?: string; colors: string[]; initial: number }) {
  const [selected, setSelected] = React.useState(initial);
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {colors.map((c, i) => (
        <button
          key={c}
          type="button"
          aria-pressed={i === selected}
          aria-label={c}
          onClick={() => setSelected(i)}
          className={cn("size-8 rounded-full ring-offset-2 ring-offset-card", i === selected ? "ring-2 ring-foreground" : "ring-1 ring-border")}
          style={{ background: c }}
        />
      ))}
    </div>
  );
}

/** A filter bar's sort: its options in a menu, the chosen one named on the button. */
function SortMenu({ initial }: { initial: string }) {
  const base = initial.replace(/^sort( by)?:?\s*/i, "");
  const options = [...new Set([base, "Newest", "Oldest", "Most popular", "Price: low to high", "Price: high to low", "A to Z"])].slice(0, 6);
  const [sortBy, setSortBy] = React.useState(base);
  const prefix = /^sort/i.test(initial) ? "Sort: " : "";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full px-3">
          <SlidersHorizontal />
          {prefix}
          {sortBy}
          <ChevronDown className="text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48">
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        {options.map((o) => (
          <DropdownMenuItem key={o} onSelect={() => setSortBy(o)}>
            <Check className={cn("size-4", sortBy !== o && "invisible")} />
            {o}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** One field of a search pill (Where, When, Guests): opens to change its value. */
function FieldPill({ field: f, first }: { field: { label: string; value: string; icon?: string }; first: boolean }) {
  const Icon = FIELD_ICONS[f.icon ?? ""] ?? Calendar;
  const [value, setValue] = React.useState(f.value);
  const [draft, setDraft] = React.useState(f.value);
  const id = React.useId();
  return (
    <Popover onOpenChange={(o) => o && setDraft(value)}>
      <PopoverTrigger asChild>
        <button type="button" className={cn("flex min-w-0 flex-1 basis-40 items-center gap-3 rounded-full px-3 py-1.5 text-left transition-colors hover:bg-muted/60", !first && "border-l border-border")}>
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-muted text-primary-ink">
            <Icon className="size-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] text-muted-foreground">{f.label}</span>
            <span className="block truncate text-sm font-medium text-foreground">{value}</span>
          </span>
          <ChevronDown className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72">
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (draft.trim()) setValue(draft.trim());
          }}
        >
          <Field label={f.label} htmlFor={id}>
            <Input id={id} value={draft} onChange={(e) => setDraft(e.target.value)} />
          </Field>
          <Button type="submit" size="sm" className="self-end">
            Apply
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}

/** "2026-11-14", "Nov 14, 2026" or "14 November 2026" as a date; undefined when it isn't one. */
function parseDay(v?: string) {
  if (!v) return undefined;
  const t = Date.parse(/^\d{4}-\d{2}-\d{2}$/.test(v) ? `${v}T12:00:00` : v);
  return Number.isNaN(t) ? undefined : new Date(t);
}

/** A date with the kit's date picker (a calendar in a popover), starting on `value`. */
function DateField({ label, value, hint }: { label: string; value?: string; hint?: string }) {
  const id = React.useId();
  const [day, setDay] = React.useState(() => parseDay(value));
  return (
    <Field label={label} htmlFor={id} helper={hint}>
      <DatePicker id={id} value={day} onChange={setDay} placeholder={`Pick ${label.toLowerCase()}`} className="w-full" />
    </Field>
  );
}

/** A one-time code (sign-in, two-factor) with the kit's OTP input: one box per digit. */
function CodeField({ label, length = 6, hint }: { label: string; length?: number; hint?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <p className={fieldLabel}>{label}</p>
      <OTPInput length={length} aria-label={label} />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

const fieldLabel = "text-sm font-medium text-foreground";

/** A labelled choice from a list: the kit's select, its label tied to the trigger. */
function SelectField({ label, options, value }: { label: string; options: string[]; value?: string }) {
  const id = React.useId();
  return (
    <Field label={label} htmlFor={id}>
      <Select defaultValue={value && options.includes(value) ? value : options[0]}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}

/** One choice from a few, shown at once: the kit's radio group, each option with its label. */
function RadioField({ label, options, value }: { label: string; options: string[]; value?: string }) {
  const id = React.useId();
  return (
    <div role="group" aria-labelledby={`${id}-label`} className="flex flex-col gap-2">
      <p id={`${id}-label`} className={fieldLabel}>
        {label}
      </p>
      <RadioGroup defaultValue={value && options.includes(value) ? value : options[0]} aria-labelledby={`${id}-label`}>
        {options.map((o, i) => (
          <label key={o} htmlFor={`${id}-${i}`} className="flex items-center gap-2.5 text-sm text-foreground">
            <RadioGroupItem id={`${id}-${i}`} value={o} />
            {o}
          </label>
        ))}
      </RadioGroup>
    </div>
  );
}

/** A searchable choice from many: the kit's combobox. */
function ComboField({ label, options, value }: { label: string; options: string[]; value?: string }) {
  const id = React.useId();
  return (
    <Field label={label} htmlFor={id}>
      <Combobox id={id} options={options.map((o) => ({ value: o, label: o }))} value={value && options.includes(value) ? value : undefined} placeholder={`Choose ${label.toLowerCase()}`} className="w-full" />
    </Field>
  );
}

/** A text field, with a unit or prefix inside it ("€", "/month") through the kit's input group. */
const FIELD_SIZE = { sm: "h-control-sm text-xs", md: "", lg: "h-control-lg text-base" } as const;

/** Whether a password meets one rule, read from the rule's words ("12 characters", "a number", "a symbol"). */
function meetsRule(rule: string, v: string): boolean {
  const length = /(\d+)\+?\s*(?:characters|chars|letters)/i.exec(rule);
  if (length) return v.length >= Number(length[1]);
  if (/number|digit/i.test(rule)) return /\d/.test(v);
  if (/symbol|special|punctuation/i.test(rule)) return /[^A-Za-z0-9\s]/.test(v);
  if (/upper/i.test(rule)) return /[A-Z]/.test(v);
  if (/lower/i.test(rule)) return /[a-z]/.test(v);
  if (/letter/i.test(rule)) return /[A-Za-z]/.test(v);
  return v.length >= 8;
}

const STRENGTH = [
  { word: "Too weak", bar: "bg-destructive" },
  { word: "Weak", bar: "bg-destructive" },
  { word: "Fair", bar: "bg-warning" },
  { word: "Good", bar: "bg-diff-add" },
  { word: "Strong", bar: "bg-diff-add" },
] as const;

/** A password field: a button to show what's typed, and for a new password its rules and strength as you type. */
function PasswordInput({ shared, sizing, rules }: { shared: { id: string; defaultValue?: string; placeholder?: string; disabled?: boolean; required?: boolean; "aria-invalid"?: boolean }; sizing: string; rules?: string[] }) {
  const { defaultValue, ...rest } = shared;
  const [value, setValue] = React.useState(defaultValue ?? "");
  const [shown, setShown] = React.useState(false);
  const rulesId = React.useId();
  const met = rules?.map((r) => meetsRule(r, value)) ?? [];
  const score = rules?.length ? Math.round((met.filter(Boolean).length / rules.length) * 4) : 0;
  return (
    <>
      <InputGroup>
        <InputGroupInput
          {...rest}
          type={shown ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete={rules?.length ? "new-password" : "current-password"}
          aria-describedby={rules?.length ? rulesId : undefined}
          className={sizing}
        />
        <InputGroupAddon align="inline-end">
          <button
            type="button"
            aria-label={shown ? "Hide password" : "Show password"}
            aria-pressed={shown}
            disabled={shared.disabled}
            onClick={() => setShown(!shown)}
            className="grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            {shown ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </InputGroupAddon>
      </InputGroup>
      {rules?.length ? (
        <div id={rulesId} className="mt-2 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="grid flex-1 grid-cols-4 gap-1" aria-hidden>
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={cn("h-1 rounded-full", value && i < score ? STRENGTH[score].bar : "bg-muted")} />
              ))}
            </div>
            <span className="w-16 text-right text-xs text-muted-foreground" aria-live="polite">
              {value ? STRENGTH[score].word : ""}
            </span>
          </div>
          <ul className="flex flex-col gap-1 text-xs">
            {rules.map((r, i) => (
              <li key={r} className={cn("flex items-center gap-1.5", met[i] ? "text-foreground" : "text-muted-foreground")}>
                {met[i] ? <Check aria-hidden className="size-3.5 text-diff-add" /> : <Circle aria-hidden className="size-3.5" />}
                {r}
                <span className="sr-only">{met[i] ? "(met)" : "(not yet)"}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}

/** A chip in a multi-select or tag field, with a button to take it out. */
function FieldChip({ text, onRemove }: { text: string; onRemove: () => void }) {
  return (
    <span className="inline-flex max-w-full items-center gap-1 rounded-md bg-muted py-0.5 pr-0.5 pl-2 text-xs font-medium text-foreground">
      <span className="truncate">{text}</span>
      <button type="button" aria-label={`Remove ${text}`} onClick={onRemove} className="grid size-5 place-items-center rounded text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground">
        <X className="size-3" />
      </button>
    </span>
  );
}

const CHIP_BOX = "flex min-h-control w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-card px-2 py-1.5 text-sm shadow-xs transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/40";

/** Several choices from a list: the chosen ones as chips, the rest in a menu. */
function MultiSelectField({ label, options, values = [], hint }: { label: string; options: string[]; values?: string[]; hint?: string }) {
  const id = React.useId();
  const [picked, setPicked] = React.useState(() => values.filter((v) => options.includes(v)));
  const left = options.filter((o) => !picked.includes(o));
  return (
    <Field label={label} htmlFor={id} helper={hint}>
      <div className={CHIP_BOX}>
        {picked.map((v) => (
          <FieldChip key={v} text={v} onRemove={() => setPicked(picked.filter((x) => x !== v))} />
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button id={id} type="button" disabled={!left.length} className="inline-flex items-center gap-1 rounded px-1 text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 disabled:opacity-50">
              {picked.length ? "Add" : `Choose ${label.toLowerCase()}`}
              <ChevronDown className="size-3.5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {left.map((o) => (
              <DropdownMenuItem key={o} onSelect={() => setPicked([...picked, o])}>
                {o}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Field>
  );
}

/** Free tags: type one and press Enter (or a comma); Backspace on an empty field takes the last one off. */
function TagsField({ label, values = [], placeholder, hint }: { label: string; values?: string[]; placeholder?: string; hint?: string }) {
  const id = React.useId();
  const [tags, setTags] = React.useState(values);
  const [draft, setDraft] = React.useState("");
  const add = () => {
    const t = draft.trim().replace(/,$/, "");
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setDraft("");
  };
  return (
    <Field label={label} htmlFor={id} helper={hint ?? "Press Enter to add a tag."}>
      <div className={CHIP_BOX}>
        {tags.map((t) => (
          <FieldChip key={t} text={t} onRemove={() => setTags(tags.filter((x) => x !== t))} />
        ))}
        <input
          id={id}
          value={draft}
          placeholder={tags.length ? "" : (placeholder ?? "Add a tag")}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              add();
            } else if (e.key === "Backspace" && !draft && tags.length) setTags(tags.slice(0, -1));
          }}
          onBlur={add}
          className="min-w-24 flex-1 bg-transparent px-1 text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>
    </Field>
  );
}

/** A time of day, with the browser's own picker (and its clock button). */
function TimeField({ label, value, hint }: { label: string; value?: string; hint?: string }) {
  const id = React.useId();
  return (
    <Field label={label} htmlFor={id} helper={hint}>
      <Input id={id} type="time" defaultValue={value} step={300} />
    </Field>
  );
}

/**
 * A two-factor setup QR code: a stand-in drawn from the value, shaped like a
 * real one (three finder squares, a quiet zone). The real code comes from the
 * auth provider; the manual key beside it is the same secret as text.
 */
function QrCode({ value, label, secret }: { value: string; label?: string; secret?: string }) {
  const size = 25;
  let h = 2166136261;
  for (const ch of value) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const rand = () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) ^ Math.imul(h ^ (h >>> 13), 3266489909)) >>> 0) / 4294967296;
  const finder = (x: number, y: number) => [0, size - 7].some((fx) => [0, size - 7].some((fy) => !(fx > 0 && fy > 0) && x >= fx && x < fx + 7 && y >= fy && y < fy + 7));
  const cells: [number, number][] = [];
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const v = rand();
      if (!finder(x, y) && v > 0.52) cells.push([x, y]);
    }
  return (
    <figure className="flex flex-col items-center gap-3">
      <svg viewBox={`-2 -2 ${size + 4} ${size + 4}`} role="img" aria-label={label ?? "QR code to scan with an authenticator app"} className="size-40 rounded-md bg-white p-1 text-black">
        {cells.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill="currentColor" />
        ))}
        {[
          [0, 0],
          [size - 7, 0],
          [0, size - 7],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`} fill="none" stroke="currentColor">
            <rect x={x + 0.5} y={y + 0.5} width={6} height={6} strokeWidth={1} />
            <rect x={x + 2} y={y + 2} width={3} height={3} fill="currentColor" stroke="none" />
          </g>
        ))}
      </svg>
      {secret && (
        <figcaption className="text-center text-xs text-muted-foreground">
          Can&rsquo;t scan it? Enter this key:
          <span className="mt-1 block font-mono text-sm tracking-wider text-foreground">{secret}</span>
        </figcaption>
      )}
    </figure>
  );
}

/** A rich text field: a formatting toolbar over an editable area (bold, italic, a link, lists). */
function RichTextField({ label, value, placeholder }: { label?: string; value?: string; placeholder?: string }) {
  const id = React.useId();
  const area = React.useRef<HTMLDivElement>(null);
  const [empty, setEmpty] = React.useState(!value);
  const run = (cmd: string, arg?: string) => {
    area.current?.focus();
    // execCommand is old but still the simplest way to format a contenteditable in a demo; swap in your editor (Tiptap, Lexical) for production.
    document.execCommand(cmd, false, arg);
  };
  const tools: { label: string; icon: React.ComponentType<{ className?: string }>; cmd: string; arg?: () => string | undefined }[] = [
    { label: "Bold", icon: Bold, cmd: "bold" },
    { label: "Italic", icon: Italic, cmd: "italic" },
    { label: "Link", icon: Link2, cmd: "createLink", arg: () => window.prompt("Link to")?.trim() || undefined },
    { label: "Bulleted list", icon: ListIcon, cmd: "insertUnorderedList" },
    { label: "Numbered list", icon: ListOrdered, cmd: "insertOrderedList" },
  ];
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <span id={`${id}-label`} className="text-sm font-medium text-foreground">
          {label}
        </span>
      )}
      <div className="overflow-hidden rounded-md border border-input bg-card shadow-xs focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/40">
        <div role="toolbar" aria-label="Formatting" className="flex items-center gap-0.5 border-b border-border px-1.5 py-1">
          {tools.map((t) => (
            <button
              key={t.label}
              type="button"
              aria-label={t.label}
              title={t.label}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                const arg = t.arg?.();
                if (t.arg && !arg) return;
                run(t.cmd, arg);
              }}
              className="grid size-7 place-items-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <t.icon className="size-4" />
            </button>
          ))}
        </div>
        <div className="relative">
          {empty && placeholder && <span className="pointer-events-none absolute top-2.5 left-3 text-sm text-muted-foreground">{placeholder}</span>}
          <div
            ref={area}
            role="textbox"
            aria-multiline
            aria-labelledby={label ? `${id}-label` : undefined}
            aria-label={label ? undefined : (placeholder ?? "Text")}
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => setEmpty(!e.currentTarget.textContent?.trim())}
            className="min-h-28 px-3 py-2.5 text-sm leading-relaxed text-foreground outline-none [&_a]:text-primary-ink [&_a]:underline [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5"
          >
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}

/** A labelled text field: typed (email, password, a textarea…), with a prefix, suffix or leading icon, a hint or an error, in three sizes. */
function TextField({
  label,
  value,
  placeholder,
  prefix,
  suffix,
  hint,
  kind = "text",
  icon,
  error,
  required,
  disabled,
  rows,
  size = "md",
  rules,
  max,
}: {
  label: string;
  value?: string;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  hint?: string;
  kind?: "text" | "email" | "password" | "number" | "search" | "tel" | "url" | "textarea";
  /** A new password's rules ("At least 12 characters", "A number"), ticked off as they're met, with a strength bar. */
  rules?: string[];
  /** A character limit, counted under the field ("48/160"). */
  max?: number;
  icon?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  size?: keyof typeof FIELD_SIZE;
}) {
  const id = React.useId();
  const Icon = icon ? PART_ICON[icon] : undefined;
  const [length, setLength] = React.useState((value ?? "").length);
  // Its own message once it's been left empty or malformed, or a form was sent with it so.
  const [problem, setProblem] = React.useState<string | null>(null);
  const check = (el: HTMLInputElement | HTMLTextAreaElement) => {
    if (el.validity.valueMissing) return `Enter ${label.toLowerCase()}`;
    if (el.validity.typeMismatch) return kind === "email" ? "Enter an email address like name@example.com" : `Enter a valid ${label.toLowerCase()}`;
    if (el.validity.tooLong) return `Keep it to ${max} characters`;
    return null;
  };
  const events = {
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => setProblem(check(e.currentTarget)),
    onInvalid: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.preventDefault();
      setProblem(check(e.currentTarget));
    },
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setLength(e.currentTarget.value.length);
      if (problem) setProblem(check(e.currentTarget));
    },
  };
  const shown = error ?? problem ?? undefined;
  const shared = { id, defaultValue: value, placeholder, disabled, required, maxLength: max, autoComplete: autofillFor(label, kind), "aria-invalid": shown ? true : undefined, ...events };
  const sizing = FIELD_SIZE[size];
  const counter = max ? (
    <p className={cn("text-right text-xs tabular-nums", length >= max ? "text-destructive" : "text-muted-foreground")} aria-live="polite">
      {length}/{max}
    </p>
  ) : null;
  return (
    <Field label={label} htmlFor={id} required={required} helper={hint} error={shown}>
      {kind === "password" ? (
        <PasswordInput shared={shared} sizing={sizing} rules={rules} />
      ) : kind === "textarea" ? (
        <Textarea {...shared} rows={rows ?? 3} className={cn("min-h-0", sizing)} />
      ) : prefix || suffix || Icon ? (
        <InputGroup>
          {(prefix || Icon) && (
            <InputGroupAddon>{Icon ? <Icon className="size-4 text-muted-foreground" aria-hidden="true" /> : <InputGroupText>{prefix}</InputGroupText>}</InputGroupAddon>
          )}
          <InputGroupInput {...shared} type={kind} className={sizing} />
          {suffix && (
            <InputGroupAddon align="inline-end">
              <InputGroupText>{suffix}</InputGroupText>
            </InputGroupAddon>
          )}
        </InputGroup>
      ) : (
        <Input {...shared} type={kind} className={sizing} />
      )}
      {counter}
    </Field>
  );
}

const BOARD_PRIORITY = { low: "neutral", medium: "info", high: "warning", urgent: "error" } as const;

/* Lane colours for a painted board: a fill and the text that reads on it (AA in both themes). */
const LANE_TONES = {
  brand: { fill: "var(--studio-brand-fill)", text: "var(--studio-brand-text)" },
  warning: { fill: "#f0c330", text: "#1a1a1f" },
  success: { fill: "#1f6b4a", text: "#ffffff" },
  danger: { fill: "#d6452c", text: "#ffffff" },
  info: { fill: "#2f5bd6", text: "#ffffff" },
  neutral: { fill: "#3b3b47", text: "#ffffff" },
} as const;

type LaneTone = keyof typeof LANE_TONES;

const LANE_ORDER: LaneTone[] = ["warning", "success", "danger", "info", "brand", "neutral"];

/** The theme's tokens rescoped to a lane's colour, so text, badges and avatars inside a painted card follow. */
function laneVars(t: LaneTone): React.CSSProperties {
  const { fill, text } = LANE_TONES[t];
  const mix = (pct: number) => `color-mix(in oklch, ${text} ${pct}%, transparent)`;
  return {
    "--card": fill,
    "--card-foreground": text,
    "--foreground": text,
    "--muted-foreground": mix(78),
    "--muted": mix(16),
    "--secondary": mix(16),
    "--secondary-foreground": text,
    "--accent": mix(16),
    "--border": "transparent",
    "--primary-ink": text,
    backgroundColor: fill,
    color: text,
  } as React.CSSProperties;
}

/**
 * A kanban board: stages as tinted lanes across the page, each with its
 * cards (title, a line of context, tags, who and when, a priority dot).
 * Lanes scroll sideways when there are many. Every card opens what "card"
 * is wired to, with the card's title as {name}.
 */
function BoardBlock({
  variant = "cards",
  title,
  actionLabel,
  columns,
}: {
  /** painted: each lane's cards filled with the lane's colour (a pipeline by stage). */
  variant?: "cards" | "compact" | "painted";
  title?: string;
  actionLabel?: string;
  /** tone colours the lane: its dot, and its cards when painted; painted lanes without one take turns. */
  columns: { name: string; tone?: LaneTone; cards: { title: string; detail?: string; tags?: string[]; person?: string; due?: string; priority?: keyof typeof BOARD_PRIORITY }[] }[];
}) {
  const act = useSlotAction("card");
  const compact = variant === "compact";
  const painted = variant === "painted";
  // "+" on a lane adds a new card at its top.
  const [added, setAdded] = React.useState<Record<string, number>>({});
  const laneTone = (col: (typeof columns)[number], i: number): LaneTone | null => col.tone ?? (painted ? LANE_ORDER[i % LANE_ORDER.length] : null);
  // On a fill page the lanes run to the foot of the window and scroll inside.
  return (
    <div className="flex h-full flex-col gap-4">
      {(title || actionLabel) && (
        <div className="flex items-center justify-between gap-3">
          {title && <h2 className="font-heading text-[15px] font-semibold tracking-tight text-foreground">{title}</h2>}
          {actionLabel && (
            <SlotButton slot="action" size="sm" className="ml-auto">
              <Plus />
              {actionLabel}
            </SlotButton>
          )}
        </div>
      )}
      {/* relative: the cards' screen-reader labels are positioned inside the scroller, or they widen the whole page on a phone. */}
      <div className="relative -mx-1 flex min-h-0 flex-1 gap-3 overflow-x-auto px-1 pb-2">
        {columns.map((col, i) => {
          const lane = laneTone(col, i);
          return (
          <div key={col.name} className={cn("flex min-h-0 min-w-[236px] flex-1 basis-[272px] flex-col gap-2 overflow-y-auto rounded-lg p-2", painted ? "bg-card/70" : "bg-muted/60")}>
            <div className="flex items-center justify-between px-1.5 pt-0.5">
              <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                {lane && <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full" style={{ background: LANE_TONES[lane].fill }} />}
                {col.name}
                <span className="font-mono text-[11px] text-muted-foreground">{col.cards.length + (added[col.name] ?? 0)}</span>
              </p>
              <button type="button" aria-label={`Add to ${col.name}`} onClick={() => setAdded((a) => ({ ...a, [col.name]: (a[col.name] ?? 0) + 1 }))} className="grid size-6 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground">
                <Plus className="size-3.5" />
              </button>
            </div>
            {Array.from({ length: added[col.name] ?? 0 }, (_, k) => (
              <Card key={`new-${k}`} className="border-dashed p-3">
                <input aria-label={`New card in ${col.name}`} placeholder="New card title" autoFocus={k === (added[col.name] ?? 0) - 1} className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground" />
              </Card>
            ))}
            {col.cards.map((c) => {
              const tone = c.priority ? BOARD_PRIORITY[c.priority] : null;
              return (
                <Card
                  key={c.title}
                  data-link="card"
                  role={act ? "button" : undefined}
                  tabIndex={act ? 0 : undefined}
                  onClick={act ? (e) => act(e.currentTarget, { name: c.title }) : undefined}
                  onKeyDown={act ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); act(e.currentTarget, { name: c.title }); } } : undefined}
                  style={painted && lane ? laneVars(lane) : undefined}
                  className={cn("gap-2 p-3", act && "cursor-pointer transition-[filter,background-color]", act && (painted ? "hover:brightness-110" : "hover:bg-muted/40"))}
                >
                  <div className="flex items-start gap-2">
                    {tone && (
                      <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", toneFill[tone])}>
                        <span className="sr-only">{c.priority} priority</span>
                      </span>
                    )}
                    <p className="min-w-0 flex-1 text-sm font-medium leading-snug text-foreground">{c.title}</p>
                  </div>
                  {!compact && c.detail && <p className="truncate text-xs text-muted-foreground">{c.detail}</p>}
                  {(c.tags?.length || c.person || c.due) && (
                    <div className="flex items-center gap-1.5">
                      {!compact && c.tags?.map((t) => <Badge key={t}>{t}</Badge>)}
                      {c.due && (
                        <span className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
                          <Calendar className="size-3" aria-hidden="true" />
                          {c.due}
                        </span>
                      )}
                      {c.person && <Avatar name={c.person} size="sm" className="ml-auto size-6 text-[9px]" />}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
          );
        })}
      </div>
    </div>
  );
}

// --- composed cards ------------------------------------------------------------

/** One part of a composed card: a layout (stack, row, grid, split) or a piece of content. */
type Part = { type: string; children?: Part[] } & Record<string, unknown>;

const PART_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  sparkles: Sparkles, plus: Plus, play: Play, download: Download, upload: Upload, heart: Heart, star: Star, check: Check,
  clock: Clock, calendar: Calendar, users: Users, user: User, image: ImageIcon, folder: FolderOpen, settings: Settings,
  zap: Zap, flame: Flame, trophy: Trophy, mail: Mail, lock: Lock, "arrow-right": ArrowRight, search: Search, bell: Bell,
  chart: BarChart3, wand: WandSparkles, message: MessageSquare, "map-pin": MapPin, music: Music, "shopping-bag": ShoppingBag, book: BookOpen,
  "rotate-ccw": RotateCcw, "circle-check": CircleCheck, timer: Timer, "file-text": FileText, activity: Activity, rocket: Rocket, server: Server,
  alert: TriangleAlert, "git-commit": GitCommitHorizontal, terminal: Terminal, shield: Shield, globe: Globe,
};

/** A status dot's colour, by tone. */
const DOT_TONE: Record<string, string> = {
  brand: "bg-primary-mark",
  success: "bg-diff-add",
  warning: "bg-warning-foreground",
  danger: "bg-destructive",
  info: "bg-[var(--chart-2)]",
  neutral: "bg-muted-foreground/60",
};

/** A callout's left edge, by tone. */
const CALLOUT_TONE: Record<string, string> = {
  brand: "border-primary",
  danger: "border-destructive",
  warning: "border-warning-foreground",
  info: "border-[var(--chart-2)]",
  neutral: "border-border",
};

const PART_GAP: Record<string, string> = { sm: "gap-2", md: "gap-3", lg: "gap-5" };

// Columns open up as the card widens, so a cell is never a 70px sliver on a phone (four figures go two by two first).
const PART_COLS: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-1 @sm:grid-cols-3",
  4: "grid-cols-2 @lg:grid-cols-4",
  5: "grid-cols-2 @sm:grid-cols-3 @xl:grid-cols-5",
  6: "grid-cols-2 @sm:grid-cols-3 @xl:grid-cols-6",
};

const PART_RATIO: Record<string, string> = {
  "1:1": "aspect-square", "4:3": "aspect-[4/3]", "16:9": "aspect-video", "2:3": "aspect-[2/3]", "3:4": "aspect-[3/4]", "21:9": "aspect-[21/9]", fill: "h-full min-h-40",
};

// Badge tones are a dot beside theme-coloured text, so every tone keeps its contrast.
const PART_DOT: Record<string, string> = { neutral: "bg-muted-foreground", brand: "bg-primary-mark", success: "bg-diff-add", warning: "bg-warning", danger: "bg-destructive" };

const PART_FILL: Record<string, string> = {
  neutral: "bg-muted text-muted-foreground",
  brand: "bg-primary/12 text-primary-ink",
  success: "bg-diff-add/15 text-diff-add",
  warning: "bg-warning/15 text-warning-foreground",
  danger: "bg-destructive/15 text-destructive",
};

const PART_BUTTON: Record<string, React.ComponentProps<typeof Button>["variant"]> = {
  primary: "default",
  secondary: "secondary",
  soft: "soft",
  outline: "outline",
  ghost: "ghost",
  link: "link",
  destructive: "destructive",
  gradient: "gradient",
};

const PART_SIZE: Record<string, React.ComponentProps<typeof Button>["size"]> = { sm: "sm", md: "default", lg: "lg", xl: "xl" };

const PART_ICON_SIZE: Record<string, React.ComponentProps<typeof Button>["size"]> = { sm: "icon-sm", md: "icon", lg: "icon-lg", xl: "icon-lg" };

/** A run of parts drawn as one group: rows as a divided list, feed rows as a timeline, checkboxes as a checklist. */
type Run = { kind: "list" | "feed" | "checks" | "pairs" | "switches" | "points" | "one"; parts: Part[] };

/** A text line written as a bullet ("· 3.1% of checkouts failed"), which reads better as a real list. */
const BULLET = /^\s*[·•\-–]\s+/;

function runsOf(parts: Part[]): Run[] {
  const kindOf = (p: Part): Run["kind"] => {
    if (p.type === "listrow") return p.dot ? "feed" : "list";
    if (p.type === "checkbox") return "checks";
    if (p.type === "keyvalue" && !p.stacked) return "pairs";
    if (p.type === "switch") return "switches";
    if (p.type === "text" && typeof p.text === "string" && BULLET.test(p.text)) return "points";
    return "one";
  };
  const runs: Run[] = [];
  for (const p of parts) {
    const kind = kindOf(p);
    const last = runs[runs.length - 1];
    if (last && kind !== "one" && last.kind === kind) last.parts.push(p);
    else runs.push({ kind, parts: [p] });
  }
  return runs;
}

/** A sub-section's label (an eyebrow, or a row led by one) partway down a card: it opens a new block, so it takes room above. */
const opensBlock = (p: Part) => p.type === "eyebrow" || (p.type === "row" && p.children?.[0]?.type === "eyebrow") || (p.type === "divider" && Boolean(p.label));

/** The words of a sub-section label (an eyebrow, or a row led by one), to name what follows it. */
const labelOf = (p?: Part): string | undefined => {
  if (!p) return undefined;
  if (p.type === "eyebrow" || p.type === "divider") return typeof p.text === "string" ? p.text : typeof p.label === "string" ? p.label : undefined;
  if (p.type === "row" && p.children?.[0]?.type === "eyebrow") return labelOf(p.children[0]);
  return undefined;
};

/** How many rows of a card's last long list show before "View all". */
const TAIL_ROWS = 5;

/**
 * A card's last long list: its first rows, then a "View all" button that
 * opens the rest in place (and closes them again). Nothing scrolls inside
 * the card, so the page has one scroll and every row can be reached by
 * keyboard and read by a screen reader.
 */
function CappedRun({ run, index, label }: { run: Run; index: number; label?: string }) {
  const [open, setOpen] = React.useState(false);
  const total = run.parts.length;
  return (
    <div className="flex min-w-0 flex-col gap-2">
      {drawRun(open ? run : { ...run, parts: run.parts.slice(0, TAIL_ROWS) }, index)}
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? `Show fewer${label ? ` of ${label}` : ""}` : `View all ${total}${label ? ` of ${label}` : ""}`}
        onClick={() => setOpen((o) => !o)}
        className="flex w-fit items-center gap-1 rounded-sm text-xs font-medium text-primary-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-ink"
      >
        {open ? "Show fewer" : `View all ${total}`}
        <ChevronDown aria-hidden="true" className={cn("size-3.5 transition-transform", open && "rotate-180")} />
      </button>
    </div>
  );
}

/** A card's root stack, or the last stack inside it: its last long list is capped (see CappedRun); `label` names the list when the stack has no label of its own. */
type Fill = { label?: string };

/** A stack's children with structure: grouped runs, and space before each sub-section. With `fill`, its last long list is capped (see CappedRun). */
function StackParts({ parts, fill }: { parts: Part[]; fill?: Fill }) {
  const runs = runsOf(parts);
  return runs.map((run, i) => {
    const last = fill && i === runs.length - 1;
    const label = labelOf(runs[i - 1]?.parts[0]) ?? fill?.label;
    // A last sub-stack ("Activity" and its rows) passes the room on to its own list.
    // A last map ("Blast radius") grows into the room instead.
    if (last && run.kind === "one" && (run.parts[0].type === "stack" || run.parts[0].type === "graph")) return <PartView key={i} part={run.parts[0]} fill={{ label }} />;
    // A long last list shows its first rows and a "View all" (two rows over the cap aren't worth a button).
    return last && run.parts.length > TAIL_ROWS + 2 && (run.kind === "list" || run.kind === "feed" || run.kind === "checks") ? <CappedRun key={i} run={run} index={i} label={label} /> : drawRun(run, i);
  });
}

/** One run of a stack, drawn as its group. */
function drawRun(run: Run, i: number) {
  const head = run.parts[0];
  const space = i > 0 && run.kind === "one" && opensBlock(head) ? "pt-3" : undefined;
  if (run.kind === "one" || run.parts.length < 2) {
    return space ? (
      <div key={i} className={space}>
        <PartView part={head} />
      </div>
    ) : (
      <PartView key={i} part={head} />
    );
  }
  if (run.kind === "points") {
    return (
      <ul key={i} className="flex list-disc flex-col gap-1 pl-4 text-sm text-muted-foreground marker:text-primary-ink">
        {run.parts.map((p, j) => (
          <li key={j}>{String(p.text).replace(BULLET, "")}</li>
        ))}
      </ul>
    );
  }
  if (run.kind === "list" || run.kind === "pairs" || run.kind === "switches") {
    return (
      <ul key={i} className="flex flex-col divide-y divide-foreground/10">
        {run.parts.map((p, j) => (
          <li key={j} className={cn(run.kind === "pairs" ? "py-2" : "py-2.5", "first:pt-1 last:pb-1")}>
            <PartView part={p} />
          </li>
        ))}
      </ul>
    );
  }
  if (run.kind === "feed") {
    // The dots sit on one line down the left, newest first.
    return (
      <ol key={i} className="relative flex flex-col gap-3 py-1 before:absolute before:top-3 before:bottom-3 before:left-[2.5px] before:w-px before:bg-foreground/20">
        {run.parts.map((p, j) => (
          <li key={j} className="relative">
            <PartView part={p} />
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ul key={i} className="flex flex-col divide-y divide-foreground/10 rounded-lg border border-foreground/12">
      {run.parts.map((p, j) => (
        <li key={j} className="px-3 py-2.5">
          <PartView part={p} />
        </li>
      ))}
    </ul>
  );
}

/** Draws one part of a composed card. */
function PartView({ part, fill }: { part: Part; fill?: Fill }) {
  const s = (k: string) => part[k] as string | undefined;
  const n = (k: string) => part[k] as number | undefined;
  const kids = (list = part.children ?? []) => list.map((c, i) => <PartView key={i} part={c} />);
  const gap = PART_GAP[s("gap") ?? "md"];
  switch (part.type) {
    case "stack": {
      const align = s("align");
      return (
        <div className={cn("flex min-w-0 flex-col", fill && "flex-1", gap, align === "center" && "items-center text-center", align === "end" && "items-end text-right", align === "start" && "items-start")}>
          <StackParts parts={part.children ?? []} fill={fill} />
        </div>
      );
    }
    case "row": {
      const align = s("align");
      return <div className={cn("flex min-w-0 flex-wrap items-center [&>[data-full]]:w-auto [&>[data-full]]:flex-1", gap, align === "between" && "justify-between", align === "center" && "justify-center", align === "end" && "justify-end")}>{kids()}</div>;
    }
    case "grid":
      // Columns of equal height: a column that ends in a button keeps it on the bottom line with its neighbours'.
      return <div className={cn("grid min-w-0 [&>.flex-col]:h-full [&>.flex-col>[data-slot=button]:last-child]:mt-auto", PART_COLS[n("cols") ?? 2], gap)}>{kids()}</div>;
    case "split": {
      const [side, main] = part.children ?? [];
      const right = s("side") === "right";
      const cols = s("width") === "half" ? "@md:grid-cols-2" : right ? "@md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]" : "@md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]";
      // A diagram beside a taller column sits in the middle of it, not at its top with a gap underneath.
      return <div className={cn("grid min-w-0 items-stretch gap-4 [&>figure]:self-center", cols)}>{kids(right ? [main, side].filter(Boolean) : [side, main].filter(Boolean))}</div>;
    }
    case "eyebrow":
      return <p className="font-mono text-eyebrow tracking-[0.14em] text-muted-foreground uppercase">{s("text")}</p>;
    case "heading": {
      const size = s("size");
      return (
        <h3
          className={cn(
            "text-balance text-foreground",
            s("align") === "center" && "text-center",
            size === "sm" && "text-sm font-semibold",
            (!size || size === "md") && "font-heading text-base font-semibold",
            size === "lg" && "font-heading text-xl font-semibold tracking-tight",
            size === "xl" && "font-heading text-3xl leading-tight font-bold tracking-tight",
          )}
        >
          {s("text")}
        </h3>
      );
    }
    case "text":
      return (
        <p
          title={part.truncate ? s("text") : undefined}
          className={cn(
            s("size") === "lg" ? "text-lg leading-snug" : s("size") === "md" ? "text-base" : s("size") === "xs" ? "text-xs" : "text-sm",
            s("tone") === "default" ? "text-foreground" : s("tone") === "brand" ? "font-medium text-primary-ink" : "text-muted-foreground",
            s("align") === "center" && "text-center",
            Boolean(part.mono) && "font-mono tabular-nums",
            Boolean(part.truncate) && "truncate",
          )}
        >
          {s("text")}
        </p>
      );
    case "callout":
      return (
        <div data-slot="callout" data-tone={s("tone") ?? "brand"} className={cn("rounded-r-md border-l-2 bg-muted/60 px-3.5 py-3", CALLOUT_TONE[s("tone") ?? "brand"])}>
          {s("title") && <p className="mb-1 text-sm font-semibold text-foreground">{s("title")}</p>}
          <p className="text-sm leading-relaxed text-foreground">{s("text")}</p>
        </div>
      );
    case "bullets":
      return (
        <ul className="flex list-disc flex-col gap-1 pl-4 text-sm text-muted-foreground marker:text-primary-ink">
          {(part.items as string[]).map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      );
    case "milestones":
      return <Milestones items={part.items as MilestoneItem[]} current={n("current") ?? 0} gaps={(part.gaps as string[] | undefined) ?? []} />;
    case "plan":
      return <ZonePlan cols={n("cols") ?? 6} rows={n("rows") ?? 3} zones={part.zones as Zone[]} label={s("label")} labels={part.labels as Partial<Record<Zone["state"], string>> | undefined} />;
    case "orb":
      return s("kind") && s("kind") !== "orb" ? <GlowArt kind={s("kind") as ArtKindName} label={s("label")} fill={Boolean(fill)} /> : <GlowOrb label={s("label")} fill={Boolean(fill)} />;
    case "graph":
      return <NodeGraph cols={n("cols") ?? 5} rows={n("rows") ?? 3} nodes={part.nodes as GraphNode[]} edges={part.edges as { from: number; to: number }[]} label={s("label")} fill={Boolean(fill)} />;
    case "quote":
      return <blockquote className="font-heading text-lg leading-snug font-semibold text-balance text-foreground">“{s("text")}”</blockquote>;
    case "figure": {
      const trend = s("trend");
      return (
        <div className="min-w-0">
          <p
            className={cn(
              "leading-none font-semibold tracking-tight text-foreground tabular-nums",
              part.mono ? "font-mono" : "font-heading",
              // Big figures scale with their card (cqi), between a floor and their full size, so they never run out of it.
              s("size") === "xl" ? "text-[clamp(2.25rem,17cqi,4.5rem)]" : s("size") === "lg" ? "text-[clamp(2rem,13cqi,3rem)]" : "text-3xl",
              s("size") === "xl" && Boolean(part.mono) && "tracking-tighter",
            )}
          >
            {s("value")}
            {s("unit") && <span className="ml-0.5 text-base font-medium text-muted-foreground">{s("unit")}</span>}
          </p>
          {(s("label") || s("delta")) && (
            <p className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              {s("label")}
              {s("delta") && (
                <span className="inline-flex items-center gap-0.5 font-medium text-foreground">
                  {trend === "down" ? <ArrowDownRight className="size-3.5" aria-hidden="true" /> : <ArrowUpRight className="size-3.5" aria-hidden="true" />}
                  {s("delta")}
                </span>
              )}
            </p>
          )}
        </div>
      );
    }
    case "keyvalue":
      return part.stacked ? (
        <div className="flex min-w-0 flex-col gap-1">
          {/* Both wrap rather than cut: "51 days · Atelier Brun" in a narrow column takes a second line. */}
          <span className="text-xs break-words text-muted-foreground">{s("label")}</span>
          <span className={cn("text-lg leading-tight font-semibold break-words text-foreground tabular-nums", Boolean(part.mono) && "font-mono")}>{s("value")}</span>
        </div>
      ) : (
        // In a narrow column the value takes its own line under the label instead of running into the next column.
        <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 text-sm">
          <span className="text-muted-foreground">{s("label")}</span>
          <span className={cn("min-w-0 text-right font-medium break-words text-foreground", Boolean(part.mono) && "font-mono tabular-nums")}>{s("value")}</span>
        </div>
      );
    case "rating": {
      const value = n("value") ?? 0;
      return (
        <div className="flex items-center gap-2">
          <span className="flex text-primary-ink" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className={cn("size-4", i <= Math.round(value) && "fill-current")} />
            ))}
          </span>
          <span className="text-sm text-foreground tabular-nums">
            {value}
            <span className="sr-only"> out of 5</span>
          </span>
          {s("count") && <span className="text-sm text-muted-foreground">{s("count")}</span>}
        </div>
      );
    }
    case "chip":
      return <ChipToggle text={s("text") ?? ""} initial={Boolean(part.selected)} />;
    case "badge": {
      const tone = s("tone") ?? "neutral";
      const size = s("size") === "md" ? "px-3 py-1 text-sm" : "px-2.5 py-0.5 text-xs";
      if (s("style") === "filled") return <span className={cn("inline-flex w-fit items-center rounded-full font-medium", size, PART_FILL[tone])}>{s("text")}</span>;
      return (
        <span className={cn("inline-flex w-fit items-center gap-1.5 rounded-full border border-border font-medium text-foreground", size)}>
          {s("style") !== "outline" && <span aria-hidden="true" className={cn("size-1.5 rounded-full", PART_DOT[tone])} />}
          {s("text")}
        </span>
      );
    }
    case "button": {
      const Icon = s("icon") ? PART_ICON[s("icon")!] : null;
      const variant = PART_BUTTON[s("variant") ?? "primary"] ?? "default";
      const iconOnly = Boolean(part.iconOnly) && Icon;
      const size = iconOnly ? PART_ICON_SIZE[s("size") ?? "md"] : PART_SIZE[s("size") ?? "md"];
      return (
        <SlotButton
          slot={s("slot") ?? "part"}
          variant={variant}
          size={size}
          aria-label={iconOnly ? s("text") : undefined}
          // Full width: across a column; in a row, sharing it with the others (the row grows it, a column must not shrink it).
          data-full={part.full ? "" : undefined}
          // Loading: a spinner in place of the icon, the label kept, the button held until it's done.
          disabled={Boolean(part.loading) || undefined}
          aria-busy={part.loading ? true : undefined}
          className={cn(part.full ? "w-full min-w-0 shrink-0" : "w-fit", s("shape") === "pill" && "rounded-full", Boolean(part.loading) && "disabled:opacity-80")}
        >
          {part.loading ? <Spinner size="sm" /> : Icon && <Icon />}
          {!iconOnly && s("text")}
        </SlotButton>
      );
    }
    case "link":
      return (
        <SlotLink slot={s("slot") ?? "part"} className={cn("inline-flex w-fit items-center gap-1 text-sm font-medium text-primary-ink underline-offset-4 hover:underline", s("align") === "center" && "self-center")}>
          {s("text")}
          {part.arrow !== false && <ArrowRight className="size-3.5" aria-hidden="true" />}
        </SlotLink>
      );
    case "kbd":
      return (
        <span className="flex items-center gap-2 text-sm">
          {s("label") && <span className="text-muted-foreground">{s("label")}</span>}
          <KbdGroup>
            {(part.keys as string[]).map((k) => (
              <Kbd key={k}>{k}</Kbd>
            ))}
          </KbdGroup>
        </span>
      );
    case "image":
      return (
        <div role="img" aria-label={s("alt")} className={cn("w-full overflow-hidden rounded-lg", PART_RATIO[s("ratio") ?? "4:3"])}>
          <BrandArt seed={s("alt") ?? "image"} className="size-full" />
        </div>
      );
    case "avatar": {
      const size = (s("size") ?? "md") as "xs" | "sm" | "md" | "lg" | "xl";
      const status = s("status");
      return (
        <div className="flex min-w-0 items-center gap-3">
          <span className="relative shrink-0">
            <Avatar name={s("name")!} size={size} />
            {status && (
              <span className={cn("absolute right-0 bottom-0 size-2.5 rounded-full ring-2 ring-card", status === "online" ? "bg-diff-add" : status === "away" ? "bg-warning" : "bg-muted-foreground/50")}>
                {/* Read, not only seen: a colour alone says nothing to a screen reader. */}
                <span className="sr-only">{status}</span>
              </span>
            )}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">{s("name")}</p>
            {s("meta") && <p className="truncate text-xs text-muted-foreground">{s("meta")}</p>}
          </div>
        </div>
      );
    }
    case "avatars": {
      const names = part.names as string[];
      const extra = n("extra");
      return (
        <div className="flex items-center">
          <span className="sr-only">{names.join(", ")}{extra ? ` and ${extra} more` : ""}</span>
          {names.map((name, i) => (
            <span key={name} className={cn("rounded-full ring-2 ring-card", i > 0 && "-ml-2")}>
              <Avatar name={name} size="sm" />
            </span>
          ))}
          {extra ? <span aria-hidden="true" className="-ml-2 grid size-7 place-items-center rounded-full bg-muted text-[11px] font-medium text-foreground ring-2 ring-card">+{extra}</span> : null}
        </div>
      );
    }
    case "icon": {
      const Icon = PART_ICON[s("name") ?? "sparkles"] ?? Sparkles;
      return (
        <span className={cn("grid size-10 shrink-0 place-items-center rounded-lg", s("tone") === "muted" ? "bg-muted text-muted-foreground" : "bg-primary/12 text-primary-ink")}>
          <Icon className="size-5" aria-hidden="true" />
        </span>
      );
    }
    case "progress": {
      const value = n("value") ?? 0;
      return (
        <div className="flex flex-col gap-1.5">
          {s("label") && (
            <div className="flex justify-between gap-3 text-sm">
              <span className="text-foreground">{s("label")}</span>
              <span className="text-muted-foreground tabular-nums">{value}%</span>
            </div>
          )}
          <Progress value={value} aria-label={s("label") ?? "Progress"} />
        </div>
      );
    }
    case "ring":
      return (
        <div className="flex items-center gap-3">
          <CircularProgress value={n("value") ?? 0} size={64} strokeWidth={7} />
          {s("label") && <p className="text-sm text-muted-foreground">{s("label")}</p>}
        </div>
      );
    case "sparkline": {
      const pts = part.points as number[];
      const [min, max] = [Math.min(...pts), Math.max(...pts)];
      const d = pts.map((v, i) => `${(i / (pts.length - 1)) * 100},${30 - ((v - min) / (max - min || 1)) * 28 - 1}`).join(" ");
      return (
        <div className="flex flex-col gap-1">
          <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-10 w-full" aria-hidden="true">
            <polyline points={d} fill="none" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--chart-1)" }} />
          </svg>
          {s("label") && <p className="text-xs text-muted-foreground">{s("label")}</p>}
        </div>
      );
    }
    case "bars": {
      const values = part.values as number[];
      const labels = (part.labels as string[] | undefined) ?? [];
      const top = Math.max(...values, 1);
      const mark = n("highlight") ?? values.indexOf(Math.max(...values));
      const tint = "color-mix(in oklch, var(--chart-1) 22%, var(--card))";
      // Labels sit under the bars only when they fit there whole (about 36 characters across a narrow card);
      // longer ones ("16–30 days") turn the bars into rows, each label beside its bar, so none is cut.
      const longest = Math.max(0, ...labels.map((l) => l.length));
      if (longest * values.length > 36) {
        return (
          <div className="flex flex-col gap-2">
            <ul className="grid grid-cols-[fit-content(45%)_1fr] items-center gap-x-2.5 gap-y-1.5">
              {values.map((v, i) => (
                <li key={i} className="col-span-2 grid grid-cols-subgrid items-center">
                  <span className={cn("font-mono text-[11px] leading-tight break-words text-muted-foreground", i === mark && "font-semibold text-foreground")}>{labels[i] ?? i + 1}</span>
                  <span className="sr-only">{v}</span>
                  <span aria-hidden="true" className="h-2.5 rounded-sm" style={{ background: tint }}>
                    <span className="block h-full rounded-sm" style={{ width: `${Math.max(3, (v / top) * 100)}%`, background: i === mark ? "var(--chart-1)" : "color-mix(in oklch, var(--chart-1) 55%, var(--card))" }} />
                  </span>
                </li>
              ))}
            </ul>
            {s("label") && <p className="text-xs text-muted-foreground">{s("label")}</p>}
          </div>
        );
      }
      return (
        <div className="flex flex-col gap-1.5">
          <div role="img" aria-label={`${s("label") ?? "Values"}: ${values.map((v, i) => `${labels[i] ?? i + 1} ${v}`).join(", ")}`} className="flex h-20 items-end gap-1.5">
            {values.map((v, i) => (
              <div key={i} className="flex h-full flex-1 flex-col justify-end">
                <div className="rounded-sm" style={{ height: `${Math.max(4, (v / top) * 100)}%`, background: i === mark ? "var(--chart-1)" : tint }} />
              </div>
            ))}
          </div>
          {labels.length > 0 && (
            <div aria-hidden="true" className="flex gap-1.5">
              {values.map((_, i) => (
                <span key={i} className={cn("flex-1 truncate text-center font-mono text-[10px] text-muted-foreground", i === mark && "font-semibold text-foreground")}>{labels[i]}</span>
              ))}
            </div>
          )}
          {s("label") && <p className="text-xs text-muted-foreground">{s("label")}</p>}
        </div>
      );
    }
    case "listrow": {
      const progress = n("progress");
      return (
        <div className="flex min-w-0 items-center gap-3">
          {Boolean(part.image) && <BrandArt seed={s("title")!} className="size-11 shrink-0 rounded-md" />}
          {s("avatar") && <Avatar name={s("avatar")!} size="sm" />}
          {s("dot") && <span aria-hidden="true" className={cn("relative mt-[6px] size-1.5 shrink-0 self-start rounded-full ring-[3px] ring-card", DOT_TONE[s("dot")!])} />}
          <div className="min-w-0 flex-1">
            {/* The badge rides beside the title and wraps under it when the row is narrow, so the title keeps its room. */}
            <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5">
              {/* A feed entry (with a dot) is a sentence: it wraps to a second line rather than losing its end. */}
              <p className={cn("min-w-0 text-sm font-medium text-foreground", s("dot") ? "line-clamp-2" : "truncate")}>{s("title")}</p>
              {s("badge") && <span className="shrink-0 rounded-full border border-border px-2 py-px text-[11px] leading-4 text-foreground">{s("badge")}</span>}
            </div>
            {s("meta") && <p className={cn("truncate text-xs text-muted-foreground", s("dot") && "mt-0.5 font-mono text-[11px] tabular-nums")}>{s("meta")}</p>}
            {progress !== undefined && (
              <Progress value={progress} aria-label={s("title")} className="mt-1.5 h-1.5" />
            )}
          </div>
          {s("value") && <span className={cn("shrink-0 text-sm text-foreground tabular-nums", Boolean(part.mono) && "font-mono text-xs text-muted-foreground")}>{s("value")}</span>}
        </div>
      );
    }
    case "days": {
      const items = part.items as { label: string; done: boolean }[];
      return (
        <ol aria-label={s("label") ?? "Days"} className="grid gap-1.5 text-center text-xs text-muted-foreground" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
          {items.map((d, i) => (
            <li key={i} className="flex flex-col gap-1">
              <span className={cn("grid h-8 place-items-center rounded-md", d.done ? "bg-primary-strong text-primary-foreground" : "border-[1.5px] border-dashed border-foreground/30")}>
                {d.done && <Check className="size-4" aria-hidden="true" />}
                <span className="sr-only">{d.done ? "done" : "not yet"}</span>
              </span>
              {d.label}
            </li>
          ))}
        </ol>
      );
    }
    case "divider":
      return s("label") ? (
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          {s("label")}
          <span className="h-px flex-1 bg-border" />
        </div>
      ) : (
        <Separator />
      );
    case "input":
      return (
        <TextField
          label={s("label") ?? "Field"}
          value={s("value")}
          placeholder={s("placeholder")}
          prefix={s("prefix")}
          suffix={s("suffix")}
          hint={s("hint")}
          error={s("error")}
          icon={s("icon")}
          kind={(s("kind") ?? "text") as React.ComponentProps<typeof TextField>["kind"]}
          required={Boolean(part.required)}
          disabled={Boolean(part.disabled)}
          rows={n("rows")}
          size={(s("size") ?? "md") as "sm" | "md" | "lg"}
          rules={part.rules as string[] | undefined}
          max={n("max")}
        />
      );
    case "radio":
      return <RadioField label={s("label") ?? "Options"} options={part.options as string[]} value={s("value")} />;
    case "combobox":
      return <ComboField label={s("label") ?? "Choose"} options={part.options as string[]} value={s("value")} />;
    case "date":
      return <DateField label={s("label") ?? "Date"} value={s("value")} hint={s("hint")} />;
    case "otp":
      return <CodeField label={s("label") ?? "Code"} length={n("length") ?? 6} hint={s("hint")} />;
    case "multiselect":
      return <MultiSelectField label={s("label") ?? "Choose"} options={part.options as string[]} values={part.values as string[] | undefined} hint={s("hint")} />;
    case "tags":
      return <TagsField label={s("label") ?? "Tags"} values={part.values as string[] | undefined} placeholder={s("placeholder")} hint={s("hint")} />;
    case "time":
      return <TimeField label={s("label") ?? "Time"} value={s("value")} hint={s("hint")} />;
    case "secret":
      return <SecretField label={s("label")} value={s("value") ?? ""} note={s("note")} />;
    case "qr":
      return <QrCode value={s("value") ?? "otpauth"} label={s("label")} secret={s("secret")} />;
    case "richtext":
      return <RichTextField label={s("label")} value={s("value")} placeholder={s("placeholder")} />;
    case "list": {
      const items = part.items as { title: string; subtitle?: string; icon?: string }[];
      return (
        <List>
          {items.map((it, i) => {
            const Icon = it.icon ? PART_ICON[it.icon] : undefined;
            return <ListItem key={i} title={it.title} subtitle={it.subtitle} icon={Icon ? <Icon className="size-4" /> : undefined} />;
          })}
        </List>
      );
    }
    case "steps":
      return <Stepper steps={part.items as string[]} current={n("current") ?? 0} />;
    case "toggles": {
      const items = part.items as { text: string; on?: boolean }[];
      return (
        <div role="group" aria-label={s("label") ?? "Options"} className="flex flex-wrap gap-1.5">
          {items.map((t) => (
            <Toggle key={t.text} variant="outline" size="sm" defaultPressed={Boolean(t.on)}>
              {t.text}
            </Toggle>
          ))}
        </div>
      );
    }
    case "skeleton": {
      const lines = n("lines") ?? 3;
      return (
        <div role="status" aria-label="Loading" className="flex items-start gap-3">
          {Boolean(part.avatar) && <Skeleton className="size-10 shrink-0 rounded-full" />}
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            {Boolean(part.image) && <Skeleton className="aspect-video w-full rounded-lg" />}
            {Array.from({ length: lines }, (_, i) => (
              <Skeleton key={i} className={cn("h-3 rounded", i === lines - 1 ? "w-2/3" : "w-full")} />
            ))}
          </div>
        </div>
      );
    }
    case "spinner":
      return (
        <div role="status" className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <Spinner size="sm" />
          {s("label") ?? "Loading…"}
        </div>
      );
    case "collapsible":
      return (
        <Collapsible defaultOpen={Boolean(part.open)} className="rounded-lg border border-border">
          <CollapsibleTrigger className="group/c flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left text-sm font-medium text-foreground">
            {s("title")}
            <ChevronRight className="size-4 text-muted-foreground transition-transform group-data-[state=open]/c:rotate-90" aria-hidden="true" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p className="px-3.5 pb-3 text-sm text-muted-foreground">{s("text")}</p>
          </CollapsibleContent>
        </Collapsible>
      );
    case "select":
      return <SelectField label={s("label") ?? "Choose"} options={part.options as string[]} value={s("value")} />;
    case "switch":
      return (
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">{s("label")}</p>
            {s("hint") && <p className="text-xs text-muted-foreground">{s("hint")}</p>}
          </div>
          <Switch defaultChecked={Boolean(part.on)} disabled={Boolean(part.disabled)} aria-label={s("label")} />
        </div>
      );
    case "checkbox":
      return (
        <label className={cn("group/check flex items-start gap-2.5 text-sm text-foreground", Boolean(part.disabled) && "opacity-60")}>
          <Checkbox defaultChecked={Boolean(part.on)} disabled={Boolean(part.disabled)} className="mt-0.5" />
          <span className="min-w-0">
            {/* A ticked option stays as it reads ("I agree to the Terms"): only a task list strikes its done items through. */}
            <span className="block">{s("label")}</span>
            {s("hint") && <span className="mt-0.5 block text-xs text-pretty text-muted-foreground">{s("hint")}</span>}
          </span>
        </label>
      );
    case "slider": {
      const [min, max, value] = [n("min") ?? 0, n("max") ?? 100, n("value") ?? 50];
      return (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between gap-3 text-sm">
            <span className="text-foreground">{s("label")}</span>
            <span className="text-muted-foreground tabular-nums">{value}</span>
          </div>
          <Slider aria-label={s("label")} defaultValue={[value]} min={min} max={max} step={max - min <= 2 ? 0.05 : 1} />
        </div>
      );
    }
    case "segmented":
      return (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-foreground">{s("label")}</p>
          <SegmentedChoice label={s("label") ?? "Options"} options={part.options as string[]} value={s("value")} />
        </div>
      );
    case "tabs": {
      const items = part.items as string[];
      return (
        <Tabs defaultValue={items[n("selected") ?? 0] ?? items[0]}>
          <TabsList variant="line" className="h-10 w-full justify-start gap-5 rounded-none border-b border-border">
            {items.map((t) => (
              <TabsTrigger key={t} value={t} className="flex-none px-0">
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      );
    }
    case "swatches":
      return <Swatches label={s("label")} colors={part.colors as string[]} initial={n("selected") ?? 0} />;
    default:
      return null;
  }
}

/**
 * A list of places to go, the kit's List: settings menus, help topics,
 * account areas. Each row is a slot ("item-0"…) that can open a page or an
 * overlay. "card" frames it with a title; "inset" sets the list on the page.
 */
function LinkListCard({
  variant = "card",
  title,
  description,
  items,
}: {
  variant?: "card" | "inset";
  title?: string;
  description?: string;
  items: { title: string; subtitle?: string; icon?: string }[];
}) {
  // On a settings page this list is the areas: its rows switch the page beside it.
  const tabs = usePageTabs();
  const areas = tabs?.source === "list" ? tabs : null;
  const list = (
    <List className={variant === "card" ? "rounded-none border-x-0 border-b-0" : undefined}>
      {items.map((it, i) => (
        <LinkListRow key={i} slot={`item-${i}`} {...it} active={areas ? areas.active === i : undefined} onPick={areas ? () => areas.setActive(i) : undefined} />
      ))}
    </List>
  );
  if (variant === "inset") {
    return (
      <section className="flex flex-col gap-3">
        {title && (
          <div>
            <h2 className="text-sm font-semibold text-foreground">{title}</h2>
            {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
          </div>
        )}
        {list}
      </section>
    );
  }
  return (
    <Card className="h-full overflow-hidden">
      {title && <CardHeader title={title} description={description} />}
      {list}
    </Card>
  );
}

function LinkListRow({ slot, title, subtitle, icon, active, onPick }: { slot: string; title: string; subtitle?: string; icon?: string; active?: boolean; onPick?: () => void }) {
  const act = useSlotAction(slot);
  const Icon = icon ? PART_ICON[icon] : undefined;
  return (
    <ListItem
      data-link={slot}
      title={title}
      subtitle={subtitle}
      icon={Icon ? <Icon className="size-4" /> : undefined}
      chevron={!onPick}
      aria-current={active ? "page" : undefined}
      className={cn(active && "bg-muted/60 [&_[data-slot=list-item-title]]:font-semibold")}
      onClick={act ? (e) => act(e.currentTarget) : onPick}
    />
  );
}

/** A card Claude composes from kit parts, for what no section shows. */
type MilestoneItem = { label: string; time?: string; caption?: string };

/**
 * A lifecycle track (an incident, an order, a deploy): stages along a line,
 * passed ones filled, the current one ringed, the rest hollow and dashed;
 * the time between stages above the line, each stage's time and caption below.
 */
function Milestones({ items, current, gaps }: { items: MilestoneItem[]; current: number; gaps: string[] }) {
  return (
    <ol aria-label="Stages" className="grid min-w-0" style={{ gridTemplateColumns: `repeat(${items.length - 1}, minmax(0, 1fr)) minmax(0, max-content)` }}>
      {items.map((it, i) => {
        const state = i < current ? "done" : i === current ? "current" : "next";
        const last = i === items.length - 1;
        return (
          <li key={i} aria-current={state === "current" ? "step" : undefined} className={cn("flex min-w-0 flex-col", last && "max-w-48")}>
            <span aria-hidden="true" className="h-4 truncate pr-4 text-center font-mono text-[10px] leading-4 text-muted-foreground">
              {!last && gaps[i]}
            </span>
            <span aria-hidden="true" className="mt-1 flex h-5 items-center">
              <span className="grid size-5 shrink-0 place-items-center">
                {state === "done" && <span className="size-2.5 rounded-full bg-primary-mark" />}
                {state === "current" && (
                  <span className="relative grid size-4 place-items-center rounded-full bg-primary-mark ring-4 ring-primary/25">
                    <span className="absolute inset-0 rounded-full bg-primary/40 motion-safe:animate-ping" />
                  </span>
                )}
                {state === "next" && <span className="size-3 rounded-full border-2 border-muted-foreground/40" />}
              </span>
              {!last &&
                (i < current ? (
                  <span className="mx-1 h-0.5 flex-1 rounded-full bg-linear-to-r from-primary/50 to-primary" />
                ) : (
                  <span className="mx-1 flex-1 border-t-2 border-dashed border-muted-foreground/25" />
                ))}
            </span>
            <span className="mt-2.5 truncate pr-3 text-sm font-semibold text-foreground">
              {it.label}
              <span className="sr-only">{state === "done" ? ", done" : state === "current" ? ", current stage" : ", not yet"}</span>
            </span>
            {it.time && <span className={cn("font-mono text-xs tabular-nums", state === "next" ? "text-muted-foreground" : "text-primary-ink")}>{it.time}</span>}
            {it.caption && <span className="mt-0.5 line-clamp-2 pr-3 text-xs text-muted-foreground">{it.caption}</span>}
          </li>
        );
      })}
    </ol>
  );
}

type Zone = { label: string; meta?: string; col: number; row: number; w: number; h: number; state: "free" | "busy" | "full" | "off" | "alert" };

const ZONE_STATE: Record<Zone["state"], { tile: string; word: string; swatch: string }> = {
  free: { tile: "border-dashed border-border bg-card text-muted-foreground", word: "Free", swatch: "border border-dashed border-border bg-card" },
  busy: { tile: "border-primary/40 bg-primary/12 text-foreground", word: "In use", swatch: "border border-primary/40 bg-primary/12" },
  full: { tile: "border-transparent bg-primary-strong text-primary-foreground", word: "Full", swatch: "bg-primary-strong" },
  off: { tile: "border-border bg-muted text-muted-foreground [background-image:repeating-linear-gradient(-45deg,color-mix(in_oklch,var(--foreground)_10%,transparent)_0_1px,transparent_1px_6px)]", word: "Closed", swatch: "border border-border bg-muted" },
  alert: { tile: "border-destructive/50 bg-[color-mix(in_oklch,var(--destructive)_10%,var(--card))] text-destructive", word: "Alert", swatch: "border border-destructive/50 bg-[color-mix(in_oklch,var(--destructive)_10%,var(--card))]" },
};

/**
 * A site or floor plan: named zones (rooms, desks, bays, plots, sites) as tiles on a grid,
 * each spanning its cells and coloured by its state, with a legend of the states shown.
 * In a narrow card the plan becomes a list grouped by state, so names never crush.
 */
/**
 * Zones placed so no two share a cell: one that lands on a taken cell moves to the next free
 * place that fits (reading order, growing a row if needed); when many collide the plan was
 * laid out wrongly, so all of them flow in order instead. Empty edge rows and columns go.
 */
function placeZones(zones: Zone[], cols: number): { zones: Zone[]; cols: number; rows: number } {
  const taken = new Set<string>();
  const fits = (c: number, r: number, w: number, h: number) => {
    if (c + w > cols) return false;
    for (let y = r; y < r + h; y++) for (let x = c; x < c + w; x++) if (taken.has(`${x},${y}`)) return false;
    return true;
  };
  const take = (c: number, r: number, w: number, h: number) => {
    for (let y = r; y < r + h; y++) for (let x = c; x < c + w; x++) taken.add(`${x},${y}`);
  };
  const seek = (c: number, r: number, w: number, h: number) => {
    for (let i = r * cols + c; ; i++) {
      const x = i % cols;
      const y = Math.floor(i / cols);
      if (fits(x, y, w, h)) return [x, y];
    }
  };
  const cells = new Map<string, number>();
  for (const z of zones) for (let y = z.row; y < z.row + z.h; y++) for (let x = z.col; x < z.col + z.w; x++) cells.set(`${x},${y}`, (cells.get(`${x},${y}`) ?? 0) + 1);
  const clashing = zones.filter((z) => {
    for (let y = z.row; y < z.row + z.h; y++) for (let x = z.col; x < z.col + z.w; x++) if ((cells.get(`${x},${y}`) ?? 0) > 1) return true;
    return false;
  }).length;
  const reflow = clashing > zones.length / 4;
  const placed = zones.map((z) => {
    const w = Math.min(z.w, cols);
    const [col, row] = reflow ? seek(0, 0, w, z.h) : fits(z.col, z.row, w, z.h) ? [z.col, z.row] : seek(z.col, z.row, w, z.h);
    take(col, row, w, z.h);
    return { ...z, col, row, w };
  });
  const c0 = Math.min(...placed.map((z) => z.col));
  const r0 = Math.min(...placed.map((z) => z.row));
  const c1 = Math.max(...placed.map((z) => z.col + z.w));
  const r1 = Math.max(...placed.map((z) => z.row + z.h));
  return { zones: placed.map((z) => ({ ...z, col: z.col - c0, row: z.row - r0 })), cols: c1 - c0, rows: r1 - r0 };
}

function ZonePlan({ cols: gridCols, zones: given, label, labels }: { cols: number; rows: number; zones: Zone[]; label?: string; labels?: Partial<Record<Zone["state"], string>> }) {
  const { zones, cols, rows } = placeZones(given, gridCols);
  // Without names for the states, a state takes the word its zones all end on ("1.1 mm/s · Good").
  const shared = (st: Zone["state"]) => {
    const ends = zones.filter((z) => z.state === st).map((z) => z.meta?.split("·").pop()?.trim());
    const first = ends[0];
    return first && !first.endsWith("…") && /^[A-Za-z][A-Za-z -]{1,15}$/.test(first) && ends.every((e) => e === first) ? first : undefined;
  };
  const word = (st: Zone["state"]) => labels?.[st] ?? shared(st) ?? ZONE_STATE[st].word;
  const states = (Object.keys(ZONE_STATE) as Zone["state"][]).filter((st) => zones.some((z) => z.state === st));
  const legend = (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
      {states.map((st) => (
        <li key={st} className="flex items-center gap-1.5">
          <span aria-hidden="true" className={cn("size-3 rounded-[3px]", ZONE_STATE[st].swatch)} />
          {word(st)} <span className="font-mono tabular-nums">{zones.filter((z) => z.state === st).length}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <figure className="@container/plan flex flex-col gap-3">
      <ul
        aria-label={label ?? "Plan"}
        className="hidden gap-1.5 @md/plan:grid"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${rows}, minmax(3.25rem, auto))` }}
      >
        {zones.map((z, i) => (
          <li
            key={i}
            aria-label={`${z.label}${z.meta ? `, ${z.meta}` : ""}: ${word(z.state)}`}
            className={cn("flex min-w-0 flex-col justify-between rounded-md border p-2", ZONE_STATE[z.state].tile)}
            style={{ gridColumn: `${z.col + 1} / span ${z.w}`, gridRow: `${z.row + 1} / span ${z.h}` }}
          >
            <span className="truncate text-xs font-medium">{z.label}</span>
            {z.meta && <span className="truncate font-mono text-[10px] opacity-80">{z.meta}</span>}
          </li>
        ))}
      </ul>
      <ul aria-label={label ?? "Plan"} className="flex flex-col divide-y divide-border @md/plan:hidden">
        {zones.map((z, i) => (
          <li key={i} className="flex items-center gap-2.5 py-2 text-sm">
            <span aria-hidden="true" className={cn("size-3 shrink-0 rounded-[3px]", ZONE_STATE[z.state].swatch)} />
            <span className="min-w-0 flex-1 truncate text-foreground">{z.label}</span>
            {z.meta && <span className="shrink-0 font-mono text-xs text-muted-foreground">{z.meta}</span>}
            {/* The state, unless the reading already ends with it ("1.1 mm/s · Good"). */}
            {z.meta?.split("·").pop()?.trim() !== word(z.state) && <span className="shrink-0 text-xs text-muted-foreground">{word(z.state)}</span>}
          </li>
        ))}
      </ul>
      {states.length > 1 && legend}
      {label && <figcaption className="text-xs text-muted-foreground">{label}</figcaption>}
    </figure>
  );
}

type GraphNode = { label: string; meta?: string; col: number; row: number; state: "origin" | "impacted" | "saturated" | "neutral" };

const GRAPH_ROW = 76;

const NODE_STATE: Record<GraphNode["state"], string> = {
  origin: "border-transparent bg-primary-strong text-primary-foreground shadow-[0_0_28px_-6px_color-mix(in_oklch,var(--primary)_70%,transparent)]",
  impacted: "border-primary bg-card text-foreground",
  saturated: "border-destructive bg-[color-mix(in_oklch,var(--destructive)_10%,var(--card))] text-destructive",
  neutral: "border-border bg-card text-muted-foreground",
};

/**
 * A small node map (a service call graph, a dependency chain): nodes on a
 * grid of cells, joined by curves; the origin lit with the brand and a glow,
 * the impacted path in the brand, saturated nodes in red. Hovering a node
 * dims the rest. Screen readers get the nodes and their links as a list.
 */
function NodeGraph({ cols: gridCols, rows: gridRows, nodes: placed, edges, label, fill }: { cols: number; rows: number; nodes: GraphNode[]; edges: { from: number; to: number }[]; label?: string; fill?: boolean }) {
  // Empty rows and columns at the edges only shrink the nodes: the map spans the cells it uses.
  const c0 = placed.length ? Math.min(...placed.map((n) => n.col)) : 0;
  const r0 = placed.length ? Math.min(...placed.map((n) => n.row)) : 0;
  const cols = placed.length ? Math.max(...placed.map((n) => n.col)) - c0 + 1 : gridCols;
  const rows = placed.length ? Math.max(...placed.map((n) => n.row)) - r0 + 1 : gridRows;
  const nodes = placed.map((n) => ({ ...n, col: n.col - c0, row: n.row - r0 }));
  const w = cols * 100;
  const h = rows * GRAPH_ROW;
  const at = (n: GraphNode) => ({ x: (n.col + 0.5) * 100, y: (n.row + 0.5) * GRAPH_ROW });
  const left = (n: GraphNode) => `${((n.col + 0.5) / cols) * 100}%`;
  // Rows by share, so a map that fills a tall card spreads out evenly.
  const top = (n: GraphNode) => `${((n.row + 0.5) / rows) * 100}%`;
  const origin = nodes.find((n) => n.state === "origin");
  const lit = (n: GraphNode) => n.state !== "neutral";
  // Four columns or more take smaller nodes, so the map still fits a 5/12 card.
  const dense = cols >= 4;
  return (
    <figure className={cn("group/graph relative -mx-1 flex min-w-0 flex-col overflow-x-auto px-1", fill && "grow")}>
      {/* Each column keeps room for a service name; a narrow card scrolls the map sideways rather than cutting names off. */}
      {/* In a card taller than the map, its rows spread out to fill the card, so no gap opens above or below it. */}
      <div aria-hidden="true" className="relative w-full flex-1" style={{ minHeight: h, maxHeight: fill ? undefined : h, minWidth: `${cols * (dense ? 5.1 : 6)}rem` }}>
        {origin && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <span
              className="absolute size-72 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ left: left(origin), top: top(origin), background: "radial-gradient(closest-side, color-mix(in oklch, var(--primary) 20%, transparent), transparent)" }}
            />
            {[10, 16].map((r) => (
              <span key={r} className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/70" style={{ left: left(origin), top: top(origin), width: `${r}rem`, height: `${r}rem` }} />
            ))}
          </div>
        )}
        <svg className="absolute inset-0 size-full overflow-visible" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
          {edges.map(({ from, to }, i) => {
            const a = at(nodes[from]);
            const b = at(nodes[to]);
            const mx = (a.x + b.x) / 2;
            const my = (a.y + b.y) / 2;
            // Across a row: an S-curve; down a column: one bend.
            const d = a.x === b.x || a.y === b.y ? `M${a.x} ${a.y} L${b.x} ${b.y}` : Math.abs(b.x - a.x) >= 100 ? `M${a.x} ${a.y} C${mx} ${a.y} ${mx} ${b.y} ${b.x} ${b.y}` : `M${a.x} ${a.y} C${a.x} ${my} ${b.x} ${my} ${b.x} ${b.y}`;
            const hot = lit(nodes[from]) && lit(nodes[to]);
            const red = hot && (nodes[from].state === "saturated" || nodes[to].state === "saturated");
            return <path key={i} d={d} fill="none" vectorEffect="non-scaling-stroke" strokeWidth={hot ? 1.5 : 1} style={{ stroke: red ? "var(--destructive)" : hot ? "var(--primary-mark, var(--primary))" : "var(--border)" }} />;
          })}
        </svg>
        {/* Nodes are small two-line boxes: their corners stop at 10px, so a round theme never cuts their names. */}
        {nodes.map((n, i) => (
          <div
            key={i}
            data-node=""
            className={cn(
              "absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-[min(var(--radius-md),10px)] border py-1.5 text-center font-mono transition-opacity duration-150 group-has-[[data-node]:hover]/graph:[&:not(:hover)]:opacity-35",
              dense ? "px-0.5" : "px-1.5",
              NODE_STATE[n.state],
            )}
            title={n.label}
            style={{ left: left(n), top: top(n), width: `calc(${100 / cols}% - ${dense ? 6 : 8}px)`, maxWidth: "10rem" }}
          >
            <span className={cn("w-full truncate leading-4 font-semibold", dense ? "text-[10px] tracking-tighter" : "text-[10.5px] tracking-tight")}>{n.label}</span>
            {n.meta && <span className={cn("w-full truncate leading-4 opacity-80", dense ? "text-[9.5px]" : "text-[10px]")}>{n.meta}</span>}
          </div>
        ))}
      </div>
      <figcaption className="sr-only">
        {label ?? "Map"}
        <ul>
          {nodes.map((n, i) => {
            const to = edges.filter((e) => e.from === i).map((e) => nodes[e.to].label);
            return (
              <li key={i}>
                {n.label}
                {n.meta && `, ${n.meta}`}
                {n.state !== "neutral" && `, ${n.state}`}
                {to.length > 0 && `, links to ${to.join(", ")}`}
              </li>
            );
          })}
        </ul>
      </figcaption>
    </figure>
  );
}

// --- screen states: how a data section looks before and around its data ------------

/**
 * ready: the content. empty: nothing there yet (first use). no-results: a
 * search or filter matched nothing. loading: skeletons shaped like the
 * content. error: it failed to load, with a retry.
 */
export type ScreenState = "ready" | "empty" | "no-results" | "loading" | "error";

/** What a section shows, which shapes its loading skeleton and empty copy. */
export type StateKind = "table" | "chart" | "stats" | "list" | "board" | "calendar" | "cards";

const SCREEN_STATE_IDS: readonly ScreenState[] = ["ready", "empty", "no-results", "loading", "error"];

const ScreenStateContext = React.createContext<ScreenState | null>(null);

/** Shows every SectionState inside in one state: Studio's state switch, or a test page. */
function ScreenStates({ state, children }: { state: ScreenState; children: React.ReactNode }) {
  return <ScreenStateContext.Provider value={state}>{children}</ScreenStateContext.Provider>;
}

// Without a provider or a state prop, ?state=loading (empty, no-results, error) in the address previews a state.
const subscribeUrl = (on: () => void) => {
  window.addEventListener("popstate", on);
  return () => window.removeEventListener("popstate", on);
};

const urlState = (): ScreenState => {
  const v = new URLSearchParams(window.location.search).get("state");
  return SCREEN_STATE_IDS.find((s) => s === v) ?? "ready";
};

/** "Upcoming bookings" -> "bookings": what a section's records are called, for its states' copy. */
function thingsOf(title: string): string {
  const last = title.trim().split(/\s+/).at(-1)?.toLowerCase() ?? "";
  return /^[a-z]{3,}s$/.test(last) && !last.endsWith("ss") ? last : "results";
}

/** Skeletons in the shape of what's loading, so the page doesn't jump when it arrives. */
function StateSkeleton({ kind }: { kind: StateKind }) {
  if (kind === "chart") {
    return (
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex min-h-48 flex-1 items-end gap-2">
          {[48, 70, 56, 84, 62, 90, 74, 58].map((h, i) => (
            <Skeleton key={i} className="flex-1 rounded-b-none" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="flex justify-between gap-2">
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} className="h-2.5 w-8" />
          ))}
        </div>
      </div>
    );
  }
  if (kind === "board") {
    return (
      <div className="grid flex-1 gap-3 @md:grid-cols-3">
        {[3, 2, 2].map((n, c) => (
          <div key={c} className="flex flex-col gap-2.5 rounded-lg bg-muted/40 p-2.5">
            <Skeleton className="h-3 w-20" />
            {Array.from({ length: n }, (_, i) => (
              <div key={i} className="flex flex-col gap-2 rounded-md border border-border bg-card p-3">
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="h-2.5 w-1/2" />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
  if (kind === "calendar") {
    return (
      <div className="grid flex-1 grid-cols-7 gap-1.5">
        {Array.from({ length: 35 }, (_, i) => (
          <Skeleton key={i} className="aspect-square min-h-6" />
        ))}
      </div>
    );
  }
  if (kind === "cards") {
    return (
      <div className="grid flex-1 gap-4 @md:grid-cols-2 @3xl:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="flex flex-col gap-2.5">
            <Skeleton className="aspect-[4/3] w-full rounded-lg" />
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-2.5 w-1/2" />
          </div>
        ))}
      </div>
    );
  }
  // Tables and lists: rows with an avatar, two lines and a value.
  const rows = kind === "table" ? 6 : 4;
  return (
    <div className="flex flex-col divide-y divide-foreground/10">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex items-center gap-3 py-3 first:pt-0">
          <Skeleton className="size-8 shrink-0 rounded-full" />
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <Skeleton className="h-3" style={{ width: `${[62, 48, 70, 54, 66, 44][i % 6]}%` }} />
            <Skeleton className="h-2.5" style={{ width: `${[34, 40, 28, 38, 30, 36][i % 6]}%` }} />
          </div>
          {kind === "table" && <Skeleton className="hidden h-5 w-16 rounded-full @md:block" />}
          <Skeleton className="h-3 w-12" />
        </div>
      ))}
    </div>
  );
}

/**
 * A data section in one of its screen states. Ready shows the section itself;
 * the others draw a card in its place: skeletons while loading, what's
 * missing and what to do when empty or filtered to nothing, and a retry
 * when it failed. The state comes from `state` (wire it to your data), else
 * from <ScreenStates>, else from ?state= in the address.
 */
function SectionState({
  kind,
  title,
  action,
  filterable = false,
  state: given,
  onAction,
  onClearFilters,
  onRetry,
  children,
}: {
  kind: StateKind;
  title: string;
  /** The section's main button ("New booking"), offered when it's empty. */
  action?: string;
  /** It has a search, filters or status tabs, so it can come up with no results. */
  filterable?: boolean;
  state?: ScreenState;
  onAction?: () => void;
  onClearFilters?: () => void;
  onRetry?: () => void;
  children: React.ReactNode;
}) {
  const shown = React.useContext(ScreenStateContext);
  const fromUrl = React.useSyncExternalStore(subscribeUrl, urlState, () => "ready" as const);
  const raw = given ?? shown ?? fromUrl;
  // A section with nothing to filter can't come up empty-handed from a filter: it stays as it is.
  const state = raw === "no-results" && !filterable ? "ready" : raw;
  if (state === "ready") return <>{children}</>;

  const things = thingsOf(title);
  const lower = title.charAt(0).toLowerCase() + title.slice(1);
  const measured = kind === "chart" || kind === "stats";
  const copy: Record<Exclude<ScreenState, "ready" | "loading">, { icon: React.ReactNode; title: string; text: string; button?: React.ReactNode }> = {
    empty: {
      icon: measured ? <ChartColumn className="size-6" /> : kind === "calendar" ? <CalendarX2 className="size-6" /> : <Inbox className="size-6" />,
      title: measured ? "No data yet" : kind === "calendar" ? "Nothing scheduled" : `No ${lower} yet`,
      text: measured ? `${title} fills in once there's activity to count.` : kind === "calendar" ? "Events show up here as soon as they're booked." : "They'll show up here as soon as there are any.",
      button: action ? (
        <Button size="sm" onClick={onAction}>
          <Plus />
          {action}
        </Button>
      ) : undefined,
    },
    "no-results": {
      icon: <SearchX className="size-6" />,
      title: `No ${things} match`,
      text: "Try another search, or clear the filters to see everything.",
      button: (
        <Button size="sm" variant="outline" onClick={onClearFilters}>
          Clear filters
        </Button>
      ),
    },
    error: {
      icon: <TriangleAlert className="size-6" />,
      title: `${title} didn't load`,
      text: "Something went wrong on our side. Try again in a moment.",
      button: (
        <Button size="sm" variant="outline" onClick={onRetry}>
          <RefreshCw />
          Try again
        </Button>
      ),
    },
  };

  if (state === "loading" && kind === "stats") {
    return (
      <div role="status" className="grid gap-4 @md:grid-cols-2 @3xl:grid-cols-4">
        <span className="sr-only">Loading {lower}</span>
        {Array.from({ length: 4 }, (_, i) => (
          <Card key={i} className="flex flex-col gap-3 p-5">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-7 w-28" />
            <Skeleton className="h-2.5 w-20" />
          </Card>
        ))}
      </div>
    );
  }
  if (state === "loading") {
    return (
      <Card role="status" className="flex h-full flex-col">
        <CardHeader title={title} />
        <CardContent className="flex flex-1 flex-col">
          <span className="sr-only">Loading {lower}</span>
          <StateSkeleton kind={kind} />
        </CardContent>
      </Card>
    );
  }
  const c = copy[state];
  return (
    <Card className="flex h-full flex-col">
      {kind !== "stats" && <CardHeader title={title} />}
      <CardContent className="flex flex-1 flex-col justify-center">
        {/* An error is announced as it happens; the empty states are just there. */}
        <div role={state === "error" ? "alert" : undefined} className={cn("flex flex-col justify-center", kind === "stats" ? "min-h-28" : "min-h-56")}>
          <EmptyState icon={c.icon} title={c.title} description={c.text} action={c.button} className={kind === "stats" ? "gap-3 py-6" : "py-8"} />
        </div>
      </CardContent>
    </Card>
  );
}

// --- overlays: what the page's buttons open ----------------------------------------

/** A dialog, drawer, alert or popover; "{name}"-style blanks are filled from where it opened. */
type OverlaySpec = {
  /** "dialog", "drawer", "alert" or "popover"; anything else shows as a dialog. */
  kind: string;
  title: string;
  description?: string;
  body?: Part;
  /** The main button; without one, the overlay only shows things. */
  action?: string;
  /** Said in a toast after the main button. */
  toast?: string;
  /** The toast's tone: "success" (the default), "info" or "error". A string, like size, so plain overlay data type-checks. */
  toastTone?: string;
  /** An alert's word to type before its button works ("DELETE", "{name}"). */
  confirm?: string;
  /** A dialog's width: "sm", md (the default) or "lg". A string, so a page's plain overlay data type-checks. */
  size?: string;
};

/** Fills "{Column}" blanks from the record an overlay opened for; without one, "{name}'s" reads "this". */
function fillText(text: string, vars?: Record<string, string>) {
  if (vars) return text.replace(/\{([^{}]{1,32})\}/g, (m, key: string) => vars[key] ?? m);
  return text.replace(/\{name\}'s/g, "this").replace(/\{name\}/g, "this one").replace(/\{[^{}]{1,32}\}/g, "—");
}

function fillPart(part: Part, vars?: Record<string, string>): Part {
  return Object.fromEntries(
    Object.entries(part).map(([k, v]) => [
      k,
      typeof v === "string" && k !== "type" ? fillText(v, vars) : Array.isArray(v) ? v.map((x) => (typeof x === "string" ? fillText(x, vars) : x && typeof x === "object" ? fillPart(x as Part, vars) : x)) : v,
    ]),
  ) as Part;
}

const PHONE = "(max-width: 639px)";

/** Phones get bottom sheets instead of centered dialogs and side drawers. */
function usePhone() {
  return React.useSyncExternalStore(
    (on) => {
      const m = window.matchMedia(PHONE);
      m.addEventListener("change", on);
      return () => m.removeEventListener("change", on);
    },
    () => window.matchMedia(PHONE).matches,
    () => false,
  );
}

/**
 * The page's overlays. Wrap the page frame in it: buttons wired with
 * SectionLinks `opens` open them, ⌘K lists them, and the main button of
 * each closes it and confirms with a toast. Focus returns to the button
 * that opened it. `show` keeps one open (the Studio, while it's edited).
 */
function PageOverlays({
  overlays,
  show,
  onClose,
  children,
}: {
  overlays: OverlaySpec[];
  show?: number | null;
  onClose?: () => void;
  children: React.ReactNode;
}) {
  const [opened, setOpened] = React.useState<{ index: number; trigger: HTMLElement | null; vars?: Record<string, string> } | null>(null);
  const [toast, setToast] = React.useState<{ text: string; undo: boolean; key: number; tone: "success" | "info" | "error" } | null>(null);
  const open = React.useCallback<OverlayApi["open"]>((index, trigger, vars) => setOpened({ index, trigger, vars }), []);
  const api = React.useMemo<OverlayApi>(() => ({ items: overlays.map((o) => ({ kind: o.kind, title: o.title })), open }), [overlays, open]);
  const current = show != null && overlays[show] ? { index: show, trigger: null, vars: undefined } : opened && overlays[opened.index] ? opened : null;

  React.useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 6000);
    return () => window.clearTimeout(t);
  }, [toast]);

  const close = () => {
    setOpened(null);
    onClose?.();
  };
  const done = () => {
    const o = current && overlays[current.index];
    close();
    if (o?.toast) setToast({ text: fillText(o.toast, current?.vars), undo: o.kind === "alert" && !o.confirm && o.toastTone !== "error", key: Date.now(), tone: o.toastTone === "info" || o.toastTone === "error" ? o.toastTone : "success" });
  };

  return (
    <OverlayContext.Provider value={api}>
      {children}
      {current && (
        <OverlayView
          key={`${current.index}-${show ?? ""}`}
          overlay={overlays[current.index]}
          trigger={current.trigger}
          // Shown for editing, it sits by the first button wired to it.
          anchor={show != null ? `[data-overlay="${show}"]` : undefined}
          vars={current.vars}
          onClose={close}
          onDone={done}
        />
      )}
      <div aria-live="polite" className="pointer-events-none fixed right-4 bottom-4 left-4 z-[60] flex justify-end sm:left-auto">
        {toast && (
          <Toast key={toast.key} variant={toast.tone} onDismiss={() => setToast(null)} className="pointer-events-auto max-w-sm">
            <span className="flex items-center justify-between gap-3">
              {toast.text}
              {toast.undo && (
                <Button size="sm" variant="outline" className="h-7" onClick={() => setToast(null)}>
                  Undo
                </Button>
              )}
            </span>
          </Toast>
        )}
      </div>
    </OverlayContext.Provider>
  );
}

/** One overlay, drawn with the kit's dialog, sheet, drawer, alert dialog or popover. */
function OverlayView({
  overlay,
  trigger,
  anchor,
  vars,
  onClose,
  onDone,
}: {
  overlay: OverlaySpec;
  trigger: HTMLElement | null;
  /** Without a trigger: a selector for the element a popover sits by. */
  anchor?: string;
  vars?: Record<string, string>;
  onClose: () => void;
  onDone: () => void;
}) {
  const phone = usePhone();
  const descriptionId = React.useId();
  const confirmId = React.useId();
  const [typed, setTyped] = React.useState("");
  // A form that's sent with problems says which fields, at the top, each a link to its field.
  const form = React.useRef<HTMLDivElement>(null);
  const [problems, setProblems] = React.useState<{ id: string; label: string }[]>([]);
  const summaryRef = React.useRef<HTMLDivElement>(null);
  const submit = () => {
    const fields = [...(form.current?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea") ?? [])];
    const bad = fields.filter((f) => !f.checkValidity()).map((f) => ({ id: f.id, label: f.labels?.[0]?.textContent?.replace(/\*$/, "").trim() || "A field" }));
    setProblems(bad);
    if (bad.length) requestAnimationFrame(() => summaryRef.current?.focus());
    else onDone();
  };
  const summary = problems.length ? (
    <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm outline-none">
      <p className="font-medium text-foreground">{problems.length === 1 ? "1 field needs attention" : `${problems.length} fields need attention`}</p>
      <ul className="mt-1.5 flex flex-col gap-1">
        {problems.map((p) => (
          <li key={p.id}>
            <button type="button" className="text-destructive underline underline-offset-2" onClick={() => document.getElementById(p.id)?.focus()}>
              {p.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
  const title = fillText(overlay.title, vars);
  const description = overlay.description ? fillText(overlay.description, vars) : undefined;
  const body = overlay.body ? <PartView part={fillPart(overlay.body, vars)} /> : null;
  // Closing a form someone has typed in asks first; sending it doesn't.
  const unsaved = useUnsaved(title);
  const [asking, setAsking] = React.useState(false);
  const close = () => (unsaved.dirty ? setAsking(true) : onClose());
  const onOpenChange = (open: boolean) => {
    if (!open) close();
  };
  const discard = (
    <ConfirmDiscard
      open={asking}
      title="Discard changes?"
      description={`What you entered in ${title} will be lost.`}
      discardLabel="Discard"
      onKeep={() => setAsking(false)}
      onDiscard={onClose}
    />
  );
  // Back to the button that opened it (it isn't a Radix trigger, so say so).
  const onCloseAutoFocus = (e: Event) => {
    if (trigger?.isConnected) {
      e.preventDefault();
      trigger.focus();
    }
  };
  const describedBy = description ? { "aria-describedby": descriptionId } : { "aria-describedby": undefined };
  // Straight to the first field, when there is one (else Radix picks the first button).
  const onOpenAutoFocus = (e: Event) => {
    const field = (e.currentTarget as HTMLElement | null)?.querySelector<HTMLElement>("input, select, textarea, [role='combobox']");
    if (field) {
      e.preventDefault();
      field.focus();
    }
  };
  const intro = description && (
    <p id={descriptionId} className="text-sm text-muted-foreground">
      {description}
    </p>
  );
  const buttons = (
    <>
      <Button variant="ghost" onClick={close}>
        {overlay.action ? "Cancel" : "Close"}
      </Button>
      {overlay.action && <Button onClick={submit}>{fillText(overlay.action, vars)}</Button>}
    </>
  );

  if (overlay.kind === "alert") {
    const word = overlay.confirm ? fillText(overlay.confirm, vars) : null;
    return (
      <AlertDialog open onOpenChange={onOpenChange}>
        <AlertDialogContent
          title={title}
          description={description}
          onCloseAutoFocus={onCloseAutoFocus}
          // With a word to type, straight to its field.
          {...(word && { onOpenAutoFocus })}
          {...(description ? {} : { "aria-describedby": undefined })}
        >
          {body && <div className="pt-2 text-sm">{body}</div>}
          {word && (
            // Something big goes for good: typing its name first makes it a choice, not a slip.
            <Field label={`Type ${word} to confirm`} htmlFor={confirmId} className="pt-2">
              <Input id={confirmId} value={typed} onChange={(e) => setTyped(e.target.value)} autoComplete="off" spellCheck={false} />
            </Field>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Go back</AlertDialogCancel>
            <AlertDialogAction variant="destructive" disabled={Boolean(word) && typed.trim() !== word} onClick={onDone}>
              {fillText(overlay.action ?? "Confirm", vars)}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  if (overlay.kind === "popover" && (trigger?.isConnected || anchor)) {
    // Looked up when the popover is placed, so a button that renders in the same update is found.
    const by = { getBoundingClientRect: () => (trigger ?? document.querySelector(anchor!))?.getBoundingClientRect() ?? new DOMRect() };
    return (
      <Popover open onOpenChange={onOpenChange}>
        <PopoverAnchor virtualRef={{ current: by }} />
        <PopoverContent align="start" role="dialog" aria-label={title} onOpenAutoFocus={onOpenAutoFocus} onCloseAutoFocus={onCloseAutoFocus} className="flex flex-col gap-3">
          <p className="font-heading text-sm font-semibold text-foreground">{title}</p>
          {intro}
          {body}
          {overlay.action && (
            <Button size="sm" className="self-end" onClick={onDone}>
              {fillText(overlay.action, vars)}
            </Button>
          )}
        </PopoverContent>
      </Popover>
    );
  }

  if (phone || overlay.kind === "popover") {
    return (
      <Drawer open onOpenChange={onOpenChange}>
        <DrawerContent title={title} description={description} onOpenAutoFocus={onOpenAutoFocus} onCloseAutoFocus={onCloseAutoFocus} {...(description ? {} : { "aria-describedby": undefined })}>
          {body && (
            <DrawerBody>
              <div ref={form} className="flex flex-col gap-4" {...unsaved.handlers}>
                {summary}
                {body}
              </div>
            </DrawerBody>
          )}
          <DrawerFooter>{buttons}</DrawerFooter>
          {discard}
        </DrawerContent>
      </Drawer>
    );
  }

  if (overlay.kind === "drawer") {
    return (
      <Sheet open onOpenChange={onOpenChange}>
        <SheetContent title={title} onOpenAutoFocus={onOpenAutoFocus} onCloseAutoFocus={onCloseAutoFocus} {...describedBy}>
          <SheetBody className="flex flex-col gap-4">
            {intro}
            <div ref={form} className="flex flex-col gap-4" {...unsaved.handlers}>
              {summary}
              {body}
            </div>
          </SheetBody>
          <SheetFooter>{buttons}</SheetFooter>
          {discard}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent title={title} size={overlay.size === "sm" || overlay.size === "lg" ? overlay.size : undefined} onOpenAutoFocus={onOpenAutoFocus} onCloseAutoFocus={onCloseAutoFocus} {...describedBy}>
        <DialogBody className="flex flex-col gap-4 text-foreground">
          {intro}
          <div ref={form} className="flex flex-col gap-4" {...unsaved.handlers}>
            {summary}
            {body}
          </div>
        </DialogBody>
        <DialogFooter>{buttons}</DialogFooter>
        {discard}
      </DialogContent>
    </Dialog>
  );
}

export {
  SectionState,
  PageOverlays,
  LinkListCard,
  BoardBlock,
  PageHeaderBlock,
  StatRow,
  AreaChartCard,
  BarChartCard,
  DataTableCard,
  SettingsFormCard,
  ToggleListCard,
  AttentionListCard,
  AgendaCard,
  BreakdownCard,
  LeaderboardCard,
  KeyValueCard,
  HeatmapCard,
  FunnelCard,
  CalendarCard,
  ScheduleCard,
  TimelineBlock,
  FilterBarBlock,
};
