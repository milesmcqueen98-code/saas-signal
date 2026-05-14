import type { Metadata } from "next";
import { AboutMe } from "../../components/about-me";
import { Byline } from "../../components/byline";
import { authorProfile } from "../../lib/author";

export const metadata: Metadata = {
  title: "About SaaS Signal",
  description: "About SaaS Signal, the independent software reporting desk published by Miles McQueen.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <main>
      <section className="surface-glow border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700">About</p>
          <h1 className="mt-5 font-editorial text-6xl font-semibold leading-[0.95] tracking-normal text-slate-950 sm:text-7xl">
            A software desk for buyers who need the short version.
          </h1>
          <div className="mt-6">
            <Byline context="Publisher statement" />
          </div>
          <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-600">
            SaaS Signal is published by Miles McQueen for operators, founders, and team leads who have to choose software while sales calls,
            feature claims, and pricing pages keep shifting.
          </p>
        </div>
      </section>
      <AboutMe />
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1fr)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700">How the site works</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-normal text-slate-950">Useful beats exhaustive.</h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
              <p>
                The site reports on practical buying questions: what a tool replaces, how fast a team can adopt it, where the payback case
                breaks, and which workflows deserve a pilot before a contract is signed.
              </p>
              <p>
                Sponsored placements are labeled. Editorial pages are structured around comparison rows, calculators, and reported notes so
                readers can separate useful buyer evidence from vendor noise.
              </p>
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-600">Review rules</p>
            <ul className="mt-5 grid gap-3">
              {authorProfile.reviewPrinciples.map((principle) => (
                <li key={principle} className="rounded-[1.25rem] bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  {principle}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
