"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const seen = new WeakSet<Element>();

    const show = (el: HTMLElement) => {
      if (seen.has(el)) return;
      seen.add(el);
      el.classList.add("is-visible");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -10% 0px" },
    );

    for (const el of nodes) {
      const box = el.getBoundingClientRect();
      if (box.top < window.innerHeight * 0.92) show(el);
      else observer.observe(el);
    }
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
