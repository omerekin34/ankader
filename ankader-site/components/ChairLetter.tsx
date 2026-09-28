import BoardAvatar from "@/components/BoardAvatar";
import type { SiteChairLetter } from "@/lib/site-types";

export default function ChairLetter({
  message,
  portrait,
}: {
  message: SiteChairLetter;
  portrait?: { name: string; initials: string; photo?: string };
}) {
  const paragraphs = message.body
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (!message.greeting.trim() && paragraphs.length === 0) return null;
  const mark = message.highlight.trim();

  return (
    <article className="overflow-hidden rounded-[2rem] border border-primary/40 bg-white shadow-[0_28px_70px_-34px_rgba(20,195,208,0.65)]">
      <div className="h-1.5 bg-primary" />
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_17rem]">
        <aside className="flex flex-col justify-between gap-8 border-primary/30 bg-secondary px-6 py-8 text-white sm:px-8 lg:sticky lg:top-36 lg:col-start-2 lg:row-start-1 lg:self-start lg:border-l lg:px-7 lg:py-10">
          <p className="text-[11px] font-semibold tracking-[0.32em] text-primary uppercase">{message.eyebrow}</p>
          <div>
            {portrait ? (
              <BoardAvatar
                name={portrait.name}
                initials={portrait.initials}
                image={portrait.photo}
                className="size-24 bg-primary text-2xl font-bold text-secondary"
              />
            ) : null}
            <p className="mt-5 font-script text-5xl leading-none text-primary">{message.name}</p>
            <p className="mt-3 text-sm leading-6 text-white/75">{message.role}</p>
          </div>
        </aside>
        <div className="px-6 py-8 sm:px-10 sm:py-12 lg:col-start-1 lg:row-start-1">
          <h2 className="max-w-3xl text-3xl leading-[1.15] text-secondary sm:text-4xl">{message.greeting}</h2>
          <div className="mt-8 max-w-3xl space-y-5 text-[15px] leading-8 text-accent sm:text-base sm:leading-8">
            {paragraphs.map((paragraph, index) =>
              mark && paragraph === mark ? (
                <p
                  key={`${index}-${paragraph.slice(0, 24)}`}
                  className="rounded-2xl border border-primary/30 bg-primary/10 px-5 py-4 text-lg leading-8 font-medium text-secondary"
                >
                  {paragraph}
                </p>
              ) : (
                <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>
              ),
            )}
          </div>
          {message.closing.trim() ? (
            <p className="mt-10 max-w-3xl border-l-2 border-primary pl-5 text-2xl leading-snug text-secondary sm:text-3xl">
              {message.closing}
            </p>
          ) : null}
          {message.farewell.trim() ? <p className="mt-6 text-sm tracking-wide text-accent">{message.farewell}</p> : null}
        </div>
      </div>
    </article>
  );
}
