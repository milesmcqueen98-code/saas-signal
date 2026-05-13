import type { DirectoryRow } from "../types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

type ComparisonTableProps = { row: DirectoryRow };

export function ComparisonTable({ row }: ComparisonTableProps) {
  const [optionA, optionB, optionC] = row.optionLabels;
  return (
    <section aria-labelledby="comparison-heading" className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">Side by side</p>
          <h2 id="comparison-heading" className="mt-2 text-3xl font-semibold tracking-normal text-slate-950">
            What changes the decision.
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-slate-500">Three tools. Three tradeoffs. No maze.</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead scope="col">Signal</TableHead>
            <TableHead scope="col">{optionA}</TableHead>
            <TableHead scope="col">{optionB}</TableHead>
            <TableHead scope="col">{optionC}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {row.comparisonRows.map((item) => (
            <TableRow key={item.dimension}>
              <TableCell className="w-40 font-semibold text-slate-950">{item.dimension}</TableCell>
              <TableCell>{item.optionA}</TableCell>
              <TableCell>{item.optionB}</TableCell>
              <TableCell>{item.optionC}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
