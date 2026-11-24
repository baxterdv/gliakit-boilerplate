"use client";

import * as React from "react";
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  BookOpen,
  Calendar,
  ChevronDown,
  CreditCard,
  FolderOpen,
  Home,
  Image as ImageIcon,
  Inbox,
  LayoutDashboard,
  LogOut,
  ListChecks,
  Menu,
  Plus,
  Search,
  Building2,
  CircleHelp,
  Clock,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  ShoppingBag,
  Smile,
  Sparkles,
  Timer,
  Truck,
  Users,
  X,
  Zap,
  Check as CheckIcon,
  UserRound,
  SunMoon,
  AtSign,
  Info as InfoIcon,
  Command,
  MessageCircle,
  ArrowUp,
  ThumbsUp,
  ThumbsDown,
  Copy,
  LayoutTemplate,
  Palette,
  PenTool,
  Clapperboard,
  Music,
  Blocks,
  Compass,
  Star,
  Trash2,
  Share2,
  GraduationCap,
  Wallet,
  MapPin,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/app/theme-toggle";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Sparkline } from "@/components/ui/chart";
import { CommandPalette, openCommandPalette, type CommandItem } from "@/components/ui/command";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useTheme } from "next-themes";
import { Sheet, SheetBody, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogBody, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Field, Input, Textarea } from "@/components/ui/input";
import { Toast } from "@/components/ui/toast";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

/*
  Page frames for Studio pages. Apps: eighteen navigation layouts (sidebar,
  inset, labelled icon rail with top bar, dual, top bar, header + tabs,
  floating pill, dock, sidebar + dock, pills, outlined pills, pills + tool
  rail, icons only, rail + side panel, profile sidebar, captioned rail,
  header + docked panel, and four panes).
  Sites: four header layouts. Every frame leaves the page background to
  <body> so theme backdrops show through, marks its navigation with
  data-slot="app-nav" so surface effects style it, and wraps each section
  in a size container so blocks lay out by the space they get.
*/

type AppLayout =
  | "sidebar"
  | "inset"
  | "rail"
  | "dual"
  | "topbar"
  | "tabs"
  | "floating"
  | "dock"
  | "sidedock"
  | "pills"
  | "capsules"
  | "toolrail"
  | "icons"
  | "panel"
  | "profile"
  | "captions"
  | "docked"
  | "workspace";
/** A page's composition: rows of cards, or a record's detail page (PAGE_FRAMES in types.ts). */
type PageFrame = "grid" | "detail" | "fill" | "settings" | "focus" | "split" | "board";

/** Optional app shell extras: nav counts, link groups, the team, a promo card, a search bar. */
export interface Shell {
  role?: string;
  search?: string;
  badges?: Record<string, string>;
  groups?: { title: string; items: string[] }[];
  team?: { name: string; role?: string }[];
  promo?: { title: string; text?: string; action?: string };
  /** The workspace, team or location switcher in the top bar. */
  workspace?: { name: string; meta?: string };
  /** Other workspaces in the switcher, under the current one. */
  workspaces?: { name: string; meta?: string }[];
  /** The bell's panel: mentions, assignments, system and billing notices, newest first. */
  notifications?: { title: string; detail?: string; time: string; kind?: "mention" | "assignment" | "system" | "billing"; unread?: boolean }[];
  /** Top-bar buttons: ask the AI, create, a date range, the theme, help. */
  actions?: ("ai" | "new" | "range" | "theme" | "help")[];
  /** Headings in the sidebar before the named pages. */
  headings?: Record<string, string>;
  /** Each page's header tabs listed under it in the sidebar, the open page's expanded. */
  nested?: true;
  /** The tab names under each nav label (Studio derives it per page). */
  subpages?: Record<string, string[]>;
  /** The sidebar composed for this product (sidebar and inset layouts). */
  sidebar?: {
    tone?: "card" | "tinted" | "inverse" | "brand" | "canvas" | "glass" | "gradient";
    width?: "narrow" | "regular" | "wide";
    nav?: "list" | "pills" | "boxed" | "minimal" | "tree" | "bar" | "brand" | "ink" | "dot";
    /** How the sidebar meets the page: a line (the default), nothing, a soft shadow, or floating. */
    edge?: "line" | "none" | "shadow" | "float";
    parts?: SidebarPart[];
  };
  /** The top bar: a line under it (the default), plain, frosted, the brand, dark, or floating. */
  topbar?: "line" | "plain" | "blur" | "brand" | "inverse" | "float";
}
type SidebarPart =
  | "brand"
  | "workspace"
  | "search"
  | "nav"
  | "groups"
  | "team"
  | "promo"
  | "user"
  | "divider"
  | { type: "stat"; label: string; value: string; progress?: number; points?: number[]; note?: string }
  | { type: "button"; text: string; icon?: boolean }
  | { type: "links"; items: string[] }
  | { type: "note"; text: string; links?: { label: string; href: string }[] };

// The shell extras and the side column reach every layout's parts through
// context, so each of the nine layouts doesn't thread them by hand.
const ShellContext = React.createContext<{ shell: Shell; aside?: React.ReactNode; list?: React.ReactNode; frame?: PageFrame; current: number; links?: string[]; onPage?: (index: number) => void; mobileTabs?: boolean }>({ shell: {}, current: 0 });

/** What ⌘K can find on the page besides pages and actions: records and people, registered by the sections that show them. */
type SearchEntry = { group: "Records" | "People"; label: string; detail?: string };
const SearchIndexContext = React.createContext<{ add: (key: string, entries: SearchEntry[]) => void; remove: (key: string) => void } | null>(null);

/** Lets ⌘K find what a section shows (its records, its people) while it's on the page. */
function useSearchable(key: string, entries: SearchEntry[]) {
  const index = React.useContext(SearchIndexContext);
  const signature = JSON.stringify(entries);
  React.useEffect(() => {
    if (!index) return;
    index.add(key, JSON.parse(signature) as SearchEntry[]);
    return () => index.remove(key);
  }, [index, key, signature]);
}

/**
 * Nav links: which one is the current page, and where each goes (the
 * app's routes; "#" for pages without one). data-nav-index lets the
 * Studio preview move between pages.
 */
function useLinks() {
  const { current, links } = React.useContext(ShellContext);
  return {
    current,
    isCurrent: (i: number) => i === current,
    link: (i: number) => ({ href: links?.[i] ?? "#", "aria-current": i === current ? ("page" as const) : undefined, "data-nav-index": i }),
  };
}
/**
 * The page's overlays (dialogs, drawers, alerts, popovers), as PageOverlays
 * provides them: their titles for the command menu, and a way to open one.
 * `vars` fills "{name}"-style blanks in its text, e.g. from a table row.
 */
interface OverlayApi {
  items: { kind: string; title: string }[];
  open: (index: number, trigger: HTMLElement | null, vars?: Record<string, string>) => void;
}
const OverlayContext = React.createContext<OverlayApi>({ items: [], open: () => {} });

/**
 * Where one section's links and buttons go: slot -> page index, set with
 * "Interactions" in the Studio, or slot -> one of the page's overlays.
 * Slots wired to neither go nowhere ("#").
 */
const SectionLinksContext = React.createContext<{ to: Record<string, number>; opens: Record<string, number> }>({ to: {}, opens: {} });

function SectionLinks({ to = {}, opens = {}, children }: { to?: Record<string, number>; opens?: Record<string, number>; children: React.ReactNode }) {
  const value = React.useMemo(() => ({ to, opens }), [to, opens]);
  return <SectionLinksContext.Provider value={value}>{children}</SectionLinksContext.Provider>;
}

/**
 * What a slot does when activated, for controls that aren't links (menu
 * items, row names): opens its overlay or goes to its page; undefined when
 * it's wired to neither.
 */
/**
 * What any control in the app can do without its own wiring: confirm with a
 * notice at the bottom, or go to one of the app's pages by name. AppFrame and
 * SiteFrame provide it; a button no one has wired still answers its click.
 */
type NoticeTone = "success" | "info" | "error";
const AppActionsContext = React.createContext<{ notify: (text: string, tone?: NoticeTone) => void; go: (name: string) => boolean; confirm: (label: string, run: () => void) => void; nav: string[]; appName: string }>({
  notify: () => {},
  go: () => false,
  confirm: (_label, run) => run(),
  nav: [],
  appName: "",
});
const useAppActions = () => React.useContext(AppActionsContext);

function AppActions({ nav, appName, links, onPage, children }: { nav: string[]; appName: string; links?: string[]; onPage?: (index: number) => void; children: React.ReactNode }) {
  const [notices, setNotices] = React.useState<{ key: number; text: string; tone: NoticeTone }[]>([]);
  // An unwired act that can't be taken back asks first ("Delete workspace?").
  const [asking, setAsking] = React.useState<{ label: string; run: () => void; open: boolean } | null>(null);
  const confirm = (label: string, run: () => void) => setAsking({ label, run, open: true });
  const seq = React.useRef(0);
  const notify = (text: string, tone: NoticeTone = "success") => {
    seq.current += 1;
    const key = seq.current;
    setNotices((list) => [...list.slice(-2), { key, text, tone }]);
    window.setTimeout(() => setNotices((list) => list.filter((n) => n.key !== key)), 4500);
  };
  // A page by its name, or by a word of it ("View all expenses" -> Expenses).
  const go = (name: string) => {
    const want = name.toLowerCase();
    const i = nav.findIndex((n) => n.toLowerCase() === want || want.split(/\s+/).includes(n.toLowerCase()));
    if (i < 0) return false;
    if (onPage) onPage(i);
    else goToPage(i, links);
    return true;
  };
  return (
    <AppActionsContext.Provider value={{ notify, go, confirm, nav, appName }}>
      {children}
      <AlertDialog open={asking?.open ?? false} onOpenChange={(o) => !o && setAsking((a) => a && { ...a, open: false })}>
        <AlertDialogContent title={`${asking?.label ?? ""}?`} description="This can't be undone.">
          <AlertDialogFooter>
            <AlertDialogCancel>Go back</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={() => asking?.run()}>
              {asking?.label}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div aria-live="polite" className="pointer-events-none fixed right-4 bottom-4 left-4 z-[60] flex flex-col items-end gap-2 sm:left-auto">
        {notices.map((n) => (
          <Toast key={n.key} variant={n.tone} onDismiss={() => setNotices((list) => list.filter((x) => x.key !== n.key))} className="pointer-events-auto max-w-sm">
            {n.text}
          </Toast>
        ))}
      </div>
    </AppActionsContext.Provider>
  );
}

const IRREGULAR: Record<string, string> = {
  send: "Sent", resend: "Sent", pay: "Paid", set: "Set", reset: "Reset", run: "Ran", rerun: "Ran again", make: "Made", buy: "Bought",
  put: "Put", stop: "Stopped", ship: "Shipped", plan: "Planned", pin: "Pinned", unpin: "Unpinned", tag: "Tagged", drop: "Dropped",
  submit: "Submitted", split: "Split", cut: "Cut", leave: "Left", hold: "Held", begin: "Began", write: "Wrote", rewrite: "Rewrote",
  forward: "Forwarded", follow: "Following", unfollow: "Unfollowed", sign: "Signed", log: "Logged", star: "Starred", unstar: "Unstarred",
  transfer: "Transferred", refer: "Referred", prefer: "Preferred", commit: "Committed", control: "Controlled", cancel: "Cancelled",
  label: "Labelled", travel: "Travelled", model: "Modelled", admit: "Admitted", regret: "Regretted", occur: "Occurred",
};
/** Acts that can't be taken back: unwired, they ask first. */
const ASK_FIRST = /^(delete|remove|revoke|transfer|close|deactivate|suspend|disconnect|leave|reset|void|refund|block|cancel)\b/i;
const VERBS = new Set([
  "approve", "reject", "archive", "restore", "delete", "remove", "add", "create", "invite", "upload", "import", "save", "publish", "unpublish",
  "duplicate", "edit", "update", "change", "rename", "move", "assign", "unassign", "mark", "close", "reopen", "resolve", "confirm", "cancel",
  "refund", "void", "charge", "retry", "sync", "refresh", "connect", "disconnect", "enable", "disable", "turn", "switch", "upgrade", "downgrade",
  "renew", "verify", "review", "schedule", "reschedule", "book", "remind", "chase", "like", "subscribe", "unsubscribe", "join", "accept",
  "decline", "request", "generate", "apply", "clear", "roll", "revoke", "regenerate", "transfer", "start", "pause", "resume", "finish",
  "complete", "print", "email", "message", "call", "notify", "nudge", "track", "return", "receive", "record", "attach", "label", "merge",
  "hide", "mute", "unmute", "report", "flag", "block", "unblock", "lock", "unlock", "test", "deploy", "release", "launch", "install",
  "uninstall", "customize", "configure", "choose", "pick", "select", "claim", "redeem", "activate", "deactivate", "suspend", "reactivate",
  "boost", "promote", "feature", "dismiss", "snooze", "acknowledge", "escalate", "reply", "post", "comment", "vote", "rate", "reorder",
  "restock", "fulfil", "fulfill", "dispatch", "collect", "reconcile", "categorise", "categorize", "split", "match", "lend", "extend",
  ...Object.keys(IRREGULAR),
]);
const GO = new Set(["view", "see", "open", "browse", "go", "visit", "manage", "explore", "read", "learn", "preview", "show", "check", "discover"]);
const NOOP = /^(cancel|close|back|dismiss|discard|skip|not now|maybe later|no thanks|done)$/i;

/** "Send reminders" -> "Sent reminders"; "Export your data" -> an info notice; "View all expenses" -> the Expenses page. */
function quickActionOf(label: string): { go?: string; text?: string; tone?: NoticeTone; copy?: string } | null {
  const clean = label.replace(/[…→›»+]/g, " ").replace(/\s+/g, " ").trim();
  if (!clean || NOOP.test(clean)) return null;
  const [first, ...more] = clean.split(" ");
  const verb = first.toLowerCase();
  const rest = more.join(" ");
  const object = rest.replace(/^(all|your|the|a|an)\s+/i, "");
  if (GO.has(verb) || /^all\b/i.test(clean)) return { go: object || clean, text: `Opening ${object || clean}`, tone: "info" };
  if (verb === "export") return { text: `${object ? `${object.charAt(0).toUpperCase()}${object.slice(1)} export` : "Export"} started. We'll email you when it's ready.`, tone: "info" };
  if (verb === "download") return { text: object ? `Downloading ${object}` : "Download started", tone: "info" };
  if (verb === "copy") return { text: "Copied to the clipboard", copy: object || clean };
  if (verb === "share") return { text: "Link copied: share it anywhere", copy: "url" };
  if (verb === "contact" || verb === "ask" || verb === "chat") return { text: `Message sent${object ? ` to ${object}` : ""}. We'll reply by email.`, tone: "info" };
  if (verb === "help" || verb === "get" || verb === "try" || verb === "learn") return { text: clean, tone: "info" };
  if (!VERBS.has(verb)) return { go: clean, text: clean, tone: "info" };
  const past = IRREGULAR[verb] ?? (verb.endsWith("e") ? `${verb}d` : /[^aeiou]y$/.test(verb) ? `${verb.slice(0, -1)}ied` : `${verb}ed`);
  const Past = past.charAt(0).toUpperCase() + past.slice(1);
  return { text: rest ? `${Past} ${rest}` : Past, tone: /^(delete|remove|revoke|block|cancel|void|refund|disconnect|deactivate|suspend)$/.test(verb) ? "info" : "success" };
}

/** The fallback for a control with no wiring: does what its label says, as far as a prototype can. */
function useQuickAction() {
  const { notify, go, confirm } = useAppActions();
  return (label: string) => {
    const act = quickActionOf(label);
    if (!act) return;
    if (act.go && go(act.go)) return;
    const run = () => {
      if (act.copy) void navigator.clipboard?.writeText(act.copy === "url" ? window.location.href : act.copy).catch(() => {});
      if (act.text) notify(act.text, act.tone);
    };
    const clean = label.replace(/\s+/g, " ").trim();
    // A lone "Cancel" or "Close" shuts something; "Cancel subscription" or "Remove" ends something, and asks.
    if (ASK_FIRST.test(clean) && !/^(cancel|close)$/i.test(clean)) confirm(clean, run);
    else run();
  };
}

/** A control's words: its aria-label, else its text. */
const labelOf = (el: Element) => el.getAttribute("aria-label") || el.textContent || "";

function useSlotAction(slot: string): ((trigger: HTMLElement | null, vars?: Record<string, string>) => void) | undefined {
  const { to, opens } = React.useContext(SectionLinksContext);
  const { open } = React.useContext(OverlayContext);
  const { links, onPage } = React.useContext(ShellContext);
  const overlay = opens[slot];
  const page = to[slot];
  if (overlay !== undefined) return (trigger, vars) => open(overlay, trigger, vars);
  if (page !== undefined) return () => (onPage ? onPage(page) : goToPage(page, links));
  return undefined;
}

/** The section's wiring (slot -> page, slot -> overlay), for blocks that mark what their controls open. */
const useSectionWiring = () => React.useContext(SectionLinksContext);

/**
 * Which of the page header's tabs is open, so sections can show for one tab
 * only (OnTab). The Studio provides it above the frame; a downloaded page
 * gets it from AppFrame.
 */
