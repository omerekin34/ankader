export const blogStatuses = ["bekliyor", "yayinda", "red"] as const;

export type BlogStatus = (typeof blogStatuses)[number];

export type BlogPost = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  title: string;
  body: string;
  status: BlogStatus;
};

export type PublicBlogPost = {
  id: string;
  createdAt: string;
  name: string;
  title: string;
  body: string;
};

export function blogExcerpt(body: string, max = 180) {
  const flat = body.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  return `${flat.slice(0, max).trim()}…`;
}

export function blogDateLabel(value: string) {
  const time = Date.parse(value);
  if (Number.isNaN(time)) return "";
  return new Date(time).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}
