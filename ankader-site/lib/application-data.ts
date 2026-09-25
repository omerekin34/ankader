import { promises as fs } from "fs";
import path from "path";
import type { MembershipApplication } from "./application-types";

const filePath = path.join(process.cwd(), "data", "applications.json");

export async function readApplications(): Promise<MembershipApplication[]> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return (JSON.parse(raw) as MembershipApplication[]).map((item) => ({
      ...item,
      stage: item.stage ?? "",
      school: item.school ?? "",
    }));
  } catch {
    return [];
  }
}

export async function writeApplications(items: MembershipApplication[]) {
  await fs.writeFile(filePath, JSON.stringify(items, null, 2), "utf8");
}
