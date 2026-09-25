import { cookies } from "next/headers";

export const ADMIN_COOKIE = "ankader_admin";

export function adminUser() {
  return process.env.ADMIN_USER || "admin";
}

export function adminPassword() {
  return process.env.ADMIN_PASSWORD || "ankader2026";
}

export function signAdminToken() {
  return `ok.${process.env.ADMIN_SECRET || "ankader-dev-secret"}`;
}

export function isValidAdminToken(token?: string | null) {
  return Boolean(token) && token === signAdminToken();
}

export async function isAdminLoggedIn() {
  const store = await cookies();
  return isValidAdminToken(store.get(ADMIN_COOKIE)?.value);
}
