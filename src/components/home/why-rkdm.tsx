import {
  FileSearch,
  HeartHandshake,
  LandPlot,
  Layers,
  Map,
  MapPinned,
} from "lucide-react";
import SectionHeading from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const REASONS = [
  {
    icon: Layers,
    title: "Multiple Property Opportunities",
    text: "Residential plots, farmhouse plots, bungalow schemes and land parcels across Ahmedabad district — explored at your pace.",
  },
  {
    icon: MapPinned,
    title: "Site Visit Assistance",
    text: "We arrange and accompany site visits so you can walk the land, see the roads, and understand the surroundings firsthand.",
  },
  {
    icon: Map,
    title: "Location-Focused Information",
    text: "Clear location context for every opportunity — roads, nearby landmarks and connectivity, shared honestly.",
  },
  {
    icon: LandPlot,
    title: "Plots & Land Options",
    text: "From compact 15×40 residential plots to large farmhouse and agricultural land parcels — options for every plan.",
  },
  {
    icon: FileSearch,
    title: "Transparent Property Information",
    text: "Pricing, dimensions and documentation notes are shared as provided by the project — with clear guidance to verify independently.",
  },
  {
    icon: HeartHandshake,
    title: "Customer-Focused Assistance",
    text: "Direct support on call and WhatsApp — from your first enquiry to site visit and documentation questions.",
  },
];

export default function WhyRkdm() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Why RKDM Real Estate"
            title="A grounded way to explore property in Gujarat"
            description="No pressure, no inflated promises — just clear property information, real locations and support that respects your decision."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={0.06 * i}>
              <article className="group h-full rounded-2xl bg-sand-50 p-7 ring-1 ring-forest-950/6 transition-all duration-500 hover:-translate-y-1 hover:bg-sand-100 hover:shadow-[0_24px_48px_-24px_rgba(6,31,20,0.25)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-800 text-gold-300 transition-colors duration-500 group-hover:bg-gold-500 group-hover:text-forest-950">
                  <r.icon className="h-5.5 w-5.5" strokeWidth={1.8} />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-forest-950">
                  {r.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-500">{r.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
