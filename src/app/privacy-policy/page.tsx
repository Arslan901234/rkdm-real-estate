import type { Metadata } from "next";
import LegalPage, { LSection } from "@/components/legal-page";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy of ${BRAND.legalName} — how we collect, use and protect information shared through this website.`,
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy"
      accent="Policy"
      intro={`How ${BRAND.legalName} collects, uses and protects the information you share with us through this website.`}
    >
      <LSection title="Information We Collect">
        <p>
          When you use our contact form, site-visit booking form, call us or
          message us on WhatsApp, we may collect:
        </p>
        <ul className="list-inside list-disc space-y-1.5 pl-1">
          <li>Your name and phone number</li>
          <li>Your email address (if shared)</li>
          <li>Property preferences — location, budget, plot size and project interest</li>
          <li>Preferred date and time for site visits</li>
          <li>Any message or requirements you share with us</li>
        </ul>
      </LSection>

      <LSection title="How We Use Your Information">
        <p>We use the information only to:</p>
        <ul className="list-inside list-disc space-y-1.5 pl-1">
          <li>Respond to your enquiry and share property information</li>
          <li>Arrange, coordinate and confirm site visits</li>
          <li>Follow up on properties you have shown interest in</li>
          <li>Improve our listings and the information we publish</li>
        </ul>
        <p>We do not sell, rent or trade your personal information.</p>
      </LSection>

      <LSection title="Third-Party Services">
        <p>
          This website embeds or links to third-party services — Google Maps,
          YouTube, Instagram and WhatsApp. When you interact with these, their
          own privacy policies apply. We encourage you to review them.
        </p>
      </LSection>

      <LSection title="Data Retention & Security">
        <p>
          Enquiry details are retained only as long as needed to assist you and
          maintain our business records. Access to this data is limited to the
          RKDM Real Estate team.
        </p>
      </LSection>

      <LSection title="Your Choices">
        <p>
          You may ask us to update or delete your information, or stop further
          communication, at any time by emailing {BRAND.email} or calling{" "}
          {BRAND.phone}.
        </p>
      </LSection>

      <LSection title="Contact">
        <p>
          {BRAND.legalName}
          <br />
          {BRAND.registeredOffice.join(" ")}
          <br />
          Email: {BRAND.email} · Phone: {BRAND.phone}
        </p>
      </LSection>
    </LegalPage>
  );
}
