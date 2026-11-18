"use client";

import { BrandLockup } from "@/components/Brand";
import NavCountdown from "@/components/NavCountdown";
import ThemeToggle from "@/components/ThemeToggle";
import { defaultSite } from "@/lib/site-defaults";
import type { SiteData } from "@/lib/site-types";
import { uyeLinks } from "@/lib/nav";
import { ArrowUp, ChevronDown, Clock, HeartHandshake, Mail, MapPin, Menu, Phone, UserRound, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const fallbackContact: SiteData["contact"] = {
  ...defaultSite.contact,
  address: "Şeyhli Mahallesi, Üstün Caddesi, Merdane Sokak No:1, 34920 Pendik / İstanbul",
  email: "info@ankader.org",
  phone: "+90 531 945 02 36",
  hours: "Açık · Kapanış saati 17:00",
  instagram: "https://www.instagram.com/ankaderresmi/",
  twitter: "",
  linkedin: "",
  whatsappCommunity: "",
  registry: "06.123.456",
};

const SOCIAL = {
  instagram:
    "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 4.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm6.2-.9a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1zM12 9.2A2.8 2.8 0 1 1 9.2 12 2.8 2.8 0 0 1 12 9.2z",
  mail: "M4 4h16a2 2 0 0 1 2 2v.4l-10 6.25L2 6.4V6a2 2 0 0 1 2-2zm18 5.15V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.15l9.37 5.86a1.2 1.2 0 0 0 1.26 0z",
  whatsapp:
    "M12.04 2c-5.5 0-9.96 4.45-9.96 9.94 0 1.75.46 3.46 1.33 4.97L2 22l5.24-1.37A10 10 0 0 0 12.04 22c5.5 0 9.96-4.46 9.96-9.96C22 6.45 17.54 2 12.04 2zm0 18.18c-1.57 0-3.1-.42-4.44-1.2l-.32-.19-3.11.81.83-3.03-.2-.33a8.18 8.18 0 0 1-1.26-4.34c0-4.52 3.68-8.2 8.2-8.2 4.52 0 8.2 3.68 8.2 8.2 0 4.51-3.68 8.18-8.2 8.18zm4.5-6.13c-.24-.12-1.45-.71-1.67-.8-.22-.08-.39-.12-.55.12-.16.24-.63.8-.77.96-.14.16-.29.18-.53.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.02-.37.11-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.3-.22.24-.86.84-.86 2.05s.88 2.38 1 2.54c.12.16 1.73 2.64 4.2 3.7.59.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z",
};

export const councilLinks = [
  { href: "/yonetim", label: "Yönetim Kurulu" },
  { href: "/denetim", label: "Denetim Kurulu" },
];

const kurumsalBefore = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/tuzuk", label: "Tüzük" },
];

export const baskanLink = { href: "/dernek-baskanlarimiz", label: "Dernek Başkanlarımız" };

const kurumsalAfter = [{ href: "/iletisim", label: "İletişim" }];

export const kurumsalLinks = [...kurumsalBefore, ...councilLinks, baskanLink, ...kurumsalAfter];

export const navLinks = [
  { href: "/faaliyetler", label: "Faaliyetler" },
  { href: "/duyurular", label: "Duyurular" },
];

export const footerLinks = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/uyeler/ayricaliklar", label: "Üye Ayrıcalıkları" },
  { href: "/uyeler/blog", label: "Üyelerden Blog Yazıları" },
  { href: "/faaliyetler", label: "Faaliyetler" },
  { href: "/duyurular", label: "Duyurular" },
  { href: "/iletisim", label: "İletişim" },
  { href: "/tuzuk", label: "Tüzük" },
];

