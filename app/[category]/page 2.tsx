import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { getCategories, getCategoryRows, getRows } from "../../lib/data";

export const revalidate = 86400;

type CategoryPageProps = { params: { category: string } };

export async function generateStaticParams() {
  const rows = await getRows();
  return getCategories(rows).map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const rows = await getRows();
  const category = getCategories(rows).find((item) => item.slug === params.category);
  if (!category) {
    return {};
  }
  return { title: `${category.name} guides and calculators`, description: category.description, alternates: { canonical: `/${category.slug}` }, openGraph: { title: `${category.name} guides`, description: category.description, url: `/${category.slug}`, type: "website" } };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const rows = await getCategoryRows(params.category);
  const category = getCategories(rows).find((item) => item.slug === params.category);
  if (!category || rows.length === 0) {
    notFound();
  }
  return <main className="mx-auto max-w-6xl px-4 py-10"><section className="max-w-3xl space-y-4"><p className="text-sm font-semibold uppercase tracking-wider text-teal-700">Category</p><h1 className="text-4xl font-semibold tracking-normal text-slate-950">{category.name}</h1><p className="text-lg leading-8 text-slate-600">{category.description}</p></section><section className="mt-10 grid gap-4 md:grid-cols-2">{rows.map((row) => <Link key={row.id} href={row.canonicalPath}><Card className="h-full transition-colors hover:border-teal-300"><CardHeader><CardTitle>{row.useCaseName}</CardTitle></CardHeader><CardContent className="space-y-3 text-sm text-slate-600"><p>{row.description}</p><p className="font-medium capitalize text-slate-900">{row.pageType}</p></CardContent></Card></Link>)}</section></main>;
}
