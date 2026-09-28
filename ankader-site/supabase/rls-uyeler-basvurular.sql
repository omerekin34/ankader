alter table public.basvurular enable row level security;
alter table public.uyeler enable row level security;

drop policy if exists "basvuru ekle" on public.basvurular;
create policy "basvuru ekle"
  on public.basvurular
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "basvuru yonet" on public.basvurular;
create policy "basvuru yonet"
  on public.basvurular
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "uyeler yonet" on public.uyeler;
create policy "uyeler yonet"
  on public.uyeler
  for all
  to authenticated
  using (true)
  with check (true);
