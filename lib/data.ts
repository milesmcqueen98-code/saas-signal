import { getSupabaseServerClient } from "./supabase";
import type { CalculatorConfig, CategoryIndex, ComparisonRow, DirectoryRow, PageType } from "../types";

type CategorySeed = {
  slug: string;
  name: string;
  pageTypes: readonly PageType[];
  products: readonly string[];
  verbs: readonly string[];
  fields: readonly string[];
};

type UseSeed = {
  slug: string;
  name: string;
  pain: string;
  metric: string;
};

const categories = [
  { slug: "ai-tools", name: "AI Tools", pageTypes: ["comparison", "calculator", "directory"], products: ["Jasper", "Clay", "Fireflies", "Writer", "Notion AI", "Mem", "Copy.ai", "Glean", "Otter", "Synthesia"], verbs: ["draft", "score", "summarize", "enrich", "route"], fields: ["prompt control", "source recall", "handoff depth", "review speed", "security posture"] },
  { slug: "crm", name: "CRM", pageTypes: ["directory", "comparison", "calculator"], products: ["HubSpot", "Pipedrive", "Close", "Salesforce", "Folk", "Attio", "Copper", "Zoho CRM", "Freshsales", "Nimble"], verbs: ["qualify", "assign", "forecast", "sync", "revive"], fields: ["pipeline fit", "contact depth", "sales cadence", "reporting load", "admin lift"] },
  { slug: "analytics", name: "Analytics", pageTypes: ["calculator", "directory", "comparison"], products: ["Mixpanel", "Amplitude", "PostHog", "Looker", "Mode", "Metabase", "Heap", "June", "ChartMogul", "ThoughtSpot"], verbs: ["segment", "trace", "model", "alert", "explain"], fields: ["event quality", "funnel clarity", "seat cost", "query speed", "retention view"] },
  { slug: "automation", name: "Automation", pageTypes: ["comparison", "directory", "calculator"], products: ["Zapier", "Make", "n8n", "Workato", "Relay", "Tray.io", "Bardeen", "Pipedream", "Parabola", "Power Automate"], verbs: ["trigger", "clean", "approve", "notify", "archive"], fields: ["workflow depth", "error handling", "connector range", "run volume", "audit trail"] },
  { slug: "customer-support", name: "Customer Support", pageTypes: ["directory", "calculator", "comparison"], products: ["Intercom", "Zendesk", "Help Scout", "Freshdesk", "Gorgias", "Front", "Kustomer", "Tidio", "Crisp", "Ada"], verbs: ["triage", "deflect", "merge", "escalate", "measure"], fields: ["queue control", "bot accuracy", "agent load", "handoff path", "CSAT signal"] }
] as const satisfies readonly CategorySeed[];

