import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Byline } from "../../components/byline";
import { getCategories, getCategoryRows, getRows } from "../../lib/data";

export const revalidate = 86400;

type CategoryPageProps = { params: { category: string } };

const accentClasses = ["bg-teal-400", "bg-amber-400", "bg-rose-400", "bg-sky-400"] as const;

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
      <section className="surface-glow border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="fade-up max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700">Coverage desk</p>
            <h1 className="mt-5 font-editorial text-6xl font-semibold leading-[0.95] tracking-normal text-slate-950 sm:text-7xl">
              {category.name}
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-600">{category.description}</p>
            <div className="mt-6">
              <Byline context={`${category.count} reports`} />
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-3">
          {rows.map((row, index) => (
            <Link
              key={row.id}
              href={row.canonicalPath}
              className="premium-card group grid overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white md:grid-cols-[8px_80px_1fr_auto] md:items-center"
            >
              <span className={`h-2 md:h-full ${accentClasses[index % accentClasses.length]}`} />
              <p className="p-5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400 md:p-6">{String(index + 1).padStart(2, "0")}</p>
              <div className="px-5 pb-5 md:px-0 md:py-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-700">{row.pageType}</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-normal text-slate-950 transition group-hover:text-teal-700">
                  {row.useCaseName}
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{row.description}</p>
              </div>
              <span className="px-5 pb-5 text-sm font-semibold text-slate-950 transition group-hover:translate-x-1 group-hover:text-teal-700 md:px-6 md:pb-0">
                Open report
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
