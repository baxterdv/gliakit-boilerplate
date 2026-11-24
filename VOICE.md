# Voice and tone

How the product talks: on buttons, in empty states, errors, emails and help.
Write every new screen to this, and when two choices are both right, pick the
shorter one. Put your product's name in the title once it has one; the rules
stay.

## Principles

- **Plain.** Everyday words a new customer understands. "Sign in", not
  "Authenticate"; "Remove", not "Disassociate".
- **Specific.** Name the thing and the number. "3 invoices are overdue",
  not "Some items need attention".
- **Calm.** Say what happened and what to do next, without blame, alarm or
  exclamation marks. Save urgency for real risk to data or money.
- **Brief.** One idea per sentence; cut words that don't change the meaning.
  Most UI text fits on one line.
- **Human.** Write to "you"; say "we" for the company. Contractions are fine
  ("can't", "you'll").

## Mechanics

- Sentence case everywhere: titles, buttons, tabs, menu items ("Create
  workspace", not "Create Workspace"). Proper nouns keep their capitals.
- Buttons name the act with a verb and, when it helps, the object: "Save
  changes", "Send invite", "Cancel booking". Never "OK", "Submit" or "Yes".
  The confirming button repeats the title's verb ("Delete project?" →
  "Delete project").
- No full stop on titles, labels, buttons or single-sentence toasts; full stops
  on body sentences.
- Numbers as digits ("3 seats", "12 days left"); dates as "Nov 8, 2026", times
  as "14:00" or "2:00 PM" consistently, and "2 min ago" for recent activity.
- Money with its currency and two decimals where cents exist ("€249.00").
- Use "…" (one character) on items that open something that needs more input
  ("Rename…"), and for loading text ("Saving…").

## Patterns

| Moment | Do | Don't |
|---|---|---|
| Empty state | "No invoices yet. Create one to bill a client." + the button | "Nothing here!" |
| No results | "No patients match “Kel”. Check the spelling or clear the filters." | "0 results" |
| Error | "We couldn't save your changes. Check your connection and try again." | "Error 500" or "Oops!" |
| Field error | "Enter an email like name@company.com" (says how to fix it) | "Invalid input" |
| Destructive confirm | "Delete Apollo? Its 24 tasks and files are removed for everyone. You can't undo this." | "Are you sure?" |
| Success toast | "Invite sent to lena@brightsmile.io" (what happened, past tense) | "Success!" |
| Loading | "Loading invoices…" (or a skeleton, no text) | "Please wait" |
| Permission | "You need Admin access to change billing. Ask Arjun Rao." | "Forbidden" |

## Accessibility

- Every icon-only button has a label that says what it does ("Close", "More
  actions for INV-2041").
- Links say where they go ("View invoice"), never "Click here".
- Don't rely on colour alone: a status says its word ("Overdue") beside its
  colour.
- Alt text describes what an image shows that matters; decorative images get
  an empty alt.
