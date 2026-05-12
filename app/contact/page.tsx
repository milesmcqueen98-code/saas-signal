import type { Metadata } from "next";
import { Byline } from "../../components/byline";

export const metadata: Metadata = {
  title: "Contact Miles McQueen",
  description: "Contact Miles McQueen at SaaS Signal for corrections, news tips, and sponsor inquiries.",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  const email = process.env.NEXT_PUBLIC_PUBLISHER_EMAIL ?? "sponsor@saassignalhub.com";
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">Contact</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-normal text-slate-950">Send corrections, tips, and sponsor inquiries.</h1>
      <div className="mt-5">
        <Byline context="Inbox monitored by the publisher" />
      </div>
      <div className="mt-8 rounded-md border border-slate-200 bg-white p-6">
        <p className="text-sm leading-7 text-slate-700">
          For editorial corrections, category suggestions, direct sponsorships, or affiliate partnership notes, contact Miles McQueen
          at{" "}
          <a className="font-semibold text-teal-700" href={`mailto:${email}`}>
            {email}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
