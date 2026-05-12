import { getStaticRows } from "../lib/data";

const validFormulaTypes = new Set(["roi", "cost-savings", "payback-period"]);

function wordCount(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

const rows = getStaticRows();

if (rows.length < 100) {
  throw new Error(`Dataset must include at least 100 rows. Found ${rows.length}.`);
}

for (const row of rows) {
  const count = wordCount(row.summary);
  if (count < 40 || count > 60) {
    throw new Error(`${row.id} summary has ${count} words.`);
  }
  if (row.comparisonRows.length !== 3) {
    throw new Error(`${row.id} must have exactly 3 comparison rows.`);
  }
  if (!validFormulaTypes.has(row.calculatorConfig.formula.type)) {
    throw new Error(`${row.id} has an invalid calculator formula type.`);
  }
}
