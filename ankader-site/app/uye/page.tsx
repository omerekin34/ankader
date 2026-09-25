import ContributeChoice from "@/app/uye/ContributeChoice";
import { PageHero } from "@/components/PageHero";
import { Footer, Navbar } from "@/components/SiteChrome";
import { readSite } from "@/lib/site-data";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Katıl — ANKADER",
  description: "ANKADER'e üye olun veya bağış yaparak dayanışmaya katılın.",
};

export const dynamic = "force-dynamic";

export default async function UyePage() {
  const site = await readSite();

  return (
    <div className="bg-background text-secondary">
      <Navbar contact={site.contact} />
      <main>
        <PageHero
          eyebrow="Katıl"
          title="Nasıl katılmak istiyorsun?"
          text="Üstten üye ol veya bağış yap de, ilgili form önüne gelsin."
        />

        <section className="relative z-10 -mt-28 px-5 pb-24 sm:-mt-32 sm:px-8">
          <Suspense fallback={<p className="mx-auto max-w-4xl text-sm text-accent">Yükleniyor…</p>}>
            <ContributeChoice donate={site.donate} email={site.contact.email} />
          </Suspense>
        </section>
      </main>
      <Footer contact={site.contact} />
    </div>
  );
}
