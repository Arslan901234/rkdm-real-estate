import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, SearchX } from "lucide-react";
import PageHero from "@/components/page-hero";
import ProjectCard from "@/components/project-card";
import ProjectFilters from "@/components/project-filters";
import CtaBand from "@/components/home/cta-band";
import { Reveal } from "@/components/reveal";
import { getDistinctLocations, getProjects, type ProjectFilter } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects — Plotting Schemes & Developments",
  description:
    "Explore RKDM Real Estate projects: Silicon City Kheda, Bareja Bungalow Scheme, Sail Kunj Residency, Sokhda farmhouse plots and more across Gujarat.",
};

function parseRange(v?: string): { min?: number; max?: number } {
  if (!v) return {};
  const [min, max] = v.split("-").map(Number);
  return {
    min: Number.isFinite(min) && min > 0 ? min : undefined,
    max: Number.isFinite(max) && max < 1000000 ? max : undefined,
  };
}

export default async function ProjectsPage({
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
    listing: "project",
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

  return (
    <>
      <PageHero
        eyebrow="Our Schemes & Developments"
        title="RKDM"
        accent="Projects"
        description="Plotting schemes and developments we are currently working with — each with on-ground site visit support and honest, editable project information."
      />

      <section className="bg-sand-50 py-12 sm:py-16">
        <div className="container-x">
          <Reveal>
            <ProjectFilters
              locations={locations}
              action="/projects"
              current={{
                location: get("location"),
                budget: get("budget"),
                type: get("type"),
                size: get("size"),
                status: get("status"),
              }}
            />
          </Reveal>

          {projects.length === 0 ? (
            <div className="mt-10 flex flex-col items-center rounded-2xl bg-white px-6 py-20 text-center ring-1 ring-forest-950/8">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sand-100 text-gold-700">
                <SearchX className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-medium text-forest-950">
                No projects match these filters
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-500">
                Clear the filters or reach out — upcoming schemes are often
                opened to enquirers before being listed online.
              </p>
              <a href="/projects" className="btn-outline-forest mt-6 !px-5 !py-2.5 text-[13px]">
                Clear Filters
              </a>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <Reveal key={project.id} delay={0.05 * (i % 3)}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          )}

          <Reveal delay={0.1}>
            <div className="mt-14 flex flex-col items-start justify-between gap-5 rounded-2xl bg-forest-900 p-7 text-sand-50 sm:flex-row sm:items-center sm:p-9">
              <div>
                <h2 className="font-display text-2xl font-medium">
                  Looking for land parcels or individual opportunities?
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-sand-100/70">
                  Beyond schemes, we also list individual property opportunities —
                  road-touch land, farmhouse parcels and more.
                </p>
              </div>
              <Link href="/properties" className="btn-gold shrink-0">
                Browse Properties
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
