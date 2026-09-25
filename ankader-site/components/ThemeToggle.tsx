"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const KEY = "ankader-theme";

export type ThemeName = "light" | "dark";

function currentTheme(): ThemeName {
  if (typeof document === "undefined") return "light";
  if (document.documentElement.classList.contains("dark")) return "dark";
  const stored = localStorage.getItem(KEY);
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function apply(theme: ThemeName) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem(KEY, theme);
}

export function useAnkaderTheme() {
  const [theme, setTheme] = useState<ThemeName>("light");

  useEffect(() => {
    setTheme(currentTheme());
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return theme;
}

export default function ThemeToggle({
  surface = "nav",
}: {
  surface?: "nav" | "panel";
}) {
  const [theme, setTheme] = useState<ThemeName>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const next = currentTheme();
    setTheme(next);
    apply(next);
    setReady(true);
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    apply(next);
  }

  const track =
    surface === "panel"
      ? "border-secondary/15 bg-secondary/8 hover:border-primary/50 dark:border-white/15 dark:bg-white/10"
      : "border-white/20 bg-black/25 hover:border-primary/50";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Açık temaya geç" : "Koyu temaya geç"}
      className={`relative inline-flex h-7 w-[52px] shrink-0 items-center rounded-full border p-0.5 shadow-inner backdrop-blur-sm transition ${track}`}
    >
      <span
        className={`absolute top-0.5 size-6 rounded-full bg-white shadow-[0_4px_12px_-2px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          ready && theme === "dark" ? "translate-x-[22px] bg-secondary" : "translate-x-0"
        }`}
      />
      <span className="relative z-10 flex w-full items-center justify-between px-1">
        <Sun className={`size-3.5 ${theme === "dark" ? "text-white/45" : "text-secondary"}`} />
        <Moon className={`size-3.5 ${theme === "dark" ? "text-primary" : surface === "panel" ? "text-accent" : "text-white/45"}`} />
      </span>
    </button>
  );
}