const PageTabsContext = React.createContext<{ active: number; setActive: (i: number) => void; source?: "header" | "list" } | null>(null);
const usePageTabs = () => React.useContext(PageTabsContext);

/** `source` says what the tabs are: the page header's, or a settings page's list of areas. */
function PageTabs({ active, onChange, source, children }: { active: number; onChange: (i: number) => void; source?: "header" | "list"; children: React.ReactNode }) {
  const value = React.useMemo(() => ({ active, setActive: onChange, source }), [active, onChange, source]);
  return <PageTabsContext.Provider value={value}>{children}</PageTabsContext.Provider>;
}

/** Its children show only while that tab of the page header is open. */
function OnTab({ tab, children }: { tab: number; children: React.ReactNode }) {
  const tabs = usePageTabs();
  return !tabs || tabs.active === tab ? <>{children}</> : null;
}

/** Follows the nav link for a page (the Studio preview listens for it), else its route. */
function goToPage(page: number, links?: string[]) {
  const nav = document.querySelector<HTMLAnchorElement>(`a[data-nav-index="${page}"]`);
  if (nav) nav.click();
  else if (links?.[page] && links[page] !== "#") window.location.assign(links[page]);
}

/** The page or overlay a slot is wired to, as props; data-link names the slot for the Studio. */
function useSlot(slot: string) {
  const { to, opens } = React.useContext(SectionLinksContext);
  const { open } = React.useContext(OverlayContext);
  const { link } = useLinks();
  const quick = useQuickAction();
  const target = to[slot];
  const overlay = opens[slot];
  if (overlay !== undefined) {
    const onClick = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      open(overlay, e.currentTarget);
    };
    return { target, overlay, props: { "data-link": slot, "data-overlay": overlay, "aria-haspopup": "dialog" as const, onClick } };
  }
  // Wired to nothing: the click still does what the label says (see useQuickAction).
  const onQuick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    quick(labelOf(e.currentTarget));
  };
  return { target, overlay, props: target === undefined ? { href: "#", "data-link": slot, onClick: onQuick } : { href: link(target).href, "data-nav-index": target, "data-link": slot } };
}

/** A section's text link ("View all"), going to the page it's wired to (or a button, when it opens an overlay). */
function SlotLink({ slot, href, ...props }: { slot: string } & React.ComponentProps<"a">) {
  const { overlay, props: wired } = useSlot(slot);
  if (overlay !== undefined) return <button type="button" {...(props as React.ComponentProps<"button">)} {...wired} />;
  return <a href={href} {...props} {...wired} />;
}

/** A section's button: a link that looks the same once it's wired to a page. */
function SlotButton({ slot, children, ...props }: { slot: string } & React.ComponentProps<typeof Button>) {
  const { target, overlay, props: link } = useSlot(slot);
  if (overlay !== undefined) {
    return (
      <Button {...props} {...link}>
        {children}
      </Button>
    );
  }
  if (target === undefined) {
    return (
      // A form's submit button submits its form; any other does what its label says.
      <Button {...props} data-link={slot} onClick={props.type === "submit" ? props.onClick : (props.onClick ?? link.onClick)}>
        {children}
      </Button>
    );
  }
  return (
    <Button {...props} asChild>
      <a {...link}>{children}</a>
    </Button>
  );
}

type SiteLayout = "classic" | "centered" | "floating" | "minimal";

/** Nav icons, looked up by name so each label gets one that fits ("Billing" gets a card). */
const NAV_ICONS = {
  dashboard: LayoutDashboard,
  people: Users,
  calendar: Calendar,
  billing: CreditCard,
  reports: BarChart3,
  inbox: Inbox,
  settings: Settings,
  create: Plus,
  characters: Smile,
  gallery: ImageIcon,
  tasks: ListChecks,
  projects: FolderOpen,
  shop: ShoppingBag,
  delivery: Truck,
  reading: BookOpen,
  home: Home,
  focus: Timer,
  assistant: Sparkles,
  templates: LayoutTemplate,
  brand: Palette,
  design: PenTool,
  video: Clapperboard,
  music: Music,
  apps: Blocks,
  explore: Compass,
  favorites: Star,
  trash: Trash2,
  shared: Share2,
  learn: GraduationCap,
  wallet: Wallet,
  places: MapPin,
};
type NavIcon = keyof typeof NAV_ICONS;

const ICON_RULES: [RegExp, NavIcon][] = [
  [/dashboard|overview|home|studio/i, "dashboard"],
  [/template/i, "templates"],
  [/\bbrand|style guide|brand kit/i, "brand"],
  [/dream|magic|\blab\b|generate|\bai\b|assistant|copilot|agent/i, "assistant"],
  [/\bdesigns?\b|canvas|editor|\bdraw/i, "design"],
  [/video|film|reel|episode/i, "video"],
  [/music|audio|podcast|sound/i, "music"],
  [/\bapps?\b|integration|plugin|extension/i, "apps"],
  [/explore|discover|browse/i, "explore"],
  [/favou?rite|starred|saved/i, "favorites"],
  [/trash|\bbin\b|deleted/i, "trash"],
  [/\bshared?\b/i, "shared"],
  [/learn|academy|tutorial|guide/i, "learn"],
  [/wallet|expense|finance|money|budget/i, "wallet"],
  [/\bmaps?\b|location|places/i, "places"],
  [/customer|patient|member|client|guest|user|people|team|student|creator|volunteer/i, "people"],
  [/appointment|booking|calendar|schedule|reservation|class|shift|event/i, "calendar"],
  [/billing|invoice|payment|subscription|plan/i, "billing"],
  [/report|analytic|insight|stat/i, "reports"],
  [/focus|timer|pomodoro/i, "focus"],
  [/\bai\b|assistant|copilot|agent/i, "assistant"],
  [/inbox|message|support|chat|ticket/i, "inbox"],
  [/setting|account|preference/i, "settings"],
  [/create|new/i, "create"],
  [/character|avatar|friend/i, "characters"],
  [/gallery|photo|image|media/i, "gallery"],
  [/task|todo|board|backlog/i, "tasks"],
  [/project|file|document|case/i, "projects"],
  [/order|product|shop|store/i, "shop"],
  [/shipment|delivery|fleet|vehicle|route/i, "delivery"],
  [/course|lesson|story|stories|read|library/i, "reading"],
];
const FALLBACK_ICONS: NavIcon[] = ["home", "projects", "reports", "inbox", "settings"];

function iconName(label: string, i: number): NavIcon {
  return ICON_RULES.find(([re]) => re.test(label))?.[1] ?? FALLBACK_ICONS[i % FALLBACK_ICONS.length];
}

/**
 * The client's logo files, as URLs (the brand book's uploads): the full logo
 * and the symbol, each with a version for dark backgrounds. Without them the
 * app shows its initial on the brand fill and its name.
 */
interface LogoSet {
  logo?: string;
  logoDark?: string;
  mark?: string;
  markDark?: string;
}
const LogoContext = React.createContext<LogoSet | undefined>(undefined);

/** Gives every frame below it the product's logo. */
function LogoProvider({ value, children }: { value: LogoSet | undefined; children: React.ReactNode }) {
  return <LogoContext.Provider value={value}>{children}</LogoContext.Provider>;
}

/** A logo file, or its pair: the light one on light surfaces, the dark one in the dark theme and on dark navigation. */
function LogoImage({ light, dark, alt, className }: { light?: string; dark?: string; alt: string; className?: string }) {
  if (!light && !dark) return null;
  if (!light || !dark || light === dark) {
    // eslint-disable-next-line @next/next/no-img-element -- an uploaded logo of any size and type, not an optimised photo
    return <img src={light ?? dark} alt={alt} className={className} />;
  }
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- as above */}
      <img src={light} alt={alt} className={cn(className, "dark:hidden in-data-[surface=dark]:hidden")} />
      {/* eslint-disable-next-line @next/next/no-img-element -- as above */}
      <img src={dark} alt={alt} className={cn("hidden dark:block in-data-[surface=dark]:block", className)} />
    </>
  );
}

/**
 * The app's symbol: the client's mark, or the initial on the brand fill (the
 * theme's own pair, so it reads at AA inside a coloured navigation too).
 * Named for screen readers unless the app's name sits beside it.
 */
function AppMark({ appName, small, named = true }: { appName: string; small?: boolean; named?: boolean }) {
  const logos = React.useContext(LogoContext);
  if (logos?.mark || logos?.markDark) {
    return <LogoImage light={logos.mark} dark={logos.markDark} alt={named ? appName : ""} className={cn("shrink-0 object-contain", small ? "size-6" : "size-7")} />;
  }
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-md bg-[var(--studio-brand-fill,var(--primary-strong))] font-heading font-bold text-[var(--studio-brand-text,var(--primary-foreground))]",
        small ? "size-6 text-xs" : "size-7 text-sm",
      )}
    >
      {appName.charAt(0)}
    </span>
  );
}

/** The full logo, or the symbol beside the app's name. */
function Brand({ appName }: { appName: string }) {
  const logos = React.useContext(LogoContext);
  if (logos?.logo || logos?.logoDark) {
    return (
      <span className="flex min-w-0 items-center">
        <LogoImage light={logos.logo} dark={logos.logoDark} alt={appName} className="h-7 w-auto max-w-40 object-contain object-left" />
      </span>
    );
  }
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <AppMark appName={appName} named={false} />
      <span className="truncate font-heading text-[15px] font-semibold tracking-tight text-foreground">{appName}</span>
    </span>
  );
}

