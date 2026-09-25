"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

const WHATSAPP = "905319450236";

const templates = [
  {
    label: "Üye olmak istiyorum",
    text: "Merhaba ANKADER, üye olmak istiyorum. Bilgi verir misiniz?",
  },
  {
    label: "Gönüllü olmak istiyorum",
    text: "Merhaba ANKADER, gönüllü ekibe katılmak istiyorum.",
  },
  {
    label: "Bağış / destek",
    text: "Merhaba ANKADER, bağış ve destek hakkında bilgi almak istiyorum.",
  },
  {
    label: "Faaliyetler",
    text: "Merhaba ANKADER, faaliyetleriniz hakkında sorum var.",
  },
  {
    label: "Adres / yol tarifi",
    text: "Merhaba ANKADER, derneğe nasıl ulaşabilirim?",
  },
  {
    label: "Kendi mesajımı yazacağım",
    text: "Merhaba ANKADER, ",
  },
];

function waLink(text: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

function WhatsAppMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12.04 2c-5.5 0-9.96 4.45-9.96 9.94 0 1.75.46 3.46 1.33 4.97L2 22l5.24-1.37A10 10 0 0 0 12.04 22c5.5 0 9.96-4.46 9.96-9.96C22 6.45 17.54 2 12.04 2zm0 18.18c-1.57 0-3.1-.42-4.44-1.2l-.32-.19-3.11.81.83-3.03-.2-.33a8.18 8.18 0 0 1-1.26-4.34c0-4.52 3.68-8.2 8.2-8.2 4.52 0 8.2 3.68 8.2 8.2 0 4.51-3.68 8.18-8.2 8.18zm4.5-6.13c-.24-.12-1.45-.71-1.67-.8-.22-.08-.39-.12-.55.12-.16.24-.63.8-.77.96-.14.16-.29.18-.53.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.02-.37.11-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.3-.22.24-.86.84-.86 2.05s.88 2.38 1 2.54c.12.16 1.73 2.64 4.2 3.7.59.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z"
      />
    </svg>
  );
}

export default function WhatsAppFloat() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onPointer(event: PointerEvent) {
      if (!box.current?.contains(event.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <div ref={box} className="fixed right-5 bottom-5 z-[60] sm:right-7 sm:bottom-7">
      {open && (
        <div className="absolute right-0 bottom-20 w-[min(20.5rem,calc(100vw-2.5rem))] overflow-hidden rounded-3xl bg-white shadow-[0_24px_60px_-24px_rgba(15,44,65,0.55)]">
          <div className="flex items-start justify-between bg-[#075E54] px-4 py-3.5 text-white">
            <div>
              <p className="text-sm font-semibold">ANKADER WhatsApp</p>
              <p className="mt-0.5 text-xs text-white/75">Bir konu seç, mesaj hazır gelsin.</p>
            </div>
            <button
              type="button"
              className="rounded-full p-1 text-white/80 hover:bg-white/10 hover:text-white"
              aria-label="Kapat"
              onClick={() => setOpen(false)}
            >
              <X className="size-4" />
            </button>
          </div>
          <ul className="max-h-72 overflow-auto py-2">
            {templates.map((item) => (
              <li key={item.label}>
                <a
                  href={waLink(item.text)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-secondary hover:bg-[#25D366]/10"
                >
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                    <WhatsAppMark className="size-4" />
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "WhatsApp menüsünü kapat" : "WhatsApp ile yazın"}
        className="ml-auto inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_0_0_8px_rgba(37,211,102,0.22),0_12px_28px_-8px_rgba(37,211,102,0.85)] transition hover:scale-105 sm:size-16"
      >
        {open ? <X className="size-7" /> : <WhatsAppMark className="size-8" />}
      </button>
    </div>
  );
}
