import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Byline } from "../../../components/byline";
import { Calculator } from "../../../components/calculator";
import { ComparisonTable } from "../../../components/comparison-table";
import { EditorialDisclosure } from "../../../components/editorial-disclosure";
import { QuickAnswer } from "../../../components/quick-answer";
import { RelatedReports } from "../../../components/related-reports";
import { Schema } from "../../../components/schema";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { AD_SLOT_DIMENSIONS } from "../../../lib/ads";
import { getRow, getRows } from "../../../lib/data";

export const revalidate = 86400;

const HeaderBannerAd = dynamic(() => import("../../../components/ad-unit").then((module) => module.HeaderBannerAd), {
  ssr: false,
  loading: () => <div className="w-full rounded-[1.5rem] bg-slate-100" style={{ minHeight: AD_SLOT_DIMENSIONS["header-banner"].height }} />
});
const SidebarStickyAd = dynamic(() => import("../../../components/ad-unit").then((module) => module.SidebarStickyAd), {
  ssr: false,
  loading: () => <div className="w-full rounded-[1.5rem] bg-slate-100" style={{ minHeight: AD_SLOT_DIMENSIONS["sidebar-sticky"].height }} />
});
const InContentInlineAd = dynamic(() => import("../../../components/ad-unit").then((module) => module.InContentInlineAd), {
  ssr: false,
  loading: () => <div className="w-full rounded-[1.5rem] bg-slate-100" style={{ minHeight: AD_SLOT_DIMENSIONS["in-content-inline"].height }} />
});

type ProgrammaticPageProps = { params: { category: string; "use-case": string } };

export async function generateStaticParams() {
  const rows = await getRows();
  return rows.map((row) => ({ category: row.categorySlug, "use-case": row.useCaseSlug }));
}

export async function generateMetadata({ params }: ProgrammaticPageProps): Promise<Metadata> {
  const row = await getRow(params.category, params["use-case"]);
  if (!row) {
    return {};
  }
  return {
    title: row.title,
    description: row.description,
    alternates: { canonical: row.canonicalPath },
    openGraph: {
      title: row.ogTitle,
      description: row.ogDescription,
      url: row.canonicalPath,
      type: "article"
    }
  };
}

export default async function ProgrammaticPage({ params }: ProgrammaticPageProps) {
  const rows = await getRows();
  const row = rows.find((item) => item.categorySlug === params.category && item.useCaseSlug === params["use-case"]) ?? null;
  if (!row) {
    notFound();
  }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const [firstOption, secondOption, thirdOption] = row.optionLabels;
  const reportSignals = [
    { label: "First look", value: firstOption, className: "bg-teal-100 text-teal-950" },
    { label: "Counterpoint", value: secondOption, className: "bg-amber-100 text-amber-950" },
    { label: "Lean test", value: thirdOption, className: "bg-rose-100 text-rose-950" }
  ];
  return (
    <main>
      <Schema row={row} siteUrl={siteUrl} />
      <section className="surface-glow border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
          <div className="fade-up max-w-5xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700">{row.categoryName}</p>
            <div className="mt-5">
              <Byline context={`${row.pageType} report`} />
            </div>
            <h1 className="mt-7 font-editorial text-5xl font-semibold leading-[1] tracking-normal text-slate-950 sm:text-7xl">
              {row.title}
            </h1>
          </div>
        </div>
      </section>
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <article className="space-y-8">
          <QuickAnswer summary={row.summary} />
          <section className="grid gap-3 md:grid-cols-3">
            {reportSignals.map((item) => (
              <div key={item.label} className={`rounded-[1.25rem] p-5 ${item.className}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-70">{item.label}</p>
                <p className="mt-3 text-2xl font-semibold tracking-normal">{item.value}</p>
              </div>
            ))}
          </section>
          <ComparisonTable row={row} />
          <Calculator config={row.calculatorConfig} />
          <HeaderBannerAd />
          <InContentInlineAd />
          <Card className="rounded-[1.5rem] border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">Notes</p>
              <CardTitle className="text-3xl">What to check before you buy.</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-base leading-8 text-slate-700">
              {row.faqs.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </CardContent>
          </Card>
          <EditorialDisclosure />
          <RelatedReports currentRow={row} rows={rows} />
        </article>
        <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
          <SidebarStickyAd />
          <Card className="rounded-[1.5rem] border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">Method</p>
              <CardTitle>Buy on evidence.</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-7 text-slate-600">
              Miles McQueen tracks price, setup risk, payback, and fit. The goal is not a longer list. It is a better first call.
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}
