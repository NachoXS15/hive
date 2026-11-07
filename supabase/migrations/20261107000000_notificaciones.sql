-- =============================================================================
-- Hive · Notificaciones (me gusta y comentarios en tus publicaciones)
-- Requiere la migración anterior (post_likes y post_comments).
-- Para correr en Supabase (SQL Editor) o como archivo en supabase/migrations.
-- Es aditiva y se puede volver a correr sin errores (idempotente).
-- =============================================================================

begin;

-- -----------------------------------------------------------------------------
-- 1. Tabla
-- -----------------------------------------------------------------------------
-- Una fila por aviso. recipient_id = dueño del post; actor_id = quien dio
-- me gusta o comentó. Las crea la base de datos con triggers (sección 3):
-- desde la app nadie puede insertar notificaciones.
--
-- La PK es un id propio (no compuesta) para que la API de Supabase no tome
-- esta tabla como intermedia entre posts y profiles (error PGRST201).

create table if not exists public.notifications (
  id           uuid primary key default gen_random_uuid(),
  recipient_id uuid not null references public.profiles (id) on delete cascade,
  actor_id     uuid not null references public.profiles (id) on delete cascade,
  kind         text not null
               constraint notifications_kind_check check (kind in ('like', 'comment')),
  post_id      uuid not null references public.posts (id) on delete cascade,
  comment_id   uuid references public.post_comments (id) on delete cascade,
  created_at   timestamptz not null default now(),
  read_at      timestamptz,
  -- los comentarios llevan comment_id; los me gusta no
  constraint notifications_comment_id_check check ((kind = 'comment') = (comment_id is not null)),
  -- nadie se notifica a sí mismo
  constraint notifications_not_self_check check (recipient_id <> actor_id)
);

-- Listado de cada usuario (más nuevas primero) y conteo de no leídas
create index if not exists notifications_recipient_created_idx
  on public.notifications (recipient_id, created_at desc);
create index if not exists notifications_recipient_unread_idx
  on public.notifications (recipient_id) where read_at is null;
-- Un solo aviso de me gusta por persona y post (dar, quitar y volver a dar no duplica)
create unique index if not exists notifications_like_once_idx
  on public.notifications (actor_id, post_id) where kind = 'like';
-- Índices de las FK (para que los borrados en cascada no recorran toda la tabla)
create index if not exists notifications_actor_id_idx   on public.notifications (actor_id);
create index if not exists notifications_post_id_idx    on public.notifications (post_id);
create index if not exists notifications_comment_id_idx on public.notifications (comment_id);

-- -----------------------------------------------------------------------------
-- 2. Permisos y RLS
-- -----------------------------------------------------------------------------
-- Cada usuario ve solo sus notificaciones y lo único que puede cambiar es
-- read_at (marcarlas como leídas). Insertar y borrar lo hacen los triggers.

revoke all on public.notifications from anon, authenticated;
grant select on public.notifications to authenticated;
grant update (read_at) on public.notifications to authenticated;

alter table public.notifications enable row level security;

drop policy if exists "notifications: ver las propias"      on public.notifications;
drop policy if exists "notifications: marcar las propias"   on public.notifications;

create policy "notifications: ver las propias"
  on public.notifications for select
  to authenticated
  using (recipient_id = (select auth.uid()));

create policy "notifications: marcar las propias"
  on public.notifications for update
  to authenticated
  using (recipient_id = (select auth.uid()))
  with check (recipient_id = (select auth.uid()));

-- -----------------------------------------------------------------------------
-- 3. Triggers que generan las notificaciones
-- -----------------------------------------------------------------------------
-- security definer: escriben en notifications aunque el usuario no tenga
-- permiso de insertar ahí.

-- Me gusta: al darlo se avisa al dueño del post; al quitarlo se borra el aviso.
create or replace function public.notify_post_like()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  post_owner uuid;
begin
  if tg_op = 'INSERT' then
    select p.user_id into post_owner from public.posts p where p.id = new.post_id;
    if post_owner is not null and post_owner <> new.user_id then
      insert into public.notifications (recipient_id, actor_id, kind, post_id)
      values (post_owner, new.user_id, 'like', new.post_id)
      on conflict (actor_id, post_id) where kind = 'like' do nothing;
    end if;
    return new;
  end if;

  -- DELETE
  delete from public.notifications n
  where n.kind = 'like' and n.actor_id = old.user_id and n.post_id = old.post_id;
  return old;
end;
$$;

-- Comentario: se avisa al dueño del post. Si el comentario se borra, el aviso
-- desaparece solo (FK comment_id con on delete cascade).
create or replace function public.notify_post_comment()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  post_owner uuid;
begin
  select p.user_id into post_owner from public.posts p where p.id = new.post_id;
  if post_owner is not null and post_owner <> new.user_id then
    insert into public.notifications (recipient_id, actor_id, kind, post_id, comment_id)
    values (post_owner, new.user_id, 'comment', new.post_id, new.id);
  end if;
  return new;
end;
$$;

-- Son funciones de trigger: nadie las tiene que poder llamar desde la API
revoke execute on function public.notify_post_like()    from public, anon, authenticated;
revoke execute on function public.notify_post_comment() from public, anon, authenticated;

drop trigger if exists post_likes_notify on public.post_likes;
create trigger post_likes_notify
  after insert or delete on public.post_likes
  for each row execute function public.notify_post_like();

drop trigger if exists post_comments_notify on public.post_comments;
create trigger post_comments_notify
  after insert on public.post_comments
  for each row execute function public.notify_post_comment();

-- -----------------------------------------------------------------------------
-- 4. Historial: me gusta y comentarios que ya existían
-- -----------------------------------------------------------------------------
-- Se cargan como YA LEÍDAS: aparecen en el panel pero no suman al contador.
-- No duplica si la migración se corre de nuevo.

insert into public.notifications (recipient_id, actor_id, kind, post_id, created_at, read_at)
select p.user_id, l.user_id, 'like', l.post_id, l.created_at, now()
from public.post_likes l
join public.posts p on p.id = l.post_id
where p.user_id is not null and p.user_id <> l.user_id
on conflict (actor_id, post_id) where kind = 'like' do nothing;

insert into public.notifications (recipient_id, actor_id, kind, post_id, comment_id, created_at, read_at)
select p.user_id, c.user_id, 'comment', c.post_id, c.id, c.created_at, now()
from public.post_comments c
join public.posts p on p.id = c.post_id
where p.user_id is not null and p.user_id <> c.user_id
  and not exists (select 1 from public.notifications n where n.comment_id = c.id);

commit;
