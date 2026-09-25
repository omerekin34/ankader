import { PageHero } from "@/components/PageHero";
import { Footer, Navbar } from "@/components/SiteChrome";
import { readSite } from "@/lib/site-data";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "İletişim — ANKADER",
  description: "ANKADER iletişim bilgileri, adres, çalışma saatleri ve mesaj formu.",
};

export const dynamic = "force-dynamic";

const schedule = [
  { day: "Pazartesi — Cuma", time: "09:00 — 17:00" },
  { day: "Cumartesi", time: "10:00 — 17:00" },
  { day: "Pazar", time: "Kapalı" },
];

function digits(value: string) {
  return value.replace(/\D/g, "");
}

function whatsappNumber(value: string) {
  const raw = digits(value);
  if (raw.startsWith("90")) return raw;
  if (raw.startsWith("0")) return `90${raw.slice(1)}`;
  return raw ? `90${raw}` : "";
}

export default async function IletisimPage() {
  const site = await readSite();
  const { contact } = site;
  const mapsUrl =
    contact.mapsUrl ||
    `https://www.google.com/maps/place/ANKADER/@${contact.mapLat},${contact.mapLng},19z`;
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(`${contact.mapLat},${contact.mapLng} (ANKADER)`)}&ll=${contact.mapLat},${contact.mapLng}&z=19&hl=tr&output=embed`;
  const phoneHref = contact.phone ? `tel:+${whatsappNumber(contact.phone)}` : `mailto:${contact.email}`;
  const wa = whatsappNumber(contact.phone);
  const whatsappHref = wa ? `https://wa.me/${wa}` : contact.instagram || `mailto:${contact.email}`;

  const cards: {
    icon: LucideIcon;
    label: string;
    title: string;
    note: string;
    href: string;
  }[] = [
    {
      icon: Phone,
      label: "Telefon",
      title: contact.phone || "E-posta ile ulaşın",
      note: contact.hours || "Hafta içi 09:00 — 17:00",
      href: phoneHref,
    },
    {
      icon: Mail,
      label: "E-posta",
      title: contact.email,
      note: "24 saat içinde dönüş",
      href: `mailto:${contact.email}`,
    },
    {
      icon: MapPin,
      label: "Adres",
      title: contact.address,
      note: "Yol tarifi al",
      href: mapsUrl,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      title: contact.phone || "Hemen yazın",
      note: "En hızlı iletişim",
      href: whatsappHref,
    },
  ];

  return (
    <div className="bg-background text-secondary">
      <Navbar contact={site.contact} />
      <main>
        <PageHero
          eyebrow="İletişim"
          title="Hayalinizdeki dayanışma için buradayız"
          text="Üyelik, gönüllülük veya destek için yazın, arayın ya da derneğe uğrayın. Ekibimiz size yardımcı olmaktan mutluluk duyar."
        />

        <section className="relative z-10 -mt-28 px-5 sm:-mt-32 sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
              <a
                key={card.label}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                className="card-pro rounded-[1.6rem] bg-white px-6 py-7 shadow-[0_18px_50px_-28px_rgba(15,44,65,0.45)]"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-background text-primary">
                  <card.icon className="size-5" aria-hidden />
                </span>
                <p className="mt-6 text-[11px] font-semibold tracking-[0.2em] text-accent uppercase">
                  {card.label}
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-secondary">{card.title}</p>
                <p className="mt-2 text-sm text-primary">{card.note}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <article className="rounded-[1.8rem] bg-white p-7 sm:p-10 shadow-[0_18px_50px_-32px_rgba(15,44,65,0.35)]">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">Bize yazın</p>
              <p className="mt-3 text-sm leading-7 text-accent">
                Üyelik, gönüllülük veya bağış sorularınızı iletin, en kısa sürede dönüş yapalım.
              </p>
              <ContactForm email={contact.email} />
            </article>

            <div className="space-y-5">
              <article className="rounded-[1.8rem] bg-white p-7 sm:p-8 shadow-[0_18px_50px_-32px_rgba(15,44,65,0.35)]">
                <p className="text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
                  Çalışma saatleri
                </p>
                <ul className="mt-6 space-y-4">
                  {schedule.map((row) => (
                    <li
                      key={row.day}
                      className="flex items-baseline justify-between gap-4 border-b border-secondary/5 pb-3 text-sm last:border-0 last:pb-0"
                    >
                      <span className="text-accent">{row.day}</span>
                      <span className="font-semibold text-secondary">{row.time}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-accent">{contact.hours}</p>
              </article>

              <article className="overflow-hidden rounded-[1.8rem] bg-white shadow-[0_18px_50px_-32px_rgba(15,44,65,0.35)]">
                <iframe
                  title="ANKADER harita"
                  src={embedUrl}
                  className="h-64 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block px-5 py-3 text-center text-xs font-semibold tracking-[0.16em] text-primary uppercase"
                >
                  Haritada aç
                </a>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer contact={contact} />
    </div>
  );
}
