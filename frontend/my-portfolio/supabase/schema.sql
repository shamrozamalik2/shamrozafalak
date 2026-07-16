-- Run this once in your Supabase project's SQL Editor (Dashboard -> SQL Editor -> New query).
-- Creates the reviews table backing the "Share Your Experience" form, with public read/insert
-- access (submissions publish immediately, per project decision — no moderation step) and
-- realtime enabled so new reviews appear live in other visitors' open tabs.

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  role text check (char_length(role) <= 120),
  quote text not null check (char_length(quote) between 1 and 500),
  rating smallint not null check (rating between 1 and 5),
  created_at timestamptz not null default now()
);

alter table reviews enable row level security;

create policy "Public read access"
  on reviews for select
  using (true);

create policy "Public insert access"
  on reviews for insert
  with check (true);

-- Enable realtime change notifications for this table.
alter publication supabase_realtime add table reviews;
