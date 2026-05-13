import { getRows } from "../../lib/data";
import { getSiteUrl } from "../../lib/site";

export const revalidate = 86400;

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const siteUrl = getSiteUrl();
  const rows = await getRows();
  const buildDate = new Date().toUTCString();
  const items = rows
    .map((row) => {
      const url = `${siteUrl}${row.canonicalPath}`;
      return [
        "<item>",
        `<title>${escapeXml(row.title)}</title>`,
        `<link>${escapeXml(url)}</link>`,
        `<guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `<description>${escapeXml(row.description)}</description>`,
        `<category>${escapeXml(row.categoryName)}</category>`,
        `<pubDate>${buildDate}</pubDate>`,
        "</item>"
      ].join("");
    })
    .join("");
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "<channel>",
    "<title>SaaS Signal</title>",
    `<link>${escapeXml(siteUrl)}</link>`,
    "<description>Software reports, comparison tables, and buyer calculators by Miles McQueen.</description>",
    `<lastBuildDate>${buildDate}</lastBuildDate>`,
    items,
    "</channel>",
    "</rss>"
  ].join("");

  return new Response(xml, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=86400",
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}
