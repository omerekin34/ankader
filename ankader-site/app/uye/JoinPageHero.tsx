"use client";

import { PageHero } from "@/components/PageHero";
import type { SiteData } from "@/lib/site-types";
import { useSearchParams } from "next/navigation";

export default function JoinPageHero({ donate }: { donate: SiteData["donate"] }) {
  const bagis = useSearchParams().get("yol") === "bagis";

  return (
    <PageHero
      eyebrow={bagis ? donate.donateHeroEyebrow : donate.pageEyebrow}
      title={bagis ? donate.donateHeroTitle : donate.pageTitle}
      text={bagis ? donate.donateHeroText : donate.pageText}
    />
  );
}
