import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clapperboard } from "lucide-react";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/home/cta-band";
import { Reveal } from "@/components/reveal";
import { InstagramIcon, YouTubeIcon } from "@/components/social-icons";
import { BRAND } from "@/lib/brand";
import { getProjects, getSetting } from "@/lib/queries";
import { youtubeEmbed } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Watch site visit clips, project walkarounds and location videos from RKDM Real Estate, Ahmedabad — new videos on Instagram and YouTube.",
};

export default async function VideosPage() {
  const [projects, youtubeUrl] = await Promise.all([
    getProjects({ includeSold: true }),
    getSetting("youtubeUrl", BRAND.youtubeUrl),
  ]);
  const videos = projects.flatMap((p) =>
    p.videos
      .map((v) => ({ project: p.name, slug: p.slug, embed: youtubeEmbed(v) }))
      .filter((v): v is { project: string; slug: string; embed: string } => Boolean(v.embed))
  );

  return (
    <>
      <PageHero
        eyebrow="Videos"
        title="Walkarounds &"
        accent="site clips"
        description="Project videos, location walkarounds and site visit clips. We publish new videos on Instagram and YouTube — follow along to see sites before you visit."
      />

      <section className="bg-sand-50 py-12 sm:py-16">
        <div className="container-x">
          {videos.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {videos.map((v, i) => (
                <Reveal key={v.embed + i} delay={0.06 * (i % 2)}>
                  <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-forest-950/8">
                    <iframe
                      src={v.embed}
                      title={`${v.project} — video`}
                      className="aspect-video w-full"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <div className="flex items-center justify-between gap-4 p-5">
                      <p className="font-display text-lg font-medium text-forest-950">{v.project}</p>
                      <Link
                        href={`/projects/${v.slug}`}
                        className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-gold-700 hover:text-gold-600"
                      >
                        Project <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="flex flex-col items-center rounded-3xl bg-forest-950 px-6 py-16 text-center text-sand-100 sm:py-20">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500 text-forest-950">
                  <Clapperboard className="h-7 w-7" />
                </span>
                <h2 className="mt-6 max-w-xl font-display text-3xl font-medium text-white">
                  New project videos are on the way
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-sand-100/70">
                  We publish site walkarounds, road views and location clips on
                  our social channels first. Follow us to watch the latest
                  footage from Kheda, Bareja, Sokhda, Matar and Ahmedabad.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
                  <a
                    href={BRAND.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-sm hover:-translate-y-0.5 hover:bg-white/20"
                  >
                    <InstagramIcon className="h-4 w-4 text-gold-300" />
                    {BRAND.instagram}
                  </a>
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn bg-[#c00] text-white hover:-translate-y-0.5 hover:bg-[#d81212]"
                  >
                    <YouTubeIcon className="h-4 w-4" />
                    Find us on YouTube
                  </a>
                </div>
              </div>
            </Reveal>
          )}

          {videos.length > 0 && (
            <Reveal delay={0.1}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline-forest !px-5 !py-2.5 text-[13px]"
                >
                  <InstagramIcon className="h-4 w-4 text-gold-600" />
                  More clips on Instagram
                </a>
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline-forest !px-5 !py-2.5 text-[13px]"
                >
                  <YouTubeIcon className="h-4 w-4 text-[#c00]" />
                  YouTube
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <CtaBand
        title="Videos help. Visits convince."
        text="After the walkaround videos, come walk the land itself — book a guided site visit in under a minute."
      />
    </>
  );
}
