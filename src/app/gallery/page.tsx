import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import GalleryGrid from "@/components/gallery-grid";
import CtaBand from "@/components/home/cta-band";
import { Reveal } from "@/components/reveal";
import { getProjects } from "@/lib/queries";
import { BRAND } from "@/lib/brand";
import { InstagramIcon } from "@/components/social-icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from RKDM Real Estate projects — plotting schemes, bungalow schemes, farmhouse plots and land across Ahmedabad and Kheda, Gujarat.",
};

export default async function GalleryPage() {
  const projects = await getProjects({ includeSold: true });
  const items = projects.flatMap((p) =>
    p.images.map((src) => ({
      src,
      project: p.name,
      slug: p.slug,
      location: p.location,
    }))
  );

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The land,"
        accent="as it is"
        description="Real imagery from our projects and the areas around them. For day-to-day site clips and new photos, follow our Instagram."
      />

      <section className="bg-sand-50 py-12 sm:py-16">
        <div className="container-x">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm font-semibold text-ink-500">
                {items.length} photos from {projects.length} listings
              </p>
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.2em] text-gold-700 transition hover:text-gold-600"
              >
                <InstagramIcon className="h-4 w-4" />
                More on Instagram
              </a>
            </div>
          </Reveal>
          <GalleryGrid items={items} />
        </div>
      </section>

      <CtaBand
        title="Like what you see? See it live."
        text="Photos are the beginning. Book a guided site visit and walk the actual plots, roads and surroundings."
      />
    </>
  );
}
