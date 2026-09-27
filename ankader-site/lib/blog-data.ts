import { getSupabaseAdmin } from "@/lib/supabase-server";
import { blogStatuses, type BlogPost, type BlogStatus, type PublicBlogPost } from "@/lib/blog-types";

const durumToStatus: Record<string, BlogStatus> = {
  bekliyor: "bekliyor",
  yeni: "bekliyor",
  yayinda: "yayinda",
  "yayında": "yayinda",
  onay: "yayinda",
  red: "red",
  reddedildi: "red",
};

const statusToDurum: Record<BlogStatus, string> = {
  bekliyor: "Bekliyor",
  yayinda: "Yayında",
  red: "Reddedildi",
};

type BlogRecord = {
  id?: string | number;
  created_at?: string;
  ad_soyad?: string;
  eposta?: string;
  baslik?: string;
  yazi?: string;
  durum?: string;
};

function asStatus(value: unknown): BlogStatus {
  const key = String(value ?? "")
    .trim()
    .toLocaleLowerCase("tr-TR");
  return durumToStatus[key] ?? "bekliyor";
}

function mapRow(row: BlogRecord): BlogPost | null {
  if (row.id == null || row.id === "") return null;
  return {
    id: String(row.id),
    createdAt: row.created_at ?? "",
    name: row.ad_soyad ?? "",
    email: row.eposta ?? "",
    title: row.baslik ?? "",
    body: row.yazi ?? "",
    status: asStatus(row.durum),
  };
}

function byNewest(a: { createdAt: string }, b: { createdAt: string }) {
  const left = Date.parse(a.createdAt);
  const right = Date.parse(b.createdAt);
  return (Number.isNaN(right) ? 0 : right) - (Number.isNaN(left) ? 0 : left);
}

export function blogErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  if (message === "NOT_MEMBER") return "Bu e-posta üye kaydında yok. Blogu üyeler ekleyebilir.";
  if (message === "NOT_FOUND") return "Yazı bulunamadı. Listeyi yenile.";
  if (message === "MISSING_ENV") return "Blog kaydı için sunucu anahtarı eksik.";
  if (/bloglar|schema cache|PGRST205|does not exist/i.test(message)) {
    return "Supabase'de bloglar tablosu yok. Tablo açılınca yazılar buraya düşer.";
  }
  return "Yazı kaydedilemedi. Biraz sonra tekrar dene.";
}

async function assertMember(email: string) {
  const { data, error } = await getSupabaseAdmin().from("uyeler").select("eposta, ad_soyad");
  if (error) throw new Error(error.message);
  const needle = email.trim().toLowerCase();
  const rows = (data ?? []) as { eposta?: string; ad_soyad?: string }[];
  return rows.find((row) => String(row.eposta ?? "").trim().toLowerCase() === needle) ?? null;
}

export async function submitBlog(input: { name: string; email: string; title: string; body: string }) {
  const member = await assertMember(input.email);
  if (!member) throw new Error("NOT_MEMBER");

  const row = {
    ad_soyad: input.name.trim() || String(member.ad_soyad ?? "").trim(),
    eposta: input.email.trim().toLowerCase(),
    baslik: input.title.trim(),
    yazi: input.body.trim(),
    durum: statusToDurum.bekliyor,
  };
  const inserted = await getSupabaseAdmin().from("bloglar").insert(row).select("id");
  if (inserted.error) throw new Error(inserted.error.message);
}

export async function readBlogs(): Promise<BlogPost[]> {
  const { data, error } = await getSupabaseAdmin().from("bloglar").select("*");
  if (error) throw new Error(error.message);
  return ((data ?? []) as BlogRecord[]).map(mapRow).filter((item): item is BlogPost => item !== null).sort(byNewest);
}

export async function readPublishedBlogs(): Promise<PublicBlogPost[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("bloglar")
    .select("id, created_at, ad_soyad, baslik, yazi, durum")
    .eq("durum", statusToDurum.yayinda);
  if (error) throw new Error(error.message);
  return ((data ?? []) as BlogRecord[])
    .map(mapRow)
    .filter((item): item is BlogPost => item !== null && item.status === "yayinda")
    .sort(byNewest)
    .map(({ id, createdAt, name, title, body }) => ({ id, createdAt, name, title, body }));
}

export async function readPublishedBlog(id: string): Promise<PublicBlogPost | null> {
  const { data, error } = await getSupabaseAdmin()
    .from("bloglar")
    .select("id, created_at, ad_soyad, baslik, yazi, durum")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  const mapped = data ? mapRow(data as BlogRecord) : null;
  if (!mapped || mapped.status !== "yayinda") return null;
  return { id: mapped.id, createdAt: mapped.createdAt, name: mapped.name, title: mapped.title, body: mapped.body };
}

export async function updateBlogStatus(id: string, status: BlogStatus) {
  if (!blogStatuses.includes(status)) throw new Error("INVALID");
  const { data, error } = await getSupabaseAdmin()
    .from("bloglar")
    .update({ durum: statusToDurum[status] })
    .eq("id", id)
    .select("id");
  if (error) throw new Error(error.message);
  if (!data?.length) throw new Error("NOT_FOUND");
}

export async function deleteBlog(id: string) {
  const { data, error } = await getSupabaseAdmin().from("bloglar").delete().eq("id", id).select("id");
  if (error) throw new Error(error.message);
  if (!data?.length) throw new Error("NOT_FOUND");
}
