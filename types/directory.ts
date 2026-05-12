import type { CalculatorConfig } from "./calculator";

export type PageType = "comparison" | "calculator" | "directory";

export type ComparisonRow = {
  dimension: string;
  optionA: string;
  optionB: string;
  optionC: string;
};

export type DirectoryRow = {
  id: string;
  categorySlug: string;
  categoryName: string;
  useCaseSlug: string;
  useCaseName: string;
  pageType: PageType;
  title: string;
  description: string;
  canonicalPath: string;
  ogTitle: string;
  ogDescription: string;
  summary: string;
  optionLabels: readonly [string, string, string];
  comparisonRows: readonly [ComparisonRow, ComparisonRow, ComparisonRow];
  calculatorConfig: CalculatorConfig;
  faqs: readonly [string, string, string];
};

export type CategoryIndex = {
  slug: string;
  name: string;
  count: number;
  description: string;
};
