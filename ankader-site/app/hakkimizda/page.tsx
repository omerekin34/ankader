import { PageHero } from "@/components/PageHero";
import { Footer, Navbar } from "@/components/SiteChrome";
import StatsStrip from "@/components/StatsStrip";
import { readSite } from "@/lib/site-data";
import { BookOpen, Compass, Heart, Shield, Target, Users } from "lucide-react";
import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hakkımızda — ANKADER",
  description:
    "Pendik İTO Şehit Ahmet Aslanhan Anadolu İmam Hatip Lisesi mezunları ve mensupları derneği.",
};

const SCHOOL_URL = "https://pendikitosaaihl.meb.k12.tr/";

const values: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Heart,
    title: "Vefa",
    text: "Bizi yetiştiren öğretmenleri, okul kültürünü ve ortak hatıralarımızı unutmamak.",
  },
  {
    icon: Users,
    title: "Dayanışma",
    text: "Farklı dönemlerden mezunlar ve mensuplar arasında güvene dayalı bağlar kurmak.",
  },
  {
    icon: Compass,
    title: "Rehberlik",
    text: "Edindiğimiz tecrübeyi bizden sonra gelen öğrenciler ve genç mezunlarla paylaşmak.",
  },
  {
    icon: Shield,
    title: "Sorumluluk",
    text: "Okulumuza, çevremize ve topluma fayda üreten işlerde birlikte hareket etmek.",
  },
];

export default async function HakkimizdaPage() {
  const site = await readSite();
  const team = site.board;
  return (
    <div className="bg-background text-secondary">
      <Navbar contact={site.contact} />
      <main>
        <PageHero
          eyebrow="Hakkımızda"
          title="Bağımız mezuniyetle bitmedi"
          text={site.about.heroText}
        />

        <section className="relative z-10 -mt-20 px-4 sm:-mt-24 sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
            <article className="rounded-[1.8rem] bg-white p-8 shadow-[0_18px_50px_-28px_rgba(15,44,65,0.45)] sm:p-10">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
                Nasıl başladık?
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl">{site.about.storyTitle}</h2>
              <p className="mt-5 text-base leading-8 text-accent">
                Pendik İTO Şehit Ahmet Aslanhan Anadolu İmam Hatip Lisesi koridorlarında kurulan
                dostluklar, mezuniyet sonrasında da devam etti. Birbirimize destek olmak, okulumuzla
                ilişkimizi korumak ve edindiğimiz tecrübeyi öğrencilerle paylaşmak için kurumsal bir
                çatı altında buluştuk.
              </p>
              <p className="mt-4 text-base leading-8 text-accent">
                ANKADER; farklı dönemlerden mezunların, öğretmenlerin ve okul mensuplarının ortak
                hafızasını korurken bugünün öğrencilerine de yol arkadaşlığı etmeyi amaçlar. Anka
                kuşu bizim için geçmişi silmek değil, köklerden güç alarak yeniden ayağa kalkmak
                demektir.
              </p>
            </article>

            <article className="rounded-[1.8rem] bg-secondary p-8 text-white sm:p-10">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
                Okulumuzdan aldığımız ölçü
              </p>
              <p className="mt-6 text-3xl leading-snug sm:text-4xl">
                “Önce karakter, sonra kariyer.”
              </p>
              <p className="mt-6 text-sm leading-7 text-white/70">
                Rehberlik çalışmalarımızda yalnızca mesleki başarıyı değil; sorumluluk sahibi,
                güvenilir ve fayda üreten insanlar olmayı da önemsiyoruz.
              </p>
              <div className="mt-8">
                <p className="text-sm font-semibold leading-6 text-white">
                  Pendik İTO Şehit Ahmet Aslanhan Anadolu İmam Hatip Lisesi
                </p>
                <a
                  href={SCHOOL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex text-sm font-semibold text-primary hover:underline"
                >
                  Okulun resmî sayfası ↗
                </a>
              </div>
            </article>
          </div>
        </section>

        <StatsStrip items={site.stats} />

        <section className="px-4 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
            <article className="card-pro rounded-2xl border border-secondary/10 bg-white p-8 sm:p-10">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Target className="size-5" aria-hidden />
              </span>
              <p className="mt-6 text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
                Misyonumuz
              </p>
              <h2 className="mt-3 text-2xl font-bold">Tecrübeyi yeni nesillere aktarmak</h2>
              <p className="mt-4 text-base leading-relaxed text-accent">{site.corporate.mission}</p>
            </article>
            <article className="card-pro rounded-2xl border border-secondary/10 bg-white p-8 sm:p-10">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <BookOpen className="size-5" aria-hidden />
              </span>
              <p className="mt-6 text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
                Vizyonumuz
              </p>
              <h2 className="mt-3 text-2xl font-bold">Kalıcı bir dayanışma kültürü kurmak</h2>
              <p className="mt-4 text-base leading-relaxed text-accent">{site.corporate.vision}</p>
            </article>
          </div>
        </section>

        <section className="px-4 pb-8 sm:px-8 sm:pb-16">
          <div className="mx-auto max-w-7xl">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
              İlkelerimiz
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Birlikteliğimizi taşıyan değerler</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-accent">
              Kararlarımızda ve çalışmalarımızda okul kültürümüzden gelen dört ilkeyi gözetiyoruz.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((item) => (
                <article
                  key={item.title}
                  className="card-pro flex flex-col justify-between rounded-2xl border border-secondary/10 bg-white p-6"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <item.icon className="size-5" aria-hidden />
                  </span>
                  <div className="mt-8">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-accent">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-8">
          <blockquote className="mx-auto max-w-7xl rounded-[1.8rem] border border-secondary/10 bg-white px-8 py-10 sm:px-12">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
              En’âm Suresi · 162
            </p>
            <p className="mt-5 max-w-3xl text-2xl leading-snug sm:text-3xl">
              “Şüphesiz benim namazım da, diğer ibadetlerim de, yaşamam da, ölümüm de âlemlerin Rabbi
              Allah içindir.”
            </p>
          </blockquote>
        </section>

        <section className="px-4 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <h2 className="max-w-xl text-3xl sm:text-4xl">Bu yolu birlikte yürüyoruz</h2>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((person) => (
                <article
                  key={person.name}
                  className="card-pro rounded-2xl border border-secondary/10 bg-white p-6"
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
      <Footer contact={site.contact} />
    </div>
  );
}
