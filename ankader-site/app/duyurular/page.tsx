import DuyurularBoard from "@/components/DuyurularBoard";
import { PageHero } from "@/components/PageHero";
import { Footer, Navbar } from "@/components/SiteChrome";
import { getPostTag, postsWithSlugs } from "@/lib/posts";
import { readSite } from "@/lib/site-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Duyurular — ANKADER",
  description: "ANKADER'den güncel duyurular, kayıtlar, çalıştaylar ve saha notları.",
};

export const dynamic = "force-dynamic";

export default async function DuyurularPage() {
  const site = await readSite();
  const posts = postsWithSlugs(site.posts).map(({ post, slug }) => ({
    day: post.day,
    month: post.month,
    title: post.title,
    text: post.text,
    tag: getPostTag(post),
    slug,
    href: `/duyurular/${slug}`,
    image: post.image || "",
  }));
  const whatsappHref = site.contact.whatsappCommunity || "https://wa.me/905319450236";

  return (
    <div className="bg-background text-secondary">
      <Navbar contact={site.contact} ticker={site.identity.ticker} />
      <main>
        <PageHero
          eyebrow="Duyurular"
          title={site.home.newsTitle}
          text="Kayıtlar, çalıştaylar ve saha notları."
        />

        <section className="relative z-10 -mt-28 px-5 pb-24 sm:-mt-32 sm:px-8">
          <article className="mx-auto max-w-4xl rounded-[1.8rem] bg-white px-6 py-8 shadow-[0_18px_50px_-28px_rgba(15,44,65,0.45)] sm:px-10 sm:py-12">
            {posts.length === 0 ? (
              <p className="text-accent">Henüz duyuru yok.</p>
            ) : (
              <DuyurularBoard posts={posts} whatsappHref={whatsappHref} />
            )}
          </article>
        </section>
      </main>
      <Footer contact={site.contact} identity={site.identity} />
    </div>
  );
}
