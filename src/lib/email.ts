import { Resend } from "resend";

import { welcomeEmail, type Email } from "@/lib/emails";

/**
 * Resend client — lazily created so the app boots without a key.
 * Guard call sites with `features.email` from lib/env.
 */
let client: Resend | null = null;

export function resend(): Resend {
  if (!process.env.RESEND_API_KEY) {
    throw new Error(
      "RESEND_API_KEY is not set. Add it to .env to enable email.",
    );
  }
  client ??= new Resend(process.env.RESEND_API_KEY);
  return client;
}

const FROM = process.env.EMAIL_FROM ?? "GliaKit <noreply@example.com>";

/**
 * Sends one of the templates in lib/emails (welcomeEmail, verifyEmail,
 * resetPasswordEmail, inviteEmail, receiptEmail, digestEmail): its subject,
 * HTML and plain text. Preview them all at /emails while developing.
 */
export async function sendEmail(to: string, email: Email) {
  return resend().emails.send({ from: FROM, to, subject: email.subject, html: email.html, text: email.text });
}

/** Welcome email, right after sign-up. */
export async function sendWelcomeEmail(to: string, name: string) {
  return sendEmail(to, welcomeEmail({ name }));
}
