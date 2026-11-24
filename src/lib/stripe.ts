import Stripe from "stripe";

/**
 * Stripe client — lazily created so the app boots without a key.
 * Guard call sites with `features.payments` from lib/env.
 */
let client: Stripe | null = null;

export function stripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to .env to enable payments.",
    );
  }
  client ??= new Stripe(process.env.STRIPE_SECRET_KEY);
  return client;
}

/** Create a Checkout Session for a one-time or subscription price. */
export async function createCheckoutSession(opts: {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
  /** Your user's id, so the webhook can tie the payment to them. */
  clientReferenceId?: string;
  mode?: "payment" | "subscription";
}) {
  return stripe().checkout.sessions.create({
    mode: opts.mode ?? "subscription",
    line_items: [{ price: opts.priceId, quantity: 1 }],
    success_url: opts.successUrl,
    cancel_url: opts.cancelUrl,
    customer_email: opts.customerEmail,
    client_reference_id: opts.clientReferenceId,
  });
}
