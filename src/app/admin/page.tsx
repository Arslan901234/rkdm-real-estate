import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Inbox, LandPlot, Pencil, Plus, Star, StarOff, TrendingUp, Users } from "lucide-react";
import LoginForm from "@/components/admin/login-form";
import AdminNav from "@/components/admin/admin-nav";
import { ConfirmDelete, StatusSelect } from "@/components/admin/controls";
import { isAdmin } from "@/lib/admin-auth";
import { getCounts, getInquiries, getProjects } from "@/lib/queries";
import { typeLabel } from "@/lib/utils";
import { deleteProject, setProjectStatus, toggleFeatured } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — Projects",
  robots: { index: false, follow: false },
};

const STATUS_OPTIONS = [
  { value: "available", label: "Available" },
  { value: "limited", label: "Limited" },
  { value: "sold", label: "Sold Out" },
];

export default async function AdminPage() {
  if (!(await isAdmin())) {
    return <LoginForm />;
  }

  const [list, counts, leads] = await Promise.all([
    getProjects({ includeSold: true }),
    getCounts(),
    getInquiries(),
  ]);

  const stats = [
    { icon: LandPlot, label: "Total Listings", value: counts.projects },
    { icon: TrendingUp, label: "Active (not sold)", value: counts.available },
    { icon: Users, label: "Total Inquiries", value: counts.leads },
    { icon: Inbox, label: "New Leads", value: counts.newLeads },
  ];

  return (
    <>
      <AdminNav />
      <div className="bg-sand-50 py-10">
        <div className="container-x">
          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white p-5 ring-1 ring-forest-950/8">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-800 text-gold-300">
                  <s.icon className="h-4.5 w-4.5" />
                </span>
                <p className="mt-3 font-display text-3xl font-medium text-forest-950">{s.value}</p>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-ink-500/80">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Header row */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-medium text-forest-950">Projects & Properties</h1>
              <p className="mt-1 text-sm text-ink-500">
                Add, edit, remove or change availability — updates go live instantly.
              </p>
            </div>
            <div className="flex gap-2.5">
              <Link href="/admin/inquiries" className="btn-outline-forest !px-5 !py-2.5 text-[13px]">
                <Inbox className="h-4 w-4" />
                Inquiries ({counts.newLeads} new)
              </Link>
              <Link href="/admin/projects/new" className="btn-gold !px-5 !py-2.5 text-[13px]">
                <Plus className="h-4 w-4" />
                Add New
              </Link>
            </div>
          </div>

          {/* Projects list */}
          <div className="mt-6 space-y-3">
            {list.map((p) => (
              <div
                key={p.id}
                className="grid grid-cols-[64px_1fr_auto] items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-forest-950/8 lg:grid-cols-[64px_1.4fr_1fr_auto_auto_auto]"
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-sand-100">
                  {p.images[0] ? (
                    <Image src={p.images[0]} alt="" fill sizes="64px" className="object-cover" />
                  ) : null}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-display text-lg font-medium text-forest-950">{p.name}</p>
                  <p className="truncate text-[12px] text-ink-500">
                    {p.location} · {typeLabel(p.type)} · {p.listing === "project" ? "Project" : "Property"}
                    {p.featured ? " · Featured" : ""}
                  </p>
                </div>
                <div className="hidden lg:block">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink-500/70">Price</p>
                  <p className="text-sm font-bold text-forest-900">{p.priceLabel}</p>
                </div>
                <div className="hidden lg:block">
                  <StatusSelect
                    id={p.id}
                    value={p.status}
                    options={STATUS_OPTIONS}
                    onChangeAction={setProjectStatus}
                  />
                </div>
                <div className="flex items-center gap-2 lg:contents">
                  <form action={toggleFeatured.bind(null, p.id)}>
                    <button
                      type="submit"
                      aria-label={p.featured ? "Remove from featured" : "Mark as featured"}
                      title={p.featured ? "Remove from featured" : "Mark as featured"}
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border transition ${p.featured ? "border-gold-400 bg-gold-100 text-gold-700 hover:bg-gold-200" : "border-forest-900/15 bg-white text-ink-500 hover:bg-sand-100"}`}
                    >
                      {p.featured ? <Star className="h-4 w-4 fill-gold-600 text-gold-600" /> : <StarOff className="h-4 w-4" />}
                    </button>
                  </form>
                  <Link
                    href={`/admin/projects/${p.id}`}
                    aria-label={`Edit ${p.name}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-forest-900/15 bg-white text-forest-800 transition hover:bg-sand-100"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <ConfirmDelete action={deleteProject} id={p.id} what={p.name} />
                </div>
                <div className="col-span-3 lg:hidden">
                  <StatusSelect
                    id={p.id}
                    value={p.status}
                    options={STATUS_OPTIONS}
                    onChangeAction={setProjectStatus}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-[12px] text-ink-500/80">
            Tip: mark a project <strong>Sold Out</strong> instead of deleting it — visitors
            still see it with a sold badge, and you keep the record. · Latest lead:{" "}
            {leads[0]
              ? `${leads[0].name} (${leads[0].phone}) on ${leads[0].createdAt.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`
              : "no inquiries yet"}
          </p>
        </div>
      </div>
    </>
  );
}
