"use client";

import { BrandLockup } from "@/components/Brand";
import ThemeToggle, { useAnkaderTheme } from "@/components/ThemeToggle";
import {
  Bell,
  BookOpen,
  Check,
  Clock,
  Home,
  LayoutDashboard,
  LogOut,
  HeartHandshake,
  ChevronDown,
  ClipboardList,
  MessageSquare,
  Search,
  Plus,
  Save,
  Trash2,
  Users,
  BarChart3,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { applicantStages, type ApplicantStage, type ApplicationStatus, type MembershipApplication } from "@/lib/application-types";
import type { SiteData } from "@/lib/site-types";

const tabs = [
  { id: "ozet", label: "Özet", icon: LayoutDashboard },
  { id: "anasayfa", label: "Anasayfa", icon: Home },
  { id: "gorunum", label: "Şerit ve alt bilgi", icon: Home },
  { id: "istatistik", label: "İstatistikler", icon: BarChart3 },
  { id: "faaliyet", label: "Faaliyetler", icon: BookOpen },
  { id: "kurul", label: "Yönetim Kurulu", icon: Users },
  { id: "uyeler", label: "Üyelerimiz", icon: Users },
  { id: "duyuru", label: "Duyurular", icon: Bell },
  { id: "hakkimizda", label: "Hakkımızda", icon: MessageSquare },
  { id: "tuzuk", label: "Tüzük", icon: BookOpen },
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

const statusTone: Record<ApplicationStatus, { badge: string; idle: string; on: string; Icon: typeof Check }> = {
  yeni: {
    badge: "bg-primary/15 text-primary",
    idle: "border-secondary/15 text-secondary hover:border-primary/50 hover:text-primary",
    on: "border-primary bg-primary text-white",
    Icon: ClipboardList,
  },
  inceleniyor: {
    badge: "bg-amber-500/15 text-amber-500",
    idle: "border-secondary/15 text-secondary hover:border-amber-500/50 hover:text-amber-500",
    on: "border-amber-500 bg-amber-500 text-white",
    Icon: Clock,
  },
  kabul: {
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

type TimeFilter = "tumu" | "bugun" | "hafta" | "ay" | "aralik";

const timeFilters: { id: TimeFilter; label: string }[] = [
  { id: "tumu", label: "Tüm zaman" },
  { id: "bugun", label: "Bugün" },
  { id: "hafta", label: "Bu hafta" },
  { id: "ay", label: "Bu ay" },
  { id: "aralik", label: "Tarih aralığı" },
];

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function applicationTime(value: string) {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? null : parsed;
}

function matchesTime(createdAt: string, when: TimeFilter, from: string, to: string) {
  if (when === "tumu") return true;
  const time = applicationTime(createdAt);
  if (time == null) return false;
  const now = new Date();
  if (when === "bugun") return time >= startOfDay(now).getTime();
  if (when === "hafta") {
    const start = startOfDay(now);
    const mondayOffset = (start.getDay() + 6) % 7;
    start.setDate(start.getDate() - mondayOffset);
    return time >= start.getTime();
  }
  if (when === "ay") return time >= new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  const fromTime = from ? new Date(`${from}T00:00:00`).getTime() : null;
  const toTime = to ? new Date(`${to}T23:59:59.999`).getTime() : null;
  if (fromTime != null && time < fromTime) return false;
  if (toTime != null && time > toTime) return false;
  return true;
}

type TabId = (typeof tabs)[number]["id"];

type OverviewKey = "yeni" | "inceleniyor" | "kabul" | "red" | "tumu" | "kurul" | "uyeler" | "duyuru" | "faaliyet";

function OverviewCard({
  label,
  value,
  active,
  Icon,
  onClick,
}: {
  label: string;
  value: number;
  active: boolean;
  Icon: typeof Check;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`admin-card rounded-3xl p-5 text-left transition ${
        active ? "ring-2 ring-primary" : "hover:-translate-y-0.5 hover:ring-1 hover:ring-primary/40"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-accent">{label}</p>
        <span
          className={`flex size-9 shrink-0 items-center justify-center rounded-2xl ${
            active ? "bg-primary text-white" : "bg-primary/10 text-primary"
          }`}
        >
          <Icon className="size-4" aria-hidden />
        </span>
      </div>
      <p className="mt-4 text-3xl font-extrabold tracking-tight">{value}</p>
      <p className="mt-2 text-xs font-semibold text-primary">{active ? "Seçili" : "Ayrıntıyı gör"}</p>
    </button>
  );
}

function ApplicationFacts({ item }: { item: MembershipApplication }) {
  const rows: [string, string, boolean?][] = [
    ["Başvuran", item.stage || "—"],
    ["E-posta", item.email || "—"],
    ["Telefon", item.phone || "—"],
    ["Lise", item.school || "—"],
    ["Üniversite", item.university || "—"],
    ["Bölüm / Alan", item.department || "—"],
    ["Sınıf / Mezuniyet", item.year || "—"],
    ["Şehir", item.city || "—"],
    ["Amaç", item.intent || "—", true],
    ["Destek alanı", item.support || "—", true],
    ["Not", item.note || "—", true],
  ];
  return (
    <dl className="mt-4 grid gap-3 border-t border-secondary/10 pt-4 text-sm sm:grid-cols-2">
      {rows.map(([label, value, wide]) => (
        <div key={label} className={wide ? "sm:col-span-2" : ""}>
          <dt className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">{label}</dt>
          <dd className="mt-1 leading-6 break-words">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

const overviewTitles: Record<OverviewKey, string> = {
  tumu: "Tüm başvurular",
  yeni: "Yeni başvurular",
  inceleniyor: "İncelenen başvurular",
  kabul: "Kabul edilen başvurular",
  red: "Reddedilen başvurular",
  kurul: "Yönetim kurulu",
  uyeler: "Sitedeki üyeler",
  duyuru: "Duyurular",
  faaliyet: "Faaliyetler",
};

function OverviewDetail({
  overview,
  overviewItem,
  setOverviewItem,
  applications,
  applicationsError,
  data,
  onOpenApplications,
  onOpenTab,
}: {
  overview: OverviewKey;
  overviewItem: string | null;
  setOverviewItem: (id: string | null) => void;
  applications: MembershipApplication[];
  applicationsError: string;
  data: SiteData;
  onOpenApplications: (status: ApplicationStatus | "") => void;
  onOpenTab: (tab: TabId) => void;
}) {
  const isApp = overview === "tumu" || overview === "yeni" || overview === "inceleniyor" || overview === "kabul" || overview === "red";
  const shown = isApp ? applications.filter((item) => overview === "tumu" || item.status === overview) : [];
  const stageLine = applicantStages
    .map((stage) => `${stage.replace(" öğrencisi", "")} ${shown.filter((item) => item.stage === stage).length}`)
    .join(" · ");

  function toggle(id: string) {
    setOverviewItem(overviewItem === id ? null : id);
  }

  function jump() {
    if (overview === "kurul") onOpenTab("kurul");
    else if (overview === "uyeler") onOpenTab("uyeler");
    else if (overview === "duyuru") onOpenTab("duyuru");
    else if (overview === "faaliyet") onOpenTab("faaliyet");
    else onOpenApplications(overview === "tumu" ? "" : overview);
  }

  const siteCount =
    overview === "kurul"
      ? data.board.length
      : overview === "uyeler"
        ? (data.members ?? []).length
        : overview === "duyuru"
          ? data.posts.length
          : data.hafiza.length;

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">Seçilen kart</p>
          <h3 className="mt-1 text-lg font-extrabold">{overviewTitles[overview]}</h3>
          <p className="mt-1 text-sm text-accent">
            {isApp
              ? applicationsError
                ? "Başvurular şu an okunamadı."
                : `${shown.length} kayıt · ${stageLine}`
              : `${siteCount} kayıt · satıra bas, bilgisi açılsın`}
          </p>
        </div>
        <button
          type="button"
          onClick={jump}
          className="rounded-2xl border border-primary/30 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10"
        >
          {isApp ? "Başvurular sekmesinde aç" : "Bu sekmeyi düzenle"}
        </button>
      </div>

      {isApp && applicationsError && (
        <p className="mt-4 rounded-2xl bg-red-500/10 px-4 py-3 text-sm text-red-500">{applicationsError}</p>
      )}

      {isApp && !applicationsError && shown.length === 0 && <p className="mt-4 text-sm text-accent">Bu grupta başvuru yok.</p>}

      {isApp && !applicationsError && shown.length > 0 && (
        <ul className="mt-4 grid max-h-[36rem] gap-2 overflow-auto pr-1">
          {shown.map((item) => {
            const open = overviewItem === item.id;
            return (
              <li key={item.id} className={`rounded-2xl border ${open ? "border-primary/40 bg-primary/5" : "border-secondary/10"}`}>
                <button type="button" aria-expanded={open} onClick={() => toggle(item.id)} className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left">
                  <span className="min-w-0">
                    <span className="block font-semibold">{item.name}</span>
                    <span className="mt-0.5 block truncate text-sm text-accent">
                      {item.createdAt ? new Date(item.createdAt).toLocaleString("tr-TR") : "Tarih yok"}
                      {item.stage ? ` · ${item.stage}` : ""}
                      {item.city ? ` · ${item.city}` : ""}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusTone[item.status].badge}`}>{statusLabel[item.status]}</span>
                    <ChevronDown className={`size-4 text-accent transition ${open ? "rotate-180" : ""}`} aria-hidden />
                  </span>
                </button>
                {open && (
                  <div className="px-4 pb-4">
                    <ApplicationFacts item={item} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {overview === "kurul" && (
        <OverviewRows
          empty="Kurulda kimse yok."
          openId={overviewItem}
          onToggle={toggle}
          rows={data.board.map((member, index) => ({
            id: `kurul-${index}`,
            title: member.name || "İsimsiz",
            meta: member.role || "Görev yazılmamış",
            facts: [
              ["Görev", member.role || "—"],
              ["Kısa ad", member.initials || "—"],
              ["E-posta", member.email || "—"],
              ["Telefon", member.phone || "—"],
              ["Fotoğraf", member.photo ? "Var" : "Yok"],
            ],
          }))}
        />
      )}

      {overview === "uyeler" && (
        <OverviewRows
          empty="Sitede listelenen üye yok."
          openId={overviewItem}
          onToggle={toggle}
          rows={(data.members ?? []).map((member, index) => ({
            id: `uye-${index}`,
            title: member.name || "İsimsiz",
            meta: [member.stage, member.university || member.school].filter(Boolean).join(" · ") || "Bilgi yok",
            facts: [
              ["Durum", member.stage || "—"],
              ["Lise", member.school || "—"],
              ["Üniversite", member.university || "—"],
              ["Bölüm", member.department || "—"],
              ["Sınıf / yıl", member.year || "—"],
            ],
          }))}
        />
      )}

      {overview === "duyuru" && (
        <OverviewRows
          empty="Duyuru yok."
          openId={overviewItem}
          onToggle={toggle}
          rows={data.posts.map((post, index) => ({
            id: post.slug || `duyuru-${index}`,
            title: post.title || "Başlıksız",
            meta: [post.day, post.month, post.tag].filter(Boolean).join(" · "),
            facts: [
              ["Tarih", [post.day, post.month].filter(Boolean).join(" ") || "—"],
              ["Etiket", post.tag || "—"],
              ["Özet", post.text || "—"],
              ["Metin", post.body || post.text || "—"],
            ],
          }))}
        />
      )}

      {overview === "faaliyet" && (
        <OverviewRows
          empty="Faaliyet yok."
          openId={overviewItem}
          onToggle={toggle}
          rows={data.hafiza.map((item, index) => ({
            id: `${item.src}-${index}`,
            title: item.caption || item.alt || "Faaliyet",
            meta: item.tags.filter(Boolean).join(" · ") || "Etiket yok",
            facts: [
              ["Yazı", item.caption || "—"],
              ["Kısa ad", item.alt || "—"],
              ["Etiket", item.tags.join(", ") || "—"],
            ],
          }))}
        />
      )}
    </>
  );
}

function OverviewRows({
  rows,
  empty,
  openId,
  onToggle,
}: {
  rows: { id: string; title: string; meta: string; facts: [string, string][] }[];
  empty: string;
  openId: string | null;
  onToggle: (id: string) => void;
}) {
  if (rows.length === 0) return <p className="mt-4 text-sm text-accent">{empty}</p>;
  return (
    <ul className="mt-4 grid max-h-[36rem] gap-2 overflow-auto pr-1">
      {rows.map((row) => {
        const open = openId === row.id;
        return (
          <li key={row.id} className={`rounded-2xl border ${open ? "border-primary/40 bg-primary/5" : "border-secondary/10"}`}>
            <button type="button" aria-expanded={open} onClick={() => onToggle(row.id)} className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left">
              <span className="min-w-0">
                <span className="block font-semibold">{row.title}</span>
                <span className="mt-0.5 block truncate text-sm text-accent">{row.meta}</span>
              </span>
              <ChevronDown className={`size-4 shrink-0 text-accent transition ${open ? "rotate-180" : ""}`} aria-hidden />
            </button>
            {open && (
              <dl className="grid gap-3 border-t border-secondary/10 px-4 py-4 text-sm sm:grid-cols-2">
                {row.facts.map(([label, value]) => (
                  <div key={label} className={label === "Özet" || label === "Metin" || label === "Açıklama" || label === "Yazı" ? "sm:col-span-2" : ""}>
                    <dt className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">{label}</dt>
                    <dd className="mt-1 leading-6 break-words">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </li>
        );
      })}
    </ul>
  );
}

type Notice = {
  id: number;
  kind: "ok" | "err";
  title: string;
  text: string;
};

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

function TagsField({ tags, onChange }: { tags: string[]; onChange: (tags: string[]) => void }) {
  const [text, setText] = useState(tags.join(", "));
  return (
    <label className="block text-sm font-medium text-secondary">
      Etiketler (virgülle)
      <input
        value={text}
        onChange={(event) => {
          const next = event.target.value;
          setText(next);
          onChange(
            next
              .split(",")
              .map((part) => part.trim())
              .filter(Boolean),
          );
        }}
        className="admin-field mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none"
      />
    </label>
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

function AddButton({ children, onClick }: { children: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(20,195,208,0.95)] transition hover:bg-primary/90"
    >
      <Plus className="size-4" strokeWidth={2.5} />
      {children}
    </button>
  );
}

function RemoveButton({ onClick, label = "Sil" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-500/15"
    >
      <Trash2 className="size-3.5" />
      {label}
    </button>
  );
}

function ListHead({ title, hint, action }: { title: string; hint?: string; action: ReactNode }) {
  return (
    <div className="admin-card flex flex-wrap items-center justify-between gap-3 rounded-3xl px-5 py-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-secondary">{title}</p>
        {hint ? <p className="mt-1 max-w-xl text-xs leading-5 text-accent">{hint}</p> : null}
      </div>
      {action}
    </div>
  );
}

function EditorCard({
  index,
  title,
  onRemove,
  removeLabel,
  extra,
  columns = "grid gap-3",
  children,
}: {
  index?: number;
  title: string;
  onRemove?: () => void;
  removeLabel?: string;
  extra?: ReactNode;
  columns?: string;
  children: ReactNode;
}) {
  return (
    <article className="admin-card rounded-3xl p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-secondary/10 pb-3">
        <div className="flex items-center gap-2.5">
          {index != null ? (
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {index + 1}
            </span>
          ) : null}
          <p className="text-sm font-semibold text-secondary">{title}</p>
        </div>
        <div className="flex items-center gap-2">
          {extra}
          {onRemove ? <RemoveButton onClick={onRemove} label={removeLabel} /> : null}
        </div>
      </div>
      <div className={columns}>{children}</div>
    </article>
  );
}

function PhotoField({
  label,
  value,
  onChange,
  onFile,
  shape = "wide",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onFile: (file: File) => Promise<void> | void;
  shape?: "wide" | "round";
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [other, setOther] = useState(false);
  const [busy, setBusy] = useState(false);
  const [over, setOver] = useState(false);

  async function take(file: File | undefined) {
    if (!file || !file.type.startsWith("image/")) return;
    setBusy(true);
    try {
      await onFile(file);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="sm:col-span-2">
      <p className="text-sm font-medium text-secondary">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
          className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
        >
          {busy ? "Yükleniyor..." : "Bilgisayardan seç"}
        </button>
        <button
          type="button"
          onClick={() => setOther((open) => !open)}
          className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition ${other ? "border-primary bg-primary/10 text-primary" : "border-secondary/15 text-secondary hover:border-primary/40"}`}
        >
          Başka şekilde
        </button>
        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-500/15"
          >
            Kaldır
          </button>
        ) : null}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          void take(file);
        }}
      />
      {other ? (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Bağlantı veya dosya yolu. Örnek: https://... ya da /hafiza/kare.jpg"
          className="admin-field mt-3 w-full rounded-2xl border px-4 py-3 text-sm outline-none"
        />
      ) : null}
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setOver(false);
          void take(event.dataTransfer.files?.[0]);
        }}
        className={`mt-3 rounded-2xl border border-dashed px-4 py-4 transition ${over ? "border-primary bg-primary/10" : "border-secondary/15 bg-secondary/[0.03]"}`}
      >
        {value ? (
          <img
            src={value}
            alt=""
            className={shape === "round" ? "size-20 rounded-full object-cover" : "h-36 w-full rounded-2xl object-cover"}
          />
        ) : (
          <p className="text-sm text-accent">Fotoğraf yok. Bilgisayardan seçebilir ya da dosyayı buraya bırakabilirsin.</p>
        )}
      </div>
    </div>
  );
}

async function uploadImage(file: File) {
  const body = new FormData();
  body.append("file", file);
  const response = await fetch("/api/upload", { method: "POST", body });
  const json = (await response.json()) as { src?: string; error?: string };
  if (!response.ok || !json.src) throw new Error(json.error || "Yüklenemedi.");
  return json.src;
}

export default function AdminShell({
  initialData,
  initialApplications,
  applicationsError = "",
}: {
  initialData: SiteData;
  initialApplications: MembershipApplication[];
  applicationsError?: string;
}) {
  const router = useRouter();
  const theme = useAnkaderTheme();
  const [tab, setTab] = useState<TabId>("ozet");
  const [data, setData] = useState<SiteData>({
    ...initialData,
    members: initialData.members ?? [],
  });
  const [applications, setApplications] = useState(initialApplications);
  const [appQuery, setAppQuery] = useState("");
  const [appStatus, setAppStatus] = useState<ApplicationStatus | "">("");
  const [appStage, setAppStage] = useState<ApplicantStage | "">("");
  const [appWhen, setAppWhen] = useState<TimeFilter>("tumu");
  const [appFrom, setAppFrom] = useState("");
  const [appTo, setAppTo] = useState("");
  const [appNewestFirst, setAppNewestFirst] = useState(true);
  const [appFiltersOpen, setAppFiltersOpen] = useState(false);
  const [overview, setOverview] = useState<OverviewKey>("tumu");
  const [overviewItem, setOverviewItem] = useState<string | null>(null);
  const [acceptAsk, setAcceptAsk] = useState<{ id: string; name: string } | null>(null);
  const overviewPanel = useRef<HTMLElement>(null);
  const acceptingIds = useRef(new Set<string>());
  const [notice, setNotice] = useState<Notice | null>(null);
  const [saving, setSaving] = useState(false);

  function toast(kind: Notice["kind"], title: string, text: string) {
    setNotice({ id: Date.now(), kind, title, text });
  }

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), notice.kind === "ok" ? 6000 : 8000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  async function save() {
    setSaving(true);
    try {
      const response = await fetch("/api/site", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        toast("err", "Kaydedilemedi", "Değişiklik siteye geçmedi. Oturumun açık mı, bir kez daha dene.");
        return;
      }
      toast("ok", "Siteye yansıdı", "Kaydettiğin değişiklik sitede hazır. Açık sekmeyi yenilemen yeterli.");
    } catch {
      toast("err", "Bağlantı koptu", "Kayıt siteye ulaşmadı. İnterneti kontrol edip tekrar dene.");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  async function setApplicationStatus(id: string, status: ApplicationStatus) {
    if (status === "kabul" && acceptingIds.current.has(id)) return;
    if (status === "kabul") acceptingIds.current.add(id);
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        const json = (await response.json().catch(() => null)) as { error?: string } | null;
        toast(
          "err",
          status === "kabul" ? "Kabul edilemedi" : "Durum değişmedi",
          json?.error || (status === "kabul" ? "Üye kaydı tamamlanamadı. Başvuru listede duruyor." : "Başvuru güncellenemedi. Tekrar dene."),
        );
        return;
      }
      if (status === "kabul") {
        setApplications((items) => items.filter((item) => item.id !== id));
        setOverviewItem((current) => (current === id ? null : current));
        toast("ok", "Üye oldu", "Kayıt üyelere eklendi ve başvuru listeden kalktı.");
        return;
      }
      setApplications((items) => items.map((item) => (item.id === id ? { ...item, status } : item)));
      toast("ok", "Başvuru güncellendi", `${statusLabel[status]} olarak işaretlendi.`);
    } catch {
      toast("err", status === "kabul" ? "Kabul edilemedi" : "Durum değişmedi", "Bağlantı koptu. Tekrar dene.");
    } finally {
      if (status === "kabul") acceptingIds.current.delete(id);
    }
  }

  async function removeApplication(id: string) {
    const response = await fetch(`/api/applications/${id}`, { method: "DELETE" });
    if (!response.ok) {
      toast("err", "Silinemedi", "Başvuru duruyor. Tekrar dene.");
      return;
    }
    setApplications((items) => items.filter((item) => item.id !== id));
    toast("ok", "Başvuru silindi", "Kayıt listeden kalktı.");
  }

  async function uploadAndNotify(file: File) {
    try {
      return await uploadImage(file);
    } catch (error) {
      toast("err", "Fotoğraf yüklenemedi", error instanceof Error ? error.message : "Dosyayı tekrar seç.");
      return "";
    }
  }

  const query = appQuery.trim().toLocaleLowerCase("tr-TR");
  const timedApplications = applications.filter((item) => {
    if (appStage && item.stage !== appStage) return false;
    if (!matchesTime(item.createdAt, appWhen, appFrom, appTo)) return false;
    if (!query) return true;
    const haystack = [item.name, item.email, item.phone, item.school, item.university, item.city, item.department]
      .join(" ")
      .toLocaleLowerCase("tr-TR");
    return haystack.includes(query);
  });
  const statusCounts = {
    yeni: timedApplications.filter((item) => item.status === "yeni").length,
    inceleniyor: timedApplications.filter((item) => item.status === "inceleniyor").length,
    kabul: timedApplications.filter((item) => item.status === "kabul").length,
    red: timedApplications.filter((item) => item.status === "red").length,
  };
  const visibleApplications = timedApplications
    .filter((item) => !appStatus || item.status === appStatus)
    .sort((a, b) => {
      const left = applicationTime(a.createdAt) ?? 0;
      const right = applicationTime(b.createdAt) ?? 0;
      return appNewestFirst ? right - left : left - right;
    });
  const filtersActive = Boolean(query || appStatus || appStage || appWhen !== "tumu" || appFrom || appTo || !appNewestFirst);

  function clearApplicationFilters() {
    setAppQuery("");
    setAppStatus("");
    setAppStage("");
    setAppWhen("tumu");
    setAppFrom("");
    setAppTo("");
    setAppNewestFirst(true);
  }

  function pickOverview(key: OverviewKey) {
    setOverview(key);
    setOverviewItem(null);
    window.requestAnimationFrame(() => {
      overviewPanel.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  function openApplicationsTab(status: ApplicationStatus | "") {
    setAppQuery("");
    setAppStage("");
    setAppWhen("tumu");
    setAppFrom("");
    setAppTo("");
    setAppNewestFirst(true);
    setAppStatus(status);
    setAppFiltersOpen(Boolean(status));
    setTab("basvuru");
  }

  const sortedApplications = [...applications].sort((a, b) => (applicationTime(b.createdAt) ?? 0) - (applicationTime(a.createdAt) ?? 0));
  const overviewCounts = {
    yeni: applications.filter((item) => item.status === "yeni").length,
    inceleniyor: applications.filter((item) => item.status === "inceleniyor").length,
    kabul: applications.filter((item) => item.status === "kabul").length,
    red: applications.filter((item) => item.status === "red").length,
    tumu: applications.length,
    kurul: data.board.length,
    uyeler: (data.members ?? []).length,
    duyuru: data.posts.length,
    faaliyet: data.hafiza.length,
  };

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
            <section className="grid gap-5">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Panel</p>
                <h2 className="mt-1 text-2xl font-extrabold">Özet</h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-accent">
                  Bir karta bas, altta o sayının kayıtları açılsın. Kayda bir kez daha basınca verdiği bilgiler görünsün.
                </p>
              </div>

              <div>
                <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-accent uppercase">Başvurular</p>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                  {(
                    [
                      ["tumu", "Toplam başvuru", overviewCounts.tumu, ClipboardList],
                      ["yeni", "Yeni başvuru", overviewCounts.yeni, ClipboardList],
                      ["inceleniyor", "İnceleniyor", overviewCounts.inceleniyor, Clock],
                      ["kabul", "Kabul edilen", overviewCounts.kabul, Check],
                      ["red", "Reddedildi", overviewCounts.red, X],
                    ] as const
                  ).map(([key, label, value, Icon]) => (
                    <OverviewCard key={key} label={label} value={value} active={overview === key} Icon={Icon} onClick={() => pickOverview(key)} />
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-accent uppercase">Site içeriği</p>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {(
                    [
                      ["kurul", "Kurul üyesi", overviewCounts.kurul, Users],
                      ["uyeler", "Sitedeki üye", overviewCounts.uyeler, Users],
                      ["duyuru", "Duyuru", overviewCounts.duyuru, Bell],
                      ["faaliyet", "Faaliyet", overviewCounts.faaliyet, BookOpen],
                    ] as const
                  ).map(([key, label, value, Icon]) => (
                    <OverviewCard key={key} label={label} value={value} active={overview === key} Icon={Icon} onClick={() => pickOverview(key)} />
                  ))}
                </div>
              </div>

              <article ref={overviewPanel} className="admin-card rounded-3xl p-5 sm:p-6">
                <OverviewDetail
                  overview={overview}
                  overviewItem={overviewItem}
                  setOverviewItem={setOverviewItem}
                  applications={sortedApplications}
                  applicationsError={applicationsError}
                  data={data}
                  onOpenApplications={openApplicationsTab}
                  onOpenTab={setTab}
                />
              </article>
            </section>
          )}

          {tab === "anasayfa" && (
            <section className="grid gap-5">
              <article className="grid gap-4 admin-card rounded-3xl p-6 backdrop-blur-md">
                <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Hero</p>
                <Field label="Üst satır" value={data.hero.eyebrow} onChange={(value) => setData({ ...data, hero: { ...data.hero, eyebrow: value } })} />
                <Field label="Başlık 1. satır" value={data.hero.title} onChange={(value) => setData({ ...data, hero: { ...data.hero, title: value } })} />
                <Field label="Başlık 2. satır" value={data.hero.highlight} onChange={(value) => setData({ ...data, hero: { ...data.hero, highlight: value } })} />
                <Field label="Başlık 3. satır (boş bırakılabilir)" value={data.hero.titleEnd} onChange={(value) => setData({ ...data, hero: { ...data.hero, titleEnd: value } })} />
                <Field multiline label="Alt metin" value={data.hero.subtitle} onChange={(value) => setData({ ...data, hero: { ...data.hero, subtitle: value } })} />
                <Field label="Buton yazısı" value={data.hero.primaryCta} onChange={(value) => setData({ ...data, hero: { ...data.hero, primaryCta: value } })} />
                <Field label="Buton linki" value={data.hero.ctaHref} onChange={(value) => setData({ ...data, hero: { ...data.hero, ctaHref: value } })} />
                <Field label="İkinci buton (boşsa gizlenir)" value={data.hero.secondaryCta} onChange={(value) => setData({ ...data, hero: { ...data.hero, secondaryCta: value } })} />
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-secondary/10 pt-4">
                  <p className="text-sm font-semibold text-secondary">Arka plan görselleri</p>
                  <AddButton onClick={() => setData({ ...data, hero: { ...data.hero, slides: ["/slides/hero-ziyaret.jpg", ...data.hero.slides] } })}>
                    Görsel ekle
                  </AddButton>
                </div>
                {data.hero.slides.map((src, index) => (
                  <EditorCard
                    key={`${src}-${index}`}
                    index={index}
                    title="Görsel"
                    onRemove={() =>
                      setData({
                        ...data,
                        hero: { ...data.hero, slides: data.hero.slides.filter((_, i) => i !== index) },
                      })
                    }
                  >
                    <PhotoField
                      label="Arka plan görseli"
                      value={src}
                      onChange={(value) => {
                        const slides = [...data.hero.slides];
                        slides[index] = value;
                        setData({ ...data, hero: { ...data.hero, slides } });
                      }}
                      onFile={async (file) => {
                        const uploaded = await uploadAndNotify(file);
                        if (!uploaded) return;
                        const slides = [...data.hero.slides];
                        slides[index] = uploaded;
                        setData({ ...data, hero: { ...data.hero, slides } });
                      }}
                    />
                  </EditorCard>
                ))}
              </article>

              <article className="grid gap-4 admin-card rounded-3xl p-6 backdrop-blur-md">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Katılım adımları</p>
                  <AddButton onClick={() => setData({ ...data, home: { ...data.home, steps: [{ n: "0", title: "Yeni adım", text: "" }, ...data.home.steps] } })}>
                    Adım ekle
                  </AddButton>
                </div>
                <Field label="Üst etiket" value={data.home.pathEyebrow} onChange={(value) => setData({ ...data, home: { ...data.home, pathEyebrow: value } })} />
                <Field label="Başlık" value={data.home.pathTitle} onChange={(value) => setData({ ...data, home: { ...data.home, pathTitle: value } })} />
                <Field multiline label="Açıklama" value={data.home.pathText} onChange={(value) => setData({ ...data, home: { ...data.home, pathText: value } })} />
                {data.home.steps.map((step, index) => (
                  <EditorCard
                    key={index}
                    index={index}
                    title={step.title || "Adım"}
                    onRemove={() => setData({ ...data, home: { ...data.home, steps: data.home.steps.filter((_, i) => i !== index) } })}
                  >
                    <Field label="Numara" value={step.n} onChange={(value) => {
                      const steps = [...data.home.steps];
                      steps[index] = { ...step, n: value };
                      setData({ ...data, home: { ...data.home, steps } });
                    }} />
                    <Field label="Başlık" value={step.title} onChange={(value) => {
                      const steps = [...data.home.steps];
                      steps[index] = { ...step, title: value };
                      setData({ ...data, home: { ...data.home, steps } });
                    }} />
                    <Field multiline label="Metin" value={step.text} onChange={(value) => {
                      const steps = [...data.home.steps];
                      steps[index] = { ...step, text: value };
                      setData({ ...data, home: { ...data.home, steps } });
                    }} />
                  </EditorCard>
                ))}
              </article>

              <article className="grid gap-4 admin-card rounded-3xl p-6 backdrop-blur-md">
                <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Bölüm başlıkları</p>
                <Field multiline label="Alıntı" value={data.home.quote} onChange={(value) => setData({ ...data, home: { ...data.home, quote: value } })} />
                <Field label="Kurumsal başlık" value={data.corporate.title} onChange={(value) => setData({ ...data, corporate: { ...data.corporate, title: value } })} />
                <Field multiline label="Kurumsal metin" value={data.corporate.text} onChange={(value) => setData({ ...data, corporate: { ...data.corporate, text: value } })} />
                <Field label="Misyon başlığı" value={data.corporate.missionTitle} onChange={(value) => setData({ ...data, corporate: { ...data.corporate, missionTitle: value } })} />
                <Field multiline label="Misyon" value={data.corporate.mission} onChange={(value) => setData({ ...data, corporate: { ...data.corporate, mission: value } })} />
                <Field label="Vizyon başlığı" value={data.corporate.visionTitle} onChange={(value) => setData({ ...data, corporate: { ...data.corporate, visionTitle: value } })} />
                <Field multiline label="Vizyon" value={data.corporate.vision} onChange={(value) => setData({ ...data, corporate: { ...data.corporate, vision: value } })} />
                <Field label="Faaliyet etiketi" value={data.home.activitiesEyebrow} onChange={(value) => setData({ ...data, home: { ...data.home, activitiesEyebrow: value } })} />
                <Field label="Faaliyet başlığı" value={data.home.activitiesTitle} onChange={(value) => setData({ ...data, home: { ...data.home, activitiesTitle: value } })} />
                <Field multiline label="Faaliyet açıklaması" value={data.home.activitiesText} onChange={(value) => setData({ ...data, home: { ...data.home, activitiesText: value } })} />
                <Field label="Yönetim etiketi" value={data.home.boardEyebrow} onChange={(value) => setData({ ...data, home: { ...data.home, boardEyebrow: value } })} />
                <Field label="Yönetim başlığı" value={data.home.boardTitle} onChange={(value) => setData({ ...data, home: { ...data.home, boardTitle: value } })} />
                <Field label="Duyuru etiketi" value={data.home.newsEyebrow} onChange={(value) => setData({ ...data, home: { ...data.home, newsEyebrow: value } })} />
                <Field label="Duyuru başlığı" value={data.home.newsTitle} onChange={(value) => setData({ ...data, home: { ...data.home, newsTitle: value } })} />
                <Field label="Alt bant etiketi" value={data.home.joinEyebrow} onChange={(value) => setData({ ...data, home: { ...data.home, joinEyebrow: value } })} />
                <Field multiline label="Alt bant başlığı" value={data.home.joinTitle} onChange={(value) => setData({ ...data, home: { ...data.home, joinTitle: value } })} />
              </article>
            </section>
          )}

          {tab === "gorunum" && (
            <section className="grid gap-4 admin-card rounded-3xl p-6 backdrop-blur-md">
              <p className="text-sm leading-7 text-accent">
                Üstteki kayan yazı, okul adı ve sayfanın en altındaki metinler. Kaydettikten sonra siteyi yenile.
              </p>
              <Field label="Kayan yazı" value={data.identity.ticker} onChange={(value) => setData({ ...data, identity: { ...data.identity, ticker: value } })} />
              <Field label="Okul adı" value={data.identity.schoolName} onChange={(value) => setData({ ...data, identity: { ...data.identity, schoolName: value } })} />
              <Field label="Okulun sitesi" value={data.identity.schoolUrl} onChange={(value) => setData({ ...data, identity: { ...data.identity, schoolUrl: value } })} />
              <Field label="Alt bilgi kısa cümle" value={data.identity.footerTagline} onChange={(value) => setData({ ...data, identity: { ...data.identity, footerTagline: value } })} />
              <Field multiline label="Alt bilgi mottosu" value={data.identity.footerMotto} onChange={(value) => setData({ ...data, identity: { ...data.identity, footerMotto: value } })} />
              <Field label="En alt satır" value={data.identity.footerCredit} onChange={(value) => setData({ ...data, identity: { ...data.identity, footerCredit: value } })} />
            </section>
          )}

          {tab === "istatistik" && (
            <section className="grid gap-4">
              <ListHead
                title="Sayı şeridi"
                hint="Anasayfadaki sayılar. Ekledikten sonra Kaydet’e bas."
                action={
                  <AddButton onClick={() => setData({ ...data, stats: [{ value: "0", label: "Yeni sayı", note: "" }, ...data.stats] })}>
                    İstatistik ekle
                  </AddButton>
                }
              />
              {data.stats.map((item, index) => (
                <EditorCard
                  key={index}
                  index={index}
                  title={item.label || "İstatistik"}
                  columns="grid gap-3 sm:grid-cols-3"
                  onRemove={() => setData({ ...data, stats: data.stats.filter((_, i) => i !== index) })}
                >
                  {item.label.trim().toLocaleLowerCase("tr-TR") === "tamamlanan proje" ? (
                    <label className="block text-sm font-medium text-secondary">
                      Sayı
                      <input
                        readOnly
                        value={String(data.hafiza.length)}
                        className="admin-field mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none"
                      />
                      <span className="mt-2 block text-xs leading-5 font-normal text-accent">
                        Faaliyetler sekmesindeki kare sayısı. Kare ekleyince veya silince bu sayı değişir.
                      </span>
                    </label>
                  ) : (
                    <Field label="Sayı" value={item.value} onChange={(value) => {
                      const stats = [...data.stats];
                      stats[index] = { ...item, value };
                      setData({ ...data, stats });
                    }} />
                  )}
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
                </EditorCard>
              ))}
            </section>
          )}

          {tab === "faaliyet" && (
            <section className="grid gap-4">
              <ListHead
                title="Faaliyet kartları"
                hint="Faaliyetler sayfasındaki kısa kartlar."
                action={
                  <AddButton onClick={() => setData({ ...data, activities: [{ title: "Yeni faaliyet", text: "" }, ...data.activities] })}>
                    Kart ekle
                  </AddButton>
                }
              />
              {data.activities.map((item, index) => (
                <EditorCard
                  key={index}
                  index={index}
                  title={item.title || "Faaliyet"}
                  onRemove={() => setData({ ...data, activities: data.activities.filter((_, i) => i !== index) })}
                >
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
                </EditorCard>
              ))}
              <article className="grid gap-3 admin-card rounded-3xl p-5">
                <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Faaliyetler sayfası alt kutusu</p>
                <Field label="Başlık" value={data.home.galleryNoteTitle} onChange={(value) => setData({ ...data, home: { ...data.home, galleryNoteTitle: value } })} />
                <Field multiline label="Metin" value={data.home.galleryNoteText} onChange={(value) => setData({ ...data, home: { ...data.home, galleryNoteText: value } })} />
              </article>
              <ListHead
                title="Hafıza kareleri"
                hint="Anasayfa ve faaliyetler sayfasındaki fotoğraflar. Yükle, yazıyı değiştir, kaydet."
                action={
                  <AddButton
                    onClick={() =>
                      setData({
                        ...data,
                        hafiza: [{ src: "", alt: "Yeni kare", caption: "", tags: ["Buluşmalar"] }, ...data.hafiza],
                      })
                    }
                  >
                    Kare ekle
                  </AddButton>
                }
              />
              {data.hafiza.map((item, index) => (
                <EditorCard
                  key={`${item.src}-${index}`}
                  index={index}
                  title={item.alt || "Kare"}
                  onRemove={() => setData({ ...data, hafiza: data.hafiza.filter((_, i) => i !== index) })}
                >
                  <PhotoField
                    label="Fotoğraf"
                    value={item.src}
                    onChange={(value) => {
                      const hafiza = [...data.hafiza];
                      hafiza[index] = { ...item, src: value };
                      setData({ ...data, hafiza });
                    }}
                    onFile={async (file) => {
                      const src = await uploadAndNotify(file);
                      if (!src) return;
                      const hafiza = [...data.hafiza];
                      hafiza[index] = { ...item, src };
                      setData({ ...data, hafiza });
                    }}
                  />
                  <Field label="Kısa ad" value={item.alt} onChange={(value) => {
                    const hafiza = [...data.hafiza];
                    hafiza[index] = { ...item, alt: value };
                    setData({ ...data, hafiza });
                  }} />
                  <Field multiline label="Yazı" value={item.caption} onChange={(value) => {
                    const hafiza = [...data.hafiza];
                    hafiza[index] = { ...item, caption: value };
                    setData({ ...data, hafiza });
                  }} />
                  <TagsField
                    tags={item.tags}
                    onChange={(tags) => {
                      const hafiza = [...data.hafiza];
                      hafiza[index] = { ...item, tags };
                      setData({ ...data, hafiza });
                    }}
                  />
                </EditorCard>
              ))}
            </section>
          )}

          {tab === "kurul" && (
            <section className="grid gap-4">
              <ListHead
                title="Yönetim kurulu"
                hint="İsim, görev, e-posta, telefon ve fotoğraf. Boş iletişim ve boş fotoğraf sitede görünmez; fotoğraf yoksa harfler durur."
                action={
                  <AddButton onClick={() => setData({ ...data, board: [{ initials: "YY", name: "Yeni Üye", role: "Yönetim Kurulu Üyesi", email: "", phone: "", photo: "" }, ...data.board] })}>
                    Üye ekle
                  </AddButton>
                }
              />
              {data.board.map((item, index) => (
                <EditorCard
                  key={index}
                  index={index}
                  title={item.name || "Üye"}
                  columns="grid gap-3 sm:grid-cols-2"
                  onRemove={() => setData({ ...data, board: data.board.filter((_, i) => i !== index) })}
                >
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
                  <Field label="E-posta" value={item.email || ""} onChange={(value) => {
                    const board = [...data.board];
                    board[index] = { ...item, email: value };
                    setData({ ...data, board });
                  }} />
                  <Field label="Telefon" value={item.phone || ""} onChange={(value) => {
                    const board = [...data.board];
                    board[index] = { ...item, phone: value };
                    setData({ ...data, board });
                  }} />
                  <PhotoField
                    label="Fotoğraf (boşsa harfler görünür)"
                    shape="round"
                    value={item.photo || ""}
                    onChange={(value) => {
                      const board = [...data.board];
                      board[index] = { ...item, photo: value };
                      setData({ ...data, board });
                    }}
                    onFile={async (file) => {
                      const uploaded = await uploadAndNotify(file);
                      if (!uploaded) return;
                      const board = [...data.board];
                      board[index] = { ...item, photo: uploaded };
                      setData({ ...data, board });
                    }}
                  />
                </EditorCard>
              ))}
            </section>
          )}

          {tab === "uyeler" && (
            <section className="grid gap-4">
              <ListHead
                title="Üye listesi"
                hint="Bu isimler /uyeler sayfasında alfabetik sıralanır. Kaydetmeyi unutma."
                action={
                  <AddButton onClick={() => setData({ ...data, members: [{ name: "", stage: "" }, ...(data.members ?? [])] })}>
                    İsim ekle
                  </AddButton>
                }
              />
              {(data.members ?? []).map((item, index) => (
                <EditorCard
                  key={index}
                  index={index}
                  title={item.name || "Yeni üye"}
                  columns="grid gap-3 sm:grid-cols-2"
                  onRemove={() =>
                    setData({
                      ...data,
                      members: (data.members ?? []).filter((_, i) => i !== index),
                    })
                  }
                >
                  <Field
                    label="Ad soyad"
                    value={item.name}
                    onChange={(value) => {
                      const members = [...(data.members ?? [])];
                      members[index] = { ...item, name: value };
                      setData({ ...data, members });
                    }}
                  />
                  <Field label="Lise" value={item.school || ""} onChange={(value) => {
                    const members = [...(data.members ?? [])];
                    members[index] = { ...item, school: value };
                    setData({ ...data, members });
                  }} />
                  <Field label="Üniversite" value={item.university || ""} onChange={(value) => {
                    const members = [...(data.members ?? [])];
                    members[index] = { ...item, university: value };
                    setData({ ...data, members });
                  }} />
                  <Field label="Bölüm" value={item.department || ""} onChange={(value) => {
                    const members = [...(data.members ?? [])];
                    members[index] = { ...item, department: value };
                    setData({ ...data, members });
                  }} />
                  <Field label="Sınıf / yıl" value={item.year || ""} onChange={(value) => {
                    const members = [...(data.members ?? [])];
                    members[index] = { ...item, year: value };
                    setData({ ...data, members });
                  }} />
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
                </EditorCard>
              ))}
            </section>
          )}

          {tab === "duyuru" && (
            <section className="grid gap-4">
              <ListHead
                title="Duyurular"
                hint="Listenin en üstündeki duyuru öne çıkar. Slug boşsa başlıktan üretilir."
                action={
                  <AddButton
                    onClick={() =>
                      setData({
                        ...data,
                        posts: [
                          { day: "01", month: "Oca", title: "Yeni duyuru", text: "Kısa açıklama", body: "", tag: "Genel", slug: "", image: "" },
                          ...data.posts,
                        ],
                      })
                    }
                  >
                    Duyuru ekle
                  </AddButton>
                }
              />
              {data.posts.map((item, index) => (
                <EditorCard
                  key={index}
                  index={index}
                  title={item.title || "Duyuru"}
                  columns="grid gap-3 sm:grid-cols-2"
                  onRemove={() => setData({ ...data, posts: data.posts.filter((_, i) => i !== index) })}
                >
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
                  <PhotoField
                    label="Fotoğraf (boşsa gizlenir)"
                    value={item.image || ""}
                    onChange={(value) => {
                      const posts = [...data.posts];
                      posts[index] = { ...item, image: value };
                      setData({ ...data, posts });
                    }}
                    onFile={async (file) => {
                      const uploaded = await uploadAndNotify(file);
                      if (!uploaded) return;
                      const posts = [...data.posts];
                      posts[index] = { ...item, image: uploaded };
                      setData({ ...data, posts });
                    }}
                  />
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
                </EditorCard>
              ))}
            </section>
          )}

          {tab === "hakkimizda" && (
            <section className="grid gap-5">
              <ListHead
                title="İlkeler"
                hint="Hakkımızda sayfasındaki değer kartları."
                action={
                  <AddButton onClick={() => setData({ ...data, about: { ...data.about, values: [{ title: "Yeni ilke", text: "" }, ...data.about.values] } })}>
                    İlke ekle
                  </AddButton>
                }
              />
              {(data.about.values ?? []).map((item, index) => (
                <EditorCard
                  key={index}
                  index={index}
                  title={item.title || "İlke"}
                  onRemove={() => setData({ ...data, about: { ...data.about, values: data.about.values.filter((_, i) => i !== index) } })}
                >
                  <Field label="İlke" value={item.title} onChange={(value) => {
                    const values = [...data.about.values];
                    values[index] = { ...item, title: value };
                    setData({ ...data, about: { ...data.about, values } });
                  }} />
                  <Field multiline label="Açıklama" value={item.text} onChange={(value) => {
                    const values = [...data.about.values];
                    values[index] = { ...item, text: value };
                    setData({ ...data, about: { ...data.about, values } });
                  }} />
                </EditorCard>
              ))}
              <article className="grid gap-4 admin-card rounded-3xl p-6 backdrop-blur-md">
                <Field label="Üst etiket" value={data.about.heroEyebrow} onChange={(value) => setData({ ...data, about: { ...data.about, heroEyebrow: value } })} />
                <Field label="Sayfa başlığı" value={data.about.heroTitle} onChange={(value) => setData({ ...data, about: { ...data.about, heroTitle: value } })} />
                <Field multiline label="Sayfa metni" value={data.about.heroText} onChange={(value) => setData({ ...data, about: { ...data.about, heroText: value } })} />
                <Field label="Hikâye etiketi" value={data.about.storyLabel} onChange={(value) => setData({ ...data, about: { ...data.about, storyLabel: value } })} />
                <Field label="Hikâye başlığı" value={data.about.storyTitle} onChange={(value) => setData({ ...data, about: { ...data.about, storyTitle: value } })} />
                <Field multiline label="Hikâye metni (paragraflar arasında boş satır)" value={data.about.storyText} onChange={(value) => setData({ ...data, about: { ...data.about, storyText: value } })} />
                <Field label="Alıntı etiketi" value={data.about.schoolQuoteLabel} onChange={(value) => setData({ ...data, about: { ...data.about, schoolQuoteLabel: value } })} />
                <Field label="Alıntı" value={data.about.schoolQuote} onChange={(value) => setData({ ...data, about: { ...data.about, schoolQuote: value } })} />
                <Field multiline label="Alıntı açıklaması" value={data.about.schoolQuoteText} onChange={(value) => setData({ ...data, about: { ...data.about, schoolQuoteText: value } })} />
                <Field label="İlke etiketi" value={data.about.principlesEyebrow} onChange={(value) => setData({ ...data, about: { ...data.about, principlesEyebrow: value } })} />
                <Field label="İlke başlığı" value={data.about.principlesTitle} onChange={(value) => setData({ ...data, about: { ...data.about, principlesTitle: value } })} />
                <Field multiline label="İlke açıklaması" value={data.about.principlesText} onChange={(value) => setData({ ...data, about: { ...data.about, principlesText: value } })} />
                <Field label="Ayet kaynağı" value={data.about.verseRef} onChange={(value) => setData({ ...data, about: { ...data.about, verseRef: value } })} />
                <Field multiline label="Ayet metni" value={data.about.verseText} onChange={(value) => setData({ ...data, about: { ...data.about, verseText: value } })} />
                <Field label="Ekip başlığı" value={data.about.teamTitle} onChange={(value) => setData({ ...data, about: { ...data.about, teamTitle: value } })} />
              </article>
            </section>
          )}

          {tab === "tuzuk" && (
            <section className="grid gap-4">
              <ListHead
                title="Tüzük maddeleri"
                action={
                  <AddButton onClick={() => setData({ ...data, tuzuk: { ...data.tuzuk, items: [{ n: "0", title: "Yeni madde", text: "" }, ...data.tuzuk.items] } })}>
                    Madde ekle
                  </AddButton>
                }
              />
              <article className="grid gap-4 admin-card rounded-3xl p-6">
                <Field label="Üst etiket" value={data.tuzuk.eyebrow} onChange={(value) => setData({ ...data, tuzuk: { ...data.tuzuk, eyebrow: value } })} />
                <Field label="Başlık" value={data.tuzuk.title} onChange={(value) => setData({ ...data, tuzuk: { ...data.tuzuk, title: value } })} />
                <Field multiline label="Giriş" value={data.tuzuk.text} onChange={(value) => setData({ ...data, tuzuk: { ...data.tuzuk, text: value } })} />
              </article>
              {data.tuzuk.items.map((item, index) => (
                <EditorCard
                  key={index}
                  index={index}
                  title={item.title || "Madde"}
                  onRemove={() => setData({ ...data, tuzuk: { ...data.tuzuk, items: data.tuzuk.items.filter((_, i) => i !== index) } })}
                >
                  <Field label="Numara" value={item.n} onChange={(value) => {
                    const items = [...data.tuzuk.items];
                    items[index] = { ...item, n: value };
                    setData({ ...data, tuzuk: { ...data.tuzuk, items } });
                  }} />
                  <Field label="Başlık" value={item.title} onChange={(value) => {
                    const items = [...data.tuzuk.items];
                    items[index] = { ...item, title: value };
                    setData({ ...data, tuzuk: { ...data.tuzuk, items } });
                  }} />
                  <Field multiline label="Metin" value={item.text} onChange={(value) => {
                    const items = [...data.tuzuk.items];
                    items[index] = { ...item, text: value };
                    setData({ ...data, tuzuk: { ...data.tuzuk, items } });
                  }} />
                </EditorCard>
              ))}
            </section>
          )}

          {tab === "basvuru" && (
            <section className="grid gap-4">
              <article className="admin-card rounded-3xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">Filtre</p>
                    <p className="mt-1 text-xs text-accent">
                      {visibleApplications.length} / {applications.length} başvuru
                      {filtersActive ? " · filtre uygulanıyor" : ""}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {filtersActive && (
                      <button type="button" onClick={clearApplicationFilters} className="text-sm font-semibold text-primary">
                        Filtreleri temizle
                      </button>
                    )}
                    <button
                      type="button"
                      aria-expanded={appFiltersOpen}
                      onClick={() => setAppFiltersOpen((open) => !open)}
                      className="inline-flex items-center gap-2 rounded-full border border-secondary/15 bg-background px-4 py-2 text-sm font-semibold text-secondary transition hover:border-primary/40"
                    >
                      {appFiltersOpen ? "Filtreyi kapat" : "Filtreyi aç"}
                      <ChevronDown className={`size-4 transition ${appFiltersOpen ? "rotate-180" : ""}`} aria-hidden />
                    </button>
                  </div>
                </div>
                {appFiltersOpen && (
                <div className="mt-4 grid gap-4">
                <label className="relative block">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-accent" aria-hidden />
                  <input
                    value={appQuery}
                    onChange={(event) => setAppQuery(event.target.value)}
                    placeholder="Ad, e-posta, telefon, okul veya şehir"
                    className="admin-field w-full rounded-2xl border py-2.5 pr-4 pl-10 text-sm outline-none"
                  />
                </label>
                <div>
                  <p className="mb-2 text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">Başvuru durumu</p>
                  <div className="flex flex-wrap gap-2">
                    <FilterChip active={!appStatus} onClick={() => setAppStatus("")} label={`Tümü ${timedApplications.length}`} />
                    {(["yeni", "inceleniyor", "kabul", "red"] as ApplicationStatus[]).map((status) => (
                      <FilterChip
                        key={status}
                        active={appStatus === status}
                        onClick={() => setAppStatus(appStatus === status ? "" : status)}
                        label={`${statusLabel[status]} ${statusCounts[status]}`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">Kim</p>
                  <div className="flex flex-wrap gap-2">
                    <FilterChip active={!appStage} onClick={() => setAppStage("")} label="Tümü" />
                    {applicantStages.map((stage) => (
                      <FilterChip
                        key={stage}
                        active={appStage === stage}
                        onClick={() => setAppStage(appStage === stage ? "" : stage)}
                        label={stage === "Lise öğrencisi" ? "Lise" : stage === "Üniversite öğrencisi" ? "Üniversite" : "Mezun"}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">Zaman</p>
                    <button
                      type="button"
                      onClick={() => setAppNewestFirst((current) => !current)}
                      className="text-xs font-semibold text-primary"
                    >
                      {appNewestFirst ? "En yeni üstte" : "En eski üstte"}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {timeFilters.map((item) => (
                      <FilterChip
                        key={item.id}
                        active={appWhen === item.id}
                        onClick={() => setAppWhen(item.id)}
                        label={item.label}
                      />
                    ))}
                  </div>
                  {appWhen === "aralik" && (
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <label className="grid gap-1 text-xs font-semibold text-accent">
                        Başlangıç
                        <input
                          type="date"
                          value={appFrom}
                          onChange={(event) => setAppFrom(event.target.value)}
                          className="admin-field rounded-xl border px-3 py-2 text-sm font-medium text-secondary outline-none"
                        />
                      </label>
                      <label className="grid gap-1 text-xs font-semibold text-accent">
                        Bitiş
                        <input
                          type="date"
                          value={appTo}
                          onChange={(event) => setAppTo(event.target.value)}
                          className="admin-field rounded-xl border px-3 py-2 text-sm font-medium text-secondary outline-none"
                        />
                      </label>
                    </div>
                  )}
                </div>
                </div>
                )}
              </article>
              {applicationsError && (
                <article className="rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-5" role="alert">
                  <p className="text-sm font-semibold text-red-600">Liste açılamadı</p>
                  <p className="mt-2 text-sm leading-7 text-red-600">{applicationsError}</p>
                </article>
              )}
              {!applicationsError && applications.length === 0 && (
                <article className="admin-card rounded-2xl p-8">
                  <p className="text-sm font-semibold">Henüz başvuru yok.</p>
                  <p className="mt-2 text-sm leading-7 text-accent">
                    Üye ol formundan gelen kayıtlar Supabase’deki başvurular tablosundan burada listelenir.
                  </p>
                </article>
              )}
              {!applicationsError && applications.length > 0 && visibleApplications.length === 0 && (
                <article className="admin-card rounded-2xl p-8">
                  <p className="text-sm font-semibold">Bu filtreye uyan başvuru yok.</p>
                  <button type="button" onClick={clearApplicationFilters} className="mt-3 text-sm font-semibold text-primary">
                    Filtreleri temizle
                  </button>
                </article>
              )}
              {visibleApplications.map((item) => (
                <article key={item.id} className="admin-card rounded-2xl p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold">{item.name}</p>
                      <p className="mt-1 text-sm text-accent">
                        {item.createdAt ? new Date(item.createdAt).toLocaleString("tr-TR") : "Tarih yok"} · {item.intent}
                      </p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTone[item.status].badge}`}>
                      {statusLabel[item.status]}
                    </span>
                  </div>
                  <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-xs tracking-[0.16em] text-accent uppercase">Başvuran</dt>
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
                  <div className="mt-5 flex flex-col gap-3 border-t border-secondary/10 pt-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="mb-2 text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">Başvuru durumu</p>
                      <div className="flex flex-wrap gap-2">
                        {(["yeni", "inceleniyor", "kabul", "red"] as ApplicationStatus[]).map((status) => {
                          const tone = statusTone[status];
                          const active = item.status === status;
                          const Icon = tone.Icon;
                          return (
                            <button
                              key={status}
                              type="button"
                              aria-pressed={active}
                              onClick={() => {
                                if (status === "kabul") {
                                  setAcceptAsk({ id: item.id, name: item.name });
                                  return;
                                }
                                void setApplicationStatus(item.id, status);
                              }}
                              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-semibold transition ${
                                active ? tone.on : `bg-background ${tone.idle}`
                              }`}
                            >
                              <Icon className="size-3.5" strokeWidth={2.5} aria-hidden />
                              {statusLabel[status]}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <RemoveButton onClick={() => removeApplication(item.id)} />
                  </div>
                </article>
              ))}
            </section>
          )}

          {tab === "iletisim" && (
            <section className="grid gap-4 admin-card rounded-3xl p-6 backdrop-blur-md">
              <Field label="Sayfa etiketi" value={data.contact.pageEyebrow} onChange={(value) => setData({ ...data, contact: { ...data.contact, pageEyebrow: value } })} />
              <Field label="Sayfa başlığı" value={data.contact.pageTitle} onChange={(value) => setData({ ...data, contact: { ...data.contact, pageTitle: value } })} />
              <Field multiline label="Sayfa metni" value={data.contact.pageText} onChange={(value) => setData({ ...data, contact: { ...data.contact, pageText: value } })} />
              <Field label="Form etiketi" value={data.contact.formEyebrow} onChange={(value) => setData({ ...data, contact: { ...data.contact, formEyebrow: value } })} />
              <Field multiline label="Form açıklaması" value={data.contact.formText} onChange={(value) => setData({ ...data, contact: { ...data.contact, formText: value } })} />
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
                WhatsApp’ta topluluğu aç → Davet bağlantısını kopyala → buraya yapıştır → Kaydet. Üst çubuktaki WhatsApp ikonu bu linke gider. Sağ alttaki yazma butonu telefon alanını kullanır.
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-secondary/10 pt-4">
                <p className="text-sm font-semibold text-secondary">Çalışma saatleri</p>
                <AddButton onClick={() => setData({ ...data, contact: { ...data.contact, schedule: [{ day: "Yeni gün", time: "" }, ...data.contact.schedule] } })}>
                  Satır ekle
                </AddButton>
              </div>
              {(data.contact.schedule ?? []).map((row, index) => (
                <EditorCard
                  key={index}
                  index={index}
                  title={row.day || "Gün"}
                  columns="grid gap-3 sm:grid-cols-2"
                  onRemove={() => setData({ ...data, contact: { ...data.contact, schedule: data.contact.schedule.filter((_, i) => i !== index) } })}
                >
                  <Field label="Gün" value={row.day} onChange={(value) => {
                    const schedule = [...data.contact.schedule];
                    schedule[index] = { ...row, day: value };
                    setData({ ...data, contact: { ...data.contact, schedule } });
                  }} />
                  <Field label="Saat" value={row.time} onChange={(value) => {
                    const schedule = [...data.contact.schedule];
                    schedule[index] = { ...row, time: value };
                    setData({ ...data, contact: { ...data.contact, schedule } });
                  }} />
                </EditorCard>
              ))}
            </section>
          )}

          {tab === "uye" && (
            <section className="grid gap-5">
              <article className="grid gap-4 admin-card rounded-2xl p-6">
                <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Üye ol üst yazısı</p>
                <Field label="Üst etiket" value={data.donate.pageEyebrow} onChange={(value) => setData({ ...data, donate: { ...data.donate, pageEyebrow: value } })} />
                <Field label="Başlık" value={data.donate.pageTitle} onChange={(value) => setData({ ...data, donate: { ...data.donate, pageTitle: value } })} />
                <Field multiline label="Açıklama" value={data.donate.pageText} onChange={(value) => setData({ ...data, donate: { ...data.donate, pageText: value } })} />
              </article>

              <article className="grid gap-4 admin-card rounded-2xl p-6">
                <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Bağış üst yazısı</p>
                <Field label="Üst etiket" value={data.donate.donateHeroEyebrow} onChange={(value) => setData({ ...data, donate: { ...data.donate, donateHeroEyebrow: value } })} />
                <Field label="Başlık" value={data.donate.donateHeroTitle} onChange={(value) => setData({ ...data, donate: { ...data.donate, donateHeroTitle: value } })} />
                <Field multiline label="Açıklama" value={data.donate.donateHeroText} onChange={(value) => setData({ ...data, donate: { ...data.donate, donateHeroText: value } })} />
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

              <ListHead
                title="Bağış tutarları"
                action={
                  <AddButton
                    onClick={() =>
                      setData({
                        ...data,
                        donate: { ...data.donate, amounts: ["Yeni tutar", ...data.donate.amounts] },
                      })
                    }
                  >
                    Tutar ekle
                  </AddButton>
                }
              />
              {(data.donate.amounts ?? []).map((amount, index) => (
                <EditorCard
                  key={index}
                  index={index}
                  title={amount || "Tutar"}
                  onRemove={
                    data.donate.amounts.length > 1
                      ? () =>
                          setData({
                            ...data,
                            donate: {
                              ...data.donate,
                              amounts: data.donate.amounts.filter((_, i) => i !== index),
                            },
                          })
                      : undefined
                  }
                >
                  <Field
                    label="Tutar"
                    value={amount}
                    onChange={(value) => {
                      const amounts = [...data.donate.amounts];
                      amounts[index] = value;
                      setData({ ...data, donate: { ...data.donate, amounts } });
                    }}
                  />
                </EditorCard>
              ))}

              <a href="/uye" className="text-sm font-semibold text-primary">
                Sayfayı aç →
              </a>
            </section>
          )}
        </div>
      </div>

      {acceptAsk ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-secondary/45 px-4" role="presentation" onClick={() => setAcceptAsk(null)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="accept-title"
            className="admin-card w-full max-w-md rounded-3xl p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <p id="accept-title" className="text-lg font-semibold text-secondary">Emin misin?</p>
            <p className="mt-2 text-sm leading-6 text-accent">
              {acceptAsk.name || "Bu kişi"} kabul edilince üye listesine geçer ve başvurusu buradan kalkar.
            </p>
            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => setAcceptAsk(null)}
                className="rounded-full border border-secondary/15 px-4 py-2 text-sm font-semibold text-secondary transition hover:border-primary/40"
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={() => {
                  const pending = acceptAsk;
                  setAcceptAsk(null);
                  void setApplicationStatus(pending.id, "kabul");
                }}
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                Evet, kabul et
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {notice && (
        <div className="pointer-events-none fixed right-4 bottom-4 z-[80] w-[min(22rem,calc(100vw-2rem))] sm:right-6 sm:bottom-6">
          <div
            key={notice.id}
            role={notice.kind === "err" ? "alert" : "status"}
            className={`admin-toast admin-card pointer-events-auto flex items-start gap-3 rounded-2xl border-l-4 px-4 py-3.5 ${
              notice.kind === "ok" ? "border-l-emerald-500" : "border-l-red-500"
            }`}
          >
            <span
              className={`mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full text-white ${
                notice.kind === "ok" ? "bg-emerald-500" : "bg-red-500"
              }`}
            >
              {notice.kind === "ok" ? <Check className="size-4" strokeWidth={3} /> : <X className="size-4" strokeWidth={3} />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-secondary">{notice.title}</p>
              <p className="mt-0.5 text-sm leading-5 text-accent">{notice.text}</p>
            </div>
            <button
              type="button"
              onClick={() => setNotice(null)}
              className="rounded-full p-1 text-accent hover:bg-secondary/5 hover:text-secondary"
              aria-label="Uyarıyı kapat"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
