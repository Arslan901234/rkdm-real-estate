import type { Metadata } from "next";
import { SearchX } from "lucide-react";
import PageHero from "@/components/page-hero";
import ProjectCard from "@/components/project-card";
import ProjectFilters from "@/components/project-filters";
import CtaBand from "@/components/home/cta-band";
import { Reveal } from "@/components/reveal";
import { getDistinctLocations, getProjects, type ProjectFilter } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Properties — Plots, Land & Farmhouse Opportunities",
  description:
    "Browse residential plots, bungalow schemes, farmhouse plots and land parcels from RKDM Real Estate across Ahmedabad, Kheda, Bareja, Sokhda and Matar. Filter by location, budget, type and plot size.",
};

function parseRange(v?: string): { min?: number; max?: number } {
  if (!v) return {};
  const [min, max] = v.split("-").map(Number);
  return {
    min: Number.isFinite(min) && min > 0 ? min : undefined,
    max: Number.isFinite(max) && max < 1000000 ? max : undefined,
  };
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const get = (k: string) => {
    const v = sp[k];
    return typeof v === "string" ? v : undefined;
  };

  const budget = parseRange(get("budget"));
  const size = parseRange(get("size"));

  const filter: ProjectFilter = {
    q: get("location"),
    type: get("type"),
    status: get("status"),
    minPrice: budget.min,
    maxPrice: budget.max,
    minSize: size.min,
    maxSize: size.max,
  };

  const [projects, locations] = await Promise.all([
    getProjects(filter),
    getDistinctLocations(),
  ]);

  const isFiltered = Boolean(
    filter.q || filter.type || filter.status || get("budget") || get("size")
  );

  return (
    <>
      <PageHero
        eyebrow="RKDM Real Estate"
        title="Property"
        accent="Opportunities"
        description="Every listing below is maintained by our team with editable pricing, availability, sizes, documentation notes and location details. Verify each detail with us on a site visit."
      />

      <section className="bg-sand-50 py-12 sm:py-16">
        <div className="container-x">
          <Reveal>
            <ProjectFilters
              locations={locations}
              action="/properties"
              current={{
                location: get("location"),
                budget: get("budget"),
                type: get("type"),
                size: get("size"),
                status: get("status"),
              }}
            />
          </Reveal>

          <div className="mt-8 flex items-baseline justify-between gap-4">
            <p className="text-sm font-semibold text-ink-500">
              {projects.length} {projects.length === 1 ? "opportunity" : "opportunities"}
              {isFiltered ? " matching your filters" : " currently listed"}
            </p>
          </div>

          {projects.length === 0 ? (
            <div className="mt-10 flex flex-col items-center rounded-2xl bg-white px-6 py-20 text-center ring-1 ring-forest-950/8">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sand-100 text-gold-700">
                <SearchX className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-medium text-forest-950">
                No matches for these filters
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-500">
                Try widening your budget or size range — or call us directly.
                New opportunities are added regularly and not every option is
                listed online.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href="/properties" className="btn-outline-forest !px-5 !py-2.5 text-[13px]">
                  Clear Filters
                </a>
                <a href="tel:+918866000677" className="btn-forest !px-5 !py-2.5 text-[13px]">
                  Call 8866000677
                </a>
              </div>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <Reveal key={project.id} delay={0.05 * (i % 3)}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBand
        title="Can't find exactly what you need?"
        text="Tell us your preferred location, budget and plot size — we'll share matching options as they become available, and take you for a site visit."
      />
    </>
  );
}
