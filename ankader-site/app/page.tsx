import HafizaGallery from "@/components/HafizaGallery";
import HeroSlider from "@/components/HeroSlider";
import JoinBand from "@/components/JoinBand";
import { Footer, Navbar } from "@/components/SiteChrome";
import StatsStrip from "@/components/StatsStrip";
import type { CSSProperties } from "react";
import { getPostHref, getPostTag } from "@/lib/posts";
import { readSite } from "@/lib/site-data";
import type { SiteData } from "@/lib/site-types";
import {
  ArrowRight,
  Eye,
  Target,
} from "lucide-react";

export const dynamic = "force-dynamic";

const seeAllClass =
  "group inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition duration-300 hover:border-primary hover:bg-primary hover:text-white hover:shadow-[0_10px_28px_-12px_rgba(20,195,208,0.85)]";

function Path() {
  const steps = [
    { n: "01", title: "Başvur", text: "Öğrenci formunu doldur. Üye, gönüllü ya da destek — üç yol da açık." },
    { n: "02", title: "Eşleş", text: "Yönetim başvurunu okur. İhtiyacına veya katkına göre ekibe bağlanır." },
    { n: "03", title: "Sahaya in", text: "Eğitim, mentorluk ya da mahalle işi. Söz masada kalmaz, işe döner." },
  ];
  return (
    <section className="px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <div data-reveal className="reveal max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.28em] text-primary uppercase">Bize katıl</p>
          <h2 className="mt-4 text-3xl sm:text-5xl">Kapı açık. Yol kısa.</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-accent">
            Üye, gönüllü ya da destek — üç adımda aynı masaya oturursun.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.n}
              data-reveal
              className="reveal border-t border-secondary/15 pt-6"
              style={{ "--reveal-delay": `${index * 120}ms` } as CSSProperties}
            >
              <p className="text-xs font-semibold tracking-[0.22em] text-primary">{step.n}</p>
              <h3 className="mt-4 text-2xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-accent">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Corporate({ data }: { data: SiteData["corporate"] }) {
  return (
    <section className="scroll-mt-28 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div data-reveal className="reveal max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.28em] text-primary uppercase">01 — Kurumsal</p>
          <h2 className="mt-4 text-3xl sm:text-5xl">{data.title}</h2>
          <p className="mt-5 text-base leading-8 text-accent">{data.text}</p>
        </div>
        <blockquote
          data-reveal
          className="reveal mt-12 max-w-4xl text-2xl leading-snug text-secondary sm:text-4xl"
        >
          “Kimse tek başına yürümesin diye buradayız.”
        </blockquote>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <article data-reveal className="reveal card-pro rounded-2xl border border-secondary/10 bg-white p-8 sm:p-10">
            <Target className="size-5 text-primary" aria-hidden />
            <h3 className="mt-6 text-2xl">Misyonumuz</h3>
            <p className="mt-4 text-base leading-8 text-accent">{data.mission}</p>
          </article>
          <article
            data-reveal
            className="reveal card-pro rounded-2xl border border-secondary/10 bg-white p-8 sm:p-10"
            style={{ "--reveal-delay": "140ms" } as CSSProperties}
          >
            <Eye className="size-5 text-primary" aria-hidden />
            <h3 className="mt-6 text-2xl">Vizyonumuz</h3>
            <p className="mt-4 text-base leading-8 text-accent">{data.vision}</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function Activities() {
  return (
    <section id="faaliyetler" className="scroll-mt-28 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div data-reveal className="reveal flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] text-primary uppercase">02 — Faaliyetler</p>
            <h2 className="mt-4 text-3xl sm:text-5xl">Hafızamızdan kareler</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-accent">
              Birlikte geçirilen zamanlardan seçilmiş kareler.
            </p>
          </div>
          <a href="/faaliyetler" className={seeAllClass}>
            Tümünü gör
            <ArrowRight className="size-4 transition duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>
        <div className="mt-10">
          <HafizaGallery preview />
        </div>
      </div>
    </section>
  );
}

function Board({ board }: { board: SiteData["board"] }) {
  return (
    <section className="scroll-mt-28 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div data-reveal className="reveal flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] text-primary uppercase">03 — Yönetim</p>
            <h2 className="mt-4 text-3xl sm:text-5xl">Yönetim Kurulu</h2>
          </div>
          <a href="/yonetim" className={seeAllClass}>
            Kurulu gör
            <ArrowRight className="size-4 transition duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {board.map((person, index) => (
            <article
              key={person.name}
              data-reveal
              className="reveal card-pro rounded-2xl border border-secondary/10 bg-white p-6"
              style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
            >
              <div className="flex size-14 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-white">
                {person.initials}
              </div>
              <h3 className="mt-5 text-base font-semibold font-sans">{person.name}</h3>
              <p className="mt-1 text-sm text-accent">{person.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Announcements({ posts }: { posts: SiteData["posts"] }) {
  const [featured, ...rest] = posts;
  return (
    <section className="scroll-mt-28 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div data-reveal className="reveal flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] text-primary uppercase">04 — Duyurular</p>
            <h2 className="mt-4 text-3xl sm:text-5xl">Sahadan haber</h2>
          </div>
          <a href="/duyurular" className={seeAllClass}>
            Tüm duyurular
            <ArrowRight className="size-4 transition duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>
        <div className="mt-12 grid gap-4">
          {featured && (
            <a
              href={getPostHref(featured, posts)}
              data-reveal
              className="group reveal relative overflow-hidden rounded-2xl bg-secondary p-7 text-white sm:p-10"
            >
              <span className="inline-flex rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">
                {getPostTag(featured)} · {featured.day} {featured.month}
              </span>
              <h3 className="mt-5 max-w-3xl text-2xl leading-tight sm:text-4xl">{featured.title}</h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">{featured.text}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Duyuruyu oku
                <ArrowRight className="size-4 transition duration-300 group-hover:translate-x-0.5" />
              </span>
            </a>
          )}
          <div className="grid gap-4 md:grid-cols-3">
            {rest.map((post, index) => (
              <a
                key={`${post.day}-${post.month}-${post.title}`}
                href={getPostHref(post, posts)}
                data-reveal
                className="reveal card-pro group flex flex-col rounded-2xl border border-secondary/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/40"
                style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
              >
                <span className="flex size-14 flex-col items-center justify-center rounded-2xl bg-secondary text-white">
                  <span className="text-lg font-extrabold leading-none">{post.day}</span>
                  <span className="mt-1 text-[10px] font-semibold tracking-wider text-primary uppercase">
                    {post.month}
                  </span>
                </span>
                <span className="mt-5 text-[11px] font-semibold tracking-wide text-primary uppercase">{getPostTag(post)}</span>
                <h3 className="mt-2 text-lg font-semibold leading-snug">{post.title}</h3>
                <p className="mt-2 text-sm leading-6 text-accent">{post.text}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function Home() {
  const site = await readSite();
  return (
    <div className="bg-background text-secondary">
      <Navbar contact={site.contact} />
      <main>
        <HeroSlider />
        <StatsStrip items={site.stats} />
        <Path />
        <Corporate data={site.corporate} />
        <Activities />
        <Board board={site.board} />
        <Announcements posts={site.posts} />
        <JoinBand />
      </main>
      <Footer contact={site.contact} />
    </div>
  );
}
