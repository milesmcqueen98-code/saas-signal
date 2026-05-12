type QuickAnswerProps = { summary: string };

export function QuickAnswer({ summary }: QuickAnswerProps) {
  return <div role="region" aria-label="Quick answer" className="rounded-lg border border-emerald-200 bg-emerald-50 p-5"><p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Quick Answer</p><p className="mt-2 text-base leading-7 text-slate-800">{summary}</p></div>;
}
