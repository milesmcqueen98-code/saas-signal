import type { Metadata } from "next";
import { Byline } from "../../components/byline";

export const metadata: Metadata = {
  title: "Advertise with SaaS Signal",
  description: "Direct sponsorship inventory for SaaS vendors reaching software buyers on SaaS Signal.",
  alternates: { canonical: "/advertise" }
};

const packages = [
  {
    name: "Category owner",
    price: "$750",
    term: "7 days",
    detail: "Own one software desk. Category page plus related reports."
  },
  {
    name: "Sidebar lead",
    price: "$500",
    term: "7 days",
    detail: "Stay visible beside comparison tables and calculators."
  },
  {
    name: "Report note",
    price: "$350",
    term: "7 days",
    detail: "A labeled placement inside the buyer’s reading flow."
  }
];

export default function AdvertisePage() {
  const email = process.env.NEXT_PUBLIC_PUBLISHER_EMAIL ?? "sponsor@saassignalhub.com";
  const subject = encodeURIComponent("SaaS Signal sponsorship inquiry");
  return (
    <main>
      <section className="surface-glow border-b border-slate-200">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_360px] lg:items-end lg:py-24">
          <div className="fade-up max-w-5xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700">Advertise</p>
            <h1 className="mt-5 font-editorial text-6xl font-semibold leading-[0.95] tracking-normal text-slate-950 sm:text-7xl">
              Meet buyers before the demo request.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-slate-600">
              Your offer appears where the decision starts: reports, tables, and payback checks.
            </p>
            <div className="mt-7">
              <Byline context="Direct sales handled by Miles McQueen" />
            </div>
          </div>
          <a
            href={`mailto:${email}?subject=${subject}`}
            className="inline-flex h-12 items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-teal-700 active:translate-y-0"
          >
            Book a placement
          </a>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {packages.map((item) => (
            <div key={item.name} className="premium-card rounded-[1.5rem] border border-slate-200 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">{item.name}</p>
              <p className="mt-6 text-5xl font-semibold tracking-normal text-slate-950">{item.price}</p>
              <p className="mt-1 text-sm text-slate-500">{item.term}</p>
              <p className="mt-6 leading-7 text-slate-600">{item.detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-slate-950 p-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-300">Fast start</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal">Send the URL. Send the line. Go live.</h2>
          <p className="mt-4 max-w-3xl leading-8 text-slate-300">
            Miles McQueen reviews the offer, confirms fit, and places the campaign after payment clears. No dark patterns. No fake
            endorsement. Just a clean paid placement.
          </p>
        </div>
      </section>
    </main>
  );
}
