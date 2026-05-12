import type { CalculatorFormula } from "../types/calculator";

export type CalculatorValues = Record<string, number>;

function readValue(values: CalculatorValues, key: string): number {
  return values[key] ?? 0;
}

export function evaluateFormula(formula: CalculatorFormula, values: CalculatorValues): number {
  switch (formula.type) {
    case "roi": {
      const revenue = readValue(values, formula.revenueInput);
      const cost = readValue(values, formula.costInput) + formula.monthlyToolCost;
      if (cost <= 0) {
        return 0;
      }
      return Math.round(((revenue * formula.efficiencyMultiplier - cost) / cost) * 100);
    }
    case "cost-savings": {
      const hours = readValue(values, formula.hoursInput);
      const rate = readValue(values, formula.rateInput);
      return Math.max(0, Math.round(hours * rate * formula.automationRate - formula.monthlyToolCost));
    }
    case "payback-period": {
      const setupCost = readValue(values, formula.setupCostInput);
      const monthlySavings = readValue(values, formula.monthlySavingsInput) - formula.monthlyToolCost;
      if (monthlySavings <= 0) {
        return 0;
      }
      return Math.round((setupCost / monthlySavings) * 10) / 10;
    }
  }
}

export function formatCalculatorOutput(formula: CalculatorFormula, value: number): string {
  if (formula.type === "roi") {
    return `${value}%`;
  }
  if (formula.type === "payback-period") {
    return `${value} months`;
  }
  return `$${value.toLocaleString("en-US")}`;
}
