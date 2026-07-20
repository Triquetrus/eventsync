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