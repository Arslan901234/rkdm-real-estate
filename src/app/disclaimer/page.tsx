import type { Metadata } from "next";
import { ShieldAlert } from "lucide-react";
import LegalPage, { LSection } from "@/components/legal-page";
import { BRAND, DISCLAIMER } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Property Disclaimer",
  description: `Property disclaimer of ${BRAND.name} — availability, pricing, dimensions and documentation may vary and must be independently verified.`,
};

export default function DisclaimerPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Property"
      accent="Disclaimer"
      intro="The single most important page on this website. Read it before acting on any property information published here."
    >
      <div className="rounded-2xl bg-forest-950 p-7 text-sand-100 sm:p-9">
        <p className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.24em] text-gold-400">
          <ShieldAlert className="h-4 w-4" />
          Official Disclaimer
        </p>
        <p className="mt-4 font-display text-lg leading-relaxed text-sand-50 sm:text-xl">
          &ldquo;{DISCLAIMER}&rdquo;
        </p>
      </div>

      <LSection title="What This Means in Practice">
        <ul className="list-inside list-disc space-y-1.5 pl-1">
          <li>
            Prices, rates (per Var, per Bigha or otherwise), availability and
            plot dimensions may vary by project and can change without notice.
          </li>
          <li>
            Distances (e.g., from Ring Road, bus depot, landmarks or Ahmedabad)
            are approximate and, where marked, are project-specific marketing
            claims that may be edited or removed.
          </li>
          <li>
            Amenities and infrastructure listed for a project reflect
            information provided for that project and may change as
            development progresses.
          </li>
          <li>
            Statuses such as NA, NOC, Title Clear, RERA registration or
            possession are displayed only where verified for that specific
            project — and must still be independently verified by you.
          </li>
          <li>
            Images and videos are illustrative of the project or its
            surroundings and may not represent the exact plot being offered.
          </li>
        </ul>
      </LSection>

      <LSection title="Your Responsibility as a Buyer">
        <p>
          Before any purchase decision, independently verify ownership, title,
          approvals, NA / land classification, layout sanctions, encumbrances,
          RERA applicability and all applicable legal requirements — preferably
          with an independent advocate.
        </p>
      </LSection>

      <LSection title="Contact">
        <p>
          For clarifications about any project detail, contact us: {BRAND.email}{" "}
          · {BRAND.phone}
        </p>
      </LSection>
    </LegalPage>
  );
}