export function Navbar({
  contact = fallbackContact,
  ticker = defaultSite.identity.ticker,
  countdown = null,
}: {
  contact?: SiteData["contact"];
  ticker?: string;
  countdown?: { label: string; title: string; href: string; date: string } | null;
}) {
  const [open, setOpen] = useState(false);
  const [kurumsalOpen, setKurumsalOpen] = useState(false);
  const [councilsOpen, setCouncilsOpen] = useState(false);
  const [uyeOpen, setUyeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const home = pathname === "/";
  const overlay = home && !scrolled;
  const councilsActive = councilLinks.some((link) => link.href === pathname);
  const kurumsalActive = councilsActive || kurumsalLinks.some((link) => link.href === pathname);
  const uyeActive = pathname === "/uyeler" || uyeLinks.some((link) => pathname === link.href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setKurumsalOpen(false);
    setUyeOpen(false);
    setCouncilsOpen(councilLinks.some((link) => link.href === pathname));
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const socials = [
    { label: "Instagram", href: contact.instagram, path: SOCIAL.instagram },
    { label: "E-posta", href: `mailto:${contact.email}`, path: SOCIAL.mail },
    {
      label: "WhatsApp topluluğu",
      href: contact.whatsappCommunity || "https://wa.me/905319450236",
      path: SOCIAL.whatsapp,
    },
  ];

  const glassTop = overlay ? "bg-secondary/45" : "bg-secondary/70";
  const glassNav = overlay ? "bg-secondary/72" : "bg-secondary/92";

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-50 text-white backdrop-blur-md">
      <div className={`border-b border-white/5 transition-colors duration-300 ${glassTop}`}>
        <div className="mx-auto flex max-w-7xl items-center gap-5 px-5 py-2 sm:px-8">
          <div className="flex shrink-0 items-center gap-3.5">
            {socials.map((item) => {
              const external = item.href.startsWith("http");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  aria-label={item.label}
                  className="text-white/75 transition hover:text-primary"
                >
                  <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
                    <path d={item.path} />
                  </svg>
                </a>
              );
            })}
          </div>
          <div className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
            <p className="slogan-marquee flex w-max items-center gap-8 text-[11px] font-medium tracking-[0.2em] text-white/80 uppercase sm:text-xs">
              <span>
                {ticker}
                <span className="mx-3 text-primary">•</span>
                <span className="text-primary">ANKADER</span>
              </span>
              <span aria-hidden>
                {ticker}
                <span className="mx-3 text-primary">•</span>
                <span className="text-primary">ANKADER</span>
              </span>
              <span aria-hidden>
                {ticker}
                <span className="mx-3 text-primary">•</span>
                <span className="text-primary">ANKADER</span>
              </span>
            </p>
          </div>
          {countdown ? (
            <NavCountdown label={countdown.label} title={countdown.title} href={countdown.href} date={countdown.date} />
          ) : null}
          <ThemeToggle />
        </div>
      </div>

      <div className={`transition-colors duration-300 ${glassNav}`}>
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-3.5 sm:px-8">
        <a href="/" aria-label="ANKADER anasayfa" className="inline-flex shrink-0">
          <BrandLockup />
        </a>

        <div className="ml-auto flex items-center gap-6">
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Ana menü">
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
            <div className="nav-drop absolute left-1/2 top-full z-50 w-64 pt-3">
              <div
                role="menu"
                className="overflow-hidden rounded-xl border border-white/10 bg-secondary py-1.5 shadow-[0_24px_48px_-18px_rgba(0,0,0,0.75)]"
              >
                {kurumsalBefore.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    role="menuitem"
                    className={`nav-drop-item ${pathname === link.href ? "is-active" : ""}`}
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  type="button"
                  aria-expanded={councilsOpen}
                  onClick={() => setCouncilsOpen((value) => !value)}
                  className={`nav-drop-item flex w-full items-center justify-between gap-3 text-left ${
                    councilsActive || councilsOpen ? "is-active" : ""
                  }`}
                >
                  Kurullar
                  <ChevronDown className={`size-3.5 shrink-0 transition ${councilsOpen ? "rotate-180" : ""}`} aria-hidden />
                </button>
                {councilsOpen ? (
                  <div className="nav-council" role="group" aria-label="Kurullar">
                    {councilLinks.map((link) => (
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
                ) : null}
                <a
                  href={baskanLink.href}
                  role="menuitem"
                  className={`nav-drop-item ${pathname === baskanLink.href ? "is-active" : ""}`}
                >
                  {baskanLink.label}
                </a>
                {kurumsalAfter.map((link) => (
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
          <div className="has-drop relative">
            <button
              type="button"
              className={`inline-flex items-center gap-1.5 text-[13px] font-medium tracking-[0.14em] uppercase transition-colors ${
                uyeActive ? "text-primary" : "text-white/90 hover:text-primary"
              }`}
              aria-haspopup="menu"
            >
              Üyeler
              <ChevronDown className="nav-chevron size-3.5" />
            </button>
            <div className="nav-drop absolute left-1/2 top-full z-50 w-64 pt-3">
              <div
                role="menu"
                className="overflow-hidden rounded-xl border border-white/10 bg-secondary py-1.5 shadow-[0_24px_48px_-18px_rgba(0,0,0,0.75)]"
              >
                {uyeLinks.map((link) => (
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
            href="/uye?yol=uye"
            className="hidden items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_24px_-10px_rgba(20,195,208,0.95)] transition hover:bg-primary/90 sm:inline-flex sm:text-sm"
          >
            <UserRound className="size-3.5 sm:size-4" aria-hidden />
            Üye ol
          </a>
          <a
            href="/uye?yol=bagis"
            className="hidden items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition hover:border-primary sm:inline-flex sm:text-sm"
          >
            <HeartHandshake className="size-3.5 sm:size-4" aria-hidden />
            Bağış yap
          </a>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-xl text-white lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => {
              setOpen((value) => {
                const next = !value;
                if (next && kurumsalActive) setKurumsalOpen(true);
                if (next && uyeActive) setUyeOpen(true);
                return next;
              });
            }}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        </div>
      </div>
      </div>
    </header>

      <div
        className={`fixed inset-0 z-[80] lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/55 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
          aria-label="Menüyü kapat"
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute inset-y-0 right-0 flex w-[min(20rem,86vw)] flex-col bg-secondary text-white shadow-[-24px_0_48px_-24px_rgba(0,0,0,0.55)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="Mobil menü"
        >
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">Menü</p>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-xl text-white"
              aria-label="Menüyü kapat"
              onClick={() => setOpen(false)}
            >
              <X className="size-5" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 pb-4">
            <div>
              <button
                type="button"
                aria-expanded={kurumsalOpen}
                onClick={() => setKurumsalOpen((value) => !value)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-base ${
                  kurumsalActive ? "text-primary" : "text-white"
                }`}
              >
                Kurumsal
                <ChevronDown className={`size-4 transition ${kurumsalOpen ? "rotate-180" : ""}`} aria-hidden />
              </button>
              {kurumsalOpen ? (
                <div className="mb-1 ml-3 border-l border-white/10 pl-2">
                  {kurumsalBefore.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-xl px-3 py-2.5 text-[15px] ${
                        pathname === link.href ? "bg-white/10 text-primary" : "text-white/80"
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
                  <button
                    type="button"
                    aria-expanded={councilsOpen}
                    onClick={() => setCouncilsOpen((value) => !value)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[15px] ${
                      councilsActive ? "text-primary" : "text-white/90"
                    }`}
                  >
                    Kurullar
                    <ChevronDown className={`size-4 transition ${councilsOpen ? "rotate-180" : ""}`} aria-hidden />
                  </button>
                  {councilsOpen ? (
                    <div className="mb-1 ml-3 border-l border-primary/50 pl-2">
                      {councilLinks.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={`block rounded-xl px-3 py-2.5 text-[15px] ${
                            pathname === link.href ? "bg-white/10 text-primary" : "text-white/80"
                          }`}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                  <a
                    href={baskanLink.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-3 py-2.5 text-[15px] ${
                      pathname === baskanLink.href ? "bg-white/10 text-primary" : "text-white/80"
                    }`}
                  >
                    {baskanLink.label}
                  </a>
                  {kurumsalAfter.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-xl px-3 py-2.5 text-[15px] ${
                        pathname === link.href ? "bg-white/10 text-primary" : "text-white/80"
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
            <div>
              <button
                type="button"
                aria-expanded={uyeOpen}
                onClick={() => setUyeOpen((value) => !value)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-base ${
                  uyeActive ? "text-primary" : "text-white"
                }`}
              >
                Üyeler
                <ChevronDown className={`size-4 transition ${uyeOpen ? "rotate-180" : ""}`} aria-hidden />
              </button>
              {uyeOpen ? (
                <div className="mb-1 ml-3 border-l border-white/10 pl-2">
                  {uyeLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-xl px-3 py-2.5 text-[15px] ${
                        pathname === link.href ? "bg-white/10 text-primary" : "text-white/80"
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-3 py-3 text-base ${
                  pathname === link.href ? "bg-white/10 text-primary" : "text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="grid gap-2 border-t border-white/10 p-4 pb-6">
            <a
              href="/uye?yol=uye"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-primary px-3 py-3 text-center text-sm font-semibold text-white"
            >
              <UserRound className="size-4" aria-hidden />
              Üye ol
            </a>
            <a
              href="/uye?yol=bagis"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full border border-white/25 px-3 py-3 text-center text-sm font-semibold text-white"
            >
              <HeartHandshake className="size-4" aria-hidden />
              Bağış yap
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}

function SocialIcon({ label, path, href }: { label: string; path: string; href: string }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      aria-label={label}
      className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition hover:-translate-y-0.5 hover:border-primary hover:bg-primary/15 hover:text-primary"
    >
      <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
        <path d={path} />
      </svg>
    </a>
  );
}

export function Footer({
  contact = fallbackContact,
  identity = defaultSite.identity,
}: {
  contact?: SiteData["contact"];
  identity?: SiteData["identity"];
}) {
  const kesfetHrefs = ["/faaliyetler", "/duyurular", "/uyeler/ayricaliklar", "/uyeler/blog"];
  const kesfetLinks = kesfetHrefs
    .map((href) => footerLinks.find((link) => link.href === href))
    .filter((link): link is (typeof footerLinks)[number] => Boolean(link));

  const contactTiles = [
    {
      icon: MapPin,
      label: "Adres",
      value: contact.address,
      href: contact.mapsUrl || "",
      external: true,
    },
    {
      icon: Mail,
      label: "E-posta",
      value: contact.email,
      href: contact.email ? `mailto:${contact.email}` : "",
      external: false,
    },
    {
      icon: Phone,
      label: "Telefon",
      value: contact.phone,
      href: contact.phone ? `tel:${contact.phone.replace(/\s+/g, "")}` : "",
      external: false,
    },
    {
      icon: Clock,
      label: "Çalışma saati",
      value: contact.hours,
      href: "",
      external: false,
    },
  ].filter((tile) => tile.value.trim());

  return (
    <footer id="iletisim" className="relative scroll-mt-28 overflow-hidden bg-secondary text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:48px_48px]"
      />
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
      <div aria-hidden className="relative h-px w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pt-16 pb-10 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <a href="/" aria-label="ANKADER anasayfa" className="inline-flex">
            <BrandLockup />
          </a>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">{identity.footerTagline}</p>
          <div className="mt-6 flex gap-3">
            <SocialIcon
              label="Instagram"
              href={contact.instagram}
              path={SOCIAL.instagram}
            />
            <SocialIcon
              label="E-posta"
              href={`mailto:${contact.email}`}
              path={SOCIAL.mail}
            />
            <SocialIcon
              label="WhatsApp topluluğu"
              href={contact.whatsappCommunity || "https://wa.me/905319450236"}
              path={SOCIAL.whatsapp}
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href="/uye?yol=uye"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              <UserRound className="size-4" aria-hidden />
              Üye ol
            </a>
            <a
              href="/uye?yol=bagis"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-primary"
            >
              <HeartHandshake className="size-4" aria-hidden />
              Bağış yap
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
            Kurumsal
          </h2>
          <ul className="mt-5 space-y-2.5">
            {kurumsalLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-block text-sm text-white/70 transition hover:translate-x-0.5 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
            Keşfet
          </h2>
          <ul className="mt-5 space-y-2.5">
            {kesfetLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-block text-sm text-white/70 transition hover:translate-x-0.5 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
            Bize ulaşın
          </h2>
          <ul className="mt-5 space-y-4">
            {contactTiles.map((tile) => {
              const Icon = tile.icon;
              const value = tile.href ? (
                <a
                  href={tile.href}
                  {...(tile.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="text-sm font-medium text-white transition hover:text-primary"
                >
                  {tile.value}
                </a>
              ) : (
                <span className="text-sm font-medium text-white">{tile.value}</span>
              );
              return (
                <li key={tile.label} className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] font-semibold tracking-[0.2em] text-white/40 uppercase">
                      {tile.label}
                    </span>
                    <span className="mt-0.5 block">{value}</span>
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-5 text-xs text-white/40">Kütük No: {contact.registry}</p>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <p
          aria-hidden
          className="text-center font-extrabold leading-none tracking-tight text-white/[0.04] select-none text-[clamp(4rem,16vw,12rem)]"
        >
          ANKADER
        </p>
        <p className="-mt-6 text-center text-[11px] font-semibold tracking-[0.18em] text-primary/80 uppercase">
          {identity.schoolName}
        </p>
        <p className="mt-2 text-center text-sm text-white/60">{identity.footerMotto}</p>
      </div>

      <div className="relative mt-10 border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-5 text-xs text-white/50 sm:flex-row sm:justify-between sm:px-6">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <p>© {new Date().getFullYear()} ANKADER. Tüm hakları saklıdır.</p>
            <p className="flex items-center gap-2">
              <span className="size-1.5 animate-pulse rounded-full bg-primary" aria-hidden />
              {identity.footerCredit}
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Yukarı çık"
            className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-primary hover:text-primary"
          >
            <ArrowUp className="size-4" aria-hidden />
          </button>
        </div>
      </div>
    </footer>
  );
}
