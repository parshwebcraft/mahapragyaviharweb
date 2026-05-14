create table if not exists public.admin_records (
  collection text not null,
  id text not null,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (collection, id)
);

create index if not exists admin_records_collection_updated_at_idx
  on public.admin_records (collection, updated_at desc);

alter table public.admin_records enable row level security;

drop policy if exists "admin_records_service_role_all" on public.admin_records;

create policy "admin_records_service_role_all"
  on public.admin_records
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
