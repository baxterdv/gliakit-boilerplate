import { AppFrame } from "@/components/studio/frames";

/**
 * Talvo's shell, designed in GliaKit Studio: the pages, where they live and
 * the sidebar's blocks. Every screen wraps itself in it with its own index.
 */
const NAV = ["Overview", "Cash flow", "Payments", "Calendar", "Deals", "Reports", "Settings"];
const LINKS = ["/dashboard", "/cash-flow", "/payments", "/calendar", "/deals", "/reports", "/settings"];

/** The hosted demo only: a way back to the kit, above the footer links. */
const IS_GLIAKIT_DEMO = process.env.VERCEL_PROJECT_PRODUCTION_URL === "demo.gliakit.com";
const DEMO_NOTE = {
  type: "note" as const,
  text: "You're exploring the GliaKit demo.",
  links: [
    { label: "Get GliaKit", href: "https://www.gliakit.com/" },
    { label: "Components", href: "https://www.gliakit.com/components" },
  ],
};

const SHELL = {
  role: "Finance lead",
  nested: true as const,
  search: "Search bills, deals, sites… ⌘K",
  badges: { Payments: "7", Deals: "3" },
  workspace: { name: "Kettlewick Brewing Co.", meta: "3 sites" },
  actions: ["new", "theme", "help"],
  sidebar: {
    tone: "inverse",
    nav: "boxed",
    parts: [
      "brand",
      "workspace",
      "search",
      "nav",
      "divider",
      {
        type: "stat",
        label: "Operating balance",
        value: "$118.4k",
        points: [104.2, 109.8, 112.5, 108.1, 115.6, 121.3, 119, 124.7, 116.2, 113.9, 120.5, 118.4],
        note: "Dips to $43.1k · Nov 16",
      },
      ...(IS_GLIAKIT_DEMO ? [DEMO_NOTE] : []),
      { type: "links", items: ["Help", "Docs", "Changelog"] },
      "user",
    ],
  },
  headings: { Overview: "Money", Calendar: "Operations", Reports: "Insight" },
  subpages: { Settings: ["Workspace", "Sites", "Approvals", "Notifications"] },
} satisfies React.ComponentProps<typeof AppFrame>["shell"];

function TalvoFrame({ current, children }: { current: number; children: React.ReactNode }) {
  return (
    <AppFrame appName="Talvo" nav={NAV} links={LINKS} current={current} user="Alex Morgan" shell={SHELL}>
      {children}
    </AppFrame>
  );
}

export { TalvoFrame, NAV as TALVO_NAV, LINKS as TALVO_LINKS };
