import { buildSchema } from "../lib/schema";
import type { DirectoryRow } from "../types";

type SchemaProps = { row: DirectoryRow; siteUrl: string };

export function Schema({ row, siteUrl }: SchemaProps) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(row, siteUrl)) }} />;
}
