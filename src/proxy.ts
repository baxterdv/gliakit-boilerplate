import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * Auth proxy (Next 16's name for middleware) — active only when Clerk keys
 * are present, so the starter runs (and every screen is browsable) with
 * zero configuration.
 */
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/cash-flow(.*)",
  "/payments(.*)",
  "/calendar(.*)",
  "/deals(.*)",
  "/reports(.*)",
  "/settings(.*)",
]);

const hasClerk = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    process.env.CLERK_SECRET_KEY,
);

export default hasClerk
  ? clerkMiddleware(async (auth, req) => {
      if (isProtectedRoute(req)) await auth.protect();
    })
  : function proxy() {
      return NextResponse.next();
    };

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
