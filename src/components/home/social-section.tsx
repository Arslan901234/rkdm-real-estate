import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { BRAND } from "@/lib/brand";
import SectionHeading from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { InstagramIcon, YouTubeIcon } from "@/components/social-icons";

const GRID_IMAGES = [
  { src: "/images/projects/silicon-city.jpg", alt: "Silicon City Kheda plotting scheme" },
  { src: "/images/projects/sokhda-farm.jpg", alt: "Farmhouse plot near Western Hotel, Sokhda" },
  { src: "/images/projects/bareja-bungalow.jpg", alt: "Bareja bungalow scheme" },
  { src: "/images/plots-sunset.jpg", alt: "Surveyed residential plots at sunset" },
];

export default function SocialSection() {
  return (
    <section className="bg-sand-100 py-20 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Follow the Journey"
            title="Site videos, project updates & new opportunities"
            description="We regularly share site visit clips, project walkarounds and new property information on Instagram and YouTube."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Instagram card */}
          <Reveal>
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative block overflow-hidden rounded-3xl bg-forest-950 p-7 ring-1 ring-forest-950/10 sm:p-9"
            >
              <div className="absolute inset-0 opacity-[0.08]" aria-hidden
                style={{ background: "radial-gradient(600px 300px at 90% 0%, #c7a35c, transparent 60%)" }}
              />
              <div className="relative flex items-center gap-4">
                <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#7a3d9e] via-[#c13584] to-[#e98b5a] text-white">
                  <InstagramIcon className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-gold-400">
                    Instagram
                  </p>
                  <p className="font-display text-2xl font-medium text-white">
                    {BRAND.instagram}
                  </p>
                </div>
                <ArrowUpRight className="ml-auto h-5 w-5 text-gold-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <div className="relative mt-7 grid grid-cols-4 gap-2.5">
                {GRID_IMAGES.map((img) => (
                  <div key={img.src} className="relative aspect-square overflow-hidden rounded-xl">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 22vw, 180px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
              <p className="relative mt-6 text-sm leading-relaxed text-sand-100/70">
                Follow for the latest site visit reels, plot walkarounds and new
                project announcements from across Gujarat.
              </p>
              <span className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-[12px] font-extrabold uppercase tracking-[0.18em] text-white ring-1 ring-white/20 transition group-hover:bg-white/20">
                Follow {BRAND.instagram}
              </span>
            </a>
          </Reveal>

          {/* YouTube card */}
          <Reveal delay={0.1}>
            <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl ring-1 ring-forest-950/10">
              <div className="relative min-h-[260px] flex-1 sm:min-h-[300px]">
                <Image
                  src="/images/projects/sail-kunj.jpg"
                  alt="Bungalow scheme near Ahmedabad New Ring Road"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent" />
                <Link
                  href="/videos"
                  className="absolute inset-0 flex items-center justify-center"
                  aria-label="Watch project videos"
                >
                  <span className="flex h-18 w-18 items-center justify-center rounded-full bg-gold-500 text-forest-950 shadow-[0_20px_50px_-12px_rgba(199,163,92,0.9)] transition-transform duration-500 group-hover:scale-110">
                    <Play className="h-6 w-6 translate-x-0.5 fill-forest-950" />
                  </span>
                </Link>
              </div>
              <div className="relative bg-white p-7 sm:p-8">
                <p className="flex items-center gap-2.5 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#c00]">
                  <YouTubeIcon className="h-4 w-4" />
                  YouTube
                </p>
                <h3 className="mt-2.5 font-display text-2xl font-medium text-forest-950">
                  Project videos & site walkthroughs
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-500">
                  Watch location videos and project walkarounds before you plan
                  your site visit.
                </p>
                <Link
                  href="/videos"
                  className="mt-5 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.2em] text-gold-700 transition hover:text-gold-600"
                >
                  Open Videos
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
