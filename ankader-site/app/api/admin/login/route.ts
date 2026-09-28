import { ADMIN_COOKIE } from "@/lib/admin-auth";
import { createSupabaseRoute } from "@/lib/supabase-session";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string; password?: string } | null;
  const email = String(body?.email ?? "").trim().toLowerCase();
  const password = String(body?.password ?? "");
  if (!email.includes("@") || !password) {
    return NextResponse.json({ error: "E-posta veya şifre hatalı." }, { status: 401 });
  }

  try {
    const session = await createSupabaseRoute();
    const { error } = await session.supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return NextResponse.json({ error: "E-posta veya şifre hatalı." }, { status: 401 });
    }
    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
    return session.withCookies(response);
  } catch {
    return NextResponse.json({ error: "Giriş tamamlanamadı." }, { status: 500 });
  }
}
