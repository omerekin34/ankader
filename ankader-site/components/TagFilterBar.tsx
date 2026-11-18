"use client";

import { useEffect, useRef } from "react";

export default function TagFilterBar({
  filters,
  counts,
  value,
  onChange,
  label = "Faaliyet etiketleri",
}: {
  filters: string[];
  counts: Record<string, number>;
  value: string;
  onChange: (tag: string) => void;
  label?: string;
}) {
  const activeRef = useRef<HTMLButtonElement | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      if (value === "Tümü") return;
    }
    if (window.matchMedia("(max-width: 639px)").matches) {
      activeRef.current?.scrollIntoView({
        block: "nearest",
        inline: "center",
        behavior: "smooth",
      });
    }
  }, [value]);

  return (
    <div
      role="tablist"
      aria-label={label}
      className="-mx-5 flex flex-nowrap snap-x snap-mandatory gap-2 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
    >
      {filters.map((item) => {
        const active = value === item;
        const count = counts[item] ?? 0;
        return (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={active}
            ref={active ? activeRef : undefined}
            onClick={() => onChange(item)}
            className={`inline-flex shrink-0 snap-start items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold whitespace-nowrap transition focus-visible:ring-2 focus-visible:ring-primary/70 ${
              active
                ? "border-primary bg-primary text-white shadow-[0_12px_24px_-14px_rgba(20,195,208,0.95)]"
                : "border-secondary/10 bg-white text-secondary hover:border-primary/45 dark:border-white/10 dark:bg-[#173044] dark:text-[#e8eef3] dark:hover:border-primary/50"
            }`}
          >
            <span>{item}</span>
            <span
              className={`inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold tabular-nums ${
                active ? "bg-white/20 text-white" : "bg-secondary/[0.06] text-accent dark:bg-white/10"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
