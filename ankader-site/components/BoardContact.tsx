import { Mail, Phone } from "lucide-react";

function telHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "";
}

export default function BoardContact({
  email,
  phone,
  tone = "light",
  align = "start",
}: {
  email?: string;
  phone?: string;
  tone?: "light" | "dark";
  align?: "start" | "center";
}) {
  const mail = email?.trim() ?? "";
  const tel = phone?.trim() ?? "";
  if (!mail && !tel) return null;

  const item =
    tone === "dark"
      ? "border-white/15 bg-white/10 text-white hover:border-primary hover:text-primary"
      : "border-secondary/10 bg-background text-secondary hover:border-primary/40 hover:text-primary";

  return (
    <div className={`mt-4 flex flex-col gap-2 ${align === "center" ? "items-center" : "items-start"}`}>
      {mail ? (
        <a href={`mailto:${mail}`} className={`inline-flex max-w-full items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition ${item}`}>
          <Mail className="size-3.5 shrink-0 text-primary" aria-hidden />
          <span className="truncate">{mail}</span>
        </a>
      ) : null}
      {tel ? (
        <a href={telHref(tel)} className={`inline-flex max-w-full items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition ${item}`}>
          <Phone className="size-3.5 shrink-0 text-primary" aria-hidden />
          <span className="truncate">{tel}</span>
        </a>
      ) : null}
    </div>
  );
}
