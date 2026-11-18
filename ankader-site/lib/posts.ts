import { POST_TAGS, type SiteData, type SitePost } from "./site-types";

export const TR_MONTHS_SHORT = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];

const ISTANBUL_OFFSET_MS = 3 * 60 * 60 * 1000;

export function parsePostDate(post: SitePost): Date | null {
  const raw = post.date?.trim();
  if (!raw) return null;
  const normalized = /^\d{4}-\d{2}-\d{2}$/.test(raw) ? `${raw}T09:00` : raw;
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(normalized)) return null;
  const date = new Date(`${normalized.slice(0, 16)}:00+03:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function postDateParts(post: SitePost): { day: string; month: string } {
  const date = parsePostDate(post);
  if (!date) return { day: post.day, month: post.month };
  const shifted = new Date(date.getTime() + ISTANBUL_OFFSET_MS);
  return {
    day: String(shifted.getUTCDate()).padStart(2, "0"),
    month: TR_MONTHS_SHORT[shifted.getUTCMonth()],
  };
}

function istanbulYmd(date: Date) {
  const shifted = new Date(date.getTime() + ISTANBUL_OFFSET_MS);
  return shifted.getUTCFullYear() * 10000 + (shifted.getUTCMonth() + 1) * 100 + shifted.getUTCDate();
}

export type PostStatus = "upcoming" | "today" | "ended" | "none";

export function getPostStatus(post: SitePost, now = new Date()): PostStatus {
  const date = parsePostDate(post);
  if (!date) return "none";
  if (istanbulYmd(date) === istanbulYmd(now)) return "today";
  return date.getTime() > now.getTime() ? "upcoming" : "ended";
}

export function isPostNew(post: SitePost, now = new Date()): boolean {
  if (!post.createdAt) return false;
  const created = new Date(post.createdAt);
  if (Number.isNaN(created.getTime())) return false;
  const age = now.getTime() - created.getTime();
  return age >= 0 && age <= 7 * 24 * 60 * 60 * 1000 && getPostStatus(post, now) !== "ended";
}

export function statusLabel(status: PostStatus): string | null {
  switch (status) {
    case "upcoming":
      return "Yaklaşıyor";
    case "today":
      return "Bugün";
    case "ended":
      return "Sona erdi";
    default:
      return null;
  }
}

export function postTimeLabel(post: SitePost): string {
  const date = parsePostDate(post);
  if (!date) return "";
  const shifted = new Date(date.getTime() + ISTANBUL_OFFSET_MS);
  return `${String(shifted.getUTCHours()).padStart(2, "0")}:${String(shifted.getUTCMinutes()).padStart(2, "0")}`;
}

export function timeUntilLabel(post: SitePost, now = new Date()): string | null {
  const date = parsePostDate(post);
  if (!date) return null;
  const status = getPostStatus(post, now);
  if (status === "ended") return "Sona erdi";
  if (status === "today") return `Bugün ${postTimeLabel(post)}`;
  const days = Math.ceil((date.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
  return `${days} gün kaldı`;
}

export function pickCountdownPost(
  site: SiteData,
  now = new Date(),
): { post: SitePost; slug: string; href: string; date: string } | null {
  if (!site.countdown.enabled) return null;
  const items = postsWithSlugs(site.posts);
  const parsed = items
    .map(({ post, slug }) => ({ post, slug, date: parsePostDate(post) }))
    .filter((item): item is { post: SitePost; slug: string; date: Date } => item.date !== null);
  const grace = site.countdown.showEnded ? 24 * 60 * 60 * 1000 : 0;

  let chosen: { post: SitePost; slug: string; date: Date } | undefined;
  if (site.countdown.mode === "manual" && site.countdown.postSlug) {
    chosen = parsed.find((item) => item.slug === site.countdown.postSlug);
    if (!chosen || chosen.date.getTime() < now.getTime() - 24 * 60 * 60 * 1000) return null;
  } else {
    const cutoff = now.getTime() - grace;
    chosen = parsed
      .filter((item) => item.date.getTime() >= cutoff)
      .sort((a, b) => a.date.getTime() - b.date.getTime())[0];
  }
  if (!chosen) return null;
  return {
    post: chosen.post,
    slug: chosen.slug,
    href: `/duyurular/${chosen.slug}`,
    date: chosen.date.toISOString(),
  };
}

export function countdownFor(site: SiteData) {
  const picked = pickCountdownPost(site);
  return picked
    ? { label: site.countdown.label, title: picked.post.title, href: picked.href, date: picked.date }
    : null;
}

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
