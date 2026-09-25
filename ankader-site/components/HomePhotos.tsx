import Image from "next/image";
import type { CSSProperties } from "react";

const photos = [
  {
    src: "/slides/01.png",
    alt: "Geleneksel E-Tayfa buluşması",
    caption: "Geleneksel E-Tayfa Buluşmaları",
  },
  {
    src: "/slides/02.png",
    alt: "Mezun buluşması",
    caption: "Yıllar sonra aynı heyecan, aynı muhabbet ve aynı gönül bağıyla yeniden buluştuk.",
  },
  {
    src: "/slides/03.png",
    alt: "2026 mezuniyet programı",
    caption: "2026 / 7. Dönem Mezuniyet Programımız",
  },
];

export default function HomePhotos() {
  return (
    <section className="px-4 py-8 sm:px-8 sm:py-12" aria-label="Anılar">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {photos.map((photo, index) => (
          <figure
            key={photo.src}
            data-reveal
            className="reveal"
            style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary/10">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 px-1 text-sm leading-6 text-accent">{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
