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
  const page = site.privileges;

  return (
    <div className="bg-background text-secondary">
      <Navbar contact={site.contact} ticker={site.identity.ticker} />
      <main>
        <PageHero eyebrow={page.eyebrow || "Üyeler"} title={page.title || "Üye Ayrıcalıkları"} text={page.text} />
        <section className="relative z-10 -mt-20 px-5 pb-24 sm:-mt-24 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-4 sm:grid-cols-2">
              {page.items.map((item, index) => (
                <article
                  key={`${item.title}-${index}`}
                  className="rounded-[1.7rem] border border-secondary/10 bg-white p-6 shadow-[0_18px_50px_-32px_rgba(15,44,65,0.45)] transition duration-300 hover:-translate-y-1 hover:border-primary/40 sm:p-7"
                >
                  <span className="grid size-14 place-items-center rounded-2xl bg-primary/15 text-2xl" aria-hidden>
                    {item.icon || "✦"}
                  </span>
                  <h2 className="mt-5 text-2xl leading-tight">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-accent sm:text-[15px]">{item.text}</p>
                </article>
              ))}
            </div>
            {page.quote.trim() ? (
              <blockquote className="mt-6 rounded-[1.7rem] border border-primary/30 bg-secondary px-6 py-8 text-white sm:px-10 sm:py-10">
                <p className="max-w-4xl text-xl leading-snug sm:text-2xl">“{page.quote}”</p>
              </blockquote>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/uye?yol=uye" className="inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary/90">
                Üye ol
              </a>
              <a href="/uyeler/blog" className="inline-flex rounded-full border border-secondary/15 px-5 py-3 text-sm font-semibold text-secondary hover:border-primary hover:text-primary">
                Üyelerden yazılar
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer contact={site.contact} identity={site.identity} />
    </div>
  );
}
