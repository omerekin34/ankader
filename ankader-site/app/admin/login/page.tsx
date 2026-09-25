"use client";

import { BrandStack } from "@/components/Brand";
import ThemeToggle, { useAnkaderTheme } from "@/components/ThemeToggle";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const theme = useAnkaderTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    setLoading(false);
    if (!response.ok) {
      setError("Kullanıcı adı veya şifre hatalı.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="admin-shell relative flex min-h-screen items-center justify-center px-4">
      <div className="admin-card w-full max-w-md rounded-3xl p-8">
        <div className="flex items-center justify-end">
          <ThemeToggle surface="panel" />
        </div>
        <div className="flex justify-center">
          <BrandStack className="w-36" onDark={theme === "dark"} />
        </div>
        <h1 className="mt-5 text-center text-2xl font-extrabold text-secondary">Yönetim Paneli</h1>
        <p className="mt-2 text-center text-sm text-accent">Dernek sitesini buradan yönetirsiniz.</p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="block text-sm font-medium text-secondary">
            Kullanıcı adı
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="admin-field mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none"
              autoComplete="username"
            />
          </label>
          <label className="block text-sm font-medium text-secondary">
            Şifre
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="admin-field mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none"
              autoComplete="current-password"
            />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
          >
            {loading ? "Giriş yapılıyor..." : "Panele gir"}
          </button>
        </form>
      </div>
    </div>
  );
}
