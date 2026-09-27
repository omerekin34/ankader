import { Footer, Navbar } from "@/components/SiteChrome";
import { readPublishedBlog } from "@/lib/blog-data";
import { blogDateLabel } from "@/lib/blog-types";
import { readSite } from "@/lib/site-data";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const post = await readPublishedBlog(id);
    if (!post) return { title: "Blog — ANKADER" };
    return { title: `${post.title} — ANKADER`, description: post.body.slice(0, 160) };
  } catch {
    return { title: "Blog — ANKADER" };
  }
}

export default async function UyeBlogDetailPage({ params }: PageProps) {
  const { id } = await params;
  const site = await readSite();
  let post = null;
  try {
    post = await readPublishedBlog(id);
  } catch {
    notFound();
  }
  if (!post) notFound();

  const paragraphs = post.body
    .split(/\n+/)
    .map((part) => part.trim())
    .filter(Boolean);

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
            <a href="/uyeler/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              <ArrowLeft className="size-4" />
              Tüm yazılar
            </a>
            <p className="mt-8 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              {[post.name, blogDateLabel(post.createdAt)].filter(Boolean).join(" · ")}
            </p>
            <h1 className="mt-4 text-3xl leading-[1.1] sm:text-5xl">{post.title}</h1>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-background" />
        </section>

        <section className="relative z-10 -mt-20 px-5 pb-24 sm:-mt-24 sm:px-8">
          <article className="mx-auto max-w-3xl rounded-[1.8rem] bg-white px-6 py-10 shadow-[0_18px_50px_-28px_rgba(15,44,65,0.45)] sm:px-10 sm:py-12">
            <div className="space-y-5 text-base leading-8 text-accent">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </article>
        </section>
      </main>
      <Footer contact={site.contact} identity={site.identity} />
    </div>
  );
}
