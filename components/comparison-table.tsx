import type { DirectoryRow } from "../types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

type ComparisonTableProps = { row: DirectoryRow };

export function ComparisonTable({ row }: ComparisonTableProps) {
  const [optionA, optionB, optionC] = row.optionLabels;
  return (
    <section aria-labelledby="comparison-heading" className="space-y-3">
      <h2 id="comparison-heading" className="text-2xl font-semibold tracking-normal">Comparison table</h2>
      <Table>
        <TableHeader><TableRow><TableHead scope="col">Dimension</TableHead><TableHead scope="col">{optionA}</TableHead><TableHead scope="col">{optionB}</TableHead><TableHead scope="col">{optionC}</TableHead></TableRow></TableHeader>
        <TableBody>{row.comparisonRows.map((item) => <TableRow key={item.dimension}><TableCell className="font-medium text-slate-900">{item.dimension}</TableCell><TableCell>{item.optionA}</TableCell><TableCell>{item.optionB}</TableCell><TableCell>{item.optionC}</TableCell></TableRow>)}</TableBody>
      </Table>
    </section>
  );
}
