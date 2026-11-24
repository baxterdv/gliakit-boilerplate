import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Pricing" };

const PLANS = [
  {
    name: "Free",
    price: "€0",
    period: "forever",
    features: ["1 project", "Community support", "Core screens"],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Pro",
    price: "€99",
    period: "per year",
    features: [
      "Unlimited projects",
      "All 15 screens",
      "Priority support",
      "Lifetime updates",
    ],
    cta: "Go Pro",
    featured: true,
  },
  {
    name: "Team",
    price: "€199",
    period: "per year",
    features: [
      "Everything in Pro",
      "5 seats",
      "Shared workspaces",
      "SSO",
    ],
    cta: "Choose Team",
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-20">
      <p className="font-mono text-eyebrow uppercase tracking-[0.25em] text-muted-foreground">
        Pricing
      </p>
      <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground">
        Simple, honest pricing
      </h1>
      <p className="mt-3 text-muted-foreground">
        Start free. Upgrade when it pays for itself.
      </p>

      <div className="mt-12 grid w-full grid-cols-1 gap-5 md:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "flex flex-col rounded-lg border bg-card p-6",
              plan.featured
                ? "border-primary shadow-[0_0_40px_-12px_var(--signal-violet)]"
                : "border-border",
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg font-semibold text-foreground">
                {plan.name}
              </h3>
              {plan.featured && <Badge variant="accent">Popular</Badge>}
            </div>
            <p className="mt-4">
              <span className="font-heading text-3xl font-bold text-foreground">
                {plan.price}
              </span>{" "}
              <span className="text-sm text-muted-foreground">
                / {plan.period}
              </span>
            </p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-foreground/90">
                  <Check className="size-4 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              asChild
              variant={plan.featured ? "gradient" : "outline"}
              size="lg"
              className="mt-6"
            >
              <Link href="/sign-up">{plan.cta}</Link>
            </Button>
          </div>
        ))}
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        Questions?{" "}
        <Link href="/" className="text-primary hover:underline">
          Back to home
        </Link>
      </p>
    </div>
  );
}
