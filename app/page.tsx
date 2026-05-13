import Link from "next/link";
import { Byline } from "../components/byline";
import { getCategories, getRows } from "../lib/data";

export const revalidate = 86400;

const proofPoints = [
  { label: "Reports", value: "100" },
  { label: "Desks", value: "5" },
  { label: "Buyer math", value: "Live" }
];

const decisionSignals = [
  { label: "Cost", value: "What it really takes", color: "bg-amber-400" },
  { label: "Fit", value: "Where it belongs", color: "bg-teal-400" },
  { label: "Risk", value: "What can break", color: "bg-rose-400" }
];

export default async function HomePage() {
  const rows = await getRows();
  const categories = getCategories(rows);
  const leadRows = rows.slice(0, 6);
  return (
    <main>
      <section className="surface-glow overflow-hidden border-b border-slate-200">
        <div className="mx-auto grid min-h-[760px] max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-center lg:py-24">
          <div className="fade-up max-w-5xl space-y-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700">SaaS Signal / Miles McQueen</p>
            <h1 className="text-balance font-editorial max-w-5xl text-6xl font-semibold leading-[0.92] tracking-normal text-slate-950 sm:text-7xl lg:text-8xl">
              Buy the right tool. Skip the expensive mistake.
            </h1>
            <p className="max-w-2xl text-xl leading-9 text-slate-600">
              Sharp software reports for teams that need a decision, not another tab.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/analytics"
                className="inline-flex h-12 items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-teal-700 active:translate-y-0"
              >
                Start reading
              </Link>
              <Link
                href="/advertise"
                className="inline-flex h-12 items-center justify-center rounded-full border border-rose-200 bg-rose-50 px-6 text-sm font-semibold text-rose-700 transition hover:-translate-y-0.5 hover:border-rose-500 hover:bg-white active:translate-y-0"
              >
                Reach buyers
              </Link>
            </div>
            <Byline context="Publisher and software correspondent" />
          </div>
          <div className="fade-up-delay overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-950/10">
            <div className="color-stripe h-2" />
            <div className="p-6">
              <div className="grid grid-cols-3 gap-3">
                {proofPoints.map((item) => (
                  <div key={item.label} className="rounded-2xl bg-slate-950 p-4 text-white">
                    <p className="text-3xl font-semibold tracking-normal">{item.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-300">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-7 space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-700">Decision stack</p>
                {decisionSignals.map((item) => (
                  <div key={item.label} className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4">
                    <span className={`h-10 w-2 rounded-full ${item.color}`} />
                    <div>
                      <p className="font-semibold text-slate-950">{item.label}</p>
                      <p className="text-sm text-slate-500">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-7 rounded-2xl bg-teal-50 p-5">
                <p className="text-sm font-semibold text-teal-900">Sponsor slots sit beside intent.</p>
                <p className="mt-2 text-sm leading-6 text-teal-800">Reports, calculators, tables. Places where buyers slow down.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700">Coverage</p>
          <h2 className="mt-4 text-balance font-editorial text-5xl font-semibold leading-tight tracking-normal text-slate-950">
            A better first call.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">Each desk removes noise before the demo starts.</p>
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
              <h2 className="mt-4 text-balance font-editorial text-5xl font-semibold leading-tight tracking-normal text-slate-950">
                Reports worth opening.
              </h2>
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
