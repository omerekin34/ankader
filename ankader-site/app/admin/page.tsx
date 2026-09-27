import AdminShell from "./AdminShell";
import { applicationErrorMessage, readApplications, readUyeler } from "@/lib/application-data";
import type { MembershipApplication } from "@/lib/application-types";
import { blogErrorMessage, readBlogs } from "@/lib/blog-data";
import type { BlogPost } from "@/lib/blog-types";
import { readSite } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const data = await readSite();
  let applications: MembershipApplication[] = [];
  let applicationsError = "";
  let blogs: BlogPost[] = [];
  let blogsError = "";
  let members: MembershipApplication[] = [];
  let membersError = "";
  try {
    applications = await readApplications();
  } catch (error) {
    applicationsError = applicationErrorMessage(error);
  }
  try {
    members = await readUyeler();
  } catch (error) {
    membersError = error instanceof Error && error.message === "MISSING_ENV"
      ? "Üye listesi için sunucu anahtarı eksik."
      : "Üyeler Supabase'den alınamadı.";
  }
  try {
    blogs = await readBlogs();
  } catch (error) {
    blogsError = blogErrorMessage(error);
  }
  return (
    <AdminShell
      initialData={data}
      initialApplications={applications}
      applicationsError={applicationsError}
      initialBlogs={blogs}
      blogsError={blogsError}
      initialMembers={members}
      membersError={membersError}
    />
  );
}
