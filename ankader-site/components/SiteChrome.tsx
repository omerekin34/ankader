"use client";

import { BrandLockup, BrandStack } from "@/components/Brand";
import ThemeToggle from "@/components/ThemeToggle";
import type { SiteData } from "@/lib/site-types";
import { ChevronDown, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const fallbackContact: SiteData["contact"] = {
  address: "Şeyhli Mahallesi, Üstün Caddesi, Merdane Sokak No:1, 34920 Pendik / İstanbul",
  email: "info@ankader.org",
  phone: "+90 531 945 02 36",
  hours: "Açık · Kapanış saati 17:00",
  instagram: "https://www.instagram.com/ankaderresmi/",
  twitter: "https://x.com",
  linkedin: "https://linkedin.com",
  whatsappCommunity: "",
  registry: "06.123.456",
  mapLat: "40.911291",
  mapLng: "29.2895983",
  mapsUrl: "https://www.google.com/maps/place/ANKADER/@40.911291,29.2895983,19z",
};

const SOCIAL = {
  instagram:
    "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 4.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm6.2-.9a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1zM12 9.2A2.8 2.8 0 1 1 9.2 12 2.8 2.8 0 0 1 12 9.2z",
  twitter:
    "M19.6 4.5h-2.3l-3.5 4.4-2.8-4.4H5.4l5.2 7.7L5.2 19.5h2.3l3.9-4.9 3.1 4.9h5.7l-5.6-8.4 5-6.6z",
  linkedin:
    "M6.5 9.5H4V20h2.5zM5.2 4a1.6 1.6 0 1 0 1.6 1.6A1.6 1.6 0 0 0 5.2 4zM20 20h-2.5v-5.6c0-1.8-.8-2.4-1.8-2.4s-2 .9-2 2.5V20H11V9.5h2.4v1.4a3.3 3.3 0 0 1 2.8-1.5c2.2 0 3.8 1.4 3.8 4.4z",
  whatsapp:
    "M12.04 2c-5.5 0-9.96 4.45-9.96 9.94 0 1.75.46 3.46 1.33 4.97L2 22l5.24-1.37A10 10 0 0 0 12.04 22c5.5 0 9.96-4.46 9.96-9.96C22 6.45 17.54 2 12.04 2zm0 18.18c-1.57 0-3.1-.42-4.44-1.2l-.32-.19-3.11.81.83-3.03-.2-.33a8.18 8.18 0 0 1-1.26-4.34c0-4.52 3.68-8.2 8.2-8.2 4.52 0 8.2 3.68 8.2 8.2 0 4.51-3.68 8.18-8.2 8.18zm4.5-6.13c-.24-.12-1.45-.71-1.67-.8-.22-.08-.39-.12-.55.12-.16.24-.63.8-.77.96-.14.16-.29.18-.53.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.02-.37.11-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.3-.22.24-.86.84-.86 2.05s.88 2.38 1 2.54c.12.16 1.73 2.64 4.2 3.7.59.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z",
};

export const kurumsalLinks = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/tuzuk", label: "Tüzük" },
  { href: "/yonetim", label: "Ekip" },
  { href: "/iletisim", label: "İletişim" },
];

export const navLinks = [
  { href: "/uyeler", label: "Üyeler" },
  { href: "/faaliyetler", label: "Faaliyetler" },
  { href: "/duyurular", label: "Duyurular" },
];

export const footerLinks = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/uyeler", label: "Üyeler" },
  { href: "/faaliyetler", label: "Faaliyetler" },
  { href: "/yonetim", label: "Yönetim" },
  { href: "/duyurular", label: "Duyurular" },
  { href: "/iletisim", label: "İletişim" },
  { href: "/tuzuk", label: "Tüzük" },
];

