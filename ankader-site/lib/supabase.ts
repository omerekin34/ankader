import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function supabaseProjectUrl(raw: string) {
  return raw.trim().replace(/\/rest\/v1\/?$/i, "").replace(/\/+$/, "");
}

export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    ? supabaseProjectUrl(process.env.NEXT_PUBLIC_SUPABASE_URL)
    : "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("MISSING_ENV");
  }
  if (!client) client = createClient(url, key);
  return client;
}

export type BasvuruRow = {
  ad_soyad: string;
  eposta: string;
  telefon: string;
  ogrenci_durumu: string;
  okul_adi: string;
  sinif: string;
  alan: string;
  sehir: string;
  basvuru_amaci: string;
  destek_alani: string;
  mesaj: string;
};

export async function insertBasvuru(row: BasvuruRow) {
  const { error } = await getSupabase().from("basvurular").insert(row);
  if (error) throw new Error(error.message || error.code || "INSERT_FAILED");
}
