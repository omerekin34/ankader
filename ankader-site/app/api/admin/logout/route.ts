import { ADMIN_COOKIE } from "@/lib/admin-auth";
import { createSupabaseRoute } from "@/lib/supabase-session";
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  try {
    const session = await createSupabaseRoute();
    await session.supabase.auth.signOut();
    return session.withCookies(response);
  } catch {
    return response;
  }
}
