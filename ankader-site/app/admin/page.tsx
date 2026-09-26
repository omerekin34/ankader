import AdminShell from "./AdminShell";
import { applicationErrorMessage, readApplications } from "@/lib/application-data";
import type { MembershipApplication } from "@/lib/application-types";
import { readSite } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const data = await readSite();
  let applications: MembershipApplication[] = [];
  let applicationsError = "";
  try {
    applications = await readApplications();
  } catch (error) {
    applicationsError = applicationErrorMessage(error);
  }
  return (
    <AdminShell
      initialData={data}
      initialApplications={applications}
      applicationsError={applicationsError}
    />
  );
}
