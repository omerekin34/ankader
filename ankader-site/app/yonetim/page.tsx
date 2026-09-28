import CouncilGrid from "@/components/CouncilGrid";
import { PageHero } from "@/components/PageHero";
import { Footer, Navbar } from "@/components/SiteChrome";
import { readSite } from "@/lib/site-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kurullar — ANKADER",
  description: "ANKADER yönetim kurulu ve denetim kurulu.",
};

export const dynamic = "force-dynamic";

export default async function YonetimPage() {
  const site = await readSite();

  return (
    <div className="bg-background text-secondary">
      <Navbar contact={site.contact} ticker={site.identity.ticker} />
      <main>
        <PageHero
          eyebrow="Kurumsal"
          title="Kurullar"
          text="Yönetim kurulu ve denetim kurulu. İsimler, görevler ve fotoğraflar panelden güncellenir."
        />

        <section className="relative z-10 -mt-20 px-5 pb-24 sm:-mt-24 sm:px-8">
          <div className="mx-auto max-w-6xl space-y-16">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-primary uppercase">Yönetim Kurulu</p>
              <h2 className="mt-3 text-3xl sm:text-4xl">Derneği birlikte yönetenler</h2>
              <CouncilGrid people={site.yonetim_kurulu} />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-primary uppercase">Denetim Kurulu</p>
              <h2 className="mt-3 text-3xl sm:text-4xl">Hesabı ve işleyişi denetleyenler</h2>
              <CouncilGrid people={site.denetim_kurulu} />
            </div>
          </div>
        </section>
      </main>
      <Footer contact={site.contact} identity={site.identity} />
    </div>
  );
}
