alter table public.bloglar add column if not exists ad_soyad text not null default '';
alter table public.bloglar add column if not exists eposta text not null default '';
alter table public.bloglar add column if not exists baslik text not null default '';
alter table public.bloglar add column if not exists yazi text not null default '';
alter table public.bloglar add column if not exists durum text not null default 'Bekliyor';
