import { isAdminLoggedIn } from "@/lib/admin-auth";
import { blogErrorMessage, deleteBlog, updateBlogStatus } from "@/lib/blog-data";
import { blogStatuses, type BlogStatus } from "@/lib/blog-types";
import { NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json().catch(() => null)) as { status?: BlogStatus } | null;
  if (!body?.status || !blogStatuses.includes(body.status)) {
    return NextResponse.json({ error: "Geçersiz durum." }, { status: 400 });
  }

  try {
    await updateBlogStatus(id, body.status);
  } catch (error) {
    const missing = error instanceof Error && error.message === "NOT_FOUND";
    return NextResponse.json({ error: blogErrorMessage(error) }, { status: missing ? 404 : 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const { id } = await params;
  try {
    await deleteBlog(id);
  } catch (error) {
    const missing = error instanceof Error && error.message === "NOT_FOUND";
    return NextResponse.json({ error: blogErrorMessage(error) }, { status: missing ? 404 : 500 });
  }

  return NextResponse.json({ ok: true });
}
