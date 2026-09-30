import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LoginForm from "@/components/admin/login-form";
import AdminNav from "@/components/admin/admin-nav";
import ProjectForm from "@/components/admin/project-form";
import { isAdmin } from "@/lib/admin-auth";
import { getProjectById } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — Edit Project",
  robots: { index: false, follow: false },
};

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdmin())) {
    return <LoginForm />;
  }
  const { id } = await params;
  const project = await getProjectById(Number(id));
  if (!project) notFound();

  return (
    <>
      <AdminNav />
      <div className="bg-sand-50 py-10">
        <div className="container-x max-w-4xl">
          <h1 className="font-display text-2xl font-medium text-forest-950">
            Edit — {project.name}
          </h1>
          <p className="mt-1 mb-6 text-sm text-ink-500">
            Changes go live on the website as soon as you save.
          </p>
          <ProjectForm initial={project} />
        </div>
      </div>
    </>
  );
}
