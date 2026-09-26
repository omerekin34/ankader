import { isAdminLoggedIn } from "@/lib/admin-auth";
import { acceptApplication, acceptErrorMessage, deleteApplication, updateApplicationStatus } from "@/lib/application-data";
import { applicationStatuses, type ApplicationStatus } from "@/lib/application-types";
import { NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json()) as { status?: ApplicationStatus };
  if (!body.status || !applicationStatuses.includes(body.status)) {
    return NextResponse.json({ error: "Geçersiz durum." }, { status: 400 });
  }

  try {
    if (body.status === "kabul") {
      await acceptApplication(id);
      return NextResponse.json({ ok: true, moved: true });
    }
    await updateApplicationStatus(id, body.status);
  } catch (error) {
    if (body.status === "kabul") {
      const missing = error instanceof Error && error.message === "NOT_FOUND";
      return NextResponse.json({ error: acceptErrorMessage(error) }, { status: missing ? 404 : 500 });
    }
    return NextResponse.json({ error: "Başvuru güncellenemedi." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const { id } = await params;
  try {
    await deleteApplication(id);
  } catch {
    return NextResponse.json({ error: "Başvuru silinemedi." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
