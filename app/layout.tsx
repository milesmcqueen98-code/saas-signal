import type { Metadata } from "next";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { getSiteUrl } from "../lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
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
