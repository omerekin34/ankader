export default function JoinBand({
  eyebrow = "Bu masada yerin var",
  title = "Öğrenciysen, gönüllüysen veya destek olmak istiyorsan kapı açık.",
}: {
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section className="px-4 pb-24">
      <div
        data-reveal
        className="reveal relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-secondary px-8 py-14 text-white sm:px-12 sm:py-16"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-10 size-52 rounded-full bg-primary/10 blur-3xl" />
        <p className="text-xs font-semibold tracking-[0.28em] text-primary uppercase">{eyebrow}</p>
        <h2 className="mt-4 max-w-3xl text-3xl leading-tight sm:text-5xl">{title}</h2>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="/uye?yol=uye"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition duration-500 hover:bg-primary/90"
          >
            Üye ol
          </a>
          <a
            href="/uye?yol=bagis"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition duration-500 hover:border-primary"
          >
            Bağış yap
          </a>
        </div>
      </div>
    </section>
  );
}
