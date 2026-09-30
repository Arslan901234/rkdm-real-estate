import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Hero from "@/components/home/hero";
import PropertySearch from "@/components/home/property-search";
import WhyRkdm from "@/components/home/why-rkdm";
import SocialSection from "@/components/home/social-section";
import CtaBand from "@/components/home/cta-band";
import SectionHeading from "@/components/section-heading";
import ProjectCard from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { getFeaturedProjects, getDistinctLocations } from "@/lib/queries";

export const dynamic = "force-dynamic";

const MARQUEE_ITEMS = [
  "Residential Plots",
  "Land Parcels",
  "Farmhouse Plots",
  "Bungalow Schemes",
  "Site Visit Assistance",
  "Ahmedabad · Kheda · Bareja · Sokhda · Matar",
];

const CATEGORIES = [
  {
    title: "Residential Plots",
    text: "15×40 and similar residential plots in developing schemes with planned internal roads.",
    img: "/images/projects/silicon-city.jpg",
    href: "/properties?type=residential-plots",
  },
  {
    title: "Bungalow Schemes",
    text: "Plotted bungalow schemes near Ahmedabad's growing corridors and the New Ring Road side.",
    img: "/images/projects/bareja-bungalow.jpg",
    href: "/properties?type=bungalow-scheme",
  },
  {
    title: "Farmhouse Plots",
    text: "Weekend farmhouse plots with amenities like gates, bore water, gardens, pools and RCC roads.",
    img: "/images/projects/sokhda-farm.jpg",
    href: "/properties?type=farmhouse-plots",
  },
  {
    title: "Land Parcels",
    text: "Larger land opportunities — road-touch parcels and farmland for long-term plans.",
    img: "/images/projects/road-land.jpg",
    href: "/properties?type=land",
  },
];

export default async function Home() {
  const [featured, locations] = await Promise.all([
    getFeaturedProjects(3),
    getDistinctLocations(),
  ]);

  return (
    <>
      <Hero />

      {/* Property search — overlapping hero */}
      <div className="container-x relative z-20 -mt-20 sm:-mt-16">
        <Reveal delay={0.1}>
          <PropertySearch locations={locations} />
        </Reveal>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden border-b border-forest-950/8 bg-sand-50 py-5" aria-hidden>
        <div className="flex w-max animate-marquee items-center gap-10">
          {[...Array(2)].map((_, copy) => (
            <div key={copy} className="flex items-center gap-10">
              {MARQUEE_ITEMS.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="flex items-center gap-10 whitespace-nowrap font-display text-lg text-forest-800/80 italic"
                >
                  {item}
                  <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold-500" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Featured projects */}
      <section className="bg-sand-50 py-20 sm:py-28">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <SectionHeading
                eyebrow="Featured Projects"
                title="Current opportunities, shared transparently"
                description="Live projects and property opportunities from the RKDM portfolio. Every detail — price, size, roads, documentation — is maintained by our team."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Link href="/projects" className="btn-outline-forest">
                View All Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, i) => (
              <Reveal key={project.id} delay={0.08 * i}>
                <ProjectCard project={project} priority={i === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunity categories */}
      <section className="bg-forest-950 py-20 sm:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              dark
              eyebrow="What We Deal In"
              title="Four ways to own a piece of Gujarat"
              description="Choose the kind of opportunity that fits your plan — then verify every detail on a guided site visit."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((cat, i) => (
              <Reveal key={cat.title} delay={0.07 * i}>
                <Link
                  href={cat.href}
                  className="group relative block overflow-hidden rounded-2xl ring-1 ring-white/10"
                >
                  <div className="relative aspect-[3/4] sm:aspect-[4/5]">
                    <Image
                      src={cat.img}
                      alt={cat.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-[1.3s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-950/25 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="font-display text-2xl font-medium text-white">
                        {cat.title}
                      </h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-sand-100/75">
                        {cat.text}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-gold-300">
                        Explore
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WhyRkdm />
      <SocialSection />
      <CtaBand />
    </>
  );
}
