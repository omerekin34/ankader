import { promises as fs } from "fs";
import path from "path";
import type { SiteData } from "./site-types";

const filePath = path.join(process.cwd(), "data", "site.json");

export async function readSite(): Promise<SiteData> {
  const raw = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(raw) as SiteData;
  if (!Array.isArray(data.members)) data.members = [];
  data.contact = {
    ...data.contact,
    mapLat: data.contact.mapLat || "40.911291",
    mapLng: data.contact.mapLng || "29.2895983",
    mapsUrl:
      data.contact.mapsUrl ||
      "https://www.google.com/maps/place/ANKADER/@40.911291,29.2895983,19z",
    whatsappCommunity: data.contact.whatsappCommunity || "",
  };
  return data;
}

export async function writeSite(data: SiteData) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}
