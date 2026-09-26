export default function CommunityJoin({
  whatsappHref,
  align = "start",
}: {
  whatsappHref: string;
  align?: "start" | "end";
}) {
  const end = align === "end";
  return (
    <div className={end ? "text-right" : ""}>
      <p className="text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">Topluluğumuza katıl</p>
      <p className={`mt-2 max-w-xs text-sm leading-6 text-accent ${end ? "ml-auto" : ""}`}>
        Duyurular ve saha haberleri WhatsApp topluluğunda da paylaşılır.
      </p>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-95"
      >
        WhatsApp’tan katıl
      </a>
    </div>
  );
}
