import { createSupabaseServer } from "@/lib/supabase-session";

export const ADMIN_COOKIE = "ankader_admin";

export async function isAdminLoggedIn() {
  try {
    const supabase = await createSupabaseServer();
    const { data, error } = await supabase.auth.getUser();
    return !error && Boolean(data.user);
  } catch {
    return false;
  }
}
