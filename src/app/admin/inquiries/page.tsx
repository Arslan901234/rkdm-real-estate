import type { Metadata } from "next";
import { CalendarCheck, Inbox, Mail, MessageSquare, Phone } from "lucide-react";
import LoginForm from "@/components/admin/login-form";
import AdminNav from "@/components/admin/admin-nav";
import { StatusSelect } from "@/components/admin/controls";
import { isAdmin } from "@/lib/admin-auth";
import { getInquiries } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { setInquiryStatus } from "../actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — Inquiries",
  robots: { index: false, follow: false },
};

const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "closed", label: "Closed" },
];

export default async function InquiriesPage() {
  if (!(await isAdmin())) {
    return <LoginForm />;
  }

  const leads = await getInquiries();

  return (
    <>
      <AdminNav />
      <div className="bg-sand-50 py-10">
        <div className="container-x">
          <h1 className="font-display text-2xl font-medium text-forest-950">Inquiries & Site Visit Requests</h1>
          <p className="mt-1 text-sm text-ink-500">
            {leads.length} total · newest first. Contact details are private — handle with care.
          </p>

          {leads.length === 0 ? (
            <div className="mt-8 flex flex-col items-center rounded-2xl bg-white px-6 py-16 text-center ring-1 ring-forest-950/8">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sand-100 text-gold-700">
                <Inbox className="h-6 w-6" />
              </span>
              <p className="mt-4 font-display text-xl font-medium text-forest-950">No inquiries yet</p>
              <p className="mt-1.5 text-sm text-ink-500">
                New enquiries and site-visit requests will appear here as they arrive.
              </p>
            </div>
          ) : (
            <div className="mt-8 space-y-3">
              {leads.map((lead) => (
                <article
                  key={lead.id}
                  className="rounded-2xl bg-white p-5 ring-1 ring-forest-950/8 sm:p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em]",
                          lead.type === "site-visit"
                            ? "bg-gold-100 text-gold-800"
                            : "bg-forest-100 text-forest-800"
                        )}
                      >
                        {lead.type === "site-visit" ? (
                          <CalendarCheck className="h-3 w-3" />
                        ) : (
                          <MessageSquare className="h-3 w-3" />
                        )}
                        {lead.type === "site-visit" ? "Site Visit" : "Contact"}
                      </span>
                      <p className="text-[12px] text-ink-500">
                        {lead.createdAt.toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <StatusSelect
                      id={lead.id}
                      value={lead.status}
                      options={STATUS_OPTIONS}
                      onChangeAction={setInquiryStatus}
                    />
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-[1.1fr_1fr]">
                    <div>
                      <p className="font-display text-lg font-medium text-forest-950">{lead.name}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <a
                          href={`tel:${lead.phone}`}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-forest-800 px-3 py-1.5 text-[12px] font-bold text-sand-50 hover:bg-forest-700"
                        >
                          <Phone className="h-3 w-3" />
                          {lead.phone}
                        </a>
                        {lead.email ? (
                          <a
                            href={`mailto:${lead.email}`}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-forest-900/15 px-3 py-1.5 text-[12px] font-bold text-forest-800 hover:bg-sand-100"
                          >
                            <Mail className="h-3 w-3" />
                            {lead.email}
                          </a>
                        ) : null}
                      </div>
                    </div>
                    <div className="text-[13px] leading-relaxed text-ink-700">
                      {lead.projectName ? (
                        <p>
                          <span className="font-extrabold uppercase tracking-wider text-[10px] text-ink-500/70">Interest: </span>
                          {lead.projectName}
                        </p>
                      ) : null}
                      {lead.preferredDate ? (
                        <p>
                          <span className="font-extrabold uppercase tracking-wider text-[10px] text-ink-500/70">Visit: </span>
                          {lead.preferredDate}
                          {lead.preferredTime ? ` · ${lead.preferredTime}` : ""}
                        </p>
                      ) : null}
                      {lead.message ? (
                        <p className="mt-1.5 rounded-lg bg-sand-50 p-3 text-[13px]">{lead.message}</p>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
