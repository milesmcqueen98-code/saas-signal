import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 text-sm text-slate-600 sm:px-8 md:grid-cols-[1fr_auto]">
        <div className="space-y-2">
          <p className="font-semibold text-slate-950">SaaS Signal</p>
          <p>Reports, tables, and payback checks by Miles McQueen.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/about" className="hover:text-slate-950">
            About
          </Link>
          <Link href="/contact" className="hover:text-slate-950">
            Contact
          </Link>
          <Link href="/advertise" className="hover:text-slate-950">
            Advertise
          </Link>
          <Link href="/privacy" className="hover:text-slate-950">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-slate-950">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
