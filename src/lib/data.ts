/**
 * Demo data — the app runs on this with zero configuration.
 * Swap for real queries (see prisma/schema.prisma) when you connect a DB.
 */

export type CustomerStatus = "active" | "trial" | "churned" | "paused";

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: "Free" | "Pro" | "Team" | "Ship";
  status: CustomerStatus;
  mrr: number;
  since: string;
  seats: number;
  activity: { label: string; when: string }[];
}

export const customers: Customer[] = [
  {
    id: "aurora-labs",
    name: "Sarah Chen",
    email: "sarah@aurora.io",
    company: "Aurora Labs",
    plan: "Ship",
    status: "active",
    mrr: 199,
    since: "Jan 2026",
    seats: 12,
    activity: [
      { label: "Upgraded to Ship plan", when: "2d ago" },
      { label: "Invited 3 team members", when: "5d ago" },
      { label: "Started trial", when: "12d ago" },
    ],
  },
  {
    id: "northwind",
    name: "Marcus Webb",
    email: "marcus@northwind.co",
    company: "Northwind",
    plan: "Free",
    status: "trial",
    mrr: 0,
    since: "Mar 2026",
    seats: 2,
    activity: [
      { label: "Started trial", when: "3d ago" },
      { label: "Created first project", when: "3d ago" },
    ],
  },
  {
    id: "monzo-clone",
    name: "Elena Ruiz",
    email: "elena@monzoclone.dev",
    company: "Monzo Clone",
    plan: "Pro",
    status: "active",
    mrr: 99,
    since: "Feb 2026",
    seats: 5,
    activity: [
      { label: "Payment received — €99", when: "1d ago" },
      { label: "Enabled 2FA", when: "8d ago" },
    ],
  },
  {
    id: "vela",
    name: "James Park",
    email: "james@vela.app",
    company: "Vela",
    plan: "Free",
    status: "paused",
    mrr: 0,
    since: "Dec 2025",
    seats: 1,
    activity: [{ label: "Paused subscription", when: "14d ago" }],
  },
  {
    id: "kestrel",
    name: "Aiko Tanaka",
    email: "aiko@kestrel.io",
    company: "Kestrel",
    plan: "Pro",
    status: "active",
    mrr: 99,
    since: "Nov 2025",
    seats: 4,
    activity: [
      { label: "Payment received — €99", when: "2d ago" },
      { label: "Added billing address", when: "1mo ago" },
    ],
  },
  {
    id: "lumen",
    name: "Leo Fischer",
    email: "leo@lumen.dev",
    company: "Lumen",
    plan: "Free",
    status: "trial",
    mrr: 0,
    since: "Mar 2026",
    seats: 1,
    activity: [{ label: "Started trial", when: "6d ago" }],
  },
];

export const stats = {
  revenue: { value: "€48,120", delta: "+12.4%", trend: "up" as const },
  users: { value: "2,340", delta: "+4.1%", trend: "up" as const },
  churn: { value: "3.2%", delta: "-0.6%", trend: "down" as const },
};

export const revenueByMonth = [
  { month: "Jan", value: 24 },
  { month: "Feb", value: 31 },
  { month: "Mar", value: 28 },
  { month: "Apr", value: 39 },
  { month: "May", value: 33 },
  { month: "Jun", value: 48 },
  { month: "Jul", value: 41 },
  { month: "Aug", value: 52 },
];

export const trafficSources = [
  { label: "Direct", pct: 62 },
  { label: "GitHub", pct: 48 },
  { label: "X / Twitter", pct: 31 },
  { label: "Referral", pct: 18 },
];

export const invoices = [
  { id: "INV-0012", period: "Jul 2026", amount: "€199", status: "paid" },
  { id: "INV-0011", period: "Jun 2026", amount: "€0", status: "free" },
  { id: "INV-0010", period: "May 2026", amount: "€99", status: "paid" },
  { id: "INV-0009", period: "Apr 2026", amount: "€99", status: "paid" },
] as const;

export interface Message {
  id: string;
  from: string;
  email: string;
  subject: string;
  /** A time today, else a date. */
  when: string;
  group: "Today" | "Yesterday" | "Earlier";
  kind: "feedback" | "support" | "billing";
  badge?: string;
  unread: boolean;
}

