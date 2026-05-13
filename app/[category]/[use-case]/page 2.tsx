import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Calculator } from "../../../components/calculator";
import { ComparisonTable } from "../../../components/comparison-table";
import { QuickAnswer } from "../../../components/quick-answer";
import { Schema } from "../../../components/schema";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { AD_SLOT_DIMENSIONS } from "../../../lib/ads";
import { getRow, getRows } from "../../../lib/data";
import { getSiteUrl } from "../../../lib/site";

export const revalidate = 86400;

const HeaderBannerAd = dynamic(() => import("../../../components/ad-unit").then((module) => module.HeaderBannerAd), { ssr: false, loading: () => <div className="w-full rounded-md bg-slate-100" style={{ minHeight: AD_SLOT_DIMENSIONS["header-banner"].height }} /> });
const SidebarStickyAd = dynamic(() => import("../../../components/ad-unit").then((module) => module.SidebarStickyAd), { ssr: false, loading: () => <div className="w-full rounded-md bg-slate-100" style={{ minHeight: AD_SLOT_DIMENSIONS["sidebar-sticky"].height }} /> });
const InContentInlineAd = dynamic(() => import("../../../components/ad-unit").then((module) => module.InContentInlineAd), { ssr: false, loading: () => <div className="w-full rounded-md bg-slate-100" style={{ minHeight: AD_SLOT_DIMENSIONS["in-content-inline"].height }} /> });

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
  return { title: row.title, description: row.description, alternates: { canonical: row.canonicalPath }, openGraph: { title: row.ogTitle, description: row.ogDescription, url: row.canonicalPath, type: "article" } };
}

export default async function ProgrammaticPage({ params }: ProgrammaticPageProps) {
  const row = await getRow(params.category, params["use-case"]);
  if (!row) {
    notFound();
  }
  const siteUrl = getSiteUrl();
  return <main className="mx-auto max-w-6xl px-4 py-8"><Schema row={row} siteUrl={siteUrl} /><div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]"><article className="space-y-8"><header className="space-y-5"><p className="text-sm font-semibold uppercase tracking-wider text-teal-700">{row.categoryName}</p><h1 className="text-4xl font-semibold tracking-normal text-slate-950 sm:text-5xl">{row.title}</h1></header><QuickAnswer summary={row.summary} /><HeaderBannerAd /><ComparisonTable row={row} /><InContentInlineAd /><Calculator config={row.calculatorConfig} /><Card><CardHeader><CardTitle>Decision notes</CardTitle></CardHeader><CardContent className="grid gap-3 text-sm leading-7 text-slate-700">{row.faqs.map((item) => <p key={item}>{item}</p>)}</CardContent></Card></article><aside className="space-y-5 lg:sticky lg:top-6 lg:self-start"><SidebarStickyAd /><Card><CardHeader><CardTitle>Page type</CardTitle></CardHeader><CardContent className="text-sm capitalize text-slate-700">{row.pageType}</CardContent></Card></aside></div></main>;
}
