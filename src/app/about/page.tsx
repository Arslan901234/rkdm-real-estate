import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Building2,
  Compass,
  FileText,
  Fingerprint,
  Landmark,
  MapPin,
} from "lucide-react";
import PageHero from "@/components/page-hero";
import SectionHeading from "@/components/section-heading";
import CtaBand from "@/components/home/cta-band";
import { Reveal } from "@/components/reveal";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "RKDM Real Estate India Limited (CIN U70109GJ2022PLC134589) — an Ahmedabad, Gujarat based real-estate business focused on residential plots, land, farmhouse plots and property assistance.",
};

const PRINCIPLES = [
  {
    icon: Compass,
    title: "Explore",
    text: "We present real property opportunities with photos, maps and on-ground context — so your shortlist starts informed.",
  },
  {
    icon: FileText,
    title: "Verify",
    text: "We openly share documentation notes and encourage every buyer to independently verify title, approvals and classification.",
  },
  {
    icon: BadgeCheck,
    title: "Decide",
    text: "No pressure tactics. You decide at your own pace, after walking the land and checking every paper.",
  },
];

const FOCUS = [
  "Residential plotting schemes",
  "Farmhouse plots & weekend land",
  "Bungalow scheme plots",
  "Large land parcels & road-touch land",
  "Property information & location guidance",
  "Site visit arrangement & on-ground assistance",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Grounded in Gujarat."
        accent="Guided by clarity."
        description="RKDM Real Estate is an Ahmedabad-based real-estate business helping buyers explore residential plots, land and farmhouse opportunities — with information you can verify."
      />

      {/* Story */}
      <section className="bg-sand-50 py-20 sm:py-26">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-forest-950/10">
                <Image
                  src="/images/about.jpg"
                  alt="Ahmedabad skyline at golden hour from the Sabarmati riverfront"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -right-4 -bottom-6 hidden rounded-2xl bg-forest-950 p-6 text-sand-50 shadow-2xl sm:block">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-gold-400">
                  Based In
                </p>
                <p className="mt-1.5 font-display text-2xl font-medium">Ahmedabad, Gujarat</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <SectionHeading
              eyebrow="Who We Are"
              title="A real-estate practice built around the buyer's clarity"
            />
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink-700">
              <p>
                {BRAND.name} ({BRAND.legalName}) is an Ahmedabad, Gujarat based
                real-estate business. We work with residential plots, land,
                farmhouse plots, bungalow schemes and large land parcels across
                the Ahmedabad district — including Kheda, Bareja, Sokhda and
                Matar.
              </p>
              <p>
                Our work is simple: give you clear, location-focused property
                information, arrange site visits so you can see everything
                yourself, and support you with property-related assistance —
                while you independently verify every legal and document detail,
                exactly as you should.
              </p>
              <p className="font-semibold text-forest-900">
                We never ask you to take our word for it. We ask you to come and
                see it.
              </p>
            </div>
            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {FOCUS.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm font-semibold text-forest-900">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-500" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-white py-20 sm:py-26">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Our Way of Working"
              title={`“${BRAND.tagline}”`}
              description="Three words that shape every conversation, every site visit and every project we present."
            />
          </Reveal>
          <div className="mt-13 grid gap-5 md:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={0.08 * i}>
                <article className="h-full rounded-2xl bg-sand-50 p-8 text-center ring-1 ring-forest-950/6">
                  <div className="mx-auto flex h-13 w-13 items-center justify-center rounded-full bg-forest-800 text-gold-300">
                    <p.icon className="h-5.5 w-5.5" strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-medium text-forest-950">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">{p.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Company facts */}
      <section className="bg-forest-950 py-20 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <SectionHeading
              dark
              eyebrow="Company Details"
              title="Registered, traceable, accountable"
              description="We operate as a registered limited company — our details are public and verifiable."
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Building2, label: "Legal Name", value: BRAND.legalName },
              { icon: Fingerprint, label: "CIN", value: BRAND.cin },
              { icon: Landmark, label: "Registered Office", value: BRAND.registeredOffice.join(" ") },
              { icon: MapPin, label: "Working Office", value: `${BRAND.customerOfficeDefault}, Ahmedabad, Gujarat` },
            ].map((f, i) => (
              <Reveal key={f.label} delay={0.06 * i}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <f.icon className="h-5 w-5 text-gold-400" />
                  <p className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.22em] text-sand-100/50">
                    {f.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed font-semibold text-sand-50">{f.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <p className="container-x mt-10 text-[12px] leading-relaxed text-sand-100/45">
          Note: The working office address may change — please confirm the
          current visiting address on our <Link href="/contact" className="text-gold-300 underline-offset-4 hover:underline">contact page</Link> before
          planning a visit.
        </p>
      </section>

      <CtaBand
        title="Meet us, then walk the land."
        text="Call or WhatsApp to talk through what you're looking for — we'll suggest matching opportunities and arrange a site visit."
      />
    </>
  );
}
