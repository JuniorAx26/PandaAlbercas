-- PandaAlbercas (Triana's clean) — initial schema.
-- Una sola tabla: quotes. Política de seguridad alineada al patrón Fumix:
--   * anon/auth no pueden leer ni escribir (solo service_role inserta).
--   * admins (auth.jwt() app_metadata.role = 'admin') pueden leer y actualizar.
--
-- Cómo aplicar:
--   1. Crea un proyecto en supabase.com (o usa uno existente de Lovable Cloud).
--   2. SQL Editor → pega este archivo completo → Run.
--   3. La migración es idempotente — puedes correrla varias veces.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Enum de status
-- ---------------------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'quote_status') then
    create type quote_status as enum ('nuevo', 'contactado', 'agendado', 'cerrado', 'cancelado');
  end if;
end$$;

-- ---------------------------------------------------------------------------
-- Tabla quotes
-- ---------------------------------------------------------------------------
create table if not exists public.quotes (
  id          uuid primary key default gen_random_uuid(),
  nombre      text not null,
  ciudad      text not null check (ciudad in ('Tampico', 'Ciudad Madero', 'Altamira')),
  tipo        text not null default 'Residencial' check (tipo in ('Residencial', 'Comercial')),
  mensaje     text,
  status      quote_status not null default 'nuevo',
  source      text not null default 'web',
  ip_hash     text,
  user_agent  text,
  notes       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists quotes_status_idx     on public.quotes (status);
create index if not exists quotes_created_at_idx on public.quotes (created_at desc);
create index if not exists quotes_ciudad_idx     on public.quotes (ciudad);

-- ---------------------------------------------------------------------------
-- Updated-at trigger
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists quotes_updated_at on public.quotes;
create trigger quotes_updated_at before update on public.quotes
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row-level security
-- ---------------------------------------------------------------------------
alter table public.quotes enable row level security;

-- 1) Nadie anónimo o autenticado regular puede tocar la tabla.
--    Service_role bypassea siempre RLS, así que el insert desde server-action funciona.
drop policy if exists quotes_no_anon on public.quotes;
create policy quotes_no_anon on public.quotes
  for all
  using (false)
  with check (false);

-- 2) Admins (cuenta con app_metadata.role = 'admin') pueden leer.
drop policy if exists quotes_admin_read on public.quotes;
create policy quotes_admin_read on public.quotes
  for select
  to authenticated
  using (coalesce(((auth.jwt() -> 'app_metadata') ->> 'role'), '') = 'admin');

-- 3) Admins pueden actualizar status / notes.
drop policy if exists quotes_admin_update on public.quotes;
create policy quotes_admin_update on public.quotes
  for update
  to authenticated
  using (coalesce(((auth.jwt() -> 'app_metadata') ->> 'role'), '') = 'admin')
  with check (coalesce(((auth.jwt() -> 'app_metadata') ->> 'role'), '') = 'admin');

-- ---------------------------------------------------------------------------
-- Para promover una cuenta a admin (DESPUÉS de que se registre via Supabase Auth):
--
--   update auth.users
--      set raw_app_meta_data = jsonb_set(
--            coalesce(raw_app_meta_data, '{}'::jsonb),
--            '{role}',
--            '"admin"'::jsonb
--          )
--    where email = 'TU_CORREO@dominio.com';
--
-- Después de correr el update, cierra sesión y vuelve a entrar en /admin
-- para que el nuevo JWT incluya el claim.
-- ---------------------------------------------------------------------------
