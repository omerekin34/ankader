import { sameHostRedirect } from "@/lib/site-url";
import { createSupabaseServer } from "@/lib/supabase-session";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next");
  const path = next && next.startsWith("/") && !next.startsWith("//") ? next : "/admin";

  if (code) {
    const supabase = await createSupabaseServer();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(sameHostRedirect(request, path));
}
