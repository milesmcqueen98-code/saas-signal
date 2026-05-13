const productionSiteUrl = "https://saassignalreport.com";
const retiredHosts = new Set(["saas-signal.vercel.app"]);

function normalizeSiteUrl(value: string | undefined): string {
  const rawValue = value?.trim();
  if (!rawValue) {
    return productionSiteUrl;
  }

  const urlValue = /^https?:\/\//i.test(rawValue) ? rawValue : `https://${rawValue}`;

  try {
    const url = new URL(urlValue);
    if (retiredHosts.has(url.host)) {
      return productionSiteUrl;
    }
    return url.origin;
  } catch {
    return productionSiteUrl;
  }
}

export function getSiteUrl(): string {
  return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
}
