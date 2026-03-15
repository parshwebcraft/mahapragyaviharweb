create extension if not exists "pgcrypto";

create type public.user_role as enum ('guest', 'admin');
create type public.room_type as enum ('AC', 'NON_AC');
create type public.room_status as enum ('available', 'blocked', 'maintenance');
create type public.space_type as enum ('hall', 'garden', 'kitchen');
create type public.booking_status as enum ('pending', 'confirmed', 'rejected', 'cancelled');
create type public.booking_type as enum ('room', 'hourly_event', 'full_day_event', 'wedding_package');

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text unique,
  phone text,
  role public.user_role not null default 'guest',
  created_at timestamptz not null default now()
);

create table if not exists public.rooms (
  id uuid primary key default gen_random_uuid(),
  room_number text not null unique,
  room_type public.room_type not null,
  price numeric(10,2) not null,
  capacity integer not null default 2,
  status public.room_status not null default 'available',
  amenities text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.spaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  capacity integer not null,
  price numeric(10,2) not null,
  type public.space_type not null,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  room_id uuid references public.rooms(id) on delete set null,
  space_id uuid references public.spaces(id) on delete set null,
  checkin timestamptz not null,
  checkout timestamptz not null,
  booking_type public.booking_type not null,
  status public.booking_status not null default 'pending',
  event_type text,
  total_price numeric(10,2) not null default 0,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.pricing_rules (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  target_type text not null,
  target_id uuid,
  multiplier numeric(6,2) not null default 1,
  start_date date not null,
  end_date date not null,
  applies_on_weekend boolean not null default false
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  razorpay_payment_id text,
  razorpay_order_id text,
  amount numeric(10,2) not null,
  status text not null,
  payload jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  pdf_url text,
  issued_at timestamptz not null default now()
);

create table if not exists public.gallery_assets (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  title text not null,
  image_url text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.rooms enable row level security;
alter table public.spaces enable row level security;
alter table public.bookings enable row level security;
alter table public.pricing_rules enable row level security;
alter table public.payments enable row level security;
alter table public.invoices enable row level security;
alter table public.gallery_assets enable row level security;

create policy "profiles self select"
on public.profiles for select
using (auth.uid() = id);

create policy "profiles self update"
on public.profiles for update
using (auth.uid() = id);

create policy "public rooms read"
on public.rooms for select
using (true);

create policy "public spaces read"
on public.spaces for select
using (true);

create policy "public gallery read"
on public.gallery_assets for select
using (true);

create policy "bookings user read own"
on public.bookings for select
using (auth.uid() = user_id);

create policy "bookings user create own"
on public.bookings for insert
with check (auth.uid() = user_id);

create policy "bookings user update own pending"
on public.bookings for update
using (auth.uid() = user_id and status = 'pending');

create policy "payments user read own"
on public.payments for select
using (
  exists (
    select 1 from public.bookings
    where public.bookings.id = booking_id and public.bookings.user_id = auth.uid()
  )
);

create policy "invoices user read own"
on public.invoices for select
using (
  exists (
    select 1 from public.bookings
    where public.bookings.id = booking_id and public.bookings.user_id = auth.uid()
  )
);

create policy "admins full access profiles"
on public.profiles for all
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "admins full access rooms"
on public.rooms for all
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "admins full access spaces"
on public.spaces for all
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "admins full access bookings"
on public.bookings for all
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "admins full access pricing"
on public.pricing_rules for all
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "admins full access payments"
on public.payments for all
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "admins full access invoices"
on public.invoices for all
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "admins full access gallery"
on public.gallery_assets for all
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

insert into public.rooms (room_number, room_type, price, capacity, amenities)
select
  case when gs <= 18 then 'A-' || lpad(gs::text, 2, '0') else 'N-' || lpad((gs - 18)::text, 2, '0') end,
  case when gs <= 18 then 'AC'::public.room_type else 'NON_AC'::public.room_type end,
  case when gs <= 18 then 4200 else 2800 end,
  2,
  array['Temple view', 'Hot water', 'Satvik dining access', 'Wi-Fi']
from generate_series(1, 36) as gs
on conflict (room_number) do nothing;

insert into public.spaces (name, capacity, price, type, image_url)
values
  ('Samadhi Hall', 350, 75000, 'hall', 'gallery/halls/samadhi.jpg'),
  ('Pravachan Hall', 220, 55000, 'hall', 'gallery/halls/pravachan.jpg'),
  ('Sanskriti Hall', 120, 38000, 'hall', 'gallery/halls/sanskriti.jpg'),
  ('Shanti Garden', 500, 60000, 'garden', 'gallery/garden/shanti.jpg'),
  ('Seva Kitchen Area', 50, 15000, 'kitchen', 'gallery/kitchen/seva.jpg')
on conflict do nothing;
