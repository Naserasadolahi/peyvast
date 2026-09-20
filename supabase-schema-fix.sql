-- ============================================================
-- پیوست — اصلاح / تکمیل اسکیما (قابل اجرای مجدد)
-- ============================================================

-- جداول (اگر نباشند ساخته می‌شوند)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  name text,
  role text not null default 'user' check (role in ('admin', 'user')),
  wallet_balance bigint not null default 50000,
  created_at timestamptz not null default now()
);

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  module text not null,
  title text not null,
  side text not null check (side in ('offer', 'demand')),
  tags text[] default '{}',
  location text,
  price text,
  price_unit text,
  description text,
  owner_id uuid references public.profiles(id) on delete set null,
  owner_name text,
  cover_image text,
  avatar_image text,
  job_group text,
  employment_type text,
  education text,
  experience text,
  service_type text,
  field text,
  rank text,
  category text,
  deal_type text,
  condition text,
  unit text,
  tech_type text,
  delivery text,
  attachments jsonb default '[]',
  created_at timestamptz not null default now()
);

create index if not exists listings_module_idx on public.listings(module);
create index if not exists listings_owner_idx on public.listings(owner_id);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  module text,
  label text not null,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  unique(type, label)
);

create table if not exists public.visits (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references public.listings(id) on delete cascade,
  listing_title text,
  owner_id uuid references public.profiles(id),
  visitor_id uuid references public.profiles(id),
  visitor_username text,
  amount integer not null default 5000,
  page_url text,
  created_at timestamptz not null default now()
);

create index if not exists visits_owner_idx on public.visits(owner_id);

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null check (type in ('charge', 'visit_debit', 'admin_adjust')),
  amount bigint not null,
  balance_after bigint not null,
  description text,
  listing_id uuid,
  created_at timestamptz not null default now()
);

create index if not exists transactions_user_idx on public.transactions(user_id);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid,
  listing_title text,
  participant_ids uuid[] not null,
  participant_names jsonb not null default '{}',
  last_message text,
  last_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id),
  sender_name text,
  text text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists messages_conv_idx on public.messages(conversation_id);

-- RLS
alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.categories enable row level security;
alter table public.visits enable row level security;
alter table public.transactions enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;

-- حذف policyهای قبلی (اگر وجود داشته باشند) سپس ساخت مجدد
drop policy if exists "profiles_select" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "profiles_insert" on public.profiles;

drop policy if exists "listings_select" on public.listings;
drop policy if exists "listings_insert" on public.listings;
drop policy if exists "listings_update" on public.listings;
drop policy if exists "listings_delete" on public.listings;

drop policy if exists "categories_select" on public.categories;
drop policy if exists "categories_insert" on public.categories;

drop policy if exists "visits_select" on public.visits;
drop policy if exists "visits_insert" on public.visits;

drop policy if exists "transactions_select_own" on public.transactions;
drop policy if exists "transactions_insert" on public.transactions;

drop policy if exists "conversations_select" on public.conversations;
drop policy if exists "conversations_insert" on public.conversations;
drop policy if exists "conversations_update" on public.conversations;

drop policy if exists "messages_select" on public.messages;
drop policy if exists "messages_insert" on public.messages;
drop policy if exists "messages_update" on public.messages;

-- ساخت policyها
create policy "profiles_select" on public.profiles for select using (true);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_insert" on public.profiles for insert with check (auth.uid() = id);

create policy "listings_select" on public.listings for select using (true);
create policy "listings_insert" on public.listings for insert with check (auth.uid() = owner_id);
create policy "listings_update" on public.listings for update using (auth.uid() = owner_id);
create policy "listings_delete" on public.listings for delete using (auth.uid() = owner_id);

create policy "categories_select" on public.categories for select using (true);
create policy "categories_insert" on public.categories for insert with check (auth.uid() is not null);

create policy "visits_select" on public.visits for select using (true);
create policy "visits_insert" on public.visits for insert with check (auth.uid() is not null);

create policy "transactions_select_own" on public.transactions for select using (auth.uid() = user_id or exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
));
create policy "transactions_insert" on public.transactions for insert with check (auth.uid() is not null);

create policy "conversations_select" on public.conversations for select using (auth.uid() = any(participant_ids));
create policy "conversations_insert" on public.conversations for insert with check (auth.uid() = any(participant_ids));
create policy "conversations_update" on public.conversations for update using (auth.uid() = any(participant_ids));

create policy "messages_select" on public.messages for select using (
  exists (select 1 from public.conversations c where c.id = conversation_id and auth.uid() = any(c.participant_ids))
);
create policy "messages_insert" on public.messages for insert with check (auth.uid() = sender_id);
create policy "messages_update" on public.messages for update using (
  exists (select 1 from public.conversations c where c.id = conversation_id and auth.uid() = any(c.participant_ids))
);

-- تریگر پروفایل
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, name, role, wallet_balance)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    case when new.email = 'naser.asadolahi@peyvast.local' then 'admin' else 'user' end,
    case when new.email = 'naser.asadolahi@peyvast.local' then 10000000 else 50000 end
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
