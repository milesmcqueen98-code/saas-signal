import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { getCategories, getRows } from "../lib/data";

export const revalidate = 86400;

export default async function HomePage() {
  const rows = await getRows();
  const categories = getCategories(rows);
  return <main className="mx-auto max-w-6xl px-4 py-10"><section className="max-w-3xl space-y-4"><p className="text-sm font-semibold uppercase tracking-wider text-teal-700">B2B SaaS and AI tools</p><h1 className="text-4xl font-semibold tracking-normal text-slate-950 sm:text-5xl">Programmatic software guides with live calculators</h1><p className="text-lg leading-8 text-slate-600">Explore category indexes, comparison pages, and calculators built from a structured dataset.</p></section><section className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{categories.map((category) => <Link key={category.slug} href={`/${category.slug}`}><Card className="h-full transition-colors hover:border-teal-300"><CardHeader><CardTitle>{category.name}</CardTitle></CardHeader><CardContent className="space-y-3 text-sm text-slate-600"><p>{category.description}</p><p className="font-medium text-slate-900">{category.count} guides</p></CardContent></Card></Link>)}</section></main>;
}
