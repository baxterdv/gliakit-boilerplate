/**
 * Transactional emails: the six every SaaS sends on day one. Each template
 * returns { subject, html, text } for your provider (Resend, Postmark, SES).
 *
 * Email-safe on purpose: table layout, inline styles, system fonts, no CSS
 * variables or images, so they look the same in Gmail, Outlook and Apple
 * Mail. Every value passed in is escaped. Preview them all at /emails while
 * developing.
 */

/** Your product, as the emails show it. The button colour is the brand's; its text picks black or white to stay readable. */
export const EMAIL_BRAND = {
  name: "GliaKit",
  color: "#7c5cff",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  /** Who sends it and from where, for the footer. Replace with your company's. */
  company: "Your Company Ltd · 1 Example Street, City",
};

export type Email = { subject: string; html: string; text: string };

const INK = "#14141b";
const MUTED = "#5c5c6b";
const LINE = "#e6e6eb";
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const MONO = "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";

/** Escapes a value for HTML: names, codes and links come from users. */
function esc(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/** Black or white, whichever reads better on the colour (WCAG contrast). */
export function textOn(hex: string): string {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return "#ffffff";
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(m[1].slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  // White's contrast against the colour, then the ink's (#14141b, luminance about 0.007).
  return 1.05 / (l + 0.05) >= (l + 0.05) / 0.057 ? "#ffffff" : INK;
}

const p = (html: string) => `<p style="margin:0 0 16px;font-size:15px;line-height:24px;color:${MUTED};">${html}</p>`;

function button(label: string, href: string) {
  return `<table role="presentation" cellspacing="0" cellpadding="0" style="margin:8px 0 24px;"><tr><td style="border-radius:8px;background:${EMAIL_BRAND.color};">
<a href="${esc(href)}" style="display:inline-block;padding:12px 22px;font-family:${FONT};font-size:15px;font-weight:600;color:${textOn(EMAIL_BRAND.color)};text-decoration:none;border-radius:8px;">${esc(label)}</a>
</td></tr></table>`;
}

/** The frame every email shares: the brand, a card with the message, and a footer saying why it was sent. */
function layout({ subject, preheader, title, body, footnote }: { subject: string; preheader: string; title: string; body: string; footnote: string }) {
  const initial = esc(EMAIL_BRAND.name.trim().charAt(0).toUpperCase());
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:#f4f4f6;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f6;"><tr><td align="center" style="padding:32px 16px;font-family:${FONT};">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;">
<tr><td style="padding:0 4px 20px;"><table role="presentation" cellspacing="0" cellpadding="0"><tr>
<td style="width:32px;height:32px;border-radius:8px;background:${EMAIL_BRAND.color};color:${textOn(EMAIL_BRAND.color)};font-weight:700;font-size:15px;text-align:center;line-height:32px;">${initial}</td>
<td style="padding-left:10px;font-size:15px;font-weight:600;color:${INK};">${esc(EMAIL_BRAND.name)}</td></tr></table></td></tr>
<tr><td style="background:#ffffff;border:1px solid ${LINE};border-radius:12px;padding:32px;">
<h1 style="margin:0 0 16px;font-size:22px;line-height:30px;font-weight:600;color:${INK};">${title}</h1>
${body}
</td></tr>
<tr><td style="padding:20px 4px 0;font-size:12px;line-height:18px;color:#8a8a99;">${footnote}<br>${esc(EMAIL_BRAND.company)}</td></tr>
</table></td></tr></table></body></html>`;
}

/** Welcome, right after sign-up. */
export function welcomeEmail({ name }: { name: string }): Email {
  const subject = `Welcome to ${EMAIL_BRAND.name}`;
  return {
    subject,
    html: layout({
      subject,
      preheader: "Your workspace is ready.",
      title: `Welcome, ${esc(name)}`,
      body: p(`Your workspace is ready. Start where most people do: invite your team and set up your first project.`) + button(`Open ${EMAIL_BRAND.name}`, EMAIL_BRAND.url),
      footnote: `You're getting this because you signed up for ${esc(EMAIL_BRAND.name)}.`,
    }),
    text: `Welcome, ${name}\n\nYour workspace is ready. Start where most people do: invite your team and set up your first project.\n\nOpen ${EMAIL_BRAND.name}: ${EMAIL_BRAND.url}`,
  };
}

/** Confirm an email address: a link, and the same as a code to type. */
export function verifyEmail({ code, link }: { code: string; link: string }): Email {
  const subject = "Confirm your email";
  return {
    subject,
    html: layout({
      subject,
      preheader: `Your code is ${code}.`,
      title: "Confirm your email",
      body:
        p("Enter this code in the app, or use the button. It expires in 15 minutes.") +
        `<p style="margin:0 0 20px;font-family:${MONO};font-size:28px;letter-spacing:8px;font-weight:600;color:${INK};">${esc(code)}</p>` +
        button("Confirm email", link),
      footnote: "If you didn't sign up, you can ignore this email.",
    }),
    text: `Confirm your email\n\nYour code: ${code} (expires in 15 minutes)\nOr open: ${link}\n\nIf you didn't sign up, you can ignore this email.`,
  };
}

/** Reset a forgotten password. */
export function resetPasswordEmail({ link }: { link: string }): Email {
  const subject = `Reset your ${EMAIL_BRAND.name} password`;
  return {
    subject,
    html: layout({
      subject,
      preheader: "The link works for one hour.",
      title: "Reset your password",
      body: p("Someone asked to reset the password for this account. The link works once, for one hour.") + button("Choose a new password", link),
      footnote: "If it wasn't you, nothing changes: your password stays as it is.",
    }),
    text: `Reset your password\n\nThe link works once, for one hour: ${link}\n\nIf it wasn't you, nothing changes.`,
  };
}

