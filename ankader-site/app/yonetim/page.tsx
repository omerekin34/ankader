import { PageHero } from "@/components/PageHero";
import BoardAvatar from "@/components/BoardAvatar";
import BoardContact from "@/components/BoardContact";
import { Footer, Navbar } from "@/components/SiteChrome";
import { readSite } from "@/lib/site-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yönetim Kurulu — ANKADER",
  description: "ANKADER yönetim kurulu ve derneği birlikte yöneten ekip.",
};

export const dynamic = "force-dynamic";

export default async function YonetimPage() {
  const site = await readSite();
  const [lead, ...rest] = site.board;

  return (
    <div className="bg-background text-secondary">
      <Navbar contact={site.contact} ticker={site.identity.ticker} />
      <main>
        <PageHero
          eyebrow="Kurumsal"
          title="Bu yolu birlikte yönetiyoruz"
          text="Karar, şeffaflık ve saha aynı omuzda. İsimler yönetim panelinden güncellenir."
        />

        <section className="relative z-10 -mt-20 px-5 pb-20 sm:-mt-24 sm:px-8">
          <div className="mx-auto max-w-6xl">
            {lead && (
              <article
                data-reveal
                className="reveal mb-5 grid items-center gap-8 rounded-[2rem] border border-secondary bg-secondary p-8 text-white sm:grid-cols-[auto_1fr] sm:p-12"
              >
                <BoardAvatar
                  name={lead.name}
                  initials={lead.initials}
                  image={lead.photo}
                  className="size-24 bg-primary text-2xl font-bold text-secondary"
                />
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Başkan</p>
                  <h2 className="mt-3 text-3xl sm:text-4xl">{lead.name}</h2>
                  <p className="mt-2 text-white/70">{lead.role}</p>
                  <BoardContact email={lead.email} phone={lead.phone} tone="dark" />
                </div>
              </article>
            )}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((person) => (
                <article
                  key={person.name}
                  data-reveal
                  className="reveal card-pro rounded-2xl border border-secondary/10 bg-white p-7"
                >
                  <BoardAvatar
                    name={person.name}
                    initials={person.initials}
                    image={person.photo}
                    className="size-20 bg-secondary text-lg font-bold text-white"
                  />
                  <h2 className="mt-6 text-lg font-sans font-semibold text-secondary">{person.name}</h2>
                  <p className="mt-1 text-sm text-accent">{person.role}</p>
                  <BoardContact email={person.email} phone={person.phone} />
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
