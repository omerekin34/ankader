import { isAdminLoggedIn } from "@/lib/admin-auth";
import { readApplications, writeApplications } from "@/lib/application-data";
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

  const items = await readApplications();
  const index = items.findIndex((item) => item.id === id);
  if (index < 0) return NextResponse.json({ error: "Bulunamadı." }, { status: 404 });

  items[index] = { ...items[index], status: body.status };
  await writeApplications(items);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const { id } = await params;
  const items = await readApplications();
  await writeApplications(items.filter((item) => item.id !== id));
  return NextResponse.json({ ok: true });
}
