import { isAdminLoggedIn } from "@/lib/admin-auth";
import { readSite, writeSite } from "@/lib/site-data";
import type { SiteData } from "@/lib/site-types";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await readSite();
  return NextResponse.json(data);
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function PUT(request: Request) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const data = (await request.json()) as SiteData;
  try {
    await writeSite(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    const text = /row-level security|42501|permission denied/i.test(message)
      ? "Kayıt için yetkili oturum gerekli. Panelden tekrar gir."
      : "İçerik site_settings tablosuna yazılamadı.";
    return NextResponse.json({ error: text }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
