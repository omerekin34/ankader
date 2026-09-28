export function publicSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/+$/, "");

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (production) return `https://${production.replace(/^https?:\/\//, "").replace(/\/+$/, "")}`;

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "").replace(/\/+$/, "")}`;

  return "http://localhost:3000";
}

export function authCallbackUrl() {
  return `${publicSiteUrl()}/auth/callback`;
}

export function sameHostRedirect(request: Request, path: string) {
  const current = new URL(request.url);
  const safePath = path.startsWith("/") && !path.startsWith("//") ? path : "/admin";
  let configured = "";
  try {
    configured = new URL(publicSiteUrl()).origin;
  } catch {
    configured = "";
  }
  const origin = configured && configured === current.origin ? configured : current.origin;
  return new URL(safePath, origin);
}
