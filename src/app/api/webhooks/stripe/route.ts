import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { features } from "@/lib/env";
import { stripe } from "@/lib/stripe";

/**
 * POST /api/webhooks/stripe — verify and handle Stripe events.
 * Point a webhook at this route with STRIPE_WEBHOOK_SECRET set.
 */
export async function POST(req: Request) {
  if (!features.payments || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Not configured" }, { status: 501 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(
      await req.text(),
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      // TODO: mark the user's subscription active (see prisma/schema.prisma)
      break;
    case "customer.subscription.deleted":
      // TODO: downgrade the user to the free plan
      break;
  }

  return NextResponse.json({ received: true });
}
