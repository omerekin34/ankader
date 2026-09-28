alter table public.site_settings enable row level security;

drop policy if exists "site oku" on public.site_settings;
create policy "site oku"
  on public.site_settings
  for select
  to anon, authenticated
  using (true);

drop policy if exists "site guncelle" on public.site_settings;
create policy "site guncelle"
  on public.site_settings
  for update
  to authenticated
  using (id = 'live')
  with check (id = 'live');

drop policy if exists "site ekle" on public.site_settings;
create policy "site ekle"
  on public.site_settings
  for insert
  to authenticated
  with check (id = 'live');
