import { PageHero } from "@/components/PageHero";
import { Footer, Navbar } from "@/components/SiteChrome";
import { readSite } from "@/lib/site-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Üye Ayrıcalıkları — ANKADER",
  description: "ANKADER üyeliğinin ayrıcalıkları.",
};

export const dynamic = "force-dynamic";

export default async function UyeAyricaliklariPage() {
  const site = await readSite();

  return (
    <div className="bg-background text-secondary">
      <Navbar contact={site.contact} ticker={site.identity.ticker} />
      <main>
        <PageHero
          eyebrow="Üyeler"
          title="Üye Ayrıcalıkları"
          text="Üyeliğin getirdiği imkanlar bu sayfada yer alacak."
        />
        <section className="relative z-10 -mt-28 px-5 pb-24 sm:-mt-32 sm:px-8">
          <article className="mx-auto max-w-3xl rounded-[1.8rem] bg-white px-6 py-10 shadow-[0_18px_50px_-28px_rgba(15,44,65,0.45)] sm:px-10">
            <p className="text-sm leading-7 text-accent">
              Ayrıcalıklar henüz eklenmedi. Bu bölümün içeriği buradan düzenlenecek.
            </p>
          </article>
        </section>
      </main>
      <Footer contact={site.contact} identity={site.identity} />
    </div>
  );
}
