# AGENTS.md

## Stack

- **SvelteKit** (Svelte 5, runes mode forced) + **Bun** package manager
- **Tailwind CSS v4** via `@tailwindcss/vite` (NOT PostCSS plugin)
- **Supabase** (SSR) — server client via `event.locals.supabase` (anon + cookies) and `event.locals.supabaseAdmin` (service role). Browser client via `@supabase/ssr` `createBrowserClient` at `$lib/lib/supabase-client.ts`.
- **TanStack Query** + **TanStack Form** for client-side data + forms.
- **shadcn-svelte** (nova style, lucide icons). Run `npx shadcn-svelte add <component>` to add UI components.
- **Prettier** is the only formatter/linter (no ESLint config in repo).
- Deployed to **Vercel** (`@sveltejs/adapter-vercel`).

## Commands

```sh
bun install          # install deps
bun run dev          # dev server
bun run build        # production build
bun run check        # svelte-kit sync + svelte-check (typecheck)
bun run lint         # prettier --check .
bun run format       # prettier --write .
```

No test runner is configured. No CI workflows exist.

## Project Structure

```
src/
├── app.d.ts                          # App.Locals (supabase, supabaseAdmin)
├── app.html
├── hooks.server.ts                   # supabase + supabaseAdmin client setup
├── lib/
│   ├── assets/favicon.svg
│   ├── components/
│   │   ├── layout/                   # App shell (sidebar, providers, shell)
│   │   │   ├── app-sidebar.svelte
│   │   │   ├── providers.svelte
│   │   │   └── shell.svelte
│   │   └── ui/                       # shadcn-svelte components (DON'T EDIT manually)
│   ├── features/
│   │   ├── auth/                     # Auth feature (login, register, queries)
│   │   │   ├── auth-tabs.svelte
│   │   │   ├── login-form.svelte
│   │   │   ├── register-form.svelte
│   │   │   └── queries.ts
│   │   └── storage/                  # Storage feature (upload, list, preview)
│   │       ├── file-list.svelte
│   │       ├── image-preview-sheet.svelte
│   │       ├── queries.ts
│   │       └── upload-form.svelte
│   ├── hooks/is-mobile.svelte.ts
│   └── lib/supabase-client.ts        # Browser Supabase client
├── routes/
│   ├── +layout.server.ts             # Auth redirect guard
│   ├── +layout.svelte                # QueryClientProvider + Providers
│   ├── +layout.ts                    # QueryClient setup, csr = false
│   ├── +page.svelte                  # Landing page
│   ├── api/
│   │   ├── auth/callback/+server.ts  # PKCE code exchange
│   │   └── storage/                  # Storage API routes
│   │       ├── delete/+server.ts
│   │       ├── list/+server.ts
│   │       └── upload/+server.ts
│   ├── auth/+page.svelte             # Auth page
│   └── storage/
│       ├── +page.server.ts           # Load initial files
│       └── +page.svelte              # Storage page
└── styles/
```

## Conventions

- **SSR-only**: `csr = false` in `src/routes/+layout.ts`. All rendering is server-side.
- **Tabs, single quotes, no trailing commas**, print width 100 (see `prettier.config.js`).
- **`$lib`** maps to `src/lib/`. Path aliases handled by SvelteKit.
- **shadcn-svelte** components go in `src/lib/components/ui/`. DO NOT edit manually.
- **Feature-based organization**: Domain logic in `src/lib/features/`. Layout in `src/lib/components/layout/`.
- **Runes mode** is forced for non-node_modules files via `vite.config.ts` compiler options.
- **Environment variables**: `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (see `secretspec.toml`). Loaded via `$env/static/public` and `$env/static/private`.
- **Storage is per-user**: Files stored in `{user_id}/{filename}` in `cloudwan` bucket.
- **API routes** use `supabase` (auth check) + `supabaseAdmin` (storage ops).

## Gotchas

- `svelte-kit sync` must run before `svelte-check` (the `check` script chains both).
- TypeScript uses `rewriteRelativeImportExtensions` and `moduleResolution: "bundler"` — don't switch to node resolution.
- `.svelte-kit/` is generated, never edit directly.
- `supabaseAdmin` uses `createClient` from `@supabase/supabase-js` (NOT `createServerClient`) — no cookies, pure service role key.
