-- Run this script in Supabase SQL Editor.

create extension if not exists "pgcrypto";

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  technologies text[] default '{}',
  link text,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.technologies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  icon_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  position text not null,
  description text not null,
  start_date date,
  end_date date,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;
alter table public.technologies enable row level security;
alter table public.experiences enable row level security;

-- Public read access for portfolio rendering.
create policy if not exists "public can read projects"
  on public.projects for select
  using (true);

create policy if not exists "public can read technologies"
  on public.technologies for select
  using (true);

create policy if not exists "public can read experiences"
  on public.experiences for select
  using (true);

-- Authenticated users can manage content (replace with role/email checks for stricter admin-only rule).
create policy if not exists "authenticated can manage projects"
  on public.projects for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy if not exists "authenticated can manage technologies"
  on public.technologies for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy if not exists "authenticated can manage experiences"
  on public.experiences for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
