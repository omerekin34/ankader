import { updateSupabaseSession } from "@/lib/supabase-middleware";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSupabaseSession(request);
  const { pathname } = request.nextUrl;
  const loggingIn = pathname === "/admin/login" || pathname.startsWith("/admin/login/");

  if (pathname.startsWith("/admin") && !loggingIn && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    const redirect = NextResponse.redirect(url);
    response.cookies.getAll().forEach((cookie) => {
      redirect.cookies.set(cookie);
    });
    return redirect;
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
