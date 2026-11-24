import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input, Field } from "@/components/ui/input";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-heading text-xl font-semibold text-foreground">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign in to your workspace.
        </p>
      </div>

      <Field label="Email">
        <Input type="email" placeholder="you@company.com" autoComplete="email" />
      </Field>
      <Field label="Password">
        <Input
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
        />
      </Field>

      <Button variant="gradient" size="lg" className="w-full">
        Continue
      </Button>
      <Button variant="outline" size="lg" className="w-full">
        Continue with Google
      </Button>

      <div className="flex items-center justify-between text-sm">
        <Link
          href="/reset-password"
          className="text-muted-foreground hover:text-foreground"
        >
          Forgot password?
        </Link>
        <Link href="/sign-up" className="font-medium text-primary hover:underline">
          Create account
        </Link>
      </div>
    </div>
  );
}
