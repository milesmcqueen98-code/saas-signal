import { createElement, type ReactElement } from "react";
import type { AdPosition, AdSlotConfig, SponsorCampaign } from "../types/ads";

export const AD_SLOT_DIMENSIONS: Record<AdPosition, { width: number; height: number }> = {
  "header-banner": { width: 970, height: 250 },
  "in-content-inline": { width: 728, height: 180 },
  "sidebar-sticky": { width: 300, height: 600 },
  "exit-intent": { width: 640, height: 360 }
};

const fallbackCampaigns: Record<AdPosition, SponsorCampaign> = {
  "header-banner": {
    kicker: "Sponsored briefing",
    title: "Reach software buyers while they compare tools",
    deck: "Direct-sold inventory is open for SaaS vendors with useful demos, trials, and buyer education.",
    ctaLabel: "Reserve this placement",
    href: "/advertise"
  },
  "in-content-inline": {
    kicker: "Partner note",
    title: "Put a relevant offer inside the research flow",
    deck: "This slot is built for product-led SaaS offers, trials, benchmarks, and high-intent landing pages.",
    ctaLabel: "Sponsor a category",
    href: "/advertise"
  },
  "sidebar-sticky": {
    kicker: "Available sponsor",
    title: "Own the comparison sidebar for a priority software category",
    deck: "Premium sidebar inventory stays visible on desktop while buyers review tables, payback models, and shortlists.",
    ctaLabel: "View sponsor terms",
    href: "/advertise"
  },
  "exit-intent": {
    kicker: "Closing offer",
    title: "Capture buyers before they leave the report",
    deck: "Use this placement for demos, calculators, analyst calls, or founder-led product education.",
    ctaLabel: "Book the slot",
    href: "/advertise"
  }
};

function campaignFor(position: AdPosition): SponsorCampaign {
  const campaign = fallbackCampaigns[position];
  const title = process.env[`NEXT_PUBLIC_SPONSOR_${position.toUpperCase().replaceAll("-", "_")}_TITLE`];
  const href = process.env[`NEXT_PUBLIC_SPONSOR_${position.toUpperCase().replaceAll("-", "_")}_URL`];
  if (!campaign) {
    return fallbackCampaigns["in-content-inline"];
  }
  return {
    ...campaign,
    title: title && title.length > 0 ? title : campaign.title,
    href: href && href.length > 0 ? href : campaign.href
  };
}

export const AD_SLOT_CONFIG: Record<AdPosition, AdSlotConfig> = {
  "header-banner": {
    slotId: "ad-header-banner-premium",
    position: "header-banner",
    width: AD_SLOT_DIMENSIONS["header-banner"].width,
    height: AD_SLOT_DIMENSIONS["header-banner"].height,
    priority: "premium",
    campaign: campaignFor("header-banner")
  },
  "in-content-inline": {
    slotId: "ad-in-content-inline-standard",
    position: "in-content-inline",
    width: AD_SLOT_DIMENSIONS["in-content-inline"].width,
    height: AD_SLOT_DIMENSIONS["in-content-inline"].height,
    priority: "standard",
    campaign: campaignFor("in-content-inline")
  },
  "sidebar-sticky": {
    slotId: "ad-sidebar-sticky-premium",
    position: "sidebar-sticky",
    width: AD_SLOT_DIMENSIONS["sidebar-sticky"].width,
    height: AD_SLOT_DIMENSIONS["sidebar-sticky"].height,
    priority: "premium",
    campaign: campaignFor("sidebar-sticky")
  },
  "exit-intent": {
    slotId: "ad-exit-intent-standard",
    position: "exit-intent",
    width: AD_SLOT_DIMENSIONS["exit-intent"].width,
    height: AD_SLOT_DIMENSIONS["exit-intent"].height,
    priority: "standard",
    campaign: campaignFor("exit-intent")
  }
};

export function renderAdSlot(config: AdSlotConfig): ReactElement {
  return createElement(
    "a",
    {
      className:
        "flex w-full flex-col justify-between rounded-[1.5rem] border border-slate-200 bg-white p-6 text-left text-sm text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-500 hover:shadow-xl hover:shadow-slate-950/10",
      href: config.campaign.href,
      style: { minHeight: config.height },
      "data-slot-id": config.slotId,
      "data-priority": config.priority
    },
    createElement(
      "span",
      { className: "text-xs font-semibold uppercase tracking-[0.24em] text-teal-700" },
      config.campaign.kicker
    ),
    createElement("strong", { className: "mt-4 block text-2xl font-semibold leading-8 tracking-normal text-slate-950" }, config.campaign.title),
    createElement("span", { className: "mt-4 block leading-7 text-slate-600" }, config.campaign.deck),
    createElement(
      "span",
      { className: "mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-500" },
      createElement("span", null, `${config.slotId} - ${config.width}x${config.height}`),
      createElement("span", { className: "font-semibold text-teal-700" }, config.campaign.ctaLabel)
    )
  );
}
