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
      <Navbar contact={site.contact} />
      <main>
        <PageHero
          eyebrow="Faaliyetler"
          title="Hafızamızdan kareler"
          text="Birlikte geçirilen zamanlardan fotoğraflar. Etiketlere tıklayarak buluşma, mezuniyet, vefa ve ziyaretleri ayırabilirsin."
        />

        <section className="relative z-10 -mt-20 px-5 pb-16 sm:-mt-24 sm:px-8">
          <div className="mx-auto max-w-6xl rounded-2xl border border-secondary/10 bg-white p-5 sm:p-8">
            <HafizaGallery initialTag={tag} />
          </div>
        </section>

        <section className="px-4 pb-24">
          <div className="mx-auto max-w-6xl rounded-2xl border border-secondary/10 bg-white p-8 sm:p-12">
            <h2 className="text-3xl font-extrabold tracking-tight">Bu masada yerin var</h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-accent">
              Mentörlük, kariyer buluşmaları, vefa programları ve okul ziyaretleri. Gönüllü veya üye olarak sahaya inebilirsin.
            </p>
            <a
              href="/uye"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary/90"
            >
              Katıl
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </section>
      </main>
      <Footer contact={site.contact} />
    </div>
  );
}
