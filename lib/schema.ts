import type { DirectoryRow, PageType } from "../types";

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

type SchemaBuilder = (row: DirectoryRow, siteUrl: string) => JsonValue;

function breadcrumbs(row: DirectoryRow, siteUrl: string): JsonValue {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: row.categoryName, item: `${siteUrl}/${row.categorySlug}` },
      { "@type": "ListItem", position: 3, name: row.useCaseName, item: `${siteUrl}${row.canonicalPath}` }
    ]
  };
}

export const schemaBuilders: Record<PageType, SchemaBuilder> = {
  comparison: (row, siteUrl) => ({
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbs(row, siteUrl),
      {
        "@type": "SoftwareApplication",
        name: row.title,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: row.description,
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          lowPrice: "49",
          highPrice: "799"
        }
      }
    ]
  }),
  calculator: (row, siteUrl) => ({
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbs(row, siteUrl),
      {
        "@type": "FAQPage",
        mainEntity: row.faqs.map((answer, index) => ({
          "@type": "Question",
          name: `What should ${row.useCaseName.toLowerCase()} know before choosing option ${index + 1}?`,
          acceptedAnswer: { "@type": "Answer", text: answer }
        }))
      }
    ]
  }),
  directory: (row, siteUrl) => ({
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbs(row, siteUrl),
      {
        "@type": "ItemList",
        name: row.title,
        itemListElement: row.optionLabels.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name
        }))
      }
    ]
  })
};

export function buildSchema(row: DirectoryRow, siteUrl: string): JsonValue {
  return schemaBuilders[row.pageType](row, siteUrl);
}
