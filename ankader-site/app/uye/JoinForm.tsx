"use client";

import FilterCombobox from "@/components/FilterCombobox";
import type { ApplicantStage } from "@/lib/application-types";
import {
  departments,
  graduateYears,
  highSchoolTracks,
  highSchoolYears,
  highSchools,
  universities,
  universityYears,
} from "@/lib/form-options";
import { insertBasvuru } from "@/lib/supabase";
import { Check, Send } from "lucide-react";
import { useState } from "react";

const stages: ApplicantStage[] = ["Lise öğrencisi", "Üniversite öğrencisi", "Mezun"];
const intents = ["Üye olmak istiyorum", "Gönüllü olmak istiyorum", "Destek / yardım almak istiyorum"];
const supports = [
  "Eğitim ve burs desteği",
  "Mentorluk",
  "Saha / gönüllülük",
  "Etkinlik organizasyonu",
  "Diğer",
];

const empty = {
  name: "",
  email: "",
  phone: "",
  stage: "Lise öğrencisi" as ApplicantStage,
  school: "",
  university: "",
  department: "",
  year: "11. sınıf",
  city: "",
  intent: "Üye olmak istiyorum",
  support: "Eğitim ve burs desteği",
  note: "",
};

function defaultsFor(stage: ApplicantStage) {
  if (stage === "Lise öğrencisi") {
    return { school: "", university: "", department: "", year: "11. sınıf" };
  }
  if (stage === "Üniversite öğrencisi") {
    return { school: "", university: "", department: "", year: "1. sınıf" };
  }
  return { school: "", university: "", department: "", year: "2024" };
}

