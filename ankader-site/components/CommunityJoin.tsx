export default function CommunityJoin({ whatsappHref }: { whatsappHref: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">Topluluğumuza katıl</p>
      <p className="mt-2 max-w-xl text-sm leading-6 text-accent">
        Duyurular ve saha haberleri WhatsApp topluluğunda da paylaşılır.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href="/uye?yol=uye"
          className="inline-flex rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
        >
          Üye ol
        </a>
        <a
          href="/uye?yol=bagis"
          className="inline-flex rounded-full border border-secondary/10 px-4 py-2.5 text-sm font-semibold hover:border-primary/40"
        >
          Bağış yap
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-95"
        >
          WhatsApp’tan katıl
        </a>
      </div>
    </div>
  );
}
