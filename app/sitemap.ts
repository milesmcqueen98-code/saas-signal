import type { MetadataRoute } from "next";
import { getCategories, getRows } from "../lib/data";
import { getSiteUrl } from "../lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const rows = await getRows();
  const categoryUrls = getCategories(rows).map((category) => ({ url: `${siteUrl}/${category.slug}`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.7 }));
  const pageUrls = rows.map((row) => ({ url: `${siteUrl}${row.canonicalPath}`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.8 }));
  return [{ url: siteUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 }, ...categoryUrls, ...pageUrls];
}
