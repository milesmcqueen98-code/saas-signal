import Link from "next/link";
import { Byline } from "../components/byline";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { getCategories, getRows } from "../lib/data";

export const revalidate = 86400;

export default async function HomePage() {
  const rows = await getRows();
  const categories = getCategories(rows);
  const leadRows = rows.slice(0, 6);
  return (
    <main>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">Independent software desk</p>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-normal text-slate-950 sm:text-6xl">
              Software buyers are drowning in claims. We check the working evidence.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              SaaS Signal publishes concise field reports, comparison tables, and payback calculators for teams choosing AI tools,
              CRMs, analytics systems, automation platforms, and support software.
            </p>
            <Byline context="Publisher and software correspondent" />
          </div>
          <div className="rounded-md border border-slate-200 bg-stone-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Sponsor inventory</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-normal text-slate-950">Direct SaaS placements are open now.</h2>
            <p className="mt-3 leading-7 text-slate-600">
              Category sponsorships, sidebar placements, and in-report partner notes are available without waiting on AdSense approval.
            </p>
            <Link
              href="/advertise"
              className="mt-5 inline-flex rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
            >
              View the media kit
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">Coverage areas</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal text-slate-950">Five desks, one buyer question: what actually pays back?</h2>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.slug} href={`/${category.slug}`}>
              <Card className="h-full border-slate-200 bg-white transition-colors hover:border-teal-400">
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm leading-6 text-slate-600">
                  <p>{category.description}</p>
                  <p className="font-semibold text-slate-950">{category.count} reported guides</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">Latest field reports</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {leadRows.map((row) => (
              <Link key={row.id} href={row.canonicalPath} className="border-b border-slate-200 pb-4 hover:border-teal-500">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{row.categoryName}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-normal text-slate-950">{row.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{row.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
