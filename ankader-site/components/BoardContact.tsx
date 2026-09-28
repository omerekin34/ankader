import { Mail, Phone } from "lucide-react";
import type { ReactNode } from "react";

function telHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "";
}

function ChipText({ label }: { label: string }) {
  const parts = label.split(/\s+/).filter(Boolean);
  if (parts.length < 3) return label;
  const splitAt = Math.ceil(parts.length / 2);
  const head = parts.slice(0, splitAt).join("\u00A0");
  const tail = parts.slice(splitAt).join("\u00A0");
  return (
    <>
      {head}
      {" "}
      <wbr />
      {tail}
    </>
  );
}

function ContactBox({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="group/chip grid w-full min-w-0 max-w-full grid-cols-[2rem_minmax(0,1fr)] items-stretch overflow-hidden rounded-2xl border border-primary/35 bg-secondary text-white shadow-[0_14px_30px_-18px_rgba(20,195,208,0.85)] transition-[grid-template-columns,transform,border-color] duration-300 hover:border-primary sm:inline-grid sm:w-auto sm:grid-cols-[2.25rem_0fr] sm:items-center sm:hover:-translate-y-0.5 sm:group-hover/card:grid-cols-[2.25rem_minmax(0,1fr)] sm:group-focus-within/card:grid-cols-[2.25rem_minmax(0,1fr)] sm:group-hover/chip:grid-cols-[2.25rem_minmax(0,1fr)] sm:group-focus-visible/chip:grid-cols-[2.25rem_minmax(0,1fr)] [@media(hover:none)]:w-full [@media(hover:none)]:grid-cols-[2rem_minmax(0,1fr)] sm:[@media(hover:none)]:grid-cols-[2.25rem_minmax(0,1fr)]"
    >
      <span className="grid min-h-8 place-items-center bg-primary text-secondary sm:min-h-9">{icon}</span>
      <span className="min-w-0">
        <span className="block px-1.5 py-2 text-[11px] leading-snug font-medium tracking-tight sm:px-3 sm:py-2.5 sm:text-sm sm:leading-none sm:tracking-normal sm:whitespace-nowrap">
          <ChipText label={label} />
        </span>
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