export default function JoinForm() {
  const [form, setForm] = useState(empty);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function set<K extends keyof typeof empty>(key: K, value: (typeof empty)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function setStage(stage: ApplicantStage) {
    setForm((current) => ({ ...current, stage, ...defaultsFor(stage) }));
  }

  function education() {
    const school = form.school.trim();
    const university = form.university.trim();
    const year = form.year.trim();
    const department = form.department.trim();
    if (form.stage === "Lise öğrencisi") {
      return { okul_adi: school, sinif: year, alan: department };
    }
    if (form.stage === "Üniversite öğrencisi") {
      return {
        okul_adi: [university, school].filter(Boolean).join(" · "),
        sinif: year,
        alan: department,
      };
    }
    return {
      okul_adi: [university, school].filter(Boolean).join(" · "),
      sinif: year,
      alan: university ? department : "",
    };
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const school = education();
    try {
      await insertBasvuru({
        ad_soyad: form.name.trim(),
        eposta: form.email.trim(),
        telefon: form.phone.trim(),
        ogrenci_durumu: form.stage,
        okul_adi: school.okul_adi,
        sinif: school.sinif,
        alan: school.alan,
        sehir: form.city.trim(),
        basvuru_amaci: form.intent,
        destek_alani: form.support,
        mesaj: form.note.trim(),
      });
      setForm(empty);
      setSent(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      const denied = message.includes("row-level security") || message.includes("42501");
      setError(
        message === "MISSING_ENV"
          ? "Başvuru şu an kaydedilemiyor. Bağlantı ayarları eksik."
          : denied
            ? "Kayıt izni kapalı. Supabase’de başvurular tablosuna ekleme izni gerekiyor."
            : "Başvuru gönderilemedi. Biraz sonra tekrar dene.",
      );
    } finally {
      setSaving(false);
    }
  }

  const field =
    "w-full rounded-xl border border-secondary/10 bg-background px-4 py-3 text-sm outline-none transition duration-500 focus:border-primary";

  if (sent) {
    return (
      <div className="mt-8 rounded-2xl border border-primary/25 bg-primary/10 px-6 py-8 text-center">
        <span className="mx-auto inline-flex size-12 items-center justify-center rounded-full bg-primary text-white">
          <Check className="size-6" strokeWidth={2.5} aria-hidden />
        </span>
        <p className="mt-4 text-lg font-semibold">Başvurunuz başarıyla alındı!</p>
        <p className="mt-2 text-sm leading-7 text-accent">
          Kaydın ulaştı. Değerlendirme sonrası e-posta veya telefonla dönüş yapılır.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-5 text-sm font-semibold text-primary"
        >
          Yeni başvuru
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-3">
      <input
        required
        value={form.name}
        onChange={(event) => set("name", event.target.value)}
        placeholder="Ad Soyad"
        className={field}
      />
      <input
        required
        type="email"
        value={form.email}
        onChange={(event) => set("email", event.target.value)}
        placeholder="E-posta"
        className={field}
      />
      <input
        value={form.phone}
        onChange={(event) => set("phone", event.target.value)}
        placeholder="Telefon"
        className={field}
      />

      <div>
        <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-accent uppercase">
          Hangisisin?
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {stages.map((stage) => (
            <button
              key={stage}
              type="button"
              onClick={() => setStage(stage)}
              className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                form.stage === stage
                  ? "border-primary bg-primary text-white"
                  : "border-secondary/10 bg-background hover:border-primary/40"
              }`}
            >
              {stage}
            </button>
          ))}
        </div>
      </div>

      {form.stage === "Lise öğrencisi" && (
        <div className="space-y-3 rounded-2xl border border-secondary/10 bg-background/60 p-4">
          <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">Lise bilgilerin</p>
          <div className="space-y-1.5">
            <FilterCombobox
              required
              value={form.school}
              onChange={(value) => set("school", value)}
              options={highSchools}
              placeholder="Okuduğun lise"
            />
            <p className="text-xs leading-5 text-accent">Listede yoksa okulunun adını kendin yaz.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <select
              required
              aria-label="Sınıf"
              value={form.year}
              onChange={(event) => set("year", event.target.value)}
              className={field}
            >
              {highSchoolYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <FilterCombobox
              value={form.department}
              onChange={(value) => set("department", value)}
              options={highSchoolTracks}
              placeholder="Alan (isteğe bağlı)"
            />
          </div>
        </div>
      )}

      {form.stage === "Üniversite öğrencisi" && (
        <div className="space-y-3 rounded-2xl border border-secondary/10 bg-background/60 p-4">
          <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">Üniversite bilgilerin</p>
          <div className="space-y-1.5">
            <FilterCombobox
              required
              value={form.school}
              onChange={(value) => set("school", value)}
              options={highSchools}
              placeholder="Mezun olduğun lise"
            />
            <p className="text-xs leading-5 text-accent">Listede yoksa okulunun adını kendin yaz.</p>
          </div>
          <FilterCombobox
            required
            value={form.university}
            onChange={(value) => set("university", value)}
            options={universities}
            placeholder="Üniversite"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <FilterCombobox
              required
              value={form.department}
              onChange={(value) => set("department", value)}
              options={departments}
              placeholder="Bölüm"
            />
            <select
              required
              aria-label="Sınıf"
              value={form.year}
              onChange={(event) => set("year", event.target.value)}
              className={field}
            >
              {universityYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {form.stage === "Mezun" && (
        <div className="space-y-3 rounded-2xl border border-secondary/10 bg-background/60 p-4">
          <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">Mezuniyet bilgilerin</p>
          <div className="space-y-1.5">
            <FilterCombobox
              required
              value={form.school}
              onChange={(value) => set("school", value)}
              options={highSchools}
              placeholder="Mezun olduğun lise"
            />
            <p className="text-xs leading-5 text-accent">Listede yoksa okulunun adını kendin yaz.</p>
          </div>
          <select
            required
            aria-label="Mezuniyet yılı"
            value={form.year}
            onChange={(event) => set("year", event.target.value)}
            className={field}
          >
            {graduateYears.map((year) => (
              <option key={year} value={year}>
                {year} mezuniyeti
              </option>
            ))}
          </select>
          <FilterCombobox
            value={form.university}
            onChange={(value) => set("university", value)}
            options={universities}
            placeholder="Üniversite (isteğe bağlı)"
          />
          {form.university.trim() ? (
            <FilterCombobox
              required
              value={form.department}
              onChange={(value) => set("department", value)}
              options={departments}
              placeholder="Bölüm"
            />
          ) : null}
        </div>
      )}

      <input
        value={form.city}
        onChange={(event) => set("city", event.target.value)}
        placeholder="Şehir"
        className={field}
      />
      <select
        value={form.intent}
        onChange={(event) => set("intent", event.target.value)}
        className={field}
      >
        {intents.map((intent) => (
          <option key={intent} value={intent}>
            {intent}
          </option>
        ))}
      </select>
      <select
        value={form.support}
        onChange={(event) => set("support", event.target.value)}
        className={field}
      >
        {supports.map((support) => (
          <option key={support} value={support}>
            {support}
          </option>
        ))}
      </select>
      <textarea
        required
        value={form.note}
        onChange={(event) => set("note", event.target.value)}
        placeholder="Kısaca kendini ve neden başvurduğunu yaz."
        rows={4}
        className={field}
      />
      <button
        type="submit"
        disabled={saving}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white transition duration-500 hover:bg-primary/90 disabled:opacity-60"
      >
        <Send className="size-4" aria-hidden />
        {saving ? "Yükleniyor..." : "Başvuruyu gönder"}
      </button>
      {error && (
        <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
