import { isAdminLoggedIn } from "@/lib/admin-auth";
import { applicationErrorMessage, readApplications } from "@/lib/application-data";
import { applicantStages, type MembershipApplication } from "@/lib/application-types";
import { insertBasvuru } from "@/lib/supabase";
import { NextResponse } from "next/server";

function text(value: unknown, max = 240) {
  return String(value ?? "").trim().slice(0, max);
}

export async function GET() {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }
  try {
    return NextResponse.json(await readApplications());
  } catch (error) {
    return NextResponse.json({ error: applicationErrorMessage(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<MembershipApplication>;
  const stageRaw = text(body.stage, 40);
  const stage = applicantStages.includes(stageRaw as (typeof applicantStages)[number])
    ? (stageRaw as MembershipApplication["stage"])
    : "";

  const name = text(body.name, 80);
  const email = text(body.email, 120);
  const phone = text(body.phone, 40);
  const school = text(body.school, 140);
  const university = text(body.university, 120);
  const department = text(body.department, 120);
  const year = text(body.year, 40);
  const city = text(body.city, 80);
  const intent = text(body.intent, 80);
  const support = text(body.support, 80);
  const note = text(body.note, 800);

  const missingCore = !name || !email || !intent || !stage || !school;
  const missingUni = stage === "Üniversite öğrencisi" && (!university || !department);
  const missingGradUni = stage === "Mezun" && university && !department;

  if (missingCore || missingUni || missingGradUni) {
    return NextResponse.json({ error: "Zorunlu alanlar eksik." }, { status: 400 });
  }

  try {
    await insertBasvuru({
      ad_soyad: name,
      eposta: email,
      telefon: phone,
      ogrenci_durumu: stage,
      okul_adi: [university, school].filter(Boolean).join(" · "),
      sinif: year,
      alan: department,
      sehir: city,
      basvuru_amaci: intent,
      destek_alani: support,
      mesaj: note,
    });
  } catch {
    return NextResponse.json({ error: "Başvuru kaydedilemedi." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
