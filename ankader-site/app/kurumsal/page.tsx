import { PageHero } from "@/components/PageHero";
import { Footer, Navbar } from "@/components/SiteChrome";
import { readSite } from "@/lib/site-data";
import { Eye, Heart, Scale, Target, Users } from "lucide-react";
import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kurumsal — ANKADER",
  description:
    "ANKADER'in hikâyesi, misyonu, vizyonu, temel değerleri ve yönetim kurulu.",
};

const cardHover =
  "transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_18px_44px_-18px_rgba(20,195,208,0.7)]";

const valueIcons: LucideIcon[] = [Scale, Users, Heart, Target];

export default async function KurumsalPage() {
  const site = await readSite();
  return (
    <div className="bg-background text-secondary">
      <Navbar contact={site.contact} ticker={site.identity.ticker} />
      <main>
        <PageHero
          eyebrow={site.about.heroEyebrow}
          title={site.about.heroTitle}
          text={site.about.heroText}
        />

        <section className="relative z-10 -mt-20 px-4 py-8 sm:-mt-24 sm:py-16">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-secondary sm:text-5xl sm:leading-tight">
                {site.corporate.title}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-accent sm:text-lg">{site.corporate.text}</p>
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
              <p className="mt-4 text-base leading-relaxed text-accent">{site.corporate.mission}</p>
            </article>
            <article className={`rounded-2xl border border-secondary/10 bg-white p-8 sm:p-10 ${cardHover}`}>
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Eye className="size-5" aria-hidden />
              </span>
              <h2 className="mt-6 text-2xl font-bold text-secondary">Vizyonumuz</h2>
              <p className="mt-4 text-base leading-relaxed text-accent">{site.corporate.vision}</p>
            </article>
          </div>
        </section>

        {/* Değerler */}
        <section className="px-4 pb-8 sm:pb-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
              {site.about.principlesTitle}
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {site.about.values.map((item, index) => {
                const Icon = valueIcons[index % valueIcons.length];
                return (
                <article
                  key={`${item.title}-${index}`}
                  className={`rounded-2xl border border-white/80 bg-white/70 p-6 backdrop-blur-md ${cardHover}`}
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-secondary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-accent">{item.text}</p>
                </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Yönetim */}
        <section className="px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
              {site.home.boardTitle}
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {site.board.map((person) => (
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
      <Footer contact={site.contact} identity={site.identity} />
    </div>
  );
}
