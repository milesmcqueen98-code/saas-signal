"use client";

import { useId, useMemo, useState } from "react";
import { evaluateFormula, formatCalculatorOutput } from "../lib/calculator";
import type { CalculatorConfig, CalculatorInput } from "../types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type CalculatorProps = { config: CalculatorConfig };

type RawCalculatorValues = Record<string, string>;

function initialValues(config: CalculatorConfig): RawCalculatorValues {
  return Object.fromEntries(config.inputs.map((input) => [input.key, String(input.defaultValue)]));
}

function clamp(value: number, input: CalculatorInput): number {
  return Math.min(input.max, Math.max(input.min, value));
}

function parseInputValue(input: CalculatorInput, rawValue: string | undefined): number {
  const value = Number(rawValue);
  if (!Number.isFinite(value)) {
    return input.defaultValue;
  }
  return clamp(value, input);
}

function valuesForFormula(config: CalculatorConfig, rawValues: RawCalculatorValues): Record<string, number> {
  return Object.fromEntries(config.inputs.map((input) => [input.key, parseInputValue(input, rawValues[input.key])]));
}

function displayValue(input: CalculatorInput, rawValue: string | undefined): string {
  if (rawValue === undefined) {
    return String(input.defaultValue);
  }
  return rawValue;
}

function normalizedInputValue(input: CalculatorInput, rawValue: string | undefined): string {
  return String(parseInputValue(input, rawValue));
}

export function Calculator({ config }: CalculatorProps) {
  const baseId = useId();
  const seedValues = useMemo(() => initialValues(config), [config]);
  const [rawValues, setRawValues] = useState<RawCalculatorValues>(seedValues);
  const values = useMemo(() => valuesForFormula(config, rawValues), [config, rawValues]);
  const result = evaluateFormula(config.formula, values);
  return (
    <section aria-labelledby={`${baseId}-heading`} className="grid overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-950 shadow-xl shadow-slate-950/10 lg:grid-cols-[1fr_320px]">
      <div className="p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-300">Payback check</p>
        <h2 id={`${baseId}-heading`} className="mt-3 text-3xl font-semibold tracking-normal text-white">
          Run the math before the salesperson does.
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {config.inputs.map((input) => {
            const inputId = `${baseId}-${input.key}`;
            const helpId = `${inputId}-help`;
            return (
              <div key={input.key} className="grid gap-2">
                <Label htmlFor={inputId} className="text-slate-200">
                  {input.label}
                </Label>
                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
                  <Input
                    id={inputId}
                    type="number"
                    inputMode="decimal"
                    min={input.min}
                    max={input.max}
                    step={input.step}
                    value={displayValue(input, rawValues[input.key])}
                    aria-describedby={helpId}
                    className="border-0 bg-transparent text-white focus-visible:ring-teal-300"
                    onChange={(event) => {
                      setRawValues((current) => ({ ...current, [input.key]: event.target.value }));
                    }}
                    onBlur={() => {
                      setRawValues((current) => ({ ...current, [input.key]: normalizedInputValue(input, current[input.key]) }));
                    }}
                  />
                  <span className="w-10 text-sm text-slate-400">{input.unit}</span>
                </div>
                <p id={helpId} className="text-xs leading-5 text-slate-400">
                  Allowed range: {input.min.toLocaleString("en-US")} to {input.max.toLocaleString("en-US")} {input.unit}.
                </p>
              </div>
            );
          })}
        </div>
        <Button
          type="button"
          variant="secondary"
          className="mt-6 border border-white/10 bg-white/10 text-white hover:bg-white/20"
          onClick={() => setRawValues(initialValues(config))}
        >
          Reset assumptions
        </Button>
      </div>
      <div className="flex flex-col justify-between bg-white p-6 sm:p-8">
        <div aria-live="polite" aria-atomic="true">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{config.outputLabel}</p>
          <p className="mt-4 text-5xl font-semibold tracking-normal text-slate-950">{formatCalculatorOutput(config.formula, result)}</p>
        </div>
        <p className="mt-8 text-sm leading-6 text-slate-600">A quick sanity check. If the number looks weak here, the real deal will not get kinder.</p>
      </div>
    </section>
  );
}
