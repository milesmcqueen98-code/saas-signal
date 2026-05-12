import Link from "next/link";
import { getCategories } from "../lib/data";

export function Navbar() {
  const categories = getCategories();
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/" className="text-xl font-semibold tracking-normal text-slate-950">
            SaaS Signal
          </Link>
          <span className="hidden h-5 w-px bg-slate-200 sm:block" />
          <span className="text-sm text-slate-500">Reported by Miles McQueen</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
          {categories.map((category) => (
            <Link key={category.slug} href={`/${category.slug}`} className="hover:text-slate-950">
              {category.name}
            </Link>
          ))}
          <Link href="/advertise" className="rounded-md bg-teal-700 px-3 py-2 font-semibold text-white hover:bg-teal-800">
            Advertise
          </Link>
        </div>
      </nav>
    </header>
  );
}
