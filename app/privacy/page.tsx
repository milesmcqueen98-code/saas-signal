import type { Metadata } from "next";
import { Byline } from "../../components/byline";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for SaaS Signal, published by Miles McQueen.",
  alternates: { canonical: "/privacy" }
};

export default function PrivacyPage() {
  const email = process.env.NEXT_PUBLIC_PUBLISHER_EMAIL ?? "sponsor@saassignalhub.com";
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">Privacy</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-normal text-slate-950">Privacy Policy</h1>
      <div className="mt-5">
        <Byline context="Published by Miles McQueen" />
      </div>
      <div className="mt-8 space-y-5 text-base leading-8 text-slate-700">
        <p>
          SaaS Signal collects the limited information needed to operate the site, understand aggregate readership, respond to emails,
          and deliver labeled sponsorship placements.
        </p>
        <p>
          The site may use hosting logs, analytics tools, and sponsor click tracking to measure page performance. Those measurements
          are used in aggregate and are not sold as personal dossiers.
        </p>
        <p>
          If you contact Miles McQueen by email, the information you send may be used to answer your message, correct a report, review
          a sponsor placement, or manage a commercial inquiry.
        </p>
        <p>
          To request a privacy review or removal of information you supplied directly, email{" "}
          <a className="font-semibold text-teal-700" href={`mailto:${email}`}>
            {email}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