/** A labelled nav link with its icon. */
/** A page in the navigation. `inline` (a horizontal bar): no sidebar headings, nested tabs or sidebar nav style. */
function NavLink({
  label,
  i,
  className,
  iconOnly,
  badge,
  inline,
  fallback = "list",
}: {
  label: string;
  i: number;
  className?: string;
  iconOnly?: boolean;
  badge?: "muted" | "fill";
  inline?: boolean;
  /** The nav style when the product hasn't picked one. */
  fallback?: NonNullable<NonNullable<Shell["sidebar"]>["nav"]>;
}) {
  const Icon = NAV_ICONS[iconName(label, i)];
  const { link, isCurrent } = useLinks();
  const { shell, links } = React.useContext(ShellContext);
  const { headings, sidebar, badges, nested, subpages } = shell;
  const heading = inline ? undefined : headings?.[label];
  const active = isCurrent(i);
  // The nav style: a list (the default), pills, boxed, or minimal with a bar.
  const style = inline ? "list" : (sidebar?.nav ?? fallback);
  // The page's tabs under it, when the sidebar nests them; only the open page's show.
  const kids = nested && !iconOnly && !inline ? (subpages?.[label] ?? []) : [];
  const tabs = usePageTabs();
  const count = badges?.[label];
  return (
    <>
    {heading && !iconOnly && <p className="px-2.5 pt-4 pb-1 text-[11px] font-medium text-muted-foreground first:pt-0">{heading}</p>}
    <a
      {...link(i)}
      title={iconOnly ? label : undefined}
      aria-label={iconOnly ? label : undefined}
      aria-expanded={kids.length ? active : undefined}
      className={cn(
        "relative flex items-center gap-2.5 text-sm transition-colors",
        style === "pills" ? "rounded-full" : style === "minimal" || style === "dot" ? "rounded-none" : "rounded-md",
        active
          ? style === "pills"
            ? "bg-primary-strong font-medium text-primary-foreground"
            : style === "ink"
              ? "bg-foreground font-medium text-background"
              : style === "brand"
                ? "bg-primary/12 font-medium text-primary-ink"
                : style === "bar"
                  ? "bg-muted/70 font-medium text-foreground before:absolute before:inset-y-1.5 before:left-0 before:w-[3px] before:rounded-full before:bg-primary-mark"
                  : style === "dot"
                    ? "font-semibold text-foreground before:absolute before:top-1/2 before:left-0 before:size-1.5 before:-translate-y-1/2 before:rounded-full before:bg-primary-mark"
                    : style === "boxed"
              ? "border border-border bg-card font-medium text-foreground shadow-sm"
              : style === "minimal"
                ? "font-semibold text-foreground before:absolute before:top-1/2 before:left-0 before:h-4 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-primary-mark"
                : "bg-muted font-medium text-foreground"
          : cn("text-muted-foreground hover:text-foreground", style === "boxed" && "border border-transparent", style !== "minimal" && style !== "dot" && "hover:bg-muted/50"),
        className,
        // A tree: each page hangs off a guide line by a short branch, under its heading.
        style === "tree" &&
          !iconOnly &&
          "ml-2 pl-6 before:absolute before:inset-y-0 before:left-1.5 before:w-px before:bg-border after:absolute after:top-1/2 after:left-1.5 after:h-px after:w-3 after:bg-border",
      )}
    >
      <span className="relative shrink-0">
        <Icon className={cn("size-4", active && (style === "pills" ? "text-primary-foreground" : style === "ink" ? "text-background" : "text-primary-ink"))} />
        {iconOnly && <NavDot label={label} />}
      </span>
      {/* A name longer than the sidebar ends in an ellipsis (the whole of it in the tooltip), never cut mid-letter. */}
      {!iconOnly && (
        <span className="min-w-0 truncate" title={label.length > 20 ? label : undefined}>
          {label}
        </span>
      )}
      {/* One count style whether the page is open or not. */}
      {!iconOnly && <NavBadge label={label} tone={badge ?? "muted"} />}
      {kids.length > 0 && <ChevronDown aria-hidden="true" className={cn("size-3.5 shrink-0 text-muted-foreground transition-transform", !count && "ml-auto", active && "rotate-180")} />}
    </a>
    {kids.length > 0 && active && (
      <ul className="my-0.5 ml-[21px] flex flex-col gap-0.5 border-l border-border pl-2">
        {kids.map((name, k) => {
          const open = (tabs?.active ?? 0) === k;
          return (
            <li key={name}>
              <a
                href={links?.[i] && links[i] !== "#" ? `${links[i]}#tab-${k}` : "#"}
                data-nav-index={i}
                data-nav-tab={k}
                aria-current={open ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  tabs?.setActive(k);
                }}
                className={cn("block rounded-md px-2.5 py-1.5 text-[13px] transition-colors", open ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:text-foreground")}
              >
                {name}
              </a>
            </li>
          );
        })}
      </ul>
    )}
    </>
  );
}

/** A page's count beside its name: quiet in a list, or filled with the brand in a pill bar. */
function NavBadge({ label, tone = "muted" }: { label: string; tone?: "muted" | "fill" }) {
  const count = React.useContext(ShellContext).shell.badges?.[label];
  if (!count) return null;
  return (
    <span className={cn("ml-auto rounded-full px-1.5 font-mono text-[10px] leading-5 tabular-nums", tone === "fill" ? "bg-primary-strong text-primary-foreground" : "bg-muted text-muted-foreground")}>
      {count}
    </span>
  );
}

/** A page's count on an icon-only link: a brand dot on the icon's corner, the count read out. */
function NavDot({ label }: { label: string }) {
  const count = React.useContext(ShellContext).shell.badges?.[label];
  if (!count) return null;
  return (
    <span className="absolute -top-1 -right-1.5 size-2 rounded-full bg-primary-mark ring-2 ring-card">
      <span className="sr-only">{count} waiting</span>
    </span>
  );
}

function UserChip({ user, compact }: { user: string; compact?: boolean }) {
  const role = React.useContext(ShellContext).shell.role ?? "Admin";
  if (compact)
    return (
      <UserMenu>
        <button type="button" aria-label={`Account menu for ${user}`} className="rounded-full">
          <Avatar name={user} size="sm" />
        </button>
      </UserMenu>
    );
  return (
    <UserMenu align="start">
      <button type="button" aria-label={`Account menu for ${user}`} className="flex w-full items-center gap-2.5 rounded-md px-1.5 py-1 text-left hover:bg-muted/60">
        <Avatar name={user} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-medium text-foreground">{user}</p>
          <p className="truncate text-[11px] text-muted-foreground">{role}</p>
        </div>
        <ChevronDown className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      </button>
    </UserMenu>
  );
}

const GROUP_DOTS = ["bg-primary-mark", "bg-[var(--signal-cyan)]", "bg-[var(--signal-violet)]", "bg-[var(--signal-orange)]", "bg-[var(--signal-magenta)]"];

/** Under a sidebar's nav: link groups with colour dots, the team, then a promo card. */
function SidebarExtras() {
  const { groups, team, promo } = React.useContext(ShellContext).shell;
  if (!groups && !team && !promo) return null;
  return (
    <div className="flex flex-col gap-5 overflow-y-auto pb-1">
      <SidebarGroups />
      <SidebarTeam />
      <SidebarPromo />
    </div>
  );
}

function SidebarGroups() {
  const { groups } = React.useContext(ShellContext).shell;
  if (!groups?.length) return null;
  return (
    <>
      {groups.map((g) => (
        <div key={g.title} className="border-t border-border pt-4">
          <p className="px-2.5 text-xs text-muted-foreground">{g.title}</p>
          <ul className="mt-2 flex flex-col gap-0.5">
            {g.items.map((item, i) => (
              <li key={item}>
                <a href="#" className="flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground">
                  <span className={cn("size-2 shrink-0 rounded-full", GROUP_DOTS[i % GROUP_DOTS.length])} aria-hidden="true" />
                  <span className="truncate">{item}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

function SidebarTeam() {
  const { team } = React.useContext(ShellContext).shell;
  if (!team?.length) return null;
  return (
        <div className="border-t border-border pt-4">
          <p className="px-2.5 text-xs text-muted-foreground">Team</p>
          <ul className="mt-2 flex flex-col gap-2">
            {team.map((m) => (
              <li key={m.name} className="flex items-center gap-2.5 px-2.5">
                <Avatar name={m.name} size="sm" />
                <div className="min-w-0">
                  <p className="truncate text-[13px] text-foreground">{m.name}</p>
                  {m.role && <p className="truncate text-[11px] text-muted-foreground">{m.role}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
  );
}

/** A sidebar's main button: a "New …" one opens the create menu, any other does what it says. */
function SidebarButton({ text, icon }: { text: string; icon?: boolean }) {
  const quick = useQuickAction();
  const button = (
    <Button size="sm" className="w-full" onClick={/^(new|add|create)\b/i.test(text) ? undefined : () => quick(text)}>
      {icon && <Plus />}
      {text}
    </Button>
  );
  return /^(new|add|create)\b/i.test(text) ? <NewMenu>{button}</NewMenu> : button;
}

function SidebarPromo() {
  const { promo } = React.useContext(ShellContext).shell;
  const quick = useQuickAction();
  const [hidden, setHidden] = React.useState(false);
  if (!promo || hidden) return null;
  return (
        <div className="relative rounded-lg border border-border bg-background/60 p-4">
          <Zap className="size-5 text-primary-ink" aria-hidden="true" />
          <button type="button" aria-label="Dismiss" onClick={() => setHidden(true)} className="absolute top-3 right-3 rounded text-muted-foreground hover:text-foreground">
            <X className="size-3.5" />
          </button>
          <p className="mt-3 text-sm font-semibold text-foreground">{promo.title}</p>
          {promo.text && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{promo.text}</p>}
          {promo.action && (
            <Button size="sm" className="mt-3 w-full" onClick={() => quick(promo.action!)}>
              {promo.action}
            </Button>
          )}
        </div>
  );
}

/** A sidebar note with somewhere to go: a small card, its first link the one that matters. */
function NoteCard({ text, links }: { text: string; links: { label: string; href: string }[] }) {
  return (
    <div className="rounded-lg border border-border bg-background/60 px-3 py-2.5">
      <p className="text-xs leading-snug text-muted-foreground">{text}</p>
      <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]">
        {links.map((l, j) => (
          <a key={l.href} href={l.href} className={cn("inline-flex items-center gap-0.5 rounded-sm transition-colors", j === 0 ? "font-medium text-foreground hover:text-primary-ink" : "text-muted-foreground hover:text-foreground")}>
            {l.label}
            {j === 0 && <ArrowUpRight className="size-3.5" aria-hidden="true" />}
          </a>
        ))}
      </p>
    </div>
  );
}

const SIDEBAR_WIDTH = { narrow: "w-52", regular: "w-60", wide: "w-72" } as const;
/* Sidebar tones: the card (the layout's own), a tint, dark surfaces, or the brand fill with its AA text. */
const SIDEBAR_TONE: Record<string, React.CSSProperties> = {
  // backgroundColor set inline so a glass theme doesn't turn the fill translucent under its text.
  // The brand as it reads on dark (--studio-ink-dark): a dark brand's own ink would vanish on this sidebar.
  inverse: { "--background": "#0a0a0f", "--card": "#111118", "--card-foreground": "#ededf2", "--foreground": "#ededf2", "--muted": "#16161e", "--muted-foreground": "#8a8a99", "--border": "#1f1f2a", "--primary-ink": "var(--studio-ink-dark)", "--primary-mark": "var(--studio-ink-dark)", colorScheme: "dark", backgroundColor: "var(--background)", backdropFilter: "none" } as React.CSSProperties,
  brand: {
    "--background": "var(--studio-brand-fill)",
    "--card": "var(--studio-brand-fill)",
    "--card-foreground": "var(--studio-brand-text)",
    "--foreground": "var(--studio-brand-text)",
    "--primary-ink": "var(--studio-brand-text)",
    "--primary": "var(--studio-brand-text)",
    "--primary-mark": "var(--studio-brand-text)",
    "--primary-strong": "var(--studio-brand-text)",
    "--primary-foreground": "var(--studio-brand-fill)",
    "--muted": "color-mix(in oklch, var(--studio-brand-text) 14%, transparent)",
    "--muted-foreground": "color-mix(in oklch, var(--studio-brand-text) 74%, transparent)",
    "--border": "color-mix(in oklch, var(--studio-brand-text) 18%, transparent)",
    backgroundColor: "var(--background)",
    backdropFilter: "none",
  } as React.CSSProperties,
};
// The brand fill as a gentle top-to-bottom gradient: shifts small enough that the brand text keeps its contrast.
SIDEBAR_TONE.gradient = {
  ...SIDEBAR_TONE.brand,
  backgroundImage:
    "linear-gradient(170deg, color-mix(in oklch, var(--studio-brand-fill) 90%, white), var(--studio-brand-fill) 45%, color-mix(in oklch, var(--studio-brand-fill) 90%, black))",
} as React.CSSProperties;
const DEFAULT_PARTS: SidebarPart[] = ["brand", "nav", "groups", "team", "promo", "user"];

/**
 * The sidebar's blocks in the order the product composed them (shell.sidebar),
 * or the default order: the brand, the pages, the groups, the team, the promo,
 * the user. A user block last sits at the foot, with the collapse button
 * above it; anywhere else (a creator tool puts it first) the blocks stack
 * from the top. Collapsed, only what fits a rail shows.
 */
function SidebarBody({ appName, nav, user, collapsed, collapse }: { appName: string; nav: string[]; user: string; collapsed: boolean; collapse: React.ReactNode }) {
  const { shell } = React.useContext(ShellContext);
  const parts = shell.sidebar?.parts ?? DEFAULT_PARTS;
  const foot = parts[parts.length - 1] === "user" ? parts.length - 1 : parts.length;
  const block = (p: SidebarPart, i: number) => {
    const key = typeof p === "string" ? `${p}-${i}` : `${p.type}-${i}`;
    if (p === "brand") return <div key={key} className={cn("px-1.5", collapsed && "flex justify-center px-0")}>{collapsed ? <AppMark appName={appName} /> : <Brand appName={appName} />}</div>;
    if (p === "nav")
      return (
        <nav key={key} className={cn("flex flex-col gap-0.5", NAV_SCROLL)}>
          {nav.map((label, j) => (
            <NavLink key={label} label={label} i={j} iconOnly={collapsed} className={collapsed ? "justify-center py-2" : "px-2.5 py-2"} />
          ))}
        </nav>
      );
    if (p === "user") return <div key={key} className={cn(i === foot && "border-t border-border pt-3", collapsed && "flex justify-center")}><UserChip user={user} compact={collapsed} /></div>;
    if (p === "divider") return <hr key={key} className="border-border" />;
    if (collapsed) return null;
    if (p === "workspace") return shell.workspace ? <WorkspaceSwitcher key={key} place="sidebar" /> : null;
    if (p === "search")
      return (
        <button key={key} type="button" onClick={openCommandPalette} className="flex h-9 items-center gap-2 rounded-md border border-border bg-background/60 px-2.5 text-left text-sm text-muted-foreground transition-colors hover:text-foreground">
          <Search className="size-4 shrink-0" aria-hidden="true" />
          <span className="min-w-0 flex-1 truncate">{shell.search ?? "Search…"}</span>
          <kbd className="rounded border border-border px-1 font-mono text-[10px]">⌘K</kbd>
        </button>
      );
    if (p === "groups") return <SidebarGroups key={key} />;
    if (p === "team") return <SidebarTeam key={key} />;
    if (p === "promo") return <SidebarPromo key={key} />;
    if (p.type === "stat")
      return (
        <div key={key} className="rounded-lg border border-border bg-background/60 px-3 py-2.5">
          {/* The value never breaks; a label too long to share its line sits above it. */}
          <p className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5 text-xs">
            <span className="min-w-0 text-pretty text-muted-foreground">{p.label}</span>
            <span className="font-medium whitespace-nowrap text-foreground tabular-nums">{p.value}</span>
          </p>
          {p.progress !== undefined && (
            <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-muted">
              <span className="block h-full rounded-full bg-primary-mark" style={{ width: `${p.progress}%` }} />
            </span>
          )}
          {p.points && p.points.length > 1 && (
            <span className="mt-2 block h-9 w-full">
              <Sparkline data={p.points} kind="area" width={160} height={36} stretch />
            </span>
          )}
          {p.note && <span className="mt-1.5 block text-[11px] text-muted-foreground">{p.note}</span>}
        </div>
      );
    if (p.type === "button")
      return (
        <SidebarButton key={key} text={p.text} icon={p.icon} />
      );
    if (p.type === "links")
      return (
        <p key={key} className="flex flex-wrap gap-x-3 gap-y-1 px-2.5 text-[11px] text-muted-foreground">
          {p.items.map((it) => (
            <a key={it} href="#" className="transition-colors hover:text-foreground">
              {it}
            </a>
          ))}
        </p>
      );
    if (p.type === "note" && p.links?.length) return <NoteCard key={key} text={p.text} links={p.links} />;
    if (p.type === "note") return <p key={key} className="px-2.5 text-[11px] leading-relaxed text-muted-foreground">{p.text}</p>;
    return null;
  };
  return (
    <>
      {/* The pages give way first: the other blocks keep their height. */}
      <div className={cn("flex flex-col gap-4", NAV_COLUMN)}>{parts.slice(0, foot).map(block)}</div>
      <div className="min-h-0 flex-1" />
      {collapse}
      <div className="mt-2 flex flex-col gap-3">{parts.slice(foot).map((p, i) => block(p, foot + i))}</div>
    </>
  );
}

/** The workspace switcher from the shell; `compact` for a bar it shares with the pages (wide screens only). */
/**
 * The workspace switcher and its menu. In the top bar (compact in the slimmer
 * ones) unless the sidebar shows it ("sidebar"): the shell shows it once.
 */
function WorkspaceSwitcher({ compact, place = "bar" }: { compact?: boolean; place?: "bar" | "sidebar" }) {
  const shell = React.useContext(ShellContext).shell;
  const { sidebar } = shell;
  const { notify } = useAppActions();
  // Switching moves another workspace to the top; Create adds one and switches to it.
  const [made, setMade] = React.useState<{ name: string; meta?: string }[]>([]);
  const [current, setCurrent] = React.useState<string | null>(null);
  const [creating, setCreating] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const every = [...(shell.workspace ? [shell.workspace] : []), ...(shell.workspaces ?? []), ...made];
  const workspace = every.find((w) => w.name === current) ?? shell.workspace;
  const workspaces = every.filter((w) => w !== workspace);
  if (!workspace) return null;
  if (place === "bar" && sidebar?.parts?.includes("workspace")) return null;
  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {place === "sidebar" ? (
          <button
            type="button"
            aria-label={`Workspace: ${workspace.name}`}
            className="flex w-full items-center gap-2 rounded-md border border-border bg-background/60 px-2.5 py-2 text-left text-sm transition-colors hover:bg-muted/60"
          >
            <Building2 className="size-4 shrink-0 text-primary-ink" aria-hidden="true" />
            <span className="min-w-0 flex-1">
              <span className="block truncate font-medium text-foreground">{workspace.name}</span>
              {workspace.meta && <span className="block truncate text-[11px] text-muted-foreground">{workspace.meta}</span>}
            </span>
            <ChevronDown className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          </button>
        ) : (
        <button
          type="button"
          aria-label={`Workspace: ${workspace.name}`}
          className={cn(
            "shrink-0 items-center gap-2 rounded-md border border-border bg-card text-foreground transition-colors hover:bg-muted/60",
            compact ? "hidden h-8 px-2.5 text-xs lg:flex" : "flex h-9 px-3 text-sm",
          )}
        >
          <Building2 className="size-4 text-primary-ink" aria-hidden="true" />
          <span className="font-medium">{workspace.name}</span>
          {workspace.meta && <span className={cn("text-muted-foreground", compact && "hidden xl:inline")}>{workspace.meta}</span>}
          <ChevronDown className="size-4 text-muted-foreground" aria-hidden="true" />
        </button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-56">
        <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
        {[workspace, ...workspaces].map((w, i) => (
          <DropdownMenuItem
            key={`${w.name}-${i}`}
            onSelect={() => {
              if (i === 0) return;
              setCurrent(w.name);
              notify(`Switched to ${w.name}`);
            }}
          >
            <span className="grid size-6 place-items-center rounded-md bg-muted text-[10px] font-semibold text-foreground">{initials(w.name)}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate">{w.name}</span>
              {w.meta && <span className="block truncate text-xs text-muted-foreground">{w.meta}</span>}
            </span>
            {i === 0 && <CheckIcon className="size-4 text-primary-ink" aria-label="Current" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => window.setTimeout(() => setCreating(true))}>
          <Plus />
          Create workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <Dialog open={creating} onOpenChange={setCreating}>
      <DialogContent title="Create workspace" size="sm" aria-describedby={undefined}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const name = newName.trim();
            if (!name) return;
            setMade((m) => [...m, { name, meta: "Just you" }]);
            setCurrent(name);
            setCreating(false);
            setNewName("");
            notify(`${name} created`);
          }}
        >
          <DialogBody>
            <Field label="Workspace name" htmlFor="new-workspace">
              <Input id="new-workspace" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Fieldwork Berlin" autoComplete="off" />
            </Field>
          </DialogBody>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setCreating(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!newName.trim()}>
              Create workspace
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    </>
  );
}

/** What "New" makes: the page's create dialogs (New, Add, Invite…), else the command palette. */
/** `side`: where the menu opens ("right" from a rail down the left). */
function NewMenu({ children, side }: { children: React.ReactElement; side?: "right" | "bottom" }) {
  const { items, open } = React.useContext(OverlayContext);
  const creates = items
    .map((o, i) => ({ o, i }))
    .filter(({ o }) => (o.kind === "dialog" || o.kind === "drawer") && !o.title.includes("{") && /^(new|add|create|invite|book|schedule|upload|import|record|log|start|send)\b/i.test(o.title));
  if (!creates.length) return React.cloneElement(children as React.ReactElement<{ onClick?: () => void }>, { onClick: () => openCommandPalette() });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent side={side} align={side === "right" ? "start" : "end"} className="min-w-52">
        <DropdownMenuLabel>Create</DropdownMenuLabel>
        {creates.map(({ o, i }) => (
          <DropdownMenuItem key={i} onSelect={() => window.setTimeout(() => open(i, null))}>
            <Plus />
            {o.title}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => openCommandPalette()}>
          <Search />
          Search everything
          <span className="ml-auto font-mono text-[10px] text-muted-foreground">⌘K</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const SHORTCUTS: [string, string][] = [
  ["⌘ K", "Search pages, records and people"],
  ["Esc", "Close a dialog or menu"],
  ["Tab", "Move between controls"],
  ["Enter", "Open or confirm"],
];

/** Help: the help center, keyboard shortcuts, contacting support, what's new. */
function HelpMenu({ children }: { children: React.ReactElement }) {
  const { notify, appName } = useAppActions();
  const [dialog, setDialog] = React.useState<"shortcuts" | "support" | null>(null);
  const [message, setMessage] = React.useState("");
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-52">
          <DropdownMenuItem onSelect={() => notify(`The ${appName || "help"} help center opens in a new tab`, "info")}>
            <BookOpen />
            Help center
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => window.setTimeout(() => setDialog("shortcuts"))}>
            <Command />
            Keyboard shortcuts
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => window.setTimeout(() => setDialog("support"))}>
            <MessageCircle />
            Contact support
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => notify("You're on the latest version", "info")}>
            <Sparkles />
            What&apos;s new
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={dialog === "shortcuts"} onOpenChange={(o) => !o && setDialog(null)}>
        <DialogContent title="Keyboard shortcuts" size="sm" aria-describedby={undefined}>
          <DialogBody>
            <dl className="flex flex-col divide-y divide-border text-sm">
              {SHORTCUTS.map(([k, what]) => (
                <div key={k} className="flex items-center justify-between gap-4 py-2.5">
                  <dt className="text-foreground">{what}</dt>
                  <dd>
                    <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">{k}</kbd>
                  </dd>
                </div>
              ))}
            </dl>
          </DialogBody>
        </DialogContent>
      </Dialog>
      <Dialog open={dialog === "support"} onOpenChange={(o) => !o && setDialog(null)}>
        <DialogContent title="Contact support" aria-describedby={undefined}>
          <DialogBody className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">We usually reply within a few hours, by email.</p>
            <Field label="How can we help?" htmlFor="support-message">
              <Textarea id="support-message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us what happened and what you expected" />
            </Field>
          </DialogBody>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDialog(null)}>
              Cancel
            </Button>
            <Button
              disabled={!message.trim()}
              onClick={() => {
                setDialog(null);
                setMessage("");
                notify("Message sent. We'll reply by email.");
              }}
            >
              Send message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

/** Ask AI: a question box with starters from the app's own pages. */
function AskAI({ children, side }: { children: React.ReactElement; side?: "right" | "bottom" }) {
  const { nav, appName } = useAppActions();
  const [question, setQuestion] = React.useState("");
  const [asked, setAsked] = React.useState<string | null>(null);
  const starters = [nav[0] && `Summarise ${nav[0].toLowerCase()} for this week`, nav[1] && `What needs my attention in ${nav[1].toLowerCase()}?`, "Draft a friendly reminder"].filter(Boolean) as string[];
  const ask = (q: string) => {
    if (!q.trim()) return;
    setAsked(q.trim());
    setQuestion("");
  };
  return (
    <Popover onOpenChange={(o) => !o && setAsked(null)}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent side={side} align={side === "right" ? "start" : "end"} className="flex w-80 flex-col gap-3">
        <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Sparkles className="size-4 text-primary-ink" aria-hidden="true" />
          Ask {appName || "AI"}
        </p>
        {asked ? (
          <div className="flex flex-col gap-2 text-sm">
            <p className="self-end rounded-lg bg-primary-strong px-3 py-2 text-primary-foreground">{asked}</p>
            <AiAnswer text="Answers come from your data once an AI model is connected. Until then, ⌘K finds any page, record or person." />
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            {starters.map((q) => (
              <button key={q} type="button" onClick={() => ask(q)} className="rounded-md border border-border px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted">
                {q}
              </button>
            ))}
          </div>
        )}
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            ask(question);
          }}
        >
          <Input aria-label="Your question" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask anything…" className="flex-1" />
          <Button type="submit" size="icon" aria-label="Ask" disabled={!question.trim()}>
            <ArrowUp />
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}

const RANGES = ["Last 7 days", "Last 30 days", "Last 90 days", "This quarter", "Year to date"];

/**
 * An AI's answer: marked as AI (never passed off as a person), with a note
 * that it can be wrong, and ways to rate it or copy it.
 */
function AiAnswer({ text }: { text: string }) {
  const { notify } = useAppActions();
  const [rated, setRated] = React.useState<"up" | "down" | null>(null);
  const icon = "grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground aria-pressed:text-primary-ink";
  return (
    <div className="flex max-w-[92%] flex-col gap-1">
      <p className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
        <Sparkles className="size-3 text-primary-ink" aria-hidden="true" />
        AI answer
      </p>
      <p className="rounded-lg bg-muted px-3 py-2 text-sm text-foreground">{text}</p>
      <div className="flex items-center gap-0.5">
        <button type="button" aria-label="Good answer" aria-pressed={rated === "up"} onClick={() => { setRated("up"); notify("Thanks for the feedback"); }} className={icon}>
          <ThumbsUp className="size-3.5" />
        </button>
        <button type="button" aria-label="Bad answer" aria-pressed={rated === "down"} onClick={() => { setRated("down"); notify("Thanks. We'll use this to improve answers.", "info"); }} className={icon}>
          <ThumbsDown className="size-3.5" />
        </button>
        <button type="button" aria-label="Copy the answer" onClick={() => { void navigator.clipboard?.writeText(text).catch(() => {}); notify("Copied to the clipboard"); }} className={icon}>
          <Copy className="size-3.5" />
        </button>
        <span className="ml-1.5 text-[11px] text-muted-foreground">AI can make mistakes. Check important details.</span>
      </div>
    </div>
  );
}

/** The date range as an icon (compact bars and panels): its presets in a menu. */
function RangeMenu({ className }: { className?: string }) {
  const [range, setRange] = React.useState("Last 30 days");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" aria-label={`Date range: ${range.toLowerCase()}`} className={className}>
          <Calendar />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        <DropdownMenuLabel>Date range</DropdownMenuLabel>
        {RANGES.map((r) => (
          <DropdownMenuItem key={r} onSelect={() => setRange(r)}>
            <CheckIcon className={cn("size-4", range !== r && "invisible")} />
            {r}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** Goes to the settings page (by its name), or says where settings would open. */
function useOpenSettings() {
  const { go } = useAppActions();
  const quick = useQuickAction();
  return () => {
    if (!["Settings", "Preferences", "Account", "Admin"].some((n) => go(n))) quick("Open settings");
  };
}

/** The signed-in person's menu: profile, settings, the theme, help, sign out. */
function UserMenu({ children, align = "end" }: { children: React.ReactNode; align?: "start" | "end" }) {
  const { setTheme, theme } = useTheme();
  const { go, notify, appName } = useAppActions();
  const openSettings = useOpenSettings();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="min-w-52">
        <DropdownMenuItem onSelect={() => (go("Profile") || go("Account") || openSettings())}>
          <UserRound />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={openSettings}>
          <Settings />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <SunMoon />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {(["light", "dark", "system"] as const).map((t) => (
              <DropdownMenuItem key={t} onSelect={() => setTheme(t)}>
                <CheckIcon className={cn("size-4", theme !== t && "invisible")} />
                {t === "light" ? "Light" : t === "dark" ? "Dark" : "System"}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem onSelect={() => notify(`The ${appName || "help"} help center opens in a new tab`, "info")}>
          <CircleHelp />
          Help and support
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive onSelect={() => notify("Signed out. See you soon.", "info")}>
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const NOTICE_ICON = { mention: AtSign, assignment: UserRound, system: InfoIcon, billing: CreditCard } as const;

/** The bell: a panel of notifications, All or Unread, each marked read as it's opened, and Mark all as read. */
function NotificationBell({ className, activity, side }: { className?: string; activity?: boolean; side?: "right" | "bottom" }) {
  const { notifications: all = [] } = React.useContext(ShellContext).shell;
  // Activity: the same feed as a plain history (the toolrail's clock), with nothing to mark.
  const notifications = activity ? all.map((n) => ({ ...n, unread: false })) : all;
  const [read, setRead] = React.useState<number[]>([]);
  const [unreadOnly, setUnreadOnly] = React.useState(false);
  const isUnread = (i: number) => Boolean(notifications[i]?.unread) && !read.includes(i);
  const unread = notifications.filter((_, i) => isUnread(i)).length;
  const shown = notifications.map((n, i) => ({ n, i })).filter(({ i }) => !unreadOnly || isUnread(i));
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" aria-label={activity ? "Recent activity" : unread ? `Notifications, ${unread} unread` : "Notifications"} className={cn("relative", className)}>
          {activity ? <Clock /> : <Bell />}
          {unread > 0 && <span aria-hidden="true" className="absolute top-1.5 right-1.5 size-2 rounded-full bg-destructive ring-2 ring-card" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent side={side} align={side === "right" ? "start" : "end"} className="w-80 p-0">
        <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
          <p className="text-sm font-semibold text-foreground">{activity ? "Recent activity" : "Notifications"}</p>
          {unread > 0 && (
            <button type="button" className="text-xs font-medium text-primary-ink hover:underline" onClick={() => setRead(notifications.map((_, i) => i))}>
              Mark all as read
            </button>
          )}
        </div>
        <div role="group" aria-label="Show" className={cn("flex gap-1 px-3 pt-2", activity && "hidden")}>
          {[false, true].map((u) => (
            <button
              key={String(u)}
              type="button"
              aria-pressed={unreadOnly === u}
              onClick={() => setUnreadOnly(u)}
              className={cn("rounded-md px-2.5 py-1 text-xs font-medium", unreadOnly === u ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              {u ? `Unread${unread ? ` ${unread}` : ""}` : "All"}
            </button>
          ))}
        </div>
        {shown.length ? (
          <ul className="flex max-h-80 flex-col overflow-y-auto p-1.5">
            {shown.map(({ n, i }) => {
              const Icon = NOTICE_ICON[n.kind ?? "system"];
              return (
                <li key={i}>
                  <button type="button" onClick={() => setRead((r) => (r.includes(i) ? r : [...r, i]))} className="flex w-full items-start gap-3 rounded-md px-2.5 py-2.5 text-left hover:bg-muted">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
                      <Icon className="size-3.5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={cn("block text-sm", isUnread(i) ? "font-medium text-foreground" : "text-muted-foreground")}>{n.title}</span>
                      {n.detail && <span className="block truncate text-xs text-muted-foreground">{n.detail}</span>}
                      <span className="mt-0.5 block text-[11px] text-muted-foreground">{n.time}</span>
                    </span>
                    {isUnread(i) && (
                      <span className="mt-2 size-2 shrink-0 rounded-full bg-primary-mark">
                        <span className="sr-only">Unread</span>
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="px-4 py-8 text-center text-sm text-muted-foreground">{unreadOnly ? "Nothing unread." : "You're all caught up."}</p>
        )}
      </PopoverContent>
    </Popover>
  );
}

/** The search box, when the shell has a placeholder for it; `compact`: a small box on wide screens, an icon below. */
function SearchBox({ compact }: { compact?: boolean }) {
  const { search } = React.useContext(ShellContext).shell;
  if (!search) return null;
  if (compact)
    return (
      <>
        <button
          type="button"
          onClick={openCommandPalette}
          aria-keyshortcuts="Meta+K"
          className="hidden h-8 w-48 min-w-0 items-center gap-2 rounded-md border border-border bg-background px-2.5 text-left text-xs text-muted-foreground lg:flex"
        >
          <Search aria-hidden className="size-3.5 shrink-0" />
          <span className="truncate">{search}</span>
          <kbd className="ml-auto font-mono text-[10px]">⌘K</kbd>
        </button>
        <Button size="icon" variant="ghost" aria-label={search} onClick={openCommandPalette} className="lg:hidden">
          <Search />
        </Button>
      </>
    );
  return (
    <button
      type="button"
      onClick={openCommandPalette}
      aria-keyshortcuts="Meta+K"
      className="relative flex h-9 w-full min-w-0 max-w-md items-center rounded-md border border-border bg-card pr-12 pl-9 text-left text-sm text-muted-foreground outline-none focus-visible:border-primary"
    >
      <Search aria-hidden className="pointer-events-none absolute left-3 size-4" />
      <span className="truncate">{search}</span>
      <kbd className="pointer-events-none absolute right-2.5 rounded border border-border px-1 font-mono text-[10px]">⌘K</kbd>
    </button>
  );
}

/** The top-bar buttons the shell asks for (date range, New, Ask AI, help, theme); `compact`: icon buttons. */
function TopActions({ compact }: { compact?: boolean }) {
  const { actions } = React.useContext(ShellContext).shell;
  if (!actions?.length) return null;
  const has = (a: NonNullable<Shell["actions"]>[number]) => actions.includes(a);
  if (compact)
    return (
      <span className="flex shrink-0 items-center gap-0.5">
        {has("range") && <RangeMenu />}
        {has("new") && (
          <NewMenu>
            <Button size="icon" variant="ghost" aria-label="New">
              <Plus />
            </Button>
          </NewMenu>
        )}
        {has("ai") && (
          <AskAI>
            <Button size="icon" variant="ghost" aria-label="Ask AI">
              <Sparkles className="text-primary-ink" />
            </Button>
          </AskAI>
        )}
        {has("help") && (
          <HelpMenu>
            <Button size="icon" variant="ghost" aria-label="Help">
              <CircleHelp />
            </Button>
          </HelpMenu>
        )}
        {has("theme") && <ThemeToggle />}
      </span>
    );
  return (
    <span className="flex shrink-0 items-center gap-1">
      {has("range") && (
        <DateRangePicker defaultLabel="Last 30 days" comparable className="mr-1 w-auto shrink-0 text-xs whitespace-nowrap" />
      )}
      {has("new") && (
        <NewMenu>
          <Button size="sm" variant="outline" className="mr-1">
            <Plus />
            New
          </Button>
        </NewMenu>
      )}
      {has("ai") && (
        <AskAI>
          <Button size="sm" variant="gradient" className="mr-1">
            <Sparkles />
            Ask AI
          </Button>
        </AskAI>
      )}
      {has("help") && (
        <HelpMenu>
          <Button size="icon" variant="ghost" aria-label="Help">
            <CircleHelp />
          </Button>
        </HelpMenu>
      )}
      {has("theme") && <ThemeToggle />}
    </span>
  );
}

/** The signed-in user at the end of a top bar: avatar, name and role. */
function TopUser({ user }: { user: string }) {
  const { role } = React.useContext(ShellContext).shell;
  return (
    <span className="flex shrink-0 items-center border-l border-border pl-3">
      <UserMenu>
        <button type="button" aria-label={`Account menu for ${user}`} className="flex items-center gap-2.5 rounded-md px-1.5 py-1 text-left hover:bg-muted/60">
          <Avatar name={user} size="sm" />
          <span className="leading-tight whitespace-nowrap">
            <span className="block text-[13px] font-medium text-foreground">{user}</span>
            {role && <span className="block text-[11px] text-muted-foreground">{role}</span>}
          </span>
          <ChevronDown className="size-4 text-muted-foreground" aria-hidden="true" />
        </button>
      </UserMenu>
    </span>
  );
}

/**
 * The top bar over the page in sidebar layouts: the workspace switcher and
 * search on the left; the actions, notifications and the user on the right.
 * Shown once the shell has something for it. `noSearch`: the layout has its
 * own search elsewhere (the dual layout's panel).
 */
function SearchBar({ user, noSearch }: { user: string; noSearch?: boolean }) {
  const { search, workspace, actions } = React.useContext(ShellContext).shell;
  const openSettings = useOpenSettings();
  if (!(search && !noSearch) && !workspace && !actions?.length) return null;
  return (
    <header data-bar="" className="hidden h-16 items-center gap-3 border-b border-border px-8 lg:flex">
      <WorkspaceSwitcher />
      {!noSearch && <SearchBox />}
      <span className="ml-auto flex shrink-0 items-center gap-1">
        <TopActions />
        <NotificationBell />
        <Button size="icon" variant="ghost" aria-label="Settings" onClick={openSettings}>
          <Settings />
        </Button>
      </span>
      <TopUser user={user} />
    </header>
  );
}

// Horizontal strips that scroll on small screens without showing a scrollbar.
const SCROLL_STRIP = "overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";
/** Scrolls without a scrollbar of its own. */
const QUIET_SCROLL = "overflow-y-auto overscroll-y-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";
/** A sidebar's page list scrolls when the pages outrun the window, keeping at least a few pages in view. */
const NAV_SCROLL = cn("min-h-36 shrink", QUIET_SCROLL);
/** A sidebar column: the page list gives way first (NAV_SCROLL), the other blocks keep their height, and past that the column scrolls. */
const NAV_COLUMN = cn("min-h-0 [&>:not(nav)]:shrink-0", QUIET_SCROLL);

/** The sidebar's linked notes, for the small-screen menu: the one block worth carrying over. */
function MenuNotes() {
  const parts = React.useContext(ShellContext).shell.sidebar?.parts ?? [];
  return parts.map((p, i) => (typeof p === "object" && p.type === "note" && p.links?.length ? <NoteCard key={i} text={p.text} links={p.links} /> : null));
}

/**
 * Small screens: a menu button that opens the whole navigation in a side
 * sheet. For apps it holds the links with their counts, the sidebar extras,
 * any linked notes and the user; for sites, the links and the call to action.
 */
function MobileMenu({
  appName,
  nav,
  user,
  site,
  className,
  trigger,
}: {
  appName: string;
  nav: string[];
  /** The signed-in user (apps). */
  user?: string;
  /** A marketing site: plain links and a call to action, from the right. */
  site?: boolean;
  className?: string;
  /** A custom trigger button; a ghost menu icon by default. */
  trigger?: React.ReactElement;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger ?? (
          <Button size="icon" variant="ghost" aria-label="Open menu" className={cn("shrink-0", className)}>
            <Menu />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent title={appName} side={site ? "right" : "left"} className="max-w-[300px]">
        <SheetBody className="flex flex-col gap-5 px-3">
          <nav aria-label="Main" className="flex flex-col gap-0.5">
            {nav.map((label, i) =>
              site ? (
                <a key={label} href="#" className="rounded-md px-2.5 py-2.5 text-[15px] text-foreground transition-colors hover:bg-muted">
                  {label}
                </a>
              ) : (
                <NavLink key={label} label={label} i={i} className="px-2.5 py-2.5" />
              ),
            )}
          </nav>
          {!site && <SidebarExtras />}
          {!site && <MenuNotes />}
        </SheetBody>
        <div className="border-t border-border p-3">{site ? <GetStarted className="w-full" /> : user && <UserChip user={user} />}</div>
      </SheetContent>
    </Sheet>
  );
}

/** Small-screen header for layouts whose navigation is a sidebar or rail: menu, brand, user. */
function MobileHeader({ appName, nav, user }: { appName: string; nav: string[]; user: string }) {
  return (
    <header data-slot="app-nav" className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur lg:hidden">
      <div className="flex h-14 items-center gap-2 pr-4 pl-2 sm:pl-4">
        <MobileMenu appName={appName} nav={nav} user={user} />
        <Brand appName={appName} />
        <span className="ml-auto">
          <UserChip compact user={user} />
        </span>
      </div>
    </header>
  );
}

/** Bottom tabs on phones, for layouts whose navigation is otherwise behind the menu: the first five pages. */
function MobileTabs({ nav }: { nav: string[] }) {
  const { link, isCurrent } = useLinks();
  return (
    <nav data-slot="app-nav" aria-label="Pages" className="fixed inset-x-0 bottom-0 z-30 flex border-t border-border bg-card/95 px-1 pt-1 pb-[max(0.25rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
      {nav.slice(0, 5).map((label, i) => {
        const Icon = NAV_ICONS[iconName(label, i)];
        return (
          <a key={label} {...link(i)} className={cn("flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-md px-1 py-1.5 text-[11px]", isCurrent(i) ? "font-medium text-primary-ink" : "text-muted-foreground")}>
            <span className="relative">
              <Icon className="size-5 shrink-0" />
              <NavDot label={label} />
            </span>
            <span className="max-w-full truncate">{label}</span>
          </a>
        );
      })}
    </nav>
  );
}

/** Floating bottom navigation: a full-width bar on phones, a pill dock above. */
function Dock({ nav, className }: { nav: string[]; className?: string }) {
  const { link, isCurrent } = useLinks();
  return (
    <div className={cn("pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center sm:bottom-5", className)}>
      <nav
        data-slot="app-nav"
        // More pages than fit: the dock keeps to the screen and scrolls sideways, never running past its edge.
        className="pointer-events-auto flex w-full max-w-full overflow-x-auto overscroll-x-contain border-t border-border bg-card/90 px-2 py-1.5 backdrop-blur [scrollbar-width:none] sm:w-auto sm:max-w-[calc(100%-2rem)] sm:gap-1 sm:rounded-2xl sm:border sm:p-2 sm:shadow-xl [&::-webkit-scrollbar]:hidden"
      >
        {nav.map((label, i) => {
          const Icon = NAV_ICONS[iconName(label, i)];
          return (
            <a
              key={label}
              {...link(i)}
              className={cn(
                "flex min-w-[58px] flex-1 flex-col items-center gap-0.5 rounded-xl px-1.5 py-1.5 text-[11px] transition-colors sm:min-w-[72px] sm:flex-none sm:px-3 sm:py-2",
                isCurrent(i) ? "bg-primary-strong font-medium text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
              )}
            >
              <span className="relative">
                <Icon className="size-5 shrink-0" />
                {!isCurrent(i) && <NavDot label={label} />}
              </span>
              <span className="max-w-full truncate">{label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}

/** Brand, the pages as pills (the current one filled, counts in the brand) and actions, as wide as the page below. */
function PillsHeader({ appName, nav, user, tools = true, outlined }: { appName: string; nav: string[]; user: string; tools?: boolean; outlined?: boolean }) {
  const { search } = React.useContext(ShellContext).shell;
  const { link, isCurrent } = useLinks();
  const { aside } = React.useContext(ShellContext);
  return (
    <header className={cn("mx-auto flex w-full items-center gap-3 px-4 pt-5 sm:px-6 lg:px-8", aside ? "max-w-[1480px]" : "max-w-6xl")}>
      <MobileMenu appName={appName} nav={nav} user={user} className="md:hidden" />
      {outlined ? (
        // The outlined design: the logo in a pill of its own, like the tabs.
        <span className="flex min-w-0 items-center rounded-full border border-border bg-card py-1 pr-4 pl-1">
          <Brand appName={appName} />
        </span>
      ) : (
        <Brand appName={appName} />
      )}
      <nav aria-label="Main" className={cn("mx-auto hidden min-w-0 items-center gap-1.5 md:flex", SCROLL_STRIP)}>
        {nav.map((label, i) => (
          <a
            key={label}
            {...link(i)}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors",
              outlined && "border",
              isCurrent(i)
                ? cn("bg-foreground font-medium text-background shadow-sm", outlined && "border-foreground")
                : cn("text-muted-foreground hover:bg-muted hover:text-foreground", outlined && "border-border bg-card hover:border-foreground/30"),
            )}
          >
            {label}
            <NavBadge label={label} />
          </a>
        ))}
      </nav>
      <span className="ml-auto flex items-center gap-1.5 md:ml-0">
        <WorkspaceSwitcher compact />
        {tools && (
          <span className="hidden md:flex">
            <TopActions compact />
          </span>
        )}
        {search ? (
          <SearchBox compact />
        ) : (
          <Button size="icon" variant="outline" aria-label="Search" onClick={openCommandPalette} className="hidden rounded-full sm:inline-flex">
            <Search />
          </Button>
        )}
        <NotificationBell className="rounded-full border border-border" />
        <UserChip compact user={user} />
      </span>
    </header>
  );
}

/**
 * A floating rail of the product's tools beside the page (search, new,
 * activity, alerts, settings, the theme), for layouts whose pages sit across
 * the top. It stays put as the page scrolls; phones get the menu instead.
 */
function ToolRail() {
  const { actions } = React.useContext(ShellContext).shell;
  const openSettings = useOpenSettings();
  const item = "grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";
  return (
    <aside
      data-slot="app-nav"
      aria-label="Tools"
      className="sticky top-6 ml-4 hidden h-fit shrink-0 flex-col items-center gap-1 self-start rounded-full border border-border bg-card/90 p-1.5 shadow-lg backdrop-blur lg:flex"
    >
      <button type="button" onClick={openCommandPalette} aria-label="Search" aria-keyshortcuts="Meta+K" className={item}>
        <Search className="size-4" />
      </button>
      <NewMenu side="right">
        <button type="button" aria-label="New" className="grid size-9 place-items-center rounded-full bg-primary-strong text-primary-foreground shadow-sm transition-[filter] hover:brightness-110">
          <Plus className="size-4" />
        </button>
      </NewMenu>
      <NotificationBell activity side="right" className={item} />
      <NotificationBell side="right" className={item} />
      {actions?.includes("ai") && (
        <AskAI side="right">
          <button type="button" aria-label="Ask AI" className={item}>
            <Sparkles className="size-4" />
          </button>
        </AskAI>
      )}
      <button type="button" aria-label="Settings" onClick={openSettings} className={item}>
        <Settings className="size-4" />
      </button>
      <span className="my-1 h-px w-5 bg-border" />
      <ThemeToggle />
    </aside>
  );
}

/** The pages as icons down a rail; the current one sits in a raised box. Labels are their names. */
function IconRail({ nav }: { nav: string[] }) {
  const { link, isCurrent } = useLinks();
  return (
    <nav aria-label="Main" className={cn("flex w-full flex-1 flex-col items-center gap-1.5 px-2", NAV_SCROLL)}>
      {nav.map((label, i) => {
        const Icon = NAV_ICONS[iconName(label, i)];
        return (
          <a
            key={label}
            {...link(i)}
            title={label}
            aria-label={label}
            className={cn(
              "grid size-10 place-items-center rounded-lg border transition-colors",
              isCurrent(i) ? "border-border bg-background text-foreground shadow-sm" : "border-transparent text-muted-foreground hover:bg-muted/60 hover:text-foreground",
            )}
          >
            <span className="relative">
              <Icon className={cn("size-5", isCurrent(i) && "text-primary-ink")} />
              <NavDot label={label} />
            </span>
          </a>
        );
      })}
    </nav>
  );
}

/**
 * The pages in a row that shares its line with the tools: named while they
 * fit, otherwise icons (named in tooltips) beside the current page's name,
 * so a long list never runs off the edge.
 */
function FittingNav({ nav }: { nav: string[] }) {
  const ref = React.useRef<HTMLElement>(null);
  const [compact, setCompact] = React.useState(false);
  // The row's width with every name showing, measured while they show.
  const full = React.useRef(0);
  const names = nav.join("|");
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      if (!compact) full.current = el.scrollWidth;
      setCompact(full.current > el.clientWidth + 1);
    };
    fit();
    const watch = new ResizeObserver(fit);
    watch.observe(el);
    return () => watch.disconnect();
  }, [compact, names]);
  const { isCurrent } = useLinks();
  return (
    <nav ref={ref} aria-label="Main" className={cn("hidden min-w-0 flex-1 items-center gap-1 md:flex", SCROLL_STRIP)}>
      {nav.map((label, i) => (
        <NavLink key={label} label={label} i={i} badge="fill" inline iconOnly={compact && !isCurrent(i)} className={cn("shrink-0 py-1.5", compact && !isCurrent(i) ? "px-2" : "px-3")} />
      ))}
    </nav>
  );
}

/** The workspaces down a slim rail, beside a panel of the pages (the dual and four-pane layouts). */
function WorkspaceRail({ appName }: { appName: string }) {
  return (
    <div className="flex w-16 flex-col items-center gap-3 border-r border-border py-4">
      <AppMark appName={appName} />
      {["Northwind", "Acme"].map((w) => (
        <span
          key={w}
          title={w}
          className="flex size-7 items-center justify-center rounded-md bg-muted font-heading text-xs font-semibold text-muted-foreground"
        >
          {w.charAt(0)}
        </span>
      ))}
      <span className="flex size-7 items-center justify-center rounded-md border border-dashed border-border text-muted-foreground">
        <Plus className="size-3.5" />
      </span>
    </div>
  );
}

/** A search field at the top of a panel of pages; it opens ⌘K. */
function PanelSearch() {
  const { search } = React.useContext(ShellContext).shell;
  return (
    <button
      type="button"
      onClick={openCommandPalette}
      aria-keyshortcuts="Meta+K"
      className="mt-4 flex h-8 items-center gap-2 rounded-md border border-border bg-background px-2 text-left text-xs text-muted-foreground"
    >
      <Search aria-hidden className="size-3.5" />
      <span className="truncate">{search ?? "Search"}</span>
    </button>
  );
}

/**
 * The page beside a full-height panel on the right that holds the page's
 * side sections; on narrow screens the panel follows the page. A header, if
 * given, sits over the page only, so the panel runs from the top of the
 * window; the panel's bar shows the user only where one is given.
 */
function SidePanel({ user, header, children }: { user?: string; header?: React.ReactNode; children: React.ReactNode }) {
  const context = React.useContext(ShellContext);
  const { aside } = context;
  const page = React.useMemo(() => ({ ...context, aside: undefined }), [context]);
  return (
    <div className="flex min-h-dvh flex-col xl:flex-row">
      <div className="min-w-0 flex-1">
        {header}
        <ShellContext.Provider value={page}>
          <Content>{children}</Content>
        </ShellContext.Provider>
      </div>
      {aside && (
        <aside aria-label="Side panel" className={cn("flex flex-col border-t border-border bg-card px-5 py-6 xl:sticky xl:top-0 xl:h-dvh xl:w-[340px] xl:shrink-0 xl:overflow-y-auto xl:border-t-0 xl:border-l", SECTION_GAP)}>
          <div className="flex items-center justify-end gap-1">
            <RangeMenu />
            <NotificationBell />
            {user && <UserChip compact user={user} />}
          </div>
          <Sections>{aside}</Sections>
        </aside>
      )}
    </div>
  );
}

// Space between sections: the theme's gap, or gap-6 on the density's scale.
const SECTION_GAP = "gap-[var(--studio-gap,calc(var(--spacing)*6))]";

function Content({ children, className }: { children: React.ReactNode; className?: string }) {
  const { aside, list, frame, mobileTabs } = React.useContext(ShellContext);
  // Room for the bottom tabs on phones.
  const bottom = mobileTabs ? "max-lg:pb-24" : undefined;
  // A fill page runs to the bottom of the window; what sits above it differs by layout, so its top is measured.
  const fillRef = React.useRef<HTMLDivElement>(null);
  React.useLayoutEffect(() => {
    const el = fillRef.current;
    if (!el) return;
    const measure = () => el.style.setProperty("--fill-top", `${Math.round(el.getBoundingClientRect().top + window.scrollY)}px`);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [frame]);
  if (frame === "fill") {
    // The header, then one tool stretched to the foot of the window.
    const [header, ...rest] = React.Children.toArray(children);
    return (
      <div ref={fillRef} data-slot="page-content" className={cn(bottom, "flex h-[calc(100dvh-var(--fill-top,0px))] w-full flex-col overflow-y-auto px-4 py-4 sm:px-6", SECTION_GAP, className)}>
        <Sections>{header}</Sections>
        <Sections fill>{rest}</Sections>
      </div>
    );
  }
  if (frame === "board") {
    // The page is the board: the header a slim row, the canvas to every edge and to the foot of the window,
    // and the side sections one docked panel (under the board on smaller screens).
    const [header, ...rest] = React.Children.toArray(children);
    return (
      <div ref={fillRef} data-slot="page-content" className={cn(bottom, "flex w-full flex-col xl:h-[calc(100dvh-var(--fill-top,0px))] xl:flex-row", className)}>
        <div className="flex min-h-[72dvh] min-w-0 flex-1 flex-col xl:min-h-0">
          <div className="border-b border-border px-4 py-3 sm:px-6">
            <Sections>{header}</Sections>
          </div>
          <div className="flex min-h-0 flex-1 flex-col">
            <Sections fill>{rest}</Sections>
          </div>
        </div>
        {(aside || list) && (
          <aside aria-label="Side panel" className={cn("flex flex-col border-t border-border bg-card p-4 xl:w-[400px] xl:shrink-0 xl:overflow-y-auto xl:border-t-0 xl:border-l", SECTION_GAP)}>
            <Sections>
              {list}
              {aside}
            </Sections>
          </aside>
        )}
      </div>
    );
  }
  if (frame === "settings") {
    // The header across; the list column as a sticky sub-nav of areas, the areas' sections beside it.
    const [header, ...rest] = React.Children.toArray(children);
    return (
      <div data-slot="page-content" className={cn(bottom, "mx-auto flex w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-8", SECTION_GAP, className)}>
        <Sections>{header}</Sections>
        <div className={cn("grid", list && "lg:grid-cols-[232px_minmax(0,1fr)]", SECTION_GAP)}>
          {list && (
            <nav aria-label="Areas" className={cn("flex min-w-0 flex-col lg:sticky lg:top-6 lg:self-start", SECTION_GAP)}>
              <Sections>{list}</Sections>
            </nav>
          )}
          <div className={cn("flex min-w-0 flex-col", SECTION_GAP)}>
            <Sections>
              {rest}
              {aside}
            </Sections>
          </div>
        </div>
      </div>
    );
  }
  if (frame === "detail" && !list) {
    // A record's page: the header spans the page; under it the content, with
    // the side sections as a properties rail that stays put while it scrolls.
    const [header, ...rest] = React.Children.toArray(children);
    return (
      <div data-slot="page-content" className={cn(bottom, "mx-auto flex w-full max-w-[1480px] flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-8", SECTION_GAP, className)}>
        <Sections>{header}</Sections>
        <div className={cn("grid", aside && "xl:grid-cols-[minmax(0,1fr)_300px]", SECTION_GAP)}>
          <div className={cn("flex min-w-0 flex-col", SECTION_GAP)}>
            <Sections>{rest}</Sections>
          </div>
          {aside && (
            <aside data-slot="rail" aria-label="Properties" className={cn("flex min-w-0 flex-col xl:sticky xl:top-6 xl:self-start", SECTION_GAP)}>
              <Sections>{aside}</Sections>
            </aside>
          )}
        </div>
      </div>
    );
  }
  if (!aside && !list) {
    return (
      <div data-slot="page-content" className={cn(bottom, "mx-auto flex w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-8", SECTION_GAP, className)}>
        <Sections>{children}</Sections>
      </div>
    );
  }
  // A list column to the left (full height, its items scrolling inside), a
  // side column to the right, or both, on wide screens; stacked on narrow ones.
  const cols =
    list && aside
      ? "lg:grid-cols-[340px_minmax(0,1fr)] xl:grid-cols-[340px_minmax(0,1fr)_320px]"
      : list
        ? "lg:grid-cols-[340px_minmax(0,1fr)]"
        : "xl:grid-cols-[minmax(0,1fr)_320px]";
  return (
    <div data-slot="page-content" className={cn(bottom, "mx-auto grid w-full max-w-[1480px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8", cols, SECTION_GAP, className)}>
      {list && (
        <div data-slot="list-column" className={cn("flex min-w-0 flex-col lg:sticky lg:top-6 lg:h-[calc(100dvh-3rem)] lg:min-h-[480px]", SECTION_GAP)}>
          <Sections fill>{list}</Sections>
        </div>
      )}
      <div className={cn("flex min-w-0 flex-col", SECTION_GAP)}>
        <Sections>{children}</Sections>
      </div>
      {aside && (
        <aside className={cn("flex min-w-0 flex-col", SECTION_GAP)}>
          <Sections>{aside}</Sections>
        </aside>
      )}
    </div>
  );
}

function AppFrame({
  appName,
  nav,
  layout = "sidebar",
  user = "Alex Morgan",
  shell,
  aside,
  list,
  frame,
  current = 0,
  links,
  onPage,
  tabsFrom,
  children,
}: {
  appName: string;
  nav: string[];
  layout?: AppLayout | string;
  /** The signed-in user shown in the shell. */
  user?: string;
  shell?: Shell;
  /** Sections for a side column beside the page. */
  aside?: React.ReactNode;
  /** Sections for a full-height list column to the left of the page (an inbox's items; the open one is the page). */
  list?: React.ReactNode;
  /** "detail": a record's page, the header across the top and the side sections as a properties rail. */
  frame?: PageFrame;
  /** Which nav link is this page. */
  current?: number;
  /** Where each nav link goes, e.g. ["/", "/tasks"]. */
  links?: string[];
  /** Follows a link to a page by index, where the pages have no routes (a preview). */
  onPage?: (index: number) => void;
  /** What switches the page's body: the header's tabs, or a settings page's list of areas. */
  tabsFrom?: "header" | "list";
  children: React.ReactNode;
}) {
  const mobileTabs = layout !== "dock" && layout !== "sidedock" && frame !== "focus" && frame !== "split";
  const context = React.useMemo(() => ({ shell: shell ?? {}, aside, list, frame, current, links, onPage, mobileTabs }), [shell, aside, list, frame, current, links, onPage, mobileTabs]);
  // The open header tab, unless the Studio holds it above.
  const above = React.useContext(PageTabsContext);
  // Until a tab is picked, a route opened at #tab-k (a nested sidebar's link) starts on that tab.
  const [ownTab, setOwnTab] = React.useState<number | null>(null);
  const hashTab = React.useSyncExternalStore(subscribeHash, tabFromHash, () => 0);
  // The open tab is in the address (#tab-2), so a link or a reload opens the same tab.
  const tabs = React.useMemo(
    () =>
      above ?? {
        active: ownTab ?? hashTab,
        setActive: (i: number) => {
          setOwnTab(i);
          window.history.replaceState(null, "", i ? `#tab-${i}` : window.location.pathname + window.location.search);
        },
        source: tabsFrom,
      },
    [above, ownTab, hashTab, tabsFrom],
  );
  // What the page's sections have registered for ⌘K.
  const [registry, setRegistry] = React.useState<Record<string, SearchEntry[]>>({});
  const index = React.useMemo(
    () => ({
      add: (key: string, entries: SearchEntry[]) => setRegistry((r) => ({ ...r, [key]: entries })),
      remove: (key: string) =>
        setRegistry((r) => {
          const next = { ...r };
          delete next[key];
          return next;
        }),
    }),
    [],
  );
  const found = React.useMemo(() => Object.values(registry).flat(), [registry]);
  return (
    <SearchIndexContext.Provider value={index}>
    <PageTabsContext.Provider value={tabs}>
    <ShellContext.Provider value={context}>
      <TooltipProvider delayDuration={300}>
        <AppActions nav={nav} appName={appName} links={links} onPage={onPage}>
          <SkipLink />
          <AppLayoutFrame appName={appName} nav={nav} layout={layout} user={user}>
            {children}
          </AppLayoutFrame>
          <AppCommands nav={nav} found={found} />
          <LeaveGuard />
          <IconTips />
        </AppActions>
      </TooltipProvider>
    </ShellContext.Provider>
    </PageTabsContext.Provider>
    </SearchIndexContext.Provider>
  );
}

const CONSENT_KEY = "cookie-consent";
const CONSENT_EVENT = "cookie-consent";
const subscribeConsent = (on: () => void) => {
  window.addEventListener(CONSENT_EVENT, on);
  window.addEventListener("storage", on);
  return () => {
    window.removeEventListener(CONSENT_EVENT, on);
    window.removeEventListener("storage", on);
  };
};
const readConsent = () => {
  try {
    return window.localStorage.getItem(CONSENT_KEY) ?? "";
  } catch {
    return "";
  }
};
/** The categories a visitor can turn on; strictly necessary cookies can't be turned off. */
const COOKIE_KINDS = [
  { id: "necessary", label: "Strictly necessary", hint: "Sign-in, security and your cookie choice. Always on.", locked: true },
  { id: "analytics", label: "Analytics", hint: "Counting visits and how pages are used, to improve the site." },
  { id: "marketing", label: "Marketing", hint: "Measuring campaigns and showing relevant ads elsewhere." },
] as const;

/**
 * A cookie consent banner: reject and accept carry the same weight, and
 * Preferences turns categories on one by one. The choice is kept in the
 * browser (`cookie-consent`: "all", "necessary" or the chosen ids), so the
 * banner shows once; read it before loading any analytics.
 */
function CookieBanner() {
  const choice = React.useSyncExternalStore(subscribeConsent, readConsent, () => "pending");
  const [open, setOpen] = React.useState(false);
  const [picked, setPicked] = React.useState<string[]>(["necessary"]);
  const decide = (value: string) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // Storage blocked: the banner just goes for this visit.
    }
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setOpen(false);
  };
  if (choice) return null;
  return (
    <>
      <section
        aria-label="Cookie consent"
        className="fixed inset-x-3 bottom-3 z-40 flex flex-col gap-4 rounded-lg border border-border bg-card p-5 text-card-foreground shadow-lg sm:inset-x-auto sm:left-4 sm:max-w-md"
      >
        <div>
          <p className="font-heading text-sm font-semibold text-foreground">Cookies on this site</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            We use cookies to run the site and, if you agree, to see how it&rsquo;s used and measure our campaigns.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => decide("necessary")}>
            Reject non-essential
          </Button>
          <Button size="sm" variant="outline" onClick={() => decide("all")}>
            Accept all
          </Button>
          <Button size="sm" variant="ghost" className="sm:ml-auto" onClick={() => setOpen(true)}>
            Preferences
          </Button>
        </div>
      </section>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent title="Cookie preferences">
          <DialogBody className="flex flex-col divide-y divide-border">
            {COOKIE_KINDS.map((k) => (
              <label key={k.id} className="flex items-start justify-between gap-6 py-3 first:pt-0 last:pb-0">
                <span>
                  <span className="block text-sm font-medium text-foreground">{k.label}</span>
                  <span className="block text-sm text-muted-foreground">{k.hint}</span>
                </span>
                <Switch
                  aria-label={k.label}
                  checked={"locked" in k || picked.includes(k.id)}
                  disabled={"locked" in k}
                  onCheckedChange={(on) => setPicked((p) => (on ? [...p, k.id] : p.filter((x) => x !== k.id)))}
                />
              </label>
            ))}
          </DialogBody>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => decide(picked.join(","))}>Save preferences</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

/** The first thing a keyboard reaches on every page: straight past the navigation to the page itself. */
function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only rounded-md bg-primary-strong px-3 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:outline-none focus:ring-2 focus:ring-ring"
    >
      Skip to content
    </a>
  );
}

const subscribeHash = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};
const tabFromHash = () => {
  const m = /#tab-(\d+)$/.exec(window.location.hash);
  return m ? Number(m[1]) : 0;
};

/**
 * ⌘K, or any search box in the shell: jump to a page, or start one of the
 * page's actions (its dialogs and drawers that aren't about one record).
 */
/** "BrightSmile Dublin" -> "BD": two workspaces of one brand stay apart. */
function initials(name: string) {
  const words = name.split(/\s+/).filter(Boolean);
  return (words.length > 1 ? words[0][0] + words[words.length - 1][0] : name.slice(0, 2)).toUpperCase();
}

function AppCommands({ nav, found }: { nav: string[]; found: SearchEntry[] }) {
  const { current, links, shell } = React.useContext(ShellContext);
  const { items: overlays, open } = React.useContext(OverlayContext);
  // People: the team in the shell, then everyone the page's sections show; records: what its tables list.
  const people = [...new Map([...(shell.team ?? []).map((t) => ({ group: "People" as const, label: t.name, detail: t.role })), ...found.filter((f) => f.group === "People")].map((e) => [e.label, e])).values()];
  const records = [...new Map(found.filter((f) => f.group === "Records").map((e) => [`${e.label}|${e.detail}`, e])).values()];
  const items: CommandItem[] = [
    ...overlays.flatMap((o, i) => (o.title.includes("{") || (o.kind !== "dialog" && o.kind !== "drawer") ? [] : [{ group: "Actions", label: o.title, value: `overlay:${i}`, icon: <Plus className="size-4" /> }])),
    ...nav.map((label, i) => {
      const Icon = NAV_ICONS[iconName(label, i)];
      return { group: "Pages", label: i === current ? `${label} (this page)` : label, value: `page:${i}`, icon: <Icon className="size-4" /> };
    }),
    ...records.map((r) => ({ group: "Records", label: r.detail ? `${r.label} · ${r.detail}` : r.label, value: `find:${r.label}`, icon: <BookOpen className="size-4" /> })),
    ...people.map((p) => ({ group: "People", label: p.detail ? `${p.label} · ${p.detail}` : p.label, value: `find:${p.label}`, icon: <UserRound className="size-4" /> })),
  ];
  return (
    <CommandPalette
      items={items}
      placeholder={records.length || people.length ? "Search pages, records and people…" : "Jump to a page or an action…"}
      onSelect={(item) => {
        const [kind, ...rest] = item.value.split(":");
        const at = rest.join(":");
        // After the palette has closed, so the overlay gets the focus.
        if (kind === "overlay") requestAnimationFrame(() => open(Number(at), null));
        // A record or a person: to where the page shows it, briefly marked.
        else if (kind === "find")
          requestAnimationFrame(() => {
            const el = [...document.querySelectorAll<HTMLElement>("[data-searchable]")].find((x) => x.dataset.searchable === at);
            el?.scrollIntoView({ block: "center", behavior: "smooth" });
            el?.animate?.([{ backgroundColor: "color-mix(in srgb, var(--primary) 18%, transparent)" }, { backgroundColor: "transparent" }], { duration: 1600 });
          });
        else goToPage(Number(at), links);
      }}
    />
  );
}

/**
 * Names icon-only buttons on hover and keyboard focus: any button or link
 * with an aria-label and no visible text gets the kit tooltip, so every
 * block's icon buttons are labelled without wrapping each one.
 */
function IconTips() {
  const [tip, setTip] = React.useState<{ label: string; el: HTMLElement } | null>(null);
  React.useEffect(() => {
    let timer = 0;
    const iconButton = (t: EventTarget | null) => {
      const el = t instanceof Element ? t.closest<HTMLElement>("button[aria-label], a[aria-label]") : null;
      return el && !el.textContent?.trim() && !el.closest("[data-no-tips]") ? el : null;
    };
    const show = (e: Event) => {
      const el = iconButton(e.target);
      if (!el) return;
      window.clearTimeout(timer);
      const label = el.getAttribute("aria-label")!;
      timer = window.setTimeout(() => setTip({ label, el }), e.type === "focusin" ? 0 : 300);
    };
    const hide = (e: Event) => {
      const el = iconButton(e.target);
      if (!el || (e instanceof PointerEvent && e.relatedTarget instanceof Node && el.contains(e.relatedTarget))) return;
      window.clearTimeout(timer);
      setTip(null);
    };
    const clear = () => setTip(null);
    document.addEventListener("pointerover", show);
    document.addEventListener("focusin", show);
    document.addEventListener("pointerout", hide);
    document.addEventListener("focusout", hide);
    document.addEventListener("pointerdown", clear);
    window.addEventListener("scroll", clear, true);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("pointerover", show);
      document.removeEventListener("focusin", show);
      document.removeEventListener("pointerout", hide);
      document.removeEventListener("focusout", hide);
      document.removeEventListener("pointerdown", clear);
      window.removeEventListener("scroll", clear, true);
    };
  }, []);
  if (!tip) return null;
  const r = tip.el.getBoundingClientRect();
  return (
    <Tooltip open>
      {/* A stand-in over the button, so the tooltip anchors to it without wrapping it. */}
      <TooltipTrigger asChild>
        <span aria-hidden className="pointer-events-none fixed" style={{ left: r.left, top: r.top, width: r.width, height: r.height }} />
      </TooltipTrigger>
      <TooltipContent>{tip.label}</TooltipContent>
    </Tooltip>
  );
}

/** No navigation: the brand, then one narrow column centred on the page (sign-in, verification, a checkout, an onboarding step). */
function FocusFrame({ appName, children }: { appName: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-muted/30">
      <header className="flex items-center justify-between px-6 py-5">
        <Brand appName={appName} />
        <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          Need help?
        </a>
      </header>
      <main id="main" tabIndex={-1} data-slot="page-content" className={cn("outline-none mx-auto flex w-full max-w-[460px] flex-1 flex-col justify-center px-4 pb-16", SECTION_GAP)}>
        <Sections>{children}</Sections>
      </main>
    </div>
  );
}

/**
 * The brand on one half, the page on the other: the page header (a statement
 * and a line) sits on a dark, brand-lit panel on the left; the rest, usually
 * one form card, is centred on the right. On phones the panel folds into the
 * top of the page.
 */
function SplitFrame({ appName, children }: { appName: string; children: React.ReactNode }) {
  const [header, ...rest] = React.Children.toArray(children);
  // Dark surfaces only, so the brand colour stays this app's (a .dark class would reset it to the kit's).
  const panel = {
    "--background": "#0a0a0f",
    "--foreground": "#ededf2",
    "--card": "#111118",
    "--card-foreground": "#ededf2",
    "--muted": "#16161e",
    "--muted-foreground": "#8a8a99",
    "--border": "#1f1f2a",
    colorScheme: "dark",
    backgroundImage:
      "radial-gradient(at 15% 0%, color-mix(in oklch, var(--primary) 50%, transparent), transparent 55%), radial-gradient(at 100% 100%, color-mix(in oklch, var(--primary) 35%, transparent), transparent 50%)",
  } as React.CSSProperties;
  return (
    <div className="flex min-h-dvh">
      <aside className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-background p-10 text-foreground lg:flex" style={panel}>
        <Brand appName={appName} />
        <div className={cn("flex flex-col", SECTION_GAP)}>
          <Sections>{header}</Sections>
        </div>
        <p className="text-xs text-muted-foreground">© {appName}</p>
      </aside>
      <main id="main" tabIndex={-1} data-slot="page-content" className="outline-none flex min-h-dvh w-full flex-col lg:w-1/2">
        <header className="flex items-center px-6 py-5 lg:hidden">
          <Brand appName={appName} />
        </header>
        <div className={cn("mx-auto flex w-full max-w-[440px] flex-1 flex-col justify-center px-4 pb-16", SECTION_GAP)}>
          <div className={cn("flex flex-col lg:hidden", SECTION_GAP)}>
            <Sections>{header}</Sections>
          </div>
          <Sections>{rest}</Sections>
        </div>
      </main>
    </div>
  );
}

/**
 * The layout, plus bottom tabs on phones for the layouts without a dock; the
 * focus and split frames stand alone. All of it sits in the app frame, which
 * a framed theme (data-frame) turns into a rounded sheet on an outer page.
 */
function AppLayoutFrame(props: { appName: string; nav: string[]; layout: AppLayout | string; user: string; children: React.ReactNode }) {
  const { mobileTabs, frame, shell } = React.useContext(ShellContext);
  return (
    <div data-slot="app-frame" data-page={frame === "board" ? "board" : undefined} data-topbar={shell.topbar && shell.topbar !== "line" ? shell.topbar : undefined} data-sidebar-edge={shell.sidebar?.edge && shell.sidebar.edge !== "line" ? shell.sidebar.edge : undefined}>
      {frame === "focus" ? (
        <FocusFrame appName={props.appName}>{props.children}</FocusFrame>
      ) : frame === "split" ? (
        <SplitFrame appName={props.appName}>{props.children}</SplitFrame>
      ) : (
        <>
          <LayoutBody {...props} />
          {mobileTabs && <MobileTabs nav={props.nav} />}
        </>
      )}
    </div>
  );
}

function LayoutBody({
  appName,
  nav,
  layout,
  user,
  children,
}: {
  appName: string;
  nav: string[];
  layout: AppLayout | string;
  user: string;
  children: React.ReactNode;
}) {
  const { shell, aside } = React.useContext(ShellContext);
  const { current, link, isCurrent } = useLinks();
  // The sidebar and inset layouts fold to icons, and take the product's sidebar tone.
  const [collapsed, setCollapsed] = React.useState(false);
  const tone = shell.sidebar?.tone ?? "card";
  const sideTone =
    tone === "tinted"
      ? "bg-muted/40"
      : tone === "canvas"
        ? "bg-transparent"
        : tone === "glass"
          ? "bg-card/60 backdrop-blur-xl backdrop-saturate-150"
          : tone === "inverse" || tone === "brand" || tone === "gradient"
            ? "bg-background text-foreground"
            : undefined;
  const sideStyle = SIDEBAR_TONE[tone];
  const collapse = (
    <button
      type="button"
      aria-label={collapsed ? "Expand the sidebar" : "Collapse the sidebar"}
      aria-expanded={!collapsed}
      onClick={() => setCollapsed((c) => !c)}
      className={cn("flex h-8 items-center gap-2 rounded-md px-2.5 text-xs text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground", collapsed && "justify-center px-0")}
    >
      {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
      {!collapsed && "Collapse"}
    </button>
  );
  switch (layout) {
    // Sidebar on a tinted canvas; the page sits in a raised, rounded panel.
    case "inset":
      return (
        <div className="flex min-h-dvh bg-muted/40">
          <aside
            data-slot="app-nav"
            data-sidebar=""
            className={cn("sticky top-0 hidden h-dvh shrink-0 flex-col py-5 lg:flex", collapsed ? "w-16 px-2" : cn(SIDEBAR_WIDTH[shell.sidebar?.width ?? "regular"], "px-3"), sideTone)}
            style={sideStyle}
            data-surface={tone === "inverse" ? "dark" : undefined}
          >
            <SidebarBody appName={appName} nav={nav} user={user} collapsed={collapsed} collapse={collapse} />
          </aside>
          <main id="main" tabIndex={-1} className="outline-none min-w-0 flex-1 lg:py-2 lg:pr-2">
            <MobileHeader appName={appName} nav={nav} user={user} />
            {/* The page panel carries the theme's backdrop, as the page body does in the other layouts. */}
            <div data-slot="page-panel" className="min-h-full border-border bg-background lg:rounded-xl lg:border lg:shadow-sm">
              <SearchBar user={user} />
              <Content>{children}</Content>
            </div>
          </main>
        </div>
      );

    // A slim rail, icon above label, with a top bar for the signed-in user.
    case "rail":
      return (
        <div className="flex min-h-dvh">
          <aside
            data-slot="app-nav"
            className={cn("sticky top-0 hidden h-dvh w-[72px] shrink-0 flex-col items-center gap-1 border-r border-border bg-card py-3 lg:flex", NAV_COLUMN)}
          >
            <AppMark appName={appName} />
            <nav className={cn("mt-3 flex w-full flex-1 flex-col gap-1 px-1.5", NAV_SCROLL)}>
              {nav.map((label, i) => {
                const Icon = NAV_ICONS[iconName(label, i)];
                return (
                  <a
                    key={label}
                    {...link(i)}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-md px-1 py-2 text-center text-[11px] leading-tight transition-colors",
                      isCurrent(i) ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                    )}
                  >
                    <span className="relative">
                      <Icon className={cn("size-5", isCurrent(i) && "text-primary-ink")} />
                      <NavDot label={label} />
                    </span>
                    {/* Two lines at most under the icon; a longer name ends in "…", with the whole of it in the tooltip. */}
                    <span className="line-clamp-2 max-w-full [overflow-wrap:anywhere]" title={label.length > 16 ? label : undefined}>
                      {label}
                    </span>
                  </a>
                );
              })}
            </nav>
          </aside>
          <main id="main" tabIndex={-1} className="outline-none min-w-0 flex-1">
            <MobileHeader appName={appName} nav={nav} user={user} />
            <header data-bar="" className="hidden h-14 items-center gap-3 border-b border-border bg-card px-6 lg:flex">
              <span className="mr-2 shrink-0 font-heading text-[15px] font-semibold tracking-tight text-foreground">{appName}</span>
              <WorkspaceSwitcher compact />
              <SearchBox compact />
              <span className="ml-auto">
                <TopActions compact />
              </span>
              <TopUser user={user} />
            </header>
            <Content>{children}</Content>
          </main>
        </div>
      );

    // Workspace rail plus a labelled panel (Discord / Slack).
    case "dual":
      return (
        <div className="flex min-h-dvh">
          <aside data-slot="app-nav" className="sticky top-0 hidden h-dvh shrink-0 border-r border-border bg-card lg:flex">
            <WorkspaceRail appName={appName} />
            <div className={cn("flex w-52 flex-col px-3 py-4", NAV_COLUMN)}>
              <p className="px-2 font-heading text-[15px] font-semibold tracking-tight text-foreground">{appName}</p>
              <PanelSearch />
              <nav className={cn("mt-4 flex flex-col gap-0.5", NAV_SCROLL)}>
                {nav.map((label, i) => (
                  <NavLink key={label} label={label} i={i} className="px-2 py-1.5" />
                ))}
              </nav>
              <div className="mt-5 min-h-0 flex-1">
                <SidebarExtras />
              </div>
              <UserChip user={user} />
            </div>
          </aside>
          <main id="main" tabIndex={-1} className="outline-none min-w-0 flex-1">
            <MobileHeader appName={appName} nav={nav} user={user} />
            <SearchBar user={user} noSearch />
            <Content>{children}</Content>
          </main>
        </div>
      );

    case "topbar":
      return (
        <div className="flex min-h-dvh flex-col">
          <header data-slot="app-nav" data-bar="" className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
            <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 pr-4 pl-2 sm:px-6 md:gap-6 lg:px-8">
              <MobileMenu appName={appName} nav={nav} user={user} className="md:hidden" />
              <Brand appName={appName} />
              <nav className={cn("hidden min-w-0 flex-1 items-center gap-1 md:flex", SCROLL_STRIP)}>
                {nav.map((label, i) => (
                  <NavLink key={label} label={label} i={i} badge="fill" inline className="shrink-0 px-3 py-1.5" />
                ))}
              </nav>
              <span className="ml-auto flex shrink-0 items-center gap-1 md:ml-0">
                <span className="hidden items-center gap-1 md:flex">
                  <WorkspaceSwitcher compact />
                  <SearchBox compact />
                  <TopActions compact />
                </span>
                <UserChip compact user={user} />
              </span>
            </div>
          </header>
          <main id="main" tabIndex={-1} className="min-w-0 flex-1 outline-none">
            <Content>{children}</Content>
          </main>
        </div>
      );

    // App header with search, and the pages as an underlined tab row.
    case "tabs":
      return (
        <div className="flex min-h-dvh flex-col">
          <header data-slot="app-nav" data-bar="" className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
            <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:px-6 lg:px-8">
              <Brand appName={appName} />
              <WorkspaceSwitcher compact />
              <button
                type="button"
                onClick={openCommandPalette}
                aria-keyshortcuts="Meta+K"
                className="ml-auto hidden h-8 w-56 items-center gap-2 rounded-md border border-border bg-background px-2.5 text-left text-xs text-muted-foreground md:flex"
              >
                <Search aria-hidden className="size-3.5 shrink-0" />
                <span className="truncate">{shell.search ?? "Search…"}</span>
                <kbd className="ml-auto font-mono text-[10px]">⌘K</kbd>
              </button>
              <span className="ml-auto flex items-center gap-1 md:ml-0">
                <span className="hidden md:flex">
                  <TopActions compact />
                </span>
                <UserChip compact user={user} />
              </span>
            </div>
            {/* Tabs stay a swipeable row on phones; the edge fades to show there's more. */}
            <nav className={cn("mx-auto flex max-w-6xl gap-5 px-4 max-md:[mask-image:linear-gradient(to_right,black_80%,transparent)] sm:px-6 lg:px-8", SCROLL_STRIP)}>
              {nav.map((label, i) => (
                <a
                  key={label}
                  {...link(i)}
                  className={cn(
                    "shrink-0 border-b-2 py-2.5 text-sm transition-colors",
                    isCurrent(i) ? "border-primary font-medium text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
                  )}
                >
                  {label}
                  <NavBadge label={label} />
                </a>
              ))}
            </nav>
          </header>
          <main id="main" tabIndex={-1} className="min-w-0 flex-1 outline-none">
            <Content>{children}</Content>
          </main>
        </div>
      );

    // A centered pill that floats over the page.
    case "floating":
      return (
        <div className="flex min-h-dvh flex-col">
          <div className="sticky top-0 z-30 flex justify-center px-3 pt-3">
            <header
              data-slot="app-nav"
              className="flex max-w-full items-center gap-2 rounded-full border border-border bg-card/85 px-2 py-1.5 shadow-lg backdrop-blur"
            >
              <AppMark appName={appName} small />
              {/* Phones: the current page and a menu; wider: every link in the pill. */}
              <span className="px-1.5 text-sm font-medium text-foreground sm:hidden">{nav[current]}</span>
              <nav className={cn("hidden items-center gap-0.5 sm:flex", SCROLL_STRIP)}>
                {nav.map((label, i) => (
                  <NavLink key={label} label={label} i={i} badge="fill" inline className="shrink-0 rounded-full px-3 py-1.5" />
                ))}
              </nav>
              <UserChip compact user={user} />
              <MobileMenu appName={appName} nav={nav} user={user} className="size-8 rounded-full sm:hidden" />
            </header>
          </div>
          <main id="main" tabIndex={-1} className="min-w-0 flex-1 outline-none">
            <Content>{children}</Content>
          </main>
        </div>
      );

    // A bottom dock: a floating bar on desktop, a tab bar on phones.
    case "dock":
      return (
        <div className="flex min-h-dvh flex-col">
          <header className="mx-auto flex h-14 w-full max-w-6xl items-center gap-2 px-4 sm:px-6 lg:px-8">
            <Brand appName={appName} />
            <span className="ml-auto flex items-center gap-1">
              <span className="hidden items-center gap-1 md:flex">
                <WorkspaceSwitcher compact />
                <SearchBox compact />
                <TopActions compact />
              </span>
              <UserChip compact user={user} />
            </span>
          </header>
          <main id="main" tabIndex={-1} className="min-w-0 flex-1 outline-none">
            <Content className="pb-28">{children}</Content>
          </main>
          <Dock nav={nav} />
        </div>
      );

    // Soft sidebar on desktop plus the floating dock; phones get the dock only.
    case "sidedock":
      return (
        <div className="flex min-h-dvh">
          <aside className={cn("sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-border/60 bg-card/60 px-3 py-6 backdrop-blur lg:flex", NAV_COLUMN)}>
            <div className="px-2">
              <Brand appName={appName} />
            </div>
            <nav aria-label="Main" className={cn("mt-8 flex flex-col gap-1", NAV_SCROLL)}>
              {nav.map((label, i) => {
                const Icon = NAV_ICONS[iconName(label, i)];
                return (
                  <a
                    key={label}
                    {...link(i)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                      isCurrent(i) ? "bg-primary/12 font-medium text-primary-ink" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                    )}
                  >
                    <Icon className="size-[18px] shrink-0" />
                    {label}
                    <NavBadge label={label} />
                  </a>
                );
              })}
            </nav>
            <div className="mt-5 min-h-0 flex-1">
              <SidebarExtras />
            </div>
            <UserChip user={user} />
          </aside>
          <main id="main" tabIndex={-1} className="outline-none min-w-0 flex-1">
            <header className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
              <span className="lg:hidden">
                <Brand appName={appName} />
              </span>
              <button
                type="button"
                onClick={openCommandPalette}
                aria-keyshortcuts="Meta+K"
                className="relative hidden h-10 w-full max-w-md items-center rounded-full border border-border bg-card/80 pr-4 pl-10 text-left text-sm text-muted-foreground outline-none focus-visible:border-primary sm:flex"
              >
                <Search aria-hidden className="pointer-events-none absolute left-3.5 size-4" />
                <span className="truncate">{shell.search ?? "Search…"}</span>
              </button>
              <WorkspaceSwitcher compact />
              <span className="ml-auto flex items-center gap-2">
                <span className="hidden md:flex">
                  <TopActions compact />
                </span>
                <NotificationBell />
                <UserChip compact user={user} />
              </span>
            </header>
            <Content className="pb-32">{children}</Content>
          </main>
          <Dock nav={nav} className="lg:pl-60" />
        </div>
      );

    // Brand, the pages as pills (the current one filled) and actions, in the page's flow.
    case "pills":
      return (
        <div className="flex min-h-dvh flex-col">
          <PillsHeader appName={appName} nav={nav} user={user} />
          <main id="main" tabIndex={-1} className="min-w-0 flex-1 outline-none">
            <Content>{children}</Content>
          </main>
        </div>
      );

    // The pill bar with every tab, and the logo, in an outlined pill of its own; the current one filled.
    case "capsules":
      return (
        <div className="flex min-h-dvh flex-col">
          <PillsHeader appName={appName} nav={nav} user={user} outlined />
          <main id="main" tabIndex={-1} className="min-w-0 flex-1 outline-none">
            <Content>{children}</Content>
          </main>
        </div>
      );

    // The pills across the top, and the product's tools down a floating rail on the left.
    case "toolrail":
      return (
        <div className="flex min-h-dvh flex-col">
          <PillsHeader appName={appName} nav={nav} user={user} tools={false} />
          <div className="flex min-h-0 flex-1">
            <ToolRail />
            <main id="main" tabIndex={-1} className="min-w-0 flex-1 outline-none">
              <Content>{children}</Content>
            </main>
          </div>
        </div>
      );

    // Icons only in a slim rail (the current one boxed), with the page's title across the top.
    case "icons":
      return (
        <div className="flex min-h-dvh">
          <aside data-slot="app-nav" className={cn("sticky top-0 hidden h-dvh w-16 shrink-0 flex-col items-center gap-1 border-r border-border bg-card py-4 lg:flex", NAV_COLUMN)}>
            <span className="mb-3 grid size-10 place-items-center rounded-lg border border-border bg-background shadow-sm">
              <AppMark appName={appName} />
            </span>
            <IconRail nav={nav} />
            <UserChip compact user={user} />
          </aside>
          <main id="main" tabIndex={-1} className="outline-none min-w-0 flex-1">
            <MobileHeader appName={appName} nav={nav} user={user} />
            <header data-bar="" className="hidden h-16 items-center gap-3 border-b border-border px-8 lg:flex">
              <p className="mr-2 font-heading text-xl font-semibold tracking-tight text-foreground">{nav[current]}</p>
              <WorkspaceSwitcher compact />
              <span className="ml-auto flex items-center gap-1">
                {shell.search ? (
                  <SearchBox compact />
                ) : (
                  <Button size="icon" variant="ghost" aria-label="Search" onClick={openCommandPalette}>
                    <Search />
                  </Button>
                )}
                <TopActions compact />
                <NotificationBell />
              </span>
            </header>
            <Content>{children}</Content>
          </main>
        </div>
      );

    // An icon rail, the page, and a full-height panel on the right for the page's side sections
    // (an assistant, a calendar and to-dos, meetings).
    case "panel":
      return (
        <div className="flex min-h-dvh">
          <aside data-slot="app-nav" className={cn("sticky top-0 hidden h-dvh w-16 shrink-0 flex-col items-center gap-1 border-r border-border bg-card py-4 lg:flex", NAV_COLUMN)}>
            <span className="mb-3">
              <AppMark appName={appName} />
            </span>
            <IconRail nav={nav} />
          </aside>
          <main id="main" tabIndex={-1} className="outline-none min-w-0 flex-1">
            <MobileHeader appName={appName} nav={nav} user={user} />
            <SidePanel user={user}>{children}</SidePanel>
          </main>
        </div>
      );

    // A rail of icons, each with its name under it; the current one boxed and marked at the edge.
    // No app bar: the page's breadcrumb and the tools share one line over the page.
    case "captions":
      return (
        <div className="flex min-h-dvh">
          <aside data-slot="app-nav" className={cn("sticky top-0 hidden h-dvh w-[84px] shrink-0 flex-col items-center gap-1 border-r border-border bg-card py-4 lg:flex", NAV_COLUMN)}>
            <AppMark appName={appName} />
            <nav aria-label="Main" className={cn("mt-4 flex w-full flex-1 flex-col gap-1 px-2", NAV_SCROLL)}>
              {nav.map((label, i) => {
                const Icon = NAV_ICONS[iconName(label, i)];
                return (
                  <a
                    key={label}
                    {...link(i)}
                    className={cn(
                      "relative flex flex-col items-center gap-1 rounded-lg border px-1 pt-2 pb-1.5 text-center text-[11px] leading-tight transition-colors",
                      isCurrent(i) ? "border-border bg-background font-medium text-foreground" : "border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                    )}
                  >
                    {isCurrent(i) && <span aria-hidden="true" className="absolute top-1/2 -left-2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-primary-mark" />}
                    <span className="relative">
                      <Icon className={cn("size-5", isCurrent(i) && "text-primary-ink")} />
                      <NavDot label={label} />
                    </span>
                    <span className="w-full [overflow-wrap:anywhere]">{label}</span>
                  </a>
                );
              })}
            </nav>
            <Button size="icon" variant="ghost" aria-label="Search" aria-keyshortcuts="Meta+K" onClick={openCommandPalette}>
              <Search />
            </Button>
            <UserChip compact user={user} />
          </aside>
          <main id="main" tabIndex={-1} className="outline-none min-w-0 flex-1">
            <MobileHeader appName={appName} nav={nav} user={user} />
            <header data-bar="" className="hidden h-16 items-center gap-3 px-8 lg:flex">
              <nav aria-label="Breadcrumb" className="min-w-0">
                <ol className="flex min-w-0 items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                  <li className="truncate">{appName}</li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="truncate text-foreground">
                    {nav[current]}
                  </li>
                </ol>
              </nav>
              <WorkspaceSwitcher compact />
              <span className="ml-auto flex shrink-0 items-center gap-1">
                <SearchBox compact />
                <TopActions compact />
                <NotificationBell />
              </span>
            </header>
            <Content>{children}</Content>
          </main>
        </div>
      );

    // The pages across the top of the page, and the page's side sections in a panel docked on the
    // right that runs the window's full height (a profile, meetings, a feed); it follows the page on narrow screens.
    case "docked":
      return (
        <main id="main" tabIndex={-1} className="outline-none min-w-0">
          <SidePanel
            user={user}
            header={
              <header data-slot="app-nav" className="flex h-16 items-center gap-2 pr-4 pl-2 sm:px-6 md:gap-5 lg:px-8">
                <MobileMenu appName={appName} nav={nav} user={user} className="md:hidden" />
                <Brand appName={appName} />
                <FittingNav nav={nav} />
                <span className="ml-auto flex shrink-0 items-center gap-1 md:ml-0">
                  <span className="hidden items-center gap-1 md:flex">
                    <WorkspaceSwitcher compact />
                    <Button size="icon" variant="ghost" aria-label="Search" aria-keyshortcuts="Meta+K" onClick={openCommandPalette}>
                      <Search />
                    </Button>
                    <TopActions compact />
                  </span>
                  {/* The panel's bar holds the user where the panel sits beside the page. */}
                  <span className={cn("flex", aside && "xl:hidden")}>
                    <UserChip compact user={user} />
                  </span>
                </span>
              </header>
            }
          >
            {children}
          </SidePanel>
        </main>
      );

    // Four panes: the workspaces on a rail, the pages as a tree, the page, and a docked panel
    // on the right for the page's side sections (a contact, a chat, the details).
    case "workspace":
      return (
        <div className="flex min-h-dvh">
          <aside data-slot="app-nav" className="sticky top-0 hidden h-dvh shrink-0 border-r border-border bg-card lg:flex">
            <WorkspaceRail appName={appName} />
            <div className={cn("flex w-56 flex-col px-3 py-4", NAV_COLUMN)}>
              <p className="px-2 font-heading text-[15px] font-semibold tracking-tight text-foreground">{appName}</p>
              <PanelSearch />
              <nav aria-label="Main" className={cn("mt-4 flex flex-col gap-0.5", NAV_SCROLL)}>
                {nav.map((label, i) => (
                  <NavLink key={label} label={label} i={i} fallback="tree" className="px-2 py-1.5" />
                ))}
              </nav>
              <div className="mt-5 min-h-0 flex-1">
                <SidebarExtras />
              </div>
              <UserChip user={user} />
            </div>
          </aside>
          <main id="main" tabIndex={-1} className="outline-none min-w-0 flex-1">
            <MobileHeader appName={appName} nav={nav} user={user} />
            <SidePanel>{children}</SidePanel>
          </main>
        </div>
      );

    // The signed-in person at the top of the sidebar, then plain text links.
    case "profile":
      return (
        <div className="flex min-h-dvh">
          <aside data-slot="app-nav" className={cn("sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-border bg-card px-5 py-6 lg:flex", NAV_COLUMN)}>
            <Brand appName={appName} />
            <div className="mt-8 flex flex-col items-center gap-2 text-center">
              <Avatar name={user} size="lg" />
              <div>
                <p className="text-sm font-semibold text-foreground">{user}</p>
                <p className="text-xs text-muted-foreground">{shell.role ?? "Admin"}</p>
              </div>
            </div>
            <nav aria-label="Main" className={cn("mt-8 flex flex-col gap-1", NAV_SCROLL)}>
              {nav.map((label, i) => (
                <a
                  key={label}
                  {...link(i)}
                  className={cn(
                    "relative flex items-center rounded-md px-3 py-2 text-sm transition-colors",
                    isCurrent(i) ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isCurrent(i) && <span aria-hidden="true" className="absolute top-1/2 left-0 h-4 w-1 -translate-y-1/2 rounded-full bg-primary-mark" />}
                  {label}
                  <NavBadge label={label} />
                </a>
              ))}
            </nav>
            <div className="mt-6 min-h-0 flex-1">
              <SidebarExtras />
            </div>
            <a href="#" className="mt-3 flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <LogOut className="size-4" aria-hidden="true" />
              Log out
            </a>
          </aside>
          <main id="main" tabIndex={-1} className="outline-none min-w-0 flex-1">
            <MobileHeader appName={appName} nav={nav} user={user} />
            <SearchBar user={user} />
            <Content>{children}</Content>
          </main>
        </div>
      );

    default:
      return (
        <div className="flex min-h-dvh">
          <aside
            data-slot="app-nav"
            data-sidebar=""
            className={cn("sticky top-0 hidden h-dvh shrink-0 flex-col border-r border-border bg-card py-5 lg:flex", collapsed ? "w-16 px-2" : cn(SIDEBAR_WIDTH[shell.sidebar?.width ?? "regular"], "px-3"), sideTone)}
            style={sideStyle}
            data-surface={tone === "inverse" ? "dark" : undefined}
          >
            <SidebarBody appName={appName} nav={nav} user={user} collapsed={collapsed} collapse={collapse} />
          </aside>
          <main id="main" tabIndex={-1} className="outline-none min-w-0 flex-1">
            <MobileHeader appName={appName} nav={nav} user={user} />
            <SearchBar user={user} />
            <Content>{children}</Content>
          </main>
        </div>
      );
  }
}

function SiteLink({ label }: { label: string }) {
  return (
    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
      {label}
    </a>
  );
}

function SiteFrame({
  appName,
  nav,
  layout = "classic",
  cookies = false,
  children,
}: {
  appName: string;
  nav: string[];
  layout?: SiteLayout | string;
  /** A cookie consent banner, until the visitor chooses (and remembered after). */
  cookies?: boolean;
  /** Accepted so every frame takes the same props; sites have no signed-in user. */
  user?: string;
  children: React.ReactNode;
}) {
  let header: React.ReactNode;
  switch (layout) {
    // Logo centered on its own row, links underneath.
    case "centered":
      header = (
        <header className="border-b border-border">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-4">
            <Brand appName={appName} />
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-1">
              {nav.map((label) => (
                <SiteLink key={label} label={label} />
              ))}
            </nav>
          </div>
        </header>
      );
      break;
    // A floating pill header over the page.
    case "floating":
      header = (
        <div className="sticky top-0 z-30 px-3 pt-3">
          <header className="mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-full border border-border bg-card/85 py-1.5 pr-1.5 pl-4 shadow-lg backdrop-blur">
            <Brand appName={appName} />
            <nav className="hidden items-center gap-5 md:flex">
              {nav.map((label) => (
                <SiteLink key={label} label={label} />
              ))}
            </nav>
            <span className="flex items-center gap-1">
              <GetStarted size="sm" className="rounded-full" />
              <MobileMenu site appName={appName} nav={nav} className="size-8 rounded-full md:hidden" />
            </span>
          </header>
        </div>
      );
      break;
    // Just the logo, the call to action and a menu button.
    case "minimal":
      header = (
        <header className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <Brand appName={appName} />
          <div className="flex items-center gap-2">
            <GetStarted size="lg" className="max-sm:hidden" />
            <MobileMenu
              site
              appName={appName}
              nav={nav}
              trigger={
                <Button size="icon-lg" variant="outline" aria-label="Open menu">
                  <Menu />
                </Button>
              }
            />
          </div>
        </header>
      );
      break;
    default:
      header = (
        <header className="sticky top-0 z-30 border-b border-border bg-background/70 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
            <Brand appName={appName} />
            <nav className="hidden items-center gap-6 md:flex">
              {nav.map((label) => (
                <SiteLink key={label} label={label} />
              ))}
            </nav>
            <span className="flex items-center gap-1">
              <GetStarted size="lg" className="max-sm:h-9 max-sm:px-3" />
              <MobileMenu site appName={appName} nav={nav} className="-mr-2 md:hidden" />
            </span>
          </div>
        </header>
      );
  }
  return (
    <AppActions nav={nav} appName={appName}>
    <div className="flex min-h-dvh flex-col">
      <SkipLink />
      {cookies && <CookieBanner />}
      {header}
      <main id="main" tabIndex={-1} data-slot="page-content" className="outline-none mx-auto w-full max-w-6xl flex-1 px-6">
        <Sections>{children}</Sections>
      </main>
      <footer className="border-t border-border">
        <p className="mx-auto max-w-6xl px-6 py-6 font-mono text-xs text-muted-foreground">© {appName}</p>
      </footer>
      <TooltipProvider delayDuration={300}>
        <IconTips />
      </TooltipProvider>
    </div>
    </AppActions>
  );
}

/** A site's call to action: to its pricing or sign-up section on the page, else a page of that name. */
function GetStarted({ children = "Get started", ...props }: React.ComponentProps<typeof Button>) {
  const { go, notify } = useAppActions();
  return (
    <Button
      {...props}
      onClick={() => {
        const heading = [...document.querySelectorAll<HTMLElement>("main h2, main h3")].find((h) => /pricing|plans|get started|sign up|start free|join/i.test(h.textContent ?? ""));
        if (heading) heading.scrollIntoView({ behavior: "smooth", block: "start" });
        else if (!["Pricing", "Sign up", "Get started"].some((n) => go(n))) notify("Sign-up opens here", "info");
      }}
    >
      {children}
    </Button>
  );
}

/**
 * Each section sits in its own size container, so blocks lay out by the
 * space they actually get (container queries), not the window width: a
 * section at half width behaves like one on a narrow screen.
 */
/**
 * Each section in its own container (hidden while empty, so a tab's sections
 * leave no gap); `fill` lets the sections share the column's height (a list column).
 */
function Sections({ children, fill }: { children: React.ReactNode; fill?: boolean }) {
  // A child that holds several sections (an OnTab's) spaces them like the page does.
  return React.Children.map(children, (child) => <div className={cn("@container flex flex-col empty:hidden", SECTION_GAP, fill && "min-h-0 flex-1 [&>*]:min-h-0 [&>*]:flex-1")}>{child}</div>);
}

/** Two sections stacked in one cell of a row: each keeps its own height, and they share any room the row's taller neighbour leaves. */
function Stack({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("flex h-full min-w-0 flex-col", SECTION_GAP)}>
      {React.Children.map(children, (child) => (
        <div className="@container flex-1">{child}</div>
      ))}
    </div>
  );
}

// Column widths in twelfths. Two cards sit side by side from a 672px
// page; three need 768px, and pair up first on the way down.
// Every width a row can produce (a quarter beside a stretched half is 3 + 9),
// written out so Tailwind sees each class.
/**
 * Where a row goes side by side, by its narrowest cell (in twelfths): the
 * row's own width at which that cell is still about 250px or more. A row of
 * halves splits early; thirds wait for a wider row and quarters for a wider
 * one still, so a quarter card is never a 180px sliver on a laptop with a
 * sidebar. Below it, three or more cells go two by two, a pair stacks.
 */
type RowBreak = "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
const rowBreak = (narrowest: number): RowBreak => (narrowest >= 6 ? "2xl" : narrowest === 5 ? "3xl" : narrowest === 4 ? "4xl" : narrowest === 3 ? "5xl" : "6xl");
const ROW_COLS: Record<RowBreak, string> = { "2xl": "@2xl:grid-cols-12", "3xl": "@3xl:grid-cols-12", "4xl": "@4xl:grid-cols-12", "5xl": "@5xl:grid-cols-12", "6xl": "@6xl:grid-cols-12" };
const ROW_SPAN: Record<RowBreak, Record<number, string>> = {
  "2xl": { 2: "@2xl:col-span-2", 3: "@2xl:col-span-3", 4: "@2xl:col-span-4", 5: "@2xl:col-span-5", 6: "@2xl:col-span-6", 7: "@2xl:col-span-7", 8: "@2xl:col-span-8", 9: "@2xl:col-span-9", 10: "@2xl:col-span-10" },
  "3xl": { 2: "@3xl:col-span-2", 3: "@3xl:col-span-3", 4: "@3xl:col-span-4", 5: "@3xl:col-span-5", 6: "@3xl:col-span-6", 7: "@3xl:col-span-7", 8: "@3xl:col-span-8", 9: "@3xl:col-span-9", 10: "@3xl:col-span-10" },
  "4xl": { 2: "@4xl:col-span-2", 3: "@4xl:col-span-3", 4: "@4xl:col-span-4", 5: "@4xl:col-span-5", 6: "@4xl:col-span-6", 7: "@4xl:col-span-7", 8: "@4xl:col-span-8", 9: "@4xl:col-span-9", 10: "@4xl:col-span-10" },
  "5xl": { 2: "@5xl:col-span-2", 3: "@5xl:col-span-3", 4: "@5xl:col-span-4", 5: "@5xl:col-span-5", 6: "@5xl:col-span-6", 7: "@5xl:col-span-7", 8: "@5xl:col-span-8", 9: "@5xl:col-span-9", 10: "@5xl:col-span-10" },
  "6xl": { 2: "@6xl:col-span-2", 3: "@6xl:col-span-3", 4: "@6xl:col-span-4", 5: "@6xl:col-span-5", 6: "@6xl:col-span-6", 7: "@6xl:col-span-7", 8: "@6xl:col-span-8", 9: "@6xl:col-span-9", 10: "@6xl:col-span-10" },
};

/**
 * Sections side by side: widths in twelfths of the page, e.g. [6, 6],
 * [8, 4] or [4, 4, 4]. Stacks when there isn't room.
 */
function Columns({ widths = [6, 6], children }: { widths?: number[]; children: React.ReactNode }) {
  const count = React.Children.count(children);
  const at = rowBreak(Math.min(...widths.slice(0, count), 12));
  return (
    <div className={cn("grid", SECTION_GAP, count > 2 && "@xl:grid-cols-2", ROW_COLS[at])}>
      {React.Children.map(children, (child, i) => (
        // Two by two, an odd last cell takes the whole row, so it never sits beside a hole.
        <div className={cn("@container h-full min-w-0", count > 2 && count % 2 === 1 && i === count - 1 && "@xl:col-span-2", ROW_SPAN[at][widths[i] ?? 6])}>{child}</div>
      ))}
    </div>
  );
}

/**
 * A section straight on the page, without its card: strips, galleries and
 * collections read as content rather than as another box (globals.css).
 */
function Bare({ children }: { children: React.ReactNode }) {
  return (
    <div data-surface="bare" className="h-full">
      {children}
    </div>
  );
}

/**
 * A section's look (globals.css does the work): emphasis re-colours its card
 * (or a stat row's lead stat), header restyles its title, density sets its
 * own spacing and scale enlarges its key figures. Defaults add nothing.
 */
function Look({
  emphasis,
  header,
  density,
  scale,
  children,
}: {
  emphasis?: "tinted" | "brand" | "inverse";
  header?: "eyebrow" | "large" | "none";
  density?: "compact" | "roomy";
  scale?: "display";
  children: React.ReactNode;
}) {
  return (
    <div data-look-emphasis={emphasis} data-look-header={header} data-look-density={density} data-look-scale={scale} className="h-full">
      {children}
    </div>
  );
}

/** Asks before what someone entered is thrown away: leaving the page, closing a dialog. */
function ConfirmDiscard({
  open,
  title,
  description,
  discardLabel,
  onKeep,
  onDiscard,
}: {
  open: boolean;
  title: string;
  description: string;
  discardLabel: string;
  onKeep: () => void;
  onDiscard: () => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={(next) => !next && onKeep()}>
      <AlertDialogContent title={title} description={description}>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep editing</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onDiscard}>
            {discardLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const EDITS = "[role=checkbox], [role=switch], [role=radio], [role=option], [role=menuitemradio], [role=menuitemcheckbox], [role=slider], [data-day]";

/**
 * Notices the first edit in a form (typing, picking, toggling: also inside
 * its pickers' popovers, as React events cross portals). While edited, closing
 * the tab asks first (outside Studio's preview frame); `attrs` marks the form
 * so the LeaveGuard asks before a link leaves the page.
 */
function useUnsaved(name: string) {
  const [dirty, setDirty] = React.useState(false);
  const mark = (e: React.SyntheticEvent) => {
    if (!dirty && !(e.target as Element).closest?.("[data-unsaved-ignore]")) setDirty(true);
  };
  const onClick = (e: React.MouseEvent) => {
    if (!dirty && (e.target as Element).closest?.(EDITS)) setDirty(true);
  };
  React.useEffect(() => {
    if (!dirty || window.self !== window.top) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  return {
    dirty,
    reset: () => setDirty(false),
    handlers: { onInput: mark, onChange: mark, onClick },
    attrs: dirty ? { "data-unsaved": name } : {},
  };
}

/** Before a link leaves a page with an edited form ([data-unsaved]), asks whether to leave without saving. */
function LeaveGuard() {
  const [ask, setAsk] = React.useState<{ link: HTMLElement; name: string; open: boolean } | null>(null);
  const leaving = React.useRef(false);
  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (leaving.current || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link || link.target === "_blank" || link.hasAttribute("download") || link.dataset.overlay !== undefined) return;
      // A page link: a nav link (Studio wires those by index) or a real address.
      if (link.dataset.navIndex === undefined && (link.getAttribute("href") ?? "#").startsWith("#")) return;
      const form = document.querySelector<HTMLElement>("[data-unsaved]");
      if (!form || form.contains(link)) return;
      e.preventDefault();
      e.stopPropagation();
      setAsk({ link, name: form.dataset.unsaved || "this page", open: true });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return (
    <ConfirmDiscard
      open={ask?.open ?? false}
      title="Leave without saving?"
      description={`Your changes to ${ask?.name ?? "this page"} haven't been saved.`}
      discardLabel="Leave without saving"
      onKeep={() => setAsk((a) => a && { ...a, open: false })}
      onDiscard={() => {
        const link = ask?.link;
        setAsk((a) => a && { ...a, open: false });
        if (!link?.isConnected) return;
        leaving.current = true;
        link.click();
        leaving.current = false;
      }}
    />
  );
}

export { useSearchable, useUnsaved, ConfirmDiscard, useAppActions, useQuickAction, AiAnswer };
export { LogoProvider, type LogoSet };
export { AppFrame, SiteFrame, Columns, Stack, OnTab, PageTabs, usePageTabs, Bare, Look, SectionLinks, SlotLink, SlotButton, OverlayContext, useSectionWiring, useSlot, useSlotAction, type OverlayApi };
