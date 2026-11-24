/**
 * Feature flags derived from environment keys.
 * Everything is optional — the app runs fully on demo data with no keys.
 * Add a key, restart, and the corresponding integration switches on.
 */

export const features = {
  /** Clerk authentication: both keys, as the proxy needs (app routes protected). */
  auth: Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY),
  /** Prisma database (screens read from the DB instead of demo data). */
  db: Boolean(process.env.DATABASE_URL),
  /** Stripe payments (checkout + customer portal). */
  payments: Boolean(process.env.STRIPE_SECRET_KEY),
  /** Resend transactional email. */
  email: Boolean(process.env.RESEND_API_KEY),
  /**
   * Keep every page out of search engines (a staging or demo deployment): NOINDEX=1. The public GliaKit demo
   * at demo.gliakit.com is kept out by its domain, so its sample data never shows up in search results.
   */
  noindex: process.env.NOINDEX === "1" || process.env.VERCEL_PROJECT_PRODUCTION_URL === "demo.gliakit.com",
} as const;
