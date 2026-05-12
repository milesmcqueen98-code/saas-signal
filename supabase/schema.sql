create table if not exists public.directory_pages (
  id text primary key,
  category_slug text not null,
  category_name text not null,
  use_case_slug text not null,
  use_case_name text not null,
  page_type text not null check (page_type in ('comparison', 'calculator', 'directory')),
  title text not null,
  description text not null,
  canonical_path text not null,
  og_title text not null,
  og_description text not null,
  summary text not null,
  option_labels jsonb not null,
  comparison_rows jsonb not null,
  calculator_config jsonb not null,
  faqs jsonb not null,
  created_at timestamptz not null default now(),
  unique (category_slug, use_case_slug)
);

alter table public.directory_pages enable row level security;

drop policy if exists "Public directory reads" on public.directory_pages;
create policy "Public directory reads"
  on public.directory_pages
  for select
  using (true);
