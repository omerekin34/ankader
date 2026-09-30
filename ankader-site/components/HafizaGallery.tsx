"use client";

import FilterPanel from "@/components/FilterPanel";
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
        <FilterPanel
          active={tag !== "Tümü"}
          summary={tag !== "Tümü" ? tag : undefined}
          open={filtersOpen}
          onOpenChange={setFiltersOpen}
        >
          <div className="rounded-2xl border border-secondary/10 bg-[#f6f4ee] p-2.5 sm:p-3 dark:border-white/10 dark:bg-[#0c1822]">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5" role="tablist" aria-label="Faaliyet etiketleri">
              {filters.map((item) => {
                const active = tag === item;
                const count = counts[item] ?? 0;
                return (
                  <button
                    key={item}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => pickTag(item)}
                    className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 ${
                      active
                        ? "border-primary bg-primary text-white shadow-[0_12px_24px_-14px_rgba(20,195,208,0.95)]"
                        : "border-secondary/10 bg-[#ffffff] text-secondary hover:border-primary/45 dark:border-white/10 dark:bg-[#173044] dark:text-[#e8eef3] dark:hover:border-primary/50"
                    }`}
                  >
                    <span className="min-w-0 truncate">{item}</span>
                    <span
                      className={`inline-flex min-w-6 shrink-0 items-center justify-center rounded-md px-1.5 py-0.5 text-[11px] font-bold tabular-nums ${
                        active ? "bg-white/20 text-white" : "bg-secondary/[0.06] text-accent dark:bg-white/10"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </FilterPanel>
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
