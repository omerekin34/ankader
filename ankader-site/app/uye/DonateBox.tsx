"use client";

import { Check, Copy, Send } from "lucide-react";
import { useMemo, useState } from "react";

function isCustomLabel(label: string) {
  return label.toLocaleLowerCase("tr-TR").includes("isteğe");
}

export default function DonateBox({
  iban,
  bank,
  accountName,
  note,
  amounts,
  email,
}: {
  iban: string;
  bank: string;
  accountName: string;
  note: string;
  amounts: string[];
  email: string;
}) {
  const options = amounts.length ? amounts : ["İsteğe bağlı"];
  const [picked, setPicked] = useState(options[Math.min(1, options.length - 1)]);
  const [custom, setCustom] = useState("");
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);

  const amount = useMemo(() => {
    if (isCustomLabel(picked)) {
      const digits = custom.replace(/[^\d]/g, "");
      return digits ? `${Number(digits).toLocaleString("tr-TR")} ₺` : "";
    }
    return picked;
  }, [custom, picked]);

  async function copyIban() {
    const value = iban.replace(/\s/g, "");
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

  function notify(event: React.FormEvent) {
    event.preventDefault();
    const subject = encodeURIComponent(`ANKADER bağış bildirimi${amount ? ` — ${amount}` : ""}`);
    const body = encodeURIComponent(
      [
        `Ad Soyad: ${name}`,
        `Bağış tutarı: ${amount || "Belirtilecek"}`,
        `Hesap adı: ${accountName}`,
        `IBAN: ${iban}`,
        "",
        "Dekontu bu e-postaya ekliyorum.",
      ].join("\n"),
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSent(true);
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
      </section>

      <section>
        <p className="text-xs tracking-[0.18em] text-white/50 uppercase">2 · Bankaya havale / EFT yapın</p>
        <dl className="mt-4 space-y-4 text-sm">
          <div>
            <dt className="text-xs tracking-[0.18em] text-white/50 uppercase">Hesap adı</dt>
            <dd className="mt-1 font-semibold">{accountName}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-[0.18em] text-white/50 uppercase">Banka</dt>
            <dd className="mt-1">{bank}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-[0.18em] text-white/50 uppercase">IBAN</dt>
            <dd className="mt-1 break-all font-semibold tracking-wide">{iban}</dd>
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
          Banka uygulamanızı açın, kopyaladığınız IBAN’a
          {amount ? ` ${amount}` : " seçtiğiniz tutarı"} gönderin.
        </p>
      </section>

      <section>
        <p className="text-xs tracking-[0.18em] text-white/50 uppercase">3 · Dekontu iletin</p>
        <p className="mt-3 text-sm leading-7 text-white/70">{note}</p>
        <form onSubmit={notify} className="mt-4 space-y-3">
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ad Soyad"
            className={field}
          />
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm font-semibold text-white transition duration-500 hover:border-primary"
          >
            <Send className="size-4" aria-hidden />
            Dekont bildirimi gönder
          </button>
        </form>
        {sent && (
          <p className="mt-3 text-sm text-primary">
            E-posta uygulamanız açıldı. Dekontu ekleyip göndermeniz yeterli.
          </p>
        )}
      </section>
    </div>
  );
}
