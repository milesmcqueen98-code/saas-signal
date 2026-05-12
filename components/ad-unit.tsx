"use client";

import { AD_SLOT_CONFIG, renderAdSlot } from "../lib/ads";
import type { AdPosition } from "../types";

type AdUnitProps = { position: AdPosition };

export function AdUnit({ position }: AdUnitProps) {
  return renderAdSlot(AD_SLOT_CONFIG[position]);
}

export function HeaderBannerAd() {
  return <AdUnit position="header-banner" />;
}

export function SidebarStickyAd() {
  return <AdUnit position="sidebar-sticky" />;
}

export function InContentInlineAd() {
  return <AdUnit position="in-content-inline" />;
}

export function ExitIntentAd() {
  return <AdUnit position="exit-intent" />;
}