const useSeeds = [
  { slug: "for-real-estate-agents", name: "For Real Estate Agents", pain: "lead notes, listing tasks, and follow-up calls", metric: "reply lift" },
  { slug: "for-solo-founders", name: "For Solo Founders", pain: "support replies, sales notes, and launch chores", metric: "founder hours returned" },
  { slug: "for-ecommerce-teams", name: "For Ecommerce Teams", pain: "merchandising checks, returns, and promo timing", metric: "margin protection" },
  { slug: "for-healthcare-clinics", name: "For Healthcare Clinics", pain: "intake gaps, appointment changes, and payer requests", metric: "front desk relief" },
  { slug: "for-law-firms", name: "For Law Firms", pain: "matter intake, research notes, and client status updates", metric: "billable time saved" },
  { slug: "for-marketing-agencies", name: "For Marketing Agencies", pain: "briefs, approvals, and campaign reporting", metric: "retainer capacity" },
  { slug: "for-nonprofits", name: "For Nonprofits", pain: "donor follow-up, grant dates, and volunteer notes", metric: "program hours protected" },
  { slug: "for-saas-startups", name: "For SaaS Startups", pain: "trial behavior, support demand, and sales handoffs", metric: "activation lift" },
  { slug: "for-finance-teams", name: "For Finance Teams", pain: "close tasks, vendor checks, and budget variance notes", metric: "close cycle speed" },
  { slug: "for-hr-leaders", name: "For HR Leaders", pain: "recruiting intake, policy questions, and manager nudges", metric: "people ops time saved" },
  { slug: "for-product-managers", name: "For Product Managers", pain: "feedback tags, roadmap evidence, and release notes", metric: "decision cycle speed" },
  { slug: "for-field-service-crews", name: "For Field Service Crews", pain: "job notes, dispatch changes, and parts tracking", metric: "truck roll reduction" },
  { slug: "for-education-programs", name: "For Education Programs", pain: "student questions, cohort tracking, and advising records", metric: "advisor capacity" },
  { slug: "for-manufacturing-teams", name: "For Manufacturing Teams", pain: "shift logs, quality checks, and supplier updates", metric: "downtime avoided" },
  { slug: "for-consultants", name: "For Consultants", pain: "discovery notes, scope drift, and client deliverables", metric: "margin kept" },
  { slug: "for-cybersecurity-teams", name: "For Cybersecurity Teams", pain: "alerts, evidence trails, and incident updates", metric: "response speed" },
  { slug: "for-recruiting-agencies", name: "For Recruiting Agencies", pain: "candidate outreach, interview loops, and client feedback", metric: "submittal quality" },
  { slug: "for-hotel-operators", name: "For Hotel Operators", pain: "guest messages, staffing changes, and review follow-up", metric: "guest recovery" },
  { slug: "for-construction-firms", name: "For Construction Firms", pain: "change orders, site notes, and subcontractor updates", metric: "schedule risk cut" },
  { slug: "for-local-retailers", name: "For Local Retailers", pain: "stock checks, loyalty outreach, and staff scheduling", metric: "repeat visit lift" }
] as const satisfies readonly UseSeed[];

const categoryDescriptions: Record<string, string> = {
  "ai-tools": "Sharper picks for teams that need AI to save time without creating cleanup work.",
  crm: "CRM reports for teams that want cleaner pipelines, fewer handoffs, and better follow-up.",
  analytics: "Analytics coverage for teams that need fast answers, not another dashboard graveyard.",
  automation: "Workflow reports for operators who want fewer manual steps and fewer broken handoffs.",
  "customer-support": "Support software coverage for teams that want faster replies and calmer queues."
};

function pick(seed: readonly string[], index: number): string {
  return seed[index % seed.length] ?? seed[0] ?? "Tool";
}

function audienceFor(useSeed: UseSeed): string {
  return useSeed.name.replace(/^CRM For /, "").replace(/^For /, "");
}

function titleFor(category: CategorySeed, useSeed: UseSeed, index: number): string {
  const angle = ["Shortlist", "ROI Guide", "Stack Review", "Buying Map", "Field Test"][index % 5] ?? "Guide";
  return `${category.name} ${useSeed.name}: ${angle} for 2026`;
}

function descriptionFor(category: CategorySeed, useSeed: UseSeed, index: number): string {
  const productA = pick(category.products, index);
  const productB = pick(category.products, index + 3);
  const saved = 7 + (index % 9) * 2;
  const audience = audienceFor(useSeed).toLowerCase();
  return `${audience} get a clear read on ${productA}, ${productB}, setup effort, cost fit, and a ${saved}-hour monthly payback case.`;
}

function summaryFor(category: CategorySeed, useSeed: UseSeed, index: number): string {
  const productA = pick(category.products, index);
  const productB = pick(category.products, index + 2);
  const productC = pick(category.products, index + 5);
  const saved = 8 + ((index * 3) % 17);
  const lift = 11 + ((index * 5) % 19);
  const budget = 260 + ((index * 73) % 940);
  return `The work is clear: ${useSeed.pain}. For ${audienceFor(useSeed)}, ${productA}, ${productB}, and ${productC} make the first cut. The test is ${useSeed.metric}. Expect about ${saved} hours back, a ${lift} percent operating lift, and a monthly budget near $${budget} before add-ons.`;
}

