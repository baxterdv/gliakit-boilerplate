import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[360px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--signal-violet) 40%, transparent), transparent)",
        }}
      />
      <p
        className="text-gradient-signal font-heading text-[96px] leading-none font-bold"
        style={{ backgroundImage: "var(--gradient-signal)" }}
      >
        404
      </p>
      <h1 className="mt-4 font-heading text-2xl font-semibold text-foreground">
        This page drifted off-system
      </h1>
      <p className="mt-2 max-w-sm text-muted-foreground">
        The page you&rsquo;re looking for doesn&rsquo;t exist or was moved.
      </p>
      <Button asChild variant="gradient" size="lg" className="mt-8">
        <Link href="/dashboard">Back to the overview</Link>
      </Button>
    </div>
  );
}
