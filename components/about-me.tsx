import Link from "next/link";
import { authorProfile } from "../lib/author";

type AboutMeProps = {
  variant?: "feature" | "compact";
};

export function AboutMe({ variant = "feature" }: AboutMeProps) {
  if (variant === "compact") {
    return (
      <section aria-labelledby="about-miles-compact" className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">About Miles</p>
        <h2 id="about-miles-compact" className="mt-3 text-2xl font-semibold leading-tight tracking-normal text-slate-950">
          Independent software calls. Plain English.
        </h2>
        <p className="mt-4 text-sm leading-7 text-slate-600">{authorProfile.shortBio}</p>
        <div className="mt-5 grid gap-3">
          {authorProfile.trustSignals.slice(0, 2).map((signal) => (
            <div key={signal.label} className="rounded-[1.25rem] bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{signal.label}</p>
              <p className="mt-2 font-semibold text-slate-950">{signal.value}</p>
            </div>
          ))}
        </div>
        <Link href="/about" className="mt-5 inline-flex text-sm font-semibold text-teal-700 transition hover:text-slate-950">
          Read the editorial stance
        </Link>
      </section>
    );
  }

  return (
    <section aria-labelledby="about-miles-feature" className="border-y border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1fr)] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700">About Miles McQueen</p>
          <h2 id="about-miles-feature" className="mt-4 text-balance font-editorial text-5xl font-semibold leading-tight tracking-normal text-slate-950">
            I write for the buyer who has to live with the tool.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-700">{authorProfile.shortBio}</p>
          <p className="mt-5 text-base leading-8 text-slate-600">{authorProfile.statement}</p>
          <Link
            href={authorProfile.contactPath}
            className="mt-7 inline-flex h-11 items-center justify-center rounded-full bg-slate-950 px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-teal-700 active:translate-y-0"
          >
            Send a correction or tip
          </Link>
        </div>
        <div className="grid gap-4">
          {authorProfile.trustSignals.map((signal) => (
            <div key={signal.label} className="rounded-[1.5rem] border border-slate-200 bg-stone-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{signal.label}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-normal text-slate-950">{signal.value}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{signal.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
