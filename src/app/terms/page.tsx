import type { Metadata } from "next";
import LegalPage, { LSection } from "@/components/legal-page";
import { BRAND, DISCLAIMER } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of use for the ${BRAND.name} website — property information, your responsibilities and limitations.`,
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of"
      accent="Use"
      intro="Please read these terms carefully before using this website or acting on any information published here."
    >
      <LSection title="Informational Purpose Only">
        <p>
          Content on this website — including project descriptions, prices,
          sizes, distances, amenities and documentation notes — is provided for
          general informational purposes. It does not constitute an offer,
          invitation to offer, financial advice or legal advice.
        </p>
      </LSection>

      <LSection title="No Guaranteed Outcomes">
        <p>
          Nothing on this website guarantees returns, appreciation, rental
          income or possession timelines. Property markets involve risk; any
          decision to purchase is solely yours.
        </p>
      </LSection>

      <LSection title="Verification Responsibility">
        <p>{DISCLAIMER}</p>
        <p>
          Statuses such as NA, NOC or Title Clear are displayed only where
          verified for a specific project, and remain subject to your
          independent verification.
        </p>
      </LSection>

      <LSection title="Accuracy & Changes">
        <p>
          Prices, availability, plot sizes, amenities and distances may vary by
          project and may change without prior notice. Certain distances and
          features are project-specific marketing claims and are marked as
          such. Always confirm current details directly with our team before
          planning a purchase or a visit.
        </p>
      </LSection>

      <LSection title="Intellectual Property">
        <p>
          All content, imagery and branding on this website belong to{" "}
          {BRAND.legalName} or its licensors and may not be reproduced without
          written permission.
        </p>
      </LSection>

      <LSection title="Limitation of Liability">
        <p>
          To the fullest extent permitted by law, {BRAND.legalName} shall not be
          liable for any loss arising from reliance on information published on
          this website or from the use of third-party services linked here.
        </p>
      </LSection>

      <LSection title="Governing Law">
        <p>
          These terms are governed by the laws of India, and courts at
          Ahmedabad, Gujarat shall have jurisdiction over any disputes arising
          from the use of this website.
        </p>
      </LSection>

      <LSection title="Contact">
        <p>
          Questions about these terms: {BRAND.email} · {BRAND.phone}
        </p>
      </LSection>
    </LegalPage>
  );
}
