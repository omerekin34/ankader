import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter((line) => line && !line.startsWith("#") && line.includes("="))
    .map((line) => {
      const index = line.indexOf("=");
      return [line.slice(0, index).trim(), line.slice(index + 1).trim().replace(/^["']|["']$/g, "")];
    }),
);

const url = env.NEXT_PUBLIC_SUPABASE_URL.replace(/\/rest\/v1\/?$/i, "").replace(/\/+$/, "");
const supabase = createClient(url, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const uyeler = await supabase.from("uyeler").select("notlar");
const notes = (uyeler.data ?? []).map((row) => (row.notlar ? String(row.notlar).trim().length : 0));
console.log("note-lengths", notes.join(","));
const basvuru = await supabase.from("basvurular").select("id", { count: "exact", head: true });
console.log("basvuru-count", basvuru.count ?? "na", basvuru.error ? "err" : "ok");