/** An invitation to join a workspace. */
export function inviteEmail({ inviter, workspace, role, link }: { inviter: string; workspace: string; role: string; link: string }): Email {
  const subject = `${inviter} invited you to ${workspace}`;
  return {
    subject,
    html: layout({
      subject,
      preheader: `Join ${workspace} on ${EMAIL_BRAND.name}.`,
      title: `Join ${esc(workspace)}`,
      body: p(`<strong style="color:${INK};">${esc(inviter)}</strong> invited you to join <strong style="color:${INK};">${esc(workspace)}</strong> as ${esc(role)}. The invite is open for 7 days.`) + button("Accept invite", link),
      footnote: `You're getting this because ${esc(inviter)} entered your address.`,
    }),
    text: `${inviter} invited you to join ${workspace} as ${role}.\n\nAccept (open for 7 days): ${link}`,
  };
}

/** A receipt after a payment. */
export function receiptEmail({ invoice, date, items, total, method, link }: { invoice: string; date: string; items: { label: string; amount: string }[]; total: string; method: string; link: string }): Email {
  const subject = `Receipt ${invoice}`;
  const row = (label: string, amount: string, strong = false) =>
    `<tr><td style="padding:10px 0;border-top:1px solid ${LINE};font-size:14px;color:${strong ? INK : MUTED};${strong ? "font-weight:600;" : ""}">${label}</td><td align="right" style="padding:10px 0;border-top:1px solid ${LINE};font-size:14px;color:${INK};${strong ? "font-weight:600;" : ""}">${amount}</td></tr>`;
  return {
    subject,
    html: layout({
      subject,
      preheader: `${total} paid on ${date}.`,
      title: `Thanks, you paid ${esc(total)}`,
      body:
        p(`Receipt ${esc(invoice)} · ${esc(date)} · ${esc(method)}`) +
        `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 24px;">${items.map((it) => row(esc(it.label), esc(it.amount))).join("")}${row("Total", esc(total), true)}</table>` +
        button("Download invoice (PDF)", link),
      footnote: "Keep this for your records.",
    }),
    text: `Receipt ${invoice} · ${date} · ${method}\n\n${items.map((it) => `${it.label}: ${it.amount}`).join("\n")}\nTotal: ${total}\n\nInvoice: ${link}`,
  };
}

/** A weekly digest: a few numbers and what happened. */
export function digestEmail({ name, period, stats, highlights }: { name: string; period: string; stats: { label: string; value: string; change?: string }[]; highlights: string[] }): Email {
  const subject = `Your week in ${EMAIL_BRAND.name}`;
  const cells = stats
    .map(
      (s) =>
        `<td style="padding:14px;border:1px solid ${LINE};border-radius:8px;width:${Math.floor(100 / Math.max(1, stats.length))}%;"><div style="font-size:12px;color:${MUTED};">${esc(s.label)}</div><div style="margin-top:4px;font-size:20px;font-weight:600;color:${INK};">${esc(s.value)}</div>${s.change ? `<div style="margin-top:2px;font-size:12px;color:${MUTED};">${esc(s.change)}</div>` : ""}</td>`,
    )
    .join('<td style="width:8px;"></td>');
  return {
    subject,
    html: layout({
      subject,
      preheader: highlights[0] ?? `Your numbers for ${period}.`,
      title: `Your week, ${esc(name)}`,
      body:
        p(esc(period)) +
        `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 20px;"><tr>${cells}</tr></table>` +
        `<ul style="margin:0 0 20px;padding-left:20px;font-size:15px;line-height:24px;color:${MUTED};">${highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` +
        button("See the full report", EMAIL_BRAND.url),
      footnote: "You get this every Monday. Turn it off in Settings → Notifications.",
    }),
    text: `Your week, ${name} (${period})\n\n${stats.map((s) => `${s.label}: ${s.value}${s.change ? ` (${s.change})` : ""}`).join("\n")}\n\n${highlights.map((h) => `- ${h}`).join("\n")}\n\nFull report: ${EMAIL_BRAND.url}`,
  };
}

/** Every template with sample data, for the /emails preview. */
export function sampleEmails(): { name: string; email: Email }[] {
  const url = EMAIL_BRAND.url;
  return [
    { name: "Welcome", email: welcomeEmail({ name: "Lena" }) },
    { name: "Verify email", email: verifyEmail({ code: "482 913", link: `${url}/verify?token=sample` }) },
    { name: "Reset password", email: resetPasswordEmail({ link: `${url}/reset?token=sample` }) },
    { name: "Team invite", email: inviteEmail({ inviter: "Arjun Rao", workspace: "Brightsmile", role: "an editor", link: `${url}/invite/sample` }) },
    {
      name: "Receipt",
      email: receiptEmail({ invoice: "INV-2041", date: "1 Nov 2026", items: [{ label: "Pro plan · 5 seats", amount: "€145.00" }, { label: "VAT (21%)", amount: "€30.45" }], total: "€175.45", method: "Visa ···· 4242", link: `${url}/invoices/INV-2041` }),
    },
    {
      name: "Weekly digest",
      email: digestEmail({ name: "Lena", period: "27 Oct – 2 Nov 2026", stats: [{ label: "Bookings", value: "128", change: "+12%" }, { label: "Revenue", value: "€9.4k", change: "+8%" }, { label: "No-shows", value: "4", change: "−3" }], highlights: ["Tuesday was your busiest day.", "Two new team members joined."] }),
    },
  ];
}
