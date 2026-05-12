export type AdPosition = "header-banner" | "in-content-inline" | "sidebar-sticky" | "exit-intent";

export type AdPriority = "premium" | "standard";

export type SponsorCampaign = {
  kicker: string;
  title: string;
  deck: string;
  ctaLabel: string;
  href: string;
};

export type AdSlotConfig = {
  slotId: string;
  position: AdPosition;
  width: number;
  height: number;
  priority: AdPriority;
  campaign: SponsorCampaign;
};
