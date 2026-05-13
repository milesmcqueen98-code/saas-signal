import assert from "node:assert/strict";
import test from "node:test";
import { getCategories, getStaticRows } from "../lib/data";
import { getPriorityUrls, getRelatedRows } from "../lib/traffic";

void test("related rows prefer same-category reports and never include the current row", () => {
  const rows = getStaticRows();
  const currentRow = rows.find((row) => row.categorySlug === "analytics" && row.useCaseSlug === "for-saas-startups");

  assert.ok(currentRow);

  const relatedRows = getRelatedRows(rows, currentRow, 4);

  assert.equal(relatedRows.length, 4);
  assert.equal(relatedRows.some((row) => row.id === currentRow.id), false);
  assert.equal(relatedRows[0]?.categorySlug, currentRow.categorySlug);
});

void test("priority URLs include core pages and all generated report paths", () => {
  const rows = getStaticRows();
  const urls = getPriorityUrls("https://saassignalreport.com/", getCategories(rows), rows);

  assert.ok(urls.includes("https://saassignalreport.com"));
  assert.ok(urls.includes("https://saassignalreport.com/advertise"));
  assert.ok(urls.includes("https://saassignalreport.com/analytics"));
  assert.ok(urls.includes("https://saassignalreport.com/analytics/for-saas-startups"));
  assert.equal(urls.length, rows.length + getCategories(rows).length + 3);
});
