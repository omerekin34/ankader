"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";

export default function FilterCombobox({
  value,
  onChange,
  options,
  placeholder,
  required,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  required?: boolean;
}) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pickingRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr-TR");
    if (!q) return options;
    return options.filter((item) => item.toLocaleLowerCase("tr-TR").includes(q));
  }, [options, query]);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  useEffect(() => {
    setActive(0);
  }, [query, open]);

  function pick(item: string) {
    pickingRef.current = true;
    onChange(item);
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
  }

  function onBlur() {
    if (pickingRef.current) {
      pickingRef.current = false;
      setQuery("");
      setOpen(false);
      return;
    }
    const typed = query.trim();
    if (typed && typed !== value) {
      const exact = filtered.find(
        (item) => item.toLocaleLowerCase("tr-TR") === typed.toLocaleLowerCase("tr-TR"),
      );
      onChange(exact ?? typed);
    }
    setQuery("");
    setOpen(false);
  }

  return (
    <div
      ref={rootRef}
      className="relative"
      onPointerDown={(event) => event.stopPropagation()}
    >
      <input
        ref={inputRef}
        required={required}
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        placeholder={placeholder}
        value={open ? query : value}
        onFocus={() => {
          setQuery("");
          setOpen(true);
        }}
        onBlur={onBlur}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
            setActive((current) => Math.min(current + 1, Math.max(filtered.length - 1, 0)));
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setActive((current) => Math.max(current - 1, 0));
          } else if (event.key === "Enter" && open) {
            event.preventDefault();
            const typed = query.trim();
            if (filtered[active]) pick(filtered[active]);
            else if (typed) pick(typed);
          } else if (event.key === "Escape") {
            setOpen(false);
            setQuery("");
          }
        }}
        className="w-full rounded-xl border border-secondary/10 bg-background px-4 py-3 pr-10 text-sm outline-none transition duration-500 focus:border-primary"
      />
      <ChevronDown
        className={`pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-accent transition ${open ? "rotate-180" : ""}`}
        aria-hidden
      />
      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-30 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-secondary/10 bg-white py-1 shadow-lg dark:bg-background"
        >
          {query.trim() &&
          !options.some(
            (item) => item.toLocaleLowerCase("tr-TR") === query.trim().toLocaleLowerCase("tr-TR"),
          ) ? (
            <li>
              <button
                type="button"
                tabIndex={-1}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => pick(query.trim())}
                className="w-full px-4 py-2.5 text-left text-sm font-semibold text-primary hover:bg-primary/5"
              >
                “{query.trim()}” olarak kullan
              </button>
            </li>
          ) : null}
          {filtered.length === 0 && !query.trim() ? (
            <li className="px-4 py-2.5 text-sm text-accent">Listeden seç veya adını yaz.</li>
          ) : (
            filtered.map((item, index) => (
              <li key={item} role="option" aria-selected={index === active}>
                <button
                  type="button"
                  tabIndex={-1}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => pick(item)}
                  className={`w-full px-4 py-2 text-left text-sm transition ${
                    index === active ? "bg-primary/10 text-secondary" : "hover:bg-primary/5"
                  }`}
                >
                  {item}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
