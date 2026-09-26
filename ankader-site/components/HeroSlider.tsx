"use client";

import type { SiteData } from "@/lib/site-types";
import Image from "next/image";
import { useEffect, useState } from "react";

const fallbackSlides = ["/slides/hero-ziyaret.jpg", "/slides/hero-etayfa.jpg", "/slides/hero-mezuniyet.png"];

export default function HeroSlider({ hero }: { hero: SiteData["hero"] }) {
  const slides = hero.slides?.length ? hero.slides : fallbackSlides;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [index]);

  return (
    <section
      className="relative h-[100svh] min-h-[560px] overflow-hidden bg-secondary text-white"
      aria-roledescription="carousel"
      aria-label="Ana görseller"
    >
      {slides.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={src}
            alt=""
            fill
            unoptimized={src.startsWith("http")}
            priority={i === 0}
            quality={95}
            sizes="100vw"
            className={`object-cover object-center brightness-[0.55] contrast-[1.05] saturate-[0.85] ${
              i === index ? "slide-zoom" : ""
            }`}
          />
        </div>
      ))}

      <div className="pointer-events-none absolute inset-0 bg-secondary/35" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-secondary/10" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-full max-w-3xl bg-gradient-to-r from-secondary/55 to-transparent" />

      <div className="relative z-10 flex h-full items-end px-6 pb-24 sm:px-12 sm:pb-20">
        <div className="mx-auto w-full max-w-6xl">
          <p className="text-[11px] font-semibold tracking-[0.32em] text-primary uppercase">{hero.eyebrow}</p>
          <h1 className="mt-4 max-w-lg text-4xl leading-[0.95] sm:text-6xl lg:text-7xl">
            {hero.title}
            {hero.highlight ? (
              <>
                <br />
                {hero.highlight}
              </>
            ) : null}
            {hero.titleEnd ? (
              <>
                <br />
                {hero.titleEnd}
              </>
            ) : null}
          </h1>
          {hero.subtitle ? (
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/70">{hero.subtitle}</p>
          ) : null}
          <div className="mt-7 flex flex-wrap gap-3">
            {hero.primaryCta ? (
              <a
                href={hero.ctaHref || "/hakkimizda"}
                className="inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/90 transition hover:border-primary hover:text-primary"
              >
                {hero.primaryCta}
              </a>
            ) : null}
            {hero.secondaryCta ? (
              <a
                href="/uye?yol=uye"
                className="inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                {hero.secondaryCta}
              </a>
            ) : null}
          </div>

          <div className="mt-10 flex gap-2" role="tablist" aria-label="Görseller">
            {slides.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-label={`Görsel ${i + 1}`}
                aria-selected={i === index}
                onClick={() => setIndex(i)}
                className={`h-px rounded-full transition-all ${i === index ? "w-10 bg-primary" : "w-6 bg-white/30 hover:bg-white/55"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
