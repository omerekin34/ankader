"use client";

import { Menu, UserRound, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { href: "#anasayfa", label: "Anasayfa" },
  { href: "#hikayemiz", label: "Hikayemiz" },
  { href: "#projeler", label: "Projeler" },
  { href: "#duyurular", label: "Duyurular" },
  { href: "#iletisim", label: "İletişim" },
];

function Logo() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="text-lg font-extrabold tracking-[0.18em] text-secondary">
        ANKADER
      </span>
    );
  }

  return (
    <Image
      src="/logo.png"
      alt="ANKADER"
      width={148}
      height={48}
      priority
      className="h-11 w-auto object-contain"
      onError={() => setFailed(true)}
    />
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "bg-background/95 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <a
          href="#anasayfa"
          className="inline-flex shrink-0 items-center rounded-lg bg-background px-2.5 py-1.5 shadow-sm"
          aria-label="ANKADER anasayfa"
        >
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Ana menü">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full ${
                scrolled ? "text-secondary" : "text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#iletisim"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-primary/90 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <UserRound className="size-4" aria-hidden />
            Üye Ol / Giriş
          </a>
          <button
            type="button"
            className={`inline-flex size-10 items-center justify-center rounded-lg md:hidden ${
              scrolled || open ? "text-secondary" : "text-white"
            }`}
            aria-expanded={open}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-secondary/10 bg-background px-5 py-4 md:hidden"
          aria-label="Mobil menü"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-secondary hover:bg-primary/10"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
