import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Byline } from "../../components/byline";
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
  return {
    title: `${category.name} software reports by Miles McQueen`,
    description: category.description,
    alternates: { canonical: `/${category.slug}` },
    openGraph: {
      title: `${category.name} software reports`,
      description: category.description,
      url: `/${category.slug}`,
      type: "website"
    }
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const rows = await getCategoryRows(params.category);
  const category = getCategories(rows).find((item) => item.slug === params.category);
  if (!category || rows.length === 0) {
    notFound();
  }
  return (
    <main>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">Coverage desk</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-normal text-slate-950">{category.name}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">{category.description}</p>
          <div className="mt-5">
            <Byline context={`${category.count} buyer reports in this desk`} />
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-10 md:grid-cols-2">
        {rows.map((row) => (
          <Link key={row.id} href={row.canonicalPath}>
            <Card className="h-full border-slate-200 bg-white transition-colors hover:border-teal-400">
              <CardHeader>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{row.pageType}</p>
                <CardTitle>{row.useCaseName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-6 text-slate-600">
                <p>{row.description}</p>
                <p className="font-semibold text-slate-950">Reported by Miles McQueen</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </main>
  );
}
