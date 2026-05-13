"use client";

import { useMemo, useState } from "react";
import { evaluateFormula, formatCalculatorOutput } from "../lib/calculator";
import type { CalculatorConfig } from "../types";
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
    <section className="grid overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-950 shadow-xl shadow-slate-950/10 lg:grid-cols-[1fr_320px]">
      <div className="p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-300">Payback check</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white">Change the inputs. See the answer.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {config.inputs.map((input) => (
            <div key={input.key} className="grid gap-2">
              <Label htmlFor={input.key} className="text-slate-200">
                {input.label}
              </Label>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
                <Input
                  id={input.key}
                  type="number"
                  min={input.min}
                  max={input.max}
                  step={input.step}
                  value={values[input.key] ?? input.defaultValue}
                  className="border-0 bg-transparent text-white focus-visible:ring-teal-300"
                  onChange={(event) => {
                    const value = Number(event.target.value);
                    setValues((current) => ({ ...current, [input.key]: Number.isFinite(value) ? value : input.defaultValue }));
                  }}
                />
                <span className="w-10 text-sm text-slate-400">{input.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-between bg-white p-6 sm:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{config.outputLabel}</p>
          <p className="mt-4 text-5xl font-semibold tracking-normal text-slate-950">{formatCalculatorOutput(config.formula, result)}</p>
        </div>
        <p className="mt-8 text-sm leading-6 text-slate-600">A fast gut check. Strong enough for a shortlist. Not a substitute for procurement.</p>
      </div>
    </section>
  );
}
