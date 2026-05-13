type QuickAnswerProps = { summary: string };

export function QuickAnswer({ summary }: QuickAnswerProps) {
  return (
    <div role="region" aria-label="Quick answer" className="rounded-[1.5rem] border border-teal-200 bg-teal-50 p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">Quick answer</p>
      <p className="mt-4 max-w-4xl text-xl leading-9 text-slate-900">{summary}</p>
    </div>
  );
}
