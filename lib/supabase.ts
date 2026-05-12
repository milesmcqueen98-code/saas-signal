import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { CalculatorConfig, ComparisonRow, PageType } from "../types";

type DirectoryPageRecord = {
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
  created_at: string;
};

type Database = {
  public: {
    Tables: {
      directory_pages: {
        Row: DirectoryPageRecord;
        Insert: Omit<DirectoryPageRecord, "created_at">;
        Update: Partial<Omit<DirectoryPageRecord, "created_at">>;
      };
    };
  };
};

export function getSupabaseServerClient(): SupabaseClient<Database> | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url.includes("your-project")) {
    return null;
  }
  return createClient<Database>(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
