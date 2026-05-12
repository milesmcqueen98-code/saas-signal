import type { Metadata } from "next";
import { Byline } from "../../components/byline";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export const metadata: Metadata = {
  title: "Advertise with SaaS Signal",
  description: "Direct sponsorship inventory for SaaS vendors reaching software buyers on SaaS Signal.",
  alternates: { canonical: "/advertise" }
};

const packages = [
  {
    name: "Founding category sponsor",
    price: "$750 for 7 days",
    detail: "Exclusive sponsor mention across one category index and its related buyer reports."
  },
  {
    name: "Sidebar sponsor",
    price: "$500 for 7 days",
    detail: "Premium sticky placement on desktop for high-intent comparison and calculator pages."
  },
  {
    name: "Partner briefing",
    price: "$350 for 7 days",
    detail: "Labeled in-report placement for a demo, trial, benchmark, or educational SaaS offer."
  }
];

export default function AdvertisePage() {
  const email = process.env.NEXT_PUBLIC_PUBLISHER_EMAIL ?? "sponsor@saassignalhub.com";
  const subject = encodeURIComponent("SaaS Signal sponsorship inquiry");
  return (
    <main>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">Advertise</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-slate-950 sm:text-5xl">
            Put your SaaS offer in front of buyers while they are comparing tools.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            SaaS Signal is built for direct sponsorships, affiliate partnerships, and category ownership. Every paid placement is
            labeled and positioned near software research, comparison tables, and payback calculators.
          </p>
          <div className="mt-5">
            <Byline context="Direct sales handled by Miles McQueen" />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-4 md:grid-cols-3">
          {packages.map((item) => (
            <Card key={item.name} className="bg-white">
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-6 text-slate-600">
                <p className="text-2xl font-semibold text-slate-950">{item.price}</p>
                <p>{item.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 rounded-md border border-teal-200 bg-teal-50 p-6">
          <h2 className="text-2xl font-semibold tracking-normal text-slate-950">Twenty-four hour launch terms</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">
            Send the target URL, approved copy, logo requirements, preferred category, and billing contact. Miles McQueen can place a
            labeled campaign after payment clears and the landing page passes a basic quality review.
          </p>
          <a
            href={`mailto:${email}?subject=${subject}`}
            className="mt-5 inline-flex rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
          >
            Email Miles McQueen
          </a>
        </div>
      </section>
    </main>
  );
}
