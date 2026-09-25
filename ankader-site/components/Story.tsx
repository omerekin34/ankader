import Image from "next/image";

export default function Story() {
  return (
    <section id="hikayemiz" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-primary uppercase">
            Bizim Hikayemiz
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
            Küllerinden doğan bir dayanışma
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-accent">
            <p>
              Bizler küllerinden doğan gençleriz. Zorlu günlerin ardından
              birbirimize tutunarak, umudu yeniden yeşertmek için bir araya
              geldik. ANKADER yalnızca bir dernek değil; aynı yolu yürüyenlerin
              birbirini iyileştirdiği, gönüllülüğün hayat bulduğu bir yuvadır.
            </p>
            <p>
              Kulüplerimizde üretiyor, çalıştaylarımızda öğreniyor, sosyal
              sorumluluk projelerimizle mahallemize ve şehrimize dokunuyoruz.
              Her adımımız, yarını birlikte kurma sözümüzdür.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-primary/20" />
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80"
            alt="Birlikte çalışan gençler"
            width={900}
            height={720}
            className="h-[420px] w-full rounded-[2rem] object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
