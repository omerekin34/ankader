"use client";

import DonateBox from "@/app/uye/DonateBox";
import JoinForm from "@/app/uye/JoinForm";
import type { SiteData } from "@/lib/site-types";
import { HeartHandshake, UserPlus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Mode = "uye" | "bagis";

function modeFromQuery(value: string | null): Mode {
  return value === "bagis" ? "bagis" : "uye";
}

export default function ContributeChoice({
  donate,
  email,
}: {
  donate: SiteData["donate"];
  email: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(() => modeFromQuery(searchParams.get("yol")));

  useEffect(() => {
    setMode(modeFromQuery(searchParams.get("yol")));
  }, [searchParams]);

  function go(next: Mode) {
    setMode(next);
    router.replace(`/uye?yol=${next}`, { scroll: false });
  }

  const join = mode === "uye";

  return (
    <article
      className={`mx-auto max-w-2xl overflow-hidden rounded-[1.8rem] px-6 py-8 shadow-[0_18px_50px_-28px_rgba(15,44,65,0.45)] sm:px-10 sm:py-12 ${
        join ? "bg-white" : "bg-secondary text-white"
      }`}
    >
      <div
        className={`grid grid-cols-2 gap-1 rounded-full p-1 ${
          join ? "bg-background" : "bg-white/10"
        }`}
        role="tablist"
        aria-label="Katılım türü"
      >
        <button
          type="button"
          role="tab"
          aria-selected={join}
          onClick={() => go("uye")}
          className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
            join ? "bg-primary text-white" : "text-white/70 hover:text-white"
          }`}
        >
          Üye ol
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={!join}
          onClick={() => go("bagis")}
          className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
            !join
              ? "bg-primary text-white"
              : "text-secondary/70 hover:text-secondary"
          }`}
        >
          Bağış yap
        </button>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <h2 className="min-w-0 text-3xl">{join ? donate.joinTitle : donate.donateTitle}</h2>
        <span
          className={`inline-flex size-12 shrink-0 items-center justify-center rounded-full ${
            join ? "bg-primary/10 text-primary" : "bg-primary/20 text-primary"
          }`}
        >
          {join ? <UserPlus className="size-5" aria-hidden /> : <HeartHandshake className="size-5" aria-hidden />}
        </span>
      </div>
      <p className={`mt-3 text-sm leading-7 ${join ? "text-accent" : "text-white/70"}`}>
        {join ? donate.joinText : donate.donateText}
      </p>

      {join ? (
        <JoinForm />
      ) : (
        <DonateBox
          iban={donate.iban}
          bank={donate.bank}
          accountName={donate.accountName}
          note={donate.note}
          amounts={donate.amounts}
          email={email}
        />
      )}
    </article>
  );
}
