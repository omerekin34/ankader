import type { MembershipApplication } from "@/lib/application-types";
import type { SiteBoardMember, SiteMember } from "@/lib/site-types";

export const memberFilters = ["Tümü", "Yönetim", "Lise", "Üniversite", "Mezun"] as const;
export type MemberFilter = (typeof memberFilters)[number];

export type PublicMember = {
  name: string;
  group: Exclude<MemberFilter, "Tümü"> | "";
  role: string;
  detail: string;
  photo?: string;
};

function keyName(name: string) {
  return name.trim().toLocaleLowerCase("tr-TR");
}

function groupFromStage(stage: string | undefined): PublicMember["group"] {
  if (stage === "Yönetim") return "Yönetim";
  if (stage === "Lise öğrencisi" || stage === "Lise") return "Lise";
  if (stage === "Üniversite öğrencisi" || stage === "Üniversite") return "Üniversite";
  if (stage === "Mezun") return "Mezun";
  return "";
}

function detailFrom(parts: (string | undefined)[]) {
  return parts.map((part) => part?.trim()).filter(Boolean).join(" · ");
}

export function buildPublicMembers(
  members: SiteMember[],
  board: SiteBoardMember[],
  applications: MembershipApplication[],
): PublicMember[] {
  const map = new Map<string, PublicMember>();

  function upsert(item: PublicMember) {
    const key = keyName(item.name);
    if (!key) return;
    const current = map.get(key);
    if (!current) {
      map.set(key, item);
      return;
    }
    map.set(key, {
      name: current.name,
      group: current.group || item.group,
      role: current.role || item.role,
      detail: current.detail || item.detail,
      photo: current.photo || item.photo,
    });
  }

  for (const person of board) {
    upsert({
      name: person.name,
      group: "Yönetim",
      role: person.role,
      detail: person.role,
      photo: person.photo,
    });
  }

  for (const member of members) {
    const group = groupFromStage(member.stage);
    if (group === "Yönetim") continue;
    upsert({
      name: member.name,
      group,
      role: member.stage || "",
      detail: detailFrom([member.school, member.university, member.department, member.year]),
    });
  }

  for (const app of applications.filter((item) => item.status === "kabul")) {
    const group = groupFromStage(app.stage);
    if (group === "Yönetim") continue;
    upsert({
      name: app.name,
      group,
      role: app.stage || "",
      detail: detailFrom([app.school, app.university, app.department, app.year, app.city]),
    });
  }

  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name, "tr"));
}
