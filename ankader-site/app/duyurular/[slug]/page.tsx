import CommunityJoin from "@/components/CommunityJoin";
import JoinBand from "@/components/JoinBand";
import { Footer, Navbar } from "@/components/SiteChrome";
import { findPostBySlug, getPostHref, getPostTag, postParagraphs, postsWithSlugs } from "@/lib/posts";
import { readSite } from "@/lib/site-data";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const site = await readSite();
  const post = findPostBySlug(site.posts, slug);
  if (!post) return { title: "Duyuru — ANKADER" };
  return {
    title: `${post.title} — ANKADER`,
    description: post.text,
  };
}

export default async function DuyuruDetayPage({ params }: PageProps) {
  const { slug } = await params;
  const site = await readSite();
  const post = findPostBySlug(site.posts, slug);
  if (!post) notFound();

  const tag = getPostTag(post);
  const paragraphs = postParagraphs(post);
  const related = postsWithSlugs(site.posts)
    .filter((item) => item.slug !== slug)
    .slice(0, 3);
  const whatsappHref = site.contact.whatsappCommunity || "https://wa.me/905319450236";

  return (
    <div className="bg-background text-secondary">
      <Navbar contact={site.contact} ticker={site.identity.ticker} />
      <main>
        <section className="relative bg-secondary text-white">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-3xl px-5 pt-36 pb-32 sm:px-8 sm:pt-40 sm:pb-40">
            <a href="/duyurular" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              <ArrowLeft className="size-4" />
              Tüm duyurular
            </a>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">
                {tag}
              </span>
              <span className="text-sm text-white/60">
                {post.day} {post.month}
              </span>
            </div>
            <h1 className="mt-5 text-3xl leading-[1.1] sm:text-5xl">{post.title}</h1>
            <p className="mt-6 text-base leading-8 text-white/70">{post.text}</p>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-background" />
        </section>

        <section className="relative z-10 -mt-20 px-5 pb-8 sm:-mt-24 sm:px-8">
          <article className="mx-auto max-w-3xl overflow-hidden rounded-[1.8rem] border border-secondary/10 bg-white">
            {post.image ? (
              <div className="relative aspect-[16/9] bg-secondary/10">
                <Image src={post.image} alt="" fill priority sizes="(min-width: 768px) 768px, 100vw" unoptimized={post.image.startsWith("http")} className="object-cover" />
              </div>
            ) : null}
            <div className="px-6 py-8 sm:px-10 sm:py-12">
              <div className="space-y-5 text-base leading-8 text-accent">
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-10 border-t border-secondary/10 pt-8">
                <CommunityJoin whatsappHref={whatsappHref} />
              </div>
            </div>
          </article>
        </section>

        {related.length > 0 && (
          <section className="px-5 pb-8 sm:px-8">
            <div className="mx-auto max-w-3xl">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">Diğer duyurular</p>
              <div className="mt-5 grid gap-3">
                {related.map(({ post: item, slug: itemSlug }) => (
                  <a
                    key={itemSlug}
                    href={getPostHref(item, site.posts)}
                    className="card-pro group flex items-center justify-between gap-4 rounded-2xl border border-secondary/10 bg-white p-5"
                  >
                    <div className="min-w-0">
                      <p className="text-xs text-accent">
                        {item.day} {item.month} · {getPostTag(item)}
                      </p>
                      <h2 className="mt-1 font-sans text-base font-semibold">{item.title}</h2>
                    </div>
                    {item.image ? (
                      <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-secondary/10">
                        <Image src={item.image} alt="" fill sizes="64px" unoptimized={item.image.startsWith("http")} className="object-cover" />
                      </span>
                    ) : (
                      <ArrowRight className="size-4 shrink-0 text-primary transition duration-300 group-hover:translate-x-0.5" />
                    )}
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <JoinBand eyebrow={site.home.joinEyebrow} title={site.home.joinTitle} />
      </main>
      <Footer contact={site.contact} identity={site.identity} />
    </div>
  );
}