export function Navbar({ contact = fallbackContact }: { contact?: SiteData["contact"] }) {
  const [open, setOpen] = useState(false);
  const [kurumsalOpen, setKurumsalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const home = pathname === "/";
  const overlay = home && !scrolled;
  const kurumsalActive = kurumsalLinks.some((link) => link.href === pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setKurumsalOpen(false);
  }, [pathname]);

  const socials = [
    { label: "Instagram", href: contact.instagram, path: SOCIAL.instagram },
    { label: "Twitter", href: contact.twitter, path: SOCIAL.twitter },
    { label: "LinkedIn", href: contact.linkedin, path: SOCIAL.linkedin },
    {
      label: "WhatsApp topluluğu",
      href: contact.whatsappCommunity || "https://wa.me/905319450236",
      path: SOCIAL.whatsapp,
    },
  ];

  const glassTop = overlay ? "bg-secondary/45" : "bg-secondary/70";
  const glassNav = overlay ? "bg-secondary/72" : "bg-secondary/92";

  return (
    <header className="fixed inset-x-0 top-0 z-50 text-white backdrop-blur-md">
      <div className={`border-b border-white/5 transition-colors duration-300 ${glassTop}`}>
        <div className="mx-auto flex max-w-7xl items-center gap-5 px-5 py-2 sm:px-8">
          <div className="flex shrink-0 items-center gap-3.5">
            {socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="text-white/75 transition hover:text-primary"
              >
                <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
                  <path d={item.path} />
                </svg>
              </a>
            ))}
          </div>
          <div className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
            <p className="slogan-marquee flex w-max items-center gap-8 text-[11px] font-medium tracking-[0.2em] text-white/80 uppercase sm:text-xs">
              <span>
                Küllerinden doğarak, geleceği omuz omuza
                <span className="mx-3 text-primary">•</span>
                <span className="text-primary">ANKADER</span>
              </span>
              <span aria-hidden>
                Küllerinden doğarak, geleceği omuz omuza
                <span className="mx-3 text-primary">•</span>
                <span className="text-primary">ANKADER</span>
              </span>
              <span aria-hidden>
                Küllerinden doğarak, geleceği omuz omuza
                <span className="mx-3 text-primary">•</span>
                <span className="text-primary">ANKADER</span>
              </span>
            </p>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className={`transition-colors duration-300 ${glassNav}`}>
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-3.5 sm:px-8">
        <a href="/" aria-label="ANKADER anasayfa" className="inline-flex shrink-0">
          <BrandLockup />
        </a>

        <nav className="ml-auto hidden items-center gap-7 lg:flex" aria-label="Ana menü">
          <div className="has-drop relative">
            <button
              type="button"
              className={`inline-flex items-center gap-1.5 text-[13px] font-medium tracking-[0.14em] uppercase transition-colors ${
                kurumsalActive ? "text-primary" : "text-white/90 hover:text-primary"
              }`}
              aria-haspopup="menu"
            >
              Kurumsal
              <ChevronDown className="nav-chevron size-3.5" />
            </button>
            <div className="nav-drop absolute left-1/2 top-full z-50 w-52 pt-3">
              <div
                role="menu"
                className="overflow-hidden rounded-xl border border-white/10 bg-secondary py-1.5 shadow-[0_24px_48px_-18px_rgba(0,0,0,0.75)]"
              >
                {kurumsalLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    role="menuitem"
                    className={`nav-drop-item ${pathname === link.href ? "is-active" : ""}`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-[13px] font-medium tracking-[0.14em] uppercase transition-colors ${
                pathname === link.href ? "text-primary" : "text-white/90 hover:text-primary"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/uye"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_24px_-10px_rgba(20,195,208,0.95)] transition hover:bg-primary/90 sm:px-5 sm:text-sm"
          >
            Üye Ol / Bağış Yap
          </a>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-xl text-white lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-secondary px-4 py-3 lg:hidden" aria-label="Mobil menü">
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm"
            aria-expanded={kurumsalOpen}
            onClick={() => setKurumsalOpen((value) => !value)}
          >
            Kurumsal
            <ChevronDown
              className={`size-4 transition-transform duration-300 ${kurumsalOpen ? "rotate-180 text-primary" : ""}`}
            />
          </button>
          <div
            className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
              kurumsalOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="min-h-0">
              {kurumsalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl py-2.5 pr-3 pl-6 text-sm ${
                    pathname === link.href ? "text-primary" : "text-white/75"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block rounded-xl px-3 py-3 text-sm ${
                pathname === link.href ? "text-primary" : ""
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/uye"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-primary px-3 py-3 text-center text-sm font-semibold text-white"
          >
            Üye Ol / Bağış Yap
          </a>
        </nav>
      )}
    </header>
  );
}

function SocialIcon({ label, path, href }: { label: string; path: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-secondary"
    >
      <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
        <path d={path} />
      </svg>
    </a>
  );
}

export function Footer({ contact = fallbackContact }: { contact?: SiteData["contact"] }) {
  return (
    <footer id="iletisim" className="scroll-mt-28 bg-secondary text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <a href="/" aria-label="ANKADER anasayfa" className="block">
            <BrandStack className="w-40" onDark />
          </a>
          <p className="mt-5 text-[11px] font-semibold leading-5 tracking-[0.16em] text-primary uppercase">
            Pendik İTO Şehit Ahmet Aslanhan Anadolu İmam Hatip Lisesi
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/80">
            Okulumuzun mezunlar derneği.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Geleceği birlikte, küllerimizden doğarak inşa ediyoruz.
          </p>
          <a
            href="/uye"
            className="mt-6 inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
          >
            Üye ol / Bağış yap
          </a>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            İletişim
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              {contact.address}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-primary" aria-hidden />
              {contact.email}
            </li>
            {contact.phone ? (
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-primary" aria-hidden />
                {contact.phone}
              </li>
            ) : null}
            <li className="text-white/70">{contact.hours}</li>
            <li className="text-white/70">Dernek Sicil No: {contact.registry}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            Hızlı linkler
          </h2>
          <ul className="mt-5 space-y-2.5">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-white/80 transition hover:text-primary">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            Sosyal medya
          </h2>
          <div className="mt-5 flex gap-3">
            <SocialIcon
              label="Instagram"
              href={contact.instagram}
              path={SOCIAL.instagram}
            />
            <SocialIcon
              label="Twitter"
              href={contact.twitter}
              path={SOCIAL.twitter}
            />
            <SocialIcon
              label="LinkedIn"
              href={contact.linkedin}
              path={SOCIAL.linkedin}
            />
            <SocialIcon
              label="WhatsApp topluluğu"
              href={contact.whatsappCommunity || "https://wa.me/905319450236"}
              path={SOCIAL.whatsapp}
            />
          </div>
          <p className="mt-5 text-sm leading-relaxed text-white/70">
            Üyelik ve bağış için bize yazın. Birlikte daha güçlüyüz.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-1 px-5 py-5 text-center text-xs text-white/50 sm:flex-row sm:justify-between sm:px-6 sm:text-left">
          <p>© 2026 ANKADER</p>
          <p>Pendik İTO Şehit Ahmet Aslanhan Anadolu İmam Hatip Lisesi mezunlar derneği</p>
        </div>
      </div>
    </footer>
  );
}
