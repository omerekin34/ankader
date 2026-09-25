import { PageHero } from "@/components/PageHero";
import { Footer, Navbar } from "@/components/SiteChrome";
import { readSite } from "@/lib/site-data";
import { HeartHandshake, UserPlus } from "lucide-react";
import type { Metadata } from "next";
import DonateBox from "./DonateBox";
import JoinForm from "./JoinForm";

export const metadata: Metadata = {
  title: "Üye Ol / Bağış Yap — ANKADER",
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
          eyebrow={site.donate.pageEyebrow}
          title={site.donate.pageTitle}
          text={site.donate.pageText}
        />

        <section className="relative z-10 -mt-20 px-5 pb-24 sm:-mt-24 sm:px-8">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
            <article data-reveal className="reveal rounded-2xl border border-secondary/10 bg-white p-8 sm:p-10">
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <UserPlus className="size-5" aria-hidden />
              </span>
              <p className="mt-6 text-xs font-semibold tracking-[0.22em] text-primary uppercase">01</p>
              <h2 className="mt-2 text-3xl">{site.donate.joinTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-accent">
                {site.donate.joinText}
              </p>
              <JoinForm />
            </article>

            <article
              data-reveal
              className="reveal rounded-2xl border border-secondary bg-secondary p-8 text-white sm:p-10"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary/20 text-primary">
                <HeartHandshake className="size-5" aria-hidden />
              </span>
              <p className="mt-6 text-xs font-semibold tracking-[0.22em] text-primary uppercase">02</p>
              <h2 className="mt-2 text-3xl">{site.donate.donateTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-white/70">
                {site.donate.donateText}
              </p>
              <DonateBox
                iban={site.donate.iban}
                bank={site.donate.bank}
                accountName={site.donate.accountName}
                note={site.donate.note}
                amounts={site.donate.amounts}
                email={site.contact.email}
              />
            </article>
          </div>
        </section>
      </main>
      <Footer contact={site.contact} />
    </div>
  );
}
