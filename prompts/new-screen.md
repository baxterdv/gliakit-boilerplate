# Prompt · New screen

Copy, fill the brackets, paste into Cursor or Claude Code.

---

Add a new screen at `/(app)/[route]` called "[Screen name]".

Purpose: [what the user does here — e.g. "review and approve pending
refund requests"].

Content:
- PageHeader with eyebrow "[Section]", title "[Screen name]", and a
  primary action button "[Action]"
- [Describe each card: e.g. "a StatCard row with Total / Pending /
  Approved", "a table of requests with customer, amount, date, status
  badge, and an approve button per row"]

Data: add typed demo records to `src/lib/data.ts` and read from there.
Register the route in the sidebar with the [icon-name] lucide icon.
Follow `.cursor/rules/design-system.mdc` — semantic tokens only, existing
components only. Run `npx tsc --noEmit` when done.
