import Link from "next/link";
import { Byline } from "../components/byline";
import { getCategories, getRows } from "../lib/data";

export const revalidate = 86400;

const proofPoints = [
  { label: "Reports", value: "100" },
  { label: "Software desks", value: "5" },
  { label: "Sponsor slots", value: "3" }
];

export default async function HomePage() {
  const rows = await getRows();
  const categories = getCategories(rows);
  const leadRows = rows.slice(0, 6);
  return (
    <main>
      <section className="surface-glow overflow-hidden border-b border-slate-200">
        <div className="mx-auto grid min-h-[720px] max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1.1fr)_420px] lg:items-center lg:py-24">
          <div className="fade-up max-w-5xl space-y-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700">SaaS Signal / Miles McQueen</p>
            <h1 className="font-editorial max-w-5xl text-6xl font-semibold leading-[0.95] tracking-normal text-slate-950 sm:text-7xl lg:text-8xl">
              Choose software with a colder eye.
            </h1>
            <p className="max-w-2xl text-xl leading-9 text-slate-600">
              No vendor fog. No bloated grids. Just sharp reports, clean math, and the few facts that change a buying decision.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/analytics"
                className="inline-flex h-12 items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-teal-700 active:translate-y-0"
              >
                Read the reports
              </Link>
              <Link
                href="/advertise"
                className="inline-flex h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:border-teal-500 hover:text-teal-700 active:translate-y-0"
              >
                Sponsor the desk
              </Link>
            </div>
            <Byline context="Publisher and software correspondent" />
          </div>
          <div className="fade-up-delay rounded-[2rem] border border-slate-200 bg-white/85 p-6 shadow-2xl shadow-slate-950/10 backdrop-blur">
            <div className="grid grid-cols-3 gap-3">
              {proofPoints.map((item) => (
                <div key={item.label} className="rounded-2xl bg-slate-950 p-4 text-white">
                  <p className="text-3xl font-semibold tracking-normal">{item.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-300">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-700">Live inventory</p>
              <h2 className="text-3xl font-semibold leading-tight tracking-normal text-slate-950">Direct SaaS placements. Sold cleanly.</h2>
              <p className="leading-7 text-slate-600">
                Sponsor slots sit beside intent: comparison tables, payback calculators, and category reports.
              </p>
              <Link
                href="/advertise"
                className="inline-flex text-sm font-semibold text-teal-700 transition hover:text-slate-950"
              >
                View rates
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700">Coverage</p>
          <h2 className="mt-4 font-editorial text-5xl font-semibold leading-tight tracking-normal text-slate-950">
            Five desks. One question.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">Will this tool pay back before it becomes another subscription?</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className="premium-card group rounded-[1.5rem] border border-slate-200 bg-white p-5"
            >
              <div className="flex h-full flex-col justify-between gap-10">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">0{index + 1}</p>
                  <h3 className="mt-4 text-2xl font-semibold tracking-normal text-slate-950">{category.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{category.description}</p>
                </div>
                <p className="text-sm font-semibold text-teal-700 transition group-hover:text-slate-950">{category.count} reports</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700">Latest</p>
              <h2 className="mt-4 font-editorial text-5xl font-semibold leading-tight tracking-normal text-slate-950">Reports worth opening.</h2>
            </div>
            <Link href="/ai-tools" className="text-sm font-semibold text-teal-700 transition hover:text-slate-950">
              Browse all
            </Link>
          </div>
          <div className="mt-10 divide-y divide-slate-200">
            {leadRows.map((row) => (
              <Link key={row.id} href={row.canonicalPath} className="group grid gap-4 py-7 transition md:grid-cols-[180px_1fr_auto] md:items-center">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">{row.categoryName}</p>
                <div>
                  <h3 className="text-2xl font-semibold tracking-normal text-slate-950 transition group-hover:text-teal-700">{row.title}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{row.description}</p>
                </div>
                <span className="text-sm font-semibold text-slate-950 transition group-hover:translate-x-1 group-hover:text-teal-700">Read</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
