type BylineProps = {
  context?: string;
};

export function Byline({ context = "Field notes and analysis" }: BylineProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
      <span className="font-semibold text-slate-950">Miles McQueen</span>
      <span aria-hidden="true">/</span>
      <span>{context}</span>
      <span aria-hidden="true">/</span>
      <time dateTime="2026-05-12">Updated May 12, 2026</time>
    </div>
  );
}
