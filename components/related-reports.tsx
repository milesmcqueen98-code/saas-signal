import Link from "next/link";
import { getRelatedRows } from "../lib/traffic";
import type { DirectoryRow } from "../types";

type RelatedReportsProps = {
  currentRow: DirectoryRow;
  rows: readonly DirectoryRow[];
};

export function RelatedReports({ currentRow, rows }: RelatedReportsProps) {
  const relatedRows = getRelatedRows(rows, currentRow);
  return (
    <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">Read next</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-normal text-slate-950">More buying calls to make.</h2>
        </div>
        <Link href={`/${currentRow.categorySlug}`} className="text-sm font-semibold text-teal-700 transition hover:text-slate-950">
          Browse {currentRow.categoryName}
        </Link>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {relatedRows.map((row) => (
          <Link
            key={row.id}
            href={row.canonicalPath}
            className="group rounded-[1.25rem] border border-slate-200 p-4 transition hover:-translate-y-0.5 hover:border-teal-400 hover:bg-teal-50"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{row.categoryName}</p>
            <h3 className="mt-2 text-lg font-semibold tracking-normal text-slate-950 transition group-hover:text-teal-800">{row.useCaseName}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{row.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
