create table public.budgets (
  user_id uuid primary key references auth.users(id) on delete cascade,
  monthly_amount numeric(10,2) not null check (monthly_amount > 0),
  updated_at timestamptz not null default now()
);

alter table public.budgets enable row level security;

create policy "Users can view their own budget"
  on public.budgets for select
  using (auth.uid() = user_id);

create policy "Users can insert their own budget"
  on public.budgets for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own budget"
  on public.budgets for update
  using (auth.uid() = user_id);
