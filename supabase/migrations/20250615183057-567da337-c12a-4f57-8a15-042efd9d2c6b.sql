
-- Create journal_entries table (linked to authenticated user, not custom users table!)
create table public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  mood text,
  notes text,
  created_at timestamp with time zone default now()
);

-- Only the authenticated user can view/insert their own entries (RLS)
alter table public.journal_entries enable row level security;

create policy "Users can select their own journal entries"
  on public.journal_entries
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own journal entry"
  on public.journal_entries
  for insert
  with check (auth.uid() = user_id);

-- Create feedback table (linked to authenticated user)
create table public.feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  message text,
  rating int,
  submitted_at timestamp with time zone default now()
);

alter table public.feedback enable row level security;

create policy "Users can select their own feedback"
  on public.feedback
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own feedback"
  on public.feedback
  for insert
  with check (auth.uid() = user_id);
