import { isAdminLoggedIn } from "@/lib/admin-auth";
import { deleteUye, updateUye } from "@/lib/application-data";
import { applicantStages, type ApplicantStage, type MembershipApplication } from "@/lib/application-types";
import { NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> };

function text(value: unknown, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

export async function PATCH(request: Request, { params }: Params) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json().catch(() => null)) as Partial<MembershipApplication> | null;
  const stageRaw = text(body?.stage, 40);
  const stage = applicantStages.includes(stageRaw as ApplicantStage) ? (stageRaw as ApplicantStage) : "";
  const name = text(body?.name, 80);
  if (name.length < 2) {
    return NextResponse.json({ error: "Ad soyad gerekli." }, { status: 400 });
  }

  const member: MembershipApplication = {
    id,
    createdAt: "",
    status: "kabul",
    name,
    email: text(body?.email, 120),
    phone: text(body?.phone, 40),
    stage,
    school: text(body?.school, 160),
    university: text(body?.university, 160),
    department: text(body?.department, 120),
    year: text(body?.year, 40),
    city: text(body?.city, 80),
    intent: "",
    support: "",
    note: "",
  };

  try {
    await updateUye(id, member);
  } catch (error) {
    const missing = error instanceof Error && error.message === "NOT_FOUND";
    return NextResponse.json(
      { error: missing ? "Üye bulunamadı. Listeyi yenile." : "Üye güncellenemedi." },
      { status: missing ? 404 : 500 },
    );
  }

  return NextResponse.json({ ok: true, member });
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const { id } = await params;
  try {
    await deleteUye(id);
  } catch (error) {
    const missing = error instanceof Error && error.message === "NOT_FOUND";
    return NextResponse.json(
      { error: missing ? "Üye bulunamadı. Listeyi yenile." : "Üye silinemedi." },
      { status: missing ? 404 : 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
