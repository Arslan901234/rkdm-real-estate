import type { Metadata } from "next";
import { CalendarCheck, ClipboardCheck, MapPinned, PhoneCall, Route } from "lucide-react";
import PageHero from "@/components/page-hero";
import SiteVisitForm from "@/components/forms/site-visit-form";
import { Reveal } from "@/components/reveal";
import { WhatsAppIcon } from "@/components/social-icons";
import { BRAND } from "@/lib/brand";
import { getProjects, getProjectBySlug } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book Site Visit",
  description: `Book a guided site visit with ${BRAND.name} — see plots, roads and surroundings yourself before you decide. Call ${BRAND.phone} or book online.`,
};

const STEPS = [
  {
    icon: CalendarCheck,
    title: "You book",
    text: "Pick your project, date and time slot — or leave everything flexible.",
  },
  {
    icon: PhoneCall,
    title: "We confirm",
    text: "Our team calls you to confirm the schedule, meeting point and route.",
  },
  {
    icon: MapPinned,
    title: "We walk the site",
    text: "Guided visit: plots, road widths, amenities, surroundings and nearby landmarks.",
  },
  {
    icon: ClipboardCheck,
    title: "You verify & decide",
    text: "Take documentation notes home, verify independently, decide at your pace.",
  },
];

export default async function BookSiteVisitPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const projectSlug = typeof sp.project === "string" ? sp.project : undefined;

  const all = await getProjects({ includeSold: true });
  const projects = all
    .filter((p) => p.status !== "sold")
    .map((p) => ({ name: p.name, location: p.location }));

  let defaultProject = "";
  if (projectSlug) {
    const match = await getProjectBySlug(projectSlug);
    if (match) defaultProject = match.name;
  }

  return (
    <>
      <PageHero
        eyebrow="Book Site Visit"
        title="See it with"
        accent="your own eyes"
        description="Photos inform, but only a site visit convinces. Book a guided visit — walk the plots, measure the roads with your eyes, and ask us anything on the spot."
      />

      <section className="bg-sand-50 py-14 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <SiteVisitForm projects={projects} defaultProject={defaultProject} />
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={0.08}>
              <div className="rounded-2xl bg-forest-950 p-7 text-sand-100 sm:p-8">
                <h2 className="font-display text-xl font-medium">How your visit works</h2>
                <ol className="mt-6 space-y-6">
                  {STEPS.map((s, i) => (
                    <li key={s.title} className="flex gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/8 text-gold-300 ring-1 ring-white/10">
                        <s.icon className="h-5 w-5" strokeWidth={1.8} />
                      </span>
                      <div>
                        <p className="text-sm font-bold text-sand-50">
                          <span className="mr-2 font-display text-gold-400">{String(i + 1).padStart(2, "0")}</span>
                          {s.title}
                        </p>
                        <p className="mt-1 text-[13px] leading-relaxed text-sand-100/65">{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="rounded-2xl bg-white p-7 ring-1 ring-forest-950/8">
                <h2 className="flex items-center gap-3 font-display text-lg font-medium text-forest-950">
                  <Route className="h-5 w-5 text-gold-600" />
                  Prefer to talk first?
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-500">
                  Call or WhatsApp us — we can shortlist projects that match
                  your budget and plan visits to two or three sites in one trip.
                </p>
                <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  <a href={BRAND.tel} className="btn-forest !px-4 !py-2.5 text-[13px]">
                    Call {BRAND.phoneDisplay}
                  </a>
                  <a href={BRAND.whatsapp} target="_blank" rel="noreferrer" className="btn-whatsapp !px-4 !py-2.5 text-[13px]">
                    <WhatsAppIcon className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
