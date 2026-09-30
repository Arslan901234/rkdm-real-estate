import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building,
  FileSearch,
  Handshake,
  LandPlot,
  MapPinned,
  MessagesSquare,
  Sprout,
} from "lucide-react";
import PageHero from "@/components/page-hero";
import SectionHeading from "@/components/section-heading";
import CtaBand from "@/components/home/cta-band";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "RKDM Real Estate services: residential plots and land opportunities, farmhouse plots, bungalow schemes, property information, site visit assistance and documentation guidance in Ahmedabad, Gujarat.",
};

const SERVICES = [
  {
    icon: LandPlot,
    title: "Residential Plots & Land",
    text: "Residential plotting schemes and open land across Ahmedabad district — from compact 15×40 plots to large parcels. We share sizes, roads, pricing and location context upfront.",
  },
  {
    icon: Sprout,
    title: "Farmhouse Plots",
    text: "Weekend farmhouse plots with amenities like entry gates, bore water, gardens, swimming pools and RCC internal roads — presented with honest, project-specific details.",
  },
  {
    icon: Building,
    title: "Bungalow Schemes",
    text: "Plotted bungalow schemes near Ahmedabad's growth corridors, including New Ring Road side locations, with scheme-level infrastructure information.",
  },
  {
    icon: MessagesSquare,
    title: "Property Information",
    text: "Location-focused property information over call, WhatsApp or in person — rates, dimensions, distances and amenities as provided for each specific project.",
  },
  {
    icon: MapPinned,
    title: "Site Visit Assistance",
    text: "We schedule, coordinate and accompany site visits — walk the plot, check road widths, see surroundings and get your questions answered on the spot.",
  },
  {
    icon: FileSearch,
    title: "Property-Related Assistance",
    text: "Guidance on documentation aspects to check — title, NA status, layout sanctions and records — with a clear encouragement to verify independently with legal professionals.",
  },
];

const PROCESS = [
  { step: "01", title: "Enquire", text: "Call, WhatsApp or send the enquiry form with your location, budget and plot size preference." },
  { step: "02", title: "Explore", text: "We share matching opportunities with photos, pricing, sizes and documentation notes available with us." },
  { step: "03", title: "Visit", text: "Book a site visit — see the land, roads and nearby landmarks yourself before shortlisting." },
  { step: "04", title: "Verify", text: "Independently verify ownership, title, approvals and land classification with your own advisors." },
  { step: "05", title: "Decide", text: "Proceed only when you are fully satisfied — with clarity on every detail." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Services built around"
        accent="your confidence"
        description="From first enquiry to site visit and paperwork questions — RKDM Real Estate supports every step of your property exploration, without pressure and without inflated promises."
      />

      <section className="bg-sand-50 py-18 sm:py-24">
        <div className="container-x">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={0.06 * (i % 3)}>
                <article className="group h-full rounded-2xl bg-white p-8 ring-1 ring-forest-950/6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_56px_-26px_rgba(6,31,20,0.3)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-800 text-gold-300 transition-colors duration-500 group-hover:bg-gold-500 group-hover:text-forest-950">
                    <s.icon className="h-5.5 w-5.5" strokeWidth={1.8} />
                  </span>
                  <h2 className="mt-5 font-display text-xl font-semibold text-forest-950">{s.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">{s.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-forest-950 py-20 sm:py-26">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              dark
              align="center"
              eyebrow="How It Works"
              title="From enquiry to decision — five honest steps"
              description="A simple, transparent process. You stay in control of the pace at every step."
            />
          </Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={0.07 * i}>
                <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <span className="font-display text-3xl font-semibold text-gold-500/90">{p.step}</span>
                  <h3 className="mt-3 font-display text-lg font-medium text-white">{p.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-sand-100/65">{p.text}</p>
                  {i < PROCESS.length - 1 && (
                    <ArrowRight className="absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-gold-500 lg:block" aria-hidden />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <div className="mt-12 text-center">
              <div className="flex flex-wrap items-center justify-center gap-3.5">
                <Link href="/properties" className="btn-gold">
                  Explore Properties
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/book-site-visit" className="btn-outline-light">
                  Book Site Visit
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-18 sm:py-24">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Our Commitment"
              title="What we will never do"
              description="Trust is built by what a company refuses to claim. At RKDM Real Estate:"
            />
            <ul className="mt-6 space-y-3">
              {[
                "We don't promise guaranteed returns or appreciation.",
                "We don't display NA, NOC or Title Clear status unless verified for that specific project.",
                "We don't rush your decision — site visits and verification come first.",
                "We don't hide the fine print — pricing, distances and claims are marked clearly and remain editable per project.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl bg-sand-50 p-4 text-sm font-semibold text-forest-900 ring-1 ring-forest-950/6">
                  <Handshake className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="rounded-3xl bg-forest-950 p-8 text-sand-50 sm:p-10">
              <p className="eyebrow !text-gold-400">
                <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold-500" aria-hidden />
                Talk To Us
              </p>
              <h2 className="mt-4 font-display text-3xl font-medium">Not sure where to start?</h2>
              <p className="mt-4 text-sm leading-relaxed text-sand-100/70">
                Tell us your budget, preferred location and plot size. We will
                share what is genuinely available — including options that may
                not be listed online yet.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="tel:+918866000677" className="btn-gold !px-5 !py-2.5 text-[13px]">
                  Call 8866000677
                </a>
                <Link href="/contact" className="btn-outline-light !px-5 !py-2.5 text-[13px]">
                  Send Enquiry
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
