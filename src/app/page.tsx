import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  CreditCard,
  Database,
  Layers,
  Mail,
  Palette,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/app/theme-toggle";

/* -------------------------------------------------------------------------- */
/* Placeholder content — swap for your product. The token system keeps every   */
/* section on-brand no matter what copy you drop in.                           */
/* -------------------------------------------------------------------------- */

const NAV = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Customers", href: "#customers" },
];

const LOGOS = ["Northwind", "Aurora", "Monzo", "Slice", "Strider", "Cohort"];

// Designer credit, shown only on the public demo. Vercel sets this at build
// time, so your own deployments never render it. Safe to delete.
const IS_GLIAKIT_DEMO = process.env.VERCEL_PROJECT_PRODUCTION_URL === "demo.gliakit.com";

const FEATURES = [
  {
    icon: Palette,
    title: "Real token system",
    desc: "One set of design tokens shared by Figma, code and your AI rules — colors, type and spacing never drift.",
  },
  {
    icon: Layers,
    title: "Thirteen screens",
    desc: "Dashboard, cash flow, payments, calendar, deals, reports, settings and auth — built, routed and ready to rename into your product.",
  },
  {
    icon: Sparkles,
    title: "AI-native by design",
    desc: "Cursor and Claude Code read the same rules you do, so generated UI already matches the system.",
  },
  {
    icon: CreditCard,
    title: "Payments built in",
    desc: "A Stripe checkout route and a verified webhook, ready for your prices.",
  },
  {
    icon: Database,
    title: "Database + auth",
    desc: "A Prisma schema and client, and Clerk route protection. Sign-in, sign-up and reset screens designed, ready to connect.",
  },
  {
    icon: Mail,
    title: "Transactional email",
    desc: "Resend hooked up with templates for the emails every SaaS needs on day one.",
  },
];

const STATS = [
  { value: "13", label: "screens" },
  { value: "1:1", label: "Figma ↔ code tokens" },
  { value: "4", label: "services connected" },
  { value: "0", label: "config to start" },
];

const TESTIMONIALS = [
  {
    quote:
      "Placeholder testimonial — drop a real customer quote here. The layout, avatar and rating stay perfectly on-brand.",
    name: "Alex Rivera",
    role: "Founder, Northwind",
  },
  {
    quote:
      "Another placeholder quote. Swap the copy and photo; the design system does the rest without any restyling.",
    name: "Sam Okafor",
    role: "CTO, Aurora Labs",
  },
];