function comparisonRowsFor(category: CategorySeed, useSeed: UseSeed, index: number): readonly [ComparisonRow, ComparisonRow, ComparisonRow] {
  const productA = pick(category.products, index);
  const productB = pick(category.products, index + 2);
  const productC = pick(category.products, index + 5);
  const fieldA = pick(category.fields, index);
  const fieldB = pick(category.fields, index + 1);
  const fieldC = pick(category.fields, index + 2);
  return [
    { dimension: fieldA, optionA: `${productA} fits teams needing ${pick(category.verbs, index)} support with ${12 + (index % 8)} tracked steps.`, optionB: `${productB} works best when ${useSeed.metric} is reviewed weekly across ${3 + (index % 4)} roles.`, optionC: `${productC} is strongest for lean rollout with a ${5 + (index % 6)} day setup window.` },
    { dimension: fieldB, optionA: `${productA} keeps admin effort near ${2 + (index % 5)} hours each month after launch.`, optionB: `${productB} trades setup depth for cleaner handoffs on ${7 + (index % 9)} recurring tasks.`, optionC: `${productC} suits teams that prize reporting clarity over advanced customization.` },
    { dimension: fieldC, optionA: `${productA} has the best fit below $${240 + index * 11} in monthly spend.`, optionB: `${productB} earns its cost when volume passes ${90 + index * 7} records or tickets.`, optionC: `${productC} is the safer pick for teams testing adoption before a wider rollout.` }
  ];
}

function calculatorConfigFor(pageType: PageType, index: number): CalculatorConfig {
  if (pageType === "comparison") {
    return { inputs: [{ key: "monthlyRevenue", label: "Monthly influenced revenue", min: 1000, max: 250000, step: 1000, defaultValue: 18000 + index * 410, unit: "$" }, { key: "monthlyCost", label: "Current monthly software cost", min: 0, max: 20000, step: 100, defaultValue: 420 + index * 9, unit: "$" }], formula: { type: "roi", revenueInput: "monthlyRevenue", costInput: "monthlyCost", efficiencyMultiplier: 0.08 + (index % 6) * 0.012, monthlyToolCost: 140 + (index % 9) * 35 }, outputLabel: "Estimated ROI" };
  }
  if (pageType === "calculator") {
    return { inputs: [{ key: "hoursSaved", label: "Monthly hours saved", min: 1, max: 300, step: 1, defaultValue: 24 + (index % 13), unit: "hrs" }, { key: "hourlyRate", label: "Loaded hourly rate", min: 20, max: 250, step: 5, defaultValue: 55 + (index % 11) * 5, unit: "$" }], formula: { type: "cost-savings", hoursInput: "hoursSaved", rateInput: "hourlyRate", automationRate: 0.45 + (index % 7) * 0.05, monthlyToolCost: 90 + (index % 10) * 28 }, outputLabel: "Monthly savings" };
  }
  return { inputs: [{ key: "setupCost", label: "One-time setup cost", min: 0, max: 50000, step: 500, defaultValue: 2200 + index * 37, unit: "$" }, { key: "monthlySavings", label: "Expected monthly savings", min: 100, max: 50000, step: 100, defaultValue: 950 + index * 23, unit: "$" }], formula: { type: "payback-period", setupCostInput: "setupCost", monthlySavingsInput: "monthlySavings", monthlyToolCost: 110 + (index % 8) * 25 }, outputLabel: "Payback period" };
}

function faqsFor(category: CategorySeed, useSeed: UseSeed, index: number): readonly [string, string, string] {
  const productA = pick(category.products, index);
  const productB = pick(category.products, index + 2);
  const productC = pick(category.products, index + 5);
  return [`${productA} is the strongest first trial when ${useSeed.metric} is the main goal.`, `${productB} is worth piloting when the team needs deeper ${pick(category.fields, index + 1)} checks.`, `${productC} fits a smaller rollout because setup can stay within ${5 + (index % 6)} working days.`];
}

