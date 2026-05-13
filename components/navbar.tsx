import Link from "next/link";
import { getCategories } from "../lib/data";

export function Navbar() {
  const categories = getCategories();
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="color-stripe h-1" />
      <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/" className="text-xl font-semibold tracking-normal text-slate-950 transition hover:text-teal-700">
            SaaS Signal
          </Link>
          <span className="hidden h-5 w-px bg-slate-200 sm:block" />
          <span className="text-sm text-slate-500">Software calls with fewer regrets.</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
          {categories.map((category) => (
            <Link key={category.slug} href={`/${category.slug}`} className="transition hover:text-slate-950">
              {category.name}
            </Link>
          ))}
          <Link href="/advertise" className="rounded-full bg-rose-600 px-4 py-2 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-950">
            Advertise
          </Link>
        </div>
      </nav>
    </header>
  );
}
