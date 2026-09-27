"use client";

import { blogDateLabel, blogExcerpt, type PublicBlogPost } from "@/lib/blog-types";
import { Check, PenLine } from "lucide-react";
import { useState } from "react";

const field =
  "w-full rounded-xl border border-secondary/10 bg-background px-4 py-3 text-sm outline-none transition duration-500 focus:border-primary";

export default function BlogBoard({ posts, loadError = "" }: { posts: PublicBlogPost[]; loadError?: string }) {
  const [open, setOpen] = useState(posts.length === 0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, title, body }),
      });
      const json = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        setError(json?.error || "Yazı gönderilemedi. Biraz sonra tekrar dene.");
        return;
      }
      setName("");
      setEmail("");
      setTitle("");
      setBody("");
      setSent(true);
    } catch {
      setError("Yazı gönderilemedi. Biraz sonra tekrar dene.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold">Yazılar</p>
          <p className="mt-1 text-sm leading-6 text-accent">
            {posts.length === 0 ? "Henüz yayınlanan yazı yok." : `${posts.length} yazı`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setOpen((current) => !current);
            setSent(false);
            setError("");
          }}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          <PenLine className="size-4" aria-hidden />
          Blog ekle
        </button>
      </div>

      {loadError ? <p className="mt-4 text-sm leading-6 text-red-600">{loadError}</p> : null}

      {open ? (
        sent ? (
          <div className="mt-6 rounded-2xl border border-primary/25 bg-primary/10 px-6 py-8 text-center">
            <span className="mx-auto inline-flex size-12 items-center justify-center rounded-full bg-primary text-white">
              <Check className="size-6" strokeWidth={2.5} aria-hidden />
            </span>
            <p className="mt-4 text-lg font-semibold">Yazın alındı</p>
            <p className="mt-2 text-sm leading-7 text-accent">
              Yönetim onayından sonra bu sayfada herkes görebilir.
            </p>
            <button type="button" onClick={() => setSent(false)} className="mt-5 text-sm font-semibold text-primary">
              Yeni yazı
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-3">
            <p className="text-sm leading-6 text-accent">
              Üye kaydındaki e-posta ile gönder. Onaylanınca yazı burada görünür.
            </p>
            <input required minLength={2} maxLength={80} value={name} onChange={(event) => setName(event.target.value)} placeholder="Ad soyad" className={field} />
            <input required type="email" maxLength={120} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Üyelik e-postası" className={field} />
            <input required minLength={3} maxLength={140} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Başlık" className={field} />
            <textarea required minLength={20} maxLength={8000} rows={8} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Yazın" className={field} />
            {error ? <p className="text-sm leading-6 text-red-600">{error}</p> : null}
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
            >
              {saving ? "Gönderiliyor..." : "Gönder"}
            </button>
          </form>
        )
      ) : null}

      {posts.length > 0 ? (
        <div className="mt-8 divide-y divide-secondary/10">
          {posts.map((post) => (
            <a key={post.id} href={`/uyeler/blog/${post.id}`} className="block py-6 first:pt-2">
              <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
                {[post.name, blogDateLabel(post.createdAt)].filter(Boolean).join(" · ")}
              </p>
              <h2 className="mt-2 text-2xl">{post.title}</h2>
              <p className="mt-2 text-sm leading-7 text-accent">{blogExcerpt(post.body)}</p>
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
