export function PageHero({
  eyebrow,
  title,
  text,
  overlap = true,
}: {
  eyebrow: string;
  title: string;
  text: string;
  overlap?: boolean;
}) {
  return (
    <section className="relative bg-secondary text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
      </div>
      <div
        className={`relative mx-auto max-w-7xl px-5 pt-36 sm:px-8 sm:pt-40 ${
          overlap ? "pb-36 sm:pb-44" : "pb-20 sm:pb-24"
        }`}
      >
        <p className="text-[11px] font-semibold tracking-[0.32em] text-primary uppercase">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-4xl leading-[1.05] sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-xl text-sm leading-7 text-white/70 sm:text-base">{text}</p>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
