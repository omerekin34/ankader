import { POST_TAGS, type SitePost } from "./site-types";

export function slugifyTitle(title: string) {
  return title
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getPostTag(post: SitePost) {
  return POST_TAGS.includes(post.tag as (typeof POST_TAGS)[number]) ? post.tag! : "Genel";
}

export function postsWithSlugs(posts: SitePost[]) {
  const used = new Map<string, number>();
  return posts.map((post) => {
    const base = post.slug?.trim() || slugifyTitle(post.title) || "duyuru";
    const count = used.get(base) ?? 0;
    used.set(base, count + 1);
    return { post, slug: count === 0 ? base : `${base}-${count + 1}` };
  });
}

export function getPostSlug(post: SitePost, posts: SitePost[]) {
  return postsWithSlugs(posts).find((item) => item.post === post)?.slug ?? slugifyTitle(post.title);
}

export function getPostHref(post: SitePost, posts: SitePost[]) {
  return `/duyurular/${getPostSlug(post, posts)}`;
}

export function findPostBySlug(posts: SitePost[], slug: string) {
  return postsWithSlugs(posts).find((item) => item.slug === slug)?.post;
}

export function postParagraphs(post: SitePost) {
  const source = post.body?.trim() || post.text;
  return source
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);
}
