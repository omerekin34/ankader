"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = ["/slides/hero-ziyaret.jpg", "/slides/hero-etayfa.jpg", "/slides/hero-mezuniyet.png"];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [index]);

  function go(next: number) {
    setIndex((next + slides.length) % slides.length);
  }

  return (
    <section
      className="relative h-screen min-h-[560px] overflow-hidden bg-secondary text-white"
      aria-roledescription="carousel"
      aria-label="Ana görseller"
    >
      {slides.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={i === 0}
            quality={95}
            sizes="100vw"
            className={`object-cover object-center ${i === index ? "slide-zoom" : ""}`}
          />
          <div className="absolute inset-0 bg-secondary/40" />
        </div>
      ))}

      <div className="relative z-10 flex h-full items-center px-6 sm:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.28em] text-primary uppercase">
            ANKADER · Pendik
          </p>
          <h1 className="mt-5 max-w-4xl text-5xl leading-[0.92] sm:text-7xl lg:text-[5.75rem]">
            Küllerinden
            <br />
            Doğuyor
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-semibold leading-snug text-white sm:text-2xl">
            Pendik İTO Şehit Ahmet Aslanhan Anadolu İmam Hatip Lisesi Mezunları ve Mensupları Derneği
          </p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
            Okul yıllarında kurulan bağı mezuniyetten sonra da sürdürüyor; tecrübeyi, dostluğu ve
            sorumluluğu yeni nesillere aktarıyoruz.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="/hakkimizda"
              className="inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary/90"
            >
              Hikâyemizi okuyun
            </a>
            <a href="#faaliyetler" className="text-sm font-semibold text-white underline-offset-4 hover:underline">
              Neler yapıyoruz? ↓
            </a>
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="Önceki görsel"
        onClick={() => go(index - 1)}
        className="absolute top-1/2 left-4 z-20 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm hover:border-primary hover:text-primary sm:left-6 sm:size-14"
      >
        <ChevronLeft className="size-6" />
      </button>
      <button
        type="button"
        aria-label="Sonraki görsel"
        onClick={() => go(index + 1)}
        className="absolute top-1/2 right-4 z-20 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm hover:border-primary hover:text-primary sm:right-6 sm:size-14"
      >
        <ChevronRight className="size-6" />
      </button>

      <div className="absolute inset-x-0 bottom-8 z-10 mx-auto flex max-w-6xl justify-center px-6 sm:px-12">
        <div className="flex gap-2">
          {slides.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Görsel ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-10 bg-primary" : "w-5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
