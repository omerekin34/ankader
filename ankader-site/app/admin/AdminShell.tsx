"use client";

import { BrandLockup } from "@/components/Brand";
import ThemeToggle, { useAnkaderTheme } from "@/components/ThemeToggle";
import {
  Bell,
  BookOpen,
  Home,
  LayoutDashboard,
  LogOut,
  HeartHandshake,
  ClipboardList,
  MessageSquare,
  Save,
  Users,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ApplicationStatus, MembershipApplication } from "@/lib/application-types";
import type { SiteData } from "@/lib/site-types";

const tabs = [
  { id: "ozet", label: "Özet", icon: LayoutDashboard },
  { id: "anasayfa", label: "Anasayfa", icon: Home },
  { id: "istatistik", label: "İstatistikler", icon: BarChart3 },
  { id: "faaliyet", label: "Faaliyetler", icon: BookOpen },
  { id: "kurul", label: "Yönetim Kurulu", icon: Users },
  { id: "uyeler", label: "Üyelerimiz", icon: Users },
  { id: "duyuru", label: "Duyurular", icon: Bell },
  { id: "hakkimizda", label: "Hakkımızda", icon: MessageSquare },
  { id: "basvuru", label: "Başvurular", icon: ClipboardList },
  { id: "uye", label: "Üye / Bağış", icon: HeartHandshake },
  { id: "iletisim", label: "İletişim", icon: MessageSquare },
] as const;

const statusLabel: Record<ApplicationStatus, string> = {
  yeni: "Yeni",
  inceleniyor: "İnceleniyor",
  kabul: "Kabul",
  red: "Reddedildi",
};

type TabId = (typeof tabs)[number]["id"];

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  const cls =
    "admin-field mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none";
  return (
    <label className="block text-sm font-medium text-secondary">
      {label}
      {multiline ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={4} className={cls} />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} className={cls} />
      )}
    </label>
  );
}

