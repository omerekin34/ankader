import { applyDefaults } from "@/lib/site-defaults";
import type { SiteData } from "@/lib/site-types";
import { supabaseProjectUrl } from "@/lib/supabase";
import { createSupabaseServer } from "@/lib/supabase-session";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { connection } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "site.json");
const settingsId = "live";

function isSiteDocument(value: unknown): value is Partial<SiteData> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const doc = value as Record<string, unknown>;
  return Boolean(doc.hero || doc.contact || doc.about || doc.posts || doc.identity);
}

async function readFileSite() {
  const raw = await fs.readFile(filePath, "utf8");
  return applyDefaults(JSON.parse(raw) as Partial<SiteData>);
}

function publicSettingsClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    ? supabaseProjectUrl(process.env.NEXT_PUBLIC_SUPABASE_URL)
    : "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";
  if (!url || !key) throw new Error("MISSING_ENV");
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  });
}

async function readRawDocument(): Promise<Record<string, unknown>> {
  const { data, error } = await publicSettingsClient()
    .from("site_settings")
    .select("document")
    .eq("id", settingsId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  const document = data?.document;
  if (!document || typeof document !== "object" || Array.isArray(document)) return {};
  return document as Record<string, unknown>;
}

export async function readSite(): Promise<SiteData> {
  await connection();
  try {
    const document = await readRawDocument();
    if (isSiteDocument(document)) return applyDefaults(document);
  } catch {
    // Tablo okunamazsa dosyadaki içerik durur.
  }
  return readFileSite();
}

export async function writeSite(data: SiteData) {
  const full = applyDefaults(data);
  const existing = await readRawDocument().catch(() => ({}));
  const document = { ...existing, ...full };
  const supabase = await createSupabaseServer();
  const updated = await supabase.from("site_settings").update({ document }).eq("id", settingsId).select("id");
  if (updated.error) throw new Error(updated.error.message);
  if (!updated.data?.length) {
    const inserted = await supabase.from("site_settings").insert({ id: settingsId, document }).select("id");
    if (inserted.error) throw new Error(inserted.error.message);
  }
  revalidatePath("/", "layout");
}
