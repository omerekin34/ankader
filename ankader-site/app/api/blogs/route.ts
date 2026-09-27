import { isAdminLoggedIn } from "@/lib/admin-auth";
import { blogErrorMessage, readBlogs, submitBlog } from "@/lib/blog-data";
import { NextResponse } from "next/server";

function text(value: unknown, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

export async function GET() {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }
  try {
    return NextResponse.json(await readBlogs());
  } catch (error) {
    return NextResponse.json({ error: blogErrorMessage(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    name?: unknown;
    email?: unknown;
    title?: unknown;
    body?: unknown;
  } | null;

  const name = text(body?.name, 80);
  const email = text(body?.email, 120).toLowerCase();
  const title = text(body?.title, 140);
  const writing = text(body?.body, 8000);

  if (name.length < 2 || !email.includes("@") || title.length < 3 || writing.length < 20) {
    return NextResponse.json({ error: "Ad, e-posta, başlık ve yazı gerekli." }, { status: 400 });
  }

  try {
    await submitBlog({ name, email, title, body: writing });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    const status = message === "NOT_MEMBER" ? 403 : 500;
    return NextResponse.json({ error: blogErrorMessage(error) }, { status });
  }

  return NextResponse.json({ ok: true });
}
