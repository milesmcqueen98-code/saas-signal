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
  "ai-tools": "AI tools are cheap to try and easy to regret. These reports call out what is worth testing.",
  crm: "CRM coverage for teams that need fewer lost deals, not another database for stale notes.",
  analytics: "Analytics reports for teams that need cleaner decisions, not a dashboard nobody opens.",
  automation: "Workflow coverage for operators who want fewer manual steps and fewer mystery failures.",
  "customer-support": "Support software coverage for teams that want faster replies without burning out agents."
};

const categoryWarnings: Record<string, string> = {
  "ai-tools": "Do not buy the tool that writes the flashiest paragraph. Buy the one your team can review without babysitting it.",
  crm: "Do not let a CRM demo turn into theater. The right pick is the one reps will update after a bad Tuesday.",
  analytics: "Do not buy analytics until the team agrees on the events. A prettier chart will not save dirty tracking.",
  automation: "Do not automate a messy process. You will only make the mess run faster and break quietly.",
  "customer-support": "Do not buy the support suite with the longest feature list. Buy the one that keeps the queue calm."
};

function pick(seed: readonly string[], index: number): string {
  return seed[index % seed.length] ?? seed[0] ?? "Tool";
}

function audienceFor(useSeed: UseSeed): string {
  return useSeed.name.replace(/^CRM For /, "").replace(/^For /, "");
}

function sentenceAudienceFor(useSeed: UseSeed): string {
  return audienceFor(useSeed)
    .toLowerCase()
    .replaceAll("saas", "SaaS")
    .replaceAll("crm", "CRM")
    .replaceAll("hr", "HR");
}

function titleFor(category: CategorySeed, useSeed: UseSeed, index: number): string {
  const angle = ["What I Would Buy", "The Honest Shortlist", "The No-Nonsense Pick", "What To Skip First", "The Field Call"][index % 5] ?? "The Honest Pick";
  return `${category.name} ${useSeed.name}: ${angle}`;
}

function descriptionFor(category: CategorySeed, useSeed: UseSeed, index: number): string {
  const productA = pick(category.products, index);
  const productB = pick(category.products, index + 3);
  const audience = audienceFor(useSeed);
  const warning = categoryWarnings[category.slug] ?? "Do not buy the loudest demo. Buy the tool that survives the first boring week.";
  return `${audience}: compare ${productA} and ${productB}, see what I would try first, and avoid the common bad buy. ${warning}`;
}

function summaryFor(category: CategorySeed, useSeed: UseSeed, index: number): string {
  const productA = pick(category.products, index);
  const productB = pick(category.products, index + 2);
  const productC = pick(category.products, index + 5);
  const saved = 8 + ((index * 3) % 17);
  const budget = 260 + ((index * 73) % 940);
  return `If you are buying for ${sentenceAudienceFor(useSeed)}, do not buy ${category.name.toLowerCase()} because the demo looked smooth. Buy it because it fixes ${useSeed.pain}. I would start with ${productA}, keep ${productB} honest, and test ${productC} cheaply. The real score is ${useSeed.metric}: about ${saved} hours back under a $${budget} monthly ceiling.`;
}

function comparisonRowsFor(category: CategorySeed, useSeed: UseSeed, index: number): readonly [ComparisonRow, ComparisonRow, ComparisonRow] {
  const productA = pick(category.products, index);
  const productB = pick(category.products, index + 2);
  const productC = pick(category.products, index + 5);
  const fieldA = pick(category.fields, index);
  const fieldB = pick(category.fields, index + 1);
  const fieldC = pick(category.fields, index + 2);
  return [
    { dimension: fieldA, optionA: `${productA} is my first demo if one owner can ${pick(category.verbs, index)} the work and keep the setup under ${12 + (index % 8)} steps.`, optionB: `${productB} is the grown-up choice when ${useSeed.metric} gets reviewed every week, not once before renewal.`, optionC: `${productC} is the scrappy test: useful if the team needs proof inside ${5 + (index % 6)} working days.` },
    { dimension: fieldB, optionA: `${productA} wins if admin time stays near ${2 + (index % 5)} hours a month. Past that, the tool is owning you.`, optionB: `${productB} is worth the heavier setup only if it clears ${7 + (index % 9)} recurring handoffs that annoy the team today.`, optionC: `${productC} is better for people who want a clean read before they start asking for custom fields and committees.` },
    { dimension: fieldC, optionA: `${productA} is the budget line I would defend below $${240 + index * 11} a month. Above that, prove payback first.`, optionB: `${productB} earns the seat only after volume passes ${90 + index * 7} records or tickets. Small teams should wait.`, optionC: `${productC} is the safer pick when adoption is still the question and nobody wants a six-month rollout.` }
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
  return [`Try ${productA} first when ${useSeed.metric} is the number everyone already cares about.`, `Do not pilot ${productB} unless someone owns ${pick(category.fields, index + 1)} after launch.`, `Use ${productC} for a smaller test when setup needs to stay inside ${5 + (index % 6)} working days.`];
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
      return { id: `${category.slug}-${useCaseSlug}`, categorySlug: category.slug, categoryName: category.name, useCaseSlug, useCaseName, pageType, title: titleFor(category, rowUse, index), description: descriptionFor(category, rowUse, index), canonicalPath, ogTitle: `${category.name} Guide ${useCaseName}`, ogDescription: `A plainspoken ${category.name.toLowerCase()} read for ${sentenceAudienceFor(rowUse)} with the first tool to try, the one to question, and the buyer mistake to avoid.`, summary: summaryFor(category, rowUse, index), optionLabels: [pick(category.products, index), pick(category.products, index + 2), pick(category.products, index + 5)], comparisonRows: comparisonRowsFor(category, rowUse, index), calculatorConfig: calculatorConfigFor(pageType, index), faqs: faqsFor(category, rowUse, index) };
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
