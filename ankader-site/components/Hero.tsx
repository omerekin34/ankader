import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="anasayfa" className="relative h-screen min-h-[640px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2000&q=80)",
        }}
        role="img"
        aria-label="Bir arada duran topluluk üyeleri"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/55 via-secondary/50 to-secondary/80" />

      <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-5 text-center text-white">
        <p className="mb-4 text-xs font-semibold tracking-[0.28em] text-primary uppercase">
          Sivil toplum · Dayanışma
        </p>
        <h1 className="text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          ANKADER
          <span className="mt-2 block text-primary">Küllerinden Doğuyor</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
          Dayanışmayla büyüyen, gençlerin sesini yükselten ve birlikte yeniden
          ayağa kalkan bir topluluğuz. Hikâyemiz umut, emeğimiz paylaşmak.
        </p>
        <a
          href="#iletisim"
          className="mt-9 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-secondary/30 transition hover:bg-primary/90"
        >
          Bizimle İletişime Geç
          <ArrowRight className="size-4" aria-hidden />
        </a>
      </div>
    </section>
  );
}
