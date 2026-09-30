import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, LandPlot, MapPin, Route } from "lucide-react";
import type { Project } from "@/db/schema";
import { cn, STATUS_META, typeLabel } from "@/lib/utils";

export default function ProjectCard({
  project,
  className,
  priority = false,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
}) {
  const status = STATUS_META[project.status] ?? STATUS_META.available;
  const img = project.images[0] ?? "/images/plots-sunset.jpg";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-forest-950/8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_32px_64px_-28px_rgba(6,31,20,0.45)]",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={img}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/75 via-forest-950/10 to-transparent" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-950/60 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-sand-100 backdrop-blur-md ring-1 ring-white/15">
            <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
            {status.label}
          </span>
        </div>
        <span className="absolute top-4 right-4 rounded-full bg-gold-500/90 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-forest-950 backdrop-blur-md">
          {typeLabel(project.type)}
        </span>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-200">
            <MapPin className="h-3.5 w-3.5" />
            {project.location}
          </p>
          <h3 className="mt-1.5 font-display text-[1.65rem] font-medium leading-tight text-white">
            {project.name}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        {project.tagline ? (
          <p className="text-[13.5px] leading-relaxed text-ink-500 line-clamp-2">
            {project.tagline}
          </p>
        ) : null}
        <div className="mt-auto grid grid-cols-2 gap-3 border-t border-forest-950/8 pt-4 text-[12.5px]">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink-500/70">
              Price
            </p>
            <p className="mt-0.5 font-bold text-forest-800">{project.priceLabel}</p>
          </div>
          {project.sizeLabel ? (
            <div>
              <p className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink-500/70">
                <LandPlot className="h-3 w-3" /> Plot Size
              </p>
              <p className="mt-0.5 font-bold text-forest-800">{project.sizeLabel}</p>
            </div>
          ) : null}
        </div>
        {project.roadWidth ? (
          <p className="flex items-center gap-2 text-[12px] font-semibold text-ink-500">
            <Route className="h-3.5 w-3.5 text-gold-600" />
            {project.roadWidth}
          </p>
        ) : null}
        <span className="inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.2em] text-gold-700 transition group-hover:text-gold-600">
          View Details
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
