"use client";

import { useState } from "react";

const field =
  "w-full rounded-full border border-secondary/10 bg-background px-5 py-3.5 text-sm outline-none transition focus:border-primary";

export default function ContactForm({ email }: { email: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const mailSubject = encodeURIComponent(subject || `ANKADER iletişim — ${name || "Yeni mesaj"}`);
    const body = encodeURIComponent(
      `${message}\n\nGönderen: ${name}\nTelefon: ${phone || "—"}\nE-posta: ${from}`,
    );
    window.location.href = `mailto:${email}?subject=${mailSubject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="mt-8 rounded-3xl border border-primary/20 bg-primary/5 p-6">
        <p className="text-sm font-semibold">E-posta uygulamanız açıldı.</p>
        <p className="mt-2 text-sm leading-7 text-accent">
          Mesajınız hazırsa gönderin. Ulaşmazsa {email} adresine doğrudan yazabilirsiniz.
        </p>
        <button type="button" onClick={() => setSent(false)} className="mt-4 text-sm font-semibold text-primary">
          Yeni mesaj
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-[11px] font-semibold tracking-[0.18em] text-accent uppercase">
          Ad soyad
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Adınız soyadınız"
            className={`${field} mt-2`}
          />
        </label>
        <label className="block text-[11px] font-semibold tracking-[0.18em] text-accent uppercase">
          Telefon
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="05XX XXX XX XX"
            className={`${field} mt-2`}
          />
        </label>
      </div>
      <label className="block text-[11px] font-semibold tracking-[0.18em] text-accent uppercase">
        E-posta
        <input
          required
          type="email"
          value={from}
          onChange={(event) => setFrom(event.target.value)}
          placeholder="ornek@email.com"
          className={`${field} mt-2`}
        />
      </label>
      <label className="block text-[11px] font-semibold tracking-[0.18em] text-accent uppercase">
        Konu
        <input
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          placeholder="Üyelik, gönüllülük, bağış…"
          className={`${field} mt-2`}
        />
      </label>
      <label className="block text-[11px] font-semibold tracking-[0.18em] text-accent uppercase">
        Mesaj
        <textarea
          required
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Kısaca anlatın, dönüş yapalım."
          rows={5}
          className="mt-2 w-full rounded-3xl border border-secondary/10 bg-background px-5 py-3.5 text-sm outline-none transition focus:border-primary"
        />
      </label>
      <button
        type="submit"
        className="inline-flex rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-primary/90"
      >
        Gönder
      </button>
    </form>
  );
}
