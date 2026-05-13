const productionSiteUrl = "https://saassignalreport.com";
const retiredSiteUrl = "https://saas-signal.vercel.app";

export function getSiteUrl(): string {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!configuredSiteUrl || configuredSiteUrl === retiredSiteUrl) {
    return productionSiteUrl;
  }
  return configuredSiteUrl.replace(/\/$/, "");
}