/* Stylized in-app preview — pure placeholder UI that mirrors the real shell. */
function AppPreview() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-2xl">
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-destructive/50" />
        <span className="size-2.5 rounded-full bg-warning/60" />
        <span className="size-2.5 rounded-full bg-diff-add/50" />
        <div className="ml-3 hidden h-5 flex-1 items-center rounded-md border border-border bg-background px-2.5 sm:flex">
          <span className="font-mono text-[10px] text-muted-foreground">
            app.yourproduct.com/dashboard
          </span>
        </div>
      </div>

      {/* body */}
      <div className="flex h-[300px] sm:h-[380px]">
        {/* mini sidebar */}
        <div className="hidden w-40 shrink-0 flex-col gap-1 border-r border-border bg-card px-3 py-4 sm:flex">
          <div className="mb-3 flex items-center gap-2 px-1">
            <div
              className="size-5 rounded-md"
              style={{ background: "var(--gradient-signal)" }}
            />
            <div className="h-2.5 w-16 rounded bg-muted" />
          </div>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${i === 0 ? "bg-muted" : ""}`}
            >
              <div className="size-3.5 rounded bg-muted-foreground/30" />
              <div className="h-2 w-14 rounded bg-muted-foreground/20" />
            </div>
          ))}
        </div>

        {/* main */}
        <div className="flex-1 p-4 sm:p-5">
          <div className="mb-4 h-3 w-28 rounded bg-muted" />
          {/* stat cards */}
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-background p-3"
              >
                <div className="h-2 w-10 rounded bg-muted-foreground/20" />
                <div className="mt-2 h-4 w-14 rounded bg-muted" />
                <div className="mt-2 h-1.5 w-8 rounded bg-diff-add/40" />
              </div>
            ))}
          </div>
          {/* chart */}
          <div className="mt-3 rounded-lg border border-border bg-background p-3">
            <div className="mb-3 h-2 w-16 rounded bg-muted-foreground/20" />
            <div className="flex h-24 items-end gap-1.5 sm:h-28">
              {[40, 55, 48, 70, 62, 85, 72, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t"
                  style={{
                    height: `${h}%`,
                    background:
                      i === 7
                        ? "var(--gradient-signal)"
                        : "color-mix(in oklab, var(--signal-violet) 40%, transparent)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Landing — a full marketing page built entirely from placeholders. Replace the
 * copy, logos and testimonials with your own; the token system keeps it
 * on-brand and the components stay untouched.
 */
export default function LandingPage() {
  return (
    <div className="relative flex min-h-dvh flex-col">
      {/* ambient hero glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px] overflow-hidden"
        style={{
          background:
            "radial-gradient(900px 460px at 50% 0%, color-mix(in oklab, var(--signal-violet) 22%, transparent), transparent 65%)",
        }}
      />

      {/* header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3.5">
          <Link href="/" className="flex items-center gap-1.5">
            <Image
              src="/logo.svg"
              alt=""
              aria-hidden="true"
              width={28}
              height={28}
              className="size-7 drop-shadow-[0_2px_6px_rgba(124,92,255,0.3)]"
            />
            <span className="font-heading text-lg font-semibold tracking-tight text-foreground">
              GliaKit
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} className="hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
            >
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/sign-up">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* hero */}
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 pt-20 pb-14 text-center md:pt-28">
        <Badge variant="outline" className="gap-1.5 py-1">
          <Sparkles className="size-3.5 text-primary" />
          Placeholder product · v1.0
        </Badge>
        <h1 className="mt-6 font-heading text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl">
          Ship a SaaS that looks{" "}
          <span
            className="text-gradient-signal"
            style={{ backgroundImage: "var(--gradient-signal)" }}
          >
            designed
          </span>
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
          A production-ready Next.js starter with thirteen screens, a real
          token system, and AI rules your coding agent actually follows.
        </p>
        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild variant="gradient" size="xl">
            <Link href="/dashboard">
              Open the app
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline" size="xl">
            <Link href="/pricing">See pricing</Link>
          </Button>
        </div>
        <p className="mt-5 font-mono text-eyebrow uppercase tracking-[0.2em] text-muted-foreground/70">
          No credit card · placeholder demo
        </p>
      </section>

      {/* app preview */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-20">
        <AppPreview />
      </section>

      {/* logo cloud */}
      <section id="customers" className="mx-auto w-full max-w-5xl px-6 pb-24">
        <p className="text-center font-mono text-eyebrow uppercase tracking-[0.2em] text-muted-foreground/70">
          Placeholder logos — trusted by teams like
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {LOGOS.map((name) => (
            <span
              key={name}
              className="font-heading text-xl font-semibold text-muted-foreground/50"
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* features */}
      <section id="features" className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-eyebrow uppercase tracking-[0.2em] text-primary">
            Everything wired
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            One system, zero drift
          </h2>
          <p className="mt-4 text-muted-foreground">
            Design, code and AI stay in sync from the first prompt. These are
            placeholder feature cards — keep the layout, change the words.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Card key={f.title} className="p-6">
              <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted/50">
                <f.icon className="size-5 text-primary" />
              </div>
              <h3 className="mt-4 text-[15px] font-semibold text-foreground">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* stats band */}
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p
                className="font-heading text-4xl font-bold text-gradient-signal"
                style={{ backgroundImage: "var(--gradient-signal)" }}
              >
                {s.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* testimonials */}
      <section className="mx-auto w-full max-w-5xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-eyebrow uppercase tracking-[0.2em] text-primary">
            Placeholder proof
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Loved by placeholder teams
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} className="flex flex-col gap-4 p-6">
              <div className="flex gap-0.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="size-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-[15px] leading-relaxed text-foreground">
                “{t.quote}”
              </p>
              <div className="mt-auto flex items-center gap-3">
                <Avatar name={t.name} size="sm" />
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* final CTA */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-8 py-16 text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-60"
            style={{
              background:
                "radial-gradient(600px 300px at 50% 0%, color-mix(in oklab, var(--signal-violet) 20%, transparent), transparent 70%)",
            }}
          />
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Ready to ship?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Open the app to explore the wired screens, or start building on top
            of the system today.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="gradient" size="xl">
              <Link href="/dashboard">
                Open the app
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link href="/sign-up">Create account</Link>
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {["Auth included", "Payments wired", "AI rules built in"].map(
              (f) => (
                <li key={f} className="flex items-center gap-1.5">
                  <Check className="size-4 text-primary" />
                  {f}
                </li>
              ),
            )}
          </ul>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t border-border">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-5">
          <div className="col-span-2 flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-1.5">
              <Image
                src="/logo.svg"
                alt=""
                aria-hidden="true"
                width={26}
                height={26}
                className="size-6 drop-shadow-[0_2px_6px_rgba(124,92,255,0.3)]"
              />
              <span className="font-heading text-base font-semibold tracking-tight text-foreground">
                GliaKit
              </span>
            </Link>
            <p className="max-w-[240px] text-sm leading-relaxed text-muted-foreground">
              The design system your AI coding tools can actually follow.
            </p>
          </div>
          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "Changelog", "Docs"],
            },
            { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
            {
              title: "Legal",
              links: ["Terms", "Privacy", "License", "Security"],
            },
          ].map((col) => (
            <nav
              key={col.title}
              className="flex flex-col gap-3"
              aria-label={col.title}
            >
              <span className="font-mono text-eyebrow uppercase tracking-[0.15em] text-muted-foreground">
                {col.title}
              </span>
              {/* Placeholder footer labels — swap for <Link href="…"> to your
                  own routes. Rendered as plain text so the demo has no dead links. */}
              {col.links.map((l) => (
                <span key={l} className="text-sm text-muted-foreground">
                  {l}
                </span>
              ))}
            </nav>
          ))}
        </div>
        <div className="border-t border-border">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
            <p className="font-mono text-xs text-muted-foreground">
              Built with the{" "}
              {IS_GLIAKIT_DEMO ? (
                <a
                  href="https://www.gliakit.com/"
                  className="text-foreground/85 underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
                >
                  GliaKit
                </a>
              ) : (
                "GliaKit"
              )}{" "}
              system
              {IS_GLIAKIT_DEMO && (
                <>
                  {" · "}Designed and developed by{" "}
                  <a
                    href="https://veljanoski.com/"
                    className="text-foreground/85 underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
                  >
                    veljanoski.com
                  </a>
                </>
              )}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5 text-primary" />
              Placeholder demo
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
