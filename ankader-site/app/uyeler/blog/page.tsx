import BlogBoard from "@/components/BlogBoard";
import { PageHero } from "@/components/PageHero";
import { Footer, Navbar } from "@/components/SiteChrome";
import { blogErrorMessage, readPublishedBlogs } from "@/lib/blog-data";
import type { PublicBlogPost } from "@/lib/blog-types";
import { readSite } from "@/lib/site-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Üyelerden Blog Yazıları — ANKADER",
  description: "ANKADER üyelerinden blog yazıları.",
};

export const dynamic = "force-dynamic";

export default async function UyeBlogPage() {
  const site = await readSite();
  let posts: PublicBlogPost[] = [];
  let loadError = "";
  try {
    posts = await readPublishedBlogs();
  } catch (error) {
    const message = blogErrorMessage(error);
    loadError = message.includes("bloglar tablosu") ? "" : message;
  }

  return (
    <div className="bg-background text-secondary">
      <Navbar contact={site.contact} ticker={site.identity.ticker} />
      <main>
        <PageHero
          eyebrow="Üyeler"
          title="Üyelerden Blog Yazıları"
          text="Üyeler yazı gönderir. Onaylanan yazıları herkes okur."
        />
        <section className="relative z-10 -mt-28 px-5 pb-24 sm:-mt-32 sm:px-8">
          <article className="mx-auto max-w-3xl rounded-[1.8rem] bg-white px-6 py-10 shadow-[0_18px_50px_-28px_rgba(15,44,65,0.45)] sm:px-10">
            <BlogBoard posts={posts} loadError={loadError} />
          </article>
        </section>
      </main>
      <Footer contact={site.contact} identity={site.identity} />
    </div>
  );
}
