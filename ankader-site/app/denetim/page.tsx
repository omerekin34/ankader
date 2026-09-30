import CouncilGrid from "@/components/CouncilGrid";
import { PageHero } from "@/components/PageHero";
import { Footer, Navbar } from "@/components/SiteChrome";
import { readSite } from "@/lib/site-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Denetim Kurulu — ANKADER",
  description: "ANKADER denetim kurulu.",
};

export const dynamic = "force-dynamic";

export default async function DenetimPage() {
  const site = await readSite();

  return (
    <div className="bg-background text-secondary">
      <Navbar contact={site.contact} ticker={site.identity.ticker} />
      <main>
        <PageHero
          eyebrow="Kurumsal"
          title="Denetim Kurulu"
          text="Hesabı ve işleyişi denetleyenler."
        />

        <section className="relative z-10 -mt-20 px-5 pb-24 sm:-mt-24 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <CouncilGrid people={site.denetim_kurulu} />
          </div>
        </section>
      </main>
      <Footer contact={site.contact} identity={site.identity} />
    </div>
  );
}
