import { isAdminLoggedIn } from "@/lib/admin-auth";
import { readSite, writeSite } from "@/lib/site-data";
import type { SiteData } from "@/lib/site-types";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await readSite();
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const data = (await request.json()) as SiteData;
  await writeSite(data);
  return NextResponse.json({ ok: true });
}
