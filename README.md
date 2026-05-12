# SaaS Signal

SaaS Signal is a Next.js 14 App Router publication and directory for B2B SaaS and AI tool buyers. It ships 100 programmatic reports, comparison tables, calculators, trust pages, and direct-sold sponsor placements signed by Miles McQueen.

## Local setup

1. Install dependencies with `pnpm install`.
2. Copy `.env.example` to `.env.local`.
3. Set `NEXT_PUBLIC_SITE_URL` to your local or production origin.
4. Add Supabase credentials after provisioning.
5. Run `pnpm dev`.

If Supabase credentials are absent, the app uses the bundled typed dataset so build and local preview still work.

## Supabase provisioning

1. Create a Supabase project.
2. Open the SQL editor and run `supabase/schema.sql`.
3. Run `supabase/seed.sql` to insert the 100 directory rows.
4. Copy the project URL and anon key into `.env.local` and Vercel project settings.
5. Run `pnpm build` to verify static generation.

## Vercel launch

1. Push the project to GitHub.
2. Import the repo in Vercel.
3. Add `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `NEXT_PUBLIC_PUBLISHER_EMAIL` in Vercel project settings.
4. Deploy to production.
5. Add the production domain to Google Search Console and submit `/sitemap.xml`.

## Direct sponsorship setup

This project does not use AdSense. It is wired for direct SaaS sponsorships and affiliate-ready placements that can go live as soon as an advertiser pays and supplies an approved URL.

Edit only `lib/ads.ts` to change the default sponsor creative. For a fast campaign, set these public environment variables in Vercel:

```bash
NEXT_PUBLIC_SPONSOR_HEADER_BANNER_TITLE="Your sponsor headline"
NEXT_PUBLIC_SPONSOR_HEADER_BANNER_URL="https://sponsor.example"
NEXT_PUBLIC_SPONSOR_SIDEBAR_STICKY_TITLE="Your sidebar offer"
NEXT_PUBLIC_SPONSOR_SIDEBAR_STICKY_URL="https://sponsor.example"
NEXT_PUBLIC_SPONSOR_IN_CONTENT_INLINE_TITLE="Your in-report offer"
NEXT_PUBLIC_SPONSOR_IN_CONTENT_INLINE_URL="https://sponsor.example"
```

Keep `AD_SLOT_DIMENSIONS` unchanged unless the sponsor contract changes, because those dimensions reserve space before hydration and protect CLS.

## Trust pages

The site includes About, Contact, Advertise, Privacy, and Terms pages. Update `NEXT_PUBLIC_PUBLISHER_EMAIL` before launch so sponsor and correction requests go to Miles McQueen.

## Dataset updates

The dataset source lives in `lib/data.ts`, and the SQL seed mirrors the same category and use-case matrix. Add categories or use cases there, then run `pnpm build`; the prebuild script validates row count, quick-answer length, comparison row count, and calculator formula discriminants.
