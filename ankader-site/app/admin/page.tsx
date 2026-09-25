import AdminShell from "./AdminShell";
import { readApplications } from "@/lib/application-data";
import { readSite } from "@/lib/site-data";

export default async function AdminPage() {
  const [data, applications] = await Promise.all([readSite(), readApplications()]);
  return <AdminShell initialData={data} initialApplications={applications} />;
}
