import type { Metadata } from "next";
import LoginForm from "@/components/admin/login-form";
import AdminNav from "@/components/admin/admin-nav";
import SettingsForm from "@/components/admin/settings-form";
import { isAdmin } from "@/lib/admin-auth";
import { getAllSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — Settings",
  robots: { index: false, follow: false },
};

export default async function SettingsPage() {
  if (!(await isAdmin())) {
    return <LoginForm />;
  }
  const settings = await getAllSettings();

  return (
    <>
      <AdminNav />
      <div className="bg-sand-50 py-10">
        <div className="container-x max-w-3xl">
          <h1 className="font-display text-2xl font-medium text-forest-950">Site Settings</h1>
          <p className="mt-1 mb-6 text-sm text-ink-500">
            Editable business details shown across the website.
          </p>
          <SettingsForm initial={settings} />
        </div>
      </div>
    </>
  );
}
