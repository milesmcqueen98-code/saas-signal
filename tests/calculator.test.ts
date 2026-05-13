import assert from "node:assert/strict";
import test from "node:test";
import { evaluateFormula, formatCalculatorOutput } from "../lib/calculator";
import type { CalculatorFormula } from "../types";

void test("evaluates ROI with tool cost included", () => {
  const formula: CalculatorFormula = {
    type: "roi",
    revenueInput: "revenue",
    costInput: "cost",
    efficiencyMultiplier: 0.1,
    monthlyToolCost: 100
  };

  assert.equal(evaluateFormula(formula, { revenue: 10000, cost: 900 }), 0);
  assert.equal(formatCalculatorOutput(formula, 32), "32%");
});

void test("floors negative cost savings at zero", () => {
  const formula: CalculatorFormula = {
    type: "cost-savings",
    hoursInput: "hours",
    rateInput: "rate",
    automationRate: 0.5,
    monthlyToolCost: 1000
  };

  assert.equal(evaluateFormula(formula, { hours: 5, rate: 50 }), 0);
  assert.equal(formatCalculatorOutput(formula, 1200), "$1,200");
});

void test("returns zero payback when savings do not clear monthly tool cost", () => {
  const formula: CalculatorFormula = {
    type: "payback-period",
    setupCostInput: "setup",
    monthlySavingsInput: "savings",
    monthlyToolCost: 500
  };

  assert.equal(evaluateFormula(formula, { setup: 3000, savings: 400 }), 0);
  assert.equal(evaluateFormula(formula, { setup: 3000, savings: 1500 }), 3);
  assert.equal(formatCalculatorOutput(formula, 3), "3 months");
});
