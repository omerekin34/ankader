import { PageHero } from "@/components/PageHero";
import { Footer, Navbar } from "@/components/SiteChrome";
import { uyeLinks } from "@/lib/nav";
import { readSite } from "@/lib/site-data";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Üyeler — ANKADER",
  description: "ANKADER üye ayrıcalıkları ve üyelerden blog yazıları.",
};

export const dynamic = "force-dynamic";

const blurbs: Record<string, string> = {
  "/uyeler/ayricaliklar": "Üyeliğin sağladığı imkanlar burada toplanır.",
  "/uyeler/blog": "Üyelerin yazıları burada yayınlanır.",
};

export default async function UyelerPage() {
  const site = await readSite();

  return (
    <div className="bg-background text-secondary">
      <Navbar contact={site.contact} ticker={site.identity.ticker} />
      <main>
        <PageHero
          eyebrow="Üyeler"
          title="Üyeler"
          text="Üye ayrıcalıkları ve üyelerden blog yazıları. İki bölüm de kendi sayfasında durur."
        />

        <section className="relative z-10 -mt-28 px-5 pb-24 sm:-mt-32 sm:px-8">
          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
            {uyeLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group rounded-[1.8rem] bg-white p-8 shadow-[0_18px_50px_-28px_rgba(15,44,65,0.45)] transition hover:-translate-y-1 hover:shadow-[0_22px_50px_-24px_rgba(20,195,208,0.45)]"
              >
                <h2 className="text-2xl">{link.label}</h2>
                <p className="mt-3 text-sm leading-7 text-accent">{blurbs[link.href]}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Aç
                  <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                </span>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer contact={site.contact} identity={site.identity} />
    </div>
  );
}
