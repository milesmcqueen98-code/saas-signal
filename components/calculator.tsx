"use client";

import { useMemo, useState } from "react";
import { evaluateFormula, formatCalculatorOutput } from "../lib/calculator";
import type { CalculatorConfig } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type CalculatorProps = { config: CalculatorConfig };

function initialValues(config: CalculatorConfig): Record<string, number> {
  return Object.fromEntries(config.inputs.map((input) => [input.key, input.defaultValue]));
}

export function Calculator({ config }: CalculatorProps) {
  const seedValues = useMemo(() => initialValues(config), [config]);
  const [values, setValues] = useState<Record<string, number>>(seedValues);
  const result = evaluateFormula(config.formula, values);
  return (
    <Card>
      <CardHeader><CardTitle>{config.outputLabel} calculator</CardTitle></CardHeader>
      <CardContent className="grid gap-5">
        <div className="grid gap-4 md:grid-cols-2">
          {config.inputs.map((input) => (
            <div key={input.key} className="grid gap-2">
              <Label htmlFor={input.key}>{input.label}</Label>
              <div className="flex items-center gap-2">
                <Input id={input.key} type="number" min={input.min} max={input.max} step={input.step} value={values[input.key] ?? input.defaultValue} onChange={(event) => { const value = Number(event.target.value); setValues((current) => ({ ...current, [input.key]: Number.isFinite(value) ? value : input.defaultValue })); }} />
                <span className="w-10 text-sm text-muted-foreground">{input.unit}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-md bg-slate-900 p-5 text-white"><p className="text-sm text-slate-300">{config.outputLabel}</p><p className="mt-1 text-3xl font-semibold tracking-normal">{formatCalculatorOutput(config.formula, result)}</p></div>
      </CardContent>
    </Card>
  );
}
