import CountUp from "@/components/CountUp";
import type { SiteData } from "@/lib/site-types";
import type { CSSProperties } from "react";
import { CalendarDays, GraduationCap, HeartHandshake, Sparkles, Users } from "lucide-react";

const icons = [Users, HeartHandshake, Sparkles, GraduationCap, CalendarDays];

export default function StatsStrip({ items }: { items: SiteData["stats"] }) {
  return (
    <section className="px-4 py-16 sm:px-8 sm:py-20" aria-label="Dernek istatistikleri">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-3xl bg-secondary/10 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((item, index) => {
          const Icon = icons[index] ?? Users;
          return (
            <article
              key={item.label}
              data-reveal
              className="reveal bg-background px-5 py-8"
              style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
            >
              <Icon className="size-4 text-primary" aria-hidden />
              <p className="mt-5 text-3xl tracking-tight tabular-nums sm:text-4xl">
                <CountUp value={item.value} delay={index * 90} />
              </p>
              <p className="mt-2 text-sm font-semibold">{item.label}</p>
              <p className="mt-1 text-sm text-accent">{item.note}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
