import { HandHeart, Presentation, UsersRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const activities: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: UsersRound,
    title: "Kulüpler",
    text: "Üyelerimizin ilgi alanlarında buluştuğu, üretken ve sürekliliği olan kulüp çalışmaları.",
  },
  {
    icon: Presentation,
    title: "Çalıştaylar",
    text: "Gençlerin becerilerini geliştirdiği, uzmanlarla bir araya geldiği atölye ve eğitim programları.",
  },
  {
    icon: HandHeart,
    title: "Sosyal Sorumluluk",
    text: "Topluma dokunan gönüllü projeler, dayanışma kampanyaları ve saha çalışmaları.",
  },
];

export default function Projects() {
  return (
    <section id="projeler" className="scroll-mt-24 bg-white px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-primary uppercase">
            Faaliyetler
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
            Neler Yapıyoruz?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-accent">
            Birlikte öğreniyor, üretiyor ve çevremize somut bir iz bırakıyoruz.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {activities.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-secondary/10 bg-background p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-lg"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-secondary text-primary">
                <item.icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 text-xl font-bold text-secondary">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-accent">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
