export type CalculatorInput = {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit: string;
};

export type RoiFormula = {
  type: "roi";
  revenueInput: string;
  costInput: string;
  efficiencyMultiplier: number;
  monthlyToolCost: number;
};

export type CostSavingsFormula = {
  type: "cost-savings";
  hoursInput: string;
  rateInput: string;
  automationRate: number;
  monthlyToolCost: number;
};

export type PaybackPeriodFormula = {
  type: "payback-period";
  setupCostInput: string;
  monthlySavingsInput: string;
  monthlyToolCost: number;
};

export type CalculatorFormula = RoiFormula | CostSavingsFormula | PaybackPeriodFormula;

export type CalculatorConfig = {
  inputs: CalculatorInput[];
  formula: CalculatorFormula;
  outputLabel: string;
};
