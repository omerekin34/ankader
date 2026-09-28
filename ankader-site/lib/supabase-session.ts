import { supabaseProjectUrl } from "@/lib/supabase";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function supabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    ? supabaseProjectUrl(process.env.NEXT_PUBLIC_SUPABASE_URL)
    : "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";
  if (!url || !key) throw new Error("MISSING_ENV");
  return { url, key };
}

export async function createSupabaseRoute() {
  const { url, key } = supabaseEnv();
  const cookieStore = await cookies();
  const pending: { name: string; value: string; options?: CookieOptions }[] = [];
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          pending.push({ name, value, options });
          try {
            cookieStore.set(name, value, options);
          } catch {
            // Çerezler yanıt nesnesine ayrıca yazılır.
          }
        });
      },
    },
  });

  return {
    supabase,
    withCookies(response: NextResponse) {
      pending.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      return response;
    },
  };
}

export async function createSupabaseServer() {
  const { url, key } = supabaseEnv();
  const cookieStore = await cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Sunucu bileşeninde çerez yazılamaz. Oturumu middleware yeniler.
        }
      },
    },
  });
}
