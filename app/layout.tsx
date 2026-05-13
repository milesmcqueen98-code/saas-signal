import type { Metadata } from "next";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "SaaS Signal",
  description: "Independent software reporting, comparison tables, and buyer calculators from Miles McQueen.",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml"
    }
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 text-slate-950 antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
