"use client";

import { useEffect, useRef, useState } from "react";

function parseValue(raw: string) {
  const match = raw.match(/^([^\d]*)(\d[\d.]*)(.*)$/);
  if (!match) return { prefix: "", end: null as number | null, suffix: raw };

  const numeric = match[2];
  const end =
    /\.\d{3}/.test(numeric) || numeric.split(".").length > 2
      ? Number(numeric.replace(/\./g, ""))
      : Number(numeric);

  return { prefix: match[1], end: Number.isFinite(end) ? end : null, suffix: match[3] };
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

export default function CountUp({
  value,
  duration = 1600,
  delay = 0,
  className,
}: {
  value: string;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const { prefix, end, suffix } = parseValue(value);
  const [display, setDisplay] = useState(end === null ? value : `${prefix}0${suffix}`);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (end === null) {
      setDisplay(value);
      return;
    }

    const el = ref.current;
    if (!el) return;

    started.current = false;
    setDisplay(`${prefix}0${suffix}`);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = () => {
      if (started.current) return;
      started.current = true;

      if (reduced) {
        setDisplay(value);
        return;
      }

      const startAt = performance.now() + delay;
      const tick = (now: number) => {
        if (now < startAt) {
          requestAnimationFrame(tick);
          return;
        }
        const t = Math.min(1, (now - startAt) / duration);
        setDisplay(`${prefix}${Math.round(end * easeOutCubic(t))}${suffix}`);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const box = el.getBoundingClientRect();
    if (box.top < window.innerHeight * 0.88 && box.bottom > 40) {
      run();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.4, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, duration, end, prefix, suffix, value]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      {display}
    </span>
  );
}
