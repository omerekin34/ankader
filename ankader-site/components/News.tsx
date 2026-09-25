import { Calendar, ChevronRight } from "lucide-react";

const posts = [
  {
    date: "12 Mart 2026",
    title: "Bahar dönemi gönüllü buluşması kayıtları açıldı",
  },
  {
    date: "28 Şubat 2026",
    title: "Gençlik çalıştayı: Dayanışma ve liderlik",
  },
  {
    date: "4 Şubat 2026",
    title: "Mahalle destek projesinin ilk etap raporu yayında",
  },
  {
    date: "18 Ocak 2026",
    title: "Yeni üye oryantasyon programı başlıyor",
  },
];

export default function News() {
  return (
    <section id="duyurular" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-primary uppercase">
            Duyurular
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
            Dernekten haberler
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <a
              key={post.title}
              href="#iletisim"
              className="group flex items-center justify-between gap-4 rounded-2xl border border-secondary/10 bg-white px-5 py-5 transition hover:border-primary hover:shadow-md"
            >
              <span>
                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-accent uppercase">
                  <Calendar className="size-3.5 text-primary" aria-hidden />
                  {post.date}
                </span>
                <span className="mt-2 block text-base font-semibold text-secondary">
                  {post.title}
                </span>
              </span>
              <ChevronRight
                className="size-5 shrink-0 text-accent transition group-hover:translate-x-0.5 group-hover:text-primary"
                aria-hidden
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
