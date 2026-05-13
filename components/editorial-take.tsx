import { getEditorialTake } from "../lib/editorial";
import type { DirectoryRow } from "../types";

type EditorialTakeProps = {
  row: DirectoryRow;
};

export function EditorialTake({ row }: EditorialTakeProps) {
  const take = getEditorialTake(row);
  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-600">Miles&apos; take</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-normal text-slate-950">{take.headline}</h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">{take.verdict}</p>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.25rem] bg-teal-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">Best move</p>
              <p className="mt-3 text-base leading-7 text-slate-800">{take.bestMove}</p>
            </div>
            <div className="rounded-[1.25rem] bg-rose-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">Skip it if</p>
              <p className="mt-3 text-base leading-7 text-slate-800">{take.skipIf}</p>
            </div>
          </div>
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
        </aside>
      </div>
    </section>
  );
}
