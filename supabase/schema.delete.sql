-- DANGER: this script removes the portfolio schema objects and data.
-- Run in Supabase SQL Editor only when you want a full reset.

begin;

-- Remove storage policies and files for bucket.
drop policy if exists "public read portfolio bucket" on storage.objects;
drop policy if exists "authenticated insert portfolio bucket" on storage.objects;
drop policy if exists "authenticated update portfolio bucket" on storage.objects;
drop policy if exists "authenticated delete portfolio bucket" on storage.objects;

-- Supabase blocks direct DELETE on storage.objects/storage.buckets via SQL.
-- Remove bucket files using Storage API (or Dashboard) before deleting bucket.
-- Example (outside SQL): storage.from('portfolio').remove([...paths])
-- Then delete bucket via Dashboard or Storage API.

-- Remove table policies.
drop policy if exists "public can read projects" on public.projects;
drop policy if exists "public can read experiences" on public.experiences;
drop policy if exists "public can read technologies" on public.habilidades;
drop policy if exists "public can read habilidades" on public.habilidades;

drop policy if exists "authenticated can manage projects" on public.projects;
drop policy if exists "authenticated can manage experiences" on public.experiences;
drop policy if exists "authenticated can manage technologies" on public.habilidades;
drop policy if exists "authenticated can manage habilidades" on public.habilidades;

-- Remove triggers.
drop trigger if exists trg_projects_updated_at on public.projects;
drop trigger if exists trg_experiences_updated_at on public.experiences;
drop trigger if exists trg_technologies_updated_at on public.habilidades;
drop trigger if exists trg_habilidades_updated_at on public.habilidades;

-- Remove tables.
drop table if exists public.projects cascade;
drop table if exists public.experiences cascade;
drop table if exists public.technologies cascade;
drop table if exists public.habilidades cascade;

-- Remove helper function.
drop function if exists public.set_updated_at();

commit;
