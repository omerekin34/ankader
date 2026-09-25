import { PageHero } from "@/components/PageHero";
import { Footer, Navbar } from "@/components/SiteChrome";
import { Eye, HandHeart, Lightbulb, Scale, Target, Users } from "lucide-react";
import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Kurumsal — ANKADER",
  description:
    "ANKADER'in hikâyesi, misyonu, vizyonu, temel değerleri ve yönetim kurulu.",
};

const cardHover =
  "transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_18px_44px_-18px_rgba(20,195,208,0.7)]";

const values: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Scale, title: "Şeffaflık", text: "Her adımda hesap verebilirlik" },
  { icon: Users, title: "Dayanışma", text: "Birlikte daha güçlüyüz" },
  { icon: HandHeart, title: "Gönüllülük", text: "Karşılıksız değer üretmek" },
  { icon: Lightbulb, title: "Yenilikçilik", text: "Geleceğe uyum sağlamak" },
];

const board = [
  { initials: "AY", name: "Ayşe Yılmaz", role: "Yönetim Kurulu Başkanı" },
  { initials: "MK", name: "Mehmet Kaya", role: "Genel Sekreter" },
  { initials: "ED", name: "Elif Demir", role: "Sayman" },
  { initials: "CÖ", name: "Can Öztürk", role: "Yönetim Kurulu Üyesi" },
];

export default function KurumsalPage() {
  return (
    <div className="bg-background text-secondary">
      <Navbar />
      <main>
        <PageHero
          eyebrow="Kurumsal"
          title="Küllerimizden doğarak geleceği inşa ediyoruz"
          text="Hikâyemiz, misyonumuz, vizyonumuz ve bu yolu omuzlayan ekip. Hepsi aynı masada."
        />

        <section className="relative z-10 -mt-20 px-4 py-8 sm:-mt-24 sm:py-16">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-secondary sm:text-5xl sm:leading-tight">
                Neden bir aradayız?
              </h2>
              <p className="mt-6 text-base leading-relaxed text-accent sm:text-lg">
                Bizler küllerinden doğan gençleriz. ANKADER, aynı yolu yürüyenlerin
                birbirini iyileştirdiği ve geleceği birlikte kurduğu bir yuvadır.
              </p>
            </div>
            <div
              className="h-72 rounded-3xl bg-accent/20 sm:h-96"
              role="img"
              aria-label="Kurumsal görsel alanı"
            />
          </div>
        </section>

        {/* Misyon ve vizyon */}
        <section className="px-4 py-16 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
            <article className={`rounded-2xl border border-secondary/10 bg-white p-8 sm:p-10 ${cardHover}`}>
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Target className="size-5" aria-hidden />
              </span>
              <h2 className="mt-6 text-2xl font-bold text-secondary">Misyonumuz</h2>
              <p className="mt-4 text-base leading-relaxed text-accent">
                Zorlu süreçlerden geçen gençlerin yanında olmak; eğitim, gönüllülük
                ve dayanışmayla kendi ayakları üzerinde durmalarına alan açmak.
              </p>
            </article>
            <article className={`rounded-2xl border border-secondary/10 bg-white p-8 sm:p-10 ${cardHover}`}>
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Eye className="size-5" aria-hidden />
              </span>
              <h2 className="mt-6 text-2xl font-bold text-secondary">Vizyonumuz</h2>
              <p className="mt-4 text-base leading-relaxed text-accent">
                Her gencin potansiyelini güvenle ortaya koyabildiği, paylaşmanın ve
                kurumsal dayanışmanın sıradanlaştığı bir toplum.
              </p>
            </article>
          </div>
        </section>

        {/* Değerler */}
        <section className="px-4 pb-8 sm:pb-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
              Temel Değerlerimiz
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((item) => (
                <article
                  key={item.title}
                  className={`rounded-2xl border border-white/80 bg-white/70 p-6 backdrop-blur-md ${cardHover}`}
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <item.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-secondary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-accent">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Yönetim */}
        <section className="px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
              Yönetim Kurulumuz
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {board.map((person) => (
                <article
                  key={person.name}
                  className={`rounded-2xl border border-secondary/10 bg-white p-6 text-center ${cardHover}`}
                >
                  <div
                    className="mx-auto flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-lg font-bold text-white"
                    aria-hidden
                  >
                    {person.initials}
                  </div>
                  <h3 className="mt-5 text-base font-bold text-secondary">{person.name}</h3>
                  <p className="mt-1 text-sm text-accent">{person.role}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
