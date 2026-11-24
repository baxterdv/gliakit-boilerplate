import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { features } from "@/lib/env";
import { createCheckoutSession } from "@/lib/stripe";

/** The prices a checkout may be for: yours, from .env; a client can't send any other. */
const PRICES = [process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO, process.env.NEXT_PUBLIC_STRIPE_PRICE_TEAM].filter((p): p is string => Boolean(p));

/**
 * POST /api/checkout — create a Stripe Checkout Session.
 * Body: { priceId: one of NEXT_PUBLIC_STRIPE_PRICE_*, mode?: "payment" | "subscription" }
 *
 * Signed in when Clerk is on, and the user's id goes on the session
 * (client_reference_id) so the webhook knows whose payment it is. The
 * return URLs come from NEXT_PUBLIC_APP_URL, never the request's Origin,
 * so a checkout can't send someone on to another site.
 */
export async function POST(req: Request) {
  if (!features.payments) {
    return NextResponse.json(
      { error: "Payments not configured. Set STRIPE_SECRET_KEY in .env." },
      { status: 501 },
    );
  }

  const body = (await req.json().catch(() => null)) as { priceId?: unknown; mode?: unknown } | null;
  const priceId = typeof body?.priceId === "string" ? body.priceId : "";
  if (!PRICES.includes(priceId)) {
    return NextResponse.json(
      { error: "Unknown price. Set NEXT_PUBLIC_STRIPE_PRICE_PRO and NEXT_PUBLIC_STRIPE_PRICE_TEAM in .env, and send one of them." },
      { status: 400 },
    );
  }
  const mode = body?.mode === "payment" ? "payment" : "subscription";

  let userId: string | null = null;
  if (features.auth) {
    userId = (await auth()).userId;
    if (!userId) return NextResponse.json({ error: "Sign in to check out." }, { status: 401 });
  }

  const base = process.env.NEXT_PUBLIC_APP_URL || new URL(req.url).origin;
  const session = await createCheckoutSession({
    priceId,
    mode,
    clientReferenceId: userId ?? undefined,
    successUrl: `${base}/dashboard?checkout=success`,
    cancelUrl: `${base}/pricing?checkout=canceled`,
  });

  return NextResponse.json({ url: session.url });
}
