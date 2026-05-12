import type { Metadata } from "next";
import { Byline } from "../../components/byline";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for SaaS Signal, published by Miles McQueen.",
  alternates: { canonical: "/terms" }
};

export default function TermsPage() {
  const email = process.env.NEXT_PUBLIC_PUBLISHER_EMAIL ?? "sponsor@saassignalhub.com";
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">Terms</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-normal text-slate-950">Terms of Use</h1>
      <div className="mt-5">
        <Byline context="Published by Miles McQueen" />
      </div>
      <div className="mt-8 space-y-5 text-base leading-8 text-slate-700">
        <p>
          SaaS Signal provides software reporting, comparisons, and calculators for informational purposes. The site does not provide
          legal, financial, procurement, or security advice.
        </p>
        <p>
          Pricing, product details, and operational assumptions can change. Readers should verify terms with vendors before buying,
          renewing, or canceling software.
        </p>
        <p>
          Sponsored placements and affiliate relationships may appear on the site. Paid placements are labeled and do not grant a vendor
          control over editorial conclusions.
        </p>
        <p>
          For corrections, commercial questions, or terms questions, contact Miles McQueen at{" "}
          <a className="font-semibold text-teal-700" href={`mailto:${email}`}>
            {email}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
