"use client";

import FilterPanel from "@/components/FilterPanel";
import TagFilterBar from "@/components/TagFilterBar";
import { hafizaTags } from "@/lib/hafiza";
import type { SiteHafiza } from "@/lib/site-types";
import Image from "next/image";
import { useMemo, useState } from "react";

export default function HafizaGallery({
  preview = false,
  initialTag,
  items: source = [],
}: {
  preview?: boolean;
  initialTag?: string;
  items?: SiteHafiza[];
}) {
  const tags = useMemo(() => {
    const set = new Set<string>(hafizaTags);
    for (const item of source) {
      for (const itemTag of item.tags) set.add(itemTag);
    }
    return [...set];
  }, [source]);
  const [tag, setTag] = useState(initialTag && tags.includes(initialTag) ? initialTag : "Tümü");
  const [filtersOpen, setFiltersOpen] = useState(Boolean(initialTag && tags.includes(initialTag)));

  function pickTag(next: string) {
    setTag(next);
    setFiltersOpen(true);
  }

  const counts = useMemo(() => {
    const result: Record<string, number> = { Tümü: source.length };
    for (const item of source) {
      for (const itemTag of item.tags) result[itemTag] = (result[itemTag] ?? 0) + 1;
    }
    return result;
  }, [source]);

  const filters = useMemo(
    () => ["Tümü", ...tags.filter((item) => (counts[item] ?? 0) > 0)],
    [counts, tags],
  );

  const items = useMemo(() => {
    if (preview) return source.slice(0, 6);
    if (tag === "Tümü") return source;
    return source.filter((item) => item.tags.includes(tag));
  }, [preview, source, tag]);

  return (
    <div>
      {!preview && (
        <div className="relative sm:hidden">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-accent uppercase">Filtrele</p>
            {tag !== "Tümü" && (
              <button
                type="button"
                onClick={() => pickTag("Tümü")}
                className="text-xs font-semibold text-primary"
              >
                Temizle
              </button>
            )}
          </div>
          <div className="relative mt-3">
            <TagFilterBar filters={filters} counts={counts} value={tag} onChange={pickTag} />
            <div className="pointer-events-none absolute -right-5 top-0 bottom-0 w-10 bg-gradient-to-l from-white dark:from-[#0b1620]" aria-hidden />
          </div>
        </div>
      )}

      {!preview && (
        <div className="hidden sm:block">
          <FilterPanel
            active={tag !== "Tümü"}
            summary={tag !== "Tümü" ? tag : undefined}
            open={filtersOpen}
            onOpenChange={setFiltersOpen}
          >
            <div className="rounded-2xl border border-secondary/10 bg-[#f6f4ee] p-3 dark:border-white/10 dark:bg-[#0c1822]">
              <TagFilterBar filters={filters} counts={counts} value={tag} onChange={pickTag} />
            </div>
          </FilterPanel>
        </div>
      )}

      <div className={`${preview ? "" : "mt-8"} grid gap-6 sm:grid-cols-2 lg:grid-cols-3`}>
        {items.map((item, index) => (
          <figure key={`${item.src}-${index}`} className="group">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary/10">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                unoptimized={item.src.startsWith("http")}
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
                      pickTag(itemTag);
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
