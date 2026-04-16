-- Run this script in Supabase SQL Editor.

create extension if not exists "pgcrypto";

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary_line text,
  period text,
  technologies text[] not null default '{}',
  description text not null,
  image_url text,
  production_link text,
  repository_link text,
  details_goal text,
  details_highlights text[] not null default '{}',
  details_impact text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  location text,
  period text,
  role text,
  summary text not null,
  achievements text[] not null default '{}',
  skills_learned text[] not null default '{}',
  image_urls text[] not null default '{}',
  intro_title text,
  intro text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

do $$
begin
  if to_regclass('public.technologies') is not null
     and to_regclass('public.habilidades') is null then
    alter table public.technologies rename to habilidades;
  end if;
end $$;

create table if not exists public.habilidades (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  label text not null,
  type text not null default 'default',
  link text,
  icon_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_projects_updated_at on public.projects;
create trigger trg_projects_updated_at
before update on public.projects
for each row
execute function public.set_updated_at();

drop trigger if exists trg_experiences_updated_at on public.experiences;
create trigger trg_experiences_updated_at
before update on public.experiences
for each row
execute function public.set_updated_at();

drop trigger if exists trg_habilidades_updated_at on public.habilidades;
drop trigger if exists trg_technologies_updated_at on public.habilidades;
create trigger trg_habilidades_updated_at
before update on public.habilidades
for each row
execute function public.set_updated_at();

alter table public.projects enable row level security;
alter table public.experiences enable row level security;
alter table public.habilidades enable row level security;

-- Public read access for portfolio rendering.
drop policy if exists "public can read projects" on public.projects;
create policy "public can read projects"
  on public.projects for select
  using (true);

drop policy if exists "public can read experiences" on public.experiences;
create policy "public can read experiences"
  on public.experiences for select
  using (true);

drop policy if exists "public can read habilidades" on public.habilidades;
drop policy if exists "public can read technologies" on public.habilidades;
create policy "public can read habilidades"
  on public.habilidades for select
  using (true);

-- JWT-authenticated users can manage content.
drop policy if exists "authenticated can manage projects" on public.projects;
create policy "authenticated can manage projects"
  on public.projects for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "authenticated can manage experiences" on public.experiences;
create policy "authenticated can manage experiences"
  on public.experiences for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "authenticated can manage habilidades" on public.habilidades;
drop policy if exists "authenticated can manage technologies" on public.habilidades;
create policy "authenticated can manage habilidades"
  on public.habilidades for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Storage bucket for images.
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

-- Public can read files.
drop policy if exists "public read portfolio bucket" on storage.objects;
create policy "public read portfolio bucket"
  on storage.objects for select
  using (bucket_id = 'portfolio');

-- Authenticated users can upload and manage files.
drop policy if exists "authenticated insert portfolio bucket" on storage.objects;
create policy "authenticated insert portfolio bucket"
  on storage.objects for insert
  with check (bucket_id = 'portfolio' and auth.role() = 'authenticated');

drop policy if exists "authenticated update portfolio bucket" on storage.objects;
create policy "authenticated update portfolio bucket"
  on storage.objects for update
  using (bucket_id = 'portfolio' and auth.role() = 'authenticated')
  with check (bucket_id = 'portfolio' and auth.role() = 'authenticated');

drop policy if exists "authenticated delete portfolio bucket" on storage.objects;
create policy "authenticated delete portfolio bucket"
  on storage.objects for delete
  using (bucket_id = 'portfolio' and auth.role() = 'authenticated');
