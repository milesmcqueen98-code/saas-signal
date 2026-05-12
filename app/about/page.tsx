import type { Metadata } from "next";
import { Byline } from "../../components/byline";

export const metadata: Metadata = {
  title: "About SaaS Signal",
  description: "About SaaS Signal, the independent software reporting desk published by Miles McQueen.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">About</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-normal text-slate-950">A software desk for buyers who need the short version.</h1>
      <div className="mt-5">
        <Byline context="Publisher statement" />
      </div>
      <div className="mt-8 space-y-5 text-base leading-8 text-slate-700">
        <p>
          SaaS Signal is published by Miles McQueen for operators, founders, and team leads who have to choose software while the
          sales calls, feature claims, and pricing pages keep shifting.
        </p>
        <p>
          The site reports on practical buying questions: what a tool replaces, how fast a team can adopt it, where the payback case
          breaks, and which workflows deserve a pilot before a contract is signed.
        </p>
        <p>
          Sponsored placements are labeled. Editorial pages are structured around comparison rows, calculators, and reported notes so
          readers can separate useful buyer evidence from vendor noise.
        </p>
      </div>
    </main>
  );
}
