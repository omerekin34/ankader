import { Award, FolderKanban, HeartHandshake, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const stats: { icon: LucideIcon; value: string; label: string }[] = [
  { icon: Users, value: "100+", label: "Üye" },
  { icon: HeartHandshake, value: "50+", label: "Gönüllü" },
  { icon: FolderKanban, value: "10+", label: "Proje" },
  { icon: Award, value: "Yılların", label: "Tecrübesi" },
];

export default function Stats() {
  return (
    <section className="relative z-10 -mt-12 px-5 md:px-8" aria-label="Rakamlarla ANKADER">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 rounded-2xl bg-white p-4 shadow-xl shadow-secondary/10 md:grid-cols-4 md:gap-4 md:p-6">
        {stats.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center gap-2 rounded-xl px-3 py-5 text-center"
          >
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-primary/15 text-secondary">
              <item.icon className="size-5 text-primary" aria-hidden />
            </span>
            <p className="text-2xl font-extrabold tracking-tight text-secondary sm:text-3xl">
              {item.value}
            </p>
            <p className="text-sm font-medium text-accent">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
