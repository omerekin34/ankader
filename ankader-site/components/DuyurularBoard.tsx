"use client";

import CommunityJoin from "@/components/CommunityJoin";
import { POST_TAGS } from "@/lib/site-types";
import type { PostStatus } from "@/lib/posts";
import FilterPanel from "@/components/FilterPanel";
import { ArrowRight, Bell, Clock, Search } from "lucide-react";
import Image from "next/image";
import { useMemo, useState, type ReactNode } from "react";

export type DuyuruCard = {
  day: string;
  month: string;
  title: string;
  text: string;
  tag: string;
  slug: string;
  href: string;
  image?: string;
  date?: string;
  status: PostStatus;
  isNew: boolean;
  remaining: string | null;
  time?: string;
};

const filters = ["Tümü", ...POST_TAGS] as const;

export function StatusChip({ status }: { status: PostStatus }) {
  if (status === "none") return null;
  const cls =
    status === "upcoming"
      ? "bg-primary/15 text-primary"
      : status === "today"
        ? "bg-primary text-white"
        : "bg-secondary/15 text-accent";
  const text = status === "upcoming" ? "Yaklaşıyor" : status === "today" ? "Bugün" : "Sona erdi";
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase ${cls}`}>
      {text}
    </span>
  );
}

function DuyuruRow({ post }: { post: DuyuruCard }) {
  return (
    <li>
      <a
        href={post.href}
        className="group grid grid-cols-[4.5rem_minmax(0,1fr)] gap-4 rounded-2xl border border-secondary/10 bg-background/60 p-4 transition hover:-translate-y-0.5 hover:border-primary/40 sm:grid-cols-[4.5rem_minmax(0,1fr)_auto] sm:p-5"
      >
        <span
          className={`flex flex-col items-center justify-center rounded-xl py-2 ${
            post.status === "ended"
              ? "bg-secondary/40 text-white/70"
              : `bg-secondary text-white${post.status === "today" ? " ring-2 ring-primary" : ""}`
          }`}
        >
          <span className="text-2xl font-extrabold leading-none tabular-nums">{post.day}</span>
          <span className="mt-1 text-[11px] font-semibold tracking-[0.16em] uppercase">{post.month}</span>
        </span>
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-2">
            <StatusChip status={post.status} />
            {post.isNew ? (
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white uppercase">
                Yeni
              </span>
            ) : null}
            <span className="text-[11px] font-semibold tracking-wide text-primary uppercase">{post.tag}</span>
          </span>
          <span className="mt-1.5 block font-sans text-base font-semibold leading-snug sm:text-lg">{post.title}</span>
          <span className="mt-1 block line-clamp-1 text-sm leading-6 text-accent">{post.text}</span>
          {post.remaining ? (
            <span className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-accent">
              <Clock className="size-3.5" aria-hidden />
              {post.remaining}
              {post.time ? ` · ${post.time}` : ""}
            </span>
          ) : null}
        </span>
        <span className="hidden items-center gap-3 sm:flex">
          {post.image ? (
            <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-secondary/10">
              <Image src={post.image} alt="" fill sizes="64px" unoptimized={post.image.startsWith("http")} className="object-cover" />
            </span>
          ) : null}
          <ArrowRight className="size-4 shrink-0 text-primary transition duration-300 group-hover:translate-x-0.5" />
        </span>
      </a>
    </li>
  );
}

function GroupHeading({ children }: { children: ReactNode }) {
  return (
    <p className="mt-8 text-[11px] font-semibold tracking-[0.2em] text-primary uppercase first:mt-0">{children}</p>
  );
}

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

  const upcoming = visible.filter((post) => post.status === "upcoming" || post.status === "today");
  const rest = visible.filter((post) => post.status !== "upcoming" && post.status !== "today");
  const grouped = upcoming.length > 0;

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="order-2 min-w-0 flex-1 sm:order-1">
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
        </div>
        <div className="order-1 shrink-0 sm:order-2 sm:max-w-xs">
          <CommunityJoin whatsappHref={whatsappHref} align="end" />
        </div>
      </div>

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
      ) : grouped ? (
        <>
          <GroupHeading>Yaklaşan</GroupHeading>
          <ul className="mt-4 grid gap-3">
            {upcoming.map((post) => (
              <DuyuruRow key={post.slug} post={post} />
            ))}
          </ul>
          {rest.length > 0 ? (
            <>
              <GroupHeading>Geçmiş ve diğer</GroupHeading>
              <ul className="mt-4 grid gap-3">
                {rest.map((post) => (
                  <DuyuruRow key={post.slug} post={post} />
                ))}
              </ul>
            </>
          ) : null}
        </>
      ) : (
        <ul className="mt-4 grid gap-3">
          {visible.map((post) => (
            <DuyuruRow key={post.slug} post={post} />
          ))}
        </ul>
      )}

    </div>
  );
}
