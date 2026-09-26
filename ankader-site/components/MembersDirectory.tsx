"use client";

import BoardAvatar from "@/components/BoardAvatar";
import FilterPanel from "@/components/FilterPanel";
import { memberFilters, type MemberFilter, type PublicMember } from "@/lib/public-members";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

export default function MembersDirectory({ members }: { members: PublicMember[] }) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<MemberFilter>("Tümü");

  const counts = useMemo(() => {
    const result = Object.fromEntries(memberFilters.map((item) => [item, 0])) as Record<MemberFilter, number>;
    result["Tümü"] = members.length;
    for (const member of members) {
      if (member.group) result[member.group] += 1;
    }
    return result;
  }, [members]);

  const visible = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr-TR");
    return members.filter((member) => {
      if (group !== "Tümü" && member.group !== group) return false;
      if (!q) return true;
      return [member.name, member.role, member.detail, member.group]
        .join(" ")
        .toLocaleLowerCase("tr-TR")
        .includes(q);
    });
  }, [members, group, query]);

  return (
    <div>
      <FilterPanel active={group !== "Tümü" || Boolean(query.trim())}>
        <div className="rounded-2xl border border-secondary/10 bg-background/60 p-4 sm:p-5">
          <label className="relative block">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-accent" aria-hidden />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="İsim, okul, bölüm veya görev ara"
              className="w-full rounded-xl border border-secondary/10 bg-white py-3 pr-4 pl-10 text-sm outline-none transition focus:border-primary"
            />
          </label>
          <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Üye grupları">
            {memberFilters.map((item) => {
              const active = group === item;
              const count = counts[item];
              return (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setGroup(item)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition ${
                    active
                      ? "border-primary bg-primary text-white"
                      : "border-secondary/10 bg-white text-secondary hover:border-primary/40"
                  }`}
                >
                  {item}
                  <span className={`ml-1.5 tabular-nums ${active ? "text-white/80" : "text-accent"}`}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </FilterPanel>

      <p className="mt-6 text-sm text-accent">
        {visible.length} üye
        {group !== "Tümü" ? ` · ${group}` : ""}
        {query.trim() ? ` · “${query.trim()}”` : ""}
      </p>

      {visible.length === 0 ? (
        <p className="mt-8 text-sm leading-7 text-accent">Bu filtrede isim yok. Etiketi veya aramayı değiştir.</p>
      ) : (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((member) => (
            <article
              key={member.name}
              className="rounded-2xl border border-secondary/10 bg-white p-5 transition hover:border-primary/35"
            >
              <div className="flex items-start justify-between gap-3">
                <BoardAvatar
                  name={member.name}
                  image={member.photo}
                  initials={member.name
                    .split(" ")
                    .filter(Boolean)
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toLocaleUpperCase("tr-TR")}
                  className="size-11 shrink-0 bg-secondary text-xs font-semibold text-white"
                />
                {member.group ? (
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-primary uppercase">
                    {member.group}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-4 text-base font-semibold">{member.name}</h3>
              <p className="mt-1 text-sm text-accent">{member.detail || member.role}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
