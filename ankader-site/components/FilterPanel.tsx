"use client";

import { ChevronDown, ListFilter } from "lucide-react";
import { useState } from "react";

export default function FilterPanel({
  children,
  active = false,
  defaultOpen = false,
}: {
  children: React.ReactNode;
  active?: boolean;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-full border border-secondary/10 bg-white px-4 py-2 text-sm font-semibold transition hover:border-primary/40 dark:border-white/15 dark:bg-white/10 dark:text-white"
      >
        <ListFilter className="size-4 text-primary" aria-hidden />
        Filtrele
        {active ? <span className="size-1.5 rounded-full bg-primary" aria-hidden /> : null}
        <ChevronDown className={`size-4 text-accent transition ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      {open ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}
