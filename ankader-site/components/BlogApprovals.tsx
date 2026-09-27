"use client";

import { blogDateLabel, type BlogPost, type BlogStatus } from "@/lib/blog-types";
import { Check, Clock, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const label: Record<BlogStatus, string> = {
  bekliyor: "Bekliyor",
  yayinda: "Yayında",
  red: "Reddedildi",
};

const tone: Record<BlogStatus, { badge: string; idle: string; on: string; Icon: typeof Check }> = {
  bekliyor: {
    badge: "bg-amber-500/15 text-amber-500",
    idle: "border-secondary/15 text-secondary hover:border-amber-500/50 hover:text-amber-500",
    on: "border-amber-500 bg-amber-500 text-white",
    Icon: Clock,
  },
  yayinda: {
    badge: "bg-emerald-500/15 text-emerald-500",
    idle: "border-secondary/15 text-secondary hover:border-emerald-500/50 hover:text-emerald-500",
    on: "border-emerald-500 bg-emerald-500 text-white",
    Icon: Check,
  },
  red: {
    badge: "bg-red-500/15 text-red-500",
    idle: "border-secondary/15 text-secondary hover:border-red-500/50 hover:text-red-500",
    on: "border-red-500 bg-red-500 text-white",
    Icon: X,
  },
};

export default function BlogApprovals({
  initialBlogs,
  error = "",
  onToast,
}: {
  initialBlogs: BlogPost[];
  error?: string;
  onToast: (kind: "ok" | "err", title: string, text: string) => void;
}) {
  const router = useRouter();
  const [blogs, setBlogs] = useState(initialBlogs);
  const [filter, setFilter] = useState<BlogStatus | "">("bekliyor");
  const [ask, setAsk] = useState<BlogPost | null>(null);
  const [busyId, setBusyId] = useState("");

  const visible = blogs.filter((item) => !filter || item.status === filter);
  const counts = {
    bekliyor: blogs.filter((item) => item.status === "bekliyor").length,
    yayinda: blogs.filter((item) => item.status === "yayinda").length,
    red: blogs.filter((item) => item.status === "red").length,
  };

  async function setStatus(id: string, status: BlogStatus) {
    setBusyId(id);
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const json = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        onToast("err", "Durum değişmedi", json?.error || "Yazı güncellenemedi. Tekrar dene.");
        return;
      }
      setBlogs((items) => items.map((item) => (item.id === id ? { ...item, status } : item)));
      onToast("ok", status === "yayinda" ? "Yayında" : "Yazı güncellendi", status === "yayinda" ? "Yazı sitede görünür." : `${label[status]} olarak işaretlendi.`);
      router.refresh();
    } catch {
      onToast("err", "Durum değişmedi", "Bağlantı koptu. Tekrar dene.");
    } finally {
      setBusyId("");
    }
  }

  async function remove(id: string) {
    setBusyId(id);
    try {
      const response = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      const json = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        onToast("err", "Silinemedi", json?.error || "Yazı duruyor. Tekrar dene.");
        return;
      }
      setBlogs((items) => items.filter((item) => item.id !== id));
      onToast("ok", "Yazı silindi", "Kayıt listeden kalktı.");
      router.refresh();
    } catch {
      onToast("err", "Silinemedi", "Bağlantı koptu. Tekrar dene.");
    } finally {
      setBusyId("");
    }
  }

  return (
    <section className="grid gap-4">
      <article className="admin-card rounded-3xl p-5">
        <p className="text-sm font-semibold">Blog onayları</p>
        <p className="mt-1 text-xs leading-5 text-accent">
          Üye yazısı onaylanınca sitede herkes görür. E-posta, üye kaydıyla eşleşmeden yazı düşmez.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <FilterChip active={!filter} onClick={() => setFilter("")} label={`Tümü ${blogs.length}`} />
          {(["bekliyor", "yayinda", "red"] as BlogStatus[]).map((status) => (
            <FilterChip
              key={status}
              active={filter === status}
              onClick={() => setFilter(filter === status ? "" : status)}
              label={`${label[status]} ${counts[status]}`}
            />
          ))}
        </div>
      </article>

      {error ? (
        <article className="rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-5" role="alert">
          <p className="text-sm font-semibold text-red-600">Liste açılamadı</p>
          <p className="mt-2 text-sm leading-7 text-red-600">{error}</p>
        </article>
      ) : null}

      {!error && visible.length === 0 ? (
        <article className="admin-card rounded-2xl p-8">
          <p className="text-sm font-semibold">{filter === "bekliyor" ? "Onay bekleyen yazı yok." : "Bu filtrede yazı yok."}</p>
        </article>
      ) : null}

      {visible.map((item) => (
        <article key={item.id} className="admin-card rounded-2xl p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-lg font-semibold">{item.title || "Başlıksız"}</p>
              <p className="mt-1 text-sm text-accent">
                {[item.name, blogDateLabel(item.createdAt)].filter(Boolean).join(" · ")}
              </p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tone[item.status].badge}`}>{label[item.status]}</span>
          </div>
          <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs tracking-[0.16em] text-accent uppercase">E-posta</dt>
              <dd className="mt-1">{item.email || "—"}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs tracking-[0.16em] text-accent uppercase">Yazı</dt>
              <dd className="mt-1 leading-7 whitespace-pre-wrap">{item.body}</dd>
            </div>
          </dl>
          <div className="mt-5 flex flex-col gap-3 border-t border-secondary/10 pt-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {(["bekliyor", "yayinda", "red"] as BlogStatus[]).map((status) => {
                const itemTone = tone[status];
                const Icon = itemTone.Icon;
                const active = item.status === status;
                return (
                  <button
                    key={status}
                    type="button"
                    disabled={busyId === item.id}
                    aria-pressed={active}
                    onClick={() => {
                      if (active) return;
                      if (status === "yayinda") {
                        setAsk(item);
                        return;
                      }
                      void setStatus(item.id, status);
                    }}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-semibold transition disabled:opacity-60 ${
                      active ? itemTone.on : `bg-background ${itemTone.idle}`
                    }`}
                  >
                    <Icon className="size-3.5" strokeWidth={2.5} aria-hidden />
                    {label[status]}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              disabled={busyId === item.id}
              onClick={() => void remove(item.id)}
              className="inline-flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-500/15 disabled:opacity-60"
            >
              <Trash2 className="size-3.5" />
              Sil
            </button>
          </div>
        </article>
      ))}

      <a href="/uyeler/blog" className="text-sm font-semibold text-primary">
        Sayfayı aç →
      </a>

      {ask ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-secondary/45 px-4" role="presentation" onClick={() => setAsk(null)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="blog-approve-title"
            className="admin-card w-full max-w-md rounded-3xl p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <p id="blog-approve-title" className="text-lg font-semibold text-secondary">Emin misin?</p>
            <p className="mt-2 text-sm leading-6 text-accent">
              “{ask.title || "Bu yazı"}” onaylanınca sitede herkes görebilir.
            </p>
            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => setAsk(null)}
                className="rounded-full border border-secondary/15 px-4 py-2 text-sm font-semibold text-secondary transition hover:border-primary/40"
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={() => {
                  const pending = ask;
                  setAsk(null);
                  void setStatus(pending.id, "yayinda");
                }}
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                Evet, yayınla
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function FilterChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
        active ? "border-primary bg-primary text-white" : "border-secondary/15 bg-background text-secondary hover:border-primary/40"
      }`}
    >
      {label}
    </button>
  );
}
