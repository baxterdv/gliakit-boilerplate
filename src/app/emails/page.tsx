import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { sampleEmails } from "@/lib/emails";

/*
  The app's transactional emails with sample data, each in a frame the width
  of an email client. While developing only: in production it's a 404.
  Edit the templates in src/lib/emails.ts.
*/

export const metadata: Metadata = { title: "Email templates" };

export default function EmailsPage() {
  if (process.env.NODE_ENV === "production") notFound();
  const emails = sampleEmails();
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-12">
      <header>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground">Email templates</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {emails.length} emails with sample data. Edit them in <code className="font-mono text-foreground">src/lib/emails.ts</code>; each also has a plain-text version.
        </p>
      </header>
      {emails.map(({ name, email }) => (
        // An id can't hold spaces ("Verify email"): aria-labelledby reads them as two ids.
        <section key={name} aria-labelledby={`email-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="flex flex-col gap-3">
          <div>
            <h2 id={`email-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="text-sm font-semibold text-foreground">
              {name}
            </h2>
            <p className="text-sm text-muted-foreground">Subject: {email.subject}</p>
          </div>
          <iframe title={`${name} email preview`} srcDoc={email.html} className="h-[560px] w-full rounded-lg border border-border bg-white" />
        </section>
      ))}
    </main>
  );
}
