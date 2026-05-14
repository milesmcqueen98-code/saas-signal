import assert from "node:assert/strict";
import test from "node:test";
import { authorProfile } from "../lib/author";

void test("author profile carries specific trust signals", () => {
  assert.equal(authorProfile.name, "Miles McQueen");
  assert.equal(authorProfile.role, "Publisher, SaaS Signal");
  assert.equal(authorProfile.contactPath, "/contact");
  assert.equal(authorProfile.trustSignals.length, 3);
  assert.ok(authorProfile.trustSignals.some((signal) => signal.label === "Correction path"));
});

void test("author trust copy avoids hype language", () => {
  const bannedWords = ["delve", "supercharge", "seamless", "unlock", "revolutionary", "synergy"];
  const copy = [
    authorProfile.shortBio,
    authorProfile.statement,
    ...authorProfile.trustSignals.flatMap((signal) => [signal.label, signal.value, signal.detail]),
    ...authorProfile.reviewPrinciples
  ]
    .join(" ")
    .toLowerCase();

  for (const word of bannedWords) {
    assert.equal(copy.includes(word), false);
  }
});