export const messages: Message[] = [
  { id: "m1", from: "Sarah Chen", email: "sarah@aurora.io", subject: "Loving the new dashboard", when: "9:12 AM", group: "Today", kind: "feedback", badge: "Feedback", unread: true },
  { id: "m2", from: "Marcus Webb", email: "marcus@northwind.co", subject: "Question about seats", when: "8:30 AM", group: "Today", kind: "support", unread: true },
  { id: "m3", from: "Elena Ruiz", email: "elena@monzoclone.dev", subject: "Invoice request", when: "4:45 PM", group: "Yesterday", kind: "billing", badge: "Billing", unread: false },
  { id: "m4", from: "Aiko Tanaka", email: "aiko@kestrel.io", subject: "Feature request: export", when: "Oct 30", group: "Earlier", kind: "feedback", badge: "Feedback", unread: false },
  { id: "m5", from: "James Park", email: "james@vela.app", subject: "Pausing for the winter", when: "Oct 28", group: "Earlier", kind: "billing", badge: "Billing", unread: false },
];

export const team = [
  { name: "Dejan Veljanoski", email: "dejan@gliakit.dev", role: "Owner", status: "active" },
  { name: "Sarah Chen", email: "sarah@gliakit.dev", role: "Admin", status: "active" },
  { name: "Marcus Webb", email: "marcus@gliakit.dev", role: "Member", status: "active" },
  { name: "Elena Ruiz", email: "elena@gliakit.dev", role: "Member", status: "invited" },
] as const;

export interface ApiKey {
  id: string;
  name: string;
  masked: string;
  created: string;
  lastUsed: string;
  status: "active" | "revoked";
}

export const apiKeys: ApiKey[] = [
  {
    id: "k1",
    name: "Production",
    masked: "sk_live_••••••••4f2a",
    created: "Jan 12, 2026",
    lastUsed: "2 minutes ago",
    status: "active",
  },
  {
    id: "k2",
    name: "Staging",
    masked: "sk_test_••••••••9c1b",
    created: "Feb 3, 2026",
    lastUsed: "1 hour ago",
    status: "active",
  },
  {
    id: "k3",
    name: "CI pipeline",
    masked: "sk_test_••••••••77d0",
    created: "Feb 20, 2026",
    lastUsed: "3 days ago",
    status: "active",
  },
  {
    id: "k4",
    name: "Legacy integration",
    masked: "sk_live_••••••••b8e4",
    created: "Nov 2, 2025",
    lastUsed: "Jan 30, 2026",
    status: "revoked",
  },
];

/* ---------- richer demo data for the polished screens ---------- */

/** Monthly revenue in € thousands, this year and the same months last year. */
export const revenueSeries = [
  { label: "Jan", value: 24 }, { label: "Feb", value: 31 }, { label: "Mar", value: 28 },
  { label: "Apr", value: 39 }, { label: "May", value: 33 }, { label: "Jun", value: 48 },
  { label: "Jul", value: 41 }, { label: "Aug", value: 52 }, { label: "Sep", value: 57 },
];
export const revenueLastYear = [18, 22, 21, 27, 25, 31, 29, 34, 38];

export const kpis = [
  { label: "Revenue", prefix: "€", value: "48,120", delta: "+12.4%", trend: "up" as const, spark: [30, 34, 31, 40, 38, 47, 52] },
  { label: "Active users", value: "2,340", delta: "+4.1%", trend: "up" as const, spark: [20, 22, 21, 25, 24, 27, 28] },
  { label: "MRR", prefix: "€", value: "11,860", delta: "+8.2%", trend: "up" as const, spark: [8, 9, 9.4, 10, 10.6, 11.2, 11.9] },
  { label: "Churn", value: "3.2", unit: "%", delta: "-0.6%", trend: "down" as const, invert: true, spark: [42, 40, 41, 37, 36, 34, 32] },
];

export const planMix = [
  { label: "Ship", pct: 46 },
  { label: "Pro", pct: 31 },
  { label: "Team", pct: 15 },
  { label: "Free", pct: 8 },
];

