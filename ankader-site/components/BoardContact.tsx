import { Mail, Phone } from "lucide-react";
import type { ReactNode } from "react";

function telHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "";
}

function ContactBox({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="group/chip inline-grid max-w-full grid-cols-[2.25rem_0fr] items-center overflow-hidden rounded-2xl border border-primary/35 bg-secondary text-white shadow-[0_14px_30px_-18px_rgba(20,195,208,0.85)] transition-[grid-template-columns,transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary group-hover/card:grid-cols-[2.25rem_1fr] group-focus-within/card:grid-cols-[2.25rem_1fr] group-hover/chip:grid-cols-[2.25rem_1fr] group-focus-visible/chip:grid-cols-[2.25rem_1fr] [@media(hover:none)]:grid-cols-[2.25rem_1fr]"
    >
      <span className="grid size-9 place-items-center bg-primary text-secondary">{icon}</span>
      <span className="overflow-hidden">
        <span className="block px-3 text-sm font-medium whitespace-nowrap">{label}</span>
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
    <div className={`mt-4 flex flex-col gap-2 ${align === "center" ? "items-center" : "items-start"}`}>
      {tel ? <ContactBox href={telHref(tel)} label={tel} icon={<Phone className="size-3.5" aria-hidden />} /> : null}
      {mail ? <ContactBox href={`mailto:${mail}`} label={mail} icon={<Mail className="size-3.5" aria-hidden />} /> : null}
    </div>
  );
}
