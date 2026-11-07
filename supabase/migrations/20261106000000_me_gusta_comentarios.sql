-- =============================================================================
-- Hive · Me gusta y comentarios en posts
-- Para correr en Supabase (SQL Editor) o como archivo en supabase/migrations.
-- Es aditiva: crea tablas nuevas y no modifica datos existentes.
-- Se puede volver a correr sin errores (idempotente).
-- =============================================================================

begin;

-- -----------------------------------------------------------------------------
-- 0. Proteger profiles.role
-- -----------------------------------------------------------------------------
-- El borrado de comentarios por admin confía en profiles.role = 'admin'.
-- Hoy un usuario logueado podría llamar a la API de Supabase directamente
-- (la anon key es pública) y hacer update de su propia fila con role = 'admin'.
-- Este trigger lo impide para las peticiones que llegan desde la API
-- (roles anon / authenticated). Desde el SQL Editor o con service_role se
-- sigue pudiendo asignar roles normalmente.

create or replace function public.protect_profile_role()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if current_user in ('anon', 'authenticated') then
    if tg_op = 'INSERT' then
      new.role := null;
    elsif new.role is distinct from old.role then
      raise exception 'No está permitido modificar el rol del perfil'
        using errcode = '42501';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists protect_profile_role on public.profiles;
create trigger protect_profile_role
  before insert or update on public.profiles
  for each row execute function public.protect_profile_role();

-- ¿El usuario de la petición es admin? (security definer: no depende de las
-- políticas de profiles)
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = 'admin'
  );
$$;

revoke execute on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated, service_role;

-- -----------------------------------------------------------------------------
-- 1. Me gusta
-- -----------------------------------------------------------------------------
-- Una fila por usuario y post. La restricción unique impide dar me gusta dos
-- veces. Si se borra el post o el perfil, se borran sus me gusta.
--
-- IMPORTANTE: la clave primaria es un id propio y NO (post_id, user_id).
-- Con una PK compuesta, la API de Supabase (PostgREST) toma esta tabla como
-- tabla intermedia posts <-> profiles y las consultas que ya existen,
-- posts?select=*,profiles(...), fallan con PGRST201 ("more than one
-- relationship"): el feed queda vacío.

create table if not exists public.post_likes (
  id         uuid primary key default gen_random_uuid(),
  post_id    uuid not null references public.posts (id) on delete cascade,
  user_id    uuid not null default auth.uid()
             references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint post_likes_post_id_user_id_key unique (post_id, user_id)
);

-- Si ya se había corrido la primera versión de esta migración (PK compuesta),
-- se corrige acá sin perder los me gusta.
do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'post_likes' and column_name = 'id'
  ) then
    alter table public.post_likes add column id uuid not null default gen_random_uuid();
    alter table public.post_likes drop constraint post_likes_pkey;
    alter table public.post_likes add primary key (id);
    alter table public.post_likes
      add constraint post_likes_post_id_user_id_key unique (post_id, user_id);
  end if;
end $$;

create index if not exists post_likes_user_id_idx on public.post_likes (user_id);

-- -----------------------------------------------------------------------------
-- 2. Comentarios
-- -----------------------------------------------------------------------------
-- Comentarios simples (sin respuestas ni edición en esta versión).

create table if not exists public.post_comments (
  id         uuid primary key default gen_random_uuid(),
  post_id    uuid not null references public.posts (id) on delete cascade,
  user_id    uuid not null default auth.uid()
             references public.profiles (id) on delete cascade,
  body       text not null
             constraint post_comments_body_length
             check (char_length(btrim(body)) between 1 and 1000),
  created_at timestamptz not null default now()
);

create index if not exists post_comments_post_id_created_at_idx
  on public.post_comments (post_id, created_at);
create index if not exists post_comments_user_id_idx
  on public.post_comments (user_id);

-- -----------------------------------------------------------------------------
-- 3. Permisos de tabla
-- -----------------------------------------------------------------------------
-- Supabase da todos los permisos por defecto a anon/authenticated sobre tablas
-- nuevas; acá se dejan solo los necesarios. Nadie puede editar comentarios ni
-- inventar id / created_at.

revoke all on public.post_likes, public.post_comments from anon, authenticated;

grant select on public.post_likes, public.post_comments to anon, authenticated;
grant insert (post_id, user_id)       on public.post_likes    to authenticated;
grant insert (post_id, user_id, body) on public.post_comments to authenticated;
grant delete on public.post_likes, public.post_comments to authenticated;

-- -----------------------------------------------------------------------------
-- 4. Row Level Security
-- -----------------------------------------------------------------------------

alter table public.post_likes    enable row level security;
alter table public.post_comments enable row level security;

-- Me gusta
drop policy if exists "post_likes: lectura publica"      on public.post_likes;
drop policy if exists "post_likes: dar como uno mismo"   on public.post_likes;
drop policy if exists "post_likes: quitar el propio"     on public.post_likes;

create policy "post_likes: lectura publica"
  on public.post_likes for select
  to anon, authenticated
  using (true);

create policy "post_likes: dar como uno mismo"
  on public.post_likes for insert
  to authenticated
  with check (user_id = (select auth.uid()));

create policy "post_likes: quitar el propio"
  on public.post_likes for delete
  to authenticated
  using (user_id = (select auth.uid()));

-- Comentarios
drop policy if exists "post_comments: lectura publica"             on public.post_comments;
drop policy if exists "post_comments: comentar como uno mismo"     on public.post_comments;
drop policy if exists "post_comments: borrar autor, dueño o admin" on public.post_comments;

create policy "post_comments: lectura publica"
  on public.post_comments for select
  to anon, authenticated
  using (true);

create policy "post_comments: comentar como uno mismo"
  on public.post_comments for insert
  to authenticated
  with check (user_id = (select auth.uid()));

create policy "post_comments: borrar autor, dueño o admin"
  on public.post_comments for delete
  to authenticated
  using (
    user_id = (select auth.uid())
    or exists (
      select 1 from public.posts p
      where p.id = post_comments.post_id
        and p.user_id = (select auth.uid())
    )
    or (select public.is_admin())
  );

commit;

-- =============================================================================
-- Para más adelante (NO se corre con esta migración)
-- =============================================================================
-- La columna posts.likes queda sin uso: el conteo sale de post_likes.
-- Cuando se quite `likes` de PostType en src/app/utils/definitions.ts:
--   alter table public.posts drop column likes;

-- =============================================================================
-- Chequeos útiles (correr aparte y revisar el resultado)
-- =============================================================================
-- ¿Qué tablas de public tienen RLS activado?
--   select relname, relrowsecurity
--   from pg_class
--   where relnamespace = 'public'::regnamespace and relkind = 'r'
--   order by relname;
--
-- ¿Qué hacen las claves foráneas al borrar? (a = nada / error, c = cascade)
--   select conrelid::regclass as tabla, conname, confdeltype
--   from pg_constraint
--   where contype = 'f' and connamespace = 'public'::regnamespace
--   order by 1;
--
-- Políticas actuales de profiles:
--   select policyname, cmd, roles, qual, with_check
--   from pg_policies
--   where schemaname = 'public' and tablename = 'profiles';
