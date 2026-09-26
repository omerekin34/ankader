import { isAdminLoggedIn } from "@/lib/admin-auth";
import { randomBytes } from "crypto";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

const types: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function POST(request: Request) {
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
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "Dosya 8 MB’dan büyük." }, { status: 400 });
  }

  const name = `${Date.now()}-${randomBytes(4).toString("hex")}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({ src: `/uploads/${name}` });
}
