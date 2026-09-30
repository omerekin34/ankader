"use client";

import { ChevronDown, ListFilter } from "lucide-react";
import { useState } from "react";

export default function FilterPanel({
  children,
  active = false,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  summary,
}: {
  children: React.ReactNode;
  active?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  summary?: string;
}) {
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const open = openProp ?? uncontrolled;

  function setOpen(next: boolean) {
    if (openProp === undefined) setUncontrolled(next);
    onOpenChange?.(next);
  }

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-full border border-secondary/10 bg-white px-4 py-2 text-sm font-semibold transition hover:border-primary/40 dark:border-white/15 dark:bg-white/10 dark:text-white"
      >
        <ListFilter className="size-4 text-primary" aria-hidden />
        Filtrele
        {summary ? (
          <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-bold tracking-wide text-primary uppercase">
            {summary}
          </span>
        ) : active ? (
          <span className="size-1.5 rounded-full bg-primary" aria-hidden />
        ) : null}
        <ChevronDown className={`size-4 text-accent transition ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      {open ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}
