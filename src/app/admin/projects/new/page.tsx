import type { Metadata } from "next";
import LoginForm from "@/components/admin/login-form";
import AdminNav from "@/components/admin/admin-nav";
import ProjectForm from "@/components/admin/project-form";
import { isAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — Add Project",
  robots: { index: false, follow: false },
};

export default async function NewProjectPage() {
  if (!(await isAdmin())) {
    return <LoginForm />;
  }
  return (
    <>
      <AdminNav />
      <div className="bg-sand-50 py-10">
        <div className="container-x max-w-4xl">
          <h1 className="font-display text-2xl font-medium text-forest-950">Add Project / Property</h1>
          <p className="mt-1 mb-6 text-sm text-ink-500">
            Fill what's verified — leave the rest as &quot;on request&quot;. Every field can be edited later.
          </p>
          <ProjectForm />
        </div>
      </div>
    </>
  );
}
