import { PageHero } from "@/components/PageHero";
import { Footer, Navbar } from "@/components/SiteChrome";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tüzük — ANKADER",
  description: "ANKADER dernek tüzüğünün özeti ve temel maddeleri.",
};

const maddeler = [
  {
    n: "01",
    title: "Amaç",
    text: "Zorlu süreçlerden geçen öğrencilerin yanında durmak; eğitim, gönüllülük ve saha dayanışmasıyla yalnızlığı kırmak.",
  },
  {
    n: "02",
    title: "Çalışma alanları",
    text: "Burs ve mentorluk, çalıştaylar, mahalle ve kampüs destekleri. Her faaliyet ihtiyaç görülünce başlar, sonuç paylaşılır.",
  },
  {
    n: "03",
    title: "Üyelik",
    text: "Öğrenci başvurusu yönetimce değerlendirilir. Üye, gönüllü ve destek talep eden aynı kapıdan girer.",
  },
  {
    n: "04",
    title: "Şeffaflık",
    text: "Karar, kaynak ve saha işi görünür durur. Bağış ve aidat kayıtları dernek usulünce tutulur.",
  },
];

export default function TuzukPage() {
  return (
    <div className="bg-background text-secondary">
      <Navbar />
      <main>
        <PageHero
          eyebrow="Kurumsal"
          title="Tüzüğümüz, yönümüz"
          text="Tam metin dernek dosyasında durur. Burada yönümüzü özetliyoruz. Resmî suret için iletişime yazın."
        />
        <section className="relative z-10 -mt-20 px-5 pb-12 sm:-mt-24 sm:px-8">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
            {maddeler.map((item) => (
              <article
                key={item.n}
                data-reveal
                className="reveal rounded-[1.6rem] bg-white p-7 shadow-[0_18px_50px_-28px_rgba(15,44,65,0.45)]"
              >
                <p className="text-xs font-semibold tracking-[0.2em] text-primary">{item.n}</p>
                <h2 className="mt-3 text-2xl">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-accent">{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
