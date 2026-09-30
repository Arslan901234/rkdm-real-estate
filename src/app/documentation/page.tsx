import type { Metadata } from "next";
import Link from "next/link";
import {
  FileCheck2,
  FileText,
  Files,
  Landmark,
  Map,
  ReceiptText,
  Scale,
  Scroll,
  ShieldCheck,
  Stamp,
} from "lucide-react";
import PageHero from "@/components/page-hero";
import SectionHeading from "@/components/section-heading";
import CtaBand from "@/components/home/cta-band";
import { Reveal } from "@/components/reveal";
import { BRAND, DISCLAIMER } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About Documentation",
  description:
    "A plain-language guide to property documentation for plots and land in Gujarat — 7/12 utara, NA orders, title clearance, sale deed, layout plans and what to verify before you buy.",
};

const DOCS = [
  {
    icon: Scroll,
    title: "7/12 Utara (Satbara)",
    text: "The primary revenue record for land in Gujarat, showing the survey number, landholder's name, land classification and cultivation details. Always obtain the latest 7/12 before considering any land purchase.",
  },
  {
    icon: Landmark,
    title: "NA Order (Non-Agricultural Permission)",
    text: "Agricultural land must have NA (non-agricultural) permission before it can be used for residential or plotting purposes. Check the NA order number, purpose and validity for the exact survey numbers.",
  },
  {
    icon: Scale,
    title: "Title Clearance",
    text: "A clear, marketable title means the seller's ownership is traceable and free of disputes or encumbrances. A lawyer's title-search report across 30+ years of records is the safest route.",
  },
  {
    icon: Map,
    title: "Layout / Sanction Plan",
    text: "For plotting schemes, verify the sanctioned layout plan showing plot numbers, internal roads, common plots and amenities — and whether it matches what exists on the ground.",
  },
  {
    icon: Stamp,
    title: "Sale Deed & Index-2",
    text: "The registered sale deed is the core ownership-transfer document; Index-2 is its registration receipt from the Sub-Registrar. Check names, survey numbers and boundaries carefully.",
  },
  {
    icon: ReceiptText,
    title: "Encumbrance & Dues",
    text: "Confirm there are no mortgages, liens, litigation or unpaid revenue dues attached to the land. Encumbrance certificates and revenue receipts help establish this.",
  },
  {
    icon: Files,
    title: "RERA (Where Applicable)",
    text: "Many plotted developments in Gujarat fall under GujRERA. Where applicable, check the project's RERA registration number on the official GujRERA portal and verify it independently.",
  },
  {
    icon: FileCheck2,
    title: "NOCs & Authority Approvals",
    text: "Depending on location, projects may need NOCs or approvals from local authorities (panchayat, AUDA, roads & buildings, etc.). Ask which apply to the specific project and verify them.",
  },
];

const CHECKLIST = [
  "Latest 7/12 utara for the exact survey / plot number",
  "NA order status and validity (if land was agricultural)",
  "Chain of title documents & prior sale deeds",
  "Sanctioned layout plan vs. ground reality",
  "Encumbrance / litigation / loan status",
  "RERA registration where applicable",
  "Road access and right-of-way documentation",
  "Seller identity and authority to sell",
];

export default function DocumentationPage() {
  return (
    <>
      <PageHero
        eyebrow="Buyer Education"
        title="About"
        accent="Documentation"
        description="Paperwork is where trust is proven. This guide explains, in plain language, the documents that matter when buying plots and land in Gujarat — and what we display, and never assume, on our projects."
      />

      {/* Our position */}
      <section className="bg-forest-950 py-14 sm:py-18">
        <div className="container-x grid items-center gap-8 lg:grid-cols-[auto_1fr_auto]">
          <Reveal>
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500 text-forest-950">
              <ShieldCheck className="h-7 w-7" strokeWidth={1.8} />
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-2xl font-medium text-white sm:text-3xl">
              Our documentation position — in one line
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-sand-100/70 sm:text-[15px]">
              We display statuses like <strong className="text-gold-300">NA</strong>,{" "}
              <strong className="text-gold-300">NOC</strong> or{" "}
              <strong className="text-gold-300">Title Clear</strong> only where they are
              verified for the specific project — and even then, we ask you to
              independently verify ownership, title, approvals and land
              classification with your own legal advisor before any decision.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <Link href="/book-site-visit" className="btn-gold shrink-0">
              Ask On a Site Visit
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Documents grid */}
      <section className="bg-sand-50 py-18 sm:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Know The Papers"
              title="Key documents for Gujarat plots & land"
              description="Not legal advice — a starting point for the questions you should ask on every property, ours included."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DOCS.map((d, i) => (
              <Reveal key={d.title} delay={0.05 * (i % 4)}>
                <article className="h-full rounded-2xl bg-white p-6 ring-1 ring-forest-950/6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(6,31,20,0.25)]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sand-100 text-gold-700">
                    <d.icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-forest-950">{d.title}</h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-ink-500">{d.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="bg-white py-18 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Before You Buy"
              title="The RKDM verification checklist"
              description="Carry this checklist to every site visit and every document review — for our projects and anyone else's."
            />
            <div className="mt-8 rounded-2xl bg-forest-950 p-7 text-sand-100">
              <p className="flex items-center gap-3 text-sm font-bold text-gold-300">
                <FileText className="h-4 w-4" />
                Important
              </p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-sand-100/75">
                {BRAND.nameShort} Real Estate is a real-estate business, not a law
                firm. For title searches, NA verification and document scrutiny,
                please engage an independent advocate or legal professional.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid gap-3">
              {CHECKLIST.map((item, i) => (
                <li
                  key={item}
                  className="flex items-start gap-4 rounded-xl bg-sand-50 p-4 ring-1 ring-forest-950/6"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest-800 font-display text-[13px] font-semibold text-gold-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="pt-0.5 text-sm font-semibold text-forest-900">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-sand-100 py-14">
        <div className="container-x">
          <Reveal>
            <div className="rounded-2xl border border-gold-600/25 bg-white p-7 sm:p-9">
              <h2 className="flex items-center gap-3 font-display text-xl font-medium text-forest-950">
                <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold-500" aria-hidden />
                Property Disclaimer
              </h2>
              <p className="mt-4 max-w-4xl text-sm leading-relaxed text-ink-700">{DISCLAIMER}</p>
              <Link
                href="/disclaimer"
                className="mt-5 inline-block text-[12px] font-extrabold uppercase tracking-[0.2em] text-gold-700 transition hover:text-gold-600"
              >
                Read Full Disclaimer
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Questions about a project's papers?"
        text="Call or WhatsApp us — we'll share whatever documentation information is available for that specific project, and help you frame the right questions for your legal advisor."
      />
    </>
  );
}
