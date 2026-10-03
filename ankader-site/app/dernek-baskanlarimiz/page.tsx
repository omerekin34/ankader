import CouncilGrid from "@/components/CouncilGrid";
import { PageHero } from "@/components/PageHero";
import { Footer, Navbar } from "@/components/SiteChrome";
import { readSite } from "@/lib/site-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dernek Başkanlarımız — ANKADER",
  description: "ANKADER dernek başkanları.",
};

export const dynamic = "force-dynamic";

export default async function DernekBaskanlariPage() {
  const site = await readSite();
  const page = site.dernekBaskanlari;

  return (
    <div className="bg-background text-secondary">
      <Navbar contact={site.contact} ticker={site.identity.ticker} />
      <main>
        <PageHero eyebrow={page.eyebrow || "Kurumsal"} title={page.title || "Dernek Başkanlarımız"} text={page.text} />

        <section className="relative z-10 -mt-20 px-5 pb-24 sm:-mt-24 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <CouncilGrid people={page.people} empty="Henüz başkan eklenmedi." />
          </div>
        </section>
      </main>
      <Footer contact={site.contact} identity={site.identity} />
    </div>
  );
}
