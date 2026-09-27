"use client";

import { Check, Copy, Send } from "lucide-react";
import { useMemo, useState } from "react";

function isCustomLabel(label: string) {
  return label.toLocaleLowerCase("tr-TR").includes("isteğe");
}

function compactIban(value: string) {
  return value.replace(/\s/g, "").toUpperCase();
}

function readyIban(value: string) {
  const iban = compactIban(value);
  return /^TR\d{24}$/.test(iban) && !/^TR0+$/.test(iban);
}

function readyBank(value: string) {
  const text = value.trim();
  return Boolean(text) && !text.toLocaleLowerCase("tr-TR").includes("panelinden");
}

function formatIban(value: string) {
  return compactIban(value).replace(/(.{4})/g, "$1 ").trim();
}

function whatsAppNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("90") && digits.length >= 12) return digits;
  if (digits.startsWith("0") && digits.length >= 11) return `90${digits.slice(1)}`;
  return digits.length >= 10 ? digits : "";
}

export default function DonateBox({
  iban,
  bank,
  accountName,
  note,
  amounts,
  email,
  phone,
}: {
  iban: string;
  bank: string;
  accountName: string;
  note: string;
  amounts: string[];
  email: string;
  phone: string;
}) {
  const options = amounts.length ? amounts : ["İsteğe bağlı"];
  const [picked, setPicked] = useState(options[Math.min(1, options.length - 1)]);
  const [custom, setCustom] = useState("");
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [opened, setOpened] = useState<"mail" | "whatsapp" | "">("");

  const accountReady = readyIban(iban) && readyBank(bank) && Boolean(accountName.trim());
  const shownIban = formatIban(iban);
  const wa = whatsAppNumber(phone);

  const amount = useMemo(() => {
    if (isCustomLabel(picked)) {
      const digits = custom.replace(/[^\d]/g, "");
      return digits ? `${Number(digits).toLocaleString("tr-TR")} ₺` : "";
    }
    return picked;
  }, [custom, picked]);

  const message = [
    "ANKADER bağış bildirimi",
    `Ad soyad: ${name}`,
    senderEmail ? `E-posta: ${senderEmail}` : "",
    senderPhone ? `Telefon: ${senderPhone}` : "",
    `Tutar: ${amount || "Belirtilecek"}`,
    `Hesap: ${accountName}`,
    `IBAN: ${shownIban}`,
    "",
    "Dekontu bu mesaja ekliyorum.",
  ]
    .filter(Boolean)
    .join("\n");

  async function copyIban() {
    const value = compactIban(iban);
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const input = document.createElement("textarea");
      input.value = value;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function notifyMail(event: React.FormEvent) {
    event.preventDefault();
    if (!accountReady) return;
    const subject = encodeURIComponent(`ANKADER bağış bildirimi${amount ? ` — ${amount}` : ""}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(message)}`;
    setOpened("mail");
  }

  function notifyWhatsApp() {
    if (!accountReady || !wa || name.trim().length < 2) return;
    window.open(`https://wa.me/${wa}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setOpened("whatsapp");
  }

  const field =
    "w-full rounded-xl border border-white/15 bg-transparent px-4 py-3 text-sm text-white outline-none transition duration-500 placeholder:text-white/35 focus:border-primary";

  return (
    <div className="mt-8 space-y-8">
      <section>
        <p className="text-xs tracking-[0.18em] text-white/50 uppercase">1 · Tutarı seçin</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setPicked(option)}
              className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition duration-500 ${
                picked === option
                  ? "border-white bg-white text-secondary"
                  : "border-white/15 text-white/75 hover:border-white/40"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        {isCustomLabel(picked) && (
          <input
            inputMode="numeric"
            value={custom}
            onChange={(event) => setCustom(event.target.value)}
            placeholder="Tutar (₺)"
            className={`${field} mt-3`}
          />
        )}
        <p className="mt-3 text-sm text-white/70">
          Seçilen tutar: <span className="font-semibold text-white">{amount || "tutarı yazın"}</span>
        </p>
      </section>

      <section>
        <p className="text-xs tracking-[0.18em] text-white/50 uppercase">2 · Havale veya EFT yapın</p>
        {accountReady ? (
          <>
            <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs tracking-[0.18em] text-white/50 uppercase">Hesap adı</dt>
                <dd className="mt-1 font-semibold">{accountName}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.18em] text-white/50 uppercase">Banka</dt>
                <dd className="mt-1">{bank}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs tracking-[0.18em] text-white/50 uppercase">IBAN</dt>
                <dd className="mt-1 font-semibold tracking-[0.04em]">{shownIban}</dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={copyIban}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white transition duration-500 hover:bg-primary/90"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "IBAN kopyalandı" : "IBAN’ı kopyala"}
            </button>
            <p className="mt-3 text-sm leading-7 text-white/70">
              Banka uygulamasında açıklamaya adınızı yazın
              {amount ? ` ve ${amount} gönderin.` : " ve seçtiğiniz tutarı gönderin."}
            </p>
          </>
        ) : (
          <p className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-white/75">
            Hesap bilgisi henüz yayınlanmadı. Yönetim panelinden gerçek banka adı ve IBAN kaydedilince bu adım açılır.
          </p>
        )}
      </section>

      <section>
        <p className="text-xs tracking-[0.18em] text-white/50 uppercase">3 · Dekontu iletin</p>
        <p className="mt-3 text-sm leading-7 text-white/70">{note}</p>
        <form onSubmit={notifyMail} className="mt-4 space-y-3">
          <input
            required
            minLength={2}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ad soyad"
            className={field}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="email"
              value={senderEmail}
              onChange={(event) => setSenderEmail(event.target.value)}
              placeholder="E-posta"
              className={field}
            />
            <input
              value={senderPhone}
              onChange={(event) => setSenderPhone(event.target.value)}
              placeholder="Telefon"
              className={field}
            />
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {wa ? (
              <button
                type="button"
                disabled={!accountReady || name.trim().length < 2}
                onClick={notifyWhatsApp}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition duration-500 hover:bg-[#1ebe5d] disabled:opacity-50"
              >
                WhatsApp’tan gönder
              </button>
            ) : null}
            <button
              type="submit"
              disabled={!accountReady}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm font-semibold text-white transition duration-500 hover:border-primary disabled:opacity-50"
            >
              <Send className="size-4" aria-hidden />
              E-posta taslağı aç
            </button>
          </div>
        </form>
        {opened === "whatsapp" && (
          <p className="mt-3 text-sm text-primary">WhatsApp açıldı. Dekont fotoğrafını mesaja ekleyip gönderin.</p>
        )}
        {opened === "mail" && (
          <p className="mt-3 text-sm text-primary">E-posta taslağı açıldı. Dekontu ekleyip göndermeniz yeterli.</p>
        )}
      </section>
    </div>
  );
}
