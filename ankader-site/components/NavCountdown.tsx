"use client";

import { Timer } from "lucide-react";
import { useEffect, useState } from "react";

function formatRemaining(target: number, now: number) {
  const remaining = target - now;
  if (remaining <= 0) return "Başladı";
  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (value: number) => String(value).padStart(2, "0");
  const time = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  return days >= 1 ? `${days}g ${time}` : time;
}

export default function NavCountdown({
  label,
  title,
  href,
  date,
}: {
  label: string;
  title: string;
  href: string;
  date: string;
}) {
  const target = new Date(date).getTime();
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setText(formatRemaining(target, Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <a
      href={href}
      className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-white transition hover:bg-primary/25"
    >
      <Timer className="size-3.5 text-primary" aria-hidden />
      <span className="hidden sm:inline">{label}</span>
      <span className="hidden max-w-56 truncate md:inline">{title}</span>
      <span className="tabular-nums text-primary">{text ?? "--:--:--"}</span>
    </a>
  );
}
