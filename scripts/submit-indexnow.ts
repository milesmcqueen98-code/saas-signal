import { getCategories, getStaticRows } from "../lib/data";
import { getPriorityUrls } from "../lib/traffic";

const fallbackSiteUrl = "https://saas-signal.vercel.app";
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl).replace(/\/$/, "");
const key = process.env.INDEXNOW_KEY ?? "saas-signal-2026-indexnow-key";
const keyLocation = `${siteUrl}/${key}.txt`;
const host = new URL(siteUrl).host;
const rows = getStaticRows();
const categories = getCategories(rows);
const urlList = getPriorityUrls(siteUrl, categories, rows);

async function main(): Promise<void> {
  const response = await fetch("https://www.bing.com/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key, keyLocation, urlList })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`IndexNow submission failed with ${response.status}: ${body}`);
  }

  console.log(`Submitted ${urlList.length} URLs to IndexNow for ${host}.`);
}

void main();
