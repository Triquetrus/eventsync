create table if not exists events (
  id text primary key, user_email text not null, data jsonb not null, created_at timestamptz default now()
);
create table if not exists media (
  id text primary key, user_email text not null, event_id text, data jsonb not null, created_at timestamptz default now()
);
create table if not exists captions (
  id text primary key, user_email text not null, data jsonb not null, created_at timestamptz default now()
);
alter table events enable row level security;
alter table media enable row level security;
alter table captions enable row level security;
create policy "own events" on events for all using (user_email = auth.jwt() ->> 'email') with check (user_email = auth.jwt() ->> 'email');
create policy "own media" on media for all using (user_email = auth.jwt() ->> 'email') with check (user_email = auth.jwt() ->> 'email');
create policy "own captions" on captions for all using (user_email = auth.jwt() ->> 'email') with check (user_email = auth.jwt() ->> 'email');

-- Uploaded media is stored under <authenticated-user-email>/<media-id>.<extension>.
-- This creates the `basket` bucket used by the client and permits users to
-- access only their own folder. The bucket is public so saved media URLs can
-- be rendered directly in the gallery.
insert into storage.buckets (id, name, public)
values ('basket', 'basket', true)
on conflict (id) do update set public = true;

create policy "users manage their own basket media"
on storage.objects for all
to authenticated
using (
  bucket_id = 'basket'
  and (storage.foldername(name))[1] = (auth.jwt() ->> 'email')
)
with check (
  bucket_id = 'basket'
  and (storage.foldername(name))[1] = (auth.jwt() ->> 'email')
);
