"use client";

import FilterCombobox from "@/components/FilterCombobox";
import type { ApplicantStage } from "@/lib/application-types";
import {
  departments,
  graduateYears,
  highSchoolTracks,
  highSchoolYears,
  highSchools,
  homeSchool,
  universities,
  universityYears,
} from "@/lib/form-options";
import { Send } from "lucide-react";
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
  school: homeSchool,
  university: "",
  department: "",
  year: "11. sınıf",
  studentNo: "",
  city: "",
  intent: "Üye olmak istiyorum",
  support: "Eğitim ve burs desteği",
  note: "",
};

function defaultsFor(stage: ApplicantStage) {
  if (stage === "Lise öğrencisi") {
    return { school: homeSchool, university: "", department: "", year: "11. sınıf", studentNo: "" };
  }
  if (stage === "Üniversite öğrencisi") {
    return { school: homeSchool, university: "", department: "", year: "1. sınıf", studentNo: "" };
  }
  return { school: homeSchool, university: "", department: "", year: "2024", studentNo: "" };
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

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const response = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (!response.ok) {
      setError("Başvuru gönderilemedi. Alanları kontrol edip tekrar deneyin.");
      return;
    }
    setSent(true);
    setForm(empty);
  }

  const field =
    "w-full rounded-xl border border-secondary/10 bg-background px-4 py-3 text-sm outline-none transition duration-500 focus:border-primary";

  if (sent) {
    return (
      <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <p className="text-sm font-semibold">Başvurun alındı.</p>
        <p className="mt-2 text-sm leading-7 text-accent">
          Yönetim panelinde görünecek. Değerlendirme sonrası seninle e-posta
          veya telefon üzerinden iletişime geçilir.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-4 text-sm font-semibold text-primary"
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

      <FilterCombobox
        required
        value={form.school}
        onChange={(value) => set("school", value)}
        options={highSchools}
        placeholder="Lise"
      />

      {form.stage === "Lise öğrencisi" && (
        <div className="grid gap-3 sm:grid-cols-2">
          <select
            required
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
      )}

      {form.stage === "Üniversite öğrencisi" && (
        <>
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
        </>
      )}

      {form.stage === "Mezun" && (
        <>
          <FilterCombobox
            value={form.university}
            onChange={(value) => set("university", value)}
            options={universities}
            placeholder="Üniversite (mezun olduysan)"
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
          <select
            required
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
        </>
      )}

      {form.stage !== "Mezun" && (
        <input
          value={form.studentNo}
          onChange={(event) => set("studentNo", event.target.value)}
          placeholder="Öğrenci numarası (isteğe bağlı)"
          className={field}
        />
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
        {saving ? "Gönderiliyor..." : "Başvuruyu gönder"}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
