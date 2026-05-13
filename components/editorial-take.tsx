import { getEditorialTake } from "../lib/editorial";
import type { DirectoryRow } from "../types";

type EditorialTakeProps = {
  row: DirectoryRow;
};

export function EditorialTake({ row }: EditorialTakeProps) {
  const take = getEditorialTake(row);
  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-600">Technical audit</p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-normal text-slate-950">{take.headline}</h2>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-700">{take.verdict}</p>
      </div>
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="grid gap-6 p-6 sm:p-8">
          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">The Bottom Line</p>
            <div className="mt-3 space-y-3 text-lg leading-8 text-slate-900">
              {take.bottomLine.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </section>
          <section className="rounded-[1.25rem] bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Time-to-Value (TTV)</p>
            <p className="mt-3 text-base leading-7 text-slate-800">{take.timeToValue}</p>
          </section>
          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Where it Breaks</p>
            <ul className="mt-3 grid gap-3">
              {take.whereBreaks.map((item) => (
                <li key={item} className="rounded-[1.25rem] border border-slate-200 p-4 text-base leading-7 text-slate-800">
                  <span className="font-semibold text-slate-950">Risk:</span> {item}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">The Real Cost</p>
            <ul className="mt-3 grid gap-3">
              {take.realCost.map((item) => (
                <li key={item} className="rounded-[1.25rem] border border-slate-200 p-4 text-base leading-7 text-slate-800">
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.25rem] bg-teal-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">Best move</p>
              <p className="mt-3 text-base leading-7 text-slate-800">{take.bestMove}</p>
            </div>
            <div className="rounded-[1.25rem] bg-rose-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">Skip it if</p>
              <p className="mt-3 text-base leading-7 text-slate-800">{take.skipIf}</p>
            </div>
          </section>
        </div>
        <aside className="border-t border-slate-200 bg-slate-950 p-6 text-white lg:border-l lg:border-t-0 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">Gut check</p>
          <p className="mt-4 text-xl font-semibold leading-8">{take.gutCheck}</p>
          <div className="mt-7 space-y-3">
            {take.checks.map((item) => (
              <p key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-200">
                {item}
              </p>
            ))}
          </div>
          <p className="mt-7 text-xs leading-6 text-slate-400">
            Hard limits are called out only when they are present in the page data. Missing limits are treated as a buyer risk, not a detail
            to smooth over.
          </p>
        </aside>
      </div>
    </section>
  );
}
