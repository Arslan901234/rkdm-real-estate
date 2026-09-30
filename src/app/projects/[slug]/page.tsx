import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Check,
  FileText,
  Info,
  LandPlot,
  MapPin,
  Phone,
  Route,
  Ruler,
  ShieldAlert,
} from "lucide-react";
import ProjectGallery from "@/components/project-gallery";
import ProjectCard from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { WhatsAppIcon } from "@/components/social-icons";
import { BRAND, DISCLAIMER } from "@/lib/brand";
import { getProjectBySlug, getRelatedProjects } from "@/lib/queries";
import { cn, mapEmbedUrl, mapLinkUrl, STATUS_META, typeLabel, waLink, youtubeEmbed } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.name} — ${project.location}`,
    description: `${project.name}: ${project.tagline || typeLabel(project.type)} in ${project.location}. ${project.priceLabel}. Site visit available — call ${BRAND.phone}.`,
  };
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-sand-50 p-4 ring-1 ring-forest-950/6">
      <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink-500/80">
        <Icon className="h-3.5 w-3.5 text-gold-600" />
        {label}
      </p>
      <p className="mt-1.5 text-[15px] font-bold text-forest-900">{value}</p>
    </div>
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const status = STATUS_META[project.status] ?? STATUS_META.available;
  const related = await getRelatedProjects(project, 3);
  const heroImg = project.images[0] ?? "/images/plots-sunset.jpg";
  const embeds = project.videos
    .map((v) => youtubeEmbed(v))
    .filter((v): v is string => Boolean(v));
  const phone = project.contactPhone || BRAND.phone;
  const wa = waLink(
    `Hello RKDM Real Estate, I'm interested in "${project.name}" (${project.location}). Please share details.`
  );
  const mapQ = project.mapQuery || `${project.name}, ${project.location}, Gujarat`;

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[62svh] items-end overflow-hidden bg-forest-950 pt-32 pb-10 sm:min-h-[68svh]">
        <Image
          src={heroImg}
          alt={project.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/35 to-forest-950/50" />
        <div className="grain absolute inset-0" />
        <div className="container-x relative">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-6">
              <Link
                href={project.listing === "project" ? "/projects" : "/properties"}
                className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-sand-100/70 transition hover:text-gold-300"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to {project.listing === "project" ? "Projects" : "Properties"}
              </Link>
            </nav>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-950/60 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-sand-100 backdrop-blur-md ring-1 ring-white/20">
                <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
                {status.label}
              </span>
              <span className="rounded-full bg-gold-500/95 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-forest-950">
                {typeLabel(project.type)}
              </span>
              {project.distance ? (
                <span className="rounded-full bg-white/10 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-sand-100 ring-1 ring-white/20 backdrop-blur-md">
                  {project.distance}
                </span>
              ) : null}
            </div>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-medium leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              {project.name}
            </h1>
            <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-gold-300">
              <MapPin className="h-4 w-4" />
              {project.location}
              {project.tagline ? <span className="hidden text-sand-100/70 sm:inline">· {project.tagline}</span> : null}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <section className="bg-sand-50 py-12 sm:py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_370px]">
          {/* Left column */}
          <div className="min-w-0">
            <Reveal>
              <ProjectGallery images={project.images} name={project.name} />
            </Reveal>

            {project.description ? (
              <Reveal className="mt-10">
                <h2 className="font-display text-2xl font-medium text-forest-950 sm:text-3xl">
                  About this {project.listing === "project" ? "project" : "opportunity"}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed whitespace-pre-line text-ink-700">
                  {project.description}
                </p>
              </Reveal>
            ) : null}

            <Reveal className="mt-10">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <Fact icon={BadgeCheck} label="Price" value={project.priceLabel} />
                {project.sizeLabel ? (
                  <Fact icon={LandPlot} label="Plot / Area Size" value={project.sizeLabel} />
                ) : null}
                {project.roadWidth ? (
                  <Fact icon={Route} label="Road Access" value={project.roadWidth} />
                ) : null}
                <Fact icon={MapPin} label="Location" value={project.location} />
                {project.distance ? (
                  <Fact icon={Ruler} label="Distance" value={project.distance} />
                ) : null}
                <Fact icon={BadgeCheck} label="Availability" value={status.label} />
              </div>
            </Reveal>

            {project.features.length > 0 ? (
              <Reveal className="mt-10">
                <h3 className="font-display text-xl font-medium text-forest-950 sm:text-2xl">
                  Project Highlights
                </h3>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {project.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 rounded-xl bg-white p-4 text-sm font-semibold text-ink-700 ring-1 ring-forest-950/6"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-800 text-gold-300">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            {project.amenities.length > 0 ? (
              <Reveal className="mt-10">
                <h3 className="font-display text-xl font-medium text-forest-950 sm:text-2xl">
                  Amenities & Infrastructure
                </h3>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {project.amenities.map((a) => (
                    <span
                      key={a}
                      className="rounded-full border border-gold-500/40 bg-gold-100/60 px-4 py-2 text-[12.5px] font-bold text-forest-900"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </Reveal>
            ) : null}

            {project.documentation.length > 0 ? (
              <Reveal className="mt-10">
                <div className="rounded-2xl bg-forest-950 p-6 text-sand-100 sm:p-8">
                  <h3 className="flex items-center gap-3 font-display text-xl font-medium sm:text-2xl">
                    <FileText className="h-5 w-5 text-gold-400" />
                    Documentation Notes
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {project.documentation.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-sm leading-relaxed text-sand-100/85">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-500" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  {project.claimsNote ? (
                    <p className="mt-5 flex items-start gap-3 rounded-xl bg-white/5 p-4 text-[12.5px] leading-relaxed text-gold-200 ring-1 ring-white/10">
                      <Info className="mt-0.5 h-4 w-4 shrink-0" />
                      {project.claimsNote}
                    </p>
                  ) : null}
                  <p className="mt-4 text-[12px] leading-relaxed text-sand-100/55">
                    Always verify ownership, title, approvals and land
                    classification independently before any purchase decision.{" "}
                    <Link href="/documentation" className="font-bold text-gold-300 underline-offset-4 hover:underline">
                      Read our documentation guide
                    </Link>
                  </p>
                </div>
              </Reveal>
            ) : null}

            {embeds.length > 0 ? (
              <Reveal className="mt-10">
                <h3 className="font-display text-xl font-medium text-forest-950 sm:text-2xl">
                  Project Videos
                </h3>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  {embeds.map((src, i) => (
                    <div key={src} className="overflow-hidden rounded-2xl ring-1 ring-forest-950/10">
                      <iframe
                        src={src}
                        title={`${project.name} video ${i + 1}`}
                        className="aspect-video w-full"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ))}
                </div>
              </Reveal>
            ) : null}

            <Reveal className="mt-10">
              <h3 className="font-display text-xl font-medium text-forest-950 sm:text-2xl">
                Location on Map
              </h3>
              <div className="mt-5 overflow-hidden rounded-2xl ring-1 ring-forest-950/10">
                <iframe
                  src={mapEmbedUrl(mapQ)}
                  title={`Map — ${project.name}, ${project.location}`}
                  className="h-[340px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <a
                href={mapLinkUrl(mapQ)}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.18em] text-gold-700 transition hover:text-gold-600"
              >
                <MapPin className="h-3.5 w-3.5" />
                Open in Google Maps
              </a>
            </Reveal>
          </div>

          {/* Sticky enquiry sidebar */}
          <aside className="lg:relative">
            <div className="lg:sticky lg:top-24">
              <Reveal>
                <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-forest-950/8">
                  <div className="bg-forest-900 p-6 text-sand-50">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-gold-400">
                      Asking Price
                    </p>
                    <p className="mt-2 font-display text-3xl font-medium">{project.priceLabel}</p>
                    {project.sizeLabel ? (
                      <p className="mt-1 text-sm text-sand-100/70">{project.sizeLabel}</p>
                    ) : null}
                  </div>
                  <div className="space-y-3 p-6">
                    <Link
                      href={`/book-site-visit?project=${project.slug}`}
                      className="btn-gold w-full"
                    >
                      <CalendarCheck className="h-4 w-4" />
                      Book Site Visit
                    </Link>
                    <a href={`tel:+91${phone.replace(/\D/g, "").slice(-10)}`} className="btn-forest w-full">
                      <Phone className="h-4 w-4" />
                      Call {phone}
                    </a>
                    <a href={wa} target="_blank" rel="noreferrer" className="btn-whatsapp w-full">
                      <WhatsAppIcon className="h-4 w-4" />
                      WhatsApp Enquiry
                    </a>
                    <p className="pt-1 text-center text-[11.5px] leading-relaxed text-ink-500">
                      Prefer email? Write to{" "}
                      <a href={`mailto:${BRAND.email}`} className="font-bold text-forest-800 underline-offset-2 hover:underline">
                        {BRAND.email}
                      </a>
                    </p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-5 rounded-2xl border border-gold-600/25 bg-gold-100/50 p-5">
                  <p className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-gold-800">
                    <ShieldAlert className="h-4 w-4" />
                    Before You Decide
                  </p>
                  <p className="mt-2.5 text-[12.5px] leading-relaxed text-ink-700">
                    {DISCLAIMER}
                  </p>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 ? (
          <div className="container-x mt-20">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="font-display text-2xl font-medium text-forest-950 sm:text-3xl">
                  You may also explore
                </h2>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.2em] text-gold-700 transition hover:text-gold-600"
                >
                  All Projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={0.07 * i}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}
