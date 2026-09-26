import HafizaGallery from "@/components/HafizaGallery";
import { PageHero } from "@/components/PageHero";
import { Footer, Navbar } from "@/components/SiteChrome";
import { readSite } from "@/lib/site-data";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faaliyetler — ANKADER",
  description: "ANKADER hafızasından kareler: buluşmalar, mezuniyet, vefa ve iş birlikleri.",
};

export const dynamic = "force-dynamic";

export default async function FaaliyetlerPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const site = await readSite();
  const { tag } = await searchParams;

  return (
    <div className="bg-background text-secondary">
      <Navbar contact={site.contact} ticker={site.identity.ticker} />
      <main>
        <PageHero
          eyebrow="Faaliyetler"
          title={site.home.activitiesTitle}
          text={site.home.activitiesText}
        />

        <section className="relative z-10 -mt-20 px-5 pb-16 sm:-mt-24 sm:px-8">
          <div className="mx-auto max-w-6xl rounded-2xl border border-secondary/10 bg-white p-5 sm:p-8">
            <HafizaGallery initialTag={tag} items={site.hafiza} />
          </div>
        </section>

        {site.activities.length > 0 && (
          <section className="px-5 pb-8 sm:px-8">
            <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
              {site.activities.map((item) => (
                <article key={item.title} className="rounded-2xl border border-secondary/10 bg-white p-6">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-accent">{item.text}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="px-4 pb-24">
          <div className="mx-auto max-w-6xl rounded-2xl border border-secondary/10 bg-white p-8 sm:p-12">
            <h2 className="text-3xl font-extrabold tracking-tight">{site.home.galleryNoteTitle}</h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-accent">{site.home.galleryNoteText}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/uye?yol=uye"
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary/90"
              >
                Üye ol
                <ArrowRight className="size-4" aria-hidden />
              </a>
              <a
                href="/uye?yol=bagis"
                className="inline-flex items-center rounded-2xl border border-secondary/10 px-5 py-3 text-sm font-semibold hover:border-primary/40"
              >
                Bağış yap
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer contact={site.contact} identity={site.identity} />
    </div>
  );
}
