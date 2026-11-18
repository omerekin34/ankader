import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

const URL_RE = /(https?:\/\/[^\s<>"'）)\]]+|\bwww\.[^\s<>"']+)/g;
const TRAILING_PUNCT = /[.,;:!?)]+$/;

export function linkifyText(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const match of text.matchAll(URL_RE)) {
    const raw = match[0];
    const start = match.index ?? 0;
    const trailing = raw.match(TRAILING_PUNCT)?.[0] ?? "";
    const url = raw.slice(0, raw.length - trailing.length);
    if (start > last) nodes.push(text.slice(last, start));
    const href = url.startsWith("www.") ? `https://${url}` : url;
    const display = url.replace(/^https?:\/\//, "");
    nodes.push(
      <a
        key={key++}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={href}
        className="font-semibold break-all text-primary underline decoration-primary/40 underline-offset-4 transition hover:text-primary/80 hover:decoration-primary"
      >
        {display.length > 48 ? `${display.slice(0, 48)}…` : display}
        <ExternalLink className="ml-1 inline size-3.5 align-[-2px]" aria-hidden />
      </a>,
    );
    if (trailing) nodes.push(trailing);
    last = start + raw.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export default function RichText({ text, className }: { text: string; className?: string }) {
  return <span className={className}>{linkifyText(text)}</span>;
}
