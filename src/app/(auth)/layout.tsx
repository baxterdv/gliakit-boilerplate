import Link from "next/link";

/** Auth shell — centered card over the canvas with a soft signal glow. */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // overflow-hidden clips the 560px glow so the page never exceeds a
    // phone's width (it was zooming the auth pages out on mobile).
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-background px-4">
      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[420px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--signal-violet) 35%, transparent), transparent)",
        }}
      />
      <Link href="/dashboard" className="mb-8 flex items-center gap-2.5">
        <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-md bg-primary-strong font-heading text-base font-semibold text-primary-foreground">
          T
        </span>
        <span className="font-heading text-lg font-semibold tracking-tight text-foreground">
          Talvo
        </span>
      </Link>
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-lg">
        {children}
      </div>
    </div>
  );
}
