import { Mail, Phone } from "lucide-react";
import type { ReactNode } from "react";

function telHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "";
}

function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  let local = digits;
  if (local.startsWith("90") && local.length === 12) local = local.slice(2);
  else if (local.startsWith("0") && local.length === 11) local = local.slice(1);
  if (local.length === 10) {
    return `+90 ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6, 8)} ${local.slice(8)}`;
  }
  return phone.trim();
}

function ContactBox({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      className="inline-flex w-max max-w-full items-stretch overflow-hidden rounded-full border border-primary/35 bg-secondary text-white shadow-[0_10px_24px_-16px_rgba(20,195,208,0.9)] transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary"
    >
      <span className="grid w-8 shrink-0 place-items-center bg-primary text-secondary @max-[11rem]:w-7">
        {icon}
      </span>
      <span className="flex min-w-0 items-center px-2.5 py-2 text-[13px] leading-none font-medium tracking-wide @max-[11rem]:px-2 @max-[11rem]:text-[11px] @max-[11rem]:tracking-tight">
        <span className="truncate">{label}</span>
      </span>
    </a>
  );
}

export default function BoardContact({
  email,
  phone,
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

  return (
    <div className={`@container mt-4 flex w-full min-w-0 flex-col gap-2 ${align === "center" ? "items-center" : "items-start"}`}>
      {tel ? <ContactBox href={telHref(tel)} label={formatPhone(tel)} icon={<Phone className="size-3.5" aria-hidden />} /> : null}
      {mail ? <ContactBox href={`mailto:${mail}`} label={mail} icon={<Mail className="size-3.5" aria-hidden />} /> : null}
    </div>
  );
}
