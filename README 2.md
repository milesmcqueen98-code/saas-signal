# SaaS Signal Hub

A Next.js 14 App Router directory hub for B2B SaaS and AI tools. It builds 100 programmatic pages from a typed dataset, includes Supabase schema and seed SQL, and reserves ad slot space to keep layout shift low.

## Local setup

1. Install dependencies with `pnpm install`.
2. Copy `.env.example` to `.env.local`.
3. Set `NEXT_PUBLIC_SITE_URL` to your local or production origin.
4. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` after provisioning Supabase.
5. Run `pnpm dev`.

If Supabase credentials are absent, the app uses the bundled typed dataset so build and local preview still work.

## Supabase provisioning

1. Create a Supabase project.
2. Open the SQL editor and run `supabase/schema.sql`.
3. Run `supabase/seed.sql` to insert the 100 directory rows.
4. Copy the project URL and anon key into `.env.local`.
5. Run `pnpm build` to verify static generation.

## Ad network wiring

Ad layout is centralized in `lib/ads.ts`. Edit only `renderAdSlot` in that file when replacing the reserved demo creative with a real network renderer. Keep `AD_SLOT_DIMENSIONS` unchanged unless the network contract changes, because those dimensions reserve space before hydration and protect CLS.

## Dataset updates

The dataset source lives in `lib/data.ts`, and the SQL seed mirrors the same category and use-case matrix. Add categories or use cases there, then run `pnpm build`; the prebuild script validates row count, quick-answer length, comparison row count, and calculator formula discriminants.
