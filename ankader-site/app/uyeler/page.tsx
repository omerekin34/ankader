import MembersDirectory from "@/components/MembersDirectory";
import { PageHero } from "@/components/PageHero";
import { Footer, Navbar } from "@/components/SiteChrome";
import { readApplications } from "@/lib/application-data";
import type { MembershipApplication } from "@/lib/application-types";
import { buildPublicMembers } from "@/lib/public-members";
import { readSite } from "@/lib/site-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Üyelerimiz — ANKADER",
  description: "ANKADER üyeleri: yönetim, lise, üniversite ve mezunlar.",
};

export const dynamic = "force-dynamic";

export default async function UyelerPage() {
  const site = await readSite();
  let applications: MembershipApplication[] = [];
  try {
    applications = await readApplications();
  } catch {
    applications = [];
  }
  const members = buildPublicMembers(site.members, site.board, applications);

  return (
    <div className="bg-background text-secondary">
      <Navbar contact={site.contact} ticker={site.identity.ticker} />
      <main>
        <PageHero
          eyebrow="Üyeler"
          title="Üyelerimiz"
          text="Yönetim, lise, üniversite ve mezunlar. İsim veya okulla aramak için Filtrele’ye bas."
        />

        <section className="relative z-10 -mt-28 px-5 pb-24 sm:-mt-32 sm:px-8">
          <article className="mx-auto max-w-7xl rounded-[1.8rem] bg-white px-6 py-8 shadow-[0_18px_50px_-28px_rgba(15,44,65,0.45)] sm:px-10 sm:py-12">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">Üye listesi</p>
                <p className="mt-2 text-sm text-accent">{members.length} kişi</p>
              </div>
              <a
                href="/uye?yol=uye"
                className="inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
              >
                Üye ol
              </a>
            </div>
            <MembersDirectory members={members} />
          </article>
        </section>
      </main>
      <Footer contact={site.contact} identity={site.identity} />
    </div>
  );
}
