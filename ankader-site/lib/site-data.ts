import { promises as fs } from "fs";
import path from "path";
import { applyDefaults } from "./site-defaults";
import type { SiteData } from "./site-types";

const filePath = path.join(process.cwd(), "data", "site.json");

export async function readSite(): Promise<SiteData> {
  const raw = await fs.readFile(filePath, "utf8");
  return applyDefaults(JSON.parse(raw) as Partial<SiteData>);
}

export async function writeSite(data: SiteData) {
  const full = applyDefaults(data);
  await fs.writeFile(filePath, JSON.stringify(full, null, 2), "utf8");
}
