"use client";

import FilterPanel from "@/components/FilterPanel";
import { hafizaItems, hafizaTags, type HafizaTag } from "@/lib/hafiza";
import Image from "next/image";
import { useMemo, useState } from "react";

function isTag(value: string | undefined): value is HafizaTag {
  return Boolean(value && (hafizaTags as readonly string[]).includes(value));
}

export default function HafizaGallery({
  preview = false,
  initialTag,
}: {
  preview?: boolean;
  initialTag?: string;
}) {
  const [tag, setTag] = useState<HafizaTag | "Tümü">(isTag(initialTag) ? initialTag : "Tümü");

  const items = useMemo(() => {
    if (preview) return hafizaItems.slice(0, 6);
    if (tag === "Tümü") return hafizaItems;
    return hafizaItems.filter((item) => item.tags.includes(tag));
  }, [preview, tag]);

  return (
    <div>
      {!preview && (
        <FilterPanel active={tag !== "Tümü"} defaultOpen={isTag(initialTag)}>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Faaliyet etiketleri">
            {(["Tümü", ...hafizaTags] as const).map((item) => {
              const active = tag === item;
              return (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTag(item)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition ${
                    active
                      ? "border-primary bg-primary text-white"
                      : "border-secondary/10 bg-white text-secondary hover:border-primary/40"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </FilterPanel>
      )}

      <div className={`${preview ? "" : "mt-8"} grid gap-6 sm:grid-cols-2 lg:grid-cols-3`}>
        {items.map((item) => (
          <figure key={item.src} className="group">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary/10">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                quality={90}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <figcaption className="mt-3 px-1">
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((itemTag) => (
                  <button
                    key={itemTag}
                    type="button"
                    onClick={() => {
                      if (preview) {
                        window.location.href = `/faaliyetler?tag=${encodeURIComponent(itemTag)}`;
                        return;
                      }
                      setTag(itemTag);
                    }}
                    className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-primary uppercase"
                  >
                    {itemTag}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-sm leading-6 text-accent">{item.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      {items.length === 0 && (
        <p className="mt-10 text-sm text-accent">Bu etikette henüz kare yok.</p>
      )}
    </div>
  );
}