export const activityFeed = [
  { who: "Sarah Chen", what: "upgraded Aurora Labs to Ship", when: "2m", kind: "upgrade" },
  { who: "Stripe", what: "payment of €99 from Kestrel succeeded", when: "18m", kind: "payment" },
  { who: "Marcus Webb", what: "started a trial for Northwind", when: "1h", kind: "trial" },
  { who: "James Park", what: "paused the Vela subscription", when: "3h", kind: "churn" },
  { who: "Elena Ruiz", what: "invited 2 teammates to Monzo Clone", when: "5h", kind: "team" },
] as const;

export const onboarding = {
  steps: ["Connect Stripe", "Invite team", "Brand theme", "Go live"],
  current: 2,
};

/* ---------- dashboard: the Studio-designed overview ---------- */

/** The whole year: nine months booked, the last three forecast (see `revenueForecastFrom`). */
export const revenueYear = [
  ...revenueSeries,
  { label: "Oct", value: 61 }, { label: "Nov", value: 64 }, { label: "Dec", value: 70 },
];
export const revenueForecastFrom = revenueSeries.length;
export const revenueLastYearFull = [...revenueLastYear, 36, 41, 45];
/** The monthly target the board signed off, € thousands. */
export const revenueTarget = { value: 45, label: "Target" };
export const revenueMarkers = [{ index: 5, label: "Ship plan launch" }];

/** Quarter goals, each against its own target. */
export const quarterGoals = [
  { label: "New MRR", value: 7.4, max: 12, prefix: "€", unit: "k" },
  { label: "Trials converted", value: 23, max: 40 },
  { label: "Expansion", value: 11, max: 15 },
];

/** Revenue by plan, € thousands, last six months (stacked). */
export const revenueByPlan = {
  series: ["Ship", "Pro", "Team"],
  months: [
    { label: "Apr", values: [18, 14, 7] },
    { label: "May", values: [15, 12, 6] },
    { label: "Jun", values: [24, 16, 8] },
    { label: "Jul", values: [19, 15, 7] },
    { label: "Aug", values: [26, 17, 9] },
    { label: "Sep", values: [29, 18, 10] },
  ],
};

/** What needs a decision this week. */
export const needsYou = [
  { title: "2 trials end on Friday", detail: "Northwind and Lumen · a nudge now usually converts", href: "/customers", kind: "trial", action: "Review" },
  { title: "Payment failed · Vela", detail: "€49 card declined · Stripe retries on Thursday", href: "/billing", kind: "payment", action: "Open invoice" },
  { title: "Seat request · Monzo Clone", detail: "Elena asked for 2 more seats on Pro", href: "/customers/monzo-clone", kind: "team", action: "Approve" },
] as const;

export const visitorsSeries = [
  { label: "Mon", value: 1.8 }, { label: "Tue", value: 2.4 }, { label: "Wed", value: 2.1 },
  { label: "Thu", value: 2.9 }, { label: "Fri", value: 3.4 }, { label: "Sat", value: 2.2 }, { label: "Sun", value: 2.6 },
];
export const visitorsLastWeek = [1.6, 1.9, 2.0, 2.3, 2.7, 1.9, 2.1];
export const signupsSeries = [
  { label: "Mon", value: 42 }, { label: "Tue", value: 58 }, { label: "Wed", value: 51 },
  { label: "Thu", value: 73 }, { label: "Fri", value: 88 }, { label: "Sat", value: 49 }, { label: "Sun", value: 61 },
];
export const signupsLastWeek = [38, 44, 47, 52, 61, 40, 45];

export const analyticsKpis = [
  { label: "Visitors", value: "17.4", unit: "k", delta: "+18.2%", trend: "up" as const, spark: [12, 13, 12.5, 14, 15.2, 16.1, 17.4] },
  { label: "Signups", value: "422", delta: "+11.6%", trend: "up" as const, spark: [310, 330, 345, 360, 381, 398, 422] },
  { label: "Conversion", value: "2.4", unit: "%", delta: "-0.2%", trend: "down" as const, spark: [2.7, 2.6, 2.6, 2.5, 2.5, 2.4, 2.4] },
  { label: "Avg. session", value: "3m 42s", delta: "+9s", trend: "up" as const, spark: [3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7] },
];

