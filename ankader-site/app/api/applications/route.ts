import { isAdminLoggedIn } from "@/lib/admin-auth";
import { readApplications, writeApplications } from "@/lib/application-data";
import { applicantStages, type MembershipApplication } from "@/lib/application-types";
import { NextResponse } from "next/server";

function text(value: unknown, max = 240) {
  return String(value ?? "").trim().slice(0, max);
}

export async function GET() {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }
  return NextResponse.json(await readApplications());
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<MembershipApplication>;
  const stageRaw = text(body.stage, 40);
  const stage = applicantStages.includes(stageRaw as (typeof applicantStages)[number])
    ? (stageRaw as MembershipApplication["stage"])
    : "";

  const application: MembershipApplication = {
    id: `app_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    status: "yeni",
    name: text(body.name, 80),
    email: text(body.email, 120),
    phone: text(body.phone, 40),
    stage,
    school: text(body.school, 140),
    university: text(body.university, 120),
    department: text(body.department, 120),
    year: text(body.year, 40),
    studentNo: stage === "Mezun" ? "" : text(body.studentNo, 40),
    city: text(body.city, 80),
    intent: text(body.intent, 80),
    support: text(body.support, 80),
    note: text(body.note, 800),
  };

  const missingCore = !application.name || !application.email || !application.intent || !application.stage || !application.school;
  const missingUni =
    application.stage === "Üniversite öğrencisi" &&
    (!application.university || !application.department);
  const missingGradUni = application.stage === "Mezun" && application.university && !application.department;

  if (missingCore || missingUni || missingGradUni) {
    return NextResponse.json({ error: "Zorunlu alanlar eksik." }, { status: 400 });
  }

  const items = await readApplications();
  items.unshift(application);
  await writeApplications(items.slice(0, 500));
  return NextResponse.json({ ok: true, id: application.id });
}
