import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE = "ankader_admin";

function token() {
  return `ok.${process.env.ADMIN_SECRET || "ankader-dev-secret"}`;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    return NextResponse.next();
  }

  if (request.cookies.get(COOKIE)?.value !== token()) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
