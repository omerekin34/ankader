"use client";

import CommunityJoin from "@/components/CommunityJoin";
import { POST_TAGS } from "@/lib/site-types";
import FilterPanel from "@/components/FilterPanel";
import { ArrowRight, Bell, Search } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

export type DuyuruCard = {
  day: string;
  month: string;
  title: string;
  text: string;
  tag: string;
  slug: string;
  href: string;
  image?: string;
};

const filters = ["Tümü", ...POST_TAGS] as const;

export default function DuyurularBoard({
  posts,
  whatsappHref,
}: {
  posts: DuyuruCard[];
  whatsappHref: string;
}) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<(typeof filters)[number]>("Tümü");

  const counts = useMemo(() => {
    const result: Record<string, number> = { Tümü: posts.length };
    for (const item of POST_TAGS) result[item] = 0;
    for (const post of posts) result[post.tag] = (result[post.tag] ?? 0) + 1;
    return result;
  }, [posts]);

  const visible = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr-TR");
    return posts.filter((post) => {
      if (tag !== "Tümü" && post.tag !== tag) return false;
      if (!q) return true;
      return [post.title, post.text, post.tag, post.day, post.month].join(" ").toLocaleLowerCase("tr-TR").includes(q);
    });
  }, [posts, tag, query]);

  return (
    <div>
      <FilterPanel active={tag !== "Tümü" || Boolean(query.trim())}>
        <div className="rounded-2xl border border-secondary/10 bg-background/60 p-4 sm:p-5">
          <label className="relative block">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-accent" aria-hidden />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Başlık, etiket veya tarih ara"
              className="w-full rounded-xl border border-secondary/10 bg-white py-3 pr-4 pl-10 text-sm outline-none transition focus:border-primary"
            />
          </label>
          <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Duyuru etiketleri">
            {filters.map((item) => {
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
                  <span className={`ml-1.5 tabular-nums ${active ? "text-white/80" : "text-accent"}`}>
                    {counts[item] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </FilterPanel>

      <p className="mt-6 text-sm text-accent">
        {visible.length} duyuru
        {tag !== "Tümü" ? ` · ${tag}` : ""}
        {query.trim() ? ` · “${query.trim()}”` : ""}
      </p>

      {visible.length === 0 ? (
        <div className="mt-8 text-center">
          <Bell className="mx-auto size-6 text-primary" />
          <p className="mt-4 text-sm leading-7 text-accent">Bu filtrede duyuru yok. Etiketi veya aramayı değiştir.</p>
        </div>
      ) : (
        <ul className="mt-4 divide-y divide-secondary/10">
          {visible.map((post, index) => (
            <li key={post.slug}>
              <a
                href={post.href}
                className="group grid grid-cols-[4.25rem_minmax(0,1fr)_auto] items-start gap-4 py-5 sm:items-center"
              >
                <span className="flex flex-col">
                  <span className="text-2xl font-extrabold leading-none tabular-nums">{post.day}</span>
                  <span className="mt-1 text-[11px] font-semibold tracking-[0.16em] text-primary uppercase">{post.month}</span>
                </span>
                <span className="min-w-0">
                  <span className="inline-flex items-center gap-2">
                    {index === 0 && tag === "Tümü" && !query.trim() ? (
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white uppercase">
                        Yeni
                      </span>
                    ) : null}
                    <span className="text-[11px] font-semibold tracking-wide text-primary uppercase">{post.tag}</span>
                  </span>
                  <span className="mt-1.5 block font-sans text-base font-semibold leading-snug sm:text-lg">{post.title}</span>
                  <span className="mt-1 block line-clamp-1 text-sm leading-6 text-accent">{post.text}</span>
                </span>
                <span className="flex items-center gap-3">
                  {post.image ? (
                    <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-secondary/10">
                      <Image src={post.image} alt="" fill sizes="64px" className="object-cover" />
                    </span>
                  ) : null}
                  <ArrowRight className="size-4 shrink-0 text-primary transition duration-300 group-hover:translate-x-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 border-t border-secondary/10 pt-6">
        <CommunityJoin whatsappHref={whatsappHref} />
      </div>
    </div>
  );
}
