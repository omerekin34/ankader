import { PageHero } from "@/components/PageHero";
import { Footer, Navbar } from "@/components/SiteChrome";
import { readSite } from "@/lib/site-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tüzük — ANKADER",
  description: "ANKADER dernek tüzüğünün özeti ve temel maddeleri.",
};

export const dynamic = "force-dynamic";

export default async function TuzukPage() {
  const site = await readSite();
  return (
    <div className="bg-background text-secondary">
      <Navbar contact={site.contact} ticker={site.identity.ticker} />
      <main>
        <PageHero eyebrow={site.tuzuk.eyebrow} title={site.tuzuk.title} text={site.tuzuk.text} />
        <section className="relative z-10 -mt-20 px-5 pb-12 sm:-mt-24 sm:px-8">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
            {site.tuzuk.items.map((item) => (
              <article
                key={item.n}
                data-reveal
                className="reveal rounded-[1.6rem] bg-white p-7 shadow-[0_18px_50px_-28px_rgba(15,44,65,0.45)]"
              >
                <p className="text-xs font-semibold tracking-[0.2em] text-primary">{item.n}</p>
                <h2 className="mt-3 text-2xl">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-accent">{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer contact={site.contact} identity={site.identity} />
    </div>
  );
}
