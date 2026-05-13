import type { CategoryIndex, DirectoryRow } from "../types";

export type TrafficAction = {
  channel: string;
  cadence: string;
  action: string;
  reason: string;
};

export const trafficActions = [
  {
    channel: "Google Search Console",
    cadence: "Once, then weekly",
    action: "Submit the sitemap and inspect the homepage plus five category pages.",
    reason: "Google needs clean discovery signals before the long-tail pages can earn impressions."
  },
  {
    channel: "Bing Webmaster Tools",
    cadence: "After every publish batch",
    action: "Submit the sitemap and run the IndexNow script after Vercel deploys.",
    reason: "Bing supports direct URL notifications, which helps new and updated reports get found faster."
  },
  {
    channel: "LinkedIn",
    cadence: "Three posts per week",
    action: "Publish one sharp buyer note from a report, then link to the relevant category page.",
    reason: "SaaS operators and vendors already spend time there, and the audience matches sponsor demand."
  },
  {
    channel: "Founder and operator communities",
    cadence: "Two useful replies per day",
    action: "Answer buying questions with one specific recommendation and one report link.",
    reason: "Helpful replies compound better than cold drops and create early referral traffic."
  },
  {
    channel: "Vendor outreach",
    cadence: "Twenty contacts per week",
    action: "Send the best-fit report to vendors mentioned on the page and ask for corrections or data.",
    reason: "Vendors share fair coverage, correct details, and become sponsor leads."
  }
] as const satisfies readonly TrafficAction[];

export function getRelatedRows(rows: readonly DirectoryRow[], currentRow: DirectoryRow, limit = 4): DirectoryRow[] {
  const sameCategory = rows.filter((row) => row.id !== currentRow.id && row.categorySlug === currentRow.categorySlug);
  const samePageType = rows.filter((row) => row.id !== currentRow.id && row.categorySlug !== currentRow.categorySlug && row.pageType === currentRow.pageType);
  const remaining = rows.filter((row) => row.id !== currentRow.id && row.categorySlug !== currentRow.categorySlug && row.pageType !== currentRow.pageType);
  const seen = new Set<string>();
  const ordered = [...sameCategory, ...samePageType, ...remaining].filter((row) => {
    if (seen.has(row.id)) {
      return false;
    }
    seen.add(row.id);
    return true;
  });
  return ordered.slice(0, limit);
}

export function getPriorityUrls(siteUrl: string, categories: readonly CategoryIndex[], rows: readonly DirectoryRow[]): string[] {
  const origin = siteUrl.replace(/\/$/, "");
  return [
    origin,
    `${origin}/about`,
    `${origin}/advertise`,
    ...categories.map((category) => `${origin}/${category.slug}`),
    ...rows.map((row) => `${origin}${row.canonicalPath}`)
  ];
}

export function getSearchAngles(rows: readonly DirectoryRow[]): string[] {
  return rows.slice(0, 20).map((row) => `${row.categoryName} ${row.useCaseName.toLowerCase()} buying guide`);
}
