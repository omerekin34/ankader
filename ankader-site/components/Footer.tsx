import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

const quickLinks = [
  { href: "#anasayfa", label: "Anasayfa" },
  { href: "#hikayemiz", label: "Hikayemiz" },
  { href: "#projeler", label: "Projeler" },
  { href: "#duyurular", label: "Duyurular" },
  { href: "#iletisim", label: "İletişim" },
];

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ankaderresmi/",
    path: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 4.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm6.2-.9a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1zM12 9.2A2.8 2.8 0 1 1 9.2 12 2.8 2.8 0 0 1 12 9.2z",
  },
  {
    label: "Twitter",
    href: "https://x.com",
    path: "M19.6 4.5h-2.3l-3.5 4.4-2.8-4.4H5.4l5.2 7.7L5.2 19.5h2.3l3.9-4.9 3.1 4.9h5.7l-5.6-8.4 5-6.6z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    path: "M6.5 9.5H4V20h2.5zM5.2 4a1.6 1.6 0 1 0 1.6 1.6A1.6 1.6 0 0 0 5.2 4zM20 20h-2.5v-5.6c0-1.8-.8-2.4-1.8-2.4s-2 .9-2 2.5V20H11V9.5h2.4v1.4a3.3 3.3 0 0 1 2.8-1.5c2.2 0 3.8 1.4 3.8 4.4z",
  },
];

export default function Footer() {
  return (
    <footer id="iletisim" className="scroll-mt-24 bg-secondary text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:px-8 md:grid-cols-3">
        <div>
          <span className="inline-flex rounded-xl bg-background px-3 py-2">
            <Image
              src="/logo.png"
              alt="ANKADER"
              width={140}
              height={46}
              className="h-10 w-auto object-contain"
            />
          </span>
          <ul className="mt-6 space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-primary" aria-hidden />
              info@ankader.org
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-primary" aria-hidden />
              +90 312 000 00 00
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" aria-hidden />
              Ankara, Türkiye
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">
            Hızlı linkler
          </h2>
          <ul className="mt-5 space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-white/80 transition hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">
            Sosyal medya
          </h2>
          <div className="mt-5 flex gap-3">
            {socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-primary hover:bg-primary hover:text-secondary"
              >
                <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
                  <path d={item.path} />
                </svg>
              </a>
            ))}
          </div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/70">
            Üye olmak veya gönüllü ekibe katılmak için bize yazın. Birlikte
            daha güçlüyüz.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-center text-xs text-white/60 md:px-8 md:text-left">
          © 2026 ANKADER
        </p>
      </div>
    </footer>
  );
}
