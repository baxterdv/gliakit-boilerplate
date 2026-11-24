import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input, Field } from "@/components/ui/input";

export const metadata: Metadata = { title: "Create account" };

export default function SignUpPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-heading text-xl font-semibold text-foreground">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Free to start. No credit card required.
        </p>
      </div>

      <Field label="Full name">
        <Input placeholder="Ada Lovelace" autoComplete="name" />
      </Field>
      <Field label="Email">
        <Input type="email" placeholder="you@company.com" autoComplete="email" />
      </Field>
      <Field label="Password" helper="At least 8 characters.">
        <Input
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
        />
      </Field>

      <Button variant="gradient" size="lg" className="w-full">
        Create account
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