export default function AdminShell({
  initialData,
  initialApplications,
}: {
  initialData: SiteData;
  initialApplications: MembershipApplication[];
}) {
  const router = useRouter();
  const theme = useAnkaderTheme();
  const [tab, setTab] = useState<TabId>("ozet");
  const [data, setData] = useState<SiteData>({
    ...initialData,
    members: initialData.members ?? [],
  });
  const [applications, setApplications] = useState(initialApplications);
  const [saved, setSaved] = useState("");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    setSaved("");
    const response = await fetch("/api/site", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(response.ok ? "Kaydedildi. Sitede hemen görünür." : "Kaydedilemedi.");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  async function setApplicationStatus(id: string, status: ApplicationStatus) {
    const response = await fetch(`/api/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (response.ok) {
      setApplications((items) => items.map((item) => (item.id === id ? { ...item, status } : item)));
      if (status === "kabul") {
        const accepted = applications.find((item) => item.id === id);
        if (accepted && !(data.members ?? []).some((member) => member.name.toLocaleLowerCase("tr-TR") === accepted.name.toLocaleLowerCase("tr-TR"))) {
          setData({ ...data, members: [...(data.members ?? []), { name: accepted.name }] });
        }
      }
    }
  }

  async function removeApplication(id: string) {
    const response = await fetch(`/api/applications/${id}`, { method: "DELETE" });
    if (response.ok) {
      setApplications((items) => items.filter((item) => item.id !== id));
    }
  }

  return (
    <div className="admin-shell">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 lg:px-6">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="admin-card sticky top-6 rounded-3xl p-4">
            <Link href="/" className="mb-4 block px-2">
              <BrandLockup tone={theme === "dark" ? "light" : "dark"} />
            </Link>
            <p className="px-3 text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">Yönetim</p>
            <h1 className="px-3 text-lg font-extrabold">Panel</h1>
            <nav className="mt-6 space-y-1">
              {tabs.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-left text-sm font-medium transition ${
                    tab === item.id ? "bg-primary text-white" : "text-secondary hover:bg-primary/10"
                  }`}
                >
                  <item.icon className="size-4" aria-hidden />
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="mt-6 space-y-2 border-t border-secondary/10 pt-4">
              <div className="flex items-center justify-between px-3 py-1">
                <span className="text-xs font-medium text-accent">{theme === "dark" ? "Koyu tema" : "Açık tema"}</span>
                <ThemeToggle surface="panel" />
              </div>
              <Link href="/" className="block rounded-2xl px-3 py-2 text-sm text-accent hover:bg-primary/10">
                Siteyi gör
              </Link>
              <button
                type="button"
                onClick={logout}
                className="flex w-full items-center gap-2 rounded-2xl px-3 py-2 text-sm text-accent hover:bg-primary/10"
              >
                <LogOut className="size-4" />
                Çıkış
              </button>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="admin-card mb-4 flex flex-wrap items-center justify-between gap-3 rounded-3xl px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex gap-2 overflow-x-auto lg:hidden">
                {tabs.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id)}
                    className={`whitespace-nowrap rounded-xl px-3 py-2 text-xs font-semibold ${
                      tab === item.id ? "bg-primary text-white" : "bg-background text-secondary"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="lg:hidden">
                <ThemeToggle surface="panel" />
              </div>
            </div>
            <p className="text-sm text-accent">{saved}</p>
            {tab !== "basvuru" && (
              <button
                type="button"
                onClick={save}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-60"
              >
                <Save className="size-4" />
                {saving ? "Kaydediliyor..." : "Değişiklikleri kaydet"}
              </button>
            )}
          </div>

          {tab === "ozet" && (
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                ["Yeni başvuru", applications.filter((item) => item.status === "yeni").length],
                ["Toplam başvuru", applications.length],
                ["Kabul edilen", applications.filter((item) => item.status === "kabul").length],
                ["Kurul üyesi", data.board.length],
              ].map(([label, value]) => (
                <article key={String(label)} className="admin-card rounded-3xl p-6 backdrop-blur-md">
                  <p className="text-sm text-accent">{label}</p>
                  <p className="mt-2 text-3xl font-extrabold">{value}</p>
                </article>
              ))}
              <article className="rounded-3xl border border-secondary bg-secondary p-6 text-white sm:col-span-2 xl:col-span-4">
                <p className="text-sm text-primary">Nasıl kullanılır?</p>
                <p className="mt-2 text-lg font-semibold">
                  Üye başvuruları Başvurular sekmesinde durur. Site metinlerini düzenleyip kaydedin.
                </p>
              </article>
            </section>
          )}

          {tab === "anasayfa" && (
            <section className="grid gap-4 admin-card rounded-3xl p-6 backdrop-blur-md">
              <Field label="Üst satır" value={data.hero.eyebrow} onChange={(value) => setData({ ...data, hero: { ...data.hero, eyebrow: value } })} />
              <Field label="Başlık başlangıcı" value={data.hero.title} onChange={(value) => setData({ ...data, hero: { ...data.hero, title: value } })} />
              <Field label="Vurgulu başlık" value={data.hero.highlight} onChange={(value) => setData({ ...data, hero: { ...data.hero, highlight: value } })} />
              <Field label="Başlık sonu" value={data.hero.titleEnd} onChange={(value) => setData({ ...data, hero: { ...data.hero, titleEnd: value } })} />
              <Field multiline label="Alt metin" value={data.hero.subtitle} onChange={(value) => setData({ ...data, hero: { ...data.hero, subtitle: value } })} />
              <Field label="Birincil buton" value={data.hero.primaryCta} onChange={(value) => setData({ ...data, hero: { ...data.hero, primaryCta: value } })} />
              <Field label="İkincil buton" value={data.hero.secondaryCta} onChange={(value) => setData({ ...data, hero: { ...data.hero, secondaryCta: value } })} />
              <Field label="Kurumsal başlık" value={data.corporate.title} onChange={(value) => setData({ ...data, corporate: { ...data.corporate, title: value } })} />
              <Field multiline label="Kurumsal metin" value={data.corporate.text} onChange={(value) => setData({ ...data, corporate: { ...data.corporate, text: value } })} />
              <Field multiline label="Misyon" value={data.corporate.mission} onChange={(value) => setData({ ...data, corporate: { ...data.corporate, mission: value } })} />
              <Field multiline label="Vizyon" value={data.corporate.vision} onChange={(value) => setData({ ...data, corporate: { ...data.corporate, vision: value } })} />
            </section>
          )}

          {tab === "istatistik" && (
            <section className="grid gap-4">
              {data.stats.map((item, index) => (
                <article key={index} className="grid gap-3 admin-card rounded-3xl p-5 backdrop-blur-md sm:grid-cols-3">
                  <Field label="Sayı" value={item.value} onChange={(value) => {
                    const stats = [...data.stats];
                    stats[index] = { ...item, value };
                    setData({ ...data, stats });
                  }} />
                  <Field label="Başlık" value={item.label} onChange={(value) => {
                    const stats = [...data.stats];
                    stats[index] = { ...item, label: value };
                    setData({ ...data, stats });
                  }} />
                  <Field label="Açıklama" value={item.note} onChange={(value) => {
                    const stats = [...data.stats];
                    stats[index] = { ...item, note: value };
                    setData({ ...data, stats });
                  }} />
                </article>
              ))}
            </section>
          )}

          {tab === "faaliyet" && (
            <section className="grid gap-4">
              {data.activities.map((item, index) => (
                <article key={index} className="grid gap-3 admin-card rounded-3xl p-5 backdrop-blur-md">
                  <Field label="Başlık" value={item.title} onChange={(value) => {
                    const activities = [...data.activities];
                    activities[index] = { ...item, title: value };
                    setData({ ...data, activities });
                  }} />
                  <Field multiline label="Açıklama" value={item.text} onChange={(value) => {
                    const activities = [...data.activities];
                    activities[index] = { ...item, text: value };
                    setData({ ...data, activities });
                  }} />
                </article>
              ))}
            </section>
          )}

          {tab === "kurul" && (
            <section className="grid gap-4">
              {data.board.map((item, index) => (
                <article key={index} className="grid gap-3 admin-card rounded-3xl p-5 backdrop-blur-md sm:grid-cols-3">
                  <Field label="Ad Soyad" value={item.name} onChange={(value) => {
                    const board = [...data.board];
                    const initials = value.split(" ").filter(Boolean).map((part) => part[0]).join("").slice(0, 2).toUpperCase() || item.initials;
                    board[index] = { ...item, name: value, initials };
                    setData({ ...data, board });
                  }} />
                  <Field label="Görev" value={item.role} onChange={(value) => {
                    const board = [...data.board];
                    board[index] = { ...item, role: value };
                    setData({ ...data, board });
                  }} />
                  <Field label="Kısaltma" value={item.initials} onChange={(value) => {
                    const board = [...data.board];
                    board[index] = { ...item, initials: value };
                    setData({ ...data, board });
                  }} />
                </article>
              ))}
              <button
                type="button"
                onClick={() => setData({ ...data, board: [...data.board, { initials: "YY", name: "Yeni Üye", role: "Yönetim Kurulu Üyesi" }] })}
                className="rounded-2xl border border-dashed border-primary px-4 py-3 text-sm font-semibold text-primary"
              >
                Üye ekle
              </button>
            </section>
          )}

          {tab === "uyeler" && (
            <section className="grid gap-4">
              <p className="text-sm text-accent">
                Bu isimler /uyeler sayfasında alfabetik sıralanır. Kaydetmeyi unutmayın.
              </p>
              {(data.members ?? []).map((item, index) => (
                <article key={index} className="grid gap-3 admin-card rounded-3xl p-5 backdrop-blur-md sm:grid-cols-[1fr_180px_auto] sm:items-end">
                  <Field
                    label={`Üye ${index + 1}`}
                    value={item.name}
                    onChange={(value) => {
                      const members = [...(data.members ?? [])];
                      members[index] = { ...item, name: value };
                      setData({ ...data, members });
                    }}
                  />
                  <label className="grid gap-2 text-sm">
                    <span className="text-xs tracking-[0.16em] text-accent uppercase">Durum</span>
                    <select
                      value={item.stage || ""}
                      onChange={(event) => {
                        const members = [...(data.members ?? [])];
                        members[index] = { ...item, stage: event.target.value };
                        setData({ ...data, members });
                      }}
                      className="admin-field rounded-xl border px-3 py-2.5"
                    >
                      {["Yönetim", "Lise", "Üniversite", "Mezun"].map((stage) => (
                        <option key={stage} value={stage}>
                          {stage}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="button"
                    className="mb-1 text-sm font-semibold text-red-600"
                    onClick={() =>
                      setData({
                        ...data,
                        members: (data.members ?? []).filter((_, i) => i !== index),
                      })
                    }
                  >
                    Sil
                  </button>
                </article>
              ))}
              <button
                type="button"
                onClick={() => setData({ ...data, members: [...(data.members ?? []), { name: "", stage: "" }] })}
                className="rounded-2xl border border-dashed border-primary px-4 py-3 text-sm font-semibold text-primary"
              >
                İsim ekle
              </button>
            </section>
          )}

          {tab === "duyuru" && (
            <section className="grid gap-4">
              <p className="text-sm leading-7 text-accent">
                Listenin en üstündeki duyuru öne çıkar. Etiket ve tam metin duyurular sayfasında görünür. Slug boşsa başlıktan üretilir.
              </p>
              {data.posts.map((item, index) => (
                <article key={index} className="grid gap-3 admin-card rounded-3xl p-5 backdrop-blur-md sm:grid-cols-2">
                  <Field label="Gün" value={item.day} onChange={(value) => {
                    const posts = [...data.posts];
                    posts[index] = { ...item, day: value };
                    setData({ ...data, posts });
                  }} />
                  <Field label="Ay" value={item.month} onChange={(value) => {
                    const posts = [...data.posts];
                    posts[index] = { ...item, month: value };
                    setData({ ...data, posts });
                  }} />
                  <label className="block text-sm font-medium text-secondary">
                    Etiket
                    <select
                      value={item.tag || "Genel"}
                      onChange={(event) => {
                        const posts = [...data.posts];
                        posts[index] = { ...item, tag: event.target.value };
                        setData({ ...data, posts });
                      }}
                      className="admin-field mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none"
                    >
                      <option>Genel</option>
                      <option>Kayıt</option>
                      <option>Etkinlik</option>
                      <option>Saha</option>
                    </select>
                  </label>
                  <Field label="Slug (isteğe bağlı)" value={item.slug || ""} onChange={(value) => {
                    const posts = [...data.posts];
                    posts[index] = { ...item, slug: value };
                    setData({ ...data, posts });
                  }} />
                  <div className="sm:col-span-2">
                    <Field label="Başlık" value={item.title} onChange={(value) => {
                      const posts = [...data.posts];
                      posts[index] = { ...item, title: value };
                      setData({ ...data, posts });
                    }} />
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Özet (kartlarda görünür)" value={item.text} onChange={(value) => {
                      const posts = [...data.posts];
                      posts[index] = { ...item, text: value };
                      setData({ ...data, posts });
                    }} />
                  </div>
                  <div className="sm:col-span-2">
                    <Field
                      multiline
                      label="Tam metin (paragraflar arasında boş satır bırak)"
                      value={item.body || ""}
                      onChange={(value) => {
                        const posts = [...data.posts];
                        posts[index] = { ...item, body: value };
                        setData({ ...data, posts });
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setData({ ...data, posts: data.posts.filter((_, i) => i !== index) })}
                    className="text-left text-sm font-semibold text-red-600"
                  >
                    Bu duyuruyu sil
                  </button>
                </article>
              ))}
              <button
                type="button"
                onClick={() =>
                  setData({
                    ...data,
                    posts: [
                      { day: "01", month: "Oca", title: "Yeni duyuru", text: "Kısa açıklama", body: "", tag: "Genel", slug: "" },
                      ...data.posts,
                    ],
                  })
                }
                className="rounded-2xl border border-dashed border-primary px-4 py-3 text-sm font-semibold text-primary"
              >
                Duyuru ekle
              </button>
            </section>
          )}

          {tab === "hakkimizda" && (
            <section className="grid gap-4 admin-card rounded-3xl p-6 backdrop-blur-md">
              <Field label="Hero başlık" value={data.about.heroTitle} onChange={(value) => setData({ ...data, about: { ...data.about, heroTitle: value } })} />
              <Field multiline label="Hero metin" value={data.about.heroText} onChange={(value) => setData({ ...data, about: { ...data.about, heroText: value } })} />
              <Field label="Hikaye başlığı" value={data.about.storyTitle} onChange={(value) => setData({ ...data, about: { ...data.about, storyTitle: value } })} />
              <Field multiline label="Hikaye metni" value={data.about.storyText} onChange={(value) => setData({ ...data, about: { ...data.about, storyText: value } })} />
            </section>
          )}

          {tab === "basvuru" && (
            <section className="grid gap-4">
              {applications.length === 0 && (
                <article className="admin-card rounded-2xl p-8">
                  <p className="text-sm font-semibold">Henüz başvuru yok.</p>
                  <p className="mt-2 text-sm leading-7 text-accent">
                    /uye sayfasından gelen öğrenci başvuruları burada listelenir.
                  </p>
                </article>
              )}
              {applications.map((item) => (
                <article key={item.id} className="admin-card rounded-2xl p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold">{item.name}</p>
                      <p className="mt-1 text-sm text-accent">
                        {new Date(item.createdAt).toLocaleString("tr-TR")} · {item.intent}
                      </p>
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {statusLabel[item.status]}
                    </span>
                  </div>
                  <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-xs tracking-[0.16em] text-accent uppercase">Durum</dt>
                      <dd className="mt-1">{item.stage || "—"}</dd>
                    </div>
                    <div>
                      <dt className="text-xs tracking-[0.16em] text-accent uppercase">E-posta</dt>
                      <dd className="mt-1">{item.email}</dd>
                    </div>
                    <div>
                      <dt className="text-xs tracking-[0.16em] text-accent uppercase">Telefon</dt>
                      <dd className="mt-1">{item.phone || "—"}</dd>
                    </div>
                    <div>
                      <dt className="text-xs tracking-[0.16em] text-accent uppercase">Lise</dt>
                      <dd className="mt-1">{item.school || "—"}</dd>
                    </div>
                    <div>
                      <dt className="text-xs tracking-[0.16em] text-accent uppercase">Üniversite</dt>
                      <dd className="mt-1">{item.university || "—"}</dd>
                    </div>
                    <div>
                      <dt className="text-xs tracking-[0.16em] text-accent uppercase">Bölüm / Alan</dt>
                      <dd className="mt-1">{item.department || "—"}</dd>
                    </div>
                    <div>
                      <dt className="text-xs tracking-[0.16em] text-accent uppercase">Sınıf / Mezuniyet</dt>
                      <dd className="mt-1">{item.year || "—"}</dd>
                    </div>
                    {item.stage !== "Mezun" && (
                    <div>
                      <dt className="text-xs tracking-[0.16em] text-accent uppercase">Öğrenci no</dt>
                      <dd className="mt-1">{item.studentNo || "—"}</dd>
                    </div>
                    )}
                    <div>
                      <dt className="text-xs tracking-[0.16em] text-accent uppercase">Şehir</dt>
                      <dd className="mt-1">{item.city || "—"}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-xs tracking-[0.16em] text-accent uppercase">Destek alanı</dt>
                      <dd className="mt-1">{item.support}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-xs tracking-[0.16em] text-accent uppercase">Not</dt>
                      <dd className="mt-1 leading-7">{item.note}</dd>
                    </div>
                  </dl>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {(["yeni", "inceleniyor", "kabul", "red"] as ApplicationStatus[]).map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setApplicationStatus(item.id, status)}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          item.status === status ? "bg-primary text-white" : "bg-background text-secondary"
                        }`}
                      >
                        {statusLabel[status]}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => removeApplication(item.id)}
                      className="ml-auto text-xs font-semibold text-red-600"
                    >
                      Sil
                    </button>
                  </div>
                </article>
              ))}
            </section>
          )}

          {tab === "iletisim" && (
            <section className="grid gap-4 admin-card rounded-3xl p-6 backdrop-blur-md">
              <Field label="Adres" value={data.contact.address} onChange={(value) => setData({ ...data, contact: { ...data.contact, address: value } })} />
              <Field label="Harita enlem" value={data.contact.mapLat ?? ""} onChange={(value) => setData({ ...data, contact: { ...data.contact, mapLat: value } })} />
              <Field label="Harita boylam" value={data.contact.mapLng ?? ""} onChange={(value) => setData({ ...data, contact: { ...data.contact, mapLng: value } })} />
              <Field label="Google Maps linki" value={data.contact.mapsUrl ?? ""} onChange={(value) => setData({ ...data, contact: { ...data.contact, mapsUrl: value } })} />
              <Field label="E-posta" value={data.contact.email} onChange={(value) => setData({ ...data, contact: { ...data.contact, email: value } })} />
              <Field label="Telefon" value={data.contact.phone} onChange={(value) => setData({ ...data, contact: { ...data.contact, phone: value } })} />
              <Field label="Çalışma saatleri" value={data.contact.hours} onChange={(value) => setData({ ...data, contact: { ...data.contact, hours: value } })} />
              <Field label="Dernek sicil no" value={data.contact.registry} onChange={(value) => setData({ ...data, contact: { ...data.contact, registry: value } })} />
              <Field label="Instagram" value={data.contact.instagram} onChange={(value) => setData({ ...data, contact: { ...data.contact, instagram: value } })} />
              <Field label="Twitter / X" value={data.contact.twitter} onChange={(value) => setData({ ...data, contact: { ...data.contact, twitter: value } })} />
              <Field label="LinkedIn" value={data.contact.linkedin} onChange={(value) => setData({ ...data, contact: { ...data.contact, linkedin: value } })} />
              <Field
                label="WhatsApp topluluk daveti (chat.whatsapp.com/...)"
                value={data.contact.whatsappCommunity ?? ""}
                onChange={(value) => setData({ ...data, contact: { ...data.contact, whatsappCommunity: value } })}
              />
              <p className="text-sm leading-6 text-accent">
                WhatsApp’ta topluluğu aç → Davet bağlantısını kopyala → buraya yapıştır → Kaydet. Üst çubuktaki WhatsApp ikonu bu linke gider.
              </p>
            </section>
          )}

          {tab === "uye" && (
            <section className="grid gap-5">
              <article className="grid gap-4 admin-card rounded-2xl p-6">
                <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Sayfa metinleri</p>
                <Field label="Üst etiket" value={data.donate.pageEyebrow} onChange={(value) => setData({ ...data, donate: { ...data.donate, pageEyebrow: value } })} />
                <Field label="Sayfa başlığı" value={data.donate.pageTitle} onChange={(value) => setData({ ...data, donate: { ...data.donate, pageTitle: value } })} />
                <Field multiline label="Sayfa açıklaması" value={data.donate.pageText} onChange={(value) => setData({ ...data, donate: { ...data.donate, pageText: value } })} />
              </article>

              <article className="grid gap-4 admin-card rounded-2xl p-6">
                <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Üyelik kutusu</p>
                <Field label="Başlık" value={data.donate.joinTitle} onChange={(value) => setData({ ...data, donate: { ...data.donate, joinTitle: value } })} />
                <Field multiline label="Açıklama" value={data.donate.joinText} onChange={(value) => setData({ ...data, donate: { ...data.donate, joinText: value } })} />
              </article>

              <article className="grid gap-4 admin-card rounded-2xl p-6">
                <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Bağış kutusu</p>
                <Field label="Başlık" value={data.donate.donateTitle} onChange={(value) => setData({ ...data, donate: { ...data.donate, donateTitle: value } })} />
                <Field multiline label="Açıklama" value={data.donate.donateText} onChange={(value) => setData({ ...data, donate: { ...data.donate, donateText: value } })} />
                <Field label="Hesap adı" value={data.donate.accountName} onChange={(value) => setData({ ...data, donate: { ...data.donate, accountName: value } })} />
                <Field label="Banka" value={data.donate.bank} onChange={(value) => setData({ ...data, donate: { ...data.donate, bank: value } })} />
                <Field label="IBAN" value={data.donate.iban} onChange={(value) => setData({ ...data, donate: { ...data.donate, iban: value } })} />
                <Field multiline label="Dekont notu" value={data.donate.note} onChange={(value) => setData({ ...data, donate: { ...data.donate, note: value } })} />
              </article>

              <article className="grid gap-4 admin-card rounded-2xl p-6">
                <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Bağış tutarları</p>
                {(data.donate.amounts ?? []).map((amount, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-1">
                      <Field
                        label={`Tutar ${index + 1}`}
                        value={amount}
                        onChange={(value) => {
                          const amounts = [...data.donate.amounts];
                          amounts[index] = value;
                          setData({ ...data, donate: { ...data.donate, amounts } });
                        }}
                      />
                    </div>
                    {data.donate.amounts.length > 1 && (
                      <button
                        type="button"
                        className="mt-8 text-sm font-semibold text-red-600"
                        onClick={() =>
                          setData({
                            ...data,
                            donate: {
                              ...data.donate,
                              amounts: data.donate.amounts.filter((_, i) => i !== index),
                            },
                          })
                        }
                      >
                        Sil
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setData({
                      ...data,
                      donate: { ...data.donate, amounts: [...data.donate.amounts, "Yeni tutar"] },
                    })
                  }
                  className="rounded-2xl border border-dashed border-primary px-4 py-3 text-sm font-semibold text-primary"
                >
                  Tutar ekle
                </button>
              </article>

              <a href="/uye" className="text-sm font-semibold text-primary">
                Sayfayı aç →
              </a>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