function buildRows(): DirectoryRow[] {
  return categories.flatMap((category, categoryIndex) =>
    useSeeds.map((baseUse, useIndex) => {
      const index = categoryIndex * useSeeds.length + useIndex;
      const pageType = category.pageTypes[index % category.pageTypes.length] ?? "directory";
      const useCaseSlug = category.slug === "ai-tools" && useIndex === 0 ? "crm-for-real-estate-agents" : baseUse.slug;
      const useCaseName = category.slug === "ai-tools" && useIndex === 0 ? "CRM For Real Estate Agents" : baseUse.name;
      const rowUse: UseSeed = { ...baseUse, slug: useCaseSlug, name: useCaseName };
      const canonicalPath = category.slug === "ai-tools" && useIndex === 0 ? "/ai-tools/crm/for-real-estate-agents" : `/${category.slug}/${useCaseSlug}`;
      return { id: `${category.slug}-${useCaseSlug}`, categorySlug: category.slug, categoryName: category.name, useCaseSlug, useCaseName, pageType, title: titleFor(category, rowUse, index), description: descriptionFor(category, rowUse, index), canonicalPath, ogTitle: `${category.name} Guide ${useCaseName}`, ogDescription: `Compare practical ${category.name.toLowerCase()} choices for ${useCaseName.toLowerCase()} with benchmarks, tradeoffs, and a live calculator.`, summary: summaryFor(category, rowUse, index), optionLabels: [pick(category.products, index), pick(category.products, index + 2), pick(category.products, index + 5)], comparisonRows: comparisonRowsFor(category, rowUse, index), calculatorConfig: calculatorConfigFor(pageType, index), faqs: faqsFor(category, rowUse, index) };
    })
  );
}

export const directoryRows = buildRows();

type DatabaseRow = {
  id: string;
  category_slug: string;
  category_name: string;
  use_case_slug: string;
  use_case_name: string;
  page_type: PageType;
  title: string;
  description: string;
  canonical_path: string;
  og_title: string;
  og_description: string;
  summary: string;
  option_labels: readonly [string, string, string];
  comparison_rows: readonly [ComparisonRow, ComparisonRow, ComparisonRow];
  calculator_config: CalculatorConfig;
  faqs: readonly [string, string, string];
};

function fromDb(row: DatabaseRow): DirectoryRow {
  return { id: row.id, categorySlug: row.category_slug, categoryName: row.category_name, useCaseSlug: row.use_case_slug, useCaseName: row.use_case_name, pageType: row.page_type, title: row.title, description: row.description, canonicalPath: row.canonical_path, ogTitle: row.og_title, ogDescription: row.og_description, summary: row.summary, optionLabels: row.option_labels, comparisonRows: row.comparison_rows, calculatorConfig: row.calculator_config, faqs: row.faqs };
}

export function getStaticRows(): DirectoryRow[] {
  return directoryRows;
}

export async function getRows(): Promise<DirectoryRow[]> {
  if (process.env.NEXT_PHASE === "phase-production-build") {
    return directoryRows;
  }
  if (process.env.NEXT_PUBLIC_DATA_SOURCE !== "supabase") {
    return directoryRows;
  }
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return directoryRows;
  }
  const result = await Promise.race([
    supabase.from("directory_pages").select("*").order("category_slug").order("use_case_slug"),
    new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), 2500);
    })
  ]);
  if (!result) {
    return directoryRows;
  }
  const { data, error } = result;
  if (error || !data) {
    return directoryRows;
  }
  return data.map(fromDb);
}

export async function getRow(categorySlug: string, useCaseSlug: string): Promise<DirectoryRow | null> {
  const rows = await getRows();
  return rows.find((row) => row.categorySlug === categorySlug && row.useCaseSlug === useCaseSlug) ?? null;
}

export async function getCategoryRows(categorySlug: string): Promise<DirectoryRow[]> {
  const rows = await getRows();
  return rows.filter((row) => row.categorySlug === categorySlug);
}

export function getCategories(rows: DirectoryRow[] = directoryRows): CategoryIndex[] {
  return categories.map((category) => ({ slug: category.slug, name: category.name, count: rows.filter((row) => row.categorySlug === category.slug).length, description: categoryDescriptions[category.slug] ?? `${category.name} software guides for focused buying decisions.` }));
}
