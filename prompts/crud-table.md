# Prompt · CRUD table screen

Copy, fill the brackets, paste into Cursor or Claude Code.

---

Add a CRUD list screen at `/(app)/[route]` for managing [things].

Model it on `/payments`:
- `TalvoFrame` with the page's nav index, then a `PageHeaderBlock`
  (title, description, the primary action)
- A `FilterBarBlock` ("Filter by [field]…", the filters that matter)
- A `DataTableCard` with columns: [Column list — say which are amounts and
  which show a status], sorting, row selection and pagination
- Row actions open what each row needs (an edit dialog, a detail page)

Data: [N] realistic rows in the block's props (no lorem ipsum), plus a
matching model in `prisma/schema.prisma` when it should persist. Register
the screen in `NAV` and `LINKS` in `src/components/app/talvo.tsx` and in
the protected routes of `src/proxy.ts`. Semantic tokens only.
Run `npx tsc --noEmit` when done.
