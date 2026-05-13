import assert from "node:assert/strict";
import test from "node:test";
import { getSiteUrl } from "../lib/site";

const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

function withSiteUrl(value: string | undefined, assertion: () => void): void {
  if (value === undefined) {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  } else {
    process.env.NEXT_PUBLIC_SITE_URL = value;
  }

  try {
    assertion();
  } finally {
    if (originalSiteUrl === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
    }
  }
}

void test("uses production domain when site URL is missing", () => {
  withSiteUrl(undefined, () => {
    assert.equal(getSiteUrl(), "https://saassignalreport.com");
  });
});

void test("normalizes bare domains and strips whitespace", () => {
  withSiteUrl("saassignalreport.com\n", () => {
    assert.equal(getSiteUrl(), "https://saassignalreport.com");
  });
});

void test("retires the old Vercel host", () => {
  withSiteUrl("https://saas-signal.vercel.app", () => {
    assert.equal(getSiteUrl(), "https://saassignalreport.com");
  });
});

void test("preserves a valid custom origin without path", () => {
  withSiteUrl("https://example.com/some-path", () => {
    assert.equal(getSiteUrl(), "https://example.com");
  });
});