/** The week's signups against cancellations, for the diverging bars. */
export const netAccounts = {
  series: ["Signups", "Cancellations"],
  days: [
    { label: "Mon", values: [42, -9] },
    { label: "Tue", values: [58, -6] },
    { label: "Wed", values: [51, -12] },
    { label: "Thu", values: [73, -5] },
    { label: "Fri", values: [88, -8] },
    { label: "Sat", values: [49, -4] },
    { label: "Sun", values: [61, -7] },
  ],
};
export const visitorMarkers = [{ index: 4, label: "Launch post" }];

export const topPages = [
  { path: "/", views: "8,120", change: "+12%", up: true },
  { path: "/pricing", views: "3,904", change: "+21%", up: true },
  { path: "/docs/quickstart", views: "2,317", change: "+4%", up: true },
  { path: "/blog/design-tokens", views: "1,682", change: "-6%", up: false },
  { path: "/changelog", views: "944", change: "+2%", up: true },
];

export const devices = [
  { label: "Desktop", pct: 64 },
  { label: "Mobile", pct: 29 },
  { label: "Tablet", pct: 7 },
];

export const countries = [
  { label: "Germany", pct: 24 },
  { label: "United States", pct: 21 },
  { label: "United Kingdom", pct: 12 },
  { label: "Netherlands", pct: 8 },
  { label: "North Macedonia", pct: 5 },
];

/** What the workspace paid each month, in euro. */
export const spendByMonth = [
  { label: "May", value: 99 },
  { label: "Jun", value: 99 },
  { label: "Jul", value: 148 },
  { label: "Aug", value: 148 },
  { label: "Sep", value: 198 },
  { label: "Oct", value: 198 },
];

export const usage = {
  seats: { used: 12, total: 15 },
  apiCalls: { used: 684_000, total: 1_000_000 },
  storage: { used: 3.4, total: 10 },
};

export const apiRequests = [
  { label: "00", value: 1.2 }, { label: "04", value: 0.8 }, { label: "08", value: 2.6 },
  { label: "12", value: 3.9 }, { label: "16", value: 3.4 }, { label: "20", value: 2.1 }, { label: "24", value: 1.6 },
];

export const notificationGroups = [
  {
    title: "Email",
    items: [
      { label: "Product updates", desc: "New features, screens, and template drops.", on: true },
      { label: "Billing alerts", desc: "Receipts, failed payments, and renewal reminders.", on: true },
      { label: "New customer activity", desc: "Signups, upgrades, and churn events as they happen.", on: false },
    ],
  },
  {
    title: "Push",
    items: [
      { label: "Mentions", desc: "When a teammate mentions you in a note.", on: true },
      { label: "Failed payments", desc: "Immediately, so you can follow up.", on: true },
    ],
  },
];

/** The open conversation: a chat with a customer, the signed-in user's own messages marked `own`. */
export const conversation = {
  with: { name: "Sarah Chen", meta: "Aurora Labs · Ship plan · replies in ~2h" },
  messages: [
    { from: "Sarah Chen", time: "Yesterday, 4:12 PM", text: "The analytics screen is exactly what our team needed. One question: can we pin the revenue chart to the top of the dashboard for everyone on the workspace?" },
    { from: "Dejan Veljanoski", time: "Yesterday, 5:40 PM", own: true, text: "Thanks Sarah! Dashboards are per user today, but workspace-level pins are on the roadmap for next month." },
    { from: "Sarah Chen", time: "Yesterday, 5:52 PM", text: "Great. In the meantime, here's how our team set it up, in case it helps the design.", attachment: "aurora-dashboard-layout.png" },
    { from: "Dejan Veljanoski", time: "Today, 9:05 AM", own: true, text: "That's really useful, passing it to the team. I'll let you know the moment pins ship." },
    { from: "Sarah Chen", time: "Today, 9:12 AM", text: "Perfect, thank you!" },
  ],
};

export function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
