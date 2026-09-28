import { isAdminLoggedIn } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { randomBytes } from "crypto";
import { NextResponse } from "next/server";

const types: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const bucket = "site-photos";

export async function POST(request: Request) {
  try {
    if (!(await isAdminLoggedIn())) {
      return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
    }

    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Dosya yok." }, { status: 400 });
    }

    const ext = types[file.type];
    if (!ext) {
      return NextResponse.json({ error: "Yalnızca jpg, png, webp veya gif." }, { status: 400 });
    }
    if (file.size > 4 * 1024 * 1024) {
      return NextResponse.json({ error: "Dosya 4 MB’dan büyük. Daha küçük bir fotoğraf seç." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const created = await supabase.storage.createBucket(bucket, {
      public: true,
      fileSizeLimit: 4 * 1024 * 1024,
      allowedMimeTypes: Object.keys(types),
    });
    const alreadyThere = created.error?.message?.toLowerCase().includes("already exists");
    if (created.error && !alreadyThere) {
      return NextResponse.json({ error: "Fotoğraf alanı açılamadı." }, { status: 500 });
    }

    const name = `${Date.now()}-${randomBytes(4).toString("hex")}.${ext}`;
    const bytes = Buffer.from(await file.arrayBuffer());
    const uploaded = await supabase.storage.from(bucket).upload(name, bytes, {
      contentType: file.type,
      upsert: false,
    });
    if (uploaded.error) {
      return NextResponse.json({ error: "Fotoğraf kaydedilemedi." }, { status: 500 });
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(name);
    if (!data.publicUrl) {
      return NextResponse.json({ error: "Fotoğraf adresi alınamadı." }, { status: 500 });
    }
    return NextResponse.json({ src: data.publicUrl });
  } catch {
    return NextResponse.json({ error: "Fotoğraf yüklenemedi." }, { status: 500 });
  }
}
