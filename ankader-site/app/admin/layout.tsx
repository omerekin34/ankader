import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yönetim Paneli — ANKADER",
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return children;
}
