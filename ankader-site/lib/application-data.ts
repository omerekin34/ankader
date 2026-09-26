import { getSupabaseAdmin } from "@/lib/supabase-server";
import {
  applicantStages,
  type ApplicantStage,
  type ApplicationStatus,
  type MembershipApplication,
} from "@/lib/application-types";

const durumToStatus: Record<string, ApplicationStatus> = {
  yeni: "yeni",
  inceleniyor: "inceleniyor",
  kabul: "kabul",
  red: "red",
  reddedildi: "red",
};

const statusToDurum: Record<ApplicationStatus, string> = {
  yeni: "Yeni",
  inceleniyor: "İnceleniyor",
  kabul: "Kabul",
  red: "Reddedildi",
};

type BasvuruRecord = {
  id?: string | number;
  created_at?: string;
  durum?: string;
  ad_soyad?: string;
  eposta?: string;
  telefon?: string;
  ogrenci_durumu?: string;
  okul_adi?: string;
  sinif?: string;
  alan?: string;
  sehir?: string;
  basvuru_amaci?: string;
  destek_alani?: string;
  mesaj?: string;
};

function asStatus(value: unknown): ApplicationStatus {
  const key = String(value ?? "")
    .trim()
    .toLocaleLowerCase("tr-TR");
  return durumToStatus[key] ?? "yeni";
}

function asStage(value: unknown): MembershipApplication["stage"] {
  const text = String(value ?? "").trim();
  return applicantStages.includes(text as ApplicantStage) ? (text as ApplicantStage) : "";
}

function splitSchool(okul: string, stage: string) {
  const parts = okul
    .split(" · ")
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length >= 2) {
    return { university: parts[0], school: parts.slice(1).join(" · ") };
  }
  const only = parts[0] ?? "";
  if (stage === "Üniversite öğrencisi") return { university: only, school: "" };
  return { university: "", school: only };
}

function mapRow(row: BasvuruRecord): MembershipApplication | null {
  if (row.id == null || row.id === "") return null;
  const stage = asStage(row.ogrenci_durumu);
  const schools = splitSchool(String(row.okul_adi ?? ""), stage);
  return {
    id: String(row.id),
    createdAt: row.created_at ?? "",
    status: asStatus(row.durum),
    name: row.ad_soyad ?? "",
    email: row.eposta ?? "",
    phone: row.telefon ?? "",
    stage,
    school: schools.school,
    university: schools.university,
    department: row.alan ?? "",
    year: row.sinif ?? "",
    city: row.sehir ?? "",
    intent: row.basvuru_amaci ?? "",
    support: row.destek_alani ?? "",
    note: row.mesaj ?? "",
  };
}

export function applicationErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  if (message === "MISSING_ENV") {
    return "Başvurular alınamadı. .env.local içine SUPABASE_SERVICE_ROLE_KEY ekleyip sunucuyu yeniden başlat.";
  }
  return "Başvurular Supabase'den alınamadı. Bağlantıyı ve tabloyu kontrol et.";
}

export async function readApplications(): Promise<MembershipApplication[]> {
  const { data, error } = await getSupabaseAdmin().from("basvurular").select("*");
  if (error) throw new Error(error.message);
  const items = ((data ?? []) as BasvuruRecord[])
    .map(mapRow)
    .filter((item): item is MembershipApplication => item !== null);
  const time = (value: string) => {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  };
  items.sort((a, b) => time(b.createdAt) - time(a.createdAt));
  return items;
}

export async function updateApplicationStatus(id: string, status: ApplicationStatus) {
  const { error } = await getSupabaseAdmin()
    .from("basvurular")
    .update({ durum: statusToDurum[status] })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteApplication(id: string) {
  const { error } = await getSupabaseAdmin().from("basvurular").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

type UyeRow = {
  ad_soyad: string;
  eposta: string;
  telefon: string;
  ogrenci_durumu: string;
  okul_adi: string;
  sinif: string;
  alan: string;
  sehir: string;
};

function memberFromApplication(row: BasvuruRecord): UyeRow {
  return {
    ad_soyad: row.ad_soyad ?? "",
    eposta: row.eposta ?? "",
    telefon: row.telefon ?? "",
    ogrenci_durumu: row.ogrenci_durumu ?? "",
    okul_adi: row.okul_adi ?? "",
    sinif: row.sinif ?? "",
    alan: row.alan ?? "",
    sehir: row.sehir ?? "",
  };
}

export async function acceptApplication(id: string) {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.from("basvurular").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("NOT_FOUND");

  const member = memberFromApplication(data as BasvuruRecord);
  const inserted = await admin.from("uyeler").insert(member).select("*");
  if (inserted.error) throw new Error(inserted.error.message);

  const created = Array.isArray(inserted.data) ? inserted.data[0] : null;
  const createdId = created && typeof created === "object" && "id" in created ? created.id : null;

  const removed = await admin.from("basvurular").delete().eq("id", id).select("id");
  if (removed.error || !removed.data?.length) {
    if (createdId != null) {
      await admin.from("uyeler").delete().eq("id", createdId);
    } else {
      await admin.from("uyeler").delete().match(member);
    }
    throw new Error(removed.error?.message || "DELETE_FAILED");
  }
}

export async function readUyeler(): Promise<MembershipApplication[]> {
  const { data, error } = await getSupabaseAdmin().from("uyeler").select("*");
  if (error) throw new Error(error.message);
  const items: MembershipApplication[] = [];
  ((data ?? []) as BasvuruRecord[]).forEach((row, index) => {
    const mapped = mapRow({ ...row, id: row.id ?? `uye-${index}`, durum: "kabul" });
    if (mapped) items.push({ ...mapped, status: "kabul" });
  });
  return items;
}

export function acceptErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  if (message === "NOT_FOUND") return "Başvuru bulunamadı. Listeyi yenile.";
  if (message === "MISSING_ENV") return "Üye kaydı için sunucu anahtarı eksik.";
  return "Üye kaydı tamamlanamadı. Başvuru listede duruyor.";
}
